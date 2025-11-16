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

        // Ambil data dari Simulasi LDAP
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

        // Cek apakah user sudah ada di database lokal?
        $user = User::where('username', $ldapData['username'])->first();

        if ($user) {
            $user->update([
                'name' => $ldapData['name'],
                'id_number' => $ldapData['id_number'],
                'email' => $ldapData['email'],
                'password' => $ldapData['password'] ? Hash::make($ldapData['password']) : $user->password,
                'role' => $ldapData['role'],
            ]);
        } else {
            $user = User::create([
                'username' => $ldapData['username'],
                'name' => $ldapData['name'],
                'id_number' => $ldapData['id_number'],
                'email' => $ldapData['email'],
                'password' => $ldapData['password'] ? Hash::make($ldapData['password']) : null,
                'role' => $ldapData['role'],
                'phone' => null,
                'is_profile_complete' => false
            ]);
        }

        // Login User
        Auth::login($user, $this->boolean('remember'));

        RateLimiter::clear($this->throttleKey());
    }
    
    private function authenticateWithLDAP(string $username, string $password): ?array
    {
        $ldapUsers = [
            'admin' => [
                'username' => 'admin',
                'name' => 'Admin CDC',
                'id_number' => '199001012020011001',
                'email' => 'admin@yarsi.ac.id',
                'password' => 'password',
                'role' => 'admin',
            ],
            'konselor' => [
                'username' => 'konselor',
                'name' => 'Konselor CDC',
                'id_number' => '198505152015011002',
                'email' => 'konselor@yarsi.ac.id',
                'password' => 'password',
                'role' => 'konselor',
            ],
            'budi.konselor' => [
                'username' => 'budi.konselor',
                'name' => 'Budi Konselor',
                'id_number' => '198505152015011003',
                'email' => 'budi.konselor@yarsi.ac.id',
                'password' => 'budikonselor123',
                'role' => 'konselor',
            ],
            'adzana.ashel' => [
                'username' => 'adzana.ashel',
                'name' => 'Adzana Ashel',
                'id_number' => '1402023200',
                'email' => 'adzana.ashel@yarsi.ac.id',
                'password' => 'adzanaashel123',
                'role' => 'mahasiswa',
            ],
            'farhan.jijima' => [
                'username' => 'farhan.jijima',
                'name' => 'Farhan Jijima',
                'id_number' => '1402021201',
                'email' => 'farhan.jijima@yarsi.ac.id',
                'password' => 'farhanjijima123',
                'role' => 'mahasiswa',
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