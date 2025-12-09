<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;

class CounselorSlot extends Model
{
    protected $fillable = [
        'counselor_id',
        'date',
        'start_time',
        'end_time',
        'is_available'
    ];

    protected $casts = [
        'date' => 'date',
        'is_available' => 'boolean',
    ];

    public function counselor(): BelongsTo
    {
        return $this->belongsTo(Counselor::class);
    }

    public function booking()
    {
        return $this->hasOne(CounselingBooking::class, 'slot_id');
    }

    // Helper Methods
    public function isAvailable()
    {
        return $this->is_available && 
               $this->date >= now()->format('Y-m-d') &&
               !$this->booking; // Belum ada yang booking
    }

    public function getFormattedDateAttribute()
    {
        Carbon::setLocale('id');
        return $this->date->isoFormat('dddd, D MMMM YYYY');
    }

    public function getFormattedTimeAttribute()
    {
        return substr($this->start_time, 0, 5) . ' - ' . substr($this->end_time, 0, 5);
    }

    public function getTimeStringAttribute()
    {
        return substr($this->start_time, 0, 5);
    }

    // Scopes
    public function scopeAvailable($query)
    {
        return $query->where('is_available', true)
                     ->where('date', '>=', now()->format('Y-m-d'))
                     ->whereDoesntHave('booking'); // Slot belum dibook
    }

    public function scopeUpcoming($query)
    {
        return $query->where('date', '>=', now()->format('Y-m-d'))
                     ->orderBy('date')
                     ->orderBy('start_time');
    }
}