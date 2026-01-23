<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Helpers\ActivityLogger;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();
        $request->session()->regenerate();

        $user = Auth::user();

        // Cek apakah ada URL yang dituju sebelumnya (intended)
        // filter: jika tujuannya adalah /admin, kita arahkan ke / dulu agar tidak "kaget"
        if (session()->has('url.intended') && ! str_contains(session('url.intended'), '/admin')) {
            return redirect()->intended();
        }

        // Cek kelengkapan profil
        if ($user->needsProfileCompletion()) {
            return redirect()->route('profile.complete');
        }

        // SEMUA USER (termasuk Admin) diarahkan ke Beranda Utama dulu
        return redirect()->route('dashboard');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        ActivityLogger::logLogout();
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
