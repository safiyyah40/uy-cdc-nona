<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Berita;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class BeritaController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        $query = Berita::active()->latest();

        if ($user) {
            // --- JIKA USER LOGIN (Full Akses) ---
            $perPage = $request->input('per_page', 12);
            $search = $request->input('search', '');

            // Search & Pagination
            $berita = $query->when($search, function ($q, $search) {
                    $q->where(function($sub) use ($search) {
                        $sub->where('title', 'like', "%{$search}%")
                            ->orWhere('description', 'like', "%{$search}%");
                    });
                })
                ->paginate($perPage)
                ->through(fn ($item) => $this->formatBerita($item));
        } else {
            // --- JIKA TAMU (Hanya 4 Teratas) ---
            $items = $query->take(4)->get();

            $berita = [
                'data' => $items->map(fn ($item) => $this->formatBerita($item)),
                'links' => [],
                'total' => 4,
                'from' => 1,
                'to' => 4,
                'is_guest_limit' => true 
            ];
            
            $search = '';
            $perPage = 4;
        }

        return Inertia::render('Berita/BeritaIndex', [
            'berita' => $berita,
            'filters' => [
                'search' => $search,
                'per_page' => $perPage,
            ],
            'isLoggedIn' => !!$user 
        ]);
    }

    private function formatBerita($item)
    {
        return [
            'id' => $item->id,
            'title' => $item->title,
            'slug' => $item->slug,
            'description' => $item->description,
            'image_url' => $item->image ? asset('storage/'.$item->image) : asset('images/berita.jpeg'),
            'formatted_date' => $item->published_date 
                ? Carbon::parse($item->published_date)->translatedFormat('d F Y') 
                : '-',
            'views' => $item->views,
        ];
    }

    public function show($id, $slug)
    {
        $berita = Berita::active()->findOrFail($id);

        if ($berita->slug !== $slug) {
            return to_route('berita.show', ['id' => $berita->id, 'slug' => $berita->slug]);
        }
        $berita->increment('views');

        return Inertia::render('Berita/DetailBerita', [
            'berita' => [
                'id' => $berita->id,
                'title' => $berita->title,
                'slug' => $berita->slug,
                'description' => $berita->description,
                'content' => $berita->content,
                'image_url' => $berita->image ? asset('storage/'.$berita->image) : asset('images/berita.jpeg'),
                'published_date' => $berita->published_date,
                'formatted_date' => $berita->published_date 
                    ? Carbon::parse($berita->published_date)->translatedFormat('l, d F Y') 
                    : '-',
                'views' => $berita->views,
                'images' => isset($berita->images) 
                    ? collect($berita->images)->map(fn($img) => asset('storage/'.$img))->toArray() 
                    : [],
            ],
            'relatedNews' => [],
        ]);
    }
}