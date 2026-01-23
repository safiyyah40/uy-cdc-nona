<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use App\Helpers\ActivityLogger;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'username' => ['required', 'string'],
            'password' => ['required', 'string'],
        ];
    }

    public function authenticate(): void
    {
        $this->ensureIsNotRateLimited();

        $username = $this->input('username');
        $password = $this->input('password');

        // Coba Login Database Lokal Terlebih Dahulu
        if (Auth::attempt(['username' => $username, 'password' => $password], $this->boolean('remember'))) {
            RateLimiter::clear($this->throttleKey());
            ActivityLogger::logLogin();

            return;
        }

        // Coba Login via LDAP YARSI
        $ldapData = $this->authenticateWithLDAP($username, $password);

        if (! $ldapData) {
            RateLimiter::hit($this->throttleKey());
            throw ValidationException::withMessages([
                'username' => __('auth.failed'),
            ]);
        }

        // Sinkronisasi Data LDAP ke Database Lokal
        $user = $this->syncLdapUser($ldapData);

        Auth::login($user, $this->boolean('remember'));
        RateLimiter::clear($this->throttleKey());

        ActivityLogger::logLogin();
    }

    /**
     * Authenticate dengan LDAP YARSI dan Extract Data Lengkap
     */
    private function authenticateWithLDAP(string $username, string $password): ?array
    {
        $ldapHost = 'ldap://10.10.1.10:389';
        $dn = "uid={$username},ou=Users,dc=yarsi,dc=ac,dc=id";

        $ldap = ldap_connect($ldapHost);
        ldap_set_option($ldap, LDAP_OPT_PROTOCOL_VERSION, 3);
        ldap_set_option($ldap, LDAP_OPT_REFERRALS, 0);

        try {
            if (! @ldap_bind($ldap, $dn, $password)) {
                return null;
            }

            $read = @ldap_read($ldap, $dn, '(objectclass=*)');
            if (! $read) {
                return null;
            }

            $entries = ldap_get_entries($ldap, $read);
            $entry = $entries[0];

            // Helper untuk ambil atribut LDAP
            $getAttr = fn ($key) => $entry[$key][0] ?? null;

            $userType = strtoupper($getAttr('title') ?? 'M');
            $idNumber = $getAttr('description');

            $role = ($userType === 'D' || $userType === 'S') ? 'dosen_staf' : 'mahasiswa';

            $faculty = null;
            $studyProgram = null;

            // HANYA mahasiswa yang memiliki data Fakultas & Prodi
            if ($role === 'mahasiswa' && $idNumber) {
                $code = substr($idNumber, 0, 3);
                $map = $this->getUniversityMap($code);
                $faculty = $map['f'];
                $studyProgram = $map['p'];
            }
            // Untuk Dosen/Staf, faculty dan studyProgram dibiarkan null agar tidak mengambil alamat dari LDAP

            return [
                'username' => $username,
                'name' => $getAttr('displayname') ?? $username,
                'id_number' => $idNumber,
                'email' => $getAttr('mailalternateaddress') ?? $getAttr('mail') ?? ($username.'@yarsi.ac.id'),
                'role' => $role,
                'phone' => $getAttr('telephonenumber') ?? $getAttr('homephone'),
                'faculty' => $faculty, // Akan bernilai null untuk Dosen/Staf
                'study_program' => $studyProgram, // Akan bernilai null untuk Dosen/Staf
                'password' => $password,
            ];

        } catch (\Exception $e) {
            Log::error('LDAP Error: '.$e->getMessage());

            return null;
        }
    }

    /**
     * Map Kode NPM ke Fakultas & Prodi
     */
    private function getUniversityMap(string $code): array
    {
        $map = [
            '110' => ['f' => 'Fakultas Kedokteran', 'p' => 'Kedokteran'],
            '111' => ['f' => 'Fakultas Kedokteran Gigi', 'p' => 'Kedokteran Gigi'],
            '120' => ['f' => 'Fakultas Ekonomi dan Bisnis', 'p' => 'Manajemen'],
            '121' => ['f' => 'Fakultas Ekonomi dan Bisnis', 'p' => 'Akuntansi'],
            '130' => ['f' => 'Fakultas Hukum', 'p' => 'Hukum'],
            '140' => ['f' => 'Fakultas Teknologi Informasi', 'p' => 'Teknik Informatika'],
            '150' => ['f' => 'Fakultas Teknologi Informasi', 'p' => 'Perpustakaan dan Sains Informasi'],
            '160' => ['f' => 'Fakultas Psikologi', 'p' => 'Psikologi'],
        ];

        return $map[$code] ?? ['f' => 'Universitas YARSI', 'p' => null];
    }

    /**
     * Sinkronisasi data ke Database Lokal
     */
    private function syncLdapUser(array $ldapData): User
    {
        // Normalisasi Telepon
        $phone = $ldapData['phone'];
        if ($phone) {
            $phone = preg_replace('/[^0-9]/', '', $phone);
            if (str_starts_with($phone, '0')) {
                $phone = '62'.substr($phone, 1);
            }
        }

        // Simpan atau Update data user
        return User::updateOrCreate(
            ['username' => $ldapData['username']],
            [
                'name' => $ldapData['name'],
                'email' => $ldapData['email'],
                'id_number' => $ldapData['id_number'],
                'role' => $ldapData['role'], // Role yang sudah ditentukan di authenticateWithLDAP
                'password' => Hash::make($ldapData['password']),
                'phone' => $phone,
                'faculty' => $ldapData['faculty'],
                'study_program' => $ldapData['study_program'],
                'is_profile_complete' => ! empty($phone),
            ]
        );
    }

    public function ensureIsNotRateLimited(): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));
        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'username' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    public function throttleKey(): string
    {
        return Str::transliterate(Str::lower($this->string('username')).'|'.$this->ip());
    }
}
