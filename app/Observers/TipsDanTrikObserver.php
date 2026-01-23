<?php

namespace App\Observers;

use App\Models\TipsDanTrik;
use App\Helpers\ActivityLogger;

class TipsDanTrikObserver
{
    /**
     * Handle ketika Tips & Trik baru dibuat.
     * 
     * Log tips baru yang ditambahkan untuk mahasiswa.
     * 
     * @param TipsDanTrik $tipsDanTrik
     * @return void
     */
    public function created(TipsDanTrik $tipsDanTrik): void
    {
        ActivityLogger::logCreate($tipsDanTrik);
    }

    /**
     * Handle ketika Tips & Trik diupdate.
     * 
     * @param TipsDanTrik $tipsDanTrik
     * @return void
     */
    public function updated(TipsDanTrik $tipsDanTrik): void
    {
        ActivityLogger::logUpdate($tipsDanTrik, $tipsDanTrik->getOriginal());
    }

    /**
     * Handle ketika Tips & Trik dihapus.
     * 
     * @param TipsDanTrik $tipsDanTrik
     * @return void
     */
    public function deleted(TipsDanTrik $tipsDanTrik): void
    {
        ActivityLogger::logDelete($tipsDanTrik);
    }

    /**
     * Handle ketika Tips & Trik di-restore.
     * 
     * @param TipsDanTrik $tipsDanTrik
     * @return void
     */
    public function restored(TipsDanTrik $tipsDanTrik): void
    {
        ActivityLogger::log(
            "Restored tips & tricks",
            $tipsDanTrik,
            'RESTORE'
        );
    }

    /**
     * Handle ketika Tips & Trik dihapus permanen.
     * 
     * @param TipsDanTrik $tipsDanTrik
     * @return void
     */
    public function forceDeleted(TipsDanTrik $tipsDanTrik): void
    {
        ActivityLogger::log(
            "Force deleted tips & tricks",
            $tipsDanTrik,
            'FORCE_DELETE'
        );
    }
}