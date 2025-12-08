<?php

namespace App\Http\Controllers;

use App\Models\Counselor;
use App\Models\CounselingBooking;
use App\Models\CounselorSlot;
use App\Models\CounselingReport;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class KonselorController extends Controller
{
    /**
     * DASHBOARD KONSELOR: INPUT JADWAL
     */
    public function index()
    {
        $user = Auth::user();
        
        // Ambil data diri konselor yang sedang login
        $counselor = Counselor::where('email', $user->email)
            ->orWhere('name', $user->name)
            ->with(['slots' => function($query) {
                $query->where('is_available', true)
                      ->where('date', '>=', now()->toDateString())
                      ->orderBy('date', 'asc')
                      ->orderBy('start_time', 'asc');
            }])
            ->first();

        // Format data untuk dashboard
        $counselorData = null;
        if ($counselor) {
            $counselorData = [
                'id' => $counselor->id,
                'name' => $counselor->name,
                'title' => $counselor->title,
                'photo_url' => $counselor->photo_url,
                'slots' => $counselor->slots->map(function($slot) {
                    return [
                        'id' => $slot->id,
                        'date_string' => \Carbon\Carbon::parse($slot->date)->locale('id')->isoFormat('dddd, D MMM'),
                        'time_string' => substr($slot->start_time, 0, 5) . ' - ' . substr($slot->end_time, 0, 5),
                    ];
                }),
            ];
        }

        // Render Halaman Khusus Konselor
        return Inertia::render('KonsultasiKonselor/KonsultasiKonselor', [
            'user' => $user,
            'counselor' => $counselorData, 
        ]);
    }

    /**
     * TABEL BOOKING
     */
    public function tableKonsultasi()
    {
        $user = Auth::user();
        
        $counselor = Counselor::where('email', $user->email)
            ->orWhere('name', $user->name)
            ->first();

        if (!$counselor) {
            return redirect()->route('dashboard')
                ->with('error', 'Data konselor tidak ditemukan.');
        }

        // HANYA booking milik konselor
        $consultations = CounselingBooking::where('counselor_id', $counselor->id)
            ->with(['user', 'slot'])
            ->orderByRaw("FIELD(status, 'pending', 'accepted', 'completed', 'rejected', 'cancelled')")
            ->orderBy('scheduled_date', 'desc')
            ->get()
            ->map(function($booking) {
                return [
                    'id' => $booking->id,
                    'user_name' => $booking->student_name,
                    'topic' => $booking->topic,
                    'date' => Carbon::parse($booking->scheduled_date)->locale('id')->isoFormat('D MMM YYYY'),
                    'time' => substr($booking->scheduled_time, 0, 5),
                    'status' => $booking->status,
                    'created_at' => $booking->created_at->diffForHumans(),
                ];
            });

        return Inertia::render('KonsultasiKonselor/TableKonsultasiKonselor', [
            'consultations' => $consultations,
        ]);
    }

    /**
     * DETAIL BOOKING
     */
    public function show($id)
    {
        $user = Auth::user();
        $counselor = Counselor::where('email', $user->email)->orWhere('name', $user->name)->first();
        if (!$counselor) abort(403);

        $consultation = CounselingBooking::where('counselor_id', $counselor->id)
            ->with(['user', 'report']) 
            ->findOrFail($id);

        $startTime = substr($consultation->scheduled_time, 0, 5);
        $endTime = $consultation->slot 
            ? substr($consultation->slot->end_time, 0, 5) 
            : date('H:i', strtotime($startTime . '+60 minutes'));

        $timeString = "{$startTime} - {$endTime} WIB";

        $reportData = null;
        if ($consultation->report) {
            $reportData = [
                'feedback' => $consultation->report->feedback,
                'action_plan' => $consultation->report->action_plan,
                'recommendations' => $consultation->report->recommendations,
                'session_duration' => $consultation->report->session_duration,
                'session_type' => $consultation->report->session_type,
                'session_location' => $consultation->report->session_location,
                'files' => $consultation->report->documentation_files 
                    ? array_map(function($path) {
                        return [
                            'url' => Storage::url($path),
                            'name' => basename($path),
                            'is_image' => preg_match('/\.(jpg|jpeg|png|gif)$/i', $path)
                        ];
                    }, $consultation->report->documentation_files) 
                    : [],
            ];
        }

        return Inertia::render('KonsultasiKonselor/FormulirDetailMahasiswa', [
            'consultation' => [
                'id' => $consultation->id,
                'student_name' => $consultation->student_name,
                'student_nim' => $consultation->student_npm,
                'student_phone' => $consultation->student_phone,
                'student_email' => $consultation->student_email,
                'student_faculty' => $consultation->user->faculty ?? '-',
                'student_study_program' => $consultation->user->study_program ?? '-',
                
                'topic' => $consultation->topic,
                'reason' => $consultation->notes,
                'date_submitted' => $consultation->created_at->locale('id')->isoFormat('dddd, D MMMM YYYY'),
                'preferred_date' => Carbon::parse($consultation->scheduled_date)->locale('id')->isoFormat('dddd, D MMMM YYYY'),
                'preferred_time' => $timeString,
                
                'status' => $consultation->status,
                'rejection_reason' => $consultation->rejection_reason,
                'has_report' => $consultation->report !== null,
                'report' => $reportData,
            ],
        ]);
    }

    /**
     * AKSI
     */
    public function approve($id)
    {
        $user = Auth::user();
        $counselor = Counselor::where('email', $user->email)
            ->orWhere('name', $user->name)
            ->first();

        if (!$counselor) abort(403);

        $booking = CounselingBooking::where('counselor_id', $counselor->id)
            ->findOrFail($id);

        if (!in_array($booking->status, ['pending', 'rejected'])) {
            return back()->withErrors(['error' => 'Booking tidak dapat disetujui.']);
        }

        DB::beginTransaction();
        try {
            $booking->update([
                'status' => 'accepted',
                'accepted_at' => now(),
            ]);
            DB::commit();

            // Generate WhatsApp URL
            $waMessage = "✅ *Booking Disetujui*\n\n" .
                "Halo {$booking->student_name},\n\n" .
                "Booking Anda telah disetujui oleh {$counselor->name}.\n\n" .
                "📅 " . Carbon::parse($booking->scheduled_date)->locale('id')->isoFormat('dddd, D MMMM YYYY') . "\n" .
                "🕐 " . substr($booking->scheduled_time, 0, 5) . " WIB\n" .
                "📍 {$booking->topic}";

            $waUrl = $this->generateWhatsAppUrl($booking->student_phone, $waMessage);

            return redirect()->route('konselor.table_konsultasi')
                ->with('success', 'Booking disetujui!')
                ->with('wa_student_url', $waUrl);

        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Approve Error: ' . $e->getMessage());
            return back()->withErrors(['error' => 'Gagal menyetujui.']);
        }
    }

    public function reject(Request $request, $id)
    {
        $user = Auth::user();
        $counselor = Counselor::where('email', $user->email)
            ->orWhere('name', $user->name)
            ->first();

        if (!$counselor) abort(403);

        $booking = CounselingBooking::where('counselor_id', $counselor->id)
            ->findOrFail($id);

        if ($booking->status === 'completed') {
            return back()->withErrors(['error' => 'Booking selesai tidak dapat ditolak.']);
        }

        DB::beginTransaction();
        try {
            $booking->update([
                'status' => 'rejected',
                'rejected_at' => now(),
                'rejection_reason' => $request->input('reason', 'Slot tidak tersedia'),
            ]);

            if ($booking->slot) {
                $booking->slot->update(['is_available' => true]);
            }

            DB::commit();

            $waMessage = "❌ *Booking Ditolak*\n\n" .
                "Halo {$booking->student_name},\n\n" .
                "Maaf, booking Anda telah ditolak.\n\n" .
                "💬 Alasan: {$booking->rejection_reason}";

            $waUrl = $this->generateWhatsAppUrl($booking->student_phone, $waMessage);

            return redirect()->route('konselor.table_konsultasi')
                ->with('success', 'Booking ditolak.')
                ->with('wa_student_url', $waUrl);

        } catch (\Exception $e) {
            DB::rollback();
            return back()->withErrors(['error' => 'Gagal menolak.']);
        }
    }

    public function showReportForm($bookingId)
{
    $user = Auth::user();
    $counselor = Counselor::where('email', $user->email)
        ->orWhere('name', $user->name)
        ->first();

    if (!$counselor) abort(403);

    $booking = CounselingBooking::where('counselor_id', $counselor->id)
        ->where('status', 'accepted')
        ->with(['user'])
        ->findOrFail($bookingId);

    return Inertia::render('KonsultasiKonselor/UploadReportForm', [
        'booking' => [
            'id' => $booking->id,
            'student_name' => $booking->student_name,
            'student_npm' => $booking->student_npm,
            'topic' => $booking->topic,
            'scheduled_date' => Carbon::parse($booking->scheduled_date)->locale('id')->isoFormat('dddd, D MMMM YYYY'),
            'scheduled_time' => substr($booking->scheduled_time, 0, 5) . ' WIB',
        ],
    ]);
}

public function storeReport(Request $request, $bookingId)
    {
        $request->validate([
            'feedback' => 'required|string|min:50',
            'action_plan' => 'nullable|string',
            'recommendations' => 'nullable|string',
            'session_duration' => 'required|integer|min:15',
            'session_type' => 'required|in:online,offline',
            'session_location' => 'nullable|string',
            'documentation_files' => 'nullable|array|max:5', // Max 5 file
            'documentation_files.*' => 'file|mimes:jpg,jpeg,png,pdf,doc,docx|max:10240', // Max 10MB per file
        ]);

        $booking = CounselingBooking::findOrFail($bookingId);

        DB::beginTransaction();
        try {
            // Upload Multiple Files
            $filePaths = [];
            if ($request->hasFile('documentation_files')) {
                foreach ($request->file('documentation_files') as $file) {
                    // Simpan file
                    $path = $file->store('counseling_reports', 'public');
                    $filePaths[] = $path;
                }
            }

            // Simpan ke Database
            CounselingReport::create([
                'booking_id' => $booking->id,
                'counselor_id' => $booking->counselor_id,
                'user_id' => $booking->user_id,
                'feedback' => $request->feedback,
                'action_plan' => $request->action_plan,
                'recommendations' => $request->recommendations,
                'session_duration' => $request->session_duration,
                'session_type' => $request->session_type,
                'session_location' => $request->session_location,
                'documentation_files' => $filePaths,
            ]);

            $booking->update(['status' => 'completed', 'completed_at' => now()]);

            DB::commit();
            return redirect()->route('konselor.konsultasi.show', $booking->id)
                ->with('success', 'Laporan berhasil disimpan dan sesi selesai.');

        } catch (\Exception $e) {
            DB::rollback();
            Log::error($e->getMessage());
            return back()->withErrors(['error' => 'Gagal menyimpan laporan.']);
        }
    }

    /**
     * MANAJEMEN SLOT
     */
    public function storeSlot(Request $request)
    {
        $request->validate([
            'date' => 'required|date|after_or_equal:today',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        $user = Auth::user();
        $counselor = Counselor::where('email', $user->email)
            ->orWhere('name', $user->name)
            ->first();

        if (!$counselor) {
            return back()->withErrors(['error' => 'Profil konselor tidak ditemukan.']);
        }

        try {
            CounselorSlot::create([
                'counselor_id' => $counselor->id,
                'date' => $request->date,
                'start_time' => $request->start_time,
                'end_time' => $request->end_time,
                'is_available' => true,
            ]);

            return back()->with('success', 'Jadwal berhasil ditambahkan!');
        } catch (\Exception $e) {
            Log::error('Store Slot Error: ' . $e->getMessage());
            return back()->withErrors(['error' => 'Gagal menambah jadwal.']);
        }
    }

    public function deleteSlot($slotId)
    {
        $user = Auth::user();
        $counselor = Counselor::where('email', $user->email)
            ->orWhere('name', $user->name)
            ->first();

        if (!$counselor) abort(403);

        $slot = CounselorSlot::where('id', $slotId)
            ->where('counselor_id', $counselor->id)
            ->first();

        if (!$slot) {
            return back()->withErrors(['error' => 'Slot tidak ditemukan.']);
        }

        $hasBooking = CounselingBooking::where('slot_id', $slot->id)
            ->whereIn('status', ['pending', 'accepted'])
            ->exists();

        if ($hasBooking) {
            return back()->withErrors(['error' => 'Slot sudah ada booking.']);
        }

        $slot->delete();

        return back()->with('success', 'Slot berhasil dihapus.');
    }

    /**
     * HELPER: Generate WhatsApp URL
     */
    private function generateWhatsAppUrl($phone, $message)
    {
        $phone = preg_replace('/^0/', '62', $phone);
        $phone = preg_replace('/^\+/', '', $phone);
        $encodedMessage = urlencode($message);
        
        return "https://wa.me/{$phone}?text={$encodedMessage}";
    }

    /**
     * UPDATE SLOT (Edit Jadwal)
     */
    public function updateSlot(Request $request, $slotId)
    {
        // Validasi Input
        $request->validate([
            'date' => 'required|date|after_or_equal:today',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        $user = Auth::user();
        
        // Cari Konselor
        $counselor = Counselor::where('email', $user->email)
            ->orWhere('name', $user->name)
            ->first();

        if (!$counselor) abort(403);

        // Cari Slot berdasarkan ID dan ID Konselor (Security Check)
        $slot = CounselorSlot::where('id', $slotId)
            ->where('counselor_id', $counselor->id)
            ->first();

        if (!$slot) {
            return back()->withErrors(['error' => 'Slot tidak ditemukan atau bukan milik Anda.']);
        }

        // Cek apakah slot sudah dibooking?
        // Jika sudah ada booking (pending/accepted), jangan izinkan edit agar data tidak kacau.
        $hasBooking = CounselingBooking::where('slot_id', $slot->id)
            ->whereIn('status', ['pending', 'accepted'])
            ->exists();

        if ($hasBooking) {
            return back()->withErrors(['error' => 'Jadwal ini sudah dibooking mahasiswa, tidak dapat diubah. Silakan tolak/batalkan booking terlebih dahulu.']);
        }

        // Update
        try {
            $slot->update([
                'date' => $request->date,
                'start_time' => $request->start_time,
                'end_time' => $request->end_time,
            ]);

            return back()->with('success', 'Jadwal berhasil diperbarui!');
        } catch (\Exception $e) {
            Log::error('Update Slot Error: ' . $e->getMessage());
            return back()->withErrors(['error' => 'Gagal memperbarui jadwal.']);
        }
    }   
}