<?php

namespace App\Observers;

use App\Models\BerandaSlide;
use App\Helpers\ActivityLogger;

class BerandaSlideObserver
{
    /**
     * Handle ketika Beranda Slide baru ditambahkan.
     * 
     * Log slide baru yang ditambahkan ke homepage.
     * 
     * @param BerandaSlide $berandaSlide
     * @return void
     */
    public function created(BerandaSlide $berandaSlide): void
    {
        ActivityLogger::logCreate(
            $berandaSlide,
            "Added new homepage slide"
        );
    }

    /**
     * Handle ketika Beranda Slide diupdate.
     * 
     * Misal ganti gambar atau ubah urutan.
     * 
     * @param BerandaSlide $berandaSlide
     * @return void
     */
    public function updated(BerandaSlide $berandaSlide): void
    {
        $old = $berandaSlide->getOriginal();
        
        $description = "Updated homepage slide";
        
        if ($old['is_active'] !== $berandaSlide->is_active) {
            $status = $berandaSlide->is_active ? 'activated' : 'deactivated';
            $description .= " - {$status}";
        }
        
        if ($old['sort_order'] !== $berandaSlide->sort_order) {
            $description .= " - Order changed from {$old['sort_order']} to {$berandaSlide->sort_order}";
        }
        
        ActivityLogger::logUpdate($berandaSlide, $old, $description);
    }

    /**
     * Handle ketika Beranda Slide dihapus.
     * 
     * @param BerandaSlide $berandaSlide
     * @return void
     */
    public function deleted(BerandaSlide $berandaSlide): void
    {
        ActivityLogger::logDelete(
            $berandaSlide,
            "Deleted homepage slide"
        );
    }

    /**
     * Handle ketika Beranda Slide di-restore.
     * 
     * @param BerandaSlide $berandaSlide
     * @return void
     */
    public function restored(BerandaSlide $berandaSlide): void
    {
        ActivityLogger::log(
            "Restored homepage slide",
            $berandaSlide,
            'RESTORE'
        );
    }

    /**
     * Handle ketika Beranda Slide dihapus permanen.
     * 
     * @param BerandaSlide $berandaSlide
     * @return void
     */
    public function forceDeleted(BerandaSlide $berandaSlide): void
    {
        ActivityLogger::log(
            "Force deleted homepage slide",
            $berandaSlide,
            'FORCE_DELETE'
        );
    }
}