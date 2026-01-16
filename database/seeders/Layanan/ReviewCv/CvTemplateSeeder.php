<?php

namespace Database\Seeders\Layanan\ReviewCv;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\CvTemplate;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class CvTemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        CvTemplate::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $adminId = User::first()->id ?? 1;

        $templates = [
            [
                'judul_template' => 'Minimalist ATS Friendly Gray',
                'deskripsi' => 'Desain bersih dan sederhana yang mudah dibaca oleh sistem ATS (Applicant Tracking System). Sangat cocok untuk melamar ke perusahaan korporat besar.',
                'kategori' => 'ats-friendly',
                'sumber' => 'canva',
                'url_template' => 'https://www.canva.com/resumes/templates/',
                'url_preview' => 'https://marketplace.canva.com/EAFRuCp3DcY/1/0/1131w/canva-black-white-minimalist-cv-resume-f5JNR-K5jjw.jpg',
                'tags' => ['Clean', 'Simple', 'Corporate', 'Admin'],
                'jenis_pekerjaan' => 'Administrasi, Akuntansi, Umum',
                'tingkat_pengalaman' => 'Fresh Graduate',
                'is_active' => true,
                'is_unggulan' => true,
                'urutan' => 1,
                'jumlah_view' => 1250,
                'jumlah_klik' => 450,
                'jumlah_download' => 0,
            ],
            [
                'judul_template' => 'Creative UI/UX Designer Portfolio',
                'deskripsi' => 'Tampilan modern dengan sentuhan warna cerah untuk menonjolkan sisi kreativitas Anda. Cocok untuk industri kreatif dan media.',
                'kategori' => 'kreatif',
                'sumber' => 'canva',
                'url_template' => 'https://www.canva.com/resumes/templates/',
                'url_preview' => 'https://marketplace.canva.com/EAFRuCp3DcY/1/0/1131w/canva-black-white-minimalist-cv-resume-f5JNR-K5jjw.jpg',
                'tags' => ['Colorful', 'Modern', 'Portfolio', 'Design'],
                'jenis_pekerjaan' => 'Desainer Grafis, Marketing, Media Sosial',
                'tingkat_pengalaman' => 'Mid Level',
                'is_active' => true,
                'is_unggulan' => true,
                'urutan' => 2,
                'jumlah_view' => 980,
                'jumlah_klik' => 320,
                'jumlah_download' => 0,
            ],
            [
                'judul_template' => 'Professional Executive Blue',
                'deskripsi' => 'Format standar profesional dengan layout dua kolom yang rapi. Memberikan kesan berwibawa dan berpengalaman.',
                'kategori' => 'profesional',
                'sumber' => 'slides_go',
                'url_template' => 'https://docs.google.com/presentation/u/0/?tgif=c&ftv=1',
                'url_preview' => 'https://marketplace.canva.com/EAFRuCp3DcY/1/0/1131w/canva-black-white-minimalist-cv-resume-f5JNR-K5jjw.jpg',
                'tags' => ['Professional', 'Blue', 'Management'],
                'jenis_pekerjaan' => 'Manajemen, HRD, Supervisor',
                'tingkat_pengalaman' => 'Senior',
                'is_active' => true,
                'is_unggulan' => false,
                'urutan' => 3,
                'jumlah_view' => 750,
                'jumlah_klik' => 150,
                'jumlah_download' => 0,
            ],
            [
                'judul_template' => 'Modern Tech Developer',
                'deskripsi' => 'Template yang fokus pada skill teknis dan proyek. Layout dirancang untuk memudahkan recruiter melihat keahlian coding Anda.',
                'kategori' => 'modern',
                'sumber' => 'manual',
                'file_path' => 'cv-templates\files\Modern Tech Developer.docx',
                'url_preview' => 'https://www.coolfreecv.com/images/modern_resume_template_word_free.jpg',
                'tags' => ['Tech', 'Coding', 'Developer', 'IT'],
                'jenis_pekerjaan' => 'Programmer, IT Support, Data Analyst',
                'tingkat_pengalaman' => 'Fresh Graduate',
                'is_active' => true,
                'is_unggulan' => false,
                'urutan' => 4,
                'jumlah_view' => 2100,
                'jumlah_klik' => 890,
                'jumlah_download' => 120,
            ],
            [
                'judul_template' => 'Classic Academic Resume',
                'deskripsi' => 'Format klasik hitam putih yang sangat formal. Cocok untuk keperluan akademis, dosen, atau beasiswa.',
                'kategori' => 'klasik',
                'sumber' => 'slides_go',
                'url_template' => 'https://docs.google.com/presentation/u/0/',
                'url_preview' => 'https://marketplace.canva.com/EAFRuCp3DcY/1/0/1131w/canva-black-white-minimalist-cv-resume-f5JNR-K5jjw.jpg',
                'tags' => ['Academic', 'Formal', 'Scholarship'],
                'jenis_pekerjaan' => 'Pendidikan, Peneliti, Hukum',
                'tingkat_pengalaman' => 'All Levels',
                'is_active' => true,
                'is_unggulan' => false,
                'urutan' => 5,
                'jumlah_view' => 400,
                'jumlah_klik' => 80,
                'jumlah_download' => 0,
            ],
            [
                'judul_template' => 'Minimalist Elegant Peach',
                'deskripsi' => 'Sentuhan warna peach yang lembut namun tetap profesional. Cocok untuk bidang hospitality atau public relations.',
                'kategori' => 'minimalis',
                'sumber' => 'canva',
                'url_template' => 'https://www.canva.com/',
                'url_preview' => 'https://marketplace.canva.com/EAFRuCp3DcY/1/0/1131w/canva-black-white-minimalist-cv-resume-f5JNR-K5jjw.jpg',
                'tags' => ['Elegant', 'Soft', 'PR'],
                'jenis_pekerjaan' => 'PR, Hotel, Customer Service',
                'tingkat_pengalaman' => 'Entry Level',
                'is_active' => true,
                'is_unggulan' => false,
                'urutan' => 6,
                'jumlah_view' => 600,
                'jumlah_klik' => 200,
                'jumlah_download' => 0,
            ],
        ];

        foreach ($templates as $template) {
            CvTemplate::create(array_merge($template, [
                'dibuat_oleh' => $adminId,
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
