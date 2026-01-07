<?php

namespace App\Observers;

use App\Models\Loker;
use App\Models\CalendarEvent;

class LokerObserver
{
    /**
     * Handle the Loker "created" event.
     */
    public function created(Loker $loker): void
    {
        if ($loker->is_active && $loker->deadline) {
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
        }
    }

    /**
     * Handle the Loker "updated" event.
     */
    public function updated(Loker $loker): void
    {
        $event = $loker->calendarEvent;
        if ($event) {
            $event->update([
                'title' => 'Deadline: ' . $loker->title,
                'description' => $loker->company . ' - ' . $loker->location,
                'start_date' => $loker->deadline,
                'location' => $loker->location,
                'registration_url' => $loker->application_url,
                'is_active' => $loker->is_active,
            ]);
        } elseif ($loker->is_active && $loker->deadline) {
            // Jika event belum ada, buat baru
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
        }
    }

    /**
     * Handle the Loker "deleted" event.
     */
    public function deleted(Loker $loker): void
    {
         $loker->calendarEvent()?->delete();
    }

    /**
     * Handle the Loker "restored" event.
     */
    public function restored(Loker $loker): void
    {
        //
    }

    /**
     * Handle the Loker "force deleted" event.
     */
    public function forceDeleted(Loker $loker): void
    {
        //
    }
}
