<?php

namespace App\Models;

use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use LdapRecord\Laravel\Auth\AuthenticatesWithLdap;
use LdapRecord\Laravel\Auth\HasLdapUser;
use LdapRecord\Laravel\Auth\LdapAuthenticatable;

class User extends Authenticatable implements FilamentUser, LdapAuthenticatable
{
    use AuthenticatesWithLdap, HasFactory, HasLdapUser, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected $fillable = [
        'name',
        'username',
        'id_number',
        'faculty',
        'study_program',
        'email',
        'phone',
        'photo_url',
        'password',
        'role',
        'is_profile_complete',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_profile_complete' => 'boolean',
        ];
    }

    /**
     * Cek apakah user perlu melengkapi profil
     * Fungsi ini sekarang HANYA membaca data, tidak mengubah database.
     */
    public function needsProfileCompletion(): bool
    {
        // Jika di database sudah ditandai lengkap, maka tidak perlu (false)
        if ($this->is_profile_complete) {
            return false;
        }

        // Cek apakah nomor telepon kosong?
        // Gunakan trim() untuk memastikan tidak hanya berisi spasi
        if (empty(trim($this->phone))) {
            return true; // Perlu melengkapi
        }

        // Khusus Mahasiswa wajib punya Fakultas & Prodi
        if ($this->role === 'mahasiswa') {
            if (empty(trim($this->faculty)) || empty(trim($this->study_program))) {
                return true; // Perlu melengkapi
            }
        }

        // Jika semua data di atas sudah ada tapi is_profile_complete masih false,
        // biarkan sistem mengarahkan ke halaman pelengkap profil satu kali lagi
        // sampai user menekan tombol 'Simpan' di form.
        return true;
    }

    /**
     * Get label untuk ID number berdasarkan role
     */
    public function getIdLabelAttribute(): string
    {
        return match ($this->role) {
            'mahasiswa' => 'NPM',
            'konselor', 'admin', 'dosen_staf' => 'NIP/NIK',
            default => 'ID'
        };
    }

    public function isDosenStaf(): bool
    {
        return $this->role === 'dosen_staf';
    }

    /**
     * Ambil format nomor whatsapp
     */
    public function getFormattedPhoneAttribute(): string
    {
        if (! $this->phone) {
            return '-';
        }

        if (substr($this->phone, 0, 2) === '62') {
            return '0'.substr($this->phone, 2);
        }

        return $this->phone;
    }

    /**
     * Cek role mahasiswa
     */
    public function isMahasiswa(): bool
    {
        return $this->role === 'mahasiswa';
    }

    public function counselor()
    {
        // User (Konselor) memiliki satu profil Counselor
        return $this->hasOne(Counselor::class, 'user_id');
    }

    public function slots(): HasMany
    {
        return $this->hasMany(CounselorSlot::class, 'user_id');
    }

    protected static function booted()
    {
        static::updated(function ($user) {
            // Cek apakah kolom role berubah
            if ($user->wasChanged('role')) {

                // Jika role berubah JADI konselor
                if ($user->role === 'konselor') {
                    // Buat data di tabel counselors jika belum ada
                    Counselor::firstOrCreate(
                        ['user_id' => $user->id],
                        [
                            'name' => $user->name,
                            'email' => $user->email,
                            'phone' => $user->phone,
                            'title' => '-', // Default karena data belum ada
                            'is_active' => true,
                        ]
                    );
                }

                // Jika role berubah DARI konselor ke yang lain
                if ($user->getOriginal('role') === 'konselor' && $user->role !== 'konselor') {
                    // Hapus data dari tabel counselors
                    Counselor::where('user_id', $user->id)->delete();
                }
            }
        });

        // Handle juga saat baru daftar/dibuat langsung sebagai konselor
        static::created(function ($user) {
            if ($user->role === 'konselor') {
                Counselor::create([
                    'user_id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone,
                    'title' => '-',
                    'is_active' => true,
                ]);
            }
        });
    }

    // Helper untuk cek apakah user ini konselor
    public function isCounselor()
    {
        return $this->role === 'konselor';
    }

    /**
     * Ambil Link WhatsApp
     */
    public function getWhatsappLinkAttribute(): string
    {
        if (! $this->phone) {
            return '#';
        }

        return "https://wa.me/{$this->phone}";
    }

    public function counselingBookings()
    {
        return $this->hasMany(CounselingBooking::class);
    }

    public function canDelete(): bool
    {
        return $this->username !== 'admin.puskaka';
    }

    /**
     * Cek role admin
     */
    public function isAdmin(): bool
    {
        return in_array($this->role, ['admin']);
    }

    public function canAccessPanel(Panel $panel): bool
    {
        return in_array($this->role, ['admin']);
    }
}
