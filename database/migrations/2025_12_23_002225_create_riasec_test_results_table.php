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
        Schema::create('riasec_test_results', function (Blueprint $table) {
             $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            
            // Skor per kategori
            $table->integer('score_r')->default(0); // Realistic
            $table->integer('score_i')->default(0); // Investigative
            $table->integer('score_a')->default(0); // Artistic
            $table->integer('score_s')->default(0); // Social
            $table->integer('score_e')->default(0); // Enterprising
            $table->integer('score_c')->default(0); // Conventional
            
            // Top 3 Dominant Types (disimpan sebagai string: "R-I-A")
            $table->string('dominant_type_1', 1);
            $table->string('dominant_type_2', 1);
            $table->string('dominant_type_3', 1);
            
            // Metadata
            $table->integer('time_taken_seconds');
            $table->integer('total_questions_answered');
            $table->timestamp('started_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            
            // Status
            $table->enum('status', ['in_progress', 'completed'])->default('completed');
            
            $table->timestamps();
            
            // Indexes
            $table->index(['user_id', 'status']);
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riasec_test_results');
    }
};