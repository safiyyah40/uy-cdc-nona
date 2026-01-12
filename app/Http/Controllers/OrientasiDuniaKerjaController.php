<?php

namespace App\Http\Controllers;

use App\Models\OrientasiDuniaKerja;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;

class OrientasiDuniaKerjaController extends Controller
{
    public function index(Request $request)
    {
        $query = OrientasiDuniaKerja::active()->latest('date');

        // Filter Search (Title atau Deskripsi)
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Filter Category (JSON Search)
        if ($request->filled('category') && $request->category !== 'all') {
            $query->whereJsonContains('categories', $request->category);
        }

        // Filter Location
        if ($request->filled('location') && $request->location !== 'all') {
            $query->where('location', $request->location);
        }

        // Pagination
        $perPage = $request->input('per_page', 9);
        $programs = $query->paginate($perPage)->withQueryString();

        // Ambil Data Unik untuk Filter Dropdown
        $allCategories = OrientasiDuniaKerja::active()->pluck('categories')->flatten()->unique()->values()->all();
        $allLocations = OrientasiDuniaKerja::active()->whereNotNull('location')->pluck('location')->unique()->values()->all();

        // Format Data
        $programsData = $programs->getCollection()->map(function ($item) {
            return [
                'id' => $item->id,
                'slug' => $item->slug,
                'title' => $item->title,
                'categories' => $item->categories,
                'description' => $item->description,
                'imageSrc' => $item->image ? asset('storage/' . $item->image) : '/images/odk.jpg',
                'formatted_date' => $item->date ? Carbon::parse($item->date)->translatedFormat('d F Y') : 'Jadwal Menyusul',
                'location' => $item->location,
            ];
        });

        return Inertia::render('Program/OrientasiDuniaKerja/IndexOrientasiDuniaKerja', [
            'programs' => $programsData,
            'filters' => $request->only(['search', 'per_page', 'category', 'location']),
            'categoriesList' => $allCategories,
            'locationsList' => $allLocations,
            'isGuest' => !Auth::check(),
            'total' => OrientasiDuniaKerja::active()->count(),
            'pagination' => [
                'links' => $programs->linkCollection()->toArray(),
                'from' => $programs->firstItem(),
                'to' => $programs->lastItem(),
                'total' => $programs->total(),
                'last_page' => $programs->lastPage(),
            ],
        ]);
    }

    public function show($id, $slug)
    {
        if (!Auth::check()) {
            return redirect()->guest(route('login'));
        }

        $program = OrientasiDuniaKerja::where('id', $id)
            ->where('slug', $slug)
            ->active()
            ->firstOrFail();

        $data = [
            'id' => $program->id,
            'title' => $program->title,
            'categories' => $program->categories,
            'category' => is_array($program->categories) ? implode(', ', $program->categories) : $program->categories,
            'location' => $program->location ?? 'Online / Menunggu Info',
            'time' => $program->time ?? '-',
            'formatted_date' => $program->date ? Carbon::parse($program->date)->translatedFormat('l, d F Y') : '-',
            'description' => $program->description,
            'content' => $program->content,
            'imageSrc' => $program->image ? asset('storage/' . $program->image) : '/images/odk.jpg',
            'registration_link' => $program->registration_link,
        ];

        return Inertia::render('Program/OrientasiDuniaKerja/DetailOrientasiDuniaKerja', [
            'odkData' => $data,
            'auth' => ['user' => request()->user()]
        ]);
    }
}