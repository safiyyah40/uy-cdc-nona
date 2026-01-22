<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
        // Setiap kali model Counselor diakses, hapus slot yang sudah lewat dan tidak laku
        static::retrieved(function ($counselor) {
            $counselor->slots()
                ->where('is_available', true)
                ->where(function ($q) {
                    $q->where('date', '<', now()->toDateString())
                        ->orWhere(function ($sub) {
                            $sub->where('date', now()->toDateString())
                                ->where('start_time', '<', now()->toTimeString());
                        });
                })->delete(); // Slot "sampah" langsung hilang dari database
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function slots(): HasMany
    {
        return $this->hasMany(CounselorSlot::class)
            ->where(function ($query) {
                // Tampilkan slot jika:
                // Waktunya belum lewat (Masa Depan)
                $query->where('date', '>', now()->toDateString())
                    ->orWhere(function ($sub) {
                        $sub->where('date', now()->toDateString())
                            ->where('start_time', '>=', now()->toTimeString());
                    })
                    //atau sudah ada yang booking (Meskipun sudah lewat, tetap muncul agar bisa diedit admin)
                    ->orWhere('is_available', false);
            })
            ->orderBy('date', 'asc')
            ->orderBy('start_time', 'asc');
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
