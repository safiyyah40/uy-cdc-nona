<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Models\PuskakaTeam;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProfilPuskakaController;
use App\Http\Controllers\ProfileCompletionController;
use App\Http\Controllers\DashboardController;


// Halaman Utama (Sebelum Login)
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Halaman setelah login
Route::middleware(['auth', 'verified'])->group(function () {

    // Dashboard (hanya bisa diakses kalau profil lengkap)
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    // Lengkapi profil (hanya bisa diakses kalau login)
    Route::get('/complete-profile', [ProfileCompletionController::class, 'show'])
        ->name('profile.complete');
    Route::post('/complete-profile', [ProfileCompletionController::class, 'store'])
        ->name('profile.complete.store');
});

// Route akun profil puskaka
Route::get('/profil/puskaka', [ProfilPuskakaController::class, 'index'])
    ->name('profil.puskaka');

// Route akun profil pengembang
Route::get('/profil/developer', function () {
    return Inertia::render('Profil/Developer');
})->name('profil.developer');


// Route akun profile
    Route::middleware(['auth'])->group(function () {
    Route::get('/akun', [ProfileController::class, 'show'])->name('profile.show');
    Route::get('/akun/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/akun/update', [ProfileController::class, 'update'])->name('profile.update');
});

// Route untuk logout
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');

require __DIR__.'/auth.php';
