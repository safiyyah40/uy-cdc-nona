<?php

namespace Database\Seeders;

use App\Models\BerandaSlide;
use App\Models\PuskakaGallery;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // User
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Beranda Slide (Pakai create loop biar rapi & timestamp terisi)
        $slides = [
            [
                'image_path' => 'images/slideshow beranda/slideshow 1.jpeg',
                'alt_text' => 'Slideshow 1',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'image_path' => 'images/slideshow beranda/slideshow 2.jpeg',
                'alt_text' => 'Slideshow 2',
                'sort_order' => 2,
                'is_active' => true,
            ],
        ];

        foreach ($slides as $slide) {
            BerandaSlide::create($slide);
        }

        // Puskaka Gallery
        PuskakaGallery::create([
            'title' => 'Tim Puskaka',
            // Pastikan path ini sesuai dengan lokasi file di folder PUBLIC
            'image_path' => 'images/PuskakaGallery/puskaka.jpg', 
            'is_active' => true,
        ]);
    }
}