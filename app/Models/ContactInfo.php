<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactInfo extends Model
{
    protected $table = 'contact_info';
    protected $fillable = [
        'email',
        'instagram_username',
        'whatsapp_number',
        'phone_number',
        'address_university',
        'address_cdc',
    ];

    // Helper untuk ambil data kontak (selalu return 1 record)
    public static function getContact()
    {
        return self::firstOrCreate(
            ['id' => 1],
            [
                'email' => 'bidang1@yarsi.ac.id',
                'instagram_username' => 'kariralumni.yarsi',
                'whatsapp_number' => '6281295986204',
                'address_university' => 'Menara YARSI, Jl. Let. Jend. Suprapto Kav. 13. Cempaka Putih, Jakarta Pusat, DKI Jakarta 10510. Indonesia.',
                'address_cdc' => 'Pusat Kemahasiswaan Karir dan Alumni, Universitas Yarsi, Lantai.1, Rektorat',
            ]
        );
    }
}
