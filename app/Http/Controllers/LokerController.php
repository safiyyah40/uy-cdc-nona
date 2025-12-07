<?php

namespace App\Http\Controllers;

use App\Models\Loker;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class LokerController extends Controller
{
    public function index(Request $request)
    {
        $isGuest = !Auth::check();
        $query = Loker::where('is_active', true)->where('deadline', '>=', now());

        // Filter
        $categoriesList = Loker::where('is_active', true)->get()->pluck('categories')->flatten()->unique()->sort()->values();
        $locationsList = Loker::where('is_active', true)->pluck('location')->unique()->sort()->values();

        // Apply Filters
        if (!$isGuest) {
            if ($request->search) {
                $query->where(function($q) use ($request) {
                    $q->where('title', 'like', '%' . $request->search . '%')
                      ->orWhere('company', 'like', '%' . $request->search . '%');
                });
            }
            if ($request->category && $request->category !== 'all') $query->whereJsonContains('categories', $request->category);
            if ($request->location && $request->location !== 'all') $query->where('location', $request->location);
        }

        // Hitung total data (sebelum limit guest)
        $total = Loker::where('is_active', true)
            ->where('deadline', '>=', now())
            ->count();

        // Pagination Logic
        if ($isGuest) {
            $lokers = $query->latest('posted_date')->take(6)->get();
            $pagination = null;
            $filters = null;
        } else {
            $perPage = $request->input('per_page', 12);
            $paginated = $query->latest('posted_date')->paginate((int)$perPage)->withQueryString();
            $lokers = $paginated->items();
            $pagination = [
                'current_page' => $paginated->currentPage(),
                'last_page' => $paginated->lastPage(),
                'from' => $paginated->firstItem(),
                'to' => $paginated->lastItem(),
                'total' => $paginated->total(),
                'links' => $paginated->linkCollection()->toArray(),
            ];
            $filters = $request->all();
        }

        // Mapping Data untuk konsistensi frontend
        $lokers = collect($lokers)->map(function ($item) {
            if (is_string($item->categories)) {
                $item->categories = json_decode($item->categories, true) ?? [];
            }
            return $item;
        });

        return Inertia::render('PeluangKarir/Loker/IndexLoker', [
            'lokers' => $lokers,
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
        $loker = Loker::where('slug', $slug)->where('is_active', true)->firstOrFail();
        if (is_string($loker->categories)) {
            $loker->categories = json_decode($loker->categories, true) ?? [];
        }

        return Inertia::render('PeluangKarir/Loker/DetailLoker', [
            'loker' => $loker,
            'auth' => [
                'user' => Auth::user()
            ]
        ]);
    }
}