<?php

namespace App\Http\Controllers;

use App\Models\Counselor;
use App\Models\CounselorSlot;
use App\Models\CounselingBooking;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class KonsultasiController extends Controller
{
    /**
     * TAMPILAN UNTUK MAHASISWA: LIST KONSELOR
     */
    public function index()
{
    $user = Auth::user();
    if ($user && $user->role === 'konselor') {
        return redirect()->route('konselor.dashboard');
    }

    $counselors = Counselor::with(['slots' => function ($query) {
        $query->where('is_available', true)
            ->where('date', '>=', now()->toDateString())
            ->orderBy('date', 'asc')
            ->orderBy('start_time', 'asc')
            ->limit(5);
    }])
        ->get()
        ->map(function ($counselor) {
            return [
                'id' => $counselor->id,
                'name' => $counselor->name,
                'title' => $counselor->title,
                'photo_url' => $counselor->photo_url,
                'slots' => $counselor->slots->map(function ($slot) {
                    // FORMAT YANG LEBIH JELAS
                    $date = Carbon::parse($slot->date);
                    
                    return [
                        'id' => $slot->id,
                        // Format: "Jumat, 12 Des" atau "Jumat, 12 Desember"
                        'date_string' => $date->locale('id')->isoFormat('dddd, D MMMM'),
                        // Format: "18:00 - 19:00"
                        'time_string' => substr($slot->start_time, 0, 5) . ' - ' . substr($slot->end_time, 0, 5),
                        'raw_date' => $slot->date,
                        'raw_time' => $slot->start_time,
                    ];
                }),
            ];
        });

    return Inertia::render('KonsultasiMahasiswa/Konsultasi', [
        'counselors' => $counselors,
        'auth' => ['user' => $user],
    ]);
}

    /**
     * Form Booking (Hanya untuk User Login)
     */
    public function showBookingForm(Request $request)
    {
        $user = Auth::user();

        // Cek Role
        if ($user && $user->role === 'konselor') return redirect()->route('konselor.dashboard');

        // VALIDASI: Jika tidak ada slot_id di URL, kembalikan ke halaman index
        if (!$request->has('slot_id')) {
            return redirect()->route('layanan.konsultasi')
                ->with('error', 'Silakan pilih jadwal terlebih dahulu.');
        }

        $slotId = $request->query('slot_id');

        // Ambil data slot
        $slot = CounselorSlot::with('counselor')->find($slotId);

       
        $isJustBooked = session('success'); // Cek flash message

        if (!$isJustBooked) { 
            if (!$slot || !$slot->is_available) {
                 return redirect()->route('layanan.konsultasi')
                    ->with('error', 'Maaf, slot jadwal ini baru saja diambil atau tidak ditemukan.');
            }
        }

        return Inertia::render('KonsultasiMahasiswa/BookingForm', [
            'counselor_id' => $slot->counselor_id,

            'counselor_name' => $slot->counselor->name,
            'slot_date' => Carbon::parse($slot->date)->locale('id')->isoFormat('dddd, D MMMM YYYY'),
            'slot_time' => substr($slot->start_time, 0, 5),
            'slot_id' => $slot->id,
            'user' => $user
        ]);
    }

    public function userList()
    {
        $user = Auth::user();
        $bookings = CounselingBooking::where('user_id', $user->id)
            ->with('counselor')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($booking) {
                return [
                    'id' => $booking->id,
                    'topic' => $booking->topic,
                    'notes' => $booking->notes,
                    'schedule' => Carbon::parse($booking->scheduled_date)->locale('id')->isoFormat('dddd, D MMM YYYY') . ', ' . substr($booking->scheduled_time, 0, 5),
                    'status' => $booking->status,
                    'counselor_name' => $booking->counselor_name,
                    'can_cancel' => $booking->status === 'pending',
                ];
            });

        // UPDATE PATH DISINI:
        return Inertia::render('KonsultasiMahasiswa/UserCounselingList', [
            'bookings' => $bookings
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $validated = $request->validate([
            'counselor_id' => 'required',
            'slot_id' => 'required',
            'topic' => 'required',
        ]);

        $slot = CounselorSlot::findOrFail($validated['slot_id']);

        CounselingBooking::create([
            'user_id' => $user->id,
            'counselor_id' => $validated['counselor_id'],
            'slot_id' => $validated['slot_id'],
            'student_name' => $user->name,
            'student_npm' => $user->id_number,
            'student_phone' => $user->phone,
            'student_email' => $user->email,
            'topic' => $validated['topic'],
            'notes' => $request->notes,
            'scheduled_date' => $slot->date,
            'scheduled_time' => $slot->start_time,
            'counselor_name' => $slot->counselor->name,
            'status' => 'pending',
        ]);

        $slot->update(['is_available' => false]);

        return back()->with([
            'success' => 'Permintaan terkirim!',
            'wa_admin_url' => 'https://wa.me/6281234567890?text=Halo%20Admin%20CDC,%20saya%20sudah%20booking%20konsultasi...'
        ]);
    }

    public function show($id)
    {
        $user = Auth::user();

        // Cari booking milik user yang sedang login
        $booking = CounselingBooking::where('user_id', $user->id)
            ->with(['counselor', 'report', 'slot'])
            ->findOrFail($id);

        // Format Data Report (Jika ada)
        $reportData = null;
        if ($booking->report) {
            $reportData = [
                'feedback' => $booking->report->feedback,
                'action_plan' => $booking->report->action_plan,
                'recommendations' => $booking->report->recommendations,
                'session_duration' => $booking->report->session_duration,
                'session_type' => $booking->report->session_type,
                'session_location' => $booking->report->session_location,
                'files' => $booking->report->documentation_files 
                    ? array_map(function($path) {
                        return [
                            'url' => asset('storage/' . $path),
                            'name' => basename($path),
                            'is_image' => preg_match('/\.(jpg|jpeg|png|gif)$/i', $path)
                        ];
                    }, $booking->report->documentation_files)
                    : [],
            ];
        }

        // Format Jam (Mulai - Selesai)
        $startTime = substr($booking->scheduled_time, 0, 5);
        $endTime = $booking->slot
            ? substr($booking->slot->end_time, 0, 5)
            : date('H:i', strtotime($startTime . '+60 minutes'));

        $timeString = "$startTime - $endTime WIB";

        return Inertia::render('KonsultasiMahasiswa/DetailKonsultasi', [
            'consultation' => [
                'id' => $booking->id,
                'topic' => $booking->topic,
                'counselor_name' => $booking->counselor->name ?? 'Konselor',
                'counselor_title' => $booking->counselor->title ?? 'Konselor Akademik',
                'counselor_photo' => $booking->counselor->photo_url ?? null,
                'status' => $booking->status,
                'date_formatted' => Carbon::parse($booking->scheduled_date)->locale('id')->isoFormat('dddd, D MMMM YYYY'),
                'time_formatted' => $timeString,
                'created_at' => $booking->created_at->locale('id')->isoFormat('D MMMM YYYY'),
                'notes' => $booking->notes, // Keluhan awal mahasiswa
                'rejection_reason' => $booking->rejection_reason, // Alasan tolak
                'report' => $reportData, // Hasil laporan konselor
            ]
        ]);
    }

    public function cancel($id)
    {
        $booking = CounselingBooking::where('user_id', Auth::id())->findOrFail($id);
        $booking->update(['status' => 'cancelled']);
        if ($booking->slot) $booking->slot->update(['is_available' => true]);

        return back()->with('success', 'Dibatalkan');
    }
}