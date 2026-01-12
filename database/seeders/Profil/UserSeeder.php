<?php

namespace Database\Seeders\Profil;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        User::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        User::factory()->create([
            'name' => 'Admin Puskaka',
            'email' => 'adminpuskaka@yarsi.ac.id',
        ]);
        
        // --- BUAT 1 AKUN MAHASISWA UNTUK TEST ---
        User::create([
            'name' => 'Mahasiswa Test',
            'username' => 'mahasiswa',
            'email' => 'mhs@yarsi.ac.id',
            'password' => Hash::make('password'),
            'role' => 'mahasiswa',
            'id_number' => '1402021001',
            'phone' => '08123456789',
            'gender' => 'L',
            'faculty' => 'Teknologi Informasi',
            'study_program' => 'Teknik Informatika',
            'is_profile_complete' => true
        ]);
    }
}
