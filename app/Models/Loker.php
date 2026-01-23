<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;

/**
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property string $company
 * @property string $location
 * @property string $type
 * @property string $work_model
 * @property string $experience_level
 * @property array<array-key, mixed> $categories
 * @property numeric|null $salary_min
 * @property numeric|null $salary_max
 * @property \Illuminate\Support\Carbon $deadline
 * @property \Illuminate\Support\Carbon $posted_date
 * @property string|null $logo
 * @property string|null $image
 * @property string $description
 * @property string|null $requirements
 * @property string|null $benefits
 * @property string|null $application_url
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\CalendarEvent|null $calendarEvent
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereApplicationUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereBenefits($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereCategories($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereCompany($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereDeadline($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereExperienceLevel($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereLogo($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker wherePostedDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereRequirements($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereSalaryMax($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereSalaryMin($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereWorkModel($value)
 * @mixin \Eloquent
 */
class Loker extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'slug', 'company', 'location',
        'type', 'work_model', 'experience_level', 'categories',
        'salary_min', 'salary_max', 'deadline', 'posted_date',
        'logo', 'image', 'description', 'requirements', 'benefits',
        'application_url', 'is_active',
    ];

    protected $guarded = ['id'];

    protected $casts = [
        'categories' => 'array',
        'deadline' => 'datetime',
        'posted_date' => 'datetime',
        'salary_min' => 'decimal:2',
        'salary_max' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    public function calendarEvent(): MorphOne
    {
        return $this->morphOne(CalendarEvent::class, 'eventable');
    }
}
