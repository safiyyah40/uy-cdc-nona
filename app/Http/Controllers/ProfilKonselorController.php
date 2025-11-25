<?php

namespace App\Http\Controllers;

use App\Models\Counselor;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class ProfilKonselorController extends Controller
{
    private function getCounselorsData()
    {
        Carbon::setLocale('id'); 
        return Counselor::where('is_active', true)
            ->with(['slots' => function($query) {
                $query->orderBy('date', 'asc')->orderBy('start_time', 'asc');
                $query->whereDate('date', '>=', now());
            }])
            ->orderBy('order_column', 'asc')
            ->get()
            ->map(function ($counselor) {
                return [
                    'id' => $counselor->id,
                    'name' => $counselor->name,
                    'title' => $counselor->title,
                    'photo_url' => $counselor->photo_url,
                    'slots' => $counselor->slots->map(function($slot) {
                        return [
                            'date_string' => Carbon::parse($slot->date)->translatedFormat('l, d F Y'),
                            'time_string' => Carbon::parse($slot->start_time)->format('H.i') . ' - ' . Carbon::parse($slot->end_time)->format('H.i')
                        ];
                    }),
                ];
            });
    }

    public function index()
    {
        return Inertia::render('Profil/ProfilKonselor', [
            'counselors' => $this->getCounselorsData(),
        ]);
    }

    public function layanan()
    {
        return Inertia::render('Layanan/Konsultasi', [
            'counselors' => $this->getCounselorsData(),
        ]);
    }
}