<?php

namespace App\Http\Controllers;

use App\Models\Counselor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfilKonselorController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $counselors = Counselor::where('is_active', true)
                               ->orderBy('order_column', 'asc')
                               ->get();

        return Inertia::render('Profil/ProfilKonselor', [
            'counselors' => $counselors,
        ]);
    }
}
