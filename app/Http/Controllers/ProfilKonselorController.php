<?php

namespace App\Http\Controllers;

use App\Models\Counselor;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class ProfilKonselorController extends Controller
{
    private function getCounselorsData()
    {
        Carbon::setLocale('id');

        $counselors = Counselor::where('is_active', true)
            ->orderBy('order_column', 'asc')
            ->with(['slots' => function ($q) {
                $q->whereDate('date', '>=', now())
                  ->orderBy('date', 'asc')
                  ->orderBy('start_time', 'asc');
            }])
            ->get();

        return $counselors->map(function ($c) {
            return [
                'id' => $c->id,
                'name' => $c->name,
                'title' => $c->title,
                'photo_url' => $c->photo_url,
                'slots' => $c->slots->map(function ($slot) {
                    return [
                        'id' => $slot->id,
                        'date_string' => Carbon::parse($slot->date)->translatedFormat('l, d F Y'),
                        'time_string' => Carbon::parse($slot->start_time)->format('H.i')
                            . ' - ' . Carbon::parse($slot->end_time)->format('H.i'),
                    ];
                }),
            ];
        });
    }

    private function getPublicCounselors()
    {
        return Counselor::where('is_active', true)
            ->orderBy('order_column', 'asc')
            ->get(['id', 'name', 'title', 'photo_path'])
            ->map(fn ($c) => [
                'id' => $c->id,
                'name' => $c->name,
                'title' => $c->title,
                'photo_url' => $c->photo_url, 
                'slots' => [], 
            ]);
    }

    public function index()
    {
        $counselors = $this->getPublicCounselors();

        return Inertia::render('Profil/ProfilKonselor', [
            'counselors' => $counselors,
            'auth' => ['user' => Auth::user()],
        ]);
    }

    public function layanan()
    {
        $counselors = Auth::check()
            ? $this->getCounselorsData()
            : $this->getPublicCounselors();

        return Inertia::render('Layanan/Konsultasi/Mahasiswa/Konsultasi', [
            'auth' => ['user' => Auth::user()],
            'counselors' => $counselors,
        ]);
    }
}