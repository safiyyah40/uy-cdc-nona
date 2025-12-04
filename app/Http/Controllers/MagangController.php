<?php

namespace App\Http\Controllers;

use App\Models\Magang;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class MagangController extends Controller
{
    public function index(Request $request)
    {
        $isGuest = !Auth::check();

        // Query dasar: hanya yang aktif & deadline belum lewat
        $query = Magang::where('is_active', true)
            ->where('deadline', '>=', now());

        // AMBIL SEMUA KATEGORI UNIK UNTUK FILTER 
        $categoriesList = Magang::where('is_active', true)
            ->where('deadline', '>=', now())
            ->get()
            ->pluck('categories')
            ->flatten()
            ->unique()
            ->sort()
            ->values()
            ->all();

        // AMBIL SEMUA LOKASI UNIK  UNTUK FILTER 
        $locationsList = Magang::where('is_active', true)
            ->where('deadline', '>=', now())
            ->pluck('location')
            ->unique()
            ->sort()
            ->values()
            ->all();

        // Apply filters (Hanya untuk user login)
        if (!$isGuest) {
            if ($request->search) {
                $query->where(function ($q) use ($request) {
                    $q->where('title', 'like', '%' . $request->search . '%')
                        ->orWhere('company', 'like', '%' . $request->search . '%');
                });
            }

            if ($request->category && $request->category !== 'all') {
                $query->whereJsonContains('categories', $request->category);
            }

            if ($request->location && $request->location !== 'all') {
                $query->where('location', 'like', '%' . $request->location . '%');
            }
        }

        // Hitung total data (sebelum limit guest)
        $total = Magang::where('is_active', true)
            ->where('deadline', '>=', now())
            ->count();

        // Logic Guest dan User
        if ($isGuest) {
            // Guest: Ambil 6 data terbaru saja
            $magangsData = $query->latest('posted_date')->limit(6)->get();
            $pagination = null;
            $filters = null;
        } else {
            // Authenticated: Full features + Pagination
            $perPage = $request->get('per_page', 12);

            if ($perPage === '1000' || $perPage === 'all') {
                $magangsData = $query->latest('posted_date')->get();
                $pagination = null;
            } else {
                $paginated = $query->latest('posted_date')->paginate((int) $perPage)->withQueryString();
                $magangsData = $paginated->items();

                // Struktur pagination manual untuk Inertia
                $pagination = [
                    'current_page' => $paginated->currentPage(),
                    'last_page' => $paginated->lastPage(),
                    'from' => $paginated->firstItem(),
                    'to' => $paginated->lastItem(),
                    'total' => $paginated->total(),
                    'links' => $paginated->linkCollection()->toArray(),
                ];
            }

            $filters = [
                'search' => $request->search,
                'category' => $request->category,
                'location' => $request->location,
                'per_page' => $perPage,
            ];
        }

        // Mapping Data (Agar sesuai dengan props Frontend)
        $magangs = collect($magangsData)->map(function ($item) {
            return [
                'id' => $item->id,
                'slug' => $item->slug,
                'title' => $item->title,
                'company' => $item->company,
                'location' => $item->location,
                'type' => $item->type,
                'categories' => $item->categories,
                'deadline' => $item->deadline ? $item->deadline->format('Y-m-d') : null,
                'posted_date' => $item->posted_date,
                'logo' => $item->logo,
                'salary_min' => $item->salary_min,
                'salary_max' => $item->salary_max,
            ];
        })->toArray(); // Ubah jadi array biasa

        return Inertia::render('PeluangKarir/Magang/IndexMagang', [
            'magangs' => $magangs,
            'pagination' => $pagination,
            'filters' => $filters,
            'isGuest' => $isGuest,
            'total' => $total,
            'categoriesList' => $categoriesList,
            'locationsList' => $locationsList,
        ]);
    }

    public function show($slug)
    {
        $magang = Magang::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        // Transform data detail jika perlu (opsional, tapi rapi)
        $magangData = [
            'id' => $magang->id,
            'title' => $magang->title,
            'company' => $magang->company,
            'location' => $magang->location,
            'type' => $magang->type,
            'categories' => $magang->categories,
            'deadline' => $magang->deadline ? $magang->deadline->format('Y-m-d') : null,
            'posted_date' => $magang->posted_date,
            'logo' => $magang->logo,
            'description' => $magang->description,
            'requirements' => $magang->requirements,
            'benefits' => $magang->benefits,
            'application_url' => $magang->application_url,
            'salary_min' => $magang->salary_min,
            'salary_max' => $magang->salary_max,
        ];

        return Inertia::render('PeluangKarir/Magang/DetailMagang', [
            'magang' => $magangData,
        ]);
    }
}
