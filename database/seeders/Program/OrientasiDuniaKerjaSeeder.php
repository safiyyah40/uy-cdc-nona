<?php

namespace Database\Seeders\Program;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\OrientasiDuniaKerja;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class OrientasiDuniaKerjaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Bersihkan data lama (Opsional)
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        OrientasiDuniaKerja::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $orientasiduniakerjas = [
            [
                'title' => 'Strategi Menembus Seleksi Kerja di Era AI 2026',
                'categories' => ['Teknologi', 'Persiapan Karir', 'Software Engineering'],
                'date' => Carbon::create(2026, 1, 15),
                'time' => '09:00 - 12:00 WIB',
                'location' => 'Auditorium Lt. 3 Universitas YARSI & Zoom',
                'description' => 'Pelajari cara mengoptimalkan CV agar lolos screening ATS berbasis AI dan tips menghadapi wawancara kerja modern.',
                'content' => '<p>Di tahun 2026, penggunaan Artificial Intelligence (AI) dalam proses rekrutmen semakin masif. Workshop ini akan membedah:</p><ul><li>Cara kerja ATS (Applicant Tracking System) terbaru.</li><li>Menggunakan tools AI untuk latihan interview.</li><li>Networking efektif di LinkedIn.</li></ul><p><strong>Pembicara:</strong> HRD Tech Company Unicorn Indonesia.</p>',
                'registration_link' => 'https://bit.ly/registrasi-odk-ai-2026',
                'image' => null,
                'is_active' => true,
            ],
            [
                'title' => 'Personal Branding: Membangun Citra Profesional di LinkedIn',
                'categories' => ['Marketing', 'Personal Branding', 'Social Media'],
                'date' => Carbon::create(2026, 1, 20),
                'time' => '13:00 - 15:00 WIB',
                'location' => 'Zoom Meeting (Online)',
                'description' => 'Bangun profil LinkedIn yang "stand out" dan menarik perhatian recruiter global maupun lokal.',
                'content' => '<p>LinkedIn bukan sekadar CV online. Ini adalah portfolio hidup Anda. Dalam sesi ini kita akan praktik langsung:</p><ol><li>Membuat Headline yang "menjual".</li><li>Menulis deskripsi pengalaman yang berdampak.</li><li>Strategi posting konten untuk fresh graduate.</li></ol>',
                'registration_link' => 'https://bit.ly/odk-linkedin-mastery',
                'image' => null,
                'is_active' => true,
            ],
            [
                'title' => 'Workshop Financial Planning untuk First Jobber',
                'categories' => ['Ekonomi / Perbankan', 'Layanan Finansial', 'Life Skill'],
                'date' => Carbon::create(2026, 1, 28),
                'time' => '10:00 - 12:00 WIB',
                'location' => 'Ruang Seminar Perpustakaan YARSI',
                'description' => 'Jangan sampai gaji pertama habis tak bersisa! Belajar manajemen keuangan dasar untuk fresh graduate.',
                'content' => '<p>Materi mencakup:</p><ul><li>Budgeting metode 50/30/20.</li><li>Membedakan kebutuhan vs keinginan.</li><li>Instrumen investasi dasar (Reksadana, Obligasi) untuk pemula.</li><li>Pentingnya dana darurat sebelum berinvestasi.</li></ul>',
                'registration_link' => 'https://bit.ly/odk-finance-2026',
                'image' => null,
                'is_active' => true,
            ],
            [
                'title' => 'Navigasi Mental Health & Culture Shock di Dunia Korporat',
                'categories' => ['Kesehatan', 'Soft Skill', 'Psikologi Kerja'],
                'date' => Carbon::create(2026, 2, 5),
                'time' => '14:00 - 16:00 WIB',
                'location' => 'Hybrid (Luring & Daring)',
                'description' => 'Persiapan mental menghadapi transisi dari mahasiswa menjadi karyawan profesional.',
                'content' => '<p>Dunia kerja memiliki ritme dan tekanan yang berbeda dengan dunia kampus. Sesi ini menghadirkan Psikolog Industri untuk membahas:</p><ul><li>Menangani burnout di awal karir.</li><li>Komunikasi asertif dengan atasan dan rekan kerja.</li><li>Menjaga work-life balance.</li></ul>',
                'registration_link' => 'https://bit.ly/odk-mental-health',
                'image' => null,
                'is_active' => true,
            ],
            [
                'title' => 'Bootcamp Kilat: Data Science Fundamentals',
                'categories' => ['Data Science', 'Teknologi', 'Hard Skill'],
                'date' => Carbon::create(2026, 2, 12),
                'time' => '08:00 - 16:00 WIB',
                'location' => 'Lab Komputer T.Informatika',
                'description' => 'Pengenalan dasar pengolahan data dan visualisasi menggunakan Python dan Tableau.',
                'content' => '<p>Sesi intensif satu hari untuk mengenal dunia data. Peserta diharapkan membawa laptop masing-masing. Materi:</p><ul><li>Basic Python for Data Analysis.</li><li>Data Cleaning.</li><li>Data Visualization Storytelling.</li></ul>',
                'registration_link' => 'https://bit.ly/odk-data-science',
                'image' => null,
                'is_active' => true,
            ],
        ];

        foreach ($orientasiduniakerjas as $orientasiduniakerja) {
            OrientasiDuniaKerja::create($orientasiduniakerja);
        }
    }
}
