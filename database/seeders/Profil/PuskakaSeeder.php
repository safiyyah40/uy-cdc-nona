<?php

namespace Database\Seeders\Profil;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\PuskakaGallery;
use App\Models\PuskakaTeam;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class PuskakaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        PuskakaGallery::truncate();
        PuskakaTeam::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        // Dokumentasi Kegiatan Puskaka
        $puskakaGalleries = [
            [
                'title' => 'Tim Puskaka',
                'image_path' => 'puskaka-gallery/puskaka.jpg',
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
    }
}
