<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

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
