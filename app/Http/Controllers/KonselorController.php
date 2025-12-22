<?php

namespace App\Http\Controllers;

use App\Models\CounselingBooking;
use App\Models\CounselingReport;
use App\Models\Counselor;
use App\Models\CounselorSlot;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class KonselorController extends Controller
{
    /**
     * DASHBOARD KONSELOR: INPUT JADWAL
     */
    public function index()
{
    $user = Auth::user();

    // DEBUG: Cek user
    if (!$user) {
        return redirect()->route('login');
    }

    $counselor = Counselor::where('user_id', $user->id)
        ->with(['slots' => function ($query) {
            $query->where('is_available', true)
                ->where('date', '>=', now()->toDateString())
                ->orderBy('date', 'asc')
                ->orderBy('start_time', 'asc');
        }])
        ->first();

    if (!$counselor) {
        $counselor = Counselor::where('email', $user->email)
            ->with(['slots' => function ($query) {
                $query->where('is_available', true)
                    ->where('date', '>=', now()->toDateString())
                    ->orderBy('date', 'asc')
                    ->orderBy('start_time', 'asc');
            }])
            ->first();
    }

    // DEBUG LOG
    Log::info('Konselor Index Debug', [
        'user_id' => $user->id,
        'user_email' => $user->email,
        'counselor_found' => $counselor ? 'YES' : 'NO',
        'counselor_id' => $counselor ? $counselor->id : null,
        'slots_count' => $counselor ? $counselor->slots->count() : 0
    ]);

    // Format data untuk dashboard
    $counselorData = null;
    if ($counselor) {
        $counselorData = [
            'id' => $counselor->id,
            'name' => $counselor->name,
            'title' => $counselor->title,
            'photo_url' => $counselor->photo_url,
            'slots' => $counselor->slots->map(function ($slot) {
                return [
                    'id' => $slot->id,
                    'date_string' => \Carbon\Carbon::parse($slot->date)->locale('id')->isoFormat('dddd, D MMM YYYY'),
                    'time_string' => substr($slot->start_time, 0, 5) . ' - ' . substr($slot->end_time, 0, 5),
                ];
            }),
        ];
    }

    return Inertia::render('KonsultasiKonselor/KonsultasiKonselor', [
        'user' => $user,
        'counselor' => $counselorData,
    ]);
}

    /**
     * TABEL BOOKING
     */
    public function tableKonsultasi(Request $request)
    {
        $user = Auth::user();

        $counselor = Counselor::where('email', $user->email)
            ->orWhere('name', $user->name)
            ->first();

        if (! $counselor) {
            return redirect()->route('dashboard')
                ->with('error', 'Data konselor tidak ditemukan.');
        }

        // Query Dasar
        $query = CounselingBooking::where('counselor_id', $counselor->id)
            ->with(['user', 'slot']);

        // FILTER SEARCH
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('student_name', 'like', "%{$search}%")
                  ->orWhere('topic', 'like', "%{$search}%");
            });
        }

        // FILTER STATUS
        if ($request->filled('status') && $request->input('status') !== 'all') {
            $query->where('status', $request->input('status'));
        }

        // SORTING WAKTU
        if ($request->filled('sort')) {
            if ($request->input('sort') === 'oldest') {
                $query->orderBy('scheduled_date', 'asc')->orderBy('scheduled_time', 'asc');
            } else { // newest
                $query->orderBy('scheduled_date', 'desc')->orderBy('scheduled_time', 'desc');
            }
        } else {
            // Default Sorting: Prioritas Status -> Waktu Terdekat
            $query->orderByRaw("FIELD(status, 'pending', 'accepted', 'completed', 'rejected', 'cancelled')")
                  ->orderBy('scheduled_date', 'asc');
        }

        // PAGINATION
        $bookings = $query->paginate(10)->withQueryString();

        // MAPPING DATA
        $mappedBookings = $bookings->through(function ($booking) {
            return [
                'id' => $booking->id,
                'user_name' => $booking->student_name,
                'topic' => $booking->topic,
                'date' => Carbon::parse($booking->scheduled_date)->locale('id')->isoFormat('dddd, D MMM YYYY'),
                'time' => substr($booking->scheduled_time, 0, 5) . ' WIB',
                'status' => $booking->status,
                'created_at' => $booking->created_at->diffForHumans(),
            ];
        });

        // STATISTIK DASHBOARD
        $stats = [
            'total' => CounselingBooking::where('counselor_id', $counselor->id)->count(),
            'pending' => CounselingBooking::where('counselor_id', $counselor->id)->where('status', 'pending')->count(),
            'upcoming' => CounselingBooking::where('counselor_id', $counselor->id)->where('status', 'accepted')->count(),
            'completed' => CounselingBooking::where('counselor_id', $counselor->id)->where('status', 'completed')->count(),
        ];

        return Inertia::render('KonsultasiKonselor/TableKonsultasiKonselor', [
            'consultations' => $mappedBookings->items(), // Data array
            'pagination' => [
                'links' => $mappedBookings->linkCollection()->toArray(),
                'from' => $mappedBookings->firstItem(),
                'to' => $mappedBookings->lastItem(),
                'total' => $mappedBookings->total(),
                'last_page' => $mappedBookings->lastPage(),
                'current_page' => $mappedBookings->currentPage(),
            ],
            'stats' => $stats,
        ]);
    }
    /**
     * DETAIL BOOKING
     */
    public function show($id)
    {
        $user = Auth::user();
        $counselor = Counselor::where('email', $user->email)->orWhere('name', $user->name)->first();
        if (! $counselor) {
            abort(403);
        }

        $consultation = CounselingBooking::where('counselor_id', $counselor->id)
            ->with(['user', 'report'])
            ->findOrFail($id);

        $startTime = substr($consultation->scheduled_time, 0, 5);
        $endTime = $consultation->slot
            ? substr($consultation->slot->end_time, 0, 5)
            : date('H:i', strtotime($startTime.'+60 minutes'));

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
                    ? array_map(function ($path) {
                        return [
                            'url' => asset('storage/'.$path),
                            'name' => basename($path),
                            'is_image' => preg_match('/\.(jpg|jpeg|png|gif)$/i', $path),
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

        if (! $counselor) {
            abort(403);
        }

        $booking = CounselingBooking::where('counselor_id', $counselor->id)
            ->findOrFail($id);

        if (! in_array($booking->status, ['pending', 'rejected'])) {
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
            $waMessage = "✅ *Booking Disetujui*\n\n".
                "Halo {$booking->student_name},\n\n".
                "Booking Anda telah disetujui oleh {$counselor->name}.\n\n".
                '📅 '.Carbon::parse($booking->scheduled_date)->locale('id')->isoFormat('dddd, D MMMM YYYY')."\n".
                '🕐 '.substr($booking->scheduled_time, 0, 5)." WIB\n".
                "📍 {$booking->topic}";

            $waUrl = $this->generateWhatsAppUrl($booking->student_phone, $waMessage);

            return redirect()->route('konselor.table_konsultasi')
                ->with('success', 'Booking disetujui!')
                ->with('wa_student_url', $waUrl);

        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Approve Error: '.$e->getMessage());

            return back()->withErrors(['error' => 'Gagal menyetujui.']);
        }
    }

    public function reject(Request $request, $id)
    {
        $user = Auth::user();
        $counselor = Counselor::where('email', $user->email)
            ->orWhere('name', $user->name)
            ->first();

        if (! $counselor) {
            abort(403);
        }

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

            $waMessage = "❌ *Booking Ditolak*\n\n".
                "Halo {$booking->student_name},\n\n".
                "Maaf, booking Anda telah ditolak.\n\n".
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

        if (! $counselor) {
            abort(403);
        }

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
                'scheduled_time' => substr($booking->scheduled_time, 0, 5).' WIB',
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
                    $originalName = $file->getClientOriginalName();
                    $cleanName = str_replace(' ', '_', $originalName);
                    $fileName = time().'_'.$cleanName;
                    $path = $file->storeAs('counseling_reports', $fileName, 'public');

                    $filePaths[] = $path;
                }
            }

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

        if (! $counselor) {
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
            Log::error('Store Slot Error: '.$e->getMessage());

            return back()->withErrors(['error' => 'Gagal menambah jadwal.']);
        }
    }

    public function deleteSlot($slotId)
    {
        $user = Auth::user();
        $counselor = Counselor::where('email', $user->email)
            ->orWhere('name', $user->name)
            ->first();

        if (! $counselor) {
            abort(403);
        }

        $slot = CounselorSlot::where('id', $slotId)
            ->where('counselor_id', $counselor->id)
            ->first();

        if (! $slot) {
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

        if (! $counselor) {
            abort(403);
        }

        // Cari Slot berdasarkan ID dan ID Konselor (Security Check)
        $slot = CounselorSlot::where('id', $slotId)
            ->where('counselor_id', $counselor->id)
            ->first();

        if (! $slot) {
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
            Log::error('Update Slot Error: '.$e->getMessage());

            return back()->withErrors(['error' => 'Gagal memperbarui jadwal.']);
        }
    }
}
