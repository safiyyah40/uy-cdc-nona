<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Models\PuskakaTeam;
use App\Http\Controllers\ProfilKonselorController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProfilPuskakaController;
use App\Http\Controllers\ProfileCompletionController;
use App\Http\Controllers\DashboardController;
use App\Models\BerandaSlide;

Route::get('/', function () {
    $slides = BerandaSlide::where('is_active', true)
        ->orderBy('sort_order')
        ->get()
        ->map(function ($slide) {
            return [
                'id' => $slide->id,
                'photo_url' => $slide->photo_url,
                'alt_text' => $slide->alt_text ?? 'Slideshow Beranda',
            ];
        });

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'slides' => $slides,
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

// Route profil puskaka
Route::get('/profil/puskaka', [ProfilPuskakaController::class, 'index'])
    ->name('profil.puskaka');

// Route profil konselor
Route::get('/profil-konselor', ProfilKonselorController::class, 'index')
    ->name('profil.konselor');

// Route profil pengembang
Route::get('/profil/developer', function () {
    return Inertia::render('Profil/Developer');
})->name('profil.developer');

//Route Program Orientasi Dunia Kerja
Route::get('/program/orientasi-dunia-kerja', function () {
    return Inertia::render('Program/OrientasiDuniaKerja');
})->name('program.orientasi.kerja');

//Route Program Campus Hiring
Route::get('/program/campus-hiring', function () {
    return Inertia::render('Program/CampusHiring');
})->name('program.campus.hiring');

// Route Program Seminar
Route::get('/program/seminar', function () {
    return Inertia::render('Program/Seminar');
})->name('program.seminar');

// Route Program Tips dan Trik
Route::get('/program/tips-dan-trik', function () {
    return Inertia::render('Program/TipsDanTrik');
})->name('program.tips.trik');

// Route Halaman Berita
Route::get('/berita', function () {
    return Inertia::render('Berita');
})->name('program.berita');

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
