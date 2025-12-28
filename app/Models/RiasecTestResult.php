<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RiasecTestResult extends Model
{
    protected $fillable = [
        'user_id',
        'score_r',
        'score_i',
        'score_a',
        'score_s',
        'score_e',
        'score_c',
        'dominant_type_1',
        'dominant_type_2',
        'dominant_type_3',
        'time_taken_seconds',
        'total_questions_answered',
        'started_at',
        'completed_at',
        'status',
    ];

    protected $casts = [
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function answers(): HasMany
    {
        return $this->hasMany(RiasecTestAnswer::class, 'test_result_id');
    }

    /**
     * Get formatted time taken (e.g., "8m 32s")
     */
    public function getFormattedTimeAttribute(): string
    {
        $minutes = floor($this->time_taken_seconds / 60);
        $seconds = $this->time_taken_seconds % 60;
        return "{$minutes}m {$seconds}s";
    }

    /**
     * Get all scores as array
     */
    public function getScoresArrayAttribute(): array
    {
        return [
            'R' => $this->score_r,
            'I' => $this->score_i,
            'A' => $this->score_a,
            'S' => $this->score_s,
            'E' => $this->score_e,
            'C' => $this->score_c,
        ];
    }

    /**
     * Get top 3 dominant types with scores
     */
    public function getDominantTypesAttribute(): array
    {
        return [
            ['code' => $this->dominant_type_1, 'score' => $this->{"score_" . strtolower($this->dominant_type_1)}],
            ['code' => $this->dominant_type_2, 'score' => $this->{"score_" . strtolower($this->dominant_type_2)}],
            ['code' => $this->dominant_type_3, 'score' => $this->{"score_" . strtolower($this->dominant_type_3)}],
        ];
    }
}