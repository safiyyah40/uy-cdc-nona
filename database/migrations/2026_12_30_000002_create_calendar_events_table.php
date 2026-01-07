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
        Schema::create('calendar_events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');

           $table->nullableMorphs('eventable');

            // Data Event
            $table->string('title');
            $table->text('description')->nullable();
            $table->date('start_date');
            $table->date('end_date')->nullable(); // Untuk event multi-hari
            $table->time('start_time')->nullable();
            $table->time('end_time')->nullable();

            // Metadata
            $table->enum('event_type', [
                'seminar',
                'campus_hiring',
                'konsultasi',
                'deadline_loker',
                'deadline_magang',
                'sertifikasi',
                'orientasi',
                'berita',
                'custom',
            ]);

            $table->string('location')->nullable();
            $table->string('link')->nullable(); // Link ke detail page
            $table->string('registration_url')->nullable();

            // Styling & Display
            $table->string('color')->default('#10b981'); // Hex color untuk kalender
            $table->string('icon')->nullable(); // Icon name (Lucide)
            $table->enum('priority', ['low', 'medium', 'high', 'urgent'])->default('medium');

            // Visibility
            $table->boolean('is_visible_to_mahasiswa')->default(true);
            $table->boolean('is_visible_to_konselor')->default(true);
            $table->boolean('is_visible_to_admin')->default(true);

            // Status
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false); // Highlight di kalender

            // Reminder
            $table->boolean('send_notification')->default(false);
            $table->integer('remind_before_days')->nullable(); // Kirim notif X hari sebelumnya

            // Timestamps
            $table->timestamps();
            $table->softDeletes();

            // Indexes
            $table->index(['start_date', 'event_type']);
            $table->index(['is_active', 'start_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('calendar_events');
    }
};
