<?php

namespace App\Http\Controllers;

use App\Models\CalendarEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CalendarController extends Controller
{
    /**
     * Get events for calendar (API)
     */
    public function getEvents(Request $request)
    {
        try {
            $month = $request->query('month', now()->month);
            $year = $request->query('year', now()->year);
            $userId = Auth::id();

            // Ambil semua events dari tabel calendar_events
            $events = CalendarEvent::whereYear('start_date', $year)
                ->whereMonth('start_date', $month)
                ->where('is_active', true)
                ->where(function ($q) use ($userId) {
                    $q->whereNull('user_id') // Event sistem
                      ->orWhere('user_id', $userId); // Event pribadi user
                })
                ->orderBy('start_date')
                ->orderBy('start_time')
                ->get();

            // Group by date
            $groupedEvents = $events->groupBy(function ($event) {
                return $event->start_date->format('Y-m-d');
            })->map(function ($dateEvents) {
                return $dateEvents->map(function ($event) {
                    return [
                        'id' => $event->id,
                        'title' => $event->title,
                        'description' => $event->description,
                        'date' => $event->start_date->format('Y-m-d'),
                        'start_time' => $event->start_time ? substr($event->start_time, 0, 5) : null,
                        'end_time' => $event->end_time ? substr($event->end_time, 0, 5) : null,
                        'time_range' => $this->getTimeRange($event),
                        'event_type' => $event->event_type,
                        'location' => $event->location,
                        'link' => $event->link,
                        'color' => $event->color,
                        'is_system_event' => $event->user_id === null,
                    ];
                })->values();
            });

            return response()->json($groupedEvents);

        } catch (\Exception $e) {
            Log::error('Calendar API Error: ' . $e->getMessage());
            Log::error($e->getTraceAsString());
            
            return response()->json([
                'error' => 'Failed to fetch calendar events',
                'message' => config('app.debug') ? $e->getMessage() : 'Internal Server Error'
            ], 500);
        }
    }

    /**
     * Get events by specific date
     */
    public function getEventsByDate(Request $request, $date)
    {
        try {
            $userId = Auth::id();

            $events = CalendarEvent::whereDate('start_date', $date)
                ->where('is_active', true)
                ->where(function ($q) use ($userId) {
                    $q->whereNull('user_id')
                      ->orWhere('user_id', $userId);
                })
                ->orderBy('start_time')
                ->get()
                ->map(function ($event) {
                    return [
                        'id' => $event->id,
                        'title' => $event->title,
                        'description' => $event->description,
                        'start_time' => $event->start_time ? substr($event->start_time, 0, 5) : null,
                        'end_time' => $event->end_time ? substr($event->end_time, 0, 5) : null,
                        'time_range' => $this->getTimeRange($event),
                        'event_type' => $event->event_type,
                        'location' => $event->location,
                        'link' => $event->link,
                        'color' => $event->color,
                        'is_system_event' => $event->user_id === null,
                    ];
                });

            return response()->json($events);

        } catch (\Exception $e) {
            Log::error('Calendar Date API Error: ' . $e->getMessage());
            
            return response()->json([
                'error' => 'Failed to fetch events for date',
                'message' => config('app.debug') ? $e->getMessage() : 'Internal Server Error'
            ], 500);
        }
    }

    /**
     * Store new custom event
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'start_date' => 'required|date',
                'start_time' => 'nullable|date_format:H:i',
                'end_time' => 'nullable|date_format:H:i|after:start_time',
                'event_type' => 'required|in:seminar,campus_hiring,konsultasi,deadline_loker,deadline_magang,sertifikasi,orientasi,custom',
                'location' => 'nullable|string|max:255',
                'link' => 'nullable|url|max:500',
            ]);

            $event = CalendarEvent::create([
                'user_id' => Auth::id(),
                'title' => $validated['title'],
                'description' => $validated['description'] ?? null,
                'start_date' => $validated['start_date'],
                'start_time' => $validated['start_time'] ?? null,
                'end_time' => $validated['end_time'] ?? null,
                'event_type' => $validated['event_type'],
                'location' => $validated['location'] ?? null,
                'link' => $validated['link'] ?? null,
                'is_active' => true,
                // Set morph ke User (event pribadi)
                'eventable_id' => Auth::id(),
                'eventable_type' => 'App\Models\User',
                'color' => '#10b981',
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Event berhasil ditambahkan',
                'data' => $event,
            ], 201);

        } catch (\Exception $e) {
            Log::error('Calendar Store Error: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Gagal menambahkan event',
            ], 500);
        }
    }

    /**
     * Update event
     */
    public function update(Request $request, $id)
    {
        try {
            $event = CalendarEvent::findOrFail($id);

            // Validasi ownership
            if ($event->user_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Anda tidak memiliki akses',
                ], 403);
            }

            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'start_date' => 'required|date',
                'start_time' => 'nullable|date_format:H:i',
                'end_time' => 'nullable|date_format:H:i',
                'event_type' => 'required',
                'location' => 'nullable|string|max:255',
                'link' => 'nullable|url|max:500',
            ]);

            $event->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Event berhasil diupdate',
            ]);

        } catch (\Exception $e) {
            Log::error('Calendar Update Error: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Gagal update event',
            ], 500);
        }
    }

    /**
     * Delete event
     */
    public function destroy($id)
    {
        try {
            $event = CalendarEvent::findOrFail($id);

            // Validasi ownership
            if ($event->user_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Anda tidak memiliki akses',
                ], 403);
            }

            $event->delete();

            return response()->json([
                'success' => true,
                'message' => 'Event berhasil dihapus',
            ]);

        } catch (\Exception $e) {
            Log::error('Calendar Delete Error: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus event',
            ], 500);
        }
    }

    /**
     * Helper: Get formatted time range
     */
    private function getTimeRange($event)
    {
        if ($event->start_time && $event->end_time) {
            return substr($event->start_time, 0, 5) . ' - ' . substr($event->end_time, 0, 5);
        }
        return $event->start_time ? substr($event->start_time, 0, 5) : null;
    }
}