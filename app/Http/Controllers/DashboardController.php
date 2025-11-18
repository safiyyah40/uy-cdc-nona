<?php

namespace App\Http\Controllers;

use App\Models\BerandaSlide;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
{
    $user = Auth::user();

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

    return Inertia::render('Dashboard', [
        'auth' => [
            'user' => $user,    // bisa null kalau guest, DAN ITU NORMAL
        ],
        'slides' => $slides,
    ]);
}

}
