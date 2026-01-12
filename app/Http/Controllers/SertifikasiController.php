<?php

namespace App\Http\Controllers;

use App\Models\Sertifikasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; 
use Inertia\Inertia;

class SertifikasiController extends Controller
{
    public function index(Request $request)
    {
        $isGuest = !Auth::check();

        $query = Sertifikasi::query();
        
        // Base query: hanya yang Published dan published_at sudah lewat
        $query = Sertifikasi::query()
            ->where('status', 'Published')
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());

        // total
        $total = $query->count();

        // Guest: hanya tampilkan 6 data, no filtering
        if ($isGuest) {
            $sertifikasis = $query->latest('published_at')->limit(6)->get();
            $pagination = null;
            $filters = null;
            $categoriesList = [];
            $providersList = [];
        } else {
            // Apply filters
            if ($request->search) {
                $query->where(function($q) use ($request) {
                    $q->where('title', 'like', '%' . $request->search . '%')
                      ->orWhere('description', 'like', '%' . $request->search . '%')
                      ->orWhere('provider_name', 'like', '%' . $request->search . '%');
                });
            }

            if ($request->category && $request->category !== 'all') {
                $query->whereJsonContains('categories', $request->category);
            }

            if ($request->provider && $request->provider !== 'all') {
                $query->where('provider_name', $request->provider);
            }

            // Get filtered results
            $filteredQuery = clone $query;
            $filteredResults = $filteredQuery->get();

            // Pagination
            $perPage = $request->get('per_page', 12);
            
            if ($perPage === '1000' || $perPage === 'all') {
                // Show all
                $sertifikasis = $filteredResults;
                $pagination = null;
            } else {
                // Paginate
                $perPage = (int) $perPage;
                $page = $request->get('page', 1);
                $offset = ($page - 1) * $perPage;
                
                $sertifikasis = $filteredResults->slice($offset, $perPage)->values();
                
                $totalFiltered = $filteredResults->count();
                $lastPage = ceil($totalFiltered / $perPage);
                
                // Build pagination links
                $links = [];
                
                // Previous
                $links[] = [
                    'url' => $page > 1 ? route('sertifikasi.index', array_merge($request->all(), ['page' => $page - 1])) : null,
                    'label' => '&laquo; Previous',
                    'active' => false,
                ];
                
                // Page numbers
                for ($i = 1; $i <= $lastPage; $i++) {
                    $links[] = [
                        'url' => route('sertifikasi.index', array_merge($request->all(), ['page' => $i])),
                        'label' => (string) $i,
                        'active' => $i === (int) $page,
                    ];
                }
                
                // Next
                $links[] = [
                    'url' => $page < $lastPage ? route('sertifikasi.index', array_merge($request->all(), ['page' => $page + 1])) : null,
                    'label' => 'Next &raquo;',
                    'active' => false,
                ];
                
                $pagination = [
                    'current_page' => (int) $page,
                    'per_page' => $perPage,
                    'total' => $totalFiltered,
                    'last_page' => $lastPage,
                    'from' => $totalFiltered > 0 ? $offset + 1 : 0,
                    'to' => min($offset + $perPage, $totalFiltered),
                    'links' => $links,
                ];
            }
            
            // Get unique categories and providers for filters
            $allSertifikasis = Sertifikasi::where('status', 'Published')->get();
            
            $categoriesList = $allSertifikasis->pluck('categories')
                ->flatten()
                ->unique()
                ->sort()
                ->values()
                ->toArray();
            
            $providersList = $allSertifikasis->pluck('provider_name')
                ->unique()
                ->sort()
                ->values()
                ->toArray();
            
            $filters = [
                'search' => $request->search,
                'category' => $request->category,
                'provider' => $request->provider,
                'per_page' => $perPage,
            ];
        }

        return Inertia::render('PeluangKarir/Sertifikasi/IndexSertifikasi', [
            'sertifikasis' => $sertifikasis,
            'pagination' => $pagination,
            'filters' => $filters,
            'isGuest' => $isGuest,
            'total' => $total,
            'categoriesList' => $categoriesList,
            'providersList' => $providersList,
        ]);
    }

    public function show($id)
    {
        if (!Auth::check()) {
             return redirect()->guest(route('login'));
        }
        
        // Find sertifikasi by id or slug
        $sertifikasi = Sertifikasi::where('id', $id)
            ->orWhere('slug', $id)
            ->where('status', 'Published')
            ->firstOrFail();

        // Increment view count
        $sertifikasi->incrementViewCount();

        return Inertia::render('PeluangKarir/Sertifikasi/DetailSertifikasi', [
            'sertifikasi' => $sertifikasi,
        ]);
    }
}