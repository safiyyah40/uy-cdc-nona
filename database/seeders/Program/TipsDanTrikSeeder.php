<?php

namespace Database\Seeders\Program;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\TipsDanTrik;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class TipsDanTrikSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        TipsDanTrik::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
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
    }
}
