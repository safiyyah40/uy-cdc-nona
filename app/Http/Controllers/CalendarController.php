<?php

namespace App\Http\Controllers;

use App\Models\CalendarEvent;
use App\Models\CounselingBooking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CalendarController extends Controller
{
    public function getEvents(Request $request)
    {
        try {
            $month = $request->query('month', now()->month);
            $year = $request->query('year', now()->year);
            $user = Auth::user();

            if (! $user) {
                return response()->json([]);
            }

            $query = CalendarEvent::whereYear('start_date', $year)
                ->whereMonth('start_date', $month)
                ->where('is_active', true);

            $events = $query->where(function ($q) use ($user) {
                // SEMUA ROLE: Lihat Event Umum (Seminar, Loker, dll)
                $q->whereNull('user_id');

                if ($user->role === 'konselor') {
                    // KONSELOR: Lihat Event Umum + Milik Sendiri + Konsultasi yang ditujukan ke dia
                    $q->orWhere('user_id', $user->id)
                        ->orWhere(function ($sub) use ($user) {
                            $sub->where('event_type', 'konsultasi')
                                ->whereHasMorph('eventable', [CounselingBooking::class], function ($m) use ($user) {
                                    $m->whereHas('counselor', function ($c) use ($user) {
                                        $c->where('user_id', $user->id);
                                    });
                                });
                        });
                } else {
                    // MAHASISWA & LAINNYA: Hanya Event Umum + Milik Sendiri
                    $q->orWhere('user_id', $user->id);
                }
            })->get();

            $grouped = $events->map(function ($e) use ($user) {
                $finalLink = $e->link;

                if ($e->event_type === 'konsultasi' && $e->eventable_id) {
                    if ($user->role === 'konselor') {
                        $finalLink = route('konselor.konsultasi.show', $e->eventable_id);
                    } else {
                        // Mahasiswa diarahkan ke halaman detail
                        $finalLink = route('konsultasi.show', $e->eventable_id);
                    }
                }

                return [
                    'id' => $e->id,
                    'title' => $e->title,
                    'description' => $e->description,
                    'date' => $e->start_date->format('Y-m-d'),
                    'time_range' => $e->start_time ? substr($e->start_time, 0, 5).' WIB' : null,
                    'event_type' => $e->event_type,
                    'location' => $e->location,
                    'is_system_event' => $e->user_id === null || $e->event_type !== 'custom',
                    'url_detail' => $finalLink,
                ];
            })->groupBy('date');

            return response()->json($grouped);

        } catch (\Exception $e) {
            Log::error('Calendar Error: '.$e->getMessage());

            return response()->json(['error' => 'Gagal memuat data'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'start_date' => 'required|date',
                'start_time' => 'nullable',
                'end_time' => 'nullable',
                'event_type' => 'required',
                'location' => 'nullable|string',
                'link' => 'nullable|string',
            ]);

            $event = CalendarEvent::create([
                'user_id' => Auth::id(),
                'title' => $validated['title'],
                'description' => $validated['description'],
                'start_date' => $validated['start_date'],
                'start_time' => $validated['start_time'],
                'end_time' => $validated['end_time'],
                'event_type' => $validated['event_type'],
                'location' => $validated['location'],
                'link' => $validated['link'],
                'is_active' => true,
                'color' => '#10b981',
            ]);

            return response()->json(['success' => true, 'data' => $event], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $cleanId = str_replace(['static-', 'booking-'], '', $id);
            $event = CalendarEvent::findOrFail($cleanId);

            if ($event->user_id !== Auth::id()) {
                return response()->json(['error' => 'Unauthorized'], 403);
            }

            $event->update($request->all());

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $cleanId = str_replace(['static-', 'booking-'], '', $id);
            $event = CalendarEvent::findOrFail($cleanId);

            if ($event->user_id !== Auth::id()) {
                return response()->json(['error' => 'Unauthorized'], 403);
            }

            $event->delete();

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    private function getTimeRange($event)
    {
        if ($event->start_time && $event->end_time) {
            return substr($event->start_time, 0, 5).' - '.substr($event->end_time, 0, 5);
        }

        return $event->start_time ? substr($event->start_time, 0, 5) : null;
    }
}
