<?php

namespace Database\Seeders\PeluangKarir;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Magang;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class MagangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Magang::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        $magangs = [
            [
                'title' => 'Product Design Intern (GIP)',
                'slug' => 'product-design-intern-grab',
                'company' => 'Grab Indonesia',
                'location' => 'Jakarta Selatan',
                'type' => 'Internship',
                'categories' => ['Teknologi', 'Desain', 'Product Management'],
                'deadline' => Carbon::now()->addMonths(2)->format('Y-m-d'),
                'posted_date' => Carbon::now()->subDays(2)->format('Y-m-d'),
                'logo' => 'magang-logos/grab-logo.png',
                'description' => '<p>Bergabunglah dengan Grab Internship Program (GIP) untuk membentuk masa depan transportasi di Asia Tenggara. Anda akan bekerja sama dengan tim desain produk untuk menciptakan pengalaman pengguna yang intuitif dan menarik.</p><p>Posisi ini memberikan kesempatan untuk terlibat langsung dalam proyek nyata yang berdampak pada jutaan pengguna.</p>',
                'requirements' => '<ul><li>Mahasiswa tingkat akhir atau Fresh Graduate jurusan Desain Komunikasi Visual, IT, atau sejenis.</li><li>Memiliki portofolio desain UI/UX yang kuat.</li><li>Menguasai tools seperti Figma, Adobe XD, atau Sketch.</li><li>Kemampuan komunikasi bahasa Inggris yang baik.</li></ul>',
                'benefits' => '<ul><li>Uang saku kompetitif (Paid Internship).</li><li>Mentoring langsung dari Senior Designer.</li><li>Laptop dan fasilitas kerja hybrid.</li><li>Sertifikat penyelesaian program.</li></ul>',
                'application_url' => 'https://grab.careers/jobs',
                'salary_min' => 4500000,
                'salary_max' => 6000000,
                'is_active' => true,
            ],
            [
                'title' => 'Magang Bakti (Frontliner)',
                'slug' => 'magang-bakti-bca',
                'company' => 'Bank Central Asia (BCA)',
                'location' => 'Jakarta Selatan',
                'type' => 'Full Time',
                'categories' => ['Ekonomi', 'Perbankan', 'Layanan Pelanggan'],
                'deadline' => Carbon::now()->addWeeks(3)->format('Y-m-d'),
                'posted_date' => Carbon::now()->subDays(5)->format('Y-m-d'),
                'logo' => 'magang-logos/bca-logo.png',
                'description' => '<p>Program Magang Bakti BCA ditujukan bagi lulusan SMA hingga S1 yang ingin memperoleh pengalaman operasional perbankan yang sesungguhnya. Anda akan dilatih menjadi profesional yang handal dalam melayani nasabah.</p>', //
                'requirements' => '<ul><li>Warga Negara Indonesia.</li><li>Pria/Wanita berpenampilan menarik.</li><li>Lulusan SMA/SMK (nilai rata-rata 7.0) atau D1-S1 (IPK min 2.50).</li><li>Usia 18-24 tahun.</li><li>Belum menikah dan bersedia tidak menikah selama magang.</li><li>Ramah dan mampu berkomunikasi dengan baik.</li></ul>', //
                'benefits' => '<ul><li>Uang saku bulanan.</li><li>Tunjangan beasiswa (di akhir program).</li><li>Sertifikat Magang Bakti.</li><li>Pelatihan soft-skill perbankan.</li></ul>', //
                'application_url' => 'https://karir.bca.co.id/magang-bakti',
                'salary_min' => 4800000,
                'salary_max' => 5200000,
                'is_active' => true,
            ],
            [
                'title' => 'Account Management Intern',
                'slug' => 'account-management-intern-tiktok',
                'company' => 'TikTok Indonesia',
                'location' => 'Jakarta Selatan',
                'type' => 'Internship',
                'categories' => ['Marketing', 'Bisnis', 'Media Sosial'],
                'deadline' => Carbon::now()->addMonth(1)->format('Y-m-d'),
                'posted_date' => Carbon::now()->subWeek(1)->format('Y-m-d'),
                'logo' => 'magang-logos/tiktok-logo.png',
                'description' => '<p>Sebagai Account Management Intern, Anda akan membantu tim dalam mengelola hubungan dengan klien utama dan agensi partner. Anda akan belajar bagaimana menganalisis kinerja kampanye iklan dan memberikan rekomendasi strategis.</p>',
                'requirements' => '<ul><li>Mahasiswa aktif semester akhir jurusan Bisnis, Marketing, atau Komunikasi.</li><li>Memiliki pemahaman kuat tentang tren media sosial (terutama TikTok).</li><li>Mahir menggunakan Microsoft Excel/Google Sheets.</li><li>Detail-oriented dan proaktif.</li></ul>',
                'benefits' => '<ul><li>Allowance bulanan.</li><li>Makan siang gratis di kantor.</li><li>Akses ke event internal TikTok.</li><li>Lingkungan kerja yang dinamis dan fun.</li></ul>',
                'application_url' => 'https://careers.tiktok.com',
                'salary_min' => 5000000,
                'salary_max' => 7000000,
                'is_active' => true,
            ],
            [
                'title' => 'Accounting Intern (Onsite)',
                'slug' => 'accounting-intern-amartha',
                'company' => 'Amartha',
                'location' => 'Jakarta Selatan',
                'type' => 'Internship',
                'categories' => ['Ekonomi', 'Akuntansi', 'Fintech'],
                'deadline' => Carbon::now()->addWeeks(2)->format('Y-m-d'),
                'posted_date' => Carbon::now()->subDays(3)->format('Y-m-d'),
                'logo' => 'magang-logos/amartha-logo.png',
                'image' => 'magang-images/suasana-kerja.png',
                'description' => '<p>Amartha mencari Accounting Intern untuk mendukung tim keuangan dalam pencatatan transaksi harian, rekonsiliasi bank, dan persiapan laporan keuangan bulanan.</p>',
                'requirements' => '<ul><li>Mahasiswa tingkat akhir atau Fresh Graduate Akuntansi.</li><li>Memahami dasar-dasar akuntansi (Jurnal, Buku Besar).</li><li>Teliti dan jujur.</li><li>Bersedia bekerja onsite di Jakarta Selatan (WFO).</li></ul>',
                'benefits' => '<ul><li>Pengalaman kerja di industri Fintech P2P Lending.</li><li>Uang saku magang.</li><li>Surat referensi kerja.</li></ul>',
                'application_url' => 'https://careers.amartha.com',
                'salary_min' => 3000000,
                'salary_max' => 4000000,
                'is_active' => true,
            ],
            [
                'title' => 'IoT Engineer Intern',
                'slug' => 'iot-engineer-intern-bosch',
                'company' => 'Bosch Indonesia',
                'location' => 'Jakarta Selatan',
                'type' => 'Internship',
                'categories' => ['Teknologi', 'Engineering', 'IoT'],
                'deadline' => Carbon::now()->addMonths(3)->format('Y-m-d'),
                'posted_date' => Carbon::now()->subDays(1)->format('Y-m-d'),
                'logo' => 'magang-logos/bosch-logo.png',
                'description' => '<p>Bergabunglah dengan Bosch untuk mengembangkan solusi Internet of Things (IoT) masa depan. Anda akan terlibat dalam prototyping, coding, dan testing perangkat pintar.</p>',
                'requirements' => '<ul><li>Mahasiswa Teknik Elektro, Informatika, atau Mekatronika.</li><li>Memiliki pengalaman dengan Microcontroller (Arduino/ESP32/Raspberry Pi).</li><li>Menguasai bahasa C/C++ atau Python.</li><li>Passionate di bidang teknologi.</li></ul>',
                'benefits' => '<ul><li>Paid Internship.</li><li>Akses ke lab teknologi Bosch.</li><li>Kesempatan direkrut Full-time.</li></ul>',
                'application_url' => 'https://www.bosch.co.id/careers',
                'salary_min' => 4000000,
                'salary_max' => 5500000,
                'is_active' => true,
            ],
             [
                'title' => 'Marketing Intern',
                'slug' => 'marketing-intern-reckitt',
                'company' => 'Reckitt Benckiser Indonesia',
                'location' => 'Jakarta Selatan',
                'type' => 'Internship',
                'categories' => ['Marketing', 'FMCG'],
                'deadline' => Carbon::now()->addWeeks(4)->format('Y-m-d'),
                'posted_date' => Carbon::now()->subDays(4)->format('Y-m-d'),
                'logo' => 'magang-logos/reckitt-logo.png',
                'description' => '<p>Mendukung tim Brand Marketing dalam eksekusi kampanye digital dan offline. Melakukan riset pasar dan analisis kompetitor untuk produk FMCG.</p>',
                'requirements' => '<ul><li>Mahasiswa S1 semua jurusan (diutamakan Manajemen/Bisnis).</li><li>Kreatif dan memiliki kemampuan analisis data dasar.</li><li>Fasih berbahasa Inggris (Lisan & Tulisan).</li><li>Bisa menggunakan tools desain (Canva/Photoshop) adalah nilai plus.</li></ul>',
                'benefits' => '<ul><li>Gaji magang kompetitif.</li><li>Produk gratis perusahaan.</li><li>Experience kerja di perusahaan multinasional.</li></ul>',
                'application_url' => 'https://careers.reckitt.com',
                'salary_min' => 4500000,
                'salary_max' => 5500000,
                'is_active' => true,
            ],
             [
                'title' => 'IT Support Intern',
                'slug' => 'it-support-intern-diwan',
                'company' => 'PT. Diwan Gadingmas',
                'location' => 'Jakarta Selatan',
                'type' => 'Part Time',
                'categories' => ['Teknologi', 'IT Support', 'Jaringan'],
                'deadline' => Carbon::now()->addWeeks(2)->format('Y-m-d'),
                'posted_date' => Carbon::now()->subDays(6)->format('Y-m-d'),
                'logo' => 'magang-logos/diwan-logo.png',
                'description' => '<p>Membantu tim IT dalam troubleshooting hardware/software karyawan, instalasi jaringan, dan maintenance server ringan.</p>',
                'requirements' => '<ul><li>Siswa SMK TKJ atau Mahasiswa Teknik Informatika.</li><li>Paham dasar jaringan (LAN/WLAN) dan troubleshooting PC.</li><li>Bersedia bekerja shifting jika diperlukan.</li></ul>',
                'benefits' => '<ul><li>Uang makan dan transport.</li><li>Pengalaman hands-on hardware.</li></ul>',
                'application_url' => 'https://jobstreet.co.id',
                'salary_min' => 2000000,
                'salary_max' => 3000000,
                'is_active' => true,
            ],
        ];

        foreach ($magangs as $magang) {
            // Cek apakah slug sudah ada biar tidak duplikat saat seeding ulang
            if (!Magang::where('slug', $magang['slug'])->exists()) {
                Magang::create($magang);
            }
        }
    }
}
