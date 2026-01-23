<?php

namespace App\Observers;

use App\Helpers\ActivityLogger;
use App\Models\ContactInfo;

class ContactInfoObserver
{
    /**
     * Handle the ContactInfo "created" event.
     * * Dijalankan saat data kontak pertama kali diinisialisasi di database.
     * Biasanya ini cuma kejadian sekali seumur hidup aplikasi (saat seeding pertama).
     */
    public function created(ContactInfo $contactInfo): void
    {
        ActivityLogger::logCreate(
            $contactInfo,
            "Menginisialisasi Informasi Kontak CDC YARSI"
        );
    }

    /**
     * Handle the ContactInfo "updated" event.
     * * Dijalankan saat Admin mengubah detail kontak.
     * Misal: Ganti nomor WhatsApp, update Email, atau pindah alamat kantor.
     * Log ini akan menyimpan data lama vs data baru agar perubahannya terlacak.
     */
    public function updated(ContactInfo $contactInfo): void
    {
        ActivityLogger::logUpdate(
            $contactInfo,
            $contactInfo->getOriginal(),
            "Memperbarui Informasi Kontak CDC YARSI"
        );
    }

    /**
     * Handle the ContactInfo "deleted" event.
     * * Dijalankan jika data kontak dihapus.
     * Seharusnya jarang terjadi karena ini data vital, tapi tetap kita catat log-nya.
     */
    public function deleted(ContactInfo $contactInfo): void
    {
        ActivityLogger::logDelete(
            $contactInfo,
            "Menghapus Informasi Kontak CDC YARSI"
        );
    }
}