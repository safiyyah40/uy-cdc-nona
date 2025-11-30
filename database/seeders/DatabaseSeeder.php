<?php

namespace Database\Seeders;

use App\Models\BerandaSlide;
use App\Models\PuskakaGallery;
use App\Models\CampusHiring;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // User
        User::factory()->create([
            'name' => 'Admin Puskaka',
            'email' => 'admin@puskaka.com',
        ]);

        // Beranda Slide
        $slides = [
            [
                'image_path' => 'images/slideshow beranda/slideshow 1.jpeg',
                'alt_text' => 'Slideshow 1',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'image_path' => 'images/slideshow beranda/slideshow 2.jpeg',
                'alt_text' => 'Slideshow 2',
                'sort_order' => 2,
                'is_active' => true,
            ],
        ];

        foreach ($slides as $slide) {
            BerandaSlide::create(array_merge($slide, ['is_active' => true]));
        }

        // Puskaka Gallery
        PuskakaGallery::create([
            'title' => 'Tim Puskaka',
            'image_path' => 'images/PuskakaGallery/puskaka.jpg',
            'is_active' => true,
        ]);

        $title1 = "Visa Officer - Embassy of Switzerland to Indonesia";
        CampusHiring::create([
            'title' => $title1,
            'slug' => Str::slug($title1),
            'company_name' => 'Embassy of Switzerland',
            'location' => 'Jakarta',
            'date' => '2025-12-07',
            'time' => '09:00 - 17:00 WIB',
            'description' => 'Kami mencari Warga Negara Indonesia untuk posisi Visa Officer. Kandidat akan bertanggung jawab memproses aplikasi visa, memberikan layanan pelanggan yang profesional, dan mendukung administrasi konsuler.',
            'content' => '
                <p><strong>Posisi:</strong> Visa Officer</p>
                <p><strong>Mulai Bekerja:</strong> 1 Januari 2026 atau secepatnya.</p>
                
                <h3>Tanggung Jawab Utama:</h3>
                <ul>
                    <li>Memproses aplikasi visa sesuai standar yang ditetapkan.</li>
                    <li>Melayani pemohon secara profesional baik melalui telepon, email, maupun tatap muka.</li>
                    <li>Memberikan informasi yang akurat dan tepat waktu dengan cara yang ramah pelanggan.</li>
                    <li>Berkoordinasi dengan pusat aplikasi visa eksternal.</li>
                    <li>Memberikan bantuan konsuler terkait registrasi kelahiran, pernikahan, perceraian, dan kematian yang melibatkan warga negara Swiss.</li>
                    <li>Membantu warga negara Swiss dalam situasi krisis dan menjadi penghubung dengan instansi pemerintah (KEMLU, Imigrasi, dll).</li>
                    <li>Memberikan dukungan administrasi umum untuk bagian konsuler.</li>
                </ul>

                <h3>Kualifikasi & Kriteria Seleksi:</h3>
                <ul>
                    <li>Gelar Sarjana (S1) atau lebih tinggi.</li>
                    <li>Pengalaman minimal 1 tahun dalam menangani visa dan/atau urusan konsuler.</li>
                    <li>Keterampilan IT yang sangat baik (Microsoft Office, dll).</li>
                    <li>Fasih berbahasa Inggris dan Indonesia (lisan & tulisan).</li>
                    <li>Pengetahuan bahasa Jerman dan/atau Prancis adalah nilai tambah besar.</li>
                    <li>Keterampilan komunikasi dan interpersonal yang sangat baik.</li>
                    <li>Integritas moral tinggi, sikap profesional, dan patuh terhadap kode etik.</li>
                    <li>Kemampuan organisasi dan multitasking yang sangat baik.</li>
                </ul>

                <p><strong>Lokasi Kerja:</strong> Posisi ini berbasis di Jakarta.</p>
                <p>Kami menawarkan kondisi kerja yang sangat baik, gaji kompetitif sesuai pengalaman, dan tunjangan sosial yang menarik dalam lingkungan internasional yang dinamis.</p>
            ',
            'image' => 'images/campushiring/visa-officer.jpg',
            'registration_link' => 'https://www.eda.admin.ch/jakarta',
            'is_active' => true,
        ]);

        // Data 2: Dummy Tambahan (Biar genap 4 buat testing)
        for ($i = 2; $i <= 5; $i++) {
            $judul = "Management Trainee Batch " . $i . " - Bank Mandiri";
            CampusHiring::create([
                'title' => $judul,
                'slug' => Str::slug($judul),
                'company_name' => 'PT Bank Mandiri (Persero) Tbk',
                'location' => 'Jakarta Pusat',
                'date' => now()->addDays($i * 5),
                'time' => '08:00 - 16:00 WIB',
                'description' => 'Program percepatan karir bagi lulusan baru untuk menjadi pemimpin masa depan di industri perbankan. Terbuka untuk semua jurusan dengan IPK minimal 3.00.',
                'content' => '<p>Program Management Trainee ini dirancang untuk mempersiapkan Anda menjadi pemimpin masa depan. Anda akan mendapatkan pelatihan intensif, rotasi divisi, dan mentoring langsung dari para eksekutif.</p><h3>Persyaratan:</h3><ul><li>Lulusan S1/S2 dari universitas terkemuka.</li><li>Usia maksimal 25 tahun untuk S1 dan 27 tahun untuk S2.</li><li>Mampu berbahasa Inggris dengan baik.</li><li>Bersedia ditempatkan di seluruh Indonesia.</li></ul>',
                'image' => null, // Biarkan default
                'registration_link' => 'https://bankmandiri.co.id/karir',
                'is_active' => true,
            ]);
        }
    }
}