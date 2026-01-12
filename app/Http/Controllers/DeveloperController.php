<?php

namespace App\Http\Controllers;

use App\Models\Developer;
use App\Models\DeveloperDoc;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DeveloperController extends Controller
{
    public function index()
    {
        // Ambil data Tim Developer
        $teamMembers = Developer::active()->get()->map(function($dev) {
            return [
                'id' => $dev->id,
                'name' => $dev->name,
                'npm' => $dev->npm,
                'title' => $dev->title,
                'photo_url' => $dev->photo ? Storage::url($dev->photo) : null,
                // Data Sosmed
                'email' => $dev->email,
                'linkedin_url' => $dev->linkedin_url,
                'github_url' => $dev->github_url,
                'instagram_url' => $dev->instagram_url,
            ];
        });

        // Ambil data Slide Dokumentasi
        $photos = DeveloperDoc::active()->get()->map(function($doc) {
            return [
                'id' => $doc->id,
                'title' => $doc->title,
                'image_path' => $doc->image ? Storage::url($doc->image) : null,
            ];
        });

        return Inertia::render('Profil/Developer', [
            'teamMembers' => $teamMembers,
            'photos' => $photos
        ]);
    }
}