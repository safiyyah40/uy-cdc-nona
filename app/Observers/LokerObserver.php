<?php

namespace App\Observers;

use App\Models\Loker;
use App\Models\CalendarEvent;
use App\Helpers\ActivityLogger;

class LokerObserver
{
    /**
     * Handle ketika Loker (lowongan kerja) baru dibuat.
     * 
     * Kalau loker aktif dan ada deadline, otomatis bikin event di kalender
     * sebagai reminder deadline loker. Muncul di kalender semua user.
     * 
     * @param Loker $loker
     * @return void
     */
    public function created(Loker $loker): void
    {
        // Log activity create loker
        ActivityLogger::logCreate($loker);

        // Bikin calendar event kalau loker aktif dan ada deadline
        if ($loker->is_active && $loker->deadline) {
            CalendarEvent::withoutEvents(function () use ($loker) {
                CalendarEvent::create([
                    'eventable_id' => $loker->id,
                    'eventable_type' => Loker::class,
                    'title' => 'Deadline: ' . $loker->title,
                    'description' => $loker->company . ' - ' . $loker->location,
                    'start_date' => $loker->deadline,
                    'event_type' => 'deadline_loker',
                    'location' => $loker->location,
                    'link' => route('loker.show', $loker->slug),
                    'registration_url' => $loker->application_url,
                    'color' => '#ef4444', // Warna merah untuk deadline
                    'icon' => 'Calendar',
                    'priority' => 'high',
                    'is_active' => true,
                ]);
            });
        }
    }

    /**
     * Handle ketika data Loker diupdate.
     * 
     * Update calendar event yang udah ada. Kalau belum ada event tapi
     * sekarang loker diaktifkan + ada deadline, bikin event baru.
     * 
     * @param Loker $loker
     * @return void
     */
    public function updated(Loker $loker): void
    {
        // Log activity update
        ActivityLogger::logUpdate($loker, $loker->getOriginal());

        // Update calendar event kalau ada
        $event = $loker->calendarEvent;
        if ($event) {
            CalendarEvent::withoutEvents(function () use ($event, $loker) {
                $event->update([
                    'title' => 'Deadline: ' . $loker->title,
                    'description' => $loker->company . ' - ' . $loker->location,
                    'start_date' => $loker->deadline,
                    'location' => $loker->location,
                    'registration_url' => $loker->application_url,
                    'is_active' => $loker->is_active,
                ]);
            });
        } elseif ($loker->is_active && $loker->deadline) {
            // Kalau event belum ada tapi sekarang aktif, bikin baru
            CalendarEvent::withoutEvents(function () use ($loker) {
                CalendarEvent::create([
                    'eventable_id' => $loker->id,
                    'eventable_type' => Loker::class,
                    'title' => 'Deadline: ' . $loker->title,
                    'description' => $loker->company . ' - ' . $loker->location,
                    'start_date' => $loker->deadline,
                    'event_type' => 'deadline_loker',
                    'location' => $loker->location,
                    'link' => route('loker.show', $loker->slug),
                    'registration_url' => $loker->application_url,
                    'color' => '#ef4444',
                    'icon' => 'Calendar',
                    'priority' => 'high',
                    'is_active' => true,
                ]);
            });
        }
    }

    /**
     * Handle ketika Loker dihapus.
     * 
     * Hapus juga calendar event yang terhubung biar ga ada event 
     * yang nongol padahal lokernya udah dihapus.
     * 
     * @param Loker $loker
     * @return void
     */
    public function deleted(Loker $loker): void
    {
        // Log activity delete
        ActivityLogger::logDelete($loker);

        // Hapus calendar event kalau ada (withoutEvents biar ga double log)
        if ($loker->calendarEvent) {
            CalendarEvent::withoutEvents(function () use ($loker) {
                $loker->calendarEvent->delete();
            });
        }
    }

    /**
     * Handle ketika Loker di-restore dari soft delete.
     * 
     * @param Loker $loker
     * @return void
     */
    public function restored(Loker $loker): void
    {
        ActivityLogger::log(
            "Restored job opportunity: {$loker->title}",
            $loker,
            'RESTORE'
        );
    }

    /**
     * Handle ketika Loker dihapus permanen.
     * 
     * @param Loker $loker
     * @return void
     */
    public function forceDeleted(Loker $loker): void
    {
        ActivityLogger::log(
            "Force deleted job opportunity: {$loker->title}",
            $loker,
            'FORCE_DELETE'
        );
    }
}