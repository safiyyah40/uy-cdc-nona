<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\CounselingReport;
use \Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * @property int $id
 * @property int $user_id
 * @property int $counselor_id
 * @property int $slot_id
 * @property string $student_name
 * @property string $student_npm
 * @property string $student_phone
 * @property string $student_email
 * @property string|null $student_faculty
 * @property string|null $student_study_program
 * @property string|null $student_gender
 * @property string $topic
 * @property string $notes
 * @property \Illuminate\Support\Carbon $scheduled_date
 * @property string $scheduled_time
 * @property string $counselor_name
 * @property string $status
 * @property string|null $rejection_reason
 * @property \Illuminate\Support\Carbon|null $accepted_at
 * @property \Illuminate\Support\Carbon|null $rejected_at
 * @property \Illuminate\Support\Carbon|null $completed_at
 * @property \Illuminate\Support\Carbon|null $cancelled_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Models\CalendarEvent|null $calendarEvent
 * @property-read \App\Models\Counselor $counselor
 * @property-read \App\Models\CounselingReport|null $report
 * @property-read \App\Models\CounselorSlot $slot
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking accepted()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking completed()
 * @method static \Database\Factories\CounselingBookingFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking forCounselor($counselorId)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking forStudent($userId)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking pending()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking upcoming()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereAcceptedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereCancelledAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereCompletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereCounselorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereCounselorName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereRejectedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereRejectionReason($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereScheduledDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereScheduledTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereSlotId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereStudentEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereStudentFaculty($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereStudentGender($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereStudentName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereStudentNpm($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereStudentPhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereStudentStudyProgram($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereTopic($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking withTrashed(bool $withTrashed = true)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking withoutTrashed()
 * @mixin \Eloquent
 */
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
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function counselor(): BelongsTo
    {
        return $this->belongsTo(Counselor::class);
    }

    public function slot(): BelongsTo
    {
        return $this->belongsTo(CounselorSlot::class, 'slot_id');
    }

    public function report(): HasOne
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
