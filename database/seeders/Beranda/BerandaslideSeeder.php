<?php

namespace Database\Seeders\Beranda;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\BerandaSlide;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class BerandaslideSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        BerandaSlide::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
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
    }
}
