<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Support\Str;

class Magang extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'company',
        'location',
        'type',
        'categories',
        'deadline',
        'posted_date',
        'logo',
        'image',
        'description',
        'requirements',
        'benefits',
        'application_url',
        'salary_min',
        'salary_max',
        'is_active',
    ];

    protected $casts = [
        'categories' => 'array',
        'deadline' => 'date',
        'posted_date' => 'date',
        'salary_min' => 'decimal:2',
        'salary_max' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    // Auto-generate slug dari title
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($magang) {
            if (empty($magang->slug)) {
                $magang->slug = Str::slug($magang->title);
            }
            if (empty($magang->posted_date)) {
                $magang->posted_date = now();
            }
        });

        static::updating(function ($magang) {
            if ($magang->isDirty('title') && ! $magang->isDirty('slug')) {
                $magang->slug = Str::slug($magang->title);
            }
        });
    }

    public function calendarEvent(): MorphOne
    {
        return $this->morphOne(CalendarEvent::class, 'eventable');
    }
}
