<?php

namespace App\Observers;

use App\Models\Counselor;
use App\Helpers\ActivityLogger;

class CounselorObserver
{
    /**
     * Handle ketika Counselor baru ditambahkan.
     * 
     * Log siapa konselor baru yang ditambahkan ke sistem.
     * 
     * @param Counselor $counselor
     * @return void
     */
    public function created(Counselor $counselor): void
    {
        ActivityLogger::logCreate(
            $counselor,
            "Added new counselor: {$counselor->name}"
        );
    }

    /**
     * Handle ketika data Counselor diupdate.
     * 
     * Misalnya update foto, kontak, atau status aktif/nonaktif.
     * 
     * @param Counselor $counselor
     * @return void
     */
    public function updated(Counselor $counselor): void
    {
        $old = $counselor->getOriginal();
        
        $description = "Updated counselor: {$counselor->name}";
        
        if ($old['is_active'] !== $counselor->is_active) {
            $status = $counselor->is_active ? 'activated' : 'deactivated';
            $description .= " - {$status}";
        }
        
        ActivityLogger::logUpdate($counselor, $old, $description);
    }

    /**
     * Handle ketika Counselor dihapus.
     * 
     * @param Counselor $counselor
     * @return void
     */
    public function deleted(Counselor $counselor): void
    {
        ActivityLogger::logDelete(
            $counselor,
            "Deleted counselor: {$counselor->name}"
        );
    }

    /**
     * Handle ketika Counselor di-restore.
     * 
     * @param Counselor $counselor
     * @return void
     */
    public function restored(Counselor $counselor): void
    {
        ActivityLogger::log(
            "Restored counselor: {$counselor->name}",
            $counselor,
            'RESTORE'
        );
    }

    /**
     * Handle ketika Counselor dihapus permanen.
     * 
     * @param Counselor $counselor
     * @return void
     */
    public function forceDeleted(Counselor $counselor): void
    {
        ActivityLogger::log(
            "Force deleted counselor: {$counselor->name}",
            $counselor,
            'FORCE_DELETE'
        );
    }
}