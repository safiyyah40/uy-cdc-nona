<?php

namespace App\Observers;

use App\Models\RiasecCategory;
use App\Helpers\ActivityLogger;

class RiasecCategoryObserver
{
    /**
     * Handle ketika RIASEC Category baru dibuat.
     * 
     * Log kategori RIASEC baru (R, I, A, S, E, C).
     * 
     * @param RiasecCategory $riasecCategory
     * @return void
     */
    public function created(RiasecCategory $riasecCategory): void
    {
        ActivityLogger::logCreate(
            $riasecCategory,
            "Created RIASEC category: {$riasecCategory->code}"
        );
    }

    /**
     * Handle ketika RIASEC Category diupdate.
     * 
     * @param RiasecCategory $riasecCategory
     * @return void
     */
    public function updated(RiasecCategory $riasecCategory): void
    {
        ActivityLogger::logUpdate(
            $riasecCategory,
            $riasecCategory->getOriginal(),
            "Updated RIASEC category: {$riasecCategory->code}"
        );
    }

    /**
     * Handle ketika RIASEC Category dihapus.
     * 
     * @param RiasecCategory $riasecCategory
     * @return void
     */
    public function deleted(RiasecCategory $riasecCategory): void
    {
        ActivityLogger::logDelete(
            $riasecCategory,
            "Deleted RIASEC category: {$riasecCategory->code}"
        );
    }

    /**
     * Handle ketika RIASEC Category di-restore.
     * 
     * @param RiasecCategory $riasecCategory
     * @return void
     */
    public function restored(RiasecCategory $riasecCategory): void
    {
        ActivityLogger::log(
            "Restored RIASEC category: {$riasecCategory->code}",
            $riasecCategory,
            'RESTORE'
        );
    }

    /**
     * Handle ketika RIASEC Category dihapus permanen.
     * 
     * @param RiasecCategory $riasecCategory
     * @return void
     */
    public function forceDeleted(RiasecCategory $riasecCategory): void
    {
        ActivityLogger::log(
            "Force deleted RIASEC category: {$riasecCategory->code}",
            $riasecCategory,
            'FORCE_DELETE'
        );
    }
}