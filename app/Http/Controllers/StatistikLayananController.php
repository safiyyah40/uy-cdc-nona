<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CvReview;
use App\Models\CounselingBooking;
use App\Models\RiasecTestResult;
use Illuminate\Support\Facades\Log;

class StatistikLayananController extends Controller
{
    /**
     * Mengambil data statistik penggunaan layanan CDC.
     * Digunakan untuk Pie Chart di halaman beranda.
     * * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            // Hitung total penggunaan layanan Tes Minat Bakat (RIASEC)
            // Kita hitung yang statusnya 'completed' (selesai mengerjakan)
            $countRiasec = RiasecTestResult::where('status', 'completed')->count();

            // Hitung total penggunaan layanan CV Review
            // Kita hitung semua kecuali yang 'cancelled' (dibatalkan)
            $countCv = CvReview::where('status', '!=', 'cancelled')->count();

            // Hitung total penggunaan layanan Konsultasi Karir
            // Kita hitung semua booking kecuali yang 'cancelled' (dibatalkan)
            $countCounseling = CounselingBooking::where('status', '!=', 'cancelled')->count();

            // Hitung Total Keseluruhan untuk pembagi persentase
            $totalUsage = $countRiasec + $countCv + $countCounseling;

            // Jika belum ada data sama sekali, return 0 untuk menghindari error "division by zero"
            if ($totalUsage == 0) {
                return response()->json([
                    ['name' => 'Tes Minat dan Bakat', 'value' => 0],
                    ['name' => 'CV Review', 'value' => 0],
                    ['name' => 'Konsultasi Karir', 'value' => 0],
                ]);
            }

            // Format data sesuai format Recharts di Frontend
            // Kita kirim dalam bentuk Persentase (Round ke bilangan bulat)
            $data = [
                [
                    'name' => 'Tes Minat dan Bakat', 
                    'value' => round(($countRiasec / $totalUsage) * 100)
                ],
                [
                    'name' => 'CV Review', 
                    'value' => round(($countCv / $totalUsage) * 100)
                ],
                [
                    'name' => 'Konsultasi Karir', 
                    'value' => round(($countCounseling / $totalUsage) * 100)
                ],
            ];

            return response()->json($data);

        } catch (\Exception $e) {
            // Log error jika terjadi masalah koneksi database, dll
            Log::error("Gagal mengambil statistik layanan: " . $e->getMessage());
            
            // Return empty array atau error status
            return response()->json(['error' => 'Terjadi kesalahan server'], 500);
        }
    }
}