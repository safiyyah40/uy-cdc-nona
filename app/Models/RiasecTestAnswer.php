<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $test_result_id
 * @property int $question_id
 * @property int $answer_value
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\RiasecQuestion $question
 * @property-read \App\Models\RiasecTestResult $testResult
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestAnswer newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestAnswer newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestAnswer query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestAnswer whereAnswerValue($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestAnswer whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestAnswer whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestAnswer whereQuestionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestAnswer whereTestResultId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestAnswer whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class RiasecTestAnswer extends Model
{
    protected $fillable = [
        'test_result_id',
        'question_id',
        'answer_value',
    ];

    protected $casts = [
        'answer_value' => 'integer',
    ];

    public function testResult(): BelongsTo
    {
        return $this->belongsTo(RiasecTestResult::class, 'test_result_id');
    }

    public function question(): BelongsTo
    {
        return $this->belongsTo(RiasecQuestion::class, 'question_id');
    }
}