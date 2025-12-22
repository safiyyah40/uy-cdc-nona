<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\CampusHiringController;
use App\Http\Controllers\CvReviewController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\KonselorController;
use App\Http\Controllers\KonsultasiController;
use App\Http\Controllers\LokerController;
use App\Http\Controllers\MagangController;
use App\Http\Controllers\ProfileCompletionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProfilKonselorController;
use App\Http\Controllers\ProfilPuskakaController;
use App\Http\Controllers\SeminarController;
use App\Http\Controllers\SertifikasiController;
use App\Http\Controllers\TipsDanTrikController;
use App\Models\BerandaSlide;
<<<<<<< HEAD
use App\Models\Seminar;
use App\Http\Controllers\MagangController;
use App\Http\Controllers\LokerController;
use App\Http\Controllers\KonsultasiController;
use App\Http\Controllers\KonselorController;
=======
use App\Models\Berita;
use App\Models\Loker;
use App\Models\Magang;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
>>>>>>> e9ea59df5d16d9a08ee77ffafa49deca9abc9e69

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

    $latestMagang = Magang::where('is_active', true)
        ->where('deadline', '>=', now())
        ->orderBy('posted_date', 'desc')
        ->take(4)
        ->get()
        ->map(function ($item) {
            return [
                'id' => $item->id,
                'title' => $item->title,
                'slug' => $item->slug,
                'company' => $item->company,
                'location' => $item->location,
                'type' => $item->type,
                'logo' => $item->logo,
                'salary_min' => $item->salary_min,
                'salary_max' => $item->salary_max,
                'deadline' => $item->deadline ? $item->deadline->format('Y-m-d') : null,
            ];
        });

    $latestLoker = Loker::where('is_active', true)
        ->where('deadline', '>=', now())
        ->latest('posted_date')
        ->take(6)
        ->get()
        ->map(function ($item) {
            return [
                'id' => $item->id,
                'title' => $item->title,
                'slug' => $item->slug,
                'company' => $item->company,
                'location' => $item->location,
                'type' => $item->type,
                'work_model' => $item->work_model,
                'experience_level' => $item->experience_level,
                'logo' => $item->logo,
            ];
        });

    $latestSeminar = Seminar::where('is_active', true)
        ->orderBy('date', 'desc') // atau 'created_at'
        ->take(3)
        ->get()
        ->map(function ($item) {
            return [
                'id' => $item->id,
                'title' => $item->title,
                'date' => $item->date ? $item->date->format('d M Y') : '-',
                'type' => $item->type, // Pastikan kolom 'type' ada di DB (Online/Offline)
                'image_url' => $item->image ? Storage::url($item->image) : null,
            ];
        });

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'slides' => $slides,
        'latestNews' => $latestNews,
        'latestMagang' => $latestMagang,
        'latestLoker' => $latestLoker,
        'latestSeminar' => $latestSeminar,
    ]);
})->name('welcome');

// GROUP AUTH
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

// AREA KONSELOR
Route::middleware(['auth', 'verified'])->prefix('konselor')->name('konselor.')->group(function () {

    // PORTAL KONSELOR (Halaman Input Jadwal / KonsultasiKonselor.jsx)
    Route::get('/dashboard', [KonselorController::class, 'index'])->name('dashboard');

    // HALAMAN TABEL BOOKING
    Route::get('/booking-list', [KonselorController::class, 'tableKonsultasi'])->name('table_konsultasi');

    // AKSI (Simpan/Hapus Slot)
    Route::post('/slots', [KonselorController::class, 'storeSlot'])->name('slots.store');

    // EDIT SLOT
    Route::patch('/slots/{slotId}', [KonselorController::class, 'updateSlot'])->name('slots.update');

    Route::delete('/slots/{slotId}', [KonselorController::class, 'deleteSlot'])->name('slots.delete');
    // DETAIL & APPROVAL
    Route::get('/konsultasi/{id}', [KonselorController::class, 'show'])->name('konsultasi.show');
    Route::post('/konsultasi/{id}/approve', [KonselorController::class, 'approve'])->name('approve');
    Route::post('/konsultasi/{id}/reject', [KonselorController::class, 'reject'])->name('reject');
    Route::post('/konsultasi/{id}/complete', [KonselorController::class, 'complete'])->name('complete');
    Route::post('/konsultasi/{id}/report', [KonselorController::class, 'storeReport'])->name('report.store');
});

// AREA MAHASISWA (Booking Konsultasi)
Route::get('/layanan/konsultasi', [KonsultasiController::class, 'index'])->name('layanan.konsultasi');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/layanan/konsultasi/booking', [KonsultasiController::class, 'showBookingForm'])->name('konsultasi.booking');
    Route::post('/layanan/konsultasi/submit', [KonsultasiController::class, 'store'])->name('konsultasi.submit');

    // LIST RIWAYAT
    Route::get('/layanan/konsultasi/riwayat', [KonsultasiController::class, 'userList'])->name('konsultasi.list');

    // BARU: DETAIL KONSULTASI (Harus ada parameter ID)
    Route::get('/layanan/konsultasi/riwayat/{id}', [KonsultasiController::class, 'show'])->name('konsultasi.show');

    Route::post('/layanan/konsultasi/cancel/{id}', [KonsultasiController::class, 'cancel'])->name('konsultasi.cancel');
});

// Profil
Route::get('/profil/puskaka', [ProfilPuskakaController::class, 'index'])->name('profil.puskaka');

Route::get('/profil-konselor', [ProfilKonselorController::class, 'index'])
    ->name('profil.konselor');

Route::get('/profil/developer', function () {
    return Inertia::render('Profil/Developer');
})->name('profil.developer');

Route::get('/program/orientasi-dunia-kerja', function () {
    return Inertia::render('Program/OrientasiDuniaKerja');
})->name('program.orientasi.kerja');

Route::prefix('program')->name('program.')->group(function () {

    // Seminar
    Route::get('/seminar', [SeminarController::class, 'index'])->name('seminar');
    Route::get('/seminar/{id}/{slug}', [SeminarController::class, 'show'])->name('seminar.show');

    // Campus Hiring
    Route::get('/campus-hiring', [CampusHiringController::class, 'index'])->name('campus.hiring');
    Route::get('/campus-hiring/{id}/{slug}', [CampusHiringController::class, 'show'])->name('campus.hiring.show');

    // Tips & Trik
    Route::get('/tips-dan-trik', [TipsDanTrikController::class, 'index'])->name('tips-dan-trik');
    Route::get('/tips-dan-trik/{id}/{slug}', [TipsDanTrikController::class, 'show'])->name('tips-dan-trik.show');

    // Berita
    Route::get('/berita', [BeritaController::class, 'index'])->name('berita');
    Route::get('/berita/{id}/{slug}', [BeritaController::class, 'show'])->name('berita.show');
});

Route::prefix('layanan')->name('layanan.')->group(function () {
    // Landing Page CV Review (Public)
    Route::get('/cv-review', [CvReviewController::class, 'index'])
        ->name('cv.review');

    // AUTH REQUIRED ROUTES
    Route::middleware(['auth', 'verified'])->group(function () {

        // --- CV REVIEW ROUTES ---
        Route::get('/tabel-cv-review', [CvReviewController::class, 'table'])
            ->name('tabel.cv.review');

        Route::get('/cv-review/upload', [CvReviewController::class, 'create'])
            ->name('cv.review.upload');

        Route::post('/cv-review/store', [CvReviewController::class, 'store'])
            ->name('cv.review.store');

        Route::get('/cv-review/{id}', [CvReviewController::class, 'show'])
            ->name('cv.review.detail');

        Route::delete('/cv-review/{id}', [CvReviewController::class, 'destroy'])
            ->name('cv.review.delete');

        Route::get('/cv-review/{id}/download', [CvReviewController::class, 'downloadCv'])
            ->name('cv.download');

        // Konselor Workspace
        Route::get('/konselor/review/{id}', [CvReviewController::class, 'workspace'])
            ->name('konselor.review');

        Route::post('/konselor/review/{id}/feedback', [CvReviewController::class, 'submitFeedback'])
            ->name('konselor.feedback');
    });

    // Tes minat bakat
    Route::get('/tes-minat-bakat', function () {
        return Inertia::render('Layanan/TesMinatBakat');
    })->name('tes.minat.bakat');
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

//  Route Peluang Karir - Index Sertifikasi
Route::get('/peluang-karir/sertifikasi', [SertifikasiController::class, 'index'])
    ->name('sertifikasi.index');

// Route Peluang Karir - Detail Sertifikasi
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/peluang-karir/sertifikasi/{id}', [SertifikasiController::class, 'show'])
        ->name('sertifikasi.show');
});

// Route Detail Berita (Jika ingin wajib login, taruh di dalam middleware auth)
Route::middleware(['auth'])->group(function () {
    Route::get('/berita/{id}/{slug}', [BeritaController::class, 'show'])
        ->name('berita.show');
});

// Route Peluang Karir - Index Magang
Route::get('/peluang-karir/magang', [MagangController::class, 'index'])->name('magang.index');

// Route Peluang Karir - Detail Magang
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/peluang-karir/magang/{slug}', [MagangController::class, 'show'])->name('magang.show');
});

Route::get('/peluang-karir/lowongan-kerja', [LokerController::class, 'index'])->name('loker.index');

// Auth
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/peluang-karir/lowongan-kerja/{slug}', [LokerController::class, 'show'])->name('loker.show');
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
