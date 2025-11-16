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
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'username')) {
                $table->string('username')->unique()->after('email_verified_at')->nullable();
            }
            
            if (!Schema::hasColumn('users', 'id_number')) {
                $table->string('id_number')->nullable()->after('username');
            }
            
            if (!Schema::hasColumn('users', 'phone')) {
                $table->string('phone')->unique()->nullable()->after('email');
            }
            
            if (!Schema::hasColumn('users', 'is_profile_complete')) {
                $table->boolean('is_profile_complete')->default(false)->after('phone');
            }

            if (!Schema::hasColumn('users', 'role')) {
                $table->string('role')->default('mahasiswa')->after('password');
            }
            
            if (!Schema::hasColumn('users', 'photo_url')) {
                $table->string('photo_url')->nullable();
            }
            
            // password jadi nullable karena LDAP
            if (Schema::hasColumn('users', 'password')) {
                $table->string('password')->nullable()->change();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $dropColumns = ['username', 'id_number', 'phone', 'is_profile_complete', 'role', 'photo_url'];
            foreach ($dropColumns as $column) {
                if (Schema::hasColumn('users', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
};