<?php

namespace App\Helpers;

use App\Models\AdminActivityLog;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class ActivityLogger
{
    public static function log(string $description, $subject = null, ?string $event = null, array $properties = [])
    {
        $causer = Auth::user();
        
        AdminActivityLog::create([
            'log_name' => 'admin',
            'description' => $description,
            'subject_type' => $subject ? get_class($subject) : null,
            'subject_id' => $subject?->id ?? null,
            'causer_type' => $causer ? get_class($causer) : null,
            'causer_id' => $causer?->id ?? null,
            'properties' => $properties,
            'event' => $event,
            'ip_address' => Request::ip(),
            'user_agent' => Request::userAgent(),
        ]);
    }

    public static function logLogin()
    {
        self::log('Admin login', null, 'LOGIN');
    }

    public static function logLogout()
    {
        self::log('Admin logout', null, 'LOGOUT');
    }

    public static function logCreate($model, ?string $description = null)
    {
        $modelName = self::getModelDisplayName($model);
        
        self::log(
            $description ?? "Created {$modelName}: " . self::getModelTitle($model),
            $model,
            'CREATE',
            ['attributes' => $model->getAttributes()]
        );
    }

    public static function logUpdate($model, array $oldValues, ?string $description = null)
    {
        $modelName = self::getModelDisplayName($model);
        
        self::log(
            $description ?? "Updated {$modelName}: " . self::getModelTitle($model),
            $model,
            'UPDATE',
            [
                'old' => $oldValues,
                'new' => $model->getAttributes()
            ]
        );
    }

    public static function logDelete($model, ?string $description = null)
    {
        $modelName = self::getModelDisplayName($model);
        
        self::log(
            $description ?? "Deleted {$modelName}: " . self::getModelTitle($model),
            $model,
            'DELETE',
            ['attributes' => $model->getAttributes()]
        );
    }
    
    /**
     * Get friendly model name
     */
    private static function getModelDisplayName($model): string
    {
        $className = class_basename($model);
        
        // Map nama model ke nama yang lebih friendly
        $map = [
            'Loker' => 'Job Opportunity',
            'Magang' => 'Internship',
            'Berita' => 'News',
            'BerandaSlide' => 'Homepage Slide',
            'CampusHiring' => 'Campus Hiring',
            'CounselingBooking' => 'Counseling Booking',
            'CvReview' => 'CV Review',
            'CvTemplate' => 'CV Template',
            'OrientasiDuniaKerja' => 'Career Orientation',
        ];
        
        return $map[$className] ?? $className;
    }
    
    /**
     * Get model title/name for logging
     */
    private static function getModelTitle($model): string
    {
        // Coba ambil title, name, atau judul
        if (isset($model->title)) return $model->title;
        if (isset($model->name)) return $model->name;
        if (isset($model->judul_template)) return $model->judul_template;
        if (isset($model->company)) return $model->company;
        
        return "#{$model->id}";
    }
}