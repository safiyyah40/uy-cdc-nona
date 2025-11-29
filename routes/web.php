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

// Route Campus Hiring
Route::get('/program/campus-hiring', [CampusHiringController::class, 'index'])
    ->name('program.campus.hiring');

// Route Detail Campus Hiring 
Route::get('/program/campus-hiring/{id}/{slug}', [CampusHiringController::class, 'show'])
    ->middleware(['auth'])
    ->name('program.campus.hiring.show');


Route::get('/program/seminar', function () {
    return Inertia::render('Program/Seminar');
})->name('program.seminar');

// Route Detail Seminar
Route::get('/program/seminar/{id}/{slug}', function ($id) {
    $dummySeminarData = [
        'id' => (int) $id,
        'title' => 'Pokok-Pokok Pikiran Tentang Universitas Islam Ideal dan Aplikasinya di Indonesia',
        'speaker' => 'Dr. Budi Santoso',
        'published_date' => '2025-11-20',
        'description' => 'Ringkasan singkat tentang pentingnya visi Islam integral dalam dunia pendidikan tinggi.',
        'content' => '<p>Konten lengkap seminar dalam format HTML. Ini adalah detail mendalam tentang visi dan misi keislaman Universitas YARSI.</p><p>Seminar ini bertujuan untuk memberikan wawasan komprehensif kepada para mahasiswa dan alumni.</p>',
        'images' => ['/images/seminar.jfif', '/images/seminar.jfif'],
        'registration_link' => 'https://bit.ly/daftar-seminar',
    ];

    $user = auth()->guard('web')->user();
    return Inertia::render('Program/DetailSeminar', [
        'seminar' => $dummySeminarData,
        'auth' => [
            'user' => $user,
        ],
    ]);
})->name('program.seminar.show');

Route::get('/program/tips-dan-trik', function () {
    return Inertia::render('Program/TipsDanTrik');
})->name('program.tips.trik');

// Berita
Route::get('/program/berita', [BeritaController::class, 'index'])->name('program.berita');
Route::get('/berita/{id}/{slug}', [BeritaController::class, 'show'])->name('berita.show');

// Route Layanan
Route::prefix('layanan')->group(function () {
    Route::get('/konsultasi', [ProfilKonselorController::class, 'layanan'])
        ->name('layanan.konsultasi');

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
