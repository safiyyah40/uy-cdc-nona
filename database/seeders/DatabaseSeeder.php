<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            Beranda\BerandaSlideSeeder::class,
            Profil\UserSeeder::class,
            Profil\PuskakaSeeder::class,
            Profil\DeveloperSeeder::class,
            Program\OrientasiDuniaKerjaSeeder::class,
            Program\CampusHiringSeeder::class,
            Program\SeminarSeeder::class,
            Program\TipsDanTrikSeeder::class,
            Program\BeritaSeeder::class,
            PeluangKarir\MagangSeeder::class,
            PeluangKarir\LokerSeeder::class,
            PeluangKarir\SertifikasiSeeder::class,
            Layanan\ReviewCv\CvTemplateSeeder::class,
            Layanan\TesMinatDanBakat\RiasecCategorySeeder::class,
            Layanan\TesMinatDanBakat\RiasecQuestionSeeder::class,
        ]);
    }
}