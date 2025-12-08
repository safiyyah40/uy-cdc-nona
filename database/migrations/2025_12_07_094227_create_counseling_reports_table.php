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
        Schema::create('counseling_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->constrained('counseling_bookings')->onDelete('cascade');
            $table->foreignId('counselor_id')->constrained('counselors')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->text('feedback');
            $table->text('action_plan')->nullable();
            $table->text('recommendations')->nullable();

            // Dokumentasi (Max 10MB per file, max 5 files)
            $table->json('documentation_files')->nullable();
            $table->integer('session_duration')->nullable(); // Dalam menit
            $table->enum('session_type', ['online', 'offline'])->default('offline');
            $table->string('session_location')->nullable();

            $table->timestamps();

            $table->index('booking_id');
            $table->index('counselor_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('counseling_reports');
    }
};