<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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