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
        Schema::create('riasec_categories', function (Blueprint $table) {
             $table->id();
            $table->string('code', 1)->unique(); // R, I, A, S, E, C
            $table->string('title'); // Realistic, Investigative, dll
            $table->string('nickname'); // The Hands-on Hustler
            $table->text('description');
            $table->json('traits'); // Array karakteristik
            $table->json('branding_strategies'); // Array branding
            $table->json('career_recommendations')->nullable(); // Array rekomendasi karir
            $table->boolean('is_active')->default(true);
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riasec_categories');
    }
};