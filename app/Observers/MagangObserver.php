<?php

namespace App\Observers;

use App\Models\Magang;
use App\Models\CalendarEvent;
use App\Helpers\ActivityLogger;

class MagangObserver
{
    /**
     * Handle ketika Magang (internship) baru dibuat.
     * 
     * Kalau magang aktif dan ada deadline, otomatis bikin event di kalender
     * sebagai reminder deadline magang.
     * 
     * @param Magang $magang
     * @return void
     */
    public function created(Magang $magang): void
    {
        // Log activity create
        ActivityLogger::logCreate($magang);

        // Bikin calendar event kalau magang aktif dan ada deadline
        if ($magang->is_active && $magang->deadline) {
            CalendarEvent::withoutEvents(function () use ($magang) {
                CalendarEvent::create([
                    'eventable_id' => $magang->id,
                    'eventable_type' => Magang::class,
                    'title' => 'Deadline Magang: ' . $magang->title,
                    'description' => $magang->company . ' - ' . $magang->location,
                    'start_date' => $magang->deadline,
                    'event_type' => 'deadline_magang',
                    'location' => $magang->location,
                    'link' => route('magang.show', $magang->slug),
                    'registration_url' => $magang->application_url,
                    'color' => '#8b5cf6', // Warna ungu untuk magang
                    'icon' => 'Calendar',
                    'priority' => 'high',
                    'is_active' => true,
                ]);
            });
        }
    }

    /**
     * Handle ketika data Magang diupdate.
     * 
     * Update calendar event yang udah ada. Kalau belum ada event tapi
     * sekarang magang diaktifkan + ada deadline, bikin event baru.
     * 
     * @param Magang $magang
     * @return void
     */
    public function updated(Magang $magang): void
    {
        // Log activity update
        ActivityLogger::logUpdate($magang, $magang->getOriginal());

        // Update calendar event kalau ada
        $event = $magang->calendarEvent;
        if ($event) {
            CalendarEvent::withoutEvents(function () use ($event, $magang) {
                $event->update([
                    'title' => 'Deadline Magang: ' . $magang->title,
                    'description' => $magang->company . ' - ' . $magang->location,
                    'start_date' => $magang->deadline,
                    'location' => $magang->location,
                    'registration_url' => $magang->application_url,
                    'is_active' => $magang->is_active,
                ]);
            });
        } elseif ($magang->is_active && $magang->deadline) {
            // Kalau event belum ada tapi sekarang aktif, bikin baru
            CalendarEvent::withoutEvents(function () use ($magang) {
                CalendarEvent::create([
                    'eventable_id' => $magang->id,
                    'eventable_type' => Magang::class,
                    'title' => 'Deadline Magang: ' . $magang->title,
                    'description' => $magang->company . ' - ' . $magang->location,
                    'start_date' => $magang->deadline,
                    'event_type' => 'deadline_magang',
                    'location' => $magang->location,
                    'link' => route('magang.show', $magang->slug),
                    'registration_url' => $magang->application_url,
                    'color' => '#8b5cf6',
                    'icon' => 'Calendar',
                    'priority' => 'high',
                    'is_active' => true,
                ]);
            });
        }
    }

    /**
     * Handle ketika Magang dihapus.
     * 
     * Hapus juga calendar event yang terhubung biar ga ada event 
     * yang nongol padahal magangnya udah dihapus.
     * 
     * @param Magang $magang
     * @return void
     */
    public function deleted(Magang $magang): void
    {
        // Log activity delete
        ActivityLogger::logDelete($magang);

        // Hapus calendar event kalau ada
        if ($magang->calendarEvent) {
            CalendarEvent::withoutEvents(function () use ($magang) {
                $magang->calendarEvent->delete();
            });
        }
    }

    /**
     * Handle ketika Magang di-restore dari soft delete.
     * 
     * @param Magang $magang
     * @return void
     */
    public function restored(Magang $magang): void
    {
        ActivityLogger::log(
            "Restored internship: {$magang->title}",
            $magang,
            'RESTORE'
        );
    }

    /**
     * Handle ketika Magang dihapus permanen.
     * 
     * @param Magang $magang
     * @return void
     */
    public function forceDeleted(Magang $magang): void
    {
        ActivityLogger::log(
            "Force deleted internship: {$magang->title}",
            $magang,
            'FORCE_DELETE'
        );
    }
}