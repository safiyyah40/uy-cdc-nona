<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ContactInfo;

class ContactInfoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ContactInfo::create([
            'email' => 'bidang1@yarsi.ac.id',
            'instagram_username' => 'kariralumni.yarsi',
            'whatsapp_number' => '6281295986204',
            'address_university' => 'Menara YARSI, Jl. Let. Jend. Suprapto Kav. 13. Cempaka Putih, Jakarta Pusat, DKI Jakarta 10510. Indonesia.',
            'address_cdc' => 'Pusat Kemahasiswaan Karir dan Alumni, Universitas Yarsi, Lantai.1, Rektorat',
        ]);
    }
}
