<?php

namespace App\Http\Controllers;

use App\Models\PuskakaTeam;
use App\Models\PuskakaGallery;
use App\Models\ContactInfo;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
class ProfilPuskakaController extends Controller
{
    public function index()
    {
        // Data team members
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
                    'contactInfo' => ContactInfo::getContact()
                ];
            });

        $photos = PuskakaGallery::where('is_active', true)->get();

        return Inertia::render('Profil/ProfilPuskaka', [
            'teamMembers' => $teamMembers,
            'photos' => $photos,
            
        ]);
    }
}