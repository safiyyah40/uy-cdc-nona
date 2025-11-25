<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CounselorSlot extends Model
{
    protected $fillable = [
        'counselor_id',
        'date',
        'start_time',
        'end_time',
        'is_available'
    ];

    public function counselor(): BelongsTo
    {
        return $this->belongsTo(Counselor::class);
    }
}
