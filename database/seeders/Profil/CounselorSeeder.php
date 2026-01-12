<?php

namespace Database\Seeders\Profil;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Counselor;
use App\Models\CounselorSlot;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CounselorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Counselor::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        $counselorsData = [
            // --- FAKULTAS KEDOKTERAN ---
            [
                'name' => 'dr. Miranti Pusparini, M.Pd(Ked).',
                'title' => 'Wakil Dekan I Fakultas Kedokteran',
                'photo_path' => 'counselors/FK_WadekI_Miranti_Pusparini.png',
                'order_column' => 1,
                'username' => 'miranti.pusparini',
            ],
            [
                'name' => 'dr. Tuty Herawati, Sp.A(K).',
                'title' => 'Kepala Prodi Sarjana Kedokteran',
                'photo_path' => 'counselors/FK_Kaprodi_Tuty_Herawati.png',
                'order_column' => 2,
                'username' => 'tuty.herawati',
            ],

            // --- FAKULTAS KEDOKTERAN GIGI ---
            [
                'name' => 'drg. Agus Ardinansyah, M.Pd.Ked.',
                'title' => 'Wakil Dekan II Fakultas Kedokteran Gigi',
                'photo_path' => 'counselors/FKG_WadekII_Agus-Ardinansyah-drg.-M.Pd_Ked.png',
                'order_column' => 3,
                'username' => 'agus.ardinansyah',
            ],
            [
                'name' => 'Dr. drg. Chaerita Maulani, Sp.Perio.',
                'title' => 'Kepala Prodi Kedokteran Gigi',
                'photo_path' => 'counselors/FKG_Kaprodi_Chaerita-Maulani-drg.-Sp.Perio.png',
                'order_column' => 4,
                'username' => 'chaerita.maulani',
            ],

            // --- FAKULTAS EKONOMI DAN BISNIS ---
            [
                'name' => 'Rini Hidayati, S.E., M.M.',
                'title' => 'Wakil Dekan I Fakultas Ekonomi dan Bisnis',
                'photo_path' => 'counselors/FEB_WadekI_Rini-Hidayati-SE.-MM.png',
                'order_column' => 5,
                'username' => 'rini.hidayati',
            ],
            [
                'name' => 'Imelda Sari, SE., M.Si., AK.',
                'title' => 'Kepala Prodi Akuntansi',
                'photo_path' => 'counselors/Akuntansi_Kaprodi_Imelda-Sari-SE.-MSi.-AK.png',
                'order_column' => 6,
                'username' => 'imelda.sari',
            ],
            [
                'name' => 'Alyta Shabrina Zusryn, SP., M.Sc., CRP.',
                'title' => 'Kepala Prodi Manajemen',
                'photo_path' => 'counselors/Manajemen_Kaprodi_Alyta-Shabrina-Zusryn-S.P.-M.Sc.,-CRP.png',
                'order_column' => 7,
                'username' => 'alyta.shabrina',
            ],

            // --- FAKULTAS TEKNOLOGI INFORMASI ---
            [
                'name' => 'Herika Hayurani, S.Kom., M.Kom.',
                'title' => 'Wakil Dekan I Fakultas Teknologi Informasi',
                'photo_path' => 'counselors/FTI_WadekI_Herika-Hayurani-S.Kom.,-M.Kom.png',
                'order_column' => 8,
                'username' => 'herika.hayurani',
            ],
            [
                'name' => 'Elan Suherlan, S.Si., M.Si.',
                'title' => 'Kepala Prodi Teknik Informatika',
                'photo_path' => 'counselors/TI_Kaprodi_Elan-Suherlan-S.Si.,-M.Si.png',
                'order_column' => 9,
                'username' => 'elan.suherlan',
            ],
            [
                'name' => 'Danang Dwijo Kangko, S.Hum., M.P.',
                'title' => 'Kepala Prodi Perpustakaan & Sains Informasi',
                'photo_path' => 'counselors/PDSI_Kaprodi_Danang-Dwijo-Kangko-S.Hum.,-M.P.png',
                'order_column' => 10,
                'username' => 'danang.dwijo',
            ],

            // --- FAKULTAS HUKUM ---
            [
                'name' => 'Dr. H. Mohammad Ryan Bakry, S.H., M.H.',
                'title' => 'Dekan Fakultas Hukum',
                'photo_path' => 'counselors/FH_Dekan_Dr.-H.-Mohammad-Ryan-Bakry,-S.H.,-M.png',
                'order_column' => 11,
                'username' => 'ryan.bakry',
            ],
            [
                'name' => 'Dr. Liza Evita, S.H., M.Hum.',
                'title' => 'Wakil Dekan I Fakultas Hukum',
                'photo_path' => 'counselors/FH_WadekI_Liza-Evita-Dr.-S.H.-M.Hum.png',
                'order_column' => 12,
                'username' => 'liza.evita',
            ],

            // --- FAKULTAS PSIKOLOGI ---
            [
                'name' => 'Dr. Melok Kinanthi, M.Psi., Psikolog.',
                'title' => 'Wakil Dekan I Fakultas Psikologi',
                'photo_path' => 'counselors/Psikologi_Kaprodi_Dr.-Melok-Roro-Kinanthi-Psikolog.png',
                'order_column' => 13,
                'username' => 'melok.kinanthi',
            ],
        ];

        foreach ($counselorsData as $data) {
            // Generate Dummy Phone & NIP
            $dummyPhone = '08' . rand(1111111111, 9999999999);
            $dummyNIP = '19' . rand(70, 99) . rand(10000000, 99999999);
            $email = $data['username'] . '@yarsi.ac.id';

            // 1. BUAT AKUN LOGIN (USERS TABLE) - INI PENTING UNTUK LOGIN!
            $user = User::create([
                'name' => $data['name'],
                'username' => $data['username'],
                'email' => $email,
                'password' => Hash::make('password'),
                'role' => 'konselor',
                'id_number' => $dummyNIP,
                'phone' => $dummyPhone,
                'gender' => 'P',
                'is_profile_complete' => true,
            ]);

            // 2. BUAT PROFIL KONSELOR (COUNSELORS TABLE)
            $counselor = Counselor::create([
                'user_id' => $user->id,
                'name' => $data['name'],
                'title' => $data['title'],
                'email' => $email,
                'phone' => $dummyPhone,
                'photo_path' => $data['photo_path'],
                'order_column' => $data['order_column'],
                'is_active' => true,
                'faculty' => 'Universitas YARSI', // Default
                'expertise' => 'Akademik & Karir', // Default
                'bio' => 'Konselor Akademik Universitas YARSI'
            ]);

            // 3. BUAT SLOT JADWAL DUMMY
            // Jadwal Senin Depan
            CounselorSlot::create([
                'counselor_id' => $counselor->id,
                'date' => now()->next('Monday')->format('Y-m-d'),
                'start_time' => '09:00:00',
                'end_time' => '12:00:00',
                'is_available' => true,
            ]);

            // Jadwal Kamis Depan
            CounselorSlot::create([
                'counselor_id' => $counselor->id,
                'date' => now()->next('Thursday')->format('Y-m-d'),
                'start_time' => '13:00:00',
                'end_time' => '15:00:00',
                'is_available' => true,
            ]);
        }
    }
}
