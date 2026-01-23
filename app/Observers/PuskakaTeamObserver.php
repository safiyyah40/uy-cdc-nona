<?php

namespace App\Observers;

use App\Models\PuskakaTeam;
use App\Helpers\ActivityLogger;

class PuskakaTeamObserver
{
    /**
     * Handle ketika Puskaka Team member baru ditambahkan.
     * 
     * Log anggota tim baru yang ditambahkan.
     * 
     * @param PuskakaTeam $puskakaTeam
     * @return void
     */
    public function created(PuskakaTeam $puskakaTeam): void
    {
        ActivityLogger::logCreate(
            $puskakaTeam,
            "Added new team member: {$puskakaTeam->name}"
        );
    }

    /**
     * Handle ketika Puskaka Team member diupdate.
     * 
     * @param PuskakaTeam $puskakaTeam
     * @return void
     */
    public function updated(PuskakaTeam $puskakaTeam): void
    {
        ActivityLogger::logUpdate(
            $puskakaTeam,
            $puskakaTeam->getOriginal(),
            "Updated team member: {$puskakaTeam->name}"
        );
    }

    /**
     * Handle ketika Puskaka Team member dihapus.
     * 
     * @param PuskakaTeam $puskakaTeam
     * @return void
     */
    public function deleted(PuskakaTeam $puskakaTeam): void
    {
        ActivityLogger::logDelete(
            $puskakaTeam,
            "Deleted team member: {$puskakaTeam->name}"
        );
    }

    /**
     * Handle ketika Puskaka Team member di-restore.
     * 
     * @param PuskakaTeam $puskakaTeam
     * @return void
     */
    public function restored(PuskakaTeam $puskakaTeam): void
    {
        ActivityLogger::log(
            "Restored team member: {$puskakaTeam->name}",
            $puskakaTeam,
            'RESTORE'
        );
    }

    /**
     * Handle ketika Puskaka Team member dihapus permanen.
     * 
     * @param PuskakaTeam $puskakaTeam
     * @return void
     */
    public function forceDeleted(PuskakaTeam $puskakaTeam): void
    {
        ActivityLogger::log(
            "Force deleted team member: {$puskakaTeam->name}",
            $puskakaTeam,
            'FORCE_DELETE'
        );
    }
}