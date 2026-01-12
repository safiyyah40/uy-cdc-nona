<?php

namespace App\Http\Controllers;

use App\Models\Counselor;
use App\Models\CvReview;
use App\Models\CvTemplate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CvReviewController extends Controller
{
    /**
     * LANDING PAGE CV REVIEW (Public/Mahasiswa/Konselor)
     */
    public function index(Request $request)
    {
        $user = Auth::user();

        try {
            $query = CvTemplate::where('is_active', true);
            if ($request->filled('search')) {
                $search = $request->input('search');
                $query->where(function ($q) use ($search) {
                    $q->where('judul_template', 'like', "%{$search}%")
                        ->orWhere('deskripsi', 'like', "%{$search}%")
                        ->orWhere('tags', 'like', "%{$search}%");
                });
            }

            if ($request->filled('kategori') && $request->input('kategori') !== 'semua') {
                $query->where('kategori', $request->input('kategori'));
            }

            if ($request->filled('sumber') && $request->input('sumber') !== 'semua') {
                $query->where('sumber', $request->input('sumber'));
            }

            $query->orderBy('is_unggulan', 'desc')
                ->orderBy('created_at', 'desc');

            $templates = $query->paginate(8)->withQueryString();

            $mappedTemplates = $templates->through(function ($tpl) {
                return [
                    'id' => $tpl->id,
                    'judul' => $tpl->judul_template,
                    'deskripsi' => $tpl->deskripsi,
                    'kategori' => $tpl->kategori,
                    'sumber' => $tpl->sumber,
                    'preview_url' => $tpl->preview_url,
                    'url_template' => $tpl->url_template,
                    'tags' => $tpl->tags,
                    'is_unggulan' => $tpl->is_unggulan,
                    'jumlah_view' => $tpl->jumlah_view,
                    'jumlah_klik' => $tpl->jumlah_klik,
                ];
            });

            return Inertia::render('Layanan/CvReview/IndexCvReview', [
                'auth' => ['user' => $user],
                'templates' => $mappedTemplates->items(), // Data array
                'pagination' => [ // Data pagination untuk frontend
                    'links' => $mappedTemplates->linkCollection()->toArray(),
                    'from' => $mappedTemplates->firstItem(),
                    'to' => $mappedTemplates->lastItem(),
                    'total' => $mappedTemplates->total(),
                    'last_page' => $mappedTemplates->lastPage(),
                    'current_page' => $mappedTemplates->currentPage(),
                ],
                'filters' => $request->only(['search', 'kategori', 'sumber']),
            ]);

        } catch (\Exception $e) {
            Log::error('Error loading templates: '.$e->getMessage());

            return Inertia::render('Layanan/CvReview/IndexCvReview', [
                'auth' => ['user' => $user],
                'templates' => [],
                'pagination' => null,
                'filters' => $request->only(['search', 'kategori', 'sumber']),
            ]);
        }
    }

    public function redirectLogin()
    {
        session()->put('url.intended', route('layanan.cv.review'));

        // Lempar ke login
        return redirect()->route('login');
    }

    /**
     * TABEL LIST CV REVIEW
     * - Mahasiswa: Lihat riwayat submission sendiri
     * - Konselor: Lihat CV yang ditugaskan kepadanya
     */
    public function table(Request $request)
    {
        $user = Auth::user();

        if (! $user) {
            return redirect()->route('login')->with('error', 'Silakan login terlebih dahulu.');
        }

        if ($user->role === 'konselor') {
            return $this->tableForCounselor($user, $request);
        }

        return $this->tableForStudent($user, $request);
    }

    /**
     * TABEL UNTUK MAHASISWA
     */
    private function tableForStudent($user, $request)
    {
        $query = CvReview::where('user_id', $user->id)
            ->with('counselor:id,name');

        // FILTER SEARCH
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('target_position', 'like', "%{$search}%")
                    ->orWhere('student_name', 'like', "%{$search}%")
                    ->orWhere('cv_file_original_name', 'like', "%{$search}%");
            });
        }

        // FILTER STATUS
        if ($request->filled('status') && $request->input('status') !== 'all') {
            $statusMap = [
                'submitted' => 'submitted',
                'assigned' => 'assigned',
                'in_review' => 'in_review',
                'completed' => 'completed',
                'cancelled' => 'cancelled',
            ];

            $statusKey = $request->input('status');
            if (isset($statusMap[$statusKey])) {
                $query->where('status', $statusMap[$statusKey]);
            }
        }

        // SORTING WAKTU
        if ($request->filled('sort')) {
            if ($request->input('sort') === 'oldest') {
                $query->orderBy('created_at', 'asc');
            } else { // newest
                $query->orderBy('created_at', 'desc');
            }
        } else {
            $query->orderByRaw("FIELD(status, 'submitted', 'assigned', 'in_review', 'completed', 'cancelled')")
                ->orderBy('created_at', 'desc');
        }

        $reviews = $query->paginate(10)->withQueryString();

        $mappedReviews = $reviews->through(function ($review) {
            return [
                'id' => $review->id,
                'media' => $review->cv_file_original_name,
                'posisi' => $review->target_position,
                'keterangan' => $review->additional_notes ?? '-',
                'status' => $this->mapStatusLabel($review->status),
                'status_raw' => $review->status,
                'tanggalSubmit' => $review->created_at
                    ->setTimezone('Asia/Jakarta')
                    ->locale('id')
                    ->isoFormat('dddd, D MMMM YYYY [pukul] HH:mm'),
                'counselor_name' => $review->counselor->name ?? '-',
                'has_feedback' => ! empty($review->feedback_text),
                'can_edit' => $review->canBeEdited(),
                'can_delete' => $review->status !== 'cancelled' && $review->status !== 'completed' && $review->status !== 'in_review',
            ];
        });

        return Inertia::render('Layanan/CvReview/TabelCvReview', [
            'reviews' => $mappedReviews->items(),
            'pagination' => [
                'links' => $mappedReviews->linkCollection()->toArray(),
                'from' => $mappedReviews->firstItem(),
                'to' => $mappedReviews->lastItem(),
                'total' => $mappedReviews->total(),
                'last_page' => $mappedReviews->lastPage(),
                'current_page' => $mappedReviews->currentPage(),
            ],
            'auth' => ['user' => $user],
        ]);
    }

    /**
     * TABEL UNTUK KONSELOR
     */
    private function tableForCounselor($user, $request)
    {
        $counselor = Counselor::where('email', $user->email)
            ->orWhere('name', $user->name)
            ->first();

        if (! $counselor) {
            return redirect()->route('dashboard')
                ->with('error', 'Data konselor tidak ditemukan.');
        }

        $query = CvReview::where('counselor_id', $counselor->id)
            ->with('user:id,name,email');

        // FILTER SEARCH
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('student_name', 'like', "%{$search}%")
                    ->orWhere('target_position', 'like', "%{$search}%")
                    ->orWhere('student_npm', 'like', "%{$search}%")
                    ->orWhere('cv_file_original_name', 'like', "%{$search}%");
            });
        }

        // --- FILTER STATUS
        if ($request->filled('status') && $request->input('status') !== 'all') {
            $statusMap = [
                'submitted' => 'submitted',
                'assigned' => 'assigned',
                'in_review' => 'in_review',
                'completed' => 'completed',
                'cancelled' => 'cancelled',
            ];

            $statusKey = $request->input('status');
            if (isset($statusMap[$statusKey])) {
                $query->where('status', $statusMap[$statusKey]);
            }
        }

        // FILTER PRIORITY
        if ($request->filled('priority') && $request->input('priority') !== 'all') {
            $priorityMap = [
                'normal' => 'normal',
                'tinggi' => 'tinggi',
                'high' => 'tinggi',
                'mendesak' => 'mendesak',
                'urgent' => 'mendesak',
            ];

            $priorityKey = strtolower($request->input('priority'));
            if (isset($priorityMap[$priorityKey])) {
                $query->where('priority', $priorityMap[$priorityKey]);
            }
        }

        // FILTER SORTING WAKTU
        if ($request->filled('sort')) {
            if ($request->input('sort') === 'oldest') {
                $query->orderBy('submitted_at', 'asc');
            } elseif ($request->input('sort') === 'newest') {
                $query->orderBy('submitted_at', 'desc');
            }
        } else {
            $query->orderByRaw("FIELD(status, 'assigned', 'in_review', 'submitted', 'completed', 'cancelled')");
            $query->orderByRaw("FIELD(priority, 'mendesak', 'tinggi', 'normal')");
            $query->orderBy('submitted_at', 'asc');
        }

        $reviews = $query->paginate(10)->withQueryString();

        $mappedReviews = $reviews->through(function ($review) {
            return [
                'id' => $review->id,
                'user' => $review->student_name,
                'posisi' => $review->target_position,
                'media' => $review->cv_file_original_name,
                'tanggalSubmit' => $review->created_at
                    ->setTimezone('Asia/Jakarta')
                    ->locale('id')
                    ->isoFormat('dddd, D MMMM YYYY [pukul] HH:mm'),
                'status' => $this->mapStatusLabel($review->status),
                'status_raw' => $review->status,
                'prioritas' => ucfirst($review->priority),
                'can_delete' => false,
            ];
        });

        // STATISTICS untuk Konselor
        $stats = [
            'total' => CvReview::where('counselor_id', $counselor->id)->count(),
            'pending' => CvReview::where('counselor_id', $counselor->id)
                ->whereIn('status', ['submitted', 'assigned'])
                ->count(),
            'in_review' => CvReview::where('counselor_id', $counselor->id)
                ->where('status', 'in_review')
                ->count(),
            'completed' => CvReview::where('counselor_id', $counselor->id)
                ->where('status', 'completed')
                ->count(),
        ];

        return Inertia::render('Layanan/CvReview/TabelCvReview', [
            'reviews' => $mappedReviews->items(),
            'pagination' => [
                'links' => $mappedReviews->linkCollection()->toArray(),
                'from' => $mappedReviews->firstItem(),
                'to' => $mappedReviews->lastItem(),
                'total' => $mappedReviews->total(),
                'last_page' => $mappedReviews->lastPage(),
                'current_page' => $mappedReviews->currentPage(),
            ],
            'stats' => $stats,
            'auth' => ['user' => $user],
        ]);
    }

    /**
     * FORM UPLOAD CV (MAHASISWA)
     */
    public function create()
    {
        $user = Auth::user();

        return Inertia::render('Layanan/CvReview/Mahasiswa/FormUnggahCv', [
            'auth' => ['user' => $user],
        ]);
    }

    /**
     * SIMPAN CV BARU (MAHASISWA)
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'target_position' => 'required|string|max:255',
            'additional_notes' => 'nullable|string|max:500',
            'cv_file' => 'required|file|mimes:pdf,doc,docx|max:10240',
        ]);

        DB::beginTransaction();
        try {
            $file = $request->file('cv_file');
            $originalName = $file->getClientOriginalName();
            $cleanName = str_replace(' ', '_', pathinfo($originalName, PATHINFO_FILENAME));
            $extension = $file->getClientOriginalExtension();
            $fileName = $cleanName.'_'.time().'.'.$extension;

            $filePath = $file->storeAs('cv_reviews', $fileName, 'public');

            CvReview::create([
                'user_id' => $user->id,
                'student_name' => $user->name,
                'student_npm' => $user->id_number,
                'student_email' => $user->email,
                'student_phone' => $user->phone,
                'student_faculty' => $user->faculty,
                'student_study_program' => $user->study_program,
                'target_position' => $validated['target_position'],
                'additional_notes' => $validated['additional_notes'],
                'cv_file_path' => $filePath,
                'cv_file_original_name' => $originalName,
                'status' => 'submitted',
                'priority' => 'normal',
                'submitted_at' => now(),
            ]);

            DB::commit();

            return redirect()->route('layanan.tabel.cv.review')
                ->with('success', 'CV berhasil diunggah! Menunggu penugasan konselor.');

        } catch (\Exception $e) {
            DB::rollback();
            Log::error('CV Upload Error: '.$e->getMessage());

            return back()->withErrors(['error' => 'Gagal mengunggah CV.']);
        }
    }

    /**
     * DETAIL CV REVIEW (MAHASISWA & KONSELOR)
     */
    public function show($id)
    {
        $user = Auth::user();
        $review = CvReview::with(['counselor', 'user'])->findOrFail($id);

        // Security Check
        if ($user->role === 'konselor') {
            $counselor = Counselor::where('email', $user->email)
                ->orWhere('name', $user->name)
                ->first();

            if (! $counselor || $review->counselor_id !== $counselor->id) {
                abort(403, 'Unauthorized access');
            }
        } else {
            if ($review->user_id !== $user->id) {
                abort(403, 'Unauthorized access');
            }
        }

        $feedbackFiles = [];
        if ($review->feedback_files && is_array($review->feedback_files)) {
            $feedbackFiles = array_map(function ($path) {
                return [
                    'url' => asset('storage/'.$path),
                    'name' => basename($path),
                    'is_image' => preg_match('/\.(jpg|jpeg|png|gif|webp)$/i', $path),
                ];
            }, $review->feedback_files);
        }

        $timestamp = $review->submitted_at ?? $review->created_at;

        $data = [
            'id' => $review->id,
            'namaLengkap' => $review->student_name,
            'npm' => $review->student_npm,
            'email' => $review->student_email,
            'phone' => $review->student_phone,
            'faculty' => $review->student_faculty,
            'study_program' => $review->student_study_program,
            'posisi' => $review->target_position,
            'keterangan' => $review->additional_notes ?? '-',
            'tanggalPengajuan' => $timestamp
                ->setTimezone('Asia/Jakarta')
                ->locale('id')
                ->isoFormat('dddd, D MMMM YYYY [pukul] HH:mm'),
            'statusPeninjauan' => $this->mapStatusLabel($review->status),
            'status_raw' => $review->status,
            'cv_file_url' => $review->cv_file_path ? asset('storage/'.$review->cv_file_path) : null,
            'cv_file_name' => $review->cv_file_original_name,
            'counselor_name' => $review->counselor->name ?? '-',
            'counselor_title' => $review->counselor->title ?? 'Konselor Karir',
            'counselor_photo' => $review->counselor && $review->counselor->photo ? asset('storage/'.$review->counselor->photo) : null,
            'feedback_text' => $review->feedback_text,
            'feedback_files' => $feedbackFiles,
            'priority' => ucfirst($review->priority),
        ];

        return Inertia::render('Layanan/CvReview/DetailSubmission', [
            'reviewData' => $data,
            'auth' => ['user' => $user],
        ]);
    }

    /**
     * WORKSPACE KONSELOR (Halaman Review)
     */
    public function workspace($id)
    {
        $user = Auth::user();

        $counselor = Counselor::where('email', $user->email)
            ->orWhere('name', $user->name)
            ->first();

        if (! $counselor) {
            abort(403);
        }

        $review = CvReview::where('id', $id)
            ->where('counselor_id', $counselor->id)
            ->with('user')
            ->firstOrFail();

        if ($review->status === 'assigned') {
            $review->markAsInReview();
        }

        return Inertia::render('Layanan/CvReview/Konselor/CvReviewWorkspaceKonselor', [
            'review' => [
                'id' => $review->id,
                'nama' => $review->student_name,
                'npm' => $review->student_npm,
                'email' => $review->student_email,
                'phone' => $review->student_phone,
                'fakultas' => $review->student_faculty,
                'prodi' => $review->student_study_program,
                'posisi' => $review->target_position,
                'tanggalSubmit' => $review->created_at
                    ->setTimezone('Asia/Jakarta')
                    ->locale('id')
                    ->isoFormat('dddd, D MMMM YYYY [pukul] HH:mm'),
                'prioritas' => ucfirst($review->priority),
                'keterangan' => $review->additional_notes ?? '-',
                'cv_url' => $review->cv_file_path ? Storage::url($review->cv_file_path) : null,
                'cv_name' => $review->cv_file_original_name,
            ],
            'auth' => ['user' => $user],
        ]);
    }

    /**
     * SUBMIT FEEDBACK (KONSELOR)
     */
    public function submitFeedback(Request $request, $id)
    {
        $user = Auth::user();

        $counselor = Counselor::where('email', $user->email)
            ->orWhere('name', $user->name)
            ->first();

        if (! $counselor) {
            abort(403);
        }

        $review = CvReview::where('id', $id)
            ->where('counselor_id', $counselor->id)
            ->firstOrFail();

        $validated = $request->validate([
            'feedback_text' => 'required|string|min:50',
            'feedback_files' => 'nullable|array|max:5',
            'feedback_files.*' => 'file|mimes:pdf,doc,docx,jpg,jpeg,png|max:10240',
        ], [
            'feedback_files.*.mimes' => 'Format file harus PDF, Word (doc/docx), atau Gambar (jpg/png). Excel dan PPT tidak diperbolehkan.',
            'feedback_files.*.max' => 'Ukuran file maksimal 10MB per file.',
        ]);

        DB::beginTransaction();
        try {
            $filePaths = [];
            if ($request->hasFile('feedback_files')) {
                foreach ($request->file('feedback_files') as $file) {
                    $originalName = $file->getClientOriginalName();
                    $cleanName = str_replace(' ', '_', pathinfo($originalName, PATHINFO_FILENAME));
                    $extension = $file->getClientOriginalExtension();
                    $fileName = $cleanName.'_'.time().'_'.uniqid().'.'.$extension;
                    $path = $file->storeAs('cv_review_feedback', $fileName, 'public');
                    $filePaths[] = $path;
                }
            }

            $review->markAsCompleted($validated['feedback_text'], $filePaths);

            DB::commit();

            return redirect()->route('layanan.tabel.cv.review')
                ->with('success', 'Feedback berhasil dikirim!');

        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Feedback Submit Error: '.$e->getMessage());

            return back()->withErrors(['error' => 'Gagal mengirim feedback: '.$e->getMessage()]);
        }
    }

    /**
     * DELETE CV REVIEW (MAHASISWA)
     */
    public function destroy($id)
    {
        $user = Auth::user();

        $review = CvReview::where('id', $id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        if ($review->status === 'cancelled') {
            return back()->withErrors(['error' => 'Pengajuan sudah dibatalkan sebelumnya.']);
        }

        if ($review->status === 'completed') {
            return back()->withErrors(['error' => 'Pengajuan yang sudah selesai tidak dapat dibatalkan.']);
        }

        DB::beginTransaction();
        try {
            $review->update(['status' => 'cancelled']);

            DB::commit();

            if (request()->wantsJson()) {
                return response()->json(['message' => 'Pengajuan berhasil dibatalkan.']);
            }

            return redirect()->route('layanan.tabel.cv.review')
                ->with('success', 'Pengajuan berhasil dibatalkan.');

        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Cancel CV Error: '.$e->getMessage());

            if (request()->wantsJson()) {
                return response()->json(['error' => 'Gagal membatalkan pengajuan.'], 500);
            }

            return back()->withErrors(['error' => 'Gagal membatalkan pengajuan.']);
        }
    }

    /**
     * DOWNLOAD CV FILE
     */
    public function downloadCv($id)
    {
        try {
            $user = Auth::user();
            $review = CvReview::findOrFail($id);

            // Validasi Akses
            $isOwner = $review->user_id === $user->id;
            $isCounselor = false;

            if ($user->role === 'konselor') {
                $counselor = Counselor::where('email', $user->email)
                    ->orWhere('name', $user->name)
                    ->first();

                if ($counselor && $review->counselor_id === $counselor->id) {
                    $isCounselor = true;
                }
            }

            if (! $isOwner && ! $isCounselor) {
                abort(403, 'Anda tidak memiliki akses untuk mengunduh file ini.');
            }

            // Cek file existence
            if (! $review->cv_file_path) {
                abort(404, 'Path file tidak ditemukan dalam database.');
            }

            if (! Storage::disk('public')->exists($review->cv_file_path)) {
                abort(404, 'File fisik tidak ditemukan di server.');
            }

            $filePath = storage_path('app/public/'.$review->cv_file_path);

            return response()->download(
                $filePath,
                $review->cv_file_original_name
            );

        } catch (\Exception $e) {
            Log::error('CV Download Error: '.$e->getMessage());
            if (request()->wantsJson()) {
                return response()->json([
                    'error' => 'Gagal mengunduh file: '.$e->getMessage(),
                ], 500);
            }

            return back()->with('error', 'Gagal mengunduh file. Silakan coba lagi atau hubungi admin.');
        }
    }

    /**
     * HELPER: Map Status ke Label Indonesia
     */
    private function mapStatusLabel($status)
    {
        $map = [
            'submitted' => 'Diajukan',
            'assigned' => 'Ditugaskan',
            'in_review' => 'Sedang Direview',
            'completed' => 'Selesai',
            'cancelled' => 'Dibatalkan',
        ];

        return $map[$status] ?? $status;
    }
}
