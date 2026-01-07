<?php

namespace App\Observers;

use App\Models\Magang;
use App\Models\CalendarEvent;

class MagangObserver
{
    /**
     * Handle the Magang "created" event.
     */
    public function created(Magang $magang): void
    {
        if ($magang->is_active && $magang->deadline) {
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
        }
    }

    /**
     * Handle the Magang "updated" event.
     */
    public function updated(Magang $magang): void
    {
        $event = $magang->calendarEvent;
        if ($event) {
            $event->update([
                'title' => 'Deadline Magang: ' . $magang->title,
                'description' => $magang->company . ' - ' . $magang->location,
                'start_date' => $magang->deadline,
                'location' => $magang->location,
                'registration_url' => $magang->application_url,
                'is_active' => $magang->is_active,
            ]);
        } elseif ($magang->is_active && $magang->deadline) {
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
        }
    }

    /**
     * Handle the Magang "deleted" event.
     */
    public function deleted(Magang $magang): void
    {
        $magang->calendarEvent()?->delete();
    }

    /**
     * Handle the Magang "restored" event.
     */
    public function restored(Magang $magang): void
    {
        //
    }

    /**
     * Handle the Magang "force deleted" event.
     */
    public function forceDeleted(Magang $magang): void
    {
        //
    }
}
