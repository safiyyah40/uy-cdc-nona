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
     * Bedakan antara akun LDAP dan akun lokal.
     * 
     * @param User $user
     * @return void
     */
    public function created(User $user): void
    {
        $accountType = $user->isLdapUser() ? 'LDAP' : 'Lokal';
        $description = "Created new {$accountType} user: {$user->name} ({$user->username})";
        
        // Tambahan info untuk akun lokal
        if ($user->isLocalUser()) {
            $description .= " - Role: {$user->role}";
            if ($user->id_number) {
                $description .= " - ID: {$user->id_number}";
            }
        }
        
        ActivityLogger::logCreate($user, $description);
    }

    /**
     * Handle ketika User diupdate.
     * 
     * Misal update profil, ganti role, atau update data lainnya.
     * Log perubahan penting termasuk profile completeness.
     * 
     * @param User $user
     * @return void
     */
    public function updated(User $user): void
    {
        $old = $user->getOriginal();
        $changes = [];
        
        // Track perubahan role (PENTING untuk keamanan)
        if ($old['role'] !== $user->role) {
            $changes[] = "Role changed from '{$old['role']}' to '{$user->role}'";
            
            // Warning jika ada yang coba ubah role user LDAP
            if ($user->isLdapUser()) {
                $changes[] = "⚠️ WARNING: LDAP user role changed manually!";
            }
        }
        
        // Track perubahan email
        if ($old['email'] !== $user->email) {
            $changes[] = "Email changed from '{$old['email']}' to '{$user->email}'";
        }
        
        // Track perubahan phone (trigger auto-complete)
        if ($old['phone'] !== $user->phone) {
            $changes[] = "Phone updated";
        }
        
        // Track perubahan profile completeness
        if ($old['is_profile_complete'] !== $user->is_profile_complete) {
            $status = $user->is_profile_complete ? 'complete' : 'incomplete';
            $changes[] = "Profile marked as {$status}";
        }
        
        // Track perubahan faculty/study_program (mahasiswa)
        if ($user->role === 'mahasiswa') {
            if ($old['faculty'] !== $user->faculty) {
                $changes[] = "Faculty updated to '{$user->faculty}'";
            }
            if ($old['study_program'] !== $user->study_program) {
                $changes[] = "Study program updated to '{$user->study_program}'";
            }
        }
        
        // Track perubahan username (sensitif!)
        if ($old['username'] !== $user->username) {
            $changes[] = "USERNAME diubah from '{$old['username']}' to '{$user->username}'";
        }
        
        $description = "Updated user: {$user->name}";
        if (!empty($changes)) {
            $description .= " - " . implode(', ', $changes);
        }
        
        ActivityLogger::logUpdate($user, $old, $description);
    }

    /**
     * Handle sebelum User dihapus.
     * 
     * VALIDASI KEAMANAN: Cegah penghapusan akun yang dilindungi.
     * 
     * @param User $user
     * @return bool|null False untuk cancel delete
     */
    public function deleting(User $user): ?bool
    {
        // Cek apakah user bisa dihapus
        if (!$user->canDelete()) {
            $reason = $this->getProtectionReason($user);
            
            ActivityLogger::log(
                "BLOCKED DELETE ATTEMPT: {$user->name} ({$user->username}) - {$reason}",
                $user,
                'DELETE_BLOCKED'
            );
            
            // Throw exception untuk stop proses delete
            throw new \Exception("Akun ini tidak dapat dihapus: {$reason}");
        }
        
        // Log sebelum delete (untuk audit trail)
        ActivityLogger::log(
            "Preparing to delete user: {$user->name} ({$user->username}) - Role: {$user->role}",
            $user,
            'DELETE_INITIATED'
        );
        
        return true; // Allow delete
    }

    /**
     * Handle ketika User dihapus.
     * 
     * @param User $user
     * @return void
     */
    public function deleted(User $user): void
    {
        $accountType = $user->isLdapUser() ? 'LDAP' : 'Lokal';
        
        ActivityLogger::logDelete(
            $user,
            "Deleted {$accountType} user: {$user->name} ({$user->username}) - Role: {$user->role}"
        );
    }

    /**
     * Handle ketika User di-restore (jika menggunakan SoftDeletes).
     * 
     * @param User $user
     * @return void
     */
    public function restored(User $user): void
    {
        ActivityLogger::log(
            "Restored user: {$user->name} ({$user->username}) - Role: {$user->role}",
            $user,
            'RESTORE'
        );
    }

    /**
     * Handle ketika User dihapus permanen (force delete).
     * 
     * @param User $user
     * @return void
     */
    public function forceDeleted(User $user): void
    {
        ActivityLogger::log(
            "FORCE DELETED user permanently: {$user->name} ({$user->username}) - Role: {$user->role}",
            $user,
            'FORCE_DELETE'
        );
    }

    /**
     * Get alasan kenapa akun dilindungi dari penghapusan.
     * 
     * @param User $user
     * @return string
     */
    private function getProtectionReason(User $user): string
    {
        if ($user->username === 'admin.puskaka') {
            return 'Super Admin account (system protected)';
        }
        
        if ($user->isLdapUser()) {
            return 'LDAP synchronized account (managed by LDAP server)';
        }
        
        return 'Unknown protection reason';
    }
}