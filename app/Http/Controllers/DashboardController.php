<?php

namespace App\Http\Controllers;

use App\Models\BerandaSlide;
use App\Models\Berita;
use App\Models\Magang;
use App\Models\Loker;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
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

    return Inertia::render('Dashboard', [
        'auth' => [
            'user' => $user,
        ],
        'slides' => $slides,
        'latestNews' => $latestNews,
        'latestMagang' => $latestMagang,
        'latestLoker' => $latestLoker,
    ]);
}
}