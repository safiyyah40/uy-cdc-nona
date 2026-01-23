<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string|null $email
 * @property string|null $instagram_username
 * @property string|null $whatsapp_number
 * @property string|null $phone_number
 * @property string|null $address_university
 * @property string|null $address_cdc
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ContactInfo newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ContactInfo newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ContactInfo query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ContactInfo whereAddressCdc($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ContactInfo whereAddressUniversity($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ContactInfo whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ContactInfo whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ContactInfo whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ContactInfo whereInstagramUsername($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ContactInfo wherePhoneNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ContactInfo whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ContactInfo whereWhatsappNumber($value)
 * @mixin \Eloquent
 */
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
