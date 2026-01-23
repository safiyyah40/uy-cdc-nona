<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property int $user_id
 * @property array<array-key, mixed> $scores
 * @property array<array-key, mixed> $rankings
 * @property int $time_taken_seconds
 * @property int $total_questions_answered
 * @property \Illuminate\Support\Carbon|null $started_at
 * @property \Illuminate\Support\Carbon|null $completed_at
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\RiasecTestAnswer> $answers
 * @property-read int|null $answers_count
 * @property-read array $dominant_types
 * @property-read string $formatted_time
 * @property-read array $scores_array
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestResult newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestResult newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestResult query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestResult whereCompletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestResult whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestResult whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestResult whereRankings($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestResult whereScores($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestResult whereStartedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestResult whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestResult whereTimeTakenSeconds($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestResult whereTotalQuestionsAnswered($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestResult whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestResult whereUserId($value)
 * @mixin \Eloquent
 * /**
 * @property int $score_r
 * @property int $score_i
 * @property int $score_a
 * @property int $score_s
 * @property int $score_e
 * @property int $score_c
 * @property string|null $dominant_type_1
 * @property string|null $dominant_type_2
 * @property string|null $dominant_type_3
 */
class RiasecTestResult extends Model
{
    protected $fillable = [
        'user_id',
        'scores',
        'rankings',
        'time_taken_seconds',
        'total_questions_answered',
        'started_at',
        'completed_at',
        'status',
    ];

    protected $casts = [
        'scores' => 'array',
        'rankings' => 'array',
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
            ['code' => $this->dominant_type_1, 'score' => $this->{'score_'.strtolower($this->dominant_type_1)}],
            ['code' => $this->dominant_type_2, 'score' => $this->{'score_'.strtolower($this->dominant_type_2)}],
            ['code' => $this->dominant_type_3, 'score' => $this->{'score_'.strtolower($this->dominant_type_3)}],
        ];
    }
}
