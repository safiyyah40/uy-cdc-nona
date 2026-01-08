<?php

namespace App\Http\Controllers;

use App\Models\TipsDanTrik;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class TipsDanTrikController extends Controller
{
    public function index(Request $request)
    {
        $query = TipsDanTrik::query()
            ->where('is_active', true)
            ->whereDate('published_at', '<=', now());

        // --- FILTER PENCARIAN ---
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('summary', 'like', "%{$search}%")
                  ->orWhere('category', 'like', "%{$search}%");
            });
        }

        // --- FILTER KATEGORI ---
        if ($request->has('category') && $request->category != '') {
            $query->where('category', $request->category);
        }

        // --- LOGIC GUEST VS USER ---
        $isGuest = !Auth::check();
        
        // Jika Tamu: Limit 4. Jika User: Default 12 (atau sesuai input)
        $limit = $isGuest ? 4 : ($request->input('per_page', 12));

        $tips = $query->orderBy('published_at', 'desc')
                      ->paginate($limit)
                      ->withQueryString();

        // --- TRANSFORM DATA (Format Gambar & Tanggal) ---
        $tips->getCollection()->transform(function ($item) {
            return [
                'id' => $item->id,
                'title' => $item->title,
                'slug' => $item->slug,
                'summary' => $item->summary,
                'category' => $item->category,
                'reading_time' => $item->reading_time . ' menit',
                'image_url' => $item->thumbnail ? Storage::url($item->thumbnail) : null,
                'published_at' => $item->published_at
                    ? $item->published_at->format('d M Y')
                    : null,
            ];
        });

        // --- LIST KATEGORI UNIK (Untuk Dropdown Filter) ---
        $categories = TipsDanTrik::where('is_active', true)
            ->select('category')
            ->distinct()
            ->pluck('category');

        return Inertia::render('Program/TipsDanTrik/IndexTipsDanTrik', [
            'tips' => $tips,
            'filters' => $request->only(['search', 'category', 'per_page']),
            'isGuest' => $isGuest,
            'categories' => $categories,
            'total' => TipsDanTrik::where('is_active', true)->count(),
        ]);
    }

    public function show($id, $slug)
    {
        if (!Auth::check()) {
             return redirect()->route('login');
        }

        $tip = TipsDanTrik::where('id', $id)
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        $data = [
            'id' => $tip->id,
            'title' => $tip->title,
            'slug' => $tip->slug,
            'description' => $tip->summary,
            'content' => $tip->content,
            'category' => $tip->category,
            'reading_time' => $tip->reading_time . ' menit',
            'image_url' => $tip->thumbnail ? Storage::url($tip->thumbnail) : null,
            'formatted_date' => $tip->published_at 
                ? $tip->published_at->format('d F Y') 
                : null,
        ];

        return Inertia::render('Program/TipsDanTrik/DetailTipsDanTrik', [
            'tip' => $data,
        ]);
    }
}