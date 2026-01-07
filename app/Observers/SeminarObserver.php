<?php

namespace App\Observers;

use App\Models\Seminar;
use App\Models\CalendarEvent;

class SeminarObserver
{
    /**
     * Handle the Seminar "created" event.
     */
    public function created(Seminar $seminar): void
    {
        if ($seminar->is_active) {
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
        }
    }

    /**
     * Handle the Seminar "updated" event.
     */
    public function updated(Seminar $seminar): void
    {
        $event = $seminar->calendarEvent;
        if ($event) {
            $event->update([
                'title' => $seminar->title,
                'description' => $seminar->description,
                'start_date' => $seminar->date,
                'start_time' => $seminar->time,
                'location' => $seminar->location,
                'registration_url' => $seminar->registration_link,
                'is_active' => $seminar->is_active,
            ]);
        }
    }

    /**
     * Handle the Seminar "deleted" event.
     */
    public function deleted(Seminar $seminar): void
    {
        $seminar->calendarEvent()?->delete();
    }

    /**
     * Handle the Seminar "restored" event.
     */
    public function restored(Seminar $seminar): void
    {
        //
    }

    /**
     * Handle the Seminar "force deleted" event.
     */
    public function forceDeleted(Seminar $seminar): void
    {
        //
    }
}
