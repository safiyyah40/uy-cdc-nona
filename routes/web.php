<?php
use App\Models\PuskakaTeam;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProfilPuskakaController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/profil-puskaka', function () {
    $puskakaTeam = PuskakaTeam::where('is_active', true)
                            ->orderBy('sort_order', 'asc')
                            ->get();

    return Inertia::render('ProfilPuskaka', [
        'puskakaTeam' => $puskakaTeam,
    ]);
})->name('profil.puskaka');

// Route untuk halaman profil puskaka
Route::get('/profil-puskaka', [ProfilPuskakaController::class, 'index'])->name('profil.puskaka');

require __DIR__.'/auth.php';
