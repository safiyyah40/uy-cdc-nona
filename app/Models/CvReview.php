<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

/**
 * @property int $id
 * @property int $user_id
 * @property int|null $counselor_id
 * @property string $student_name
 * @property string $student_npm
 * @property string $student_email
 * @property string $student_phone
 * @property string|null $student_faculty
 * @property string|null $student_study_program
 * @property string $target_position
 * @property string|null $additional_notes
 * @property string $cv_file_path
 * @property string $cv_file_original_name
 * @property string $status
 * @property string|null $feedback_text
 * @property array<array-key, mixed>|null $feedback_files
 * @property string $priority
 * @property \Illuminate\Support\Carbon $submitted_at
 * @property \Illuminate\Support\Carbon|null $assigned_at
 * @property \Illuminate\Support\Carbon|null $reviewed_at
 * @property \Illuminate\Support\Carbon|null $completed_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Models\Counselor|null $counselor
 * @property-read mixed $cv_file_url
 * @property-read mixed $feedback_file_urls
 * @property-read \App\Models\User $user
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview assigned()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview completed()
 * @method static \Database\Factories\CvReviewFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview forCounselor($counselorId)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview forStudent($userId)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview inReview()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview priority($priority)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview submitted()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereAdditionalNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereAssignedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereCompletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereCounselorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereCvFileOriginalName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereCvFilePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereFeedbackFiles($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereFeedbackText($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview wherePriority($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereReviewedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereStudentEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereStudentFaculty($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereStudentName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereStudentNpm($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereStudentPhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereStudentStudyProgram($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereSubmittedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereTargetPosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview withTrashed(bool $withTrashed = true)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview withoutTrashed()
 *
 * @mixin \Eloquent
 */
class CvReview extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id', 'counselor_id',
        'student_name', 'student_npm', 'student_email', 'student_phone',
        'student_faculty', 'student_study_program',
        'target_position', 'additional_notes',
        'cv_file_path', 'cv_file_original_name',
        'status', 'feedback_text', 'feedback_files',
        'priority',
        'submitted_at', 'assigned_at', 'reviewed_at', 'completed_at',
    ];

    protected $casts = [
        'feedback_files' => 'array',
        'submitted_at' => 'datetime',
        'assigned_at' => 'datetime',
        'reviewed_at' => 'datetime',
        'completed_at' => 'datetime',
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

    // Accessors
    public function getCvFileUrlAttribute()
    {
        return $this->cv_file_path ? Storage::url($this->cv_file_path) : null;
    }

    public function getFeedbackFileUrlsAttribute()
    {
        if (! $this->feedback_files) {
            return [];
        }

        return collect($this->feedback_files)->map(function ($path) {
            return [
                'url' => Storage::url($path),
                'name' => basename($path),
                'is_image' => preg_match('/\.(jpg|jpeg|png|gif|webp)$/i', $path),
            ];
        })->toArray();
    }

    // Scopes
    public function scopeSubmitted($query)
    {
        return $query->where('status', 'submitted');
    }

    public function scopeAssigned($query)
    {
        return $query->where('status', 'assigned');
    }

    public function scopeInReview($query)
    {
        return $query->where('status', 'in_review');
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

    public function scopePriority($query, $priority)
    {
        return $query->where('priority', $priority);
    }

    // Helper Methods
    public function canBeEdited()
    {
        return in_array($this->status, ['submitted', 'assigned']);
    }

    public function canBeDeleted()
    {
        return in_array($this->status, ['submitted']);
    }

    public function isAssignedTo($counselorId)
    {
        return $this->counselor_id == $counselorId;
    }

    public function markAsAssigned($counselorId)
    {
        $this->update([
            'counselor_id' => $counselorId,
            'status' => 'assigned',
            'assigned_at' => now(),
        ]);
    }

    public function markAsInReview()
    {
        $this->update([
            'status' => 'in_review',
            'reviewed_at' => now(),
        ]);
    }

    public function markAsCompleted($feedbackText, $feedbackFiles = [])
    {
        $this->update([
            'status' => 'completed',
            'feedback_text' => $feedbackText,
            'feedback_files' => $feedbackFiles,
            'completed_at' => now(),
        ]);
    }
}
