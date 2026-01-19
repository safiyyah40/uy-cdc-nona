<?php

namespace App\Http\Controllers;

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
        $latestODK = OrientasiDuniaKerja::where('is_active', true)
            ->orderBy('date', 'desc')
            ->take(3)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'judul' => $item->title,
                    'slug' => $item->slug,
                    'kategori' => is_array($item->categories) ? ($item->categories[0] ?? 'General') : $item->categories,
                    'deskripsi' => $item->description,
                    'imageUrl' => $item->image ? Storage::url($item->image) : '/images/odk.jpg',
                    'date' => $item->date ? $item->date->format('d M Y') : 'Jadwal Menyusul',
                    'location' => $item->location,
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

        $templates = CvTemplate::where('is_active', true)
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

        return Inertia::render('Dashboard', [
            'auth' => [
                'user' => $user,
            ],
            'slides' => $slides,
            'latestODK' => $latestODK,
            'latestCampusHiring' => $latestHiring,
            'latestSeminar' => $latestSeminar,
            'latestTips' => $latestTips,
            'latestNews' => $latestNews,
            'latestMagang' => $latestMagang,
            'latestLoker' => $latestLoker,
            'latestSertifikasi' => $latestSertifikasi,
            'templates' => $templates,
        ]);
    }
}
