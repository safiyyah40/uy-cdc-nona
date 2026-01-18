<?php

namespace App\Observers;

use App\Models\CalendarEvent;
use App\Models\OrientasiDuniaKerja;

class OrientasiDuniaKerjaObserver
{
    /**
     * Handle the OrientasiDuniaKerja "created" event.
     */
    public function created(OrientasiDuniaKerja $orientasiDuniaKerja): void
    {
        if ($orientasiDuniaKerja->is_active) {
            // Ekstrak waktu mulai (misal mengambil '09:00' dari '09:00 - 12:00 WIB')
            $startTime = null;
            if ($orientasiDuniaKerja->time) {
                preg_match('/^(\d{2}:\d{2})/', $orientasiDuniaKerja->time, $matches);
                $startTime = $matches[1] ?? null;
            }

            CalendarEvent::create([
                'eventable_id' => $orientasiDuniaKerja->id,
                'eventable_type' => OrientasiDuniaKerja::class,
                'title' => $orientasiDuniaKerja->title,
                'description' => $orientasiDuniaKerja->description,
                'start_date' => $orientasiDuniaKerja->date,
                'start_time' => $startTime,
                'event_type' => 'orientasi',
                'location' => $orientasiDuniaKerja->location,
                'link' => route('program.odk.show', [
                    'id' => $orientasiDuniaKerja->id,
                    'slug' => $orientasiDuniaKerja->slug,
                ]),
                'color' => '#8b5cf6',
                'icon' => 'Compass',
                'is_active' => true,
            ]);
        }
    }

    /**
     * Handle the OrientasiDuniaKerja "updated" event.
     */
    public function updated(OrientasiDuniaKerja $orientasiDuniaKerja): void
    {
        if ($orientasiDuniaKerja->is_active) {
            $startTime = null;
            if ($orientasiDuniaKerja->time) {
                preg_match('/^(\d{2}:\d{2})/', $orientasiDuniaKerja->time, $matches);
                $startTime = $matches[1] ?? null;
            }

            CalendarEvent::create([
                'user_id' => null,
                'eventable_id' => $orientasiDuniaKerja->id,
                'eventable_type' => OrientasiDuniaKerja::class,
                'title' => $orientasiDuniaKerja->title,
                'description' => $orientasiDuniaKerja->description,
                'start_date' => $orientasiDuniaKerja->date,
                'start_time' => $startTime,
                'event_type' => 'orientasi',
                'location' => $orientasiDuniaKerja->location,
                'link' => route('program.odk.show', [$orientasiDuniaKerja->id, $orientasiDuniaKerja->slug]),
                'color' => '#8b5cf6',
                'is_active' => true,
            ]);
        }
    }

    /**
     * Handle the OrientasiDuniaKerja "deleted" event.
     */
    public function deleted(OrientasiDuniaKerja $orientasiDuniaKerja): void
    {
        $orientasiDuniaKerja->calendarEvent()?->delete();
    }

    /**
     * Handle the OrientasiDuniaKerja "restored" event.
     */
    public function restored(OrientasiDuniaKerja $orientasiDuniaKerja): void
    {
        //
    }

    /**
     * Handle the OrientasiDuniaKerja "force deleted" event.
     */
    public function forceDeleted(OrientasiDuniaKerja $orientasiDuniaKerja): void
    {
        //
    }
}
