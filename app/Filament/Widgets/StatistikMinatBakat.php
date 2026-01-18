<?php

namespace App\Filament\Widgets;

use App\Models\RiasecTestResult;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Support\Carbon;

class StatistikMinatBakat extends BaseWidget
{
    // Urutan ke-5
    protected static ?int $sort = 5;

    protected function getStats(): array
    {
        return [
            // TOTAL KESELURUHAN (Arsip)
            Stat::make('Total Keseluruhan Percobaan Tes Minat Bakat', RiasecTestResult::where('status', 'completed')->count())
                ->description('Total seluruh riwayat tes')
                ->descriptionIcon('heroicon-m-academic-cap')
                ->color('gray'), // Abu-abu elegan
            // HARI INI (Realtime)
            Stat::make('Selesai Hari Ini', RiasecTestResult::where('status', 'completed')
                ->whereDate('updated_at', Carbon::today())
                ->count())
                ->description('Baru saja menyelesaikan tes')
                ->descriptionIcon('heroicon-m-sparkles')
                ->color('success'), // Hijau

            // BULAN INI (Tren)
            Stat::make('Selesai Bulan Ini', RiasecTestResult::where('status', 'completed')
                ->whereMonth('updated_at', Carbon::now()->month)
                ->whereYear('updated_at', Carbon::now()->year)
                ->count())
                ->description('Mahasiswa terpetakan bulan ini')
                ->descriptionIcon('heroicon-m-calendar-days')
                ->color('primary'), // Biru
        ];
    }
}