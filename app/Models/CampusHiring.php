<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Support\Str;

/**
 * @property int $id
 * @property string $slug
 * @property string $title
 * @property string $company_name
 * @property string $location
 * @property \Illuminate\Support\Carbon $date
 * @property string $time
 * @property string $description
 * @property string $content
 * @property string|null $image
 * @property string|null $registration_link
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\CalendarEvent|null $calendarEvent
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampusHiring active()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampusHiring latest()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampusHiring newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampusHiring newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampusHiring query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampusHiring whereCompanyName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampusHiring whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampusHiring whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampusHiring whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampusHiring whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampusHiring whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampusHiring whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampusHiring whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampusHiring whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampusHiring whereRegistrationLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampusHiring whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampusHiring whereTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampusHiring whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampusHiring whereUpdatedAt($value)
 * @mixin \Eloquent
 */
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
        'is_active',
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

    public function calendarEvent(): MorphOne
    {
        return $this->morphOne(CalendarEvent::class, 'eventable');
    }
}