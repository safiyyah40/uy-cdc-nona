<?php

namespace App\Observers;

use App\Models\CounselingBooking;
use App\Models\CalendarEvent;
use App\Helpers\ActivityLogger;

class CounselingBookingObserver
{
    /**
     * Handle ketika CounselingBooking baru dibuat.
     * 
     * Otomatis bikin CalendarEvent baru untuk mahasiswa yang booking konseling.
     * Event ini muncul di kalender mahasiswa dengan detail jadwal dan konselor.
     * 
     * @param CounselingBooking $counselingBooking
     * @return void
     */
    public function created(CounselingBooking $counselingBooking): void
    {
        // Log activity dulu sebelum bikin calendar event
        ActivityLogger::logCreate(
            $counselingBooking, 
            "Created counseling booking for {$counselingBooking->student_name}"
        );

        // Bikin calendar event tanpa trigger observer lagi (avoid double logging)
        CalendarEvent::withoutEvents(function () use ($counselingBooking) {
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
        });
    }

    /**
     * Handle ketika CounselingBooking diupdate (misal status berubah).
     * 
     * Update calendar event yang sesuai dengan data booking terbaru.
     * Kalau status jadi rejected/cancelled, event di-nonaktifkan di kalender.
     * 
     * @param CounselingBooking $counselingBooking
     * @return void
     */
    public function updated(CounselingBooking $counselingBooking): void
    {
        // Ambil data lama untuk log perubahan
        $old = $counselingBooking->getOriginal();
        
        // Custom description untuk log, kasih tau kalau status berubah
        $description = "Updated counseling booking for {$counselingBooking->student_name}";
        if ($old['status'] !== $counselingBooking->status) {
            $description .= " - Status changed from {$old['status']} to {$counselingBooking->status}";
        }
        
        // Log activity update
        ActivityLogger::logUpdate($counselingBooking, $old, $description);

        // Update calendar event tanpa trigger observer
        $event = $counselingBooking->calendarEvent;

        if ($event) {
            // Nonaktifkan event kalau booking rejected atau cancelled
            $isActive = !in_array($counselingBooking->status, ['rejected', 'cancelled']);
            
            CalendarEvent::withoutEvents(function () use ($event, $counselingBooking, $isActive) {
                $event->update([
                    'start_date' => $counselingBooking->scheduled_date,
                    'start_time' => $counselingBooking->scheduled_time,
                    'is_active' => $isActive,
                    'description' => 'Status: ' . ucfirst($counselingBooking->status) . ' | Konselor: ' . $counselingBooking->counselor_name,
                ]);
            });
        }
    }

    /**
     * Handle ketika CounselingBooking dihapus (soft delete).
     * 
     * Cukup log aja, calendar event dibiarkan karena mungkin masih perlu history.
     * 
     * @param CounselingBooking $counselingBooking
     * @return void
     */
    public function deleted(CounselingBooking $counselingBooking): void
    {
        ActivityLogger::logDelete(
            $counselingBooking, 
            "Deleted counseling booking for {$counselingBooking->student_name}"
        );
    }

    /**
     * Handle ketika CounselingBooking di-restore dari soft delete.
     * 
     * Log kalau ada data yang di-restore.
     * 
     * @param CounselingBooking $counselingBooking
     * @return void
     */
    public function restored(CounselingBooking $counselingBooking): void
    {
        ActivityLogger::log(
            "Restored counseling booking for {$counselingBooking->student_name}",
            $counselingBooking,
            'RESTORE'
        );
    }

    /**
     * Handle ketika CounselingBooking dihapus permanen (force delete).
     * 
     * @param CounselingBooking $counselingBooking
     * @return void
     */
    public function forceDeleted(CounselingBooking $counselingBooking): void
    {
        ActivityLogger::log(
            "Force deleted counseling booking for {$counselingBooking->student_name}",
            $counselingBooking,
            'FORCE_DELETE'
        );
    }
}