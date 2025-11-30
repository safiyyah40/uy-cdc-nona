<?php

namespace App\Http\Controllers;

use App\Models\CampusHiring;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Carbon;

class CampusHiringController extends Controller
{
    /**
     * Helper untuk format data agar seragam & tidak duplikat kode
     */
    // App/Http/Controllers/CampusHiringController.php

private function formatProgram($program)
{
    return [
        'id' => $program->id,
        'slug' => $program->slug,
        'title' => $program->title,
        'company_name' => $program->company_name, 
        'subtitle' => $program->company_name, 
        'location' => $program->location,
        'date' => $program->date ? $program->date->format('Y-m-d') : null,
        'formatted_date' => $program->date ? Carbon::parse($program->date)->translatedFormat('d F Y') : '-',
        'time' => $program->time,
        'description' => $program->description,
        'content' => $program->content,
        'imageSrc' => $program->image ? asset('storage/' . $program->image) : asset('images/campushiring.jpg'),
        'registration_link' => $program->registration_link ?? '#',
    ];
}

    public function index(Request $request)
    {
        $user = $request->user();
        
        // --- LOGIKA TAMU (GUEST) ---
        if (!$user) {
            $programs = CampusHiring::active()
                ->latest('date') // Urutkan berdasarkan tanggal acara terbaru
                ->take(4)
                ->get()
                ->map(fn($p) => $this->formatProgram($p));

            return Inertia::render('Program/CampusHiring', [
                // Bungkus dalam 'data' agar struktur sama dengan pagination
                'programs' => ['data' => $programs], 
                'isGuest' => true,
                'total' => CampusHiring::active()->count(), // Info total program untuk teaser
                'filters' => [],
                'pagination' => null,
            ]);
        }

        // --- LOGIKA USER LOGIN ---
        $query = CampusHiring::active()->latest('date');

        // 1. Search
        if ($request->has('search') && !empty($request->search)) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('title', 'like', "%{$searchTerm}%")
                  ->orWhere('company_name', 'like', "%{$searchTerm}%") // Pakai company_name
                  ->orWhere('description', 'like', "%{$searchTerm}%")
                  ->orWhere('location', 'like', "%{$searchTerm}%");
            });
        }

        // 2. Pagination
        $perPage = $request->input('per_page', 8);

        if ($perPage === 'all') {
            // Tampilkan Semua
            $programs = $query->get()->map(fn($p) => $this->formatProgram($p));
            
            return Inertia::render('Program/CampusHiring', [
                'programs' => ['data' => $programs],
                'isGuest' => false,
                'filters' => [
                    'search' => $request->search,
                    'per_page' => $perPage,
                ],
                'pagination' => null,
            ]);
        } else {
            // Pagination Normal
            $programs = $query->paginate((int) $perPage)->withQueryString();
            
            // Transform data items menggunakan helper
            $programs->through(fn($p) => $this->formatProgram($p));

            return Inertia::render('Program/CampusHiring', [
                'programs' => $programs, // Object pagination lengkap
                'isGuest' => false,
                'filters' => [
                    'search' => $request->search,
                    'per_page' => $perPage,
                ],
                'pagination' => [
                    'current_page' => $programs->currentPage(),
                    'last_page' => $programs->lastPage(),
                    'per_page' => $programs->perPage(),
                    'total' => $programs->total(),
                    'from' => $programs->firstItem(),
                    'to' => $programs->lastItem(),
                    'prev_page_url' => $programs->previousPageUrl(), // Penting untuk tombol prev
                    'next_page_url' => $programs->nextPageUrl(),     // Penting untuk tombol next
                ],
            ]);
        }
    }

    public function show(Request $request, $id, $slug)
    {
        // Cek Login (Double protection selain middleware)
        if (!$request->user()) {
            return redirect()->route('login')->with('message', 'Silakan login terlebih dahulu.');
        }

        $program = CampusHiring::where('id', $id)
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return Inertia::render('Program/DetailCampusHiring', [
            'campusHiring' => $this->formatProgram($program), // Gunakan helper yang sama
        ]);
    }
}