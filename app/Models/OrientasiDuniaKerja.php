<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Relations\MorphOne;

/**
 * @property int $id
 * @property string $slug
 * @property string $title
 * @property array<array-key, mixed> $categories
 * @property string|null $location
 * @property \Illuminate\Support\Carbon|null $date
 * @property string|null $time
 * @property string $description
 * @property string $content
 * @property string|null $image
 * @property string|null $registration_link
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\CalendarEvent|null $calendarEvent
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrientasiDuniaKerja active()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrientasiDuniaKerja newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrientasiDuniaKerja newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrientasiDuniaKerja query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrientasiDuniaKerja whereCategories($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrientasiDuniaKerja whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrientasiDuniaKerja whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrientasiDuniaKerja whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrientasiDuniaKerja whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrientasiDuniaKerja whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrientasiDuniaKerja whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrientasiDuniaKerja whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrientasiDuniaKerja whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrientasiDuniaKerja whereRegistrationLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrientasiDuniaKerja whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrientasiDuniaKerja whereTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrientasiDuniaKerja whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrientasiDuniaKerja whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class OrientasiDuniaKerja extends Model
{
    protected $fillable = [
        'slug', 'title', 'categories', 'location', 'date', 
        'time', 'description', 'content', 'image', 
        'registration_link', 'is_active'
    ];

    protected $casts = [
        'date' => 'date',
        'is_active' => 'boolean',
        'categories' => 'array',
    ];

    // Auto generate slug saat membuat/update data
    protected static function boot()
    {
        parent::boot();
        static::creating(fn ($model) => $model->slug = Str::slug($model->title));
        static::updating(fn ($model) => $model->slug = Str::slug($model->title));
    }

    // Scope untuk mengambil data yang aktif saja
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function calendarEvent(): MorphOne
    {
        return $this->morphOne(CalendarEvent::class, 'eventable');
    }
}