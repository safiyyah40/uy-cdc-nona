<?php

namespace App\Observers;

use App\Models\CalendarEvent;
use App\Helpers\ActivityLogger;

class CalendarEventObserver
{
    /**
     * Handle ketika Calendar Event baru dibuat secara manual.
     * 
     * Observer ini hanya log kalau event dibuat MANUAL (bukan dari observer lain).
     * Event yang dibuat dari Loker/Magang/Seminar dll sudah di-log di observer masing-masing.
     * 
     * @param CalendarEvent $calendarEvent
     * @return void
     */
    public function created(CalendarEvent $calendarEvent): void
    {
        // Cek apakah ini event manual atau dari model lain
        if (!$calendarEvent->eventable_id) {
            ActivityLogger::logCreate(
                $calendarEvent,
                "Created manual calendar event: {$calendarEvent->title}"
            );
        }
    }

    /**
     * Handle ketika Calendar Event diupdate secara manual.
     * 
     * @param CalendarEvent $calendarEvent
     * @return void
     */
    public function updated(CalendarEvent $calendarEvent): void
    {
        // Hanya log kalau event manual (bukan dari model lain)
        if (!$calendarEvent->eventable_id) {
            ActivityLogger::logUpdate(
                $calendarEvent,
                $calendarEvent->getOriginal(),
                "Updated manual calendar event: {$calendarEvent->title}"
            );
        }
    }

    /**
     * Handle ketika Calendar Event dihapus.
     * 
     * @param CalendarEvent $calendarEvent
     * @return void
     */
    public function deleted(CalendarEvent $calendarEvent): void
    {
        // Hanya log kalau event manual
        if (!$calendarEvent->eventable_id) {
            ActivityLogger::logDelete(
                $calendarEvent,
                "Deleted manual calendar event: {$calendarEvent->title}"
            );
        }
    }

    /**
     * Handle ketika Calendar Event di-restore.
     * 
     * @param CalendarEvent $calendarEvent
     * @return void
     */
    public function restored(CalendarEvent $calendarEvent): void
    {
        if (!$calendarEvent->eventable_id) {
            ActivityLogger::log(
                "Restored calendar event: {$calendarEvent->title}",
                $calendarEvent,
                'RESTORE'
            );
        }
    }

    /**
     * Handle ketika Calendar Event dihapus permanen.
     * 
     * @param CalendarEvent $calendarEvent
     * @return void
     */
    public function forceDeleted(CalendarEvent $calendarEvent): void
    {
        if (!$calendarEvent->eventable_id) {
            ActivityLogger::log(
                "Force deleted calendar event: {$calendarEvent->title}",
                $calendarEvent,
                'FORCE_DELETE'
            );
        }
    }
}