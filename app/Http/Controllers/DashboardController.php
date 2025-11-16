<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Cek apakah profil belum lengkap
        if (!$user->is_profile_complete) {
            return redirect()->route('profile.complete');
        }

        // Kalau sudah lengkap, akan menampilkan Dashboard
        return Inertia::render('Dashboard', [
            'auth' => [
                'user' => $user,
            ],
        ]);
    }
}
