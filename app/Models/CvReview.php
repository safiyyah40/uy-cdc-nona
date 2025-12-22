<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

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
        'submitted_at', 'assigned_at', 'reviewed_at', 'completed_at'
    ];

    protected $casts = [
        'feedback_files' => 'array',
        'submitted_at' => 'datetime',
        'assigned_at' => 'datetime',
        'reviewed_at' => 'datetime',
        'completed_at' => 'datetime',
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

    // Accessors
    public function getCvFileUrlAttribute()
    {
        return $this->cv_file_path ? Storage::url($this->cv_file_path) : null;
    }

    public function getFeedbackFileUrlsAttribute()
    {
        if (!$this->feedback_files) {
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