<?php

namespace App\Observers;

use App\Models\Berita;
use App\Helpers\ActivityLogger;

class BeritaObserver
{
    /**
     * Handle ketika Berita baru dibuat.
     * 
     * Log siapa yang buat berita dengan judul apa.
     * 
     * @param Berita $berita
     * @return void
     */
    public function created(Berita $berita): void
    {
        ActivityLogger::logCreate($berita);
    }

    /**
     * Handle ketika Berita diupdate.
     * 
     * Misal edit konten, gambar, atau ubah status publish.
     * 
     * @param Berita $berita
     * @return void
     */
    public function updated(Berita $berita): void
    {
        $old = $berita->getOriginal();
        
        $description = "Updated news: {$berita->title}";
        
        if ($old['is_active'] !== $berita->is_active) {
            $status = $berita->is_active ? 'published' : 'unpublished';
            $description .= " - {$status}";
        }
        
        ActivityLogger::logUpdate($berita, $old, $description);
    }

    /**
     * Handle ketika Berita dihapus.
     * 
     * @param Berita $berita
     * @return void
     */
    public function deleted(Berita $berita): void
    {
        ActivityLogger::logDelete($berita);
    }

    /**
     * Handle ketika Berita di-restore.
     * 
     * @param Berita $berita
     * @return void
     */
    public function restored(Berita $berita): void
    {
        ActivityLogger::log(
            "Restored news: {$berita->title}",
            $berita,
            'RESTORE'
        );
    }

    /**
     * Handle ketika Berita dihapus permanen.
     * 
     * @param Berita $berita
     * @return void
     */
    public function forceDeleted(Berita $berita): void
    {
        ActivityLogger::log(
            "Force deleted news: {$berita->title}",
            $berita,
            'FORCE_DELETE'
        );
    }
}