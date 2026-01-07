<?php

namespace App\Observers;

use App\Models\Sertifikasi;
use App\Models\CalendarEvent;

class SertifikasiObserver
{
    /**
     * Handle the Sertifikasi "created" event.
     */
    public function created(Sertifikasi $sertifikasi): void
    {
        if ($sertifikasi->status === 'Published' && $sertifikasi->start_date) {
            CalendarEvent::create([
                'eventable_id' => $sertifikasi->id,
                'eventable_type' => Sertifikasi::class,
                'title' => $sertifikasi->title,
                'description' => $sertifikasi->provider_name,
                'start_date' => $sertifikasi->start_date,
                'end_date' => $sertifikasi->end_date,
                'event_type' => 'sertifikasi',
                'location' => $sertifikasi->location,
                'link' => route('sertifikasi.show', $sertifikasi->id),
                'registration_url' => $sertifikasi->registration_url,
                'color' => '#06b6d4',
                'icon' => 'Award',
                'is_active' => true,
            ]);
        }
    }

    /**
     * Handle the Sertifikasi "updated" event.
     */
    public function updated(Sertifikasi $sertifikasi): void
    {
        $event = $sertifikasi->calendarEvent;
        if ($event) {
            $event->update([
                'title' => $sertifikasi->title,
                'description' => $sertifikasi->provider_name,
                'start_date' => $sertifikasi->start_date,
                'end_date' => $sertifikasi->end_date,
                'location' => $sertifikasi->location,
                'registration_url' => $sertifikasi->registration_url,
                'is_active' => $sertifikasi->status === 'Published',
            ]);
        } elseif ($sertifikasi->status === 'Published' && $sertifikasi->start_date) {
            CalendarEvent::create([
                'eventable_id' => $sertifikasi->id,
                'eventable_type' => Sertifikasi::class,
                'title' => $sertifikasi->title,
                'description' => $sertifikasi->provider_name,
                'start_date' => $sertifikasi->start_date,
                'end_date' => $sertifikasi->end_date,
                'event_type' => 'sertifikasi',
                'location' => $sertifikasi->location,
                'link' => route('sertifikasi.show', $sertifikasi->id),
                'registration_url' => $sertifikasi->registration_url,
                'color' => '#06b6d4',
                'icon' => 'Award',
                'is_active' => true,
            ]);
        }
    }

    /**
     * Handle the Sertifikasi "deleted" event.
     */
    public function deleted(Sertifikasi $sertifikasi): void
    {
        $sertifikasi->calendarEvent()?->delete();
    }

    /**
     * Handle the Sertifikasi "restored" event.
     */
    public function restored(Sertifikasi $sertifikasi): void
    {
        //
    }

    /**
     * Handle the Sertifikasi "force deleted" event.
     */
    public function forceDeleted(Sertifikasi $sertifikasi): void
    {
        //
    }
}
