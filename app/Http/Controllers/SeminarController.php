<?php

namespace App\Http\Controllers;

use App\Models\Seminar;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class SeminarController extends Controller
{
    public function index(Request $request)
    {
        Carbon::setLocale('id');
        $isGuest = !Auth::check();

        // Base Query
        $query = Seminar::active()->latest('date');

        // --- LOGIKA FILTER ---
        if (!$isGuest) {
            if ($request->has('search')) {
                $search = $request->input('search');
                $query->where(function($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('speaker', 'like', "%{$search}%")
                      ->orWhere('location', 'like', "%{$search}%");
                });
            }
        }

        // --- PAGINATION VS LIMIT ---
        if ($isGuest) {
            // Tamu: Ambil 6 data terbaru saja
            $seminarsRaw = $query->take(6)->get();
            $pagination = null; 
        } else {
            // User: Gunakan Pagination
            $perPage = $request->input('per_page', 12);
            // Jika 'all', ambil angka besar
            $limit = $perPage === 'all' ? 1000 : $perPage;
            
            $seminarsRaw = $query->paginate($limit)->withQueryString();
        }

        // --- TRANSFORM DATA ---
        // Fungsi format data agar seragam
        $formatData = function ($seminar) {
            return [
                'id' => $seminar->id,
                'slug' => $seminar->slug,
                'image_url' => $seminar->image ? Storage::url($seminar->image) : null, 
                'title' => $seminar->title,
                'date' => $seminar->date->translatedFormat('l, d F Y'),
                'time' => Carbon::parse($seminar->time)->format('H:i') . ' WIB',
                'location' => $seminar->location,
                'type' => $seminar->type,
                'posted_at' => $seminar->created_at->diffForHumans(),
            ];
        };

        if ($isGuest) {
            // Jika Guest, $seminarsRaw adalah Collection
            $seminarsData = $seminarsRaw->map($formatData);
        } else {
            // Jika User, $seminarsRaw adalah Paginator
            $seminarsData = $seminarsRaw->getCollection()->map($formatData);
            
            $pagination = [
                'current_page' => $seminarsRaw->currentPage(),
                'last_page' => $seminarsRaw->lastPage(),
                'from' => $seminarsRaw->firstItem(),
                'to' => $seminarsRaw->lastItem(),
                'total' => $seminarsRaw->total(),
                'links' => $seminarsRaw->linkCollection()->toArray(),
            ];
        }

        // Hitung total seluruh data untuk info ke Guest
        $totalAll = Seminar::active()->count();

        
        return Inertia::render('Seminar/IndexSeminar', [
            'seminars' => $seminarsData,
            'pagination' => $pagination ?? null,
            'filters' => $request->only(['search', 'per_page']),
            'isGuest' => $isGuest,
            'total' => $totalAll,
        ]);
    }

    public function show($id, $slug)
    {
        Carbon::setLocale('id');
        if (!Auth::check()) {
             return redirect()->route('login');
        }

        $seminarData = Seminar::where('id', $id)->where('slug', $slug)->firstOrFail();

        $seminar = [
            'id' => $seminarData->id,
            'title' => $seminarData->title,
            'slug' => $seminarData->slug,
            'date' => $seminarData->date->translatedFormat('l, d F Y'),
            'time' => Carbon::parse($seminarData->time)->format('H:i') . ' WIB',
            'speaker' => $seminarData->speaker,
            'organizer' => $seminarData->organizer,
            'location' => $seminarData->location,
            'type' => $seminarData->type,
            'description' => $seminarData->description,
            'benefits' => $seminarData->benefits,
            'content' => $seminarData->content,
            'registration_link' => $seminarData->registration_link,
            'posted_at' => $seminarData->created_at->diffForHumans(),
            'image_url' => $seminarData->image ? Storage::url($seminarData->image) : null,
            'images' => $seminarData->image ? [Storage::url($seminarData->image)] : [],
        ];
        return Inertia::render('Seminar/DetailSeminar', [
            'seminar' => $seminar,
        ]);
    }
}