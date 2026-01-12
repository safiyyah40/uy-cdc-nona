<?php

namespace Database\Seeders\Program;

use App\Models\Berita;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class BeritaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Berita::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
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
                'title' => 'Ibu Ika Jadi Pembicara Kuliah Umum FEB Yarsi, Mau Sukses Kerja Jangan Jadi Mahasiswa Kupu-Kupu',
                'date' => '2026-01-07',
                'image' => 'news-images/Ibu-Ika-Kuliah-Umum-FEB-Yarsi-1400x788.png',
                'description' => 'HRD Head PT. Akebono Brake Astra Indonesia, Ika Tri Widyastuti, memberikan tips sukses dunia kerja kepada mahasiswa FEB Yarsi, menekankan pentingnya attitude dan pengalaman organisasi.',
                'content' => '
                    <p>"Apapun pendidikannya, jika mau sukses masuk dunia kerja utamakan <strong>attitude</strong>. Karena dari situ banyak manfaatnya, seperti meningkatkan kesempatan karir, kepercayaan diri, dan meningkatkan kualitas hidup seseorang."</p>
                    
                    <p>Hal tersebut disampaikan oleh <strong>Ika Tri Widyastuti</strong> (HRD Head PT. Akebono Brake Astra Indonesia) saat menjadi pembicara tamu dalam Kuliah Umum Pengembangan MSDM Fakultas Ekonomi dan Bisnis (FEB) Universitas Yarsi.</p>
                    
                    <p>Dalam paparannya, Ibu Ika menegaskan agar mahasiswa tidak menjadi "mahasiswa kupu-kupu" (kuliah pulang - kuliah pulang). Mahasiswa harus berani membuka diri, melawan rasa malu, dan mengambil setiap peluang yang ada. Beliau memberikan beberapa tips jitu untuk menghadapi persaingan dunia kerja yang tinggi:</p>
                    
                    <ul>
                        <li><strong>Isi kekurangan dengan kelebihan lain:</strong> Jika IPK biasa saja, mahasiswa harus memiliki nilai tambah seperti prestasi seni, olahraga, atau kemampuan <em>public speaking</em> (MC).</li>
                        <li><strong>Penguasaan Bahasa Asing:</strong> Selain Inggris, mahasiswa disarankan menambah kemampuan bahasa lain seperti Mandarin, Jerman, Arab, atau Korea.</li>
                        <li><strong>Cari Pengalaman:</strong> Aktif dalam organisasi atau kerja paruh waktu agar merasakan dinamika dunia kerja.</li>
                    </ul>

                    <p>Terkait kondisi industri, Ibu Ika juga menyoroti pentingnya lulusan perguruan tinggi untuk tidak hanya siap sebagai pekerja, tetapi juga siap terjun ke industri kreatif dan wirausaha.</p>

                    <p>Kepala Program Studi Manajemen FEB Yarsi, <strong>Alyta Shabrina Zusrin, SP., M.Sc</strong>, turut mengapresiasi materi yang disampaikan. "Ibu Ika sebagai dosen praktisi sudah keren sekali dalam memberikan pemahaman terkait pengembangan HR. Semoga mahasiswa dapat belajar dan terinspirasi siap terjun di dunia kerja khususnya perusahaan global," tutupnya.</p>
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
    }
}
