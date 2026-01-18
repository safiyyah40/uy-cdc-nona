<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Counselor extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'title',
        'photo_path',
        'email',
        'phone',
        'is_active',
        'order_column',
    ];

    protected $appends = ['photo_url'];

    // Accessor untuk mengubah 'photo_path' menjadi URL lengkap
    public function getPhotoUrlAttribute()
    {
        if ($this->photo_path) {
            return asset('storage/'.$this->photo_path);
        }

        return null;
    }

    protected static function booted()
    {
        // Saat Konselor DIBUAT (Create)
        static::created(function ($counselor) {
            if ($counselor->user_id) {
                // Ubah role user tersebut menjadi 'konselor'
                $counselor->user->update(['role' => 'konselor']);
            }
        });

        // Saat Konselor DIHAPUS (Delete)
        static::deleted(function ($counselor) {
            if ($counselor->user_id) {
                // Balikkan role user tersebut menjadi 'dosen_staf'
                $counselor->user->update(['role' => 'dosen_staf']);
            }
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function slots(): HasMany
    {
        return $this->hasMany(CounselorSlot::class, 'counselor_id');
    }
    public function bookings()
    {
        return $this->hasMany(CounselingBooking::class);
    }

    public function reports()
    {
        return $this->hasMany(CounselingReport::class);
    }

    // Helper Methods
    public function getAvailableSlots()
    {
        return $this->slots()
            ->where('is_available', true)
            ->where('date', '>=', now()->format('Y-m-d'))
            ->orderBy('date')
            ->orderBy('start_time')
            ->get();
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('order_column');
    }
}
