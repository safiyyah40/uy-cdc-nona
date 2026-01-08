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
        Schema::create('orientasi_dunia_kerjas', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->json('categories');
            $table->string('location')->nullable();
            $table->date('date')->nullable();
            $table->string('time')->nullable();
            $table->text('description');
            $table->longText('content');
            $table->string('image')->nullable();
            $table->string('registration_link')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orientasi_dunia_kerjas');
    }
};
