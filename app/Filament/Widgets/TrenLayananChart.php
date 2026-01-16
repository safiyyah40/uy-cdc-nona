<?php

namespace App\Filament\Widgets;

use App\Models\CounselingBooking;
use App\Models\CvReview;
use App\Models\RiasecTestResult;
use Filament\Widgets\ChartWidget;
use Flowframe\Trend\Trend;
use Flowframe\Trend\TrendValue;
use Illuminate\Support\Carbon;

class TrenLayananChart extends ChartWidget
{
    // Judul di atas grafik
    protected  ?string $heading = 'Tren Penggunaan Layanan';

    protected static ?int $sort = 6;

    // Agar grafik memanjang penuh (full width)
    protected int | string | array $columnSpan = 'full';

    // Opsi Filter di pojok kanan atas grafik
    protected function getFilters(): ?array
    {
        return [
            'month' => 'Bulan Ini (Harian)',
            'year' => 'Tahun Ini (Bulanan)',
        ];
    }

    protected function getData(): array
    {
        // Ambil filter yang dipilih user (default: month)
        $activeFilter = $this->filter;

        // Tentukan rentang waktu berdasarkan filter
        if ($activeFilter === 'year') {
            $start = now()->startOfYear();
            $end = now()->endOfYear();
            $perWhat = 'perMonth'; // Hitung per bulan
        } else {
            // Default: Bulan ini
            $start = now()->startOfMonth();
            $end = now()->endOfMonth();
            $perWhat = 'perDay'; // Hitung per hari
        }

        // DATA KONSELING
        $dataKonseling = Trend::model(CounselingBooking::class)
            ->between(start: $start, end: $end)
            ->$perWhat()
            ->count();

        // DATA REVIEW CV
        $dataCV = Trend::model(CvReview::class)
            ->between(start: $start, end: $end)
            ->$perWhat()
            ->count();

        // DATA TES MINAT BAKAT (RIASEC)
        $dataRiasec = Trend::model(RiasecTestResult::class)
            ->between(start: $start, end: $end)
            ->$perWhat()
            ->count();

        // Siapkan Label (Tanggal/Bulan di bawah grafik)
        // Kita ambil dari salah satu data saja (karena rentang waktunya sama)
        $labels = $dataKonseling->map(fn (TrendValue $value) =>
            $activeFilter === 'year' ? $value->date : $value->date
        );

        return [
            'datasets' => [
                [
                    'label' => 'Konseling Karir',
                    'data' => $dataKonseling->map(fn (TrendValue $value) => $value->aggregate),
                    'borderColor' => '#3b82f6', // Biru
                    'backgroundColor' => 'rgba(59, 130, 246, 0.1)',
                    'fill' => true,
                ],
                [
                    'label' => 'Review CV',
                    'data' => $dataCV->map(fn (TrendValue $value) => $value->aggregate),
                    'borderColor' => '#f59e0b', // Kuning/Oranye
                    'backgroundColor' => 'rgba(245, 158, 11, 0.1)',
                    'fill' => true,
                ],
                [
                    'label' => 'Tes Minat Bakat',
                    'data' => $dataRiasec->map(fn (TrendValue $value) => $value->aggregate),
                    'borderColor' => '#10b981', // Hijau
                    'backgroundColor' => 'rgba(16, 185, 129, 0.1)',
                    'fill' => true,
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}