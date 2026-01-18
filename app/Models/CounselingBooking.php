<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class CounselingBooking extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id', 'counselor_id', 'slot_id',
        'student_name', 'student_npm', 'student_phone', 'student_email',
        'student_faculty', 'student_study_program', 'student_gender',
        'topic', 'notes',
        'scheduled_date', 'scheduled_time', 'counselor_name',
        'status', 'rejection_reason',
        'accepted_at', 'rejected_at', 'completed_at', 'cancelled_at',
    ];

    protected $casts = [
        'scheduled_date' => 'date',
        'accepted_at' => 'datetime',
        'rejected_at' => 'datetime',
        'completed_at' => 'datetime',
        'cancelled_at' => 'datetime',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function counselor()
    {
        return $this->belongsTo(Counselor::class);
    }

    public function slot()
    {
        return $this->belongsTo(CounselorSlot::class, 'slot_id');
    }

    public function report()
    {
        return $this->hasOne(CounselingReport::class, 'booking_id');
    }

    // Status Checkers
    public function isPending()
    {
        return $this->status === 'pending';
    }

    public function isAccepted()
    {
        return $this->status === 'accepted';
    }

    public function isCompleted()
    {
        return $this->status === 'completed';
    }

    public function canBeCancelled()
    {
        return in_array($this->status, ['pending', 'accepted']) &&
               $this->scheduled_date > now()->format('Y-m-d');
    }

    public function canUploadReport()
    {
        return $this->status === 'accepted' &&
               ! $this->report;
    }

    // Scopes
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeAccepted($query)
    {
        return $query->where('status', 'accepted');
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    public function scopeForCounselor($query, $counselorId)
    {
        return $query->where('counselor_id', $counselorId);
    }

    public function scopeForStudent($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    public function scopeUpcoming($query)
    {
        return $query->where('scheduled_date', '>=', now()->format('Y-m-d'))
            ->whereIn('status', ['pending', 'accepted']);
    }

    public function calendarEvent(): MorphOne
    {
        return $this->morphOne(CalendarEvent::class, 'eventable');
    }
}