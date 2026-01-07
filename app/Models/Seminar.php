<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Seminar extends Model
{
     use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'speaker',
        'organizer',
        'location',
        'event_type',
        'benefit',
        'image',
        'date',
        'time',
        'description',
        'content',
        'registration_link',
        'is_active'
    ];

     protected $casts = [
        'date' => 'date',
        'time' => 'datetime',
        'is_active' => 'boolean',
    ];

     // Auto generate slug
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($seminar) {
            if (empty($seminar->slug)) {
                $seminar->slug = Str::slug($seminar->title);
            }
        });

        static::updating(function ($seminar) {
            if ($seminar->isDirty('title') && empty($seminar->slug)) {
                $seminar->slug = Str::slug($seminar->title);
            }
        });
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Scope untuk sorting terbaru
    public function scopeLatest($query)
    {
        return $query->orderBy('date', 'desc')->orderBy('created_at', 'desc');
    }
    public function calendarEvent(): MorphOne
    {
        return $this->morphOne(CalendarEvent::class, 'eventable');
    }
}
