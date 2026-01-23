<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property int|null $user_id
 * @property string $name
 * @property string|null $email
 * @property string|null $phone
 * @property string $title
 * @property string|null $photo_path
 * @property string|null $photo
 * @property int $is_active
 * @property int $order_column
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\CounselingBooking> $bookings
 * @property-read int|null $bookings_count
 * @property-read mixed $photo_url
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\CounselingReport> $reports
 * @property-read int|null $reports_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\CounselorSlot> $slots
 * @property-read int|null $slots_count
 * @property-read \App\Models\User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Counselor active()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Counselor newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Counselor newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Counselor ordered()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Counselor query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Counselor whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Counselor whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Counselor whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Counselor whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Counselor whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Counselor whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Counselor whereOrderColumn($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Counselor wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Counselor wherePhotoPath($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Counselor whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Counselor whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Counselor whereUserId($value)
 * @mixin \Eloquent
 */
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
