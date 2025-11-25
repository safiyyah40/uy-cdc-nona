<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ProfilKonselorController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProfilPuskakaController;
use App\Http\Controllers\ProfileCompletionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\BeritaController;
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

// --- GROUP AUTH ---
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Profil Lengkap & Akun
    Route::get('/complete-profile', [ProfileCompletionController::class, 'show'])->name('profile.complete');
    Route::post('/complete-profile', [ProfileCompletionController::class, 'store'])->name('profile.complete.store');
    Route::get('/akun', [ProfileController::class, 'show'])->name('profile.show');
    Route::get('/akun/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/akun/update', [ProfileController::class, 'update'])->name('profile.update');

    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});

// --- GROUP PUBLIC ---

// 1. Profil
Route::get('/profil/puskaka', [ProfilPuskakaController::class, 'index'])->name('profil.puskaka');

Route::get('/profil-konselor', [ProfilKonselorController::class, 'index'])
    ->name('profil.konselor');

Route::get('/profil/developer', function () {
    return Inertia::render('Profil/Developer');
})->name('profil.developer');

// 2. Program
Route::get('/program/orientasi-dunia-kerja', function () {
    return Inertia::render('Program/OrientasiDuniaKerja');
})->name('program.orientasi.kerja');

Route::get('/program/campus-hiring', function () {
    return Inertia::render('Program/CampusHiring');
})->name('program.campus.hiring');

Route::get('/program/seminar', function () {
    return Inertia::render('Program/Seminar');
})->name('program.seminar');

Route::get('/program/tips-dan-trik', function () {
    return Inertia::render('Program/TipsDanTrik');
})->name('program.tips.trik');

// 3. Berita
Route::get('/program/berita', [BeritaController::class, 'index'])->name('program.berita');
Route::get('/berita/{id}/{slug}', [BeritaController::class, 'show'])->name('berita.show');

// 4. Layanan
Route::prefix('layanan')->group(function () {
    Route::get('/konsultasi', [ProfilKonselorController::class, 'layanan'])
        ->name('layanan.konsultasi');

    Route::get('/cv-review', function () {
        return Inertia::render('Layanan/CvReview');
    })->name('layanan.cv.review');

    Route::get('/tes-minat-bakat', function () {
        return Inertia::render('Layanan/TesMinatBakat');
    })->name('layanan.tes.minat.bakat');
});

require __DIR__.'/auth.php';