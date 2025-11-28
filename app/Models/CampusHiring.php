<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class CampusHiring extends Model
{
    protected $fillable = [
        'slug',
        'title',
        'company_name',
        'location',
        'date',
        'time',
        'description',
        'content',
        'image',
        'registration_link',
        'is_active'
    ];

    protected $casts = [
        'date' => 'date',
        'is_active' => 'boolean',
    ];

     // Auto generate slug
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($campusHiring) {
            if (empty($campusHiring->slug)) {
                $campusHiring->slug = Str::slug($campusHiring->title);
            }
        });

        static::updating(function ($campusHiring) {
            if ($campusHiring->isDirty('title') && empty($campusHiring->slug)) {
                $campusHiring->slug = Str::slug($campusHiring->title);
            }
        });
    }

    // Scope untuk data aktif
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Scope untuk sorting terbaru
    public function scopeLatest($query)
    {
        return $query->orderBy('date', 'desc')->orderBy('created_at', 'desc');
    }
}
