<?php

namespace App\Http\Controllers;

use App\Models\RiasecCategory;
use App\Models\RiasecQuestion;
use App\Models\RiasecTestAnswer;
use App\Models\RiasecTestResult;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
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
            'answers' => 'required|array',
            'time_taken' => 'required|integer|min:0',
        ]);

        try {
            DB::beginTransaction();

            // Hitung skor per kategori
            $scores = [
                'R' => 0, 'I' => 0, 'A' => 0,
                'S' => 0, 'E' => 0, 'C' => 0,
            ];

            $questions = RiasecQuestion::with('category')->whereIn('id', array_keys($validated['answers']))->get();

            foreach ($questions as $question) {
                $answerValue = (int) $validated['answers'][$question->id];
                $scores[$question->category->code] += $answerValue;
            }arsort($scores);
            $topThree = array_slice(array_keys($scores), 0, 3, true);

            // Simpan result
            $testResult = RiasecTestResult::create([
                'user_id' => Auth::id(),
                'score_r' => $scores['R'],
                'score_i' => $scores['I'],
                'score_a' => $scores['A'],
                'score_s' => $scores['S'],
                'score_e' => $scores['E'],
                'score_c' => $scores['C'],
                'dominant_type_1' => $topThree[0],
                'dominant_type_2' => $topThree[1],
                'dominant_type_3' => $topThree[2],
                'time_taken_seconds' => $validated['time_taken'],
                'total_questions_answered' => count($validated['answers']),
                'started_at' => now()->subSeconds($validated['time_taken']),
                'completed_at' => now(),
                'status' => 'completed',
            ]);

            // Simpan semua jawaban
            foreach ($questions as $question) {
                RiasecTestAnswer::create([
                    'test_result_id' => $testResult->id,
                    'question_id' => $question->id,
                    'answer_value' => (int) $validated['answers'][$question->id],
                ]);
            }

            DB::commit();

            // Load interpretations
            $interpretations = RiasecCategory::whereIn('code', $topThree)
                ->get()
                ->keyBy('code')
                ->map(function ($cat) {
                    return [
                        'code' => $cat->code,
                        'title' => $cat->title,
                        'nickname' => $cat->nickname,
                        'description' => $cat->description,
                        'icon' => $cat->icon_name,
                        'color' => [
                            'text' => $cat->color_class,
                            'bg' => $cat->bg_class,
                            'border' => $cat->border_class,
                            'badge' => $cat->badge_class,
                        ],
                        'traits' => $cat->traits,
                        'branding' => $cat->branding_strategies,
                        'careers' => $cat->career_recommendations,
                    ];
                });

            // Return result dengan interpretasi
            $result = [
                'id' => $testResult->id,
                'scores' => array_map(fn ($code) => [
                    'code' => $code,
                    'score' => $scores[$code],
                ], array_keys($scores)),
                'top_three' => array_map(fn ($code) => [
                    'code' => $code,
                    'score' => $scores[$code],
                    'interpretation' => $interpretations[$code] ?? null,
                ], $topThree),
                'time_taken' => $validated['time_taken'],
            ];

            return response()->json([
                'success' => true,
                'result' => $result,
            ]);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Gagal menyimpan hasil tes: '.$e->getMessage(),
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
                    'scores' => $result->scores_array,
                ];
            });

        return response()->json($results);
    }
}