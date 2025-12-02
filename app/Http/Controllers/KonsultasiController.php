<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia; // Jangan lupa import Inertia

class KonsultasiController extends Controller
{
    /**
     * Menampilkan halaman form booking konselor.
     * Mengambil query parameters dari URL (Link Inertia)
     */
    public function showBookingForm(Request $request)
    {
        $counselorId = $request->query('counselor_id');
        $counselorName = $request->query('counselor_name');
        $slotDate = $request->query('slot_date');
        $slotTime = $request->query('slot_time');
        $slotId = $request->query('slot_id');

        return Inertia::render('Konsultasi/BookingForm', [
            'counselor_id' => $counselorId,
            'counselor_name' => $counselorName,
            'slot_date' => $slotDate,
            'slot_time' => $slotTime,
            'slot_id' => $slotId,
        ]);
    }
}
