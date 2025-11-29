<?php

namespace App\Http\Controllers;

use App\Models\CampusHiring;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CampusHiringController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        // TAMU (tidak login)
        if (!$user) {
            $programs = CampusHiring::active()
                ->latest()
                ->take(4)
                ->get()
                ->map(function ($program) {
                    return [
                        'id' => $program->id,
                        'slug' => $program->slug,
                        'title' => $program->title,
                        'subtitle' => $program->company,
                        'description' => $program->description,
                        'imageSrc' => $program->image ? asset('storage/' . $program->image) : asset('images/campushiring.jpg'),
                    ];
                });

            return Inertia::render('Program/CampusHiring', [
                'programs' => $programs->toArray(),
                'pagination' => null,
                'filters' => null,
                'isGuest' => true,
                'total' => CampusHiring::active()->count(),
            ]);
        }

        // USER LOGIN
        $query = CampusHiring::active()->latest();

        if ($request->has('search') && !empty($request->search)) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('title', 'like', "%{$searchTerm}%")
                  ->orWhere('company', 'like', "%{$searchTerm}%")
                  ->orWhere('description', 'like', "%{$searchTerm}%")
                  ->orWhere('location', 'like', "%{$searchTerm}%");
            });
        }

        $perPage = $request->input('per_page', 8);
        
        if ($perPage === 'all') {
            $programs = $query->get();
            $programsData = $programs->map(function ($program) {
                return [
                    'id' => $program->id,
                    'slug' => $program->slug,
                    'title' => $program->title,
                    'subtitle' => $program->company,
                    'description' => $program->description,
                    'imageSrc' => $program->image ? asset('storage/' . $program->image) : asset('images/campushiring.jpg'),
                    'date' => $program->date->format('Y-m-d'),
                    'location' => $program->location,
                ];
            })->toArray();

            return Inertia::render('Program/CampusHiring', [
                'programs' => $programsData,
                'pagination' => null,
                'filters' => [
                    'search' => $request->search,
                    'per_page' => $perPage,
                ],
                'isGuest' => false,
                'total' => null,
            ]);
        } else {
            $programs = $query->paginate((int) $perPage)->withQueryString();
            $programsData = collect($programs->items())->map(function ($program) {
                return [
                    'id' => $program->id,
                    'slug' => $program->slug,
                    'title' => $program->title,
                    'subtitle' => $program->company,
                    'description' => $program->description,
                    'imageSrc' => $program->image ? asset('storage/' . $program->image) : asset('images/campushiring.jpg'),
                    'date' => $program->date->format('Y-m-d'),
                    'location' => $program->location,
                ];
            })->toArray();

            return Inertia::render('Program/CampusHiring', [
                'programs' => $programsData,
                'pagination' => [
                    'current_page' => $programs->currentPage(),
                    'last_page' => $programs->lastPage(),
                    'per_page' => $programs->perPage(),
                    'total' => $programs->total(),
                    'from' => $programs->firstItem(),
                    'to' => $programs->lastItem(),
                ],
                'filters' => [
                    'search' => $request->search,
                    'per_page' => $perPage,
                ],
                'isGuest' => false,
                'total' => null,
            ]);
        }
    }

    public function show(Request $request, $id, $slug)
    {
        if (!$request->user()) {
            return redirect()->route('login')->with('message', 'Silakan login terlebih dahulu untuk melihat detail program.');
        }

        $program = CampusHiring::where('id', $id)
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        $programData = [
            'id' => $program->id,
            'slug' => $program->slug,
            'title' => $program->title,
            'company' => $program->company,
            'location' => $program->location,
            'date' => $program->date->format('Y-m-d'),
            'time' => $program->time,
            'description' => $program->description,
            'content' => $program->content,
            'imageSrc' => $program->image ? asset('storage/' . $program->image) : asset('images/campushiring.jpg'),
            'registration_link' => $program->registration_link ?? '#',
        ];

        return Inertia::render('Program/DetailCampusHiring', [
            'campusHiring' => $programData,
        ]);
    }
}