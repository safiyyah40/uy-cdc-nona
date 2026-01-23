<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Support\Str;

/**
 * @property int $id
 * @property string $slug
 * @property string $title
 * @property string $company
 * @property string $location
 * @property string $type
 * @property array<array-key, mixed> $categories
 * @property \Illuminate\Support\Carbon $deadline
 * @property \Illuminate\Support\Carbon $posted_date
 * @property string|null $logo
 * @property string|null $image
 * @property string|null $description
 * @property string|null $requirements
 * @property string|null $benefits
 * @property string|null $application_url
 * @property numeric|null $salary_min
 * @property numeric|null $salary_max
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\CalendarEvent|null $calendarEvent
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang whereApplicationUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang whereBenefits($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang whereCategories($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang whereCompany($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang whereDeadline($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang whereLogo($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang wherePostedDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang whereRequirements($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang whereSalaryMax($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang whereSalaryMin($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang whereUpdatedAt($value)
 * @mixin \Eloquent
 */
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
