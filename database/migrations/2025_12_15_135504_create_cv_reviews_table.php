<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cv_reviews', function (Blueprint $table) {
            $table->id();
            // Foreign Keys
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Mahasiswa
            $table->foreignId('counselor_id')->nullable()->constrained('counselors')->onDelete('set null'); // Konselor yang assigned
            
            // Data Mahasiswa (Snapshot)
            $table->string('student_name');
            $table->string('student_npm');
            $table->string('student_email');
            $table->string('student_phone');
            $table->string('student_faculty')->nullable();
            $table->string('student_study_program')->nullable();
            
            // Detail CV Review
            $table->string('target_position'); // Posisi yang ditargetkan
            $table->text('additional_notes')->nullable(); // Keterangan tambahan
            $table->string('cv_file_path'); // Path file CV yang diupload
            $table->string('cv_file_original_name'); // Nama file asli
            
            // Status Review
            $table->enum('status', [
                'submitted',      // Baru diajukan
                'assigned',       // Sudah ditugaskan ke konselor
                'in_review',      // Sedang direview
                'completed',      // Selesai
                'cancelled' // Dibatalkan 
            ])->default('submitted');
            
            // Feedback dari Konselor
            $table->text('feedback_text')->nullable();
            $table->json('feedback_files')->nullable(); // Array path file feedback
            
            // Prioritas (diatur oleh admin)
            $table->enum('priority', ['normal', 'tinggi', 'mendesak'])->default('normal');
            
            // Timestamps
            $table->timestamp('submitted_at')->useCurrent();
            $table->timestamp('assigned_at')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            
            $table->timestamps();
            $table->softDeletes();
            
            // Indexes
            $table->index(['user_id', 'status']);
            $table->index(['counselor_id', 'status']);
            $table->index('status');
            $table->index('priority');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cv_reviews');
    }
};
