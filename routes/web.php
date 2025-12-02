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
use App\Http\Controllers\CampusHiringController;
use App\Http\Controllers\TipsDanTrikController;
use App\Http\Controllers\SeminarController;
use Illuminate\Support\Facades\Storage;
use App\Models\Berita;
use App\Models\BerandaSlide;
use App\Http\Controllers\KonsultasiController;

Route::get('/', function () {
    // 1. Ambil Slideshow
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

    // 2. Ambil 4 Berita Terbaru (SAMA SEPERTI DASHBOARD)
    $latestNews = Berita::where('is_active', true)
        ->orderBy('published_date', 'desc')
        ->take(4)
        ->get()
        ->map(function ($item) {
            return [
                'id' => $item->id,
                'title' => $item->title,
                'slug' => $item->slug,
                'description' => $item->description,
                'image_url' => $item->image ? Storage::url($item->image) : null,
                'formatted_date' => $item->published_date ? $item->published_date->format('d M Y') : $item->created_at->format('d M Y'),
                'views' => $item->views,
            ];
        });

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'slides' => $slides,
        'latestNews' => $latestNews, // Tambahkan ini agar tidak error di Welcome.jsx
    ]);
})->name('welcome');
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

// Profil
Route::get('/profil/puskaka', [ProfilPuskakaController::class, 'index'])->name('profil.puskaka');

Route::get('/profil-konselor', [ProfilKonselorController::class, 'index'])
    ->name('profil.konselor');

Route::get('/profil/developer', function () {
    return Inertia::render('Profil/Developer');
})->name('profil.developer');

// Program
Route::get('/program/orientasi-dunia-kerja', function () {
    return Inertia::render('Program/OrientasiDuniaKerja');
})->name('program.orientasi.kerja');
// --- PROGRAM ROUTES ---
Route::prefix('program')->name('program.')->group(function () {

    // 1. Seminar
    Route::get('/seminar', [SeminarController::class, 'index'])->name('seminar');
    Route::get('/seminar/{id}/{slug}', [SeminarController::class, 'show'])->name('seminar.show');

    // 2. Campus Hiring
    Route::get('/campus-hiring', [CampusHiringController::class, 'index'])->name('campus.hiring');
    Route::get('/campus-hiring/{id}/{slug}', [CampusHiringController::class, 'show'])->name('campus.hiring.show');

    // 3. Tips & Trik
    Route::get('/tips-dan-trik', [TipsDanTrikController::class, 'index'])->name('tips-dan-trik');
    Route::get('/tips-dan-trik/{id}/{slug}', [TipsDanTrikController::class, 'show'])->name('tips-dan-trik.show');

    // 4. Berita
    Route::get('/berita', [BeritaController::class, 'index'])->name('berita');
    Route::get('/berita/{id}/{slug}', [BeritaController::class, 'show'])->name('berita.show');
});

// Route Layanan
    Route::prefix('layanan')->group(function () {
    Route::get('/konsultasi', [ProfilKonselorController::class, 'layanan'])
        ->name('layanan.konsultasi');

   Route::get('/konsultasi/booking', [KonsultasiController::class, 'showBookingForm'])
    ->name('konsultasi.booking')
    ->middleware(['auth', 'verified']);

    Route::get('/cv-review', function () {
        return Inertia::render('Layanan/CvReview');
    })->name('layanan.cv.review');

    Route::get('/tabel-cv-review', function () {
        return Inertia::render('Layanan/TabelCvReview');
    })->name('layanan.tabel.cv.review');

    Route::get('/tes-minat-bakat', function () {
        return Inertia::render('Layanan/TesMinatBakat');
    })->name('layanan.tes.minat.bakat');
});

// Route Detail Berita
Route::get('/berita/{id}/{slug}', function ($id) {
    $user = auth()->guard('web')->user();
 return Inertia::render('Program/DetailBerita', [
        'newsId' => (int) $id,
        'auth' => [
            'user' => $user,
        ],
    ]);
})->name('berita.show');

// Route Detail Berita (Jika ingin wajib login, taruh di dalam middleware auth)
Route::middleware(['auth'])->group(function () {
    Route::get('/berita/{id}/{slug}', [BeritaController::class, 'show'])
        ->name('berita.show');
});

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
