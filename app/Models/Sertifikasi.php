<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

/**
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property string|null $description
 * @property string|null $content
 * @property string $provider_name
 * @property string|null $logo
 * @property array<array-key, mixed> $categories
 * @property string $type
 * @property string $level
 * @property string $mode
 * @property string|null $location
 * @property string|null $duration
 * @property \Illuminate\Support\Carbon|null $start_date
 * @property \Illuminate\Support\Carbon|null $end_date
 * @property bool $is_self_paced
 * @property numeric|null $fee
 * @property bool $is_free
 * @property string $fee_currency
 * @property string|null $requirements
 * @property string|null $benefits
 * @property string|null $syllabus
 * @property string|null $registration_url
 * @property \Illuminate\Support\Carbon|null $registration_deadline
 * @property bool $is_registration_open
 * @property string|null $brochure_pdf
 * @property string|null $certificate_sample
 * @property int|null $quota
 * @property int $enrolled_count
 * @property string $status
 * @property int $view_count
 * @property string|null $meta_title
 * @property string|null $meta_description
 * @property array<array-key, mixed>|null $tags
 * @property \Illuminate\Support\Carbon|null $published_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property bool $is_active
 * @property-read \App\Models\CalendarEvent|null $calendarEvent
 * @property-read mixed $formatted_fee
 * @property-read mixed $is_deadline_soon
 * @property-read mixed $is_full
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi active()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi published()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereBenefits($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereBrochurePdf($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereCategories($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereCertificateSample($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereDuration($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereEnrolledCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereFee($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereFeeCurrency($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereIsFree($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereIsRegistrationOpen($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereIsSelfPaced($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereLevel($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereLogo($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereMetaDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereMetaTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereMode($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereProviderName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi wherePublishedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereQuota($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereRegistrationDeadline($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereRegistrationUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereRequirements($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereSyllabus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereTags($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereViewCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi withTrashed(bool $withTrashed = true)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi withoutTrashed()
 * @mixin \Eloquent
 */
class Sertifikasi extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'content',
        'provider_name',
        'logo',
        'categories',
        'type',
        'level',
        'mode',
        'location',
        'duration',
        'start_date',
        'end_date',
        'is_self_paced',
        'fee',
        'is_free',
        'fee_currency',
        'requirements',
        'benefits',
        'syllabus',
        'registration_url',
        'registration_deadline',
        'is_registration_open',
        'brochure_pdf',
        'certificate_sample',
        'quota',
        'enrolled_count',
        'status',
        'view_count',
        'meta_title',
        'meta_description',
        'tags',
        'is_active',
        'published_at',
    ];

    protected $casts = [
        'categories' => 'array',
        'tags' => 'array',
        'start_date' => 'date',
        'end_date' => 'date',
        'registration_deadline' => 'date',
        'published_at' => 'datetime',
        'is_self_paced' => 'boolean',
        'is_free' => 'boolean',
        'is_registration_open' => 'boolean',
        'fee' => 'decimal:2',
        'quota' => 'integer',
        'enrolled_count' => 'integer',
        'view_count' => 'integer',
        'is_active' => 'boolean',
    ];

    // Auto-generate slug
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($sertifikasi) {
            if (empty($sertifikasi->slug)) {
                $sertifikasi->slug = Str::slug($sertifikasi->title);
            }
        });

        static::updating(function ($sertifikasi) {
            if ($sertifikasi->isDirty('title') && empty($sertifikasi->slug)) {
                $sertifikasi->slug = Str::slug($sertifikasi->title);
            }
        });
    }

    // Scopes
    public function scopePublished($query)
    {
        return $query->where('status', 'Published')
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }

    public function scopeActive($query)
    {
        return $query->where('is_registration_open', true);
    }

    // Accessors
    public function getFormattedFeeAttribute()
    {
        if ($this->is_free) {
            return 'Gratis';
        }

        return number_format($this->fee, 0, ',', '.').' '.$this->fee_currency;
    }

    public function getIsDeadlineSoonAttribute()
    {
        if (! $this->registration_deadline) {
            return false;
        }

        $deadline = $this->registration_deadline;
        $daysUntilDeadline = now()->diffInDays($deadline, false);

        return $daysUntilDeadline <= 7 && $daysUntilDeadline > 0;
    }

    public function getIsFullAttribute()
    {
        if (! $this->quota) {
            return false;
        }

        return $this->enrolled_count >= $this->quota;
    }

    // Helper methods
    public function incrementViewCount()
    {
        $this->increment('view_count');
    }

    public function incrementEnrolledCount()
    {
        $this->increment('enrolled_count');
    }

    public function calendarEvent(): MorphOne
    {
        return $this->morphOne(CalendarEvent::class, 'eventable');
    }
}
