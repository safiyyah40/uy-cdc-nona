<?php

namespace Database\Seeders\Program;

use App\Models\Seminar;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SeminarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Seminar::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
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
            [
                'title' => 'Sesi Sharing Alumni Psikologi YARSI: Psikologi dan Karier Militer',
                'slug' => 'sharing-alumni-psikologi-karier-militer',
                'speaker' => 'Letda Laut (KH) M. Reyhan Nursid, S.Psi. (Perwira TNI AL)',
                'organizer' => 'Fakultas Psikologi Universitas YARSI',
                'location' => 'Via Zoom Meeting',
                'type' => 'Online',
                'image' => 'seminars/sharing-alumni-psikologi-militer.png',
                'date' => '2025-11-22',
                'time' => '10:00',
                'registration_link' => 'https://bit.ly/SharingAlumniPsiYARSI',
                'is_active' => true,
                'description' => 'Ingin tahu bagaimana lulusan Psikologi berkarier di dunia militer? Temukan jawabannya langsung dari alumni sukses YARSI.',
                'benefits' => '<ul>
                    <li>Wawasan peran Psikologi di dunia militer</li>
                    <li>Tips proses seleksi & jenjang karier TNI</li>
                    <li>Networking dengan Alumni</li>
                    <li>E-Sertifikat</li>
                </ul>',
                'content' => '
                    <p><strong>Panggilan untuk Mahasiswa & Alumni Psikologi YARSI! 📢</strong></p>
                    <p>Bingung lulusan Psikologi bisa kerja apa selain jadi HRD? Ternyata peluang di sektor pertahanan dan keamanan sangat terbuka lebar!</p>
                    
                    <p>Fakultas Psikologi Universitas YARSI kembali menghadirkan <strong>Sesi Sharing Alumni</strong> dengan tema spesial: <em>"Psikologi dan Karier Militer"</em>.</p>

                    <br><h3>Narasumber Inspiratif</h3>
                    <p><strong>Letda Laut (KH) Muhammad Reyhan Nursid, S.Psi.</strong><br>
                    (Alumni Fakultas Psikologi YARSI Angkatan 2019 & Perwira TNI Angkatan Laut)</p>

                    <br><h3>Materi Pembahasan:</h3>
                    <ul>
                        <li>Peran ilmu psikologi dalam strategi militer.</li>
                        <li>Pengalaman personal menempuh pendidikan perwira.</li>
                        <li>Proses seleksi masuk TNI untuk sarjana Psikologi.</li>
                    </ul>

                    <br><p>Jangan lewatkan kesempatan ini untuk memperluas wawasan karier dan memotivasi diri. Acara ini <strong>GRATIS</strong> dan terbuka untuk seluruh sivitas akademika YARSI.</p>
                ',
            ],
            [
                'title' => 'Workshop Penulisan Ilmiah Populer Bersama BRIN & DPR RI',
                'slug' => 'workshop-penulisan-ilmiah-populer-yarsi-2025',
                'speaker' => 'Muhammad Fadly Suhendra (BRIN) & Dr. Kholis Ernawati (YARSI)',
                'organizer' => 'Universitas YARSI, BRIN & Komisi X DPR RI',
                'location' => 'Ruang Seminar Rektorat Lt. 1, Universitas YARSI',
                'type' => 'Offline',
                'image' => 'seminars/workshop-penulisan-ilmiah-populer.png',
                'date' => '2025-07-29',
                'time' => '09:00',
                'registration_link' => 'https://bit.ly/WorkshopIlmiahPopulerYARSI',
                'is_active' => true,
                'description' => 'Tingkatkan skill menulismu! Pelajari teknik mengubah karya ilmiah kaku menjadi tulisan populer yang komunikatif, kredibel, dan menarik bagi masyarakat luas.',
                'benefits' => '<ul>
                    <li>Teknik Menulis Ilmiah Populer</li>
                    <li>Strategi Diseminasi Ilmu Pengetahuan</li>
                    <li>Wawasan langsung dari Praktisi BRIN</li>
                    <li>Sertifikat Kehadiran</li>
                </ul>',
                'content' => '
                    <p><strong>Ingin tulisan ilmiahmu dibaca dan dipahami lebih banyak orang?</strong></p>
                    <p>Universitas YARSI bekerjasama dengan <strong>Badan Riset dan Inovasi Nasional (BRIN)</strong> dan <strong>DPR RI</strong> mempersembahkan kegiatan edukatif: <em>"Penulisan Ilmiah Populer"</em>.</p>

                    <p>Acara ini bertujuan meningkatkan kapasitas akademisi dan mahasiswa dalam menghasilkan karya tulis yang tidak hanya akurat datanya, tetapi juga komunikatif dan enak dibaca oleh masyarakat awam.</p>

                    <br><h3>Narasumber Ahli:</h3>
                    <ul>
                        <li><strong>Muhammad Fadly Suhendra</strong> (Pranata Humas Ahli Muda BRIN) - <em>Teknik menulis populer tanpa mengurangi akurasi data.</em></li>
                        <li><strong>Dr. Kholis Ernawati, S.Si., M.Kes.</strong> (Associate Professor Universitas YARSI) - <em>Urgensi keterampilan menulis bagi diseminasi ilmu pengetahuan.</em></li>
                    </ul>

                    <br><h3>Didukung Oleh:</h3>
                    <p>Kegiatan ini mendapat perhatian khusus dan dihadiri oleh <strong>Hj. Himmatul Aliyah, S.Sos., M.Si.</strong> (Wakil Ketua Komisi X DPR RI) dan <strong>Dr. dr. Wening Sari, M.Kes.</strong> (Wakil Rektor I Universitas YARSI).</p>

                    <br><p>Mari berkontribusi dalam penguatan literasi sains di Indonesia melalui tulisan yang berkualitas!</p>
                ',
            ],
            [
                'title' => 'Webinar Nasional: Show Your Professionalism With ACPA Indonesia',
                'slug' => 'webinar-nasional-acpa-yarsi-2021',
                'speaker' => 'Tim Institut Akuntan Publik Indonesia (IAPI)',
                'organizer' => 'HMJA Universitas YARSI & IAPI',
                'location' => 'Zoom Meeting & YouTube Live',
                'type' => 'Online',
                'image' => 'seminars/webinar-acpa-iapi.png',
                'date' => '2021-03-16',
                'time' => '09:00',
                'registration_link' => 'https://bit.ly/WebinarACPAYARSI',
                'is_active' => true,
                'description' => 'Pentingnya sertifikasi kompetensi ACPA bagi mahasiswa akuntansi untuk menunjang profesionalisme dan daya saing di dunia kerja global.',
                'benefits' => '<ul>
                    <li>Wawasan Sertifikasi ACPA & CPA</li>
                    <li>Tips Karir Akuntan Publik</li>
                    <li>Strategi Lulus Ujian Kompetensi</li>
                    <li>E-Sertifikat</li>
                </ul>',
                            'content' => '
                    <p><strong>Ingin menjadi Akuntan Publik yang profesional dan diakui secara global?</strong></p>
                    <p>Himpunan Mahasiswa Jurusan Akuntansi (HMJA) YARSI bekerjasama dengan <strong>Institut Akuntan Publik Indonesia (IAPI)</strong> menyelenggarakan Webinar Nasional bertajuk <em>"Show Your Professionalism With Associate Certified Public Accountant of Indonesia (ACPA)"</em>.</p>

                    <p>Acara ini bertujuan mendorong mahasiswa akuntansi untuk memiliki sertifikasi kompetensi sebagai bekal terjun ke dunia kerja yang dinamis.</p>

                    <br><h3>Narasumber Ekspertis:</h3>
                    <ul>
                        <li><strong>Rudy Prasetyo</strong> (Kepala Divisi IAPI Bidang Organisasi) - <em>Regulasi Profesi Akuntan Publik.</em></li>
                        <li><strong>Primasary Iskandar, MBA, CPA</strong> (Head of IAPI Certifications) - <em>Kekuatan & Peluang Sertifikasi Kompetensi.</em></li>
                        <li><strong>Deddy Adi Saputra</strong> (Marketing Manager IAPI) - <em>5 Alasan Bangga Punya Gelar CPA.</em></li>
                        <li><strong>Aziszah Fahmia R., SE., Akt., ACPA</strong> (Alumni/Praktisi) - <em>Sharing Session Lulusan ACPA.</em></li>
                    </ul>

                    <br><h3>Kenapa Harus Punya Sertifikasi?</h3>
                    <p>Menurut IAPI, memiliki sertifikasi seperti CPA memberikan 5 keuntungan utama: <em>Prestige</em> (Pengakuan tertinggi), <em>Career Development</em> (Sinyeal profesionalisme), <em>Career Security</em> (Selalu dibutuhkan), <em>Job Satisfaction</em>, dan <em>Money & Benefits</em>.</p>

                    <br><p>Mari tingkatkan kualitas diri dan siapkan karir gemilang di bidang akuntansi!</p>
                ',
            ],
        ];
        foreach ($seminars as $seminar) {
            Seminar::updateOrCreate(
                ['slug' => $seminar['slug']],
                $seminar
            );
        }
    }
}
