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
        Schema::create('riasec_test_answers', function (Blueprint $table) {
             $table->id();
            $table->foreignId('test_result_id')->constrained('riasec_test_results')->cascadeOnDelete();
            $table->foreignId('question_id')->constrained('riasec_questions')->cascadeOnDelete();
            $table->tinyInteger('answer_value'); // 1-5
            $table->timestamps();
            
            // Composite index untuk query cepat
            $table->index(['test_result_id', 'question_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riasec_test_answers');
    }
};