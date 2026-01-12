<?php

namespace Database\Seeders\Program;

use App\Models\CampusHiring;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CampusHiringSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        CampusHiring::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $campusHirings = [
            [
                'title' => 'Visa Officer - Embassy of Switzerland to Indonesia',
                'slug' => Str::slug('Visa Officer - Embassy of Switzerland to Indonesia'),
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
                'image' => 'images/campushiring.jpg',
                'registration_link' => 'https://www.eda.admin.ch/jakarta',
                'is_active' => true,
            ],
            [
                'title' => 'Campus Hiring BRILiaN Internship Program (BIP) – Career Day 2025',
                'slug' => Str::slug('Campus Hiring BRILiaN Internship Program (BIP) – Career Day 2025'),
                'company_name' => 'Bank Rakyat Indonesia (BRI) & PT. Siaga Abdi Utama',
                'location' => 'Workshop 1, 2, & 3 Lantai 11, Universitas YARSI',
                'date' => '2025-09-19',
                'time' => '08:00 - 16:00 WIB',
                'description' => 'Kesempatan emas berkarir di dunia perbankan melalui program magang BRILiaN Internship Program (BIP). Acara ini meliputi pengenalan budaya kerja BRI dan sesi walk-in interview langsung.',
                'content' => '
                    <p><strong>Jakarta, 19 September 2025</strong> — Sebagai bagian dari rangkaian <em>Career Day 2025 Universitas YARSI – Walk Interview</em>, Universitas YARSI bekerja sama dengan <strong>PT. Siaga Abdi Utama (@sauwork_id)</strong> menyelenggarakan Campus Hiring untuk <strong>BRILiaN Internship Program (BIP)</strong>.</p>

                    <p>Acara ini dibuka secara resmi oleh Wakil Rektor 1 Universitas YARSI, <strong>Dr. dr. Wening Sari, M.Kes</strong>, yang menegaskan pentingnya sinergi antara perguruan tinggi dan dunia industri untuk mempersiapkan lulusan yang adaptif dengan kebutuhan pasar.</p>

                    <h3>Rangkaian Kegiatan:</h3>
                    <ul>
                        <li><strong>Pengenalan Industri Perbankan:</strong> Paparan mendalam mengenai proses rekrutmen, budaya kerja, dan jenjang karir di Bank Rakyat Indonesia (BRI).</li>
                        <li><strong>Sosialisasi Program Magang:</strong> Informasi lengkap mengenai BRILiaN Internship Program (BIP).</li>
                        <li><strong>Walk-in Interview:</strong> Peserta dapat langsung mengikuti seleksi awal di lokasi untuk menunjukkan potensi terbaik mereka.</li>
                    </ul>

                    <p>Kegiatan ini merupakan komitmen nyata Universitas YARSI dalam memfasilitasi mahasiswa dan alumni untuk mengenal dunia kerja dan mendapatkan peluang karir terbaik melalui mitra industri terpercaya.</p>
                ',
                            'image' => '/campus-hiring/brilian-internship-bip.png',
                            'registration_link' => 'https://bit.ly/CareerDayYARSI2025',
                            'is_active' => true,

            ],
        ];

        for ($i = 2; $i <= 5; $i++) {
            $judul = 'Management Trainee Batch '.$i.' - Bank Mandiri';
            CampusHiring::create([
                'title' => $judul,
                'slug' => Str::slug($judul),
                'company_name' => 'PT Bank Mandiri (Persero) Tbk',
                'location' => 'Jakarta Pusat',
                'date' => now()->addDays($i * 5),
                'time' => '08:00 - 16:00 WIB',
                'description' => 'Program percepatan karir bagi lulusan baru untuk menjadi pemimpin masa depan di industri perbankan. Terbuka untuk semua jurusan dengan IPK minimal 3.00.',
                'content' => '<p>Program Management Trainee ini dirancang untuk mempersiapkan Anda menjadi pemimpin masa depan. Anda akan mendapatkan pelatihan intensif, rotasi divisi, dan mentoring langsung dari para eksekutif.</p><h3>Persyaratan:</h3><ul><li>Lulusan S1/S2 dari universitas terkemuka.</li><li>Usia maksimal 25 tahun untuk S1 dan 27 tahun untuk S2.</li><li>Mampu berbahasa Inggris dengan baik.</li><li>Bersedia ditempatkan di seluruh Indonesia.</li></ul>',
                'image' => null,
                'registration_link' => 'https://bankmandiri.co.id/karir',
                'is_active' => true,
            ]);
        }

        foreach ($campusHirings as $campusHiring) {
            CampusHiring::updateOrCreate(
                ['slug' => $campusHiring['slug']],
                $campusHiring
            );
        }
    }
}
