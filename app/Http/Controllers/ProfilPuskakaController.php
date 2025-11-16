<?php

namespace App\Http\Controllers;

use App\Models\PuskakaTeam;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProfilPuskakaController extends Controller
{
    public function index()
    {
        $teamMembers = PuskakaTeam::where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->get()
            ->map(function ($member) {
                return [
                    'id' => $member->id,
                    'name' => $member->name,
                    'title' => $member->title,
                    'photo_url' => $member->photo_path
                        ? Storage::url($member->photo_path)
                        : asset('images/placeholder-avatar.png'),
                    'sort_order' => $member->sort_order,
                ];
            });

        return Inertia::render('ProfilPuskaka', [
            'teamMembers' => $teamMembers
        ]);
    }
}