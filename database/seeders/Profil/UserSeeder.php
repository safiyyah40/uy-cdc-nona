<?php

namespace Database\Seeders\Profil;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        User::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Akun Lokal
        User::create([
            'name' => 'Admin PUSKAKA',
            'username' => 'admin.puskaka',
            'email' => 'adminpuskaka@yarsi.ac.id',
            'phone' => '6281295986204',
            'id_number' => '199001012020011001',
            'password' => Hash::make('AdminPuskaka@2025'),
            'role' => 'admin',
            'is_profile_complete' => true,
        ]);

        User::create([
            'name' => 'Dr. Siti Konselor, M.Psi',
            'username' => 'konselor.test',
            'email' => 'konselor@yarsi.ac.id',
            'password' => Hash::make('Konselor@2025'),
            'role' => 'konselor',
            'id_number' => '198505152015011002',
            'phone' => '628123456789',
            'faculty' => 'Teknologi Informasi',
            'study_program' => 'Teknik Informatika',
            'is_profile_complete' => true,
        ]);

        User::create([
            'name' => 'Mahasiswa Test',
            'username' => 'mahasiswa.test',
            'email' => 'mhs@yarsi.ac.id',
            'password' => Hash::make('Mahasiswa@2025'),
            'role' => 'mahasiswa',
            'id_number' => '1402021001',
            'phone' => '628123456789',
            'faculty' => 'Teknologi Informasi',
            'study_program' => 'Teknik Informatika',
            'is_profile_complete' => true,
        ]);

        User::create([
            'name' => 'Dosen/Staf Test',
            'username' => 'dosen_staf.test',
            'email' => 'dosenstaf@yarsi.ac.id',
            'password' => Hash::make('Dosenstaf@2025'),
            'role' => 'dosen_staf',
            'id_number' => '198505152015011002',
            'phone' => '628123456789',
            'is_profile_complete' => true,
        ]);
    }
}