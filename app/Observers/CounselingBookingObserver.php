<?php

namespace App\Observers;

use App\Models\CounselingBooking;
use App\Models\CalendarEvent;

class CounselingBookingObserver
{
    /**
     * Handle the CounselingBooking "created" event.
     */
    public function created(CounselingBooking $counselingBooking): void
    {
        CalendarEvent::create([
            'user_id' => $counselingBooking->user_id,
            'eventable_id' => $counselingBooking->id,
            'eventable_type' => CounselingBooking::class,
            'title' => 'Konsultasi: ' . $counselingBooking->topic,
            'description' => 'Konselor: ' . $counselingBooking->counselor_name,
            'start_date' => $counselingBooking->scheduled_date,
            'start_time' => $counselingBooking->scheduled_time,
            'event_type' => 'konsultasi',
            'location' => 'Ruang Konseling',
            'color' => '#10b981',
            'is_active' => true,
        ]);
    }

    /**
     * Handle the CounselingBooking "updated" event.
     */
    public function updated(CounselingBooking $counselingBooking): void
    {
        $event = $counselingBooking->calendarEvent;

        if ($event) {
            $isActive = !in_array($counselingBooking->status, ['rejected', 'cancelled']);
            
            $event->update([
                'start_date' => $counselingBooking->scheduled_date,
                'start_time' => $counselingBooking->scheduled_time,
                'is_active' => $isActive,
                'description' => 'Status: ' . ucfirst($counselingBooking->status) . ' | Konselor: ' . $counselingBooking->counselor_name,
            ]);
        }
    }

    /**
     * Handle the CounselingBooking "deleted" event.
     */
    public function deleted(CounselingBooking $counselingBooking): void
    {
        $counselingBooking->calendarEvent()?->delete();
    }

    /**
     * Handle the CounselingBooking "restored" event.
     */
    public function restored(CounselingBooking $counselingBooking): void
    {
        //
    }

    /**
     * Handle the CounselingBooking "force deleted" event.
     */
    public function forceDeleted(CounselingBooking $counselingBooking): void
    {
        //
    }
}
