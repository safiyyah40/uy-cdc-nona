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

/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string|null $username
 * @property string|null $id_number
 * @property string|null $faculty
 * @property string|null $study_program
 * @property string|null $phone
 * @property bool $is_profile_complete
 * @property string|null $password
 * @property string $role
 * @property string|null $photo_url
 * @property string|null $guid LDAP GUID - jika ada berarti dari LDAP
 * @property string|null $domain LDAP Domain
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\CounselingBooking> $counselingBookings
 * @property-read int|null $counseling_bookings_count
 * @property-read \App\Models\Counselor|null $counselor
 * @property-read string $formatted_phone
 * @property-read string $id_label
 * @property-read \LdapRecord\Models\Model|null $ldap
 * @property-read string $whatsapp_link
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\CounselorSlot> $slots
 * @property-read int|null $slots_count
 *
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereFaculty($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereIdNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereIsProfileComplete($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePhotoUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereStudyProgram($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUsername($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereGuid($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereDomain($value)
 *
 * @mixin \Eloquent
 */
class User extends Authenticatable implements FilamentUser, LdapAuthenticatable
{
    use AuthenticatesWithLdap, HasFactory, HasLdapUser, Notifiable;

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
        'guid',
        'domain',
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
     * PENTING: Cek apakah user berasal dari LDAP
     * Dilihat dari kolom 'guid' - jika ada guid berarti dari LDAP
     * 
     * Ini yang membedakan:
     * - User LDAP: punya guid (sinkron dari server LDAP)
     * - User Dummy/Lokal: guid = null (dibuat manual di seeder/admin panel)
     */
    public function isLdapUser(): bool
    {
        return !empty($this->guid);
    }

    /**
     * Cek apakah user adalah akun lokal (dibuat manual, bukan dari LDAP)
     * Akun lokal bisa role apapun, yang penting guid-nya kosong
     */
    public function isLocalUser(): bool
    {
        return empty($this->guid);
    }

    /**
     * Cek tipe akun untuk display
     */
    public function getAccountTypeAttribute(): string
    {
        if ($this->username === 'admin.puskaka') {
            return 'Super Admin';
        }

        if ($this->isLdapUser()) {
            return 'LDAP';
        }

        return 'Lokal';
    }

    /**
     * Cek apakah profil sudah lengkap berdasarkan role
     */
    public function checkProfileCompleteness(): bool
    {
        // Phone wajib untuk semua role
        if (empty(trim($this->phone))) {
            return false;
        }

        // Khusus Mahasiswa wajib punya Fakultas & Prodi
        if ($this->role === 'mahasiswa') {
            if (empty(trim($this->faculty)) || empty(trim($this->study_program))) {
                return false;
            }
        }

        return true;
    }

    /**
     * Cek apakah user perlu melengkapi profil
     */
    public function needsProfileCompletion(): bool
    {
        // Jika sudah complete di database, tidak perlu lagi
        if ($this->is_profile_complete) {
            return false;
        }

        // Cek kelengkapan berdasarkan role
        return !$this->checkProfileCompleteness();
    }

    /**
     * Update status kelengkapan profil
     */
    public function updateProfileCompleteness(): void
    {
        $isComplete = $this->checkProfileCompleteness();

        if ($this->is_profile_complete !== $isComplete) {
            $this->is_profile_complete = $isComplete;
            $this->saveQuietly(); // Save tanpa trigger event
        }
    }

    /**
     * Generate ID number unik untuk akun lokal (Admin/Konselor)
     */
    public static function generateLocalIdNumber(): string
    {
        // Format: LOKAL-YYYYMMDD-XXXX
        // Contoh: LOKAL-20260126-0001
        $prefix = 'LOKAL-'.date('Ymd').'-';

        // Cari ID number terakhir dengan prefix hari ini
        $lastUser = self::where('id_number', 'LIKE', $prefix.'%')
            ->orderBy('id_number', 'desc')
            ->first();

        if ($lastUser) {
            // Ambil 4 digit terakhir dan increment
            $lastNumber = (int) substr($lastUser->id_number, -4);
            $newNumber = $lastNumber + 1;
        } else {
            $newNumber = 1;
        }

        // Format dengan 4 digit (pad dengan 0)
        return $prefix.str_pad($newNumber, 4, '0', STR_PAD_LEFT);
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
        if (!$this->phone) {
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
        // Event saat membuat user baru
        static::creating(function ($user) {
            // Auto-generate id_number HANYA untuk akun lokal Admin/Konselor
            if ($user->isLocalUser() && in_array($user->role, ['admin', 'konselor']) && empty($user->id_number)) {
                $user->id_number = self::generateLocalIdNumber();
            }

            // Set initial profile completeness
            $user->is_profile_complete = $user->checkProfileCompleteness();
        });

        // Event setelah user dibuat
        static::created(function ($user) {
            // Buat counselor profile jika role konselor
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

        // Event saat update user
        static::updating(function ($user) {
            // Auto-update profile completeness jika ada perubahan data relevan
            if ($user->isDirty(['phone', 'faculty', 'study_program'])) {
                $user->is_profile_complete = $user->checkProfileCompleteness();
            }
        });

        // Event setelah user diupdate
        static::updated(function ($user) {
            // Handle perubahan role
            if ($user->wasChanged('role')) {
                // Jika berubah JADI konselor
                if ($user->role === 'konselor') {
                    Counselor::firstOrCreate(
                        ['user_id' => $user->id],
                        [
                            'name' => $user->name,
                            'email' => $user->email,
                            'phone' => $user->phone,
                            'title' => '-',
                            'is_active' => true,
                        ]
                    );
                }

                // Jika berubah DARI konselor ke yang lain
                if ($user->getOriginal('role') === 'konselor' && $user->role !== 'konselor') {
                    Counselor::where('user_id', $user->id)->delete();
                }
            }
        });
    }

    public function isCounselor(): bool
    {
        return $this->role === 'konselor';
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

    public function counselingBookings()
    {
        return $this->hasMany(CounselingBooking::class);
    }

    /**
     * Cek apakah user bisa dihapus
     * 
     * TIDAK BISA DIHAPUS:
     * - Super admin (admin.puskaka) - akun utama sistem
     * - User dari LDAP (punya guid) - data sinkron, bukan milik lokal
     * 
     * BISA DIHAPUS:
     * - Akun lokal (guid kosong) yang bukan admin.puskaka
     *   Ini termasuk: admin lokal, konselor lokal, mahasiswa dummy, dosen_staf dummy
     */
    public function canDelete(): bool
    {
        // Super admin tidak bisa dihapus
        if ($this->username === 'admin.puskaka') {
            return false;
        }

        // User LDAP tidak bisa dihapus (punya guid = dari server LDAP)
        if ($this->isLdapUser()) {
            return false;
        }

        // Akun lokal bisa dihapus (termasuk dummy mahasiswa/dosen_staf)
        return true;
    }

    /**
     * Cek role admin
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function canAccessPanel(Panel $panel): bool
    {
        return $this->isAdmin();
    }
}