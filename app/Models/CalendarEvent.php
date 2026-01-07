<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class CalendarEvent extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'eventable_id',
        'eventable_type',
        'title',
        'description',
        'start_date',
        'end_date',
        'start_time',
        'end_time',
        'event_type',
        'location',
        'link',
        'registration_url',
        'color',
        'icon',
        'priority',
        'is_visible_to_mahasiswa',
        'is_visible_to_konselor',
        'is_visible_to_admin',
        'is_active',
        'is_featured',
        'send_notification',
        'remind_before_days',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'is_visible_to_mahasiswa' => 'boolean',
        'is_visible_to_konselor' => 'boolean',
        'is_visible_to_admin' => 'boolean',
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'send_notification' => 'boolean',
    ];

    /**
     * Polymorphic relationship ke berbagai model
     */
    public function eventable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Scope untuk filter berdasarkan bulan
     */
    public function scopeInMonth($query, $year, $month)
    {
        return $query->whereYear('start_date', $year)
            ->whereMonth('start_date', $month);
    }

    /**
     * Scope untuk filter berdasarkan role user
     */
    public function scopeVisibleTo($query, $role)
    {
        $column = 'is_visible_to_'.strtolower($role);

        return $query->where($column, true);
    }

    /**
     * Get formatted date range
     */
    public function getDateRangeAttribute(): string
    {
        if ($this->end_date && $this->start_date->ne($this->end_date)) {
            return $this->start_date->format('d M').' - '.$this->end_date->format('d M Y');
        }

        return $this->start_date->format('d M Y');
    }

    /**
     * Get formatted time range
     */
    public function getTimeRangeAttribute(): ?string
    {
        if ($this->start_time && $this->end_time) {
            return substr($this->start_time, 0, 5).' - '.substr($this->end_time, 0, 5);
        }

        return $this->start_time ? substr($this->start_time, 0, 5) : null;
    }

    /**
     * Check if event is upcoming
     */
    public function getIsUpcomingAttribute(): bool
    {
        return $this->start_date->isFuture();
    }

    /**
     * Check if event is today
     */
    public function getIsTodayAttribute(): bool
    {
        return $this->start_date->isToday();
    }

    /**
     * Check if event is past
     */
    public function getIsPastAttribute(): bool
    {
        return $this->start_date->isPast();
    }
}