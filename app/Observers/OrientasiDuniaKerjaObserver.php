<?php

namespace App\Observers;

use App\Models\CalendarEvent;
use App\Models\OrientasiDuniaKerja;
use App\Helpers\ActivityLogger;

class OrientasiDuniaKerjaObserver
{
    /**
     * Handle ketika OrientasiDuniaKerja baru dibuat.
     * 
     * Kalau orientasi aktif, otomatis bikin event di kalender.
     * Waktu mulai di-extract dari field time (misal dari '09:00 - 12:00 WIB' ambil '09:00').
     * 
     * @param OrientasiDuniaKerja $orientasiDuniaKerja
     * @return void
     */
    public function created(OrientasiDuniaKerja $orientasiDuniaKerja): void
    {
        // Log activity create
        ActivityLogger::logCreate($orientasiDuniaKerja);

        // Bikin calendar event kalau orientasi aktif
        if ($orientasiDuniaKerja->is_active) {
            // Ekstrak waktu mulai (misal mengambil '09:00' dari '09:00 - 12:00 WIB')
            $startTime = null;
            if ($orientasiDuniaKerja->time) {
                preg_match('/^(\d{2}:\d{2})/', $orientasiDuniaKerja->time, $matches);
                $startTime = $matches[1] ?? null;
            }

            CalendarEvent::withoutEvents(function () use ($orientasiDuniaKerja, $startTime) {
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
                    'color' => '#8b5cf6', // Warna ungu untuk orientasi
                    'icon' => 'Compass',
                    'is_active' => true,
                ]);
            });
        }
    }

    /**
     * Handle ketika OrientasiDuniaKerja diupdate.
     * 
     * Update calendar event yang udah ada. Kalau belum ada event tapi
     * sekarang orientasi diaktifkan, bikin event baru.
     * 
     * @param OrientasiDuniaKerja $orientasiDuniaKerja
     * @return void
     */
    public function updated(OrientasiDuniaKerja $orientasiDuniaKerja): void
    {
        // Log activity update
        ActivityLogger::logUpdate($orientasiDuniaKerja, $orientasiDuniaKerja->getOriginal());

        // Ambil calendar event yang ada
        $event = $orientasiDuniaKerja->calendarEvent;
        
        if ($event) {
            // Update event yang udah ada
            $startTime = null;
            if ($orientasiDuniaKerja->time) {
                preg_match('/^(\d{2}:\d{2})/', $orientasiDuniaKerja->time, $matches);
                $startTime = $matches[1] ?? null;
            }

            CalendarEvent::withoutEvents(function () use ($event, $orientasiDuniaKerja, $startTime) {
                $event->update([
                    'title' => $orientasiDuniaKerja->title,
                    'description' => $orientasiDuniaKerja->description,
                    'start_date' => $orientasiDuniaKerja->date,
                    'start_time' => $startTime,
                    'location' => $orientasiDuniaKerja->location,
                    'is_active' => $orientasiDuniaKerja->is_active,
                ]);
            });
        } elseif ($orientasiDuniaKerja->is_active) {
            // Kalau belum ada event tapi sekarang aktif, bikin baru
            $startTime = null;
            if ($orientasiDuniaKerja->time) {
                preg_match('/^(\d{2}:\d{2})/', $orientasiDuniaKerja->time, $matches);
                $startTime = $matches[1] ?? null;
            }

            CalendarEvent::withoutEvents(function () use ($orientasiDuniaKerja, $startTime) {
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
            });
        }
    }

    /**
     * Handle ketika OrientasiDuniaKerja dihapus.
     * 
     * Hapus juga calendar event yang terhubung.
     * 
     * @param OrientasiDuniaKerja $orientasiDuniaKerja
     * @return void
     */
    public function deleted(OrientasiDuniaKerja $orientasiDuniaKerja): void
    {
        // Log activity delete
        ActivityLogger::logDelete($orientasiDuniaKerja);

        // Hapus calendar event kalau ada
        if ($orientasiDuniaKerja->calendarEvent) {
            CalendarEvent::withoutEvents(function () use ($orientasiDuniaKerja) {
                $orientasiDuniaKerja->calendarEvent->delete();
            });
        }
    }

    /**
     * Handle ketika OrientasiDuniaKerja di-restore dari soft delete.
     * 
     * @param OrientasiDuniaKerja $orientasiDuniaKerja
     * @return void
     */
    public function restored(OrientasiDuniaKerja $orientasiDuniaKerja): void
    {
        ActivityLogger::log(
            "Restored career orientation: {$orientasiDuniaKerja->title}",
            $orientasiDuniaKerja,
            'RESTORE'
        );
    }

    /**
     * Handle ketika OrientasiDuniaKerja dihapus permanen.
     * 
     * @param OrientasiDuniaKerja $orientasiDuniaKerja
     * @return void
     */
    public function forceDeleted(OrientasiDuniaKerja $orientasiDuniaKerja): void
    {
        ActivityLogger::log(
            "Force deleted career orientation: {$orientasiDuniaKerja->title}",
            $orientasiDuniaKerja,
            'FORCE_DELETE'
        );
    }
}