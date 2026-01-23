<?php

namespace App\Observers;

use App\Helpers\ActivityLogger;
use App\Models\CalendarEvent;
use App\Models\CampusHiring;

class CampusHiringObserver
{
    /**
     * Handle the CampusHiring "created" event.
     */
    public function created(CampusHiring $campusHiring): void
    {
        // Log activity DULU sebelum bikin Calendar Event
        ActivityLogger::logCreate($campusHiring);

        // Baru bikin Calendar Event kalau aktif
        if ($campusHiring->is_active) {
            $startTime = null;
            if ($campusHiring->time) {
                preg_match('/^(\d{2}:\d{2})/', $campusHiring->time, $matches);
                $startTime = $matches[1] ?? null;
            }

            // Nonaktifkan observer sementara untuk CalendarEvent
            CalendarEvent::withoutEvents(function () use ($campusHiring, $startTime) {
                CalendarEvent::create([
                    'user_id' => null,
                    'eventable_id' => $campusHiring->id,
                    'eventable_type' => CampusHiring::class,
                    'title' => $campusHiring->title,
                    'description' => $campusHiring->description,
                    'start_date' => $campusHiring->date,
                    'start_time' => $startTime,
                    'event_type' => 'campus_hiring',
                    'location' => $campusHiring->location,
                    'link' => route('program.campus.hiring.show', [$campusHiring->id, $campusHiring->slug]),
                    'color' => '#f59e0b',
                    'is_active' => true,
                ]);
            });
        }
    }

    /**
     * Handle the CampusHiring "updated" event.
     */
    public function updated(CampusHiring $campusHiring): void
    {
        // Log activity DULU
        ActivityLogger::logUpdate($campusHiring, $campusHiring->getOriginal());

        // Baru update Calendar Event
        $event = $campusHiring->calendarEvent;

        if ($event) {
            // Extract start_time dari string
            $startTime = null;
            if ($campusHiring->time) {
                preg_match('/^(\d{2}:\d{2})/', $campusHiring->time, $matches);
                $startTime = $matches[1] ?? null;
            }

            // Nonaktifkan observer sementara untuk CalendarEvent
            CalendarEvent::withoutEvents(function () use ($event, $campusHiring, $startTime) {
                $event->update([
                    'title' => $campusHiring->title,
                    'description' => $campusHiring->description,
                    'start_date' => $campusHiring->date,
                    'start_time' => $startTime,
                    'location' => $campusHiring->location,
                    'registration_url' => $campusHiring->registration_link,
                    'is_active' => $campusHiring->is_active,
                ]);
            });
        } elseif ($campusHiring->is_active) {
            // Kalau belum ada event tapi sekarang aktif, bikin baru
            $startTime = null;
            if ($campusHiring->time) {
                preg_match('/^(\d{2}:\d{2})/', $campusHiring->time, $matches);
                $startTime = $matches[1] ?? null;
            }

            CalendarEvent::withoutEvents(function () use ($campusHiring, $startTime) {
                CalendarEvent::create([
                    'user_id' => null,
                    'eventable_id' => $campusHiring->id,
                    'eventable_type' => CampusHiring::class,
                    'title' => $campusHiring->title,
                    'description' => $campusHiring->description,
                    'start_date' => $campusHiring->date,
                    'start_time' => $startTime,
                    'event_type' => 'campus_hiring',
                    'location' => $campusHiring->location,
                    'link' => route('program.campus.hiring.show', [$campusHiring->id, $campusHiring->slug]),
                    'color' => '#f59e0b',
                    'is_active' => true,
                ]);
            });
        }
    }

    /**
     * Handle the CampusHiring "deleted" event.
     */
    public function deleted(CampusHiring $campusHiring): void
    {
        // Log activity DULU
        ActivityLogger::logDelete($campusHiring);

        // Baru hapus Calendar Event (pakai withoutEvents biar ga double log)
        if ($campusHiring->calendarEvent) {
            CalendarEvent::withoutEvents(function () use ($campusHiring) {
                $campusHiring->calendarEvent->delete();
            });
        }
    }

    /**
     * Handle the CampusHiring "restored" event.
     */
    public function restored(CampusHiring $campusHiring): void
    {
        ActivityLogger::log(
            "Restored campus hiring: {$campusHiring->title}",
            $campusHiring,
            'RESTORE'
        );
    }

    /**
     * Handle the CampusHiring "force deleted" event.
     */
    public function forceDeleted(CampusHiring $campusHiring): void
    {
        //
    }
}
