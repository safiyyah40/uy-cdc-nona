<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Relations\MorphOne;

/**
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property string|null $image
 * @property \Illuminate\Support\Carbon $date
 * @property \Illuminate\Support\Carbon $time
 * @property string|null $speaker
 * @property string|null $organizer
 * @property string|null $location
 * @property string $type
 * @property string|null $description
 * @property string|null $benefits
 * @property string|null $content
 * @property string|null $registration_link
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\CalendarEvent|null $calendarEvent
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar active()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar latest()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar whereBenefits($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar whereOrganizer($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar whereRegistrationLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar whereSpeaker($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar whereTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar whereUpdatedAt($value)
 * @mixin \Eloquent
 */
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
