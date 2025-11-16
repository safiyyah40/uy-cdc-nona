<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
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
        // Jika is_profile_complete true, berarti sudah lengkap
        if ($this->is_profile_complete) {
            return false;
        }

        // Jika phone kosong, perlu dilengkapi
        if (empty($this->phone)) {
            return true;
        }

        // Auto-fix jika phone ada tapi flag masih false
        $this->update(['is_profile_complete' => true]);
        return false;
    }

    /**
     * Get label untuk ID number berdasarkan role
     */
    public function getIdLabelAttribute(): string
    {
        return match($this->role) {
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
        if (!$this->phone) {
            return '-';
        }

        if (substr($this->phone, 0, 2) === '62') {
            return '0' . substr($this->phone, 2);
        }

        return $this->phone;
    }

    /**
     * Ambil Link WhatsApp
     */
    public function getWhatsappLinkAttribute(): string
    {
        if (!$this->phone) {
            return '#';
        }

        return "https://wa.me/{$this->phone}";
    }
}