<?php

namespace Database\Seeders;

use App\Models\RiasecCategory;
use Illuminate\Database\Seeder;

class RiasecCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'code' => 'R',
                'title' => 'Realistic',
                'nickname' => 'The Hands-on Hustler (Si Paling Teknis)',
                'description' => 'Orang dengan tipe kepribadian Realistic cenderung praktis, hands-on, dan suka bekerja dengan tangan mereka. Mereka menikmati bekerja dengan alat, mesin, dan objek nyata lainnya.',
                'traits' => [
                    'Praktis dan Logis',
                    'Mandiri dan Tangguh',
                    'Orientasi Tugas',
                    'Minat Teknologi'
                ],
                'branding_strategies' => [
                    'Portofolio Project Teknikal',
                    'Blog/Vlog DIY',
                    'Sertifikasi Teknis',
                    'Komunitas Praktisi'
                ],
                'career_recommendations' => [
                    'Teknisi Elektronik',
                    'Insinyur Mesin',
                    'Mekanik',
                    'Operator Alat Berat',
                    'Arsitek Teknik'
                ],
                'order' => 1,
            ],
            [
                'code' => 'I',
                'title' => 'Investigative',
                'nickname' => 'The Brainiac (Si Paling Analitis)',
                'description' => 'Orang dengan tipe kepribadian Investigative cenderung analitis, penasaran, dan suka memecahkan masalah yang kompleks. Mereka menikmati pekerjaan yang melibatkan penelitian dan teori.',
                'traits' => [
                    'Penasaran & Intelektual',
                    'Logis & Analitis',
                    'Berpikir Kritis',
                    'Detail Oriented'
                ],
                'branding_strategies' => [
                    'Publikasi Artikel Riset',
                    'Studi Kasus Data',
                    'Pendidikan Lanjutan',
                    'Forum Ilmiah'
                ],
                'career_recommendations' => [
                    'Peneliti',
                    'Data Analyst',
                    'Ilmuwan',
                    'Dokter/Apoteker',
                    'Programmer'
                ],
                'order' => 2,
            ],
            [
                'code' => 'A',
                'title' => 'Artistic',
                'nickname' => 'The Aesthetic Alchemist (Si Paling Kreatif)',
                'description' => 'Orang dengan tipe kepribadian Artistic cenderung kreatif, ekspresif, dan suka bekerja dengan ide abstrak. Mereka menikmati pekerjaan yang melibatkan seni, desain, musik, dan tulisan.',
                'traits' => [
                    'Kreatif & Imajinatif',
                    'Ekspresif',
                    'Spontan & Fleksibel',
                    'Apresiasi Estetika'
                ],
                'branding_strategies' => [
                    'Portofolio Online (Behance/IG)',
                    'Personal Website',
                    'Proyek Kolaborasi',
                    'Storytelling'
                ],
                'career_recommendations' => [
                    'Desainer Grafis',
                    'Content Creator',
                    'Penulis',
                    'Musisi',
                    'Fotografer'
                ],
                'order' => 3,
            ],
            [
                'code' => 'S',
                'title' => 'Social',
                'nickname' => 'The Social Ambassador (Si Paling Peduli)',
                'description' => 'Orang dengan tipe kepribadian Social cenderung ramah, kooperatif, dan bertanggung jawab. Mereka menikmati bekerja dalam kelompok dan membantu orang lain berkembang.',
                'traits' => [
                    'Empati Tinggi',
                    'Kooperatif',
                    'Komunikatif',
                    'Helpful'
                ],
                'branding_strategies' => [
                    'Volunteer Experience',
                    'Testimoni Rekan',
                    'Networking Event',
                    'Content Sharing'
                ],
                'career_recommendations' => [
                    'Guru',
                    'Konselor',
                    'Perawat',
                    'HR Manager',
                    'Social Worker'
                ],
                'order' => 4,
            ],
            [
                'code' => 'E',
                'title' => 'Enterprising',
                'nickname' => 'The Visionary Leader (Si Paling Ambis)',
                'description' => 'Orang dengan tipe kepribadian Enterprising cenderung ambisius, energik, dan percaya diri. Mereka suka memimpin, membujuk orang lain, dan mengejar target.',
                'traits' => [
                    'Kepemimpinan',
                    'Persuasif',
                    'Berani Mengambil Risiko',
                    'Optimis'
                ],
                'branding_strategies' => [
                    'Leadership Roles',
                    'Pencapaian Target (KPI)',
                    'Public Speaking',
                    'Professional Look'
                ],
                'career_recommendations' => [
                    'Entrepreneur',
                    'Sales Manager',
                    'Marketing Manager',
                    'CEO/Direktur',
                    'Business Development'
                ],
                'order' => 5,
            ],
            [
                'code' => 'C',
                'title' => 'Conventional',
                'nickname' => 'The Order Keeper (Si Paling Rapi)',
                'description' => 'Orang dengan tipe kepribadian Conventional cenderung teliti, teratur, dan efisien. Mereka menyukai struktur, aturan yang jelas, dan bekerja dengan data.',
                'traits' => [
                    'Terorganisir',
                    'Detail Oriented',
                    'Taat Aturan',
                    'Efisien'
                ],
                'branding_strategies' => [
                    'Keahlian Tools (Excel/Db)',
                    'Track Record Teliti',
                    'Manajemen Proyek',
                    'Data Driven'
                ],
                'career_recommendations' => [
                    'Akuntan',
                    'Administrator',
                    'Auditor',
                    'Sekretaris',
                    'Data Entry'
                ],
                'order' => 6,
            ],
        ];

        foreach ($categories as $category) {
            RiasecCategory::create($category);
        }
    }
}