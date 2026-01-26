<?php

namespace App\Helpers;

use App\Models\AdminActivityLog;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class ActivityLogger
{
    /**
     * Main log method - base untuk semua logging
     * * @param string $description
     * @param mixed $subject
     * @param string|null $event
     * @param array $properties
     * @return void
     */
    public static function log(string $description, $subject = null, ?string $event = null, array $properties = [])
    {
        $causer = Auth::user();
        
        AdminActivityLog::create([
            'log_name' => 'admin',
            'description' => $description,
            'subject_type' => $subject ? get_class($subject) : null,
            'subject_id' => $subject->id ?? null,
            'causer_type' => $causer ? get_class($causer) : null,
            'causer_id' => $causer->id ?? null,
            'properties' => $properties,
            'event' => $event,
            'ip_address' => Request::ip(),
            'user_agent' => Request::userAgent(),
        ]);
    }

    /**
     * Log user login
     */
    public static function logLogin()
    {
        self::log('Pengguna masuk ke sistem (Login)', null, 'LOGIN');
    }

    /**
     * Log user logout
     */
    public static function logLogout()
    {
        self::log('Pengguna keluar dari sistem (Logout)', null, 'LOGOUT');
    }

    /**
     * Log create operation
     * * @param Model $model
     * @param string|null $description
     * @return void
     */
    public static function logCreate($model, ?string $description = null)
    {
        $modelName = self::getModelDisplayName($model);
        
        // Tambahan untuk User: bedakan LDAP vs Lokal
        $extraInfo = '';
        if ($model instanceof \App\Models\User) {
            $accountType = $model->isLdapUser() ? 'LDAP' : 'Lokal';
            $extraInfo = " ({$accountType})";
        }
        
        self::log(
            $description ?? "Menambahkan data {$modelName}{$extraInfo}: " . self::getModelTitle($model),
            $model,
            'CREATE',
            ['attributes' => $model->getAttributes()]
        );
    }

    /**
     * Log update operation
     * * @param Model $model
     * @param array $oldValues
     * @param string|null $description
     * @return void
     */
    public static function logUpdate($model, array $oldValues, ?string $description = null)
    {
        $modelName = self::getModelDisplayName($model);
        
        self::log(
            $description ?? "Memperbarui data {$modelName}: " . self::getModelTitle($model),
            $model,
            'UPDATE',
            [
                'lama' => $oldValues,
                'baru' => $model->getAttributes(),
                'perubahan' => $model->getChanges(),
            ]
        );
    }

    /**
     * Log delete operation
     * * @param Model $model
     * @param string|null $description
     * @return void
     */
    public static function logDelete($model, ?string $description = null)
    {
        $modelName = self::getModelDisplayName($model);
        
        // Tambahan untuk User: bedakan LDAP vs Lokal
        $extraInfo = '';
        if ($model instanceof \App\Models\User) {
            $accountType = $model->isLdapUser() ? 'LDAP' : 'Lokal';
            $extraInfo = " ({$accountType})";
        }
        
        self::log(
            $description ?? "Menghapus data {$modelName}{$extraInfo}: " . self::getModelTitle($model),
            $model,
            'DELETE',
            ['attributes' => $model->getAttributes()]
        );
    }
    
    /**
     * Log security events
     * Untuk login attempts, permission changes, dll
     * * @param string $event
     * @param array $context
     * @return void
     */
    public static function logSecurity(string $event, array $context = [])
    {
        $causer = Auth::user();
        
        self::log(
            "PERISTIWA KEAMANAN: {$event}",
            null,
            'SECURITY',
            array_merge([
                'event_type' => $event,
                'causer_info' => self::getActorInfo($causer),
                'ip_address' => Request::ip(),
                'user_agent' => Request::userAgent(),
            ], $context)
        );
    }

    /**
     * Log LDAP sync activities
     * * @param string $action
     * @param array $details
     * @return void
     */
    public static function logLdapSync(string $action, array $details = [])
    {
        self::log(
            "SINKRONISASI LDAP: {$action}",
            null,
            'LDAP_SYNC',
            array_merge([
                'sync_type' => 'LDAP',
                'action' => $action,
            ], $details)
        );
    }

    /**
     * Log profile completion changes
     * * @param Model $user
     * @param bool $oldStatus
     * @param bool $newStatus
     * @return void
     */
    public static function logProfileCompletion(Model $user, bool $oldStatus, bool $newStatus)
    {
        $status = $newStatus ? 'Lengkap' : 'Belum Lengkap';
        
        self::log(
            "Status profil diubah menjadi {$status} untuk pengguna: {$user->name}",
            $user,
            'PROFILE_UPDATE',
            [
                'user_id' => $user->id,
                'username' => $user->username,
                'role' => $user->role,
                'old_status' => $oldStatus,
                'new_status' => $newStatus,
            ]
        );
    }

    /**
     * Log blocked delete attempt
     * * @param Model $model
     * @param string $reason
     * @return void
     */
    public static function logBlockedDelete(Model $model, string $reason)
    {
        $modelName = self::getModelDisplayName($model);
        
        self::log(
            "PENGHAPUSAN DITOLAK: {$modelName} - {$reason}",
            $model,
            'DELETE_BLOCKED',
            [
                'alasan' => $reason,
                'data_model' => $model->toArray(),
                'dicoba_oleh' => self::getActorInfo(),
            ]
        );
    }

    /**
     * Log delete initiation (before actual delete)
     * * @param Model $model
     * @return void
     */
    public static function logDeleteInitiated(Model $model)
    {
        $modelName = self::getModelDisplayName($model);
        
        self::log(
            "Bersiap menghapus {$modelName}: " . self::getModelTitle($model),
            $model,
            'DELETE_INITIATED',
            [
                'data_model' => $model->toArray(),
            ]
        );
    }

    /**
     * Log restore operation (for soft deletes)
     * * @param Model $model
     * @return void
     */
    public static function logRestore(Model $model)
    {
        $modelName = self::getModelDisplayName($model);
        
        self::log(
            "Memulihkan data (Restore) {$modelName}: " . self::getModelTitle($model),
            $model,
            'RESTORE',
            ['attributes' => $model->getAttributes()]
        );
    }

    /**
     * Log force delete operation (permanent delete)
     * * @param Model $model
     * @return void
     */
    public static function logForceDelete(Model $model)
    {
        $modelName = self::getModelDisplayName($model);
        
        self::log(
            "MENGHAPUS PERMANEN (Force Delete) {$modelName}: " . self::getModelTitle($model),
            $model,
            'FORCE_DELETE',
            ['attributes' => $model->getAttributes()]
        );
    }

    /**
     * Get informasi user yang melakukan aksi
     * * @param mixed $user
     * @return array
     */
    private static function getActorInfo($user = null): array
    {
        $user = $user ?? Auth::user();

        if (!$user) {
            return [
                'id' => null,
                'name' => 'Sistem/Tamu',
                'email' => null,
                'type' => 'tidak_terautentikasi',
            ];
        }

        $info = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'username' => $user->username ?? null,
            'role' => $user->role ?? null,
        ];

        // Tambahkan tipe akun jika User model
        if ($user instanceof \App\Models\User) {
            $info['type'] = $user->isLdapUser() ? 'ldap' : 'lokal';
        }

        return $info;
    }
    
    /**
     * Get friendly model name (Indonesian)
     * * @param Model $model
     * @return string
     */
    private static function getModelDisplayName($model): string
    {
        $className = class_basename($model);
        
        // Map nama model ke nama yang lebih friendly (Bahasa Indonesia)
        $map = [
            'User' => 'Pengguna',
            'Loker' => 'Lowongan Kerja',
            'Magang' => 'Lowongan Magang',
            'Berita' => 'Berita & Artikel',
            'BerandaSlide' => 'Slide Beranda',
            'CampusHiring' => 'Campus Hiring',
            'CounselingBooking' => 'Jadwal Konseling',
            'Counselor' => 'Konselor',
            'CounselorSlot' => 'Slot Waktu Konselor',
            'CvReview' => 'Review CV',
            'CvTemplate' => 'Template CV',
            'OrientasiDuniaKerja' => 'Orientasi Dunia Kerja (ODK)',
            'AdminActivityLog' => 'Log Aktivitas',
        ];
        
        return $map[$className] ?? $className;
    }
    
    /**
     * Get model title/name for logging
     * * @param Model $model
     * @return string
     */
    private static function getModelTitle($model): string
    {
        // Prioritas berbeda untuk User
        if ($model instanceof \App\Models\User) {
            return "{$model->name} ({$model->username})";
        }
        
        // Coba ambil title, name, atau judul
        if (isset($model->title)) return $model->title;
        if (isset($model->name)) return $model->name;
        if (isset($model->judul_template)) return $model->judul_template;
        if (isset($model->company)) return $model->company;
        if (isset($model->judul)) return $model->judul;
        if (isset($model->nama)) return $model->nama;
        
        return "#{$model->id}";
    }
}