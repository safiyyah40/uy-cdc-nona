<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

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
        'gender',
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
     */
    public function needsProfileCompletion(): bool
    {
        // Jika flag manual sudah true, berarti sudah oke
        if ($this->is_profile_complete) {
            return false;
        }

        // Cek Data Wajib UNTUK SEMUA USER
        // Phone wajib. Gender wajib (tapi bisa jadi null dari LDAP, maka harus diisi user)
        if (empty($this->phone) || empty($this->gender)) {
            return true;
        }

        // Khusus Mahasiswa wajib punya Fakultas & Prodi
        if ($this->role === 'mahasiswa') {
            if (empty($this->faculty) || empty($this->study_program)) {
                return true;
            }
        }

        $this->update(['is_profile_complete' => true]);

        return false;
    }

    /**
     * Get label untuk ID number berdasarkan role
     */
    public function getIdLabelAttribute(): string
    {
        return match ($this->role) {
            'mahasiswa' => 'NPM',
            'konselor' => 'NIP',
            'admin' => 'NIP',
            default => 'ID'
        };
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

    public function counselor()
    {
        // User (Konselor) memiliki satu profil Counselor
        return $this->hasOne(Counselor::class, 'user_id');
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
}
