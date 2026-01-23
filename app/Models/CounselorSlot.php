<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;

/**
 * @property int $id
 * @property int $counselor_id
 * @property \Illuminate\Support\Carbon $date
 * @property string $start_time
 * @property string $end_time
 * @property bool $is_available
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\CounselingBooking|null $booking
 * @property-read \App\Models\Counselor $counselor
 * @property-read mixed $formatted_date
 * @property-read mixed $formatted_time
 * @property-read mixed $time_string
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlot available()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlot newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlot newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlot query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlot upcoming()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlot whereCounselorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlot whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlot whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlot whereEndTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlot whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlot whereIsAvailable($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlot whereStartTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlot whereUpdatedAt($value)
 * @mixin \Eloquent
 */
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

    protected static function booted()
    {
        // Setiap kali Admin menekan "Simpan" di Filament dan data Slot berubah
        static::updated(function ($slot) {
            // Cari apakah ada booking mahasiswa yang tertempel di slot ini
            $booking = $slot->booking;

            if ($booking) {
                // Update data di tabel counseling_bookings agar SAMA dengan slot yang baru diedit
                $booking->update([
                    'scheduled_date' => $slot->date,
                    'scheduled_time' => $slot->start_time,
                ]);
            }
        });
    }

    public function counselor(): BelongsTo
    {
        return $this->belongsTo(Counselor::class, 'counselor_id');
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