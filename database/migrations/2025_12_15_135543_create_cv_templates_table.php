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
        Schema::create('cv_templates', function (Blueprint $table) {
            $table->id();

            // Info Dasar Template
            $table->string('judul_template');
            $table->text('deskripsi')->nullable();
            $table->string('kategori');

            // Sumber Template
            $table->enum('sumber', ['canva', 'slides_go', 'manual'])->default('manual');
            $table->string('url_template')->nullable(); // Link eksternal (Canva/GSlides)
            
            $table->string('file_path')->nullable();
            
            $table->string('url_preview')->nullable();

            // Metadata
            $table->json('tags')->nullable();
            $table->string('jenis_pekerjaan')->nullable();
            $table->string('tingkat_pengalaman')->nullable();

            // Status & Visibilitas
            $table->boolean('is_active')->default(true);
            $table->boolean('is_unggulan')->default(false);
            $table->integer('urutan')->default(0);

            // Analytics
            $table->integer('jumlah_view')->default(0);
            $table->integer('jumlah_klik')->default(0);
            $table->integer('jumlah_download')->default(0);
            
            // Admin
            $table->foreignId('dibuat_oleh')->nullable()->constrained('users')->nullOnDelete();

            $table->timestamps();
            $table->softDeletes();

            // Indexes
            $table->index('kategori');
            $table->index('sumber');
            $table->index('is_active');
            $table->index('is_unggulan');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cv_templates');
    }
};