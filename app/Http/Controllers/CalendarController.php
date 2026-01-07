<?php

namespace App\Http\Controllers;

use App\Models\CalendarEvent;
use App\Models\CampusHiring;
use App\Models\CounselingBooking;
use App\Models\Loker;
use App\Models\Magang;
use App\Models\Seminar;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CalendarController extends Controller
{
    /**
     * Get events for calendar (API)
     * Mengembalikan semua event: dari sistem + event pribadi user
     */
    public function getEvents(Request $request)
    {
        $month = $request->query('month', now()->month);
        $year = $request->query('year', now()->year);

        $events = collect();

        // Seminar
        Seminar::whereYear('date', $year)->whereMonth('date', $month)->get()
            ->each(function ($item) use ($events) {
                $events->push([
                    'id' => 'system-seminar-'.$item->id,
                    'title' => $item->title,
                    'date' => Carbon::parse($item->date)->format('Y-m-d'),
                    'event_type' => 'seminar',
                    'location' => $item->location ?? 'Online/Kampus',
                    'time_range' => $item->time ?? null,
                    'link' => route('program.seminar.show', [$item->id, $item->slug]),
                    'is_system_event' => true,
                    'description' => $item->description ?? null,
                ]);
            });

        // Campus Hiring
        CampusHiring::whereYear('date', $year)->whereMonth('date', $month)->get()
            ->each(function ($item) use ($events) {
                $events->push([
                    'id' => 'system-campus_hiring-'.$item->id,
                    'title' => $item->title,
                    'date' => Carbon::parse($item->date)->format('Y-m-d'),
                    'event_type' => 'campus_hiring',
                    'location' => $item->location ?? 'Online/Kampus',
                    'time_range' => $item->time ?? null,
                    'link' => route('program.campus.hiring.show', [$item->id, $item->slug]),
                    'is_system_event' => true,
                    'description' => $item->description ?? null,
                ]);
            });

        // Loker
        Loker::whereYear('deadline', $year)->whereMonth('deadline', $month)->get()
            ->each(function ($item) use ($events) {
                $events->push([
                    'id' => 'system-deadline_loker-'.$item->id,
                    'title' => 'Deadline: '.($item->title ?? $item->company_name),
                    'date' => Carbon::parse($item->deadline)->format('Y-m-d'),
                    'event_type' => 'deadline_loker',
                    'location' => $item->location ?? 'Online',
                    'link' => route('loker.show', $item->slug),
                    'is_system_event' => true,
                    'description' => 'Batas akhir pendaftaran lowongan kerja',
                ]);
            });

        // Magang
        Magang::whereYear('deadline', $year)->whereMonth('deadline', $month)->get()
            ->each(function ($item) use ($events) {
                $events->push([
                    'id' => 'system-deadline_magang-'.$item->id,
                    'title' => 'Deadline: '.($item->title ?? $item->company),
                    'date' => Carbon::parse($item->deadline)->format('Y-m-d'),
                    'event_type' => 'deadline_magang',
                    'location' => $item->location ?? 'Online',
                    'link' => route('magang.show', $item->slug),
                    'is_system_event' => true,
                    'description' => 'Batas akhir pendaftaran magang',
                ]);
            });

        // Konsultasi
        if (Auth::check()) {
            $query = CounselingBooking::whereYear('scheduled_date', $year)->whereMonth('scheduled_date', $month);
            if (Auth::user()->role === 'mahasiswa') {
                $query->where('user_id', Auth::id());
            } elseif (Auth::user()->role === 'konselor') {
                $query->where('counselor_id', Auth::user()->counselor?->id);
            }

            $query->get()->each(function ($item) use ($events) {
                $events->push([
                    'id' => 'system-konsultasi-'.$item->id,
                    'title' => 'Sesi Konsultasi: '.$item->topic,
                    'date' => $item->scheduled_date->format('Y-m-d'),
                    'event_type' => 'konsultasi',
                    'location' => 'Ruang Konseling',
                    'time_range' => $item->scheduled_time,
                    'link' => route('konsultasi.show', $item->id),
                    'is_system_event' => true,
                    'description' => $item->notes ?? null,
                ]);
            });
        }

        // Event CUSTOM
        if (Auth::check()) {
            CalendarEvent::where('user_id', Auth::id())
                ->whereYear('start_date', $year)
                ->whereMonth('start_date', $month)
                ->where('is_active', true)->get()
                ->each(function ($event) use ($events) {
                    $events->push([
                        'id' => $event->id,
                        'title' => $event->title,
                        'date' => $event->start_date->format('Y-m-d'),
                        'event_type' => $event->event_type,
                        'location' => $event->location,
                        'time_range' => $event->start_time ? substr($event->start_time, 0, 5).($event->end_time ? ' - '.substr($event->end_time, 0, 5) : '') : null,
                        'link' => $event->link,
                        'is_system_event' => false,
                        'description' => $event->description,
                    ]);
                });
        }

        return response()->json($events->groupBy('date'));
    }

    /**
     * Get events by specific date
     */
    public function getEventsByDate(Request $request, $date)
    {
        return $this->getEvents($request);
    }

    /**
     * Store new custom event (hanya untuk user yang login)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i|after:start_time',
            'event_type' => 'required|in:seminar,campus_hiring,konsultasi,deadline_loker,deadline_magang,custom',
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
            // Set default morph agar tidak error
            'eventable_id' => Auth::id(),
            'eventable_type' => 'App\Models\User',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Event berhasil ditambahkan',
            'data' => $event,
        ], 201);
    }

    /**
     * Update event (hanya event yang dibuat sendiri)
     */
    public function update(Request $request, $id)
    {
        $event = CalendarEvent::findOrFail($id);

        // VALIDASI: Pastikan hanya pemilik yang bisa edit
        if ($event->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Anda tidak memiliki akses untuk mengedit event ini',
            ], 403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i|after:start_time',
            'event_type' => 'required|in:seminar,campus_hiring,konsultasi,deadline_loker,deadline_magang,custom',
            'location' => 'nullable|string|max:255',
            'link' => 'nullable|url|max:500',
        ]);

        $event->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Event berhasil diupdate',
            'data' => $event,
        ]);
    }

    /**
     * Delete event (hanya event yang dibuat sendiri)
     */
    public function destroy($id)
    {
        $event = CalendarEvent::findOrFail($id);

        // VALIDASI: Pastikan hanya pemilik yang bisa hapus
        if ($event->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Anda tidak memiliki akses untuk menghapus event ini',
            ], 403);
        }

        $event->delete();

        return response()->json([
            'success' => true,
            'message' => 'Event berhasil dihapus',
        ]);
    }
}