<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property int|null $user_id
 * @property string|null $eventable_type
 * @property int|null $eventable_id
 * @property string $title
 * @property string|null $description
 * @property \Illuminate\Support\Carbon $start_date
 * @property \Illuminate\Support\Carbon|null $end_date
 * @property string|null $start_time
 * @property string|null $end_time
 * @property string $event_type
 * @property string|null $location
 * @property string|null $link
 * @property string|null $registration_url
 * @property string $color
 * @property string|null $icon
 * @property string $priority
 * @property bool $is_visible_to_mahasiswa
 * @property bool $is_visible_to_konselor
 * @property bool $is_visible_to_admin
 * @property bool $is_active
 * @property bool $is_featured
 * @property bool $send_notification
 * @property int|null $remind_before_days
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read Model|\Eloquent|null $eventable
 * @property-read string $date_range
 * @property-read bool $is_past
 * @property-read bool $is_today
 * @property-read bool $is_upcoming
 * @property-read string|null $time_range
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent inMonth($year, $month)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent visibleTo($role)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereEndTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereEventType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereEventableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereEventableType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereIcon($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereIsFeatured($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereIsVisibleToAdmin($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereIsVisibleToKonselor($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereIsVisibleToMahasiswa($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent wherePriority($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereRegistrationUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereRemindBeforeDays($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereSendNotification($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereStartTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent withTrashed(bool $withTrashed = true)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent withoutTrashed()
 * @mixin \Eloquent
 */
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