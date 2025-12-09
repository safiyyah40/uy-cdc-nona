<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
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

        if (Auth::attempt($this->only('username', 'password'), $this->boolean('remember'))) {
            RateLimiter::clear($this->throttleKey());
            return;
        }

        $ldapData = $this->authenticateWithLDAP(
            $this->input('username'),
            $this->input('password')
        );

        if (!$ldapData) {
            RateLimiter::hit($this->throttleKey());
            throw ValidationException::withMessages([
                'username' => __('auth.failed'),
            ]);
        }

        // SYNC KE DATABASE
        $user = User::updateOrCreate(
            ['username' => $ldapData['username']],
            [
                'name' => $ldapData['name'],
                'email' => $ldapData['email'],
                'id_number' => $ldapData['id_number'],
                'role' => $ldapData['role'],
                'password' => Hash::make($ldapData['password']),
                'faculty' => $ldapData['faculty'] ?? null,
                'study_program' => $ldapData['study_program'] ?? null,
                'gender' => $ldapData['gender'] ?? null,
            ]
        );

        Auth::login($user, $this->boolean('remember'));
        RateLimiter::clear($this->throttleKey());
    }
    
    // DATA DUMMY LDAP
    private function authenticateWithLDAP(string $username, string $password): ?array
    {
        $ldapUsers = [
            'admin' => [
                'username' => 'admin',
                'name' => 'Administrator CDC',
                'id_number' => '199001012020011001',
                'email' => 'admin@yarsi.ac.id',
                'password' => 'password',
                'role' => 'admin',
                'faculty' => 'Rektorat',
                'gender' => 'L',
            ],
            'konselor' => [
                'username' => 'konselor',
                'name' => 'Dr. Siti Konselor, M.Psi',
                'id_number' => '198505152015011002',
                'email' => 'konselor@yarsi.ac.id',
                'password' => 'password',
                'role' => 'konselor',
                'faculty' => 'Psikologi',
                'study_program' => 'Psikologi',
                'gender' => 'P',
            ],
            'adzana.ashel' => [
                'username' => 'adzana.ashel',
                'name' => 'Adzana Ashel',
                'id_number' => '1402023200',
                'email' => 'adzana.ashel@yarsi.ac.id',
                'password' => 'adzanaashel123',
                'role' => 'mahasiswa',
                'faculty' => 'Teknologi Informasi',
                'study_program' => 'Teknik Informatika',
                'gender' => 'P',
            ],
            'farhan.jijima' => [
                'username' => 'farhan.jijima',
                'name' => 'Farhan Jijima',
                'id_number' => '1402022001',
                'email' => 'farhan.jijima@yarsi.ac.id',
                'password' => 'farhanjijima123',
                'role' => 'mahasiswa',
                'faculty' => 'Fakultas Ekonomi dan Bisnis',
                'study_program' => 'Manajemen',
                'gender' => 'L',
            ],
            'maba.baru' => [
                'username' => 'maba.baru',
                'name' => 'Mahasiswa Baru',
                'id_number' => '1402024001',
                'email' => 'maba@yarsi.ac.id',
                'password' => 'maba123',
                'role' => 'mahasiswa',
                'faculty' => null,
                'study_program' => null,
                'gender' => 'L',
            ],
        ];

        if (isset($ldapUsers[$username]) && $ldapUsers[$username]['password'] === $password) {
            return $ldapUsers[$username];
        }

        return null;
    }
    
    public function ensureIsNotRateLimited(): void
    {
        if (!RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
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
        return Str::transliterate(Str::lower($this->string('username')) . '|' . $this->ip());
    }
}