<?php

namespace App\Observers;

use App\Helpers\ActivityLogger;
use App\Models\CalendarEvent;
use App\Models\Sertifikasi;

class SertifikasiObserver
{
    /**
     * Handle ketika Sertifikasi baru dibuat.
     *
     * Kalau sertifikasi statusnya 'Published' dan ada start_date, otomatis
     * bikin event di kalender biar mahasiswa tau jadwal sertifikasi.
     */
    public function created(Sertifikasi $sertifikasi): void
    {
        // Log activity create
        ActivityLogger::logCreate($sertifikasi);

        // Bikin calendar event kalau status Published dan ada tanggal
        if ($sertifikasi->status === 'Published' && $sertifikasi->start_date) {
            CalendarEvent::withoutEvents(function () use ($sertifikasi) {
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
                    'color' => '#06b6d4', // Warna cyan untuk sertifikasi
                    'icon' => 'Award',
                    'is_active' => true,
                ]);
            });
        }
    }

    /**
     * Handle ketika Sertifikasi diupdate.
     *
     * Update calendar event yang udah ada. Event cuma aktif kalau status Published.
     * Kalau status jadi Draft/Archived, event di-nonaktifkan.
     */
    public function updated(Sertifikasi $sertifikasi): void
    {
        // Log activity update
        ActivityLogger::logUpdate($sertifikasi, $sertifikasi->getOriginal());

        // Update calendar event kalau ada
        $event = $sertifikasi->calendarEvent;
        if ($event) {
            CalendarEvent::withoutEvents(function () use ($event, $sertifikasi) {
                $event->update([
                    'title' => $sertifikasi->title,
                    'description' => $sertifikasi->provider_name,
                    'start_date' => $sertifikasi->start_date,
                    'end_date' => $sertifikasi->end_date,
                    'location' => $sertifikasi->location,
                    'registration_url' => $sertifikasi->registration_url,
                    'is_active' => $sertifikasi->status === 'Published',
                ]);
            });
        } elseif ($sertifikasi->status === 'Published' && $sertifikasi->start_date) {
            // Kalau belum ada event tapi sekarang Published, bikin baru
            CalendarEvent::withoutEvents(function () use ($sertifikasi) {
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
            });
        }
    }

    /**
     * Handle ketika Sertifikasi dihapus.
     *
     * Hapus juga calendar event yang terhubung.
     */
    public function deleted(Sertifikasi $sertifikasi): void
    {
        // Log activity delete
        ActivityLogger::logDelete($sertifikasi);

        // Hapus calendar event kalau ada
        if ($sertifikasi->calendarEvent) {
            CalendarEvent::withoutEvents(function () use ($sertifikasi) {
                $sertifikasi->calendarEvent->delete();
            });
        }
    }

    /**
     * Handle ketika Sertifikasi di-restore dari soft delete.
     */
    public function restored(Sertifikasi $sertifikasi): void
    {
        ActivityLogger::log(
            "Restored certification: {$sertifikasi->title}",
            $sertifikasi,
            'RESTORE'
        );
    }

    /**
     * Handle ketika Sertifikasi dihapus permanen.
     */
    public function forceDeleted(Sertifikasi $sertifikasi): void
    {
        ActivityLogger::log(
            "Force deleted certification: {$sertifikasi->title}",
            $sertifikasi,
            'FORCE_DELETE'
        );
    }
}
