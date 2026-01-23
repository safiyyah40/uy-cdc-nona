<?php

namespace App\Observers;

use App\Models\User;
use App\Helpers\ActivityLogger;

class UserObserver
{
    /**
     * Handle ketika User baru dibuat.
     * 
     * Log user baru yang register atau ditambahkan admin.
     * 
     * @param User $user
     * @return void
     */
    public function created(User $user): void
    {
        ActivityLogger::logCreate(
            $user,
            "Created new user: {$user->name} ({$user->username})"
        );
    }

    /**
     * Handle ketika User diupdate.
     * 
     * Misal update profil, ganti role, atau update data lainnya.
     * 
     * @param User $user
     * @return void
     */
    public function updated(User $user): void
    {
        $old = $user->getOriginal();
        
        $description = "Updated user: {$user->name}";
        
        if ($old['role'] !== $user->role) {
            $description .= " - Role changed from {$old['role']} to {$user->role}";
        }
        
        if ($old['email'] !== $user->email) {
            $description .= " - Email changed";
        }
        
        ActivityLogger::logUpdate($user, $old, $description);
    }

    /**
     * Handle ketika User dihapus.
     * 
     * @param User $user
     * @return void
     */
    public function deleted(User $user): void
    {
        ActivityLogger::logDelete(
            $user,
            "Deleted user: {$user->name}"
        );
    }

    /**
     * Handle ketika User di-restore.
     * 
     * @param User $user
     * @return void
     */
    public function restored(User $user): void
    {
        ActivityLogger::log(
            "Restored user: {$user->name}",
            $user,
            'RESTORE'
        );
    }

    /**
     * Handle ketika User dihapus permanen.
     * 
     * @param User $user
     * @return void
     */
    public function forceDeleted(User $user): void
    {
        ActivityLogger::log(
            "Force deleted user: {$user->name}",
            $user,
            'FORCE_DELETE'
        );
    }
}