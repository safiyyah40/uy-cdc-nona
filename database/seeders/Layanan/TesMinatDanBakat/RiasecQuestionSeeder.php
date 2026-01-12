<?php

namespace Database\Seeders\Layanan\TesMinatDanBakat;

use App\Models\RiasecCategory;
use App\Models\RiasecQuestion;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class RiasecQuestionSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        RiasecQuestion::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        $questions = [
            // Realistic (R)
            ['code' => 'R', 'text' => 'Saya suka merakit atau memperbaiki alat elektronik/mesin.', 'order' => 1],
            ['code' => 'R', 'text' => 'Saya lebih suka bekerja di luar ruangan (lapangan) daripada di balik meja.', 'order' => 2],
            ['code' => 'R', 'text' => 'Saya menyukai pelajaran yang praktis seperti teknik atau kerajinan tangan.', 'order' => 3],
            ['code' => 'R', 'text' => 'Saya tidak keberatan tangan saya kotor saat bekerja (misal: oli, tanah).', 'order' => 4],
            ['code' => 'R', 'text' => 'Saya bisa menggunakan berbagai macam perkakas (obeng, gergaji, dll).', 'order' => 5],
            
            // Investigative (I)
            ['code' => 'I', 'text' => 'Saya suka memecahkan teka-teki atau masalah matematika yang rumit.', 'order' => 6],
            ['code' => 'I', 'text' => 'Saya sering bertanya \'mengapa\' dan mencari tahu alasan di balik suatu kejadian.', 'order' => 7],
            ['code' => 'I', 'text' => 'Saya suka membaca buku sains, jurnal, atau artikel ilmiah.', 'order' => 8],
            ['code' => 'I', 'text' => 'Saya lebih suka bekerja sendiri untuk menganalisis data.', 'order' => 9],
            ['code' => 'I', 'text' => 'Saya teliti dalam mengamati detail yang sering dilewatkan orang lain.', 'order' => 10],
            
            // Artistic (A)
            ['code' => 'A', 'text' => 'Saya memiliki imajinasi yang tinggi dan suka berkhayal.', 'order' => 11],
            ['code' => 'A', 'text' => 'Saya suka mengekspresikan diri melalui seni (musik, lukis, tulisan).', 'order' => 12],
            ['code' => 'A', 'text' => 'Saya tidak suka aturan yang kaku dan mengekang kebebasan.', 'order' => 13],
            ['code' => 'A', 'text' => 'Saya suka mendesain sesuatu agar terlihat indah dan estetis.', 'order' => 14],
            ['code' => 'A', 'text' => 'Saya sering memiliki ide-ide yang dianggap unik atau \'nyeleneh\'.', 'order' => 15],
            
            // Social (S)
            ['code' => 'S', 'text' => 'Saya suka mengajar atau melatih orang lain.', 'order' => 16],
            ['code' => 'S', 'text' => 'Saya mudah berempati dan merasakan apa yang dirasakan orang lain.', 'order' => 17],
            ['code' => 'S', 'text' => 'Saya suka bekerja dalam tim dan berdiskusi.', 'order' => 18],
            ['code' => 'S', 'text' => 'Saya senang melakukan kegiatan sosial atau menjadi sukarelawan.', 'order' => 19],
            ['code' => 'S', 'text' => 'Orang sering curhat kepada saya tentang masalah mereka.', 'order' => 20],
            
            // Enterprising (E)
            ['code' => 'E', 'text' => 'Saya suka memimpin kelompok dan mengatur orang lain.', 'order' => 21],
            ['code' => 'E', 'text' => 'Saya berani mengambil risiko untuk mendapatkan keuntungan.', 'order' => 22],
            ['code' => 'E', 'text' => 'Saya suka berbicara di depan umum dan meyakinkan orang lain.', 'order' => 23],
            ['code' => 'E', 'text' => 'Saya tertarik dengan dunia bisnis, marketing, atau penjualan.', 'order' => 24],
            ['code' => 'E', 'text' => 'Saya sangat kompetitif dan ingin menjadi yang terbaik.', 'order' => 25],
            
            // Conventional (C)
            ['code' => 'C', 'text' => 'Saya suka bekerja dengan data, angka, dan sistem yang teratur.', 'order' => 26],
            ['code' => 'C', 'text' => 'Saya selalu mengikuti prosedur dan aturan yang berlaku.', 'order' => 27],
            ['code' => 'C', 'text' => 'Saya sangat rapi dalam menyimpan dokumen atau file.', 'order' => 28],
            ['code' => 'C', 'text' => 'Saya teliti dalam menghitung dan meminimalisir kesalahan.', 'order' => 29],
            ['code' => 'C', 'text' => 'Saya lebih suka tugas yang jelas instruksinya daripada yang abstrak.', 'order' => 30],
        ];

        foreach ($questions as $question) {
            $category = RiasecCategory::where('code', $question['code'])->first();
            
            if ($category) {
                RiasecQuestion::create([
                    'category_id' => $category->id,
                    'question_text' => $question['text'],
                    'order' => $question['order'],
                    'is_active' => true,
                ]);
            }
        }
    }
}