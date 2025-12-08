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
        Schema::create('counseling_bookings', function (Blueprint $table) {
            $table->id();

            // Foreign Keys
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Mahasiswa
            $table->foreignId('counselor_id')->constrained('counselors')->onDelete('cascade');
            $table->foreignId('slot_id')->constrained('counselor_slots')->onDelete('cascade');

            // Snapshot Data Mahasiswa (saat booking)
            $table->string('student_name');
            $table->string('student_npm');
            $table->string('student_phone');
            $table->string('student_email');
            $table->string('student_faculty')->nullable();
            $table->string('student_study_program')->nullable();
            $table->enum('student_gender', ['L', 'P'])->nullable();
            $table->string('topic');
            $table->text('notes');
            $table->date('scheduled_date');
            $table->time('scheduled_time');
            $table->string('counselor_name');
            $table->enum('status', [
                'pending',      // Menunggu verifikasi
                'accepted',     // Disetujui konselor
                'rejected',     // Ditolak konselor
                'completed',    // Sesi selesai
                'cancelled'     // Dibatalkan mahasiswa
            ])->default('pending');

            $table->text('rejection_reason')->nullable();
            $table->text('counselor_notes')->nullable();

            // Timestamps untuk tracking
            $table->timestamp('accepted_at')->nullable();
            $table->timestamp('rejected_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamp('cancelled_at')->nullable();

            $table->timestamps();
            $table->softDeletes(); // Soft delete untuk history

            // Indexes
            $table->index(['user_id', 'status']);
            $table->index(['counselor_id', 'status']);
            $table->index(['slot_id']);
            $table->index('scheduled_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('counseling_bookings');
    }
};
