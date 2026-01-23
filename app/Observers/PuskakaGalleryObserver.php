<?php

namespace App\Observers;

use App\Models\PuskakaGallery;
use App\Helpers\ActivityLogger;

class PuskakaGalleryObserver
{
    /**
     * Handle ketika Puskaka Gallery item baru ditambahkan.
     * 
     * Log foto/video baru yang ditambahkan ke gallery.
     * 
     * @param PuskakaGallery $puskakaGallery
     * @return void
     */
    public function created(PuskakaGallery $puskakaGallery): void
    {
        ActivityLogger::logCreate(
            $puskakaGallery,
            "Added new gallery item"
        );
    }

    /**
     * Handle ketika Puskaka Gallery diupdate.
     * 
     * @param PuskakaGallery $puskakaGallery
     * @return void
     */
    public function updated(PuskakaGallery $puskakaGallery): void
    {
        ActivityLogger::logUpdate(
            $puskakaGallery,
            $puskakaGallery->getOriginal(),
            "Updated gallery item"
        );
    }

    /**
     * Handle ketika Puskaka Gallery dihapus.
     * 
     * @param PuskakaGallery $puskakaGallery
     * @return void
     */
    public function deleted(PuskakaGallery $puskakaGallery): void
    {
        ActivityLogger::logDelete(
            $puskakaGallery,
            "Deleted gallery item"
        );
    }

    /**
     * Handle ketika Puskaka Gallery di-restore.
     * 
     * @param PuskakaGallery $puskakaGallery
     * @return void
     */
    public function restored(PuskakaGallery $puskakaGallery): void
    {
        ActivityLogger::log(
            "Restored gallery item",
            $puskakaGallery,
            'RESTORE'
        );
    }

    /**
     * Handle ketika Puskaka Gallery dihapus permanen.
     * 
     * @param PuskakaGallery $puskakaGallery
     * @return void
     */
    public function forceDeleted(PuskakaGallery $puskakaGallery): void
    {
        ActivityLogger::log(
            "Force deleted gallery item",
            $puskakaGallery,
            'FORCE_DELETE'
        );
    }
}