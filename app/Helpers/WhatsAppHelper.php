<?php

namespace App\Helpers;

use Carbon\Carbon;

class WhatsAppHelper
{
    public static function formatPhone($phone)
    {
        $phone = preg_replace('/[^0-9]/', '', $phone);
        if (substr($phone, 0, 1) === '0') {
            $phone = '62' . substr($phone, 1);
        }
        return $phone;
    }

    public static function generateUrl($phone, $message)
    {
        $phone = self::formatPhone($phone);
        $encodedMessage = urlencode($message);
        return "https://wa.me/{$phone}?text={$encodedMessage}";
    }

    public static function generateAdminNotify($studentName, $topic)
    {
        $adminPhone = env('ADMIN_WHATSAPP', '6289529127621'); 
        
        // Ambil waktu WIB
        $waktu = Carbon::now()->timezone('Asia/Jakarta')->locale('id')->isoFormat('HH:mm');

        $message = "Halo Admin PUSKAKA,\n\n" .
                   "Ada permohonan konsultasi baru masuk pada pukul $waktu WIB:\n" .
                   "Nama: $studentName\n" .
                   "Topik: $topic\n\n" .
                   "Mohon segera dicek di dashboard admin.";

        return self::generateUrl($adminPhone, $message);
    }
}