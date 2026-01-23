<?php

namespace App\Observers;

use App\Helpers\ActivityLogger;
use App\Models\CvTemplate;

class CvTemplateObserver
{
    /**
     * Handle the CvTemplate "created" event.
     * * Dijalankan saat Admin berhasil mengupload/menambahkan template CV baru.
     * Kita catat judulnya agar admin tau template mana yang baru saja masuk ke sistem.
     */
    public function created(CvTemplate $cvTemplate): void
    {
        ActivityLogger::logCreate(
            $cvTemplate,
            "Menambahkan template CV baru: \"{$cvTemplate->judul_template}\""
        );
    }

    /**
     * Handle the CvTemplate "updated" event.
     * * Dijalankan saat ada perubahan data pada template.
     * Misalnya: Admin mengubah status aktif/non-aktif, menjadikan template unggulan,
     * atau mengupdate file dokumennya. Log ini menyimpan data lama vs baru.
     */
    public function updated(CvTemplate $cvTemplate): void
    {
        ActivityLogger::logUpdate(
            $cvTemplate,
            $cvTemplate->getOriginal(),
            "Mengupdate data template CV: \"{$cvTemplate->judul_template}\""
        );
    }

    /**
     * Handle the CvTemplate "deleted" event.
     * * Dijalankan saat template dihapus sementara (masuk tong sampah / Soft Delete).
     * Template ini tidak akan muncul lagi di halaman mahasiswa, tapi masih bisa dipulihkan.
     */
    public function deleted(CvTemplate $cvTemplate): void
    {
        ActivityLogger::logDelete(
            $cvTemplate,
            "Menghapus sementara template CV: \"{$cvTemplate->judul_template}\""
        );
    }

    /**
     * Handle the CvTemplate "restored" event.
     * * Dijalankan saat template yang sebelumnya dihapus dikembalikan lagi (Restore).
     * Berguna jika admin tidak sengaja menghapus template penting.
     */
    public function restored(CvTemplate $cvTemplate): void
    {
        ActivityLogger::log(
            "Mengembalikan template CV yang dihapus: \"{$cvTemplate->judul_template}\"",
            $cvTemplate,
            'RESTORE'
        );
    }

    /**
     * Handle the CvTemplate "force deleted" event.
     * * Dijalankan saat template dihapus secara permanen dari database.
     * Ini tindakan destruktif (data hilang selamanya), jadi wajib dicatat siapa pelakunya.
     */
    public function forceDeleted(CvTemplate $cvTemplate): void
    {
        ActivityLogger::log(
            "Menghapus permanen template CV: \"{$cvTemplate->judul_template}\"",
            $cvTemplate,
            'FORCE_DELETE'
        );
    }
}