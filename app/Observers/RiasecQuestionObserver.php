<?php

namespace App\Observers;

use App\Helpers\ActivityLogger;
use App\Models\RiasecQuestion;

class RiasecQuestionObserver
{
    /**
     * Handle the RiasecQuestion "created" event.
     * * Dijalankan saat Admin menambahkan pertanyaan baru ke bank soal RIASEC.
     * Kita catat teks pertanyaannya supaya jelas soal mana yang baru masuk.
     */
    public function created(RiasecQuestion $riasecQuestion): void
    {
        ActivityLogger::logCreate(
            $riasecQuestion,
            "Menambahkan pertanyaan RIASEC baru: \"{$riasecQuestion->question_text}\""
        );
    }

    /**
     * Handle the RiasecQuestion "updated" event.
     * * Dijalankan saat Admin mengedit redaksi pertanyaan, mengubah urutan, atau menonaktifkan soal.
     * Log ini menyimpan data lama (original) vs data baru, jadi ketahuan apa yang direvisi.
     */
    public function updated(RiasecQuestion $riasecQuestion): void
    {
        ActivityLogger::logUpdate(
            $riasecQuestion,
            $riasecQuestion->getOriginal(),
            "Mengupdate pertanyaan RIASEC: \"{$riasecQuestion->question_text}\""
        );
    }

    /**
     * Handle the RiasecQuestion "deleted" event.
     * * Dijalankan saat pertanyaan dihapus dari database.
     * Hati-hati, menghapus pertanyaan bisa mempengaruhi hasil tes mahasiswa sebelumnya.
     */
    public function deleted(RiasecQuestion $riasecQuestion): void
    {
        ActivityLogger::logDelete(
            $riasecQuestion,
            "Menghapus pertanyaan RIASEC: \"{$riasecQuestion->question_text}\""
        );
    }

    /**
     * Handle the RiasecQuestion "restored" event.
     * * Dijalankan jika Model menggunakan SoftDeletes dan data dikembalikan dari sampah.
     */
    public function restored(RiasecQuestion $riasecQuestion): void
    {
        ActivityLogger::log(
            "Mengembalikan pertanyaan RIASEC yang dihapus: \"{$riasecQuestion->question_text}\"",
            $riasecQuestion,
            'RESTORE'
        );
    }

    /**
     * Handle the RiasecQuestion "force deleted" event.
     * * Dijalankan saat data dihapus secara permanen dari database (hard delete).
     */
    public function forceDeleted(RiasecQuestion $riasecQuestion): void
    {
        ActivityLogger::log(
            "Menghapus permanen pertanyaan RIASEC: \"{$riasecQuestion->question_text}\"",
            $riasecQuestion,
            'FORCE_DELETE'
        );
    }
}