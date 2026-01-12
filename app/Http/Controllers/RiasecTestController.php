<?php

namespace App\Http\Controllers;

use App\Models\RiasecCategory;
use App\Models\RiasecQuestion;
use App\Models\RiasecTestAnswer;
use App\Models\RiasecTestResult;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RiasecTestController extends Controller
{
    /**
     * Landing Page Tes RIASEC
     */
    public function index()
    {
        return Inertia::render('Layanan/TesMinatBakatRiasec/IndexTesMinatBakatRiasec');
    }

    /**
     * Get questions untuk mulai tes
     */
    public function getQuestions()
    {
        $questions = RiasecQuestion::with('category:id,code')
            ->active()
            ->get()
            ->map(function ($question) {
                return [
                    'id' => $question->id,
                    'category' => $question->category->code,
                    'text' => $question->question_text,
                ];
            });

        return response()->json([
            'questions' => $questions,
            'total' => $questions->count(),
        ]);
    }

    /**
     * Submit test dan hitung hasil
     */
    public function submitTest(Request $request)
{
    $validated = $request->validate([
        'answers' => 'required|array|min:1',
        'answers.*' => 'integer|min:1|max:5',
        'time_taken' => 'required|integer|min:0',
    ]);

    try {
        DB::beginTransaction();

        $questions = RiasecQuestion::with('category')
            ->whereIn('id', array_keys($validated['answers']))
            ->get();

        if ($questions->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Tidak ada pertanyaan valid'
            ], 422);
        }

        // Hitung skor
        $scores = [];
        foreach ($questions as $question) {
            $code = $question->category->code;
            $val = (int) $validated['answers'][$question->id];
            
            if (!isset($scores[$code])) {
                $scores[$code] = 0;
            }
            $scores[$code] += $val;
        }

        arsort($scores);
        $rankings = array_keys($scores);

        $testResult = RiasecTestResult::create([
            'user_id' => Auth::id(),
            'scores' => $scores,
            'rankings' => $rankings,
            'time_taken_seconds' => $validated['time_taken'],
            'total_questions_answered' => count($validated['answers']),
            'started_at' => now()->subSeconds($validated['time_taken']),
            'completed_at' => now(),
            'status' => 'completed',
        ]);

        foreach ($questions as $question) {
            RiasecTestAnswer::create([
                'test_result_id' => $testResult->id,
                'question_id' => $question->id,
                'answer_value' => (int) $validated['answers'][$question->id],
            ]);
        }

        DB::commit();

        $interpretations = RiasecCategory::get()->keyBy('code');
        
        // Full analysis untuk semua 6 kategori
        $fullAnalysis = array_map(function ($code) use ($scores, $interpretations) {
            $cat = $interpretations[$code] ?? null;
            return [
                'code' => $code,
                'score' => $scores[$code],
                'interpretation' => $cat ? [
                    'nickname' => $cat->nickname,
                    'description' => $cat->description,
                    'traits' => $cat->traits,
                    'branding' => $cat->branding_strategies,
                    'careers' => $cat->career_recommendations,
                ] : null,
            ];
        }, $rankings);

        // Top 3 untuk detail lengkap
        $topThree = array_slice($fullAnalysis, 0, 3);

        // Format scores untuk frontend
        $scoresArray = array_map(function($code) use ($scores) {
            return ['code' => $code, 'score' => $scores[$code]];
        }, $rankings);

        return response()->json([
            'success' => true,
            'result' => [
                'id' => $testResult->id,
                'scores' => $scoresArray,
                'full_analysis' => $fullAnalysis, // Semua 6 kategori
                'top_three' => $topThree, // Top 3 untuk detail
                'time_taken' => $validated['time_taken'],
            ],
        ]);

    } catch (\Exception $e) {
        DB::rollBack();
        \Log::error('RIASEC Submit Error: ' . $e->getMessage());
        
        return response()->json([
            'success' => false,
            'message' => 'Gagal menyimpan: ' . $e->getMessage(),
        ], 500);
    }
}
    public function quiz()
    {
        return Inertia::render('Layanan/TesMinatBakatRiasec/TesRiasec');
    }

    /**
     * Get user test history
     */
    public function history()
    {
        $results = RiasecTestResult::where('user_id', Auth::id())
            ->with('answers.question.category')
            ->latest()
            ->get()
            ->map(function ($result) {
                return [
                    'id' => $result->id,
                    'date' => $result->created_at->format('d M Y H:i'),
                    'time_taken' => $result->formatted_time,
                    'dominant_types' => $result->dominant_types,
                    'scores' => $result->scores_array
                ];
            });

        return response()->json($results);
    }
}
