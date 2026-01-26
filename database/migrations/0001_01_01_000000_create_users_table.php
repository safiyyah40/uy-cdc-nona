<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('username')->unique()->nullable();
            $table->string('id_number')->nullable();
            $table->string('faculty')->nullable();
            $table->string('study_program')->nullable();
            $table->string('phone')->nullable();
            $table->boolean('is_profile_complete')->default(false);
            $table->string('password')->nullable();
            $table->enum('role', ['mahasiswa', 'konselor', 'admin', 'dosen_staf'])->default('mahasiswa');
            $table->string('photo_url')->nullable();
            
            // Kolom Wajib LdapRecord
            $table->string('guid')->unique()->nullable()->index(); // untuk sync LDAP
            $table->string('domain')->nullable();
            
            $table->rememberToken();
            $table->timestamps();
            $table->index(['faculty', 'study_program']);
            $table->index(['role', 'is_profile_complete']);
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('users');
    }
};