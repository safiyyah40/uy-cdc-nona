<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\CampusHiringController;
use App\Http\Controllers\CvReviewController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DeveloperController;
use App\Http\Controllers\KonselorController;
use App\Http\Controllers\KonsultasiController;
use App\Http\Controllers\LokerController;
use App\Http\Controllers\MagangController;
use App\Http\Controllers\OrientasiDuniaKerjaController;
use App\Http\Controllers\ProfileCompletionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProfilKonselorController;
use App\Http\Controllers\ProfilPuskakaController;
use App\Http\Controllers\RiasecTestController;
use App\Http\Controllers\SeminarController;
use App\Http\Controllers\SertifikasiController;
use App\Http\Controllers\StatistikLayananController;
use App\Http\Controllers\TipsDanTrikController;
use App\Models\BerandaSlide;
use App\Models\Berita;
use App\Models\CampusHiring;
use App\Models\CvTemplate;
use App\Models\Loker;
use App\Models\Magang;
use App\Models\OrientasiDuniaKerja;
use App\Models\Seminar;
use App\Models\Sertifikasi;
use App\Models\TipsDanTrik;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

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

    $latestODK = OrientasiDuniaKerja::active()
        ->latest('date')
        ->take(3)
        ->get()
        ->map(function ($item) {
            return [
                'id' => $item->id,
                'slug' => $item->slug,
                'judul' => $item->title,
                'kategori' => is_array($item->categories) ? $item->categories[0] ?? 'General' : $item->categories,
                'deskripsi' => $item->description,
                'imageUrl' => $item->image ? Storage::url($item->image) : '/images/odk.jpg',
                'date' => $item->date ? $item->date->format('d M Y') : null,
                'location' => $item->location,
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

    $latestHiring = CampusHiring::where('is_active', true)
        ->whereDate('date', '>=', now())
        ->orderBy('date', 'asc')
        ->take(4)
        ->get()
        ->map(function ($item) {
            return [
                'id' => $item->id,
                'slug' => $item->slug,
                'title' => $item->title,
                'company_name' => $item->company_name,
                'location' => $item->location,
                'formatted_date' => $item->date
                    ? Carbon::parse($item->date)->translatedFormat('d M Y')
                    : '-',
                'imageSrc' => $item->image
                    ? (str_starts_with($item->image, 'http')
                        ? $item->image
                        : Storage::url($item->image))
                    : null,
            ];
        });

    $latestSeminar = Seminar::where('is_active', true)
        ->orderBy('date', 'desc')
        ->take(3)
        ->get()
        ->map(function ($item) {
            return [
                'id' => $item->id,
                'title' => $item->title,
                'date' => $item->date ? $item->date->format('d M Y') : '-',
                'type' => $item->type,
                'image_url' => $item->image ? Storage::url($item->image) : null,
            ];
        });

    $latestTips = TipsDanTrik::where('is_active', true)
        ->latest()
        ->take(3)
        ->get()
        ->map(function ($item) {
            return [
                'id' => $item->id,
                'title' => $item->title,
                'slug' => $item->slug,
                'summary' => $item->summary,
                'category' => $item->category,
                'reading_time' => $item->reading_time,
                'image_url' => $item->thumbnail ? Storage::url($item->thumbnail) : null,
            ];
        });

    $latestSertifikasi = Sertifikasi::published()
        ->latest('published_at')
        ->take(4)
        ->get()
        ->map(function ($item) {
            return [
                'id' => $item->id,
                'title' => $item->title,
                'slug' => $item->slug,
                'provider' => $item->provider_name,
                'logo' => $item->logo,
                'category' => $item->categories[0] ?? 'Umum',
                'method' => $item->mode,
                'level' => $item->level,
                'deadline' => $item->registration_deadline,
            ];
        });

    $latestTemplates = CvTemplate::where('is_active', true)
        ->orderBy('is_unggulan', 'desc')
        ->latest()
        ->take(4)
        ->get()
        ->map(function ($tpl) {
            return [
                'id' => $tpl->id,
                'judul' => $tpl->judul_template,
                'deskripsi' => $tpl->deskripsi,
                'kategori' => $tpl->kategori,
                'sumber' => $tpl->sumber,
                'preview_url' => $tpl->preview_url,
                'url_template' => $tpl->url_template,
                'tags' => $tpl->tags,
                'is_unggulan' => $tpl->is_unggulan,
                'jumlah_view' => $tpl->jumlah_view,
                'jumlah_klik' => $tpl->jumlah_klik,
            ];
        });

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'slides' => $slides,
        'latestODK' => $latestODK,
        'latestCampusHiring' => $latestHiring,
        'latestNews' => $latestNews,
        'latestMagang' => $latestMagang,
        'latestLoker' => $latestLoker,
        'latestSeminar' => $latestSeminar,
        'latestTips' => $latestTips,
        'latestSertifikasi' => $latestSertifikasi,
        'templates' => $latestTemplates,
    ]);
})->name('welcome');

Route::get('/api/statistik-layanan', [StatistikLayananController::class, 'index'])
    ->name('api.statistik.layanan');

Route::get('/layanan/cv-template/{id}/download', [CvReviewController::class, 'downloadTemplate'])
    ->name('layanan.cv.template.download');

// Profil (PUBLIC)
Route::get('/profil/puskaka', [ProfilPuskakaController::class, 'index'])->name('profil.puskaka');

Route::get('/profil-konselor', [ProfilKonselorController::class, 'index'])
    ->name('profil.konselor');

Route::get('/profil/developer', [DeveloperController::class, 'index'])->name('profil.developer');

Route::get('/layanan/konsultasi', [KonsultasiController::class, 'index'])->name('layanan.konsultasi');
Route::get('/layanan/konsultasi/auth', [KonsultasiController::class, 'redirectLogin'])->name('layanan.konsultasi.auth');

Route::prefix('layanan')->name('layanan.')->group(function () {
    // Landing Page CV Review (Public)
    Route::get('/cv-review', [CvReviewController::class, 'index'])
        ->name('cv.review');
    Route::get('/cv-review/auth', [CvReviewController::class, 'redirectLogin'])
        ->name('cv.review.auth');
});

Route::get('/layanan/tes-minat-bakat', [RiasecTestController::class, 'index'])
    ->name('layanan.tes.minat.bakat');

Route::prefix('program')->name('program.')->group(function () {
    // ODK
    Route::get('/orientasi-dunia-kerja', [OrientasiDuniaKerjaController::class, 'index'])->name('odk.index');
    // Seminar
    Route::get('/seminar', [SeminarController::class, 'index'])->name('seminar');

    // Campus Hiring
    Route::get('/campus-hiring', [CampusHiringController::class, 'index'])->name('campus.hiring');

    // Tips & Trik
    Route::get('/tips-dan-trik', [TipsDanTrikController::class, 'index'])->name('tips-dan-trik');

    // Berita
    Route::get('/berita', [BeritaController::class, 'index'])->name('berita');
});

Route::get('/peluang-karir/sertifikasi', [SertifikasiController::class, 'index'])
    ->name('sertifikasi.index');
// Route Peluang Karir - Index Magang
Route::get('/peluang-karir/magang', [MagangController::class, 'index'])->name('magang.index');
Route::get('/peluang-karir/lowongan-kerja', [LokerController::class, 'index'])->name('loker.index');

// GROUP AUTH
Route::middleware(['auth', 'verified'])->group(function () {
    // Profil Akun
    Route::get('/complete-profile', [ProfileCompletionController::class, 'show'])->name('profile.complete');
    Route::post('/complete-profile', [ProfileCompletionController::class, 'store'])->name('profile.complete.store');

    // GET - Ambil semua events
    Route::get('/api/calendar/events', [CalendarController::class, 'getEvents']);

    // GET - Ambil events by date
    Route::get('/api/calendar/events/{date}', [CalendarController::class, 'getEventsByDate']);

    // POST - Tambah event baru
    Route::post('/api/calendar/events', [CalendarController::class, 'store']);

    // PUT - Update event
    Route::put('/api/calendar/events/{id}', [CalendarController::class, 'update']);

    // DELETE - Hapus event
    Route::delete('/api/calendar/events/{id}', [CalendarController::class, 'destroy']);

    // Akses yang sudah melengkapi profil
    Route::middleware(['check.profile'])->group(function () {
        // Beranda
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::get('/akun', [ProfileController::class, 'show'])->name('profile.show');
        Route::get('/akun/edit', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::post('/akun/update', [ProfileController::class, 'update'])->name('profile.update');
        Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
        Route::get('/layanan/konsultasi/booking', [KonsultasiController::class, 'showBookingForm'])->name('konsultasi.booking');
        Route::post('/layanan/konsultasi/submit', [KonsultasiController::class, 'store'])->name('konsultasi.submit');

        // LIST RIWAYAT
        Route::get('/layanan/konsultasi/riwayat', [KonsultasiController::class, 'userList'])->name('konsultasi.list');

        // DETAIL KONSULTASI (Harus ada parameter ID)
        Route::get('/layanan/konsultasi/riwayat/{id}', [KonsultasiController::class, 'show'])->name('konsultasi.show');

        Route::post('/layanan/konsultasi/cancel/{id}', [KonsultasiController::class, 'cancel'])->name('konsultasi.cancel');

        // AREA KONSELOR
        Route::prefix('konselor')->name('konselor.')->group(function () {
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

        // Route Peluang Karir - Detail Sertifikasi
        Route::get('/peluang-karir/sertifikasi/{id}', [SertifikasiController::class, 'show'])
            ->name('sertifikasi.show');

        // Route Peluang Karir - Detail Magang
        Route::get('/peluang-karir/magang/{slug}', [MagangController::class, 'show'])->name('magang.show');

        // Route Peluang Karir - Detail Lowongan Kerja
        Route::get('/peluang-karir/lowongan-kerja/{slug}', [LokerController::class, 'show'])->name('loker.show');

        // Detail Program
        Route::prefix('program')->name('program.')->group(function () {
            Route::get('/orientasi-dunia-kerja/{id}/{slug}', [OrientasiDuniaKerjaController::class, 'show'])->name('odk.show');
            Route::get('/seminar/{id}/{slug}', [SeminarController::class, 'show'])->name('seminar.show');
            Route::get('/campus-hiring/{id}/{slug}', [CampusHiringController::class, 'show'])->name('campus.hiring.show');
            Route::get('/tips-dan-trik/{id}/{slug}', [TipsDanTrikController::class, 'show'])->name('tips-dan-trik.show');
        });

        Route::get('/berita/{id}/{slug}', [BeritaController::class, 'show'])->name('berita.show');

        Route::prefix('layanan')->name('layanan.')->group(function () {
            // CV REVIEW
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

        // Halaman Kuis (Saat klik "Mulai Tes")
        Route::get('/layanan/tes-riasec', [RiasecTestController::class, 'quiz'])
            ->name('riasec.quiz');

        // API & Submit Data
        Route::get('/layanan/tes-minat-bakat/questions', [RiasecTestController::class, 'getQuestions'])->name('riasec.questions');
        Route::post('/layanan/tes-minat-bakat/submit', [RiasecTestController::class, 'submitTest'])->name('riasec.submit');
        Route::get('/layanan/tes-minat-bakat/history', [RiasecTestController::class, 'history'])->name('riasec.history');

        // Route untuk logout
        Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
            ->middleware('auth')
            ->name('logout');
    });
});

require __DIR__.'/auth.php';
