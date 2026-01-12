<?php

namespace App\Http\Controllers;

use App\Models\CampusHiring;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CampusHiringController extends Controller
{
    /**
     * Helper untuk format data agar seragam
     */
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
            'imageSrc' => $program->image
            ? (str_starts_with($program->image, 'http')
                ? $program->image
                : asset('storage/'.$program->image))
            : asset('images/campushiring.jpg'),
            'registration_link' => $program->registration_link ?? '#',
        ];
    }

    public function index(Request $request)
    {
        $user = $request->user();

        // --- BASE QUERY ---
        $query = CampusHiring::active()->latest('date');

        // --- FILTER SEARCH ---
        if ($request->has('search') && ! empty($request->search)) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('title', 'like', "%{$searchTerm}%")
                    ->orWhere('company_name', 'like', "%{$searchTerm}%")
                    ->orWhere('description', 'like', "%{$searchTerm}%")
                    ->orWhere('location', 'like', "%{$searchTerm}%");
            });
        }

        // --- LOGIC GUEST vs USER ---
        if (! $user) {
            // GUEST: Ambil 4 data terbaru saja
            $programs = $query->take(4)->get()->map(fn ($p) => $this->formatProgram($p));

            return Inertia::render('Program/CampusHiring/IndexCampusHiring', [
                'programs' => $programs,
                'isGuest' => true,
                'total' => CampusHiring::active()->count(),
                'filters' => [],
                'pagination' => null,
            ]);
        } else {
            // USER LOGIN: Pagination
            $perPage = $request->input('per_page', 8);
            if ($perPage === 'all') {
                // Tampilkan Semua
                $programs = $query->get()->map(fn ($p) => $this->formatProgram($p));

                return Inertia::render('Program/CampusHiring/IndexCampusHiring', [
                    'programs' => $programs,
                    'isGuest' => false,
                    'total' => $programs->count(),
                    'filters' => [
                        'search' => $request->search,
                        'per_page' => $perPage,
                    ],
                    'pagination' => null, // Tidak ada pagination link
                ]);
            } else {
                // Pagination Normal
                $programsRaw = $query->paginate((int) $perPage)->withQueryString();

                // Transform data di dalam collection pagination
                $programsData = $programsRaw->getCollection()->map(fn ($p) => $this->formatProgram($p));

                return Inertia::render('Program/CampusHiring/IndexCampusHiring', [
                    'programs' => $programsData,
                    'isGuest' => false,
                    'total' => $programsRaw->total(),
                    'filters' => [
                        'search' => $request->search,
                        'per_page' => $perPage,
                    ],
                    // Kirim info pagination terpisah
                    'pagination' => [
                        'current_page' => $programsRaw->currentPage(),
                        'last_page' => $programsRaw->lastPage(),
                        'per_page' => $programsRaw->perPage(),
                        'total' => $programsRaw->total(),
                        'from' => $programsRaw->firstItem(),
                        'to' => $programsRaw->lastItem(),
                        'links' => $programsRaw->linkCollection()->toArray(),
                    ],
                ]);
            }
        }
    }

    public function show(Request $request, $id, $slug)
    {
        if (! Auth::check()) {
            return redirect()->guest(route('login'))->with('message', 'Silakan login terlebih dahulu.');
        }

        $program = CampusHiring::where('id', $id)
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return Inertia::render('Program/CampusHiring/DetailCampusHiring', [
            'campusHiring' => $this->formatProgram($program),
        ]);
    }
}
