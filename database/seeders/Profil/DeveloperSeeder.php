<?php

namespace Database\Seeders\Profil;

use Illuminate\Database\Seeder;
use App\Models\Developer;
use App\Models\DeveloperDoc;
use Illuminate\Support\Facades\DB;

class DeveloperSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Developer::truncate();
        DeveloperDoc::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Data Dokumentasi Developer
        $docs = [
            [
                'title' => 'Wawancara dengan Klien',
                'image' => "developer-docs/wawancara-dengan-klien.jpeg",
            ],
            [
                'title' => 'Persetujuan Kontrak Klien',
                'image' => "developer-docs/persetujuan-kontrak-klien.jpeg",
            ],
            [
                'title' => 'Persetujuan Kontrak Kepala Prodi Teknik Informatika',
                'image' => "developer-docs/persetujuan-kontrak-kaprodi-TI.jpeg ",
            ],
            [
                'title' => 'Bimbingan Project',
                'image' => "developer-docs/bimbingan-projek.jpeg",
            ],
            [
                'title' => 'Daily Scrum',
                'image' => "developer-docs/daily-scrum.jpeg",
            ],
            [
                'title' => 'Daily Scrum',
                'image' => "developer-docs/daily-scrum-2.jpeg",
            ],
            [
                'title' => 'Sprint Review dengan Klien',
                'image' => "developer-docs/sprint-review-dengan-klien-1.jpeg",
            ],
            [
                'title' => 'Sprint Review dengan Klien',
                'image' => "developer-docs/sprint-review-dengan-klien-2.jpeg",
            ],
            [
                'title' => 'Sprint Review dan Sprint Planning dengan Coach',
                'image' => "developer-docs/sprint-review-dan-sprint-planning-dengan-coach.jpeg",
            ],
        ];

        foreach ($docs as $doc) {
            DeveloperDoc::create($doc);
        }

        // Data Profil Developer (Tim NONA)
        $developers = [
            [
                'name' => 'Citra Fatika',
                'npm' => '1402023014',
                'title' => 'Frontend Developer',
                'email' => 'citrafatika1802@gmail.com',
                'github_url' => 'https://github.com/Citraaaft',
                'instagram_url' => 'https://instagram.com/citraaaft',
                'photo' => 'developers/citra.jpg',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Safiyyah Yahya',
                'npm' => '1402023065',
                'title' => 'Backend Developer',
                'email' => 'safiyyahyahya163@gmail.com',
                'github_url' => 'https://github.com/safiyyah40',
                'instagram_url' => 'https://instagram.com/sfyrl.yay',
                'photo' => 'developers/safiyyah.jpg',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Felicia Advi Syabani',
                'npm' => '1402023027',
                'title' => 'UI/UX Designer',
                'email' => 'feliciasurya123@gmail.com',
                'github_url' => 'https://github.com/feliciasybn',
                'instagram_url' => 'https://instagram.com/feliciasybn',
                'photo' => 'developers/felicia.jpg',
                'sort_order' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($developers as $dev) {
            Developer::create($dev);
        }
    }
}
