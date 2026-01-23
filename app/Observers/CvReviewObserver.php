<?php

namespace App\Observers;

use App\Models\CvReview;
use App\Helpers\ActivityLogger;

class CvReviewObserver
{
    /**
     * Handle ketika CV Review baru dibuat (mahasiswa submit CV).
     * 
     * Log siapa yang submit CV untuk review dan data target posisi.
     * 
     * @param CvReview $cvReview
     * @return void
     */
    public function created(CvReview $cvReview): void
    {
        ActivityLogger::logCreate(
            $cvReview, 
            "Created CV review for {$cvReview->student_name} - Target: {$cvReview->target_position}"
        );
    }

    /**
     * Handle ketika CV Review diupdate.
     * 
     * Biasanya ini terjadi ketika:
     * - Admin assign ke konselor
     * - Status berubah (submitted -> in_review -> completed)
     * - Konselor kasih feedback
     * 
     * @param CvReview $cvReview
     * @return void
     */
    public function updated(CvReview $cvReview): void
    {
        $old = $cvReview->getOriginal();
        
        // Custom description berdasarkan perubahan
        $description = "Updated CV review for {$cvReview->student_name}";
        
        if ($old['status'] !== $cvReview->status) {
            $description .= " - Status changed from {$old['status']} to {$cvReview->status}";
        }
        
        if ($old['counselor_id'] !== $cvReview->counselor_id && $cvReview->counselor_id) {
            $description .= " - Assigned to counselor";
        }
        
        ActivityLogger::logUpdate($cvReview, $old, $description);
    }

    /**
     * Handle ketika CV Review dihapus (soft delete).
     * 
     * @param CvReview $cvReview
     * @return void
     */
    public function deleted(CvReview $cvReview): void
    {
        ActivityLogger::logDelete(
            $cvReview, 
            "Deleted CV review for {$cvReview->student_name}"
        );
    }

    /**
     * Handle ketika CV Review di-restore.
     * 
     * @param CvReview $cvReview
     * @return void
     */
    public function restored(CvReview $cvReview): void
    {
        ActivityLogger::log(
            "Restored CV review for {$cvReview->student_name}",
            $cvReview,
            'RESTORE'
        );
    }

    /**
     * Handle ketika CV Review dihapus permanen.
     * 
     * @param CvReview $cvReview
     * @return void
     */
    public function forceDeleted(CvReview $cvReview): void
    {
        ActivityLogger::log(
            "Force deleted CV review for {$cvReview->student_name}",
            $cvReview,
            'FORCE_DELETE'
        );
    }
}