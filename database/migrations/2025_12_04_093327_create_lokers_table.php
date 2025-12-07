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
        Schema::create('lokers', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('company');
            $table->string('location');
            $table->enum('type', ['Full Time', 'Contract', 'Freelance', 'Part Time'])->default('Full Time');
            $table->enum('work_model', ['Onsite', 'Remote', 'Hybrid'])->default('Onsite');
            $table->enum('experience_level', ['Fresh Graduate', 'Junior', 'Mid-Level', 'Senior', 'Executive'])->default('Junior');
            $table->json('categories');
            $table->decimal('salary_min', 15, 2)->nullable();
            $table->decimal('salary_max', 15, 2)->nullable();
            $table->date('deadline');
            $table->date('posted_date')->default(now());
            $table->string('logo')->nullable();
            $table->string('image')->nullable();
            $table->longText('description');
            $table->longText('requirements')->nullable();
            $table->longText('benefits')->nullable();
            $table->string('application_url')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lokers');
    }
};
