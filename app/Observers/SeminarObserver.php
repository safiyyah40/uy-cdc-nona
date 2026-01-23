<?php

namespace App\Observers;

use App\Models\Seminar;
use App\Models\CalendarEvent;
use App\Helpers\ActivityLogger;

class SeminarObserver
{
    /**
     * Handle ketika Seminar baru dibuat.
     * 
     * Kalau seminar aktif, otomatis bikin event di kalender
     * biar mahasiswa bisa lihat jadwal seminar.
     * 
     * @param Seminar $seminar
     * @return void
     */
    public function created(Seminar $seminar): void
    {
        // Log activity create
        ActivityLogger::logCreate($seminar);

        // Bikin calendar event kalau seminar aktif
        if ($seminar->is_active) {
            CalendarEvent::withoutEvents(function () use ($seminar) {
                CalendarEvent::create([
                    'eventable_id' => $seminar->id,
                    'eventable_type' => Seminar::class,
                    'title' => $seminar->title,
                    'description' => $seminar->description,
                    'start_date' => $seminar->date,
                    'start_time' => $seminar->time,
                    'event_type' => 'seminar',
                    'location' => $seminar->location,
                    'link' => route('program.seminar.show', [$seminar->id, $seminar->slug]),
                    'registration_url' => $seminar->registration_link,
                    'color' => '#3b82f6', // Warna biru untuk seminar
                    'icon' => 'Calendar',
                    'is_active' => true,
                ]);
            });
        }
    }

    /**
     * Handle ketika Seminar diupdate.
     * 
     * Update calendar event yang udah ada dengan data terbaru.
     * Kalau seminar di-nonaktifkan, event juga di-nonaktifkan.
     * 
     * @param Seminar $seminar
     * @return void
     */
    public function updated(Seminar $seminar): void
    {
        // Log activity update
        ActivityLogger::logUpdate($seminar, $seminar->getOriginal());

        // Update calendar event kalau ada
        $event = $seminar->calendarEvent;
        if ($event) {
            CalendarEvent::withoutEvents(function () use ($event, $seminar) {
                $event->update([
                    'title' => $seminar->title,
                    'description' => $seminar->description,
                    'start_date' => $seminar->date,
                    'start_time' => $seminar->time,
                    'location' => $seminar->location,
                    'registration_url' => $seminar->registration_link,
                    'is_active' => $seminar->is_active,
                ]);
            });
        } elseif ($seminar->is_active) {
            // Kalau belum ada event tapi sekarang aktif, bikin baru
            CalendarEvent::withoutEvents(function () use ($seminar) {
                CalendarEvent::create([
                    'eventable_id' => $seminar->id,
                    'eventable_type' => Seminar::class,
                    'title' => $seminar->title,
                    'description' => $seminar->description,
                    'start_date' => $seminar->date,
                    'start_time' => $seminar->time,
                    'event_type' => 'seminar',
                    'location' => $seminar->location,
                    'link' => route('program.seminar.show', [$seminar->id, $seminar->slug]),
                    'registration_url' => $seminar->registration_link,
                    'color' => '#3b82f6',
                    'icon' => 'Calendar',
                    'is_active' => true,
                ]);
            });
        }
    }

    /**
     * Handle ketika Seminar dihapus.
     * 
     * Hapus juga calendar event yang terhubung.
     * 
     * @param Seminar $seminar
     * @return void
     */
    public function deleted(Seminar $seminar): void
    {
        // Log activity delete
        ActivityLogger::logDelete($seminar);

        // Hapus calendar event kalau ada
        if ($seminar->calendarEvent) {
            CalendarEvent::withoutEvents(function () use ($seminar) {
                $seminar->calendarEvent->delete();
            });
        }
    }

    /**
     * Handle ketika Seminar di-restore dari soft delete.
     * 
     * @param Seminar $seminar
     * @return void
     */
    public function restored(Seminar $seminar): void
    {
        ActivityLogger::log(
            "Restored seminar: {$seminar->title}",
            $seminar,
            'RESTORE'
        );
    }

    /**
     * Handle ketika Seminar dihapus permanen.
     * 
     * @param Seminar $seminar
     * @return void
     */
    public function forceDeleted(Seminar $seminar): void
    {
        ActivityLogger::log(
            "Force deleted seminar: {$seminar->title}",
            $seminar,
            'FORCE_DELETE'
        );
    }
}