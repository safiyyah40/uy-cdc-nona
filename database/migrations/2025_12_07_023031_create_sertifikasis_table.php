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
        Schema::create('sertifikasis', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->longText('content')->nullable();
            $table->string('provider_name');
            $table->string('logo')->nullable();
            $table->json('categories');
            $table->enum('type', ['Sertifikasi', 'Kursus', 'Workshop', 'Bootcamp'])->default('Sertifikasi');
            $table->enum('level', ['Beginner', 'Intermediate', 'Advanced', 'All Levels'])->default('All Levels');
            $table->enum('mode', ['Online', 'Offline', 'Hybrid'])->default('Online');
            $table->string('location')->nullable();
            $table->string('duration')->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->boolean('is_self_paced')->default(false);
            $table->decimal('fee', 12, 2)->nullable();
            $table->boolean('is_free')->default(false);
            $table->string('fee_currency')->default('IDR');
            $table->longText('requirements')->nullable();
            $table->longText('benefits')->nullable();
            $table->longText('syllabus')->nullable();
            $table->string('registration_url')->nullable();
            $table->date('registration_deadline')->nullable();
            $table->boolean('is_registration_open')->default(true);
            $table->string('brochure_pdf')->nullable();
            $table->string('certificate_sample')->nullable();
            $table->integer('quota')->nullable();
            $table->integer('enrolled_count')->default(0);
            $table->enum('status', ['Draft', 'Published', 'Closed'])->default('Published');
            $table->integer('view_count')->default(0);
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->json('tags')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index('slug');
            $table->index('provider_name');
            $table->index('type');
            $table->index('status');
            $table->boolean('is_active')->default(true);
            $table->index('published_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sertifikasis');
    }
};
