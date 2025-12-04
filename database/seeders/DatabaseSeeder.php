<?php

namespace Database\Seeders;

use App\Models\BerandaSlide;
use App\Models\Counselor;
use App\Models\CounselorSlot;
use App\Models\PuskakaGallery;
use App\Models\PuskakaTeam;
use App\Models\CampusHiring;
use App\Models\TipsDanTrik;
use App\Models\Seminar;
use App\Models\Magang;
use App\Models\Berita;
use Carbon\Carbon;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // User
        User::factory()->create([
            'name' => 'Admin Puskaka',
            'email' => 'adminpuskaka@yarsi.ac.id',
        ]);

        // Beranda Slide
        $slides = [
            [
                'image_path' => 'beranda-slides/slideshow-1.jpeg',
                'alt_text' => 'Slideshow 1',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'image_path' => 'beranda-slides/slideshow-2.jpeg',
                'alt_text' => 'Slideshow 2',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'image_path' => 'beranda-slides/slideshow-3.jpg',
                'alt_text' => 'Slideshow 3',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'image_path' => 'beranda-slides/slideshow-4.jpg',
                'alt_text' => 'Slideshow 4',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'image_path' => 'beranda-slides/slideshow-5.jpeg',
                'alt_text' => 'Slideshow 5',
                'sort_order' => 5,
                'is_active' => true,
            ],
            [
                'image_path' => 'beranda-slides/slideshow-6.jpg',
                'alt_text' => 'Slideshow 6',
                'sort_order' => 6,
                'is_active' => true,
            ],
        ];
        foreach ($slides as $slide) {
            BerandaSlide::create(array_merge($slide, ['is_active' => true]));
        }

        // Dokumentasi Kegiatan Puskaka
        $puskakaGalleries = [
            [
                'title' => 'Tim Puskaka',
                'image_path' => 'puskaka-gallery/puskaka.jpg',
                'is_active' => true,
            ],
            [
                'title' => 'Lolos Seleksi Program Magang Berdampak 2025 Perpustakaan Nasional Republik Indonesia',
                'image_path' => 'puskaka-gallery/18-Mahasiswa-Universitas-YARSI-Lolos-Seleksi-Program-Magang-Berdampak-2025-Perpustakaan-Nasional-Republik-Indonesia.jpg',
                'is_active' => true,
            ],
        ];
        foreach ($puskakaGalleries as $puskakaGallery) {
            PuskakaGallery::create(array_merge($puskakaGallery, ['is_active' => true]));
        }

        //Tim Puskaka
        $teamMembersPuskaka = [
            [
                'name' => 'Wening Sari, Dr. dr. M.Kes.',
                'title' => 'Wakil Rektor 1',
                'photo_path' => 'puskaka-team-photos/wening-kemahasiswaan.jpg',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Mubarik Ahmad, Dr. S.Kom., M.Kom.',
                'title' => 'Kepala Pusat Kemahasiswaan, Karir dan Alumni',
                'photo_path' => 'puskaka-team-photos/arik-kemahasiswaan.jpg',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Heni Mudiawati, S.T.',
                'title' => 'Staf I',
                'photo_path' => 'puskaka-team-photos/heni-kemahasiswaan.jpg',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Habibah, S.E.',
                'title' => 'Staf II',
                'photo_path' => 'puskaka-team-photos/habibah-kemahasiswaan.jpg',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'Achmad Muad Syaefudin, S.Pd.',
                'title' => 'Staf III',
                'photo_path' => 'puskaka-team-photos/muad-kemahasiswaan.jpg',
                'sort_order' => 5,
                'is_active' => true,
            ],
        ];
        foreach ($teamMembersPuskaka as $memberPuskaka) {
            PuskakaTeam::create($memberPuskaka);
        }

        // Tim Konselor
        $counselors = [
            // --- FAKULTAS KEDOKTERAN ---
            [
                'name' => 'dr. Miranti Pusparini, M.Pd(Ked).',
                'title' => 'Wakil Dekan I Fakultas Kedokteran',
                'photo_path' => 'counselors/FK_WadekI_Miranti_Pusparini.png',
                'order_column' => 1,
            ],
            [
                'name' => 'dr. Tuty Herawati, Sp.A(K).',
                'title' => 'Kepala Prodi Sarjana Kedokteran',
                'photo_path' => 'counselors/FK_Kaprodi_Tuty_Herawati.png',
                'order_column' => 2,
            ],

            // --- FAKULTAS KEDOKTERAN GIGI ---
            [
                'name' => 'drg. Agus Ardinansyah, M.Pd.Ked.',
                'title' => 'Wakil Dekan II Fakultas Kedokteran Gigi',
                'photo_path' => 'counselors/FKG_WadekII_Agus-Ardinansyah-drg.-M.Pd_Ked.png',
                'order_column' => 3,
            ],
            [
                'name' => 'Dr. drg. Chaerita Maulani, Sp.Perio.',
                'title' => 'Kepala Prodi Kedokteran Gigi',
                'photo_path' => 'counselors/FKG_Kaprodi_Chaerita-Maulani-drg.-Sp.Perio.png',
                'order_column' => 4,
            ],

            // --- FAKULTAS EKONOMI DAN BISNIS ---
            [
                'name' => 'Rini Hidayati, S.E., M.M.',
                'title' => 'Wakil Dekan I Fakultas Ekonomi dan Bisnis',
                'photo_path' => 'counselors/FEB_WadekI_Rini-Hidayati-SE.-MM.png',
                'order_column' => 5,
            ],
            [
                'name' => 'Imelda Sari, SE., M.Si., AK.',
                'title' => 'Kepala Prodi Akuntansi',
                'photo_path' => 'counselors/Akuntansi_Kaprodi_Imelda-Sari-SE.-MSi.-AK.png',
                'order_column' => 6,
            ],
            [
                'name' => 'Alyta Shabrina Zusryn, SP., M.Sc., CRP.',
                'title' => 'Kepala Prodi Manajemen',
                'photo_path' => 'counselors/Manajemen_Kaprodi_Alyta-Shabrina-Zusryn-S.P.-M.Sc.,-CRP.png',
                'order_column' => 7,
            ],

            // --- FAKULTAS TEKNOLOGI INFORMASI ---
            [
                'name' => 'Herika Hayurani, S.Kom., M.Kom.',
                'title' => 'Wakil Dekan I Fakultas Teknologi Informasi',
                'photo_path' => 'counselors/FTI_WadekI_Herika-Hayurani-S.Kom.,-M.Kom.png',
                'order_column' => 8,
            ],
            [
                'name' => 'Elan Suherlan, S.Si., M.Si.',
                'title' => 'Kepala Prodi Teknik Informatika',
                'photo_path' => 'counselors/TI_Kaprodi_Elan-Suherlan-S.Si.,-M.Si.png',
                'order_column' => 9,
            ],
            [
                'name' => 'Danang Dwijo Kangko, S.Hum., M.P.',
                'title' => 'Kepala Prodi Perpustakaan & Sains Informasi',
                'photo_path' => 'counselors/PDSI_Kaprodi_Danang-Dwijo-Kangko-S.Hum.,-M.P.png',
                'order_column' => 10,
            ],

            // --- FAKULTAS HUKUM ---
            [
                'name' => 'Dr. H. Mohammad Ryan Bakry, S.H., M.H.',
                'title' => 'Dekan Fakultas Hukum',
                'photo_path' => 'counselors/FH_Dekan_Dr.-H.-Mohammad-Ryan-Bakry,-S.H.,-M.png',
                'order_column' => 11,
            ],
            [
                'name' => 'Dr. Liza Evita, S.H., M.Hum.',
                'title' => 'Wakil Dekan I Fakultas Hukum',
                'photo_path' => 'counselors/FH_WadekI_Liza-Evita-Dr.-S.H.-M.Hum.png',
                'order_column' => 12,
            ],

            // --- FAKULTAS PSIKOLOGI ---
            [
                'name' => 'Dr. Melok Kinanthi, M.Psi., Psikolog.',
                'title' => 'Wakil Dekan I Fakultas Psikologi',
                'photo_path' => 'counselors/Psikologi_Kaprodi_Dr.-Melok-Roro-Kinanthi-Psikolog.png',
                'order_column' => 13,
            ],
        ];
        foreach ($counselors as $data) {
            $data['is_active'] = true;

            // Create Konselor
            $counselor = Counselor::create($data);

            // Jadwal Dummy Konselor
            CounselorSlot::create([
                'counselor_id' => $counselor->id,
                'date' => now()->next('Monday')->format('Y-m-d'),
                'start_time' => '09:00',
                'end_time' => '12:00',
                'is_available' => true,
            ]);

            CounselorSlot::create([
                'counselor_id' => $counselor->id,
                'date' => now()->next('Thursday')->format('Y-m-d'),
                'start_time' => '13:00',
                'end_time' => '15:00',
                'is_available' => true,
            ]);
            CounselorSlot::create([
                'counselor_id' => $counselor->id,
                'date' => now()->next('Friday')->format('Y-m-d'),
                'start_time' => '10:00',
                'end_time' => '12:00',
                'is_available' => true,
            ]);
        }

        // Campus Hiring
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
                'image' => null,
                'registration_link' => 'https://bankmandiri.co.id/karir',
                'is_active' => true,
            ]);
        }

        $seminars = [
            [
                'title' => 'Seminar Srikandi YARSI 2025 Vol. 1: Zero Tolerance to Sexual Violence on Campus',
                'slug' => 'seminar-srikandi-yarsi-2025-vol-1',
                'speaker' => 'dr. Maya Trisiswati, MKM',
                'organizer' => 'Dirjen Pemberdayaan Perempuan, BEM KM Universitas YARSI & PPKS YARSI',
                'location' => 'Auditorium Al-Qudus Lt. 12, Universitas YARSI',
                'type' => 'Offline',
                'image' => 'seminars/srikandi-vol-1.png',
                'date' => '2025-04-12',
                'time' => '09:30',
                'registration_link' => 'https://bit.ly/DaftarSrikandiYARSI2025Vol1',
                'is_active' => true,
                'description' => 'Seminar edukatif tentang pencegahan dan penanganan kekerasan seksual di lingkungan kampus. Kenali, Cegah, dan Laporkan!',
                'benefits' => '<ul>
                    <li>Memperluas wawasan & kepedulian sosial</li>
                    <li>E-sertifikat</li>
                    <li>Surat Keterangan Pendamping Ijazah (SKPI)</li>
                    <li>Snack & Doorprize seru!</li>
                </ul>',
                'content' => '<p><strong>Assalamu’alaikum Warahmatullahi Wabarakatuh</strong></p><p>Halo, teman-teman mahasiswa! 👋🏻</p><p>Tahukah kalian bahwa kasus perundungan, kekerasan, dan pelecehan seksual masih kerap terjadi di lingkungan kampus? 😔</p><p>Srikandi YARSI hadir untuk meningkatkan kesadaran akan pencegahan kekerasan seksual di kampus.</p><br><h3>Tentang Pembicara</h3><p><strong>dr. Maya Trisiswati, MKM</strong> adalah pakar kesehatan masyarakat.</p><br><p>Ajak teman-temanmu untuk peduli dan berani bersuara!</p>',
            ],
            [
                'title' => 'Seminar Srikandi YARSI 2025 Vol. 2: Stress Diatasi Rokok dan Vape?',
                'slug' => 'seminar-srikandi-yarsi-2025-vol-2',
                'speaker' => 'dr. Aminah Ahmad Alaydrus, Sp.KJ',
                'organizer' => 'Dirjen Pemberdayaan Perempuan, BEM KM Universitas YARSI & PPKS YARSI',
                'location' => 'Auditorium Al-Qudus Lt. 12, Universitas YARSI',
                'type' => 'Offline',
                'image' => 'seminars/srikandi-vol-1.png',
                'date' => '2025-05-24',
                'time' => '09:00',
                'registration_link' => 'https://bit.ly/DaftarSrikandiYARSI2025Vol2',
                'is_active' => true,
                'description' => 'Membahas bahaya rokok dan vape dari sudut pandang kesehatan mental.',
                'benefits' => '<ul><li>Ilmu berharga</li><li>Snack & Doorprize</li><li>Benefit Eksklusif (Series Vol 1-3): E-Sertifikat & SKPI</li></ul>',
                'content' => '<p>Membahas tuntas bahaya rokok dan vape, khususnya dari sudut pandang kesehatan mental bersama <strong>dr. Aminah Ahmad Alaydrus, Sp.KJ</strong>.</p>',
            ],
            [
                'title' => 'Seminar Srikandi YARSI 2025 Vol. 3: Ingin Dihargai? Jangan Mulai Menindas',
                'slug' => 'seminar-srikandi-yarsi-2025-vol-3',
                'speaker' => 'Dr. Octaviani I. Ranakusuma',
                'organizer' => 'Dirjen Pemberdayaan Perempuan, BEM KM Universitas YARSI',
                'location' => 'Auditorium Al-Qudus Lt. 12, Universitas YARSI',
                'type' => 'Offline',
                'image' => 'seminars/srikandi-vol-1.png',
                'date' => '2025-06-21',
                'time' => '10:00',
                'registration_link' => 'https://forms.gle/djj76KttVydRucQC9',
                'is_active' => true,
                'description' => 'Membahas fenomena senioritas, bullying, dan pentingnya lingkungan kampus yang suportif.',
                'benefits' => '<ul><li>Snack & Doorprize</li><li>E-Sertifikat (khusus mengikuti Vol 1–3)</li><li>SKPI</li></ul>',
                'content' => '<p>Fenomena senioritas dan bullying masih sering terjadi di lingkungan akademik. Seminar ini membahas bagaimana menciptakan budaya saling menghargai.</p>',
            ],
            [
                'title' => 'Seminar Business Plan National Competition & Career Day 2025',
                'slug' => 'seminar-business-plan-national-competition-2025',
                'speaker' => 'Pridana Nasution',
                'organizer' => 'BEM KM Universitas YARSI Kabinet Galasvana',
                'location' => 'Ruang Seminar Auditorium Rektorat',
                'type' => 'Offline',
                'image' => 'seminars/seminar-career-day.jpg',
                'date' => '2025-11-22',
                'time' => '13:00',
                'registration_link' => 'https://forms.gle/W7bPo1ZvQKVXVrbh8',
                'is_active' => true,
                'description' => 'Wawasan tentang penjualan berbasis inovasi ramah lingkungan yang menguntungkan secara bisnis.',
                'benefits' => '<ul>
                    <li>Sertifikat</li>
                    <li>Wawasan Bisnis Inovatif</li>
                    <li>Relasi</li>
                </ul>',
                'content' => '
                    <p><strong>Assalamu’alaikum Warahmatullahi Wabarakatuh</strong></p>
                    <p>Halo, Sobat Kreatif! 👋🏻</p>
                    <p>Kami mengajak kamu semua untuk mengikuti seminar yang akan memberikan wawasan tentang penjualan berbasis inovasi ramah lingkungan yang tidak hanya menguntungkan secara bisnis.</p>
                    <br>
                    <h3>Narasumber</h3>
                    <p><strong>Pridana Nasution</strong> — Director of Nabata Consulting & Emode Indonesia</p>
                    <br>
                    <p>Jangan lewatkan kesempatan ini! Segera daftarkan dirimu dan dapatkan wawasan bisnis yang inovatif, berkelanjutan, dan berdampak positif ✨</p>
                ',
            ],
            [
                'title' => 'Seminar Inspiratif: Makan Bergizi Gratis, Isu dan Tantangan Evaluasi',
                'slug' => 'seminar-makan-bergizi-gratis-2025',
                'speaker' => 'Prof. Dr. Tjandra Yoga Aditama & dr. Yusnita',
                'organizer' => 'Universitas YARSI',
                'location' => 'Ruang Seminar Rektorat Lt. 1 Universitas Yarsi',
                'type' => 'Offline',
                'image' => 'seminars/seminar-makan-bergizi-gratis.jpg',
                'date' => '2025-11-29',
                'time' => '08:00',
                'registration_link' => 'https://docs.google.com/forms/d/e/1FAIpQLSdM_PD997l9_ivz01LULySphp9A60ISMyyB-tMGCY_fSFQeGg/viewform',
                'is_active' => true,
                'description' => 'Membuka wawasan tentang pentingnya pangan bergizi, kemandirian rakyat, dan peran masyarakat.',
                'benefits' => '<ul>
                    <li>Wawasan Pangan Bergizi</li>
                    <li>Gratis & Terbuka untuk Umum</li>
                    <li>Diskusi Langsung dengan Pakar</li>
                </ul>',
                'content' => '
                    <p><strong>[SEMINAR INSPIRATIF & GERAKAN SOSIAL]</strong></p>
                    <p>Halo teman-teman YARSI! Yuk, ikut bergabung dalam seminar penuh inspirasi yang akan membuka wawasan kita tentang pentingnya pangan bergizi, kemandirian rakyat, dan peran masyarakat dalam mewujudkan supremasi sipil di Indonesia!</p>
                    <br>
                    <h3>Narasumber Luar Biasa:</h3>
                    <ul>
                        <li><strong>Prof. Dr. Tjandra Yoga Aditama, Sp.P(K), MARS</strong></li>
                        <li><strong>dr. Yusnita, M.Kes. Dipl.DK., SpKKLP</strong></li>
                    </ul>
                    <p>Acaranya GRATIS dan terbuka untuk umum! Jangan lewatkan kesempatan untuk belajar langsung dari para ahli.</p>
                ',
            ],
            [
                'title' => 'Webinar: Public Speaking For Real Life',
                'slug' => 'webinar-public-speaking-for-real-life',
                'speaker' => 'MC Iwan Ang (Praktisi Public Speaking)',
                'organizer' => 'Justin Prabowo (Event Organizer)',
                'location' => 'Via Zoom Meeting',
                'type' => 'Online',
                'image' => 'seminars/webinar-public-speaking.png',
                'date' => '2025-12-06',
                'time' => '18:30',
                'registration_link' => 'https://docs.google.com/forms/d/e/1FAIpQLSeJ_DdiVUx87slVg0pqGVPK4U_H0QMnvT0508DOcOjn5bVjuw/viewform',
                'is_active' => true,
                'description' => 'Komunikasi yang Bikin Kita Dipercaya. Pelajari teknik public speaking untuk kehidupan nyata.',
                'benefits' => '<ul>
                    <li>E-Certificate (Fee)</li>
                    <li>E-Book (Fee)</li>
                    <li>Networking & Insight Berharga</li>
                    <li>Knowledge</li>
                </ul>',
                'content' => '
                    <p><strong>🚀 WEBINAR DATANG!</strong></p>
                    <p>Ingin komunikasi yang bikin kita dipercaya? Ikuti webinar "Public Speaking For Real Life".</p>
                    <p>Bersama <strong>MC Iwan Ang</strong> (Praktisi Public Speaking), kita akan belajar bagaimana berbicara dengan percaya diri dan efektif.</p>
                    <p>Daftar sekarang & jangan sampai ketinggalan!</p>
                ',
            ],
            [
                'title' => 'Webinar Sampah Bernilai: Kelola Limbah Jadi Peluang',
                'slug' => 'webinar-sampah-bernilai-2025',
                'speaker' => 'Maria Angela Novi P. & Muchamad Ikhsan Destian',
                'organizer' => 'Komunitas SOHIB & Pandawara Group',
                'location' => 'Via Zoom (Tautan di grup Telegram)',
                'type' => 'Online',
                'image' => 'seminars/webinar-sampah-bernilai.png',
                'date' => '2025-11-29',
                'time' => '19:00',
                'registration_link' => 'https://s.id/SOHIBercerita_6',
                'is_active' => true,
                'description' => 'Cara-cara kreatif dalam mengelola limbah untuk keberlanjutan bumi dan peluang ekonomi.',
                'benefits' => '<ul>
                    <li>Gratis</li>
                    <li>E-Certificate</li>
                    <li>E-wallet (untuk peserta terpilih)</li>
                </ul>',
                'content' => '
                    <p>Pernah kepikiran nggak sih kalau sampah bisa jadi peluang besar? 💡 Yuk, ikuti webinar Sampah Bernilai!</p>
                    <p>Bareng <strong>Kak Maria Angela Novi Prasetiati</strong> dari Dinas Lingkungan Hidup Jawa Barat dan <strong>Kak Muchamad Ikhsan Destian</strong> dari Pandawara Group, kita akan belajar banyak hal tentang bagaimana mengubah limbah jadi sumber peluang yang bermanfaat!</p>
                    <p>Jangan lewatkan kesempatan ini untuk jadi bagian dari gerakan perubahan untuk bumi yang lebih baik! 🌍💚</p>
                ',
            ],
            [
                'title' => 'Webinar Nasional Kepemudaan: Success Before 30',
                'slug' => 'webinar-success-before-30-etc',
                'speaker' => 'Amanda Deswita A. & Ayu Syhnthia',
                'organizer' => 'Entrepreneur Training Center (ETC)',
                'location' => 'Via Zoom Meeting',
                'type' => 'Online',
                'image' => 'seminars/webinar-nasional-kepemudaan.png',
                'date' => '2025-11-30',
                'time' => '18:30',
                'registration_link' => 'https://wa.me/6285959541675',
                'is_active' => true,
                'description' => '2 Jam merubah masa depanmu 2 tahun kedepan. Bekal Gen Z terjun dunia kerja.',
                'benefits' => '<ul>
                    <li>E-Sertifikat</li>
                    <li>Motivasi & Ilmu Baru</li>
                    <li>Relasi Baru & Info Loker</li>
                    <li>Peluang Usaha & Mentor</li>
                </ul>',
                'content' => '
                    <p><strong>WEBINAR NASIONAL KEPEMUDAAN ETC Batch #219</strong></p>
                    <p>Yuuk bongkar jawabannya di Webinar ETC bersama pakarnya. Cocok bagi Mahasiswa, Pelajar, Karyawan, dan Umum.</p>
                    <h3>Speaker:</h3>
                    <ul>
                        <li>Amanda Deswita A., C.MC, C.PS (Public Speaker)</li>
                        <li>Ayu Syhnthia, C.MC, C.PS (Public Speaker)</li>
                    </ul>
                    <p>Yuk segera daftarkan diri kamu karena webinar ini TERBUKA UNTUK PELAJAR & MAHASISWA serta UMUM 🚀 FREE !! Kuota Terbatas.</p>
                ',
            ],
            [
                'title' => 'Webinar Nasional: Kepemimpinan Transformatif di Era Digital',
                'slug' => 'webinar-kepemimpinan-transformatif-2025',
                'speaker' => 'Dr. Saryanto, S.Pd.T., M.Pd',
                'organizer' => 'Samudra Ilmu Indonesia',
                'location' => 'Via Zoom Meeting',
                'type' => 'Online',
                'image' => 'seminars/webinar-nasional-kepemimpinan.png',
                'date' => '2025-11-28',
                'time' => '13:30',
                'registration_link' => 'https://tribelio.page/samudrailmuindonesia',
                'is_active' => true,
                'description' => 'Merumuskan Arah Baru Pendidikan Indonesia di Era Digital.',
                'benefits' => '<ul>
                    <li>Sertifikat Eksklusif 2 JP</li>
                    <li>Video Webinar & Bahan Ajar</li>
                    <li>Hadiah pulsa untuk penanya terbaik</li>
                </ul>',
                'content' => '
                    <p><strong>WEBINAR NASIONAL GRATIS SAMUDRA ILMU INDONESIA</strong></p>
                    <p>Tema: "Kepemimpinan Transformatif: Merumuskan Arah Baru Pendidikan Indonesia di Era Digital"</p>
                    <p>Ayo bergabung bersama peserta dari seluruh Indonesia! Langsung daftar untuk mendapatkan wawasan baru tentang pendidikan di era digital.</p>
                ',
            ],
        ];
        foreach ($seminars as $seminar) {
            Seminar::updateOrCreate(
                ['slug' => $seminar['slug']],
                $seminar
            );
        }

        // Berita
        $beritas = [
            [
                'title' => 'Kegiatan Pelatihan “Pengenalan dan Praktik Membuat Survei dengan LimeSurvey” Fakultas Psikologi YARSI',
                'date' => '2025-11-26',
                'image' => 'news-images/Kegiatan-Pelatihan-Pengenalan-dan-Praktik-Membuat-Survei-dengan-LimeSurvey-Fakultas-Psikologi-YARSI2-1400x788.jpeg',
                'description' => 'Fakultas Psikologi YARSI mengadakan pelatihan LimeSurvey untuk meningkatkan kapasitas penelitian sivitas akademika.',
                'content' => '
                    <p>Sebagai salah satu upaya Fakultas Psikologi dalam meningkatkan kapasitas sivitas akademika dalam melakukan penelitian, <strong>Pusat Psikometri, Penelitian dan Terapan Psikologi Kesehatan (P3TPK) Fakultas Psikologi</strong> mengadakan Pelatihan LimeSurvey.</p>
                    <p>Kegiatan ini diselenggarakan pada Jumat, 21 November 2025, pukul 13.00–15.00 di Ruang 646. Salah seorang staf pengajar Fakultas Psikologi Yarsi, <strong>Dr. Sunu Bagaskara</strong>, didampingi oleh Putri Aisyah, S.Psi (alumni angkatan 2011) menjadi narasumber pada kegiatan ini.</p>
                    <p>Kegiatan ini dihadiri oleh 47 peserta, terdiri dari mahasiswa yang tergabung dalam Kelompok Riset Psikologi (KRisPi), mahasiswa skripsi, dan dosen. Dalam pemaparan materi, narasumber menjelaskan keunggulan LimeSurvey:</p>
                    <ul>
                        <li>LimeSurvey menawarkan lebih dari 30 tipe pertanyaan sehingga memungkinkan peneliti membuat survei dengan format yang lebih bervariasi.</li>
                        <li>Platform ini mendukung anonimitas data, randomisasi pertanyaan, dan kontrol kualitas, menjadikannya sesuai dengan standar penelitian psikologi.</li>
                        <li>Fitur lanjutan seperti branching/conditional logic dan Expression Manager untuk penghitungan skor otomatis.</li>
                        <li>Fleksibilitas lebih tinggi dibandingkan Google Form, terutama dalam hal randomisasi dan keamanan data.</li>
                    </ul>
                    <p>Secara keseluruhan, pelatihan ini memberikan pemahaman yang komprehensif bagi peserta mengenai pentingnya penggunaan platform survei ilmiah dalam penelitian psikologi.</p>
                ',
            ],
            [
                'title' => 'Dosen FK Yarsi Jadi Ketua JDN 2025-2028, JDN Beri Solusi Masalah Dokter Muda',
                'date' => '2025-11-20',
                'image' => 'news-images/Dosen-FK-Yarsi-Jadi-Ketua-JDN-2025-2028-JDN-Beri-Solusi-Masalah-Dokter-Muda-1400x788.jpg',
                'description' => 'Dr. Farah P Kaurow, Sp.FM dilantik menjadi Ketua Junior Doctor Network (JDN) IDI periode 2025-2028.',
                'content' => '
                    <p>"Kami akan selalu meminta arahan, dukungan, motivasi, serta menjadikan para senior sebagai role model. Kami ingin memajukan <strong>Junior Doctor Network (JDN)</strong> bersama dikomandoi Pengurus Besar Ikatan Dokter Indonesia (PB IDI)."</p>
                    <p>Hal tersebut disampaikan oleh <strong>Dr. Farah P Kaurow, Sp.FM</strong> (Dosen FK Yarsi) saat dilantik menjadi Ketua JDN Ikatan Dokter Indonesia tahun 2025-2028 di Kantor PB IDI Jakarta, Jumat 14 Nopember 2025.</p>
                    <p>Dokter Farah mengungkapkan komitmen JDN untuk mendukung dan memberi solusi permasalahan dokter muda. Fokus utama JDN mencakup:</p>
                    <ul>
                        <li>Pendidikan dan pengembangan karir.</li>
                        <li>Advokasi kebijakan kesehatan.</li>
                        <li>Peningkatan kesejahteraan dokter muda.</li>
                    </ul>
                    <p>Banyak dokter muda menghadapi tekanan kerja tinggi dan risiko burnout. JDN berupaya menyediakan kajian dan solusi, termasuk isu literasi keuangan yang menjadi perhatian penting.</p>
                    <p>Wakil Ketua JDN, Dr. Ade Fajri Kurnia menambahkan, JDN menargetkan lahirnya kebijakan kesehatan yang lebih berpihak pada masyarakat dan melindungi dokter dari sanksi berlapis akibat dugaan malpraktik.</p>
                ',
            ],
            [
                'title' => 'M.Biomed Yarsi Kupas DNA Varian Interpretation, Prof Erik dari Amsterdam Jadi Pembicara',
                'date' => '2025-11-19',
                'image' => 'news-images/M.Biomed-Yarsi-Kupas-DNA-Varian-Interpretation-Hadirkan-Prof-Erik-dari-Amsterdam-1400x788.jpg',
                'description' => 'Seminar DNA Variant Interpretation menghadirkan Prof Erik A. Sistermans dari Amsterdam UMC.',
                'content' => '
                    <p>Kolaborasi riset perlu dilakukan dengan tetap memperhatikan kepentingan dua belah pihak agar tidak terjadi eksploitasi. Hal ini disampaikan oleh Head Department of Human Genetics Amsterdam UMC, <strong>Prof Erik A. Sistermans, Ph.D.</strong> saat menjadi pembicara Seminar DNA Variant Interpretation di Universitas Yarsi.</p>
                    <p>Prof Erik mengingatkan agar Indonesia tidak hanya menjadi pengirim sampel, tetapi juga menguasai teknologi genetik, terutama analisa dan interpretasinya.</p>
                    <p>Selain Prof Erik, dosen M.Biomed Yarsi, <strong>Ahmad Rusdan H. Utomo, Ph.D.</strong>, juga memaparkan tiga poin penting:</p>
                    <ol>
                        <li>Pemeriksaan genetik perlu konseling sebelum dan sesudah tes.</li>
                        <li>Interpretasi hasil harus mengikuti guideline internasional agar akurat.</li>
                        <li>Perlu dukungan database genetik nasional untuk memisahkan variasi genetik yang berdampak buruk dan yang tidak.</li>
                    </ol>
                    <p>Acara ini turut dihadiri oleh Rektor Universitas Yarsi, Prof. dr. Fasli Jalal, Ph.D., serta jajaran pengurus Yayasan Yarsi.</p>
                ',
            ],
            [
                'title' => 'Dokter Muda IDI Soroti Isu Malpraktik dan Keadilan',
                'date' => '2025-11-17',
                'image' => 'news-images/doker-muda-idi.jpeg',
                'description' => 'Ketua JDN Indonesia menanggapi isu malpraktik dan perlindungan hukum bagi dokter.',
                'content' => '
                    <p><strong>JAKARTA</strong> — Dugaan malpraktik kembali mencuat dan memicu diskusi soal keadilan hukum bagi dokter. Ketua Junior Doctors Network (JDN) Indonesia IDI, <strong>Dr. Farah P. Karaouw</strong> mengatakan perlunya memahami konteks kasus.</p>
                    <p>"Tidak semua dugaan malpraktik dapat langsung dikaitkan dengan pidana. Struktur pidana menuntut dua unsur pelanggaran yang sangat jelas, yaitu niat jahat (mens rea) dan tindakan (actus reus)," jelas Dr. Farah.</p>
                    <p>Ia menegaskan bahwa setiap dokter bekerja dengan niat baik untuk menyembuhkan pasien. Banyak kasus medis yang kompleks seringkali berawal dari risiko klinis yang terukur, bukan kesengajaan.</p>
                    <p>Wakil Ketua JDN IDI, Dr. Ade Fajri Kurnia, menambahkan kekhawatirannya soal sanksi berlapis. "Kalau sudah dihukum etik, kenapa harus dipidana lagi? Ini memberikan dampak psikologis besar bagi dokter muda," ujarnya.</p>
                    <p>JDN berharap adanya solidaritas profesi dan kebijakan yang lebih adil demi keberlangsungan pelayanan kesehatan masyarakat.</p>
                ',
            ],
            [
                'title' => 'Rektor Yarsi Sampaikan Selamat Bertugas Prof Arif dan Prof Amarulla, BRIN Fokus Riset Pangan dan Inovasi',
                'date' => '2025-11-17',
                'image' => 'news-images/Rektor-Yarsi-Sampaikan-Selamat-Bertugas-Prof-Arif-dan-Prof-Amarulla-BRIN-Fokus-Riset-Pangan-dan-Inovasi.jpg',
                'description' => 'Pelantikan Kepala dan Wakil Kepala BRIN baru mendapat apresiasi dari Rektor Universitas Yarsi.',
                'content' => '
                    <p>Presiden Prabowo Subianto melantik Kepala BRIN, <strong>Prof. Dr. Arif Satria, SP, M.Si.</strong> dan Wakil Kepala BRIN, <strong>Laksamana Madya TNI (Purn) Prof. Dr. Ir Amarulla Octavian</strong> di Istana Negara.</p>
                    <p>Rektor Universitas Yarsi, <strong>Prof. dr. Fasli Jalal, Ph.D.</strong>, menyampaikan selamat bertugas dan menyatakan kesiapan Yarsi untuk kembali bekerjasama dengan BRIN, khususnya dalam riset genomik dan implan tulang yang sebelumnya telah berjalan.</p>
                    <p>Dalam sambutannya, Prof. Arif Satria menegaskan bahwa BRIN akan fokus menggenjot <em>Research and Development (R&D)</em> bidang inovasi pangan dan energi.</p>
                    <p>"Fokusnya perkuat riset pangan dan energi agar lebih efisien, berkelanjutan, dan berdaya saing melalui pemanfaatan nanoteknologi, AI, dan bioteknologi genomik," tutur Prof Arif.</p>
                    <p>BRIN juga berencana membangun satelit-satelit riset di daerah untuk menangkap aspirasi lokal dan memberikan solusi berbasis riset bagi permasalahan daerah.</p>
                ',
            ],
            [
                'title' => 'Shafa Raih Dokter Gigi Predikat Cumlaude, Tebar Langkah-Langkah Sukses',
                'date' => '2025-11-07',
                'image' => 'news-images/Shafa-Raih-Dokter-Gigi-Predikat-Cumlaude-Tebar-Langkah-Langkah-Sukses.jpg',
                'description' => 'Drg. Shafa Adinda Rizki berbagi tips sukses meraih predikat Cumlaude di FKG Yarsi.',
                'content' => '
                    <p>"Alhamdulillah semua perjuangan selama ini akhirnya terbayarkan. Tidur juga lebih nyenyak," ujar <strong>drg. Shafa Adinda Rizki Nurpratama</strong> dengan wajah tersenyum.</p>
                    <p>Shafa merupakan lulusan terbaik Fakultas Kedokteran Gigi Universitas Yarsi (FKG UY) yang meraih nilai IPK tertinggi pada program profesi dokter gigi. Ia membagikan strategi belajarnya:</p>
                    <ul>
                        <li><strong>Fokus di Kelas:</strong> Mendengarkan penjelasan dosen dengan baik sehingga di rumah tinggal mengulang.</li>
                        <li><strong>Manajemen Waktu:</strong> Memprioritaskan tugas akademik sebelum kegiatan non-akademik.</li>
                        <li><strong>Diskusi Dosen:</strong> Aktif bertanya untuk mendapatkan insight pengalaman klinis yang tidak ada di buku.</li>
                        <li><strong>Doa & Tawakkal:</strong> Menjaga spiritualitas agar tenang dalam menghadapi ujian.</li>
                    </ul>
                    <p>"Pekerjaan dokter gigi bukan cuma perbaiki gigi berlubang, tapi juga memberi dampak besar buat rasa percaya diri dan kebahagiaan seseorang," tutup drg. Shafa.</p>
                ',
            ],
            [
                'title' => 'Kampus YARSI Bangun Ekosistem Ekonomi Hijau dan Literasi Lingkungan',
                'date' => '2025-11-07',
                'image' => 'news-images/kampus-yarsi-bangun-ekosistem.jpg',
                'description' => 'Program pengabdian masyarakat YARSI menyulap lahan fasum menjadi Taman Herbal Surgawi Nusantara.',
                'content' => '
                    <p><strong>JAKARTA</strong> — Universitas YARSI menegaskan perannya sebagai kampus hijau melalui program pengabdian masyarakat di Tangerang, Banten. YARSI berhasil menyulap lahan fasilitas umum menjadi <strong>Taman Herbal Surgawi Nusantara</strong>.</p>
                    <p>Kepala Pusat Penelitian Herbal Universitas YARSI, <strong>Dr. Juniarti</strong>, mengatakan program ini menggabungkan pemberdayaan masyarakat, inovasi lingkungan, dan literasi herbal berbasis nilai Islam.</p>
                    <p>"Kami ingin taman ini menjadi laboratorium hidup. Masyarakat bisa belajar, mahasiswa bisa meneliti, dan lingkungan tumbuh sehat," kata Juniarti.</p>
                    <p>Salah satu kegiatan unggulan adalah pelatihan pembuatan <strong>Eco-Enzyme</strong>. Narasumber Sutini Wardi membagikan formula sederhana 1:3:10 (1 bagian gula, 3 bagian sisa buah, 10 bagian air) untuk menghasilkan cairan serbaguna yang bernilai ekonomi.</p>
                    <p>Selain itu, diadakan juga pelatihan digital marketing oleh Muhammad Ghazali untuk membantu warga memasarkan produk hasil olahan herbal dan eco-enzyme mereka ke pasar yang lebih luas.</p>
                ',
            ],
        ];

        foreach ($beritas as $berita) {
            Berita::updateOrCreate(
                ['slug' => Str::slug($berita['title'])],
                [
                    'title' => $berita['title'],
                    'slug' => Str::slug($berita['title']),
                    'description' => $berita['description'],
                    'content' => $berita['content'],
                    'image' => $berita['image'],
                    'published_date' => $berita['date'],
                    'is_active' => true,
                    'views' => rand(100, 1500),
                ]
            );
        }

        $tipsDanTriks = [
            [
                'title' => 'Cara Membuat CV ATS-Friendly yang Dilirik HRD',
                'category' => 'Persiapan Karir',
                'summary' => 'Pelajari rahasia agar CV Anda lolos sistem pelacak pelamar (ATS) dan menarik perhatian rekruter dalam 6 detik pertama.',
                'content' => '
            <p>Banyak lulusan baru merasa frustrasi karena lamaran mereka tidak pernah mendapat balasan. Seringkali, masalahnya bukan pada kualifikasi, melainkan format CV yang tidak terbaca oleh sistem ATS (Applicant Tracking System).</p>
            
            <h3>1. Gunakan Kata Kunci yang Relevan</h3>
            <p>Baca deskripsi pekerjaan dengan teliti. Jika mereka mencari "Project Management" dan "Communication Skills", pastikan kata-kata tersebut muncul di CV Anda agar terdeteksi oleh sistem.</p>

            <h3>2. Hindari Desain Berlebihan</h3>
            <p>Grafik, tabel, dan kolom ganda yang rumit seringkali membingungkan sistem ATS. Gunakan format yang bersih, font standar (seperti Arial atau Calibri), dan struktur yang jelas.</p>

            <h3>3. Fokus pada Pencapaian, Bukan Hanya Tugas</h3>
            <p>Jangan hanya menulis "Bertanggung jawab atas media sosial". Tulislah "Meningkatkan engagement Instagram sebesar 20% dalam 3 bulan melalui strategi konten baru". Angka lebih menarik daripada sekadar deskripsi tugas.</p>

            <p><strong>Kesimpulan:</strong> CV yang baik adalah jembatan pertama Anda menuju wawancara. Buatlah sesederhana mungkin namun padat informasi.</p>
        ',
                'reading_time' => 5,
                'thumbnail' => 'tips-thumbnails/Cover-tips-pilih-pekerjaan-pertama.jpg',
                'is_active' => true,
                'published_at' => Carbon::now()->subDays(5),
            ],
            [
                'title' => 'Menguasai Teknik Wawancara STAR untuk Menjawab Pertanyaan Sulit',
                'category' => 'Wawancara Kerja',
                'summary' => 'Jangan bingung saat ditanya pengalaman masa lalu. Gunakan metode STAR (Situation, Task, Action, Result) untuk jawaban yang terstruktur dan meyakinkan.',
                'content' => '
            <p>Pewawancara sering mengajukan pertanyaan perilaku seperti, "Ceritakan saat Anda menghadapi konflik dalam tim." Metode STAR adalah cara terbaik untuk menjawabnya dengan terstruktur.</p>
            
            <ul>
                <li><strong>S (Situation):</strong> Jelaskan konteks atau latar belakang situasinya secara singkat.</li>
                <li><strong>T (Task):</strong> Apa tugas atau tantangan spesifik yang Anda hadapi saat itu?</li>
                <li><strong>A (Action):</strong> Ini bagian terpenting. Jelaskan tindakan spesifik yang <em>Anda</em> ambil untuk mengatasi situasi tersebut. Fokus pada kontribusi Anda, gunakan kata "Saya", bukan "Kami".</li>
                <li><strong>R (Result):</strong> Apa hasil dari tindakan Anda? Sebisa mungkin gunakan data kuantitatif (misal: "Proyek selesai 2 hari lebih cepat").</li>
            </ul>

            <p>Dengan metode STAR, jawaban Anda akan terdengar seperti sebuah cerita yang meyakinkan, bukan sekadar klaim kosong.</p>
        ',
                'reading_time' => 7,
                'thumbnail' => 'tips-thumbnails/teknik-wawancara-star.jpeg',
                'is_active' => true,
                'published_at' => Carbon::now()->subDays(3),
            ],
            [
                'title' => '5 Kesalahan Fatal di Profil LinkedIn yang Membuat Rekruter Kabur',
                'category' => 'Personal Branding',
                'summary' => 'LinkedIn adalah kartu nama digital Anda. Hindari kesalahan umum ini agar profil Anda terlihat profesional dan menarik tawaran kerja.',
                'content' => '
            <p>LinkedIn bukan sekadar media sosial, melainkan alat profesional yang kuat. Namun, banyak yang menggunakannya dengan cara yang salah.</p>

            <h3>1. Foto Profil Tidak Profesional (atau Kosong)</h3>
            <p>Ini adalah kesan pertama. Jangan gunakan foto selfie di kamar mandi, foto liburan, atau membiarkannya kosong. Gunakan foto headshot yang jelas dengan pakaian profesional.</p>

            <h3>2. Headline yang Membosankan</h3>
            <p>Jangan hanya menulis "Student at Universitas X". Gunakan headline untuk menjelaskan nilai Anda, contoh: "Aspiring Data Analyst | Skilled in Python & SQL | Membantu bisnis mengambil keputusan berbasis data".</p>

            <h3>3. Bagian "About" yang Kosong</h3>
            <p>Ini adalah tempat Anda bercerita. Ceritakan siapa Anda, apa passion Anda, dan apa yang ingin Anda capai dalam karir Anda secara ringkas.</p>

            <p>Perbaiki tiga hal ini, dan profil Anda akan langsung terlihat lebih kredibel di mata rekruter.</p>
        ',
                'reading_time' => 6,
                'thumbnail' => 'tips-thumbnails/optimalisasi-linkedin.jpeg',
                'is_active' => true,
                'published_at' => Carbon::now()->subDays(2),
            ],
            [
                'title' => 'Hard Skill vs Soft Skill: Mana yang Lebih Penting?',
                'category' => 'Pengembangan Diri',
                'summary' => 'Kemampuan teknis (hard skill) membuka pintu, tetapi kemampuan komunikasi dan adaptasi (soft skill) menentukan seberapa jauh Anda melangkah.',
                'content' => '
            <p>Di dunia kerja modern, perdebatan ini sering muncul. Jawabannya? Keduanya sama pentingnya, namun memiliki peran berbeda.</p>
            <p><strong>Hard Skills</strong> adalah kemampuan teknis yang bisa diukur. Contoh: Coding (Python, PHP), Desain Grafis (Photoshop), Akuntansi, atau kemampuan bahasa asing. Ini adalah syarat dasar untuk mendapatkan pekerjaan.</p>
            <p><strong>Soft Skills</strong> adalah atribut pribadi yang memengaruhi cara Anda bekerja dan berinteraksi dengan orang lain. Contoh: Komunikasi, kepemimpinan, manajemen waktu, dan kemampuan beradaptasi. Ini adalah faktor yang menentukan promosi dan kesuksesan jangka panjang.</p>
            <p>Seorang programmer yang jago coding tapi tidak bisa berkomunikasi dengan timnya akan sulit berkembang menjadi pemimpin proyek. Seimbangkan keduanya untuk karir yang cemerlang.</p>
        ',
                'reading_time' => 4,
                'thumbnail' => 'tips-thumbnails/hard-vs-soft-skills.jpeg',
                'is_active' => true,
                'published_at' => Carbon::now()->subDay(),
            ],
            [
                'title' => 'Seni Networking untuk Introvert: Membangun Relasi Tanpa Canggung',
                'category' => 'Networking',
                'summary' => 'Networking tidak harus tentang acara besar yang ramai. Pelajari cara membangun koneksi yang bermakna dengan cara yang nyaman bagi kepribadian introvert.',
                'content' => '
            <p>Bagi seorang introvert, kata "networking" seringkali terdengar menakutkan. Bayangan tentang ruangan penuh orang asing yang harus diajak bicara bisa membuat energi terkuras. Tapi networking tidak harus seperti itu.</p>

            <h3>1. Fokus pada Kualitas, Bukan Kuantitas</h3>
            <p>Daripada mencoba berbicara dengan 50 orang di sebuah seminar, fokuslah untuk membangun 1-2 percakapan yang mendalam dan bermakna. Introvert cenderung ahli dalam mendengarkan dan membangun koneksi satu lawan satu.</p>

            <h3>2. Manfaatkan Media Online</h3>
            <p>LinkedIn adalah sahabat terbaik introvert. Anda bisa membangun relasi melalui komentar yang bijak, mengirim pesan pribadi yang sopan, atau berbagi artikel menarik tanpa tekanan interaksi tatap muka langsung.</p>

            <h3>3. Siapkan Topik Pembicaraan</h3>
            <p>Sebelum menghadiri acara, siapkan beberapa pertanyaan terbuka (open-ended questions) untuk memecah keheningan, seperti "Proyek menarik apa yang sedang Anda kerjakan saat ini?"</p>
        ',
                'reading_time' => 5,
                'thumbnail' => 'tips-thumbnails/networking-introvert.jpg',
                'is_active' => true,
                'published_at' => Carbon::now(),
            ],
        ];

        foreach ($tipsDanTriks as $data) {
            // Slug terisi otomatis jika belum ada
            if (!isset($data['slug'])) {
                $data['slug'] = Str::slug($data['title']);
            }

            TipsDanTrik::create($data);
        }

        // Peluang Karir - Lowongan Magang
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