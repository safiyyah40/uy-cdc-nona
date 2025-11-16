<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
    
        $idNumber = $this->faker->unique()->numerify('140202#####');

        return [
            'name' => $this->faker->name(),
            'username' => $this->faker->unique()->userName(),
            'id_number' => $idNumber,
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'phone' => null,
            'photo_url' => null,
            'password' => static::$password ??= Hash::make('password'),
            'role' => 'mahasiswa',
            'is_profile_complete' => false,
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    /**
     * State untuk role konselor dengan NIP
     */
    public function konselor(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => 'konselor',
            'id_number' => $this->faker->unique()->numerify('19######20###1###'),
            'is_profile_complete' => false,
        ]);
    }

    /**
     * State untuk role admin dengan NIP
     */
    public function admin(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => 'admin',
            'id_number' => $this->faker->unique()->numerify('19######20###1###'),
            'is_profile_complete' => false,
        ]);
    }

    /**
     * State untuk user dengan profil lengkap
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'phone' => '628' . $this->faker->numerify('##########'),
            'is_profile_complete' => true,
        ]);
    }
}