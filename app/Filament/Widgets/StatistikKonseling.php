<?php

namespace App\Filament\Widgets;

use App\Models\CounselingBooking;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatistikKonseling extends BaseWidget
{
    protected static ?int $sort = 3; 

    protected function getStats(): array
    {
        return [
            // Total Semua Sesi
            Stat::make('Total Sesi Konseling', CounselingBooking::count())
                ->description('Semua riwayat booking')
                ->descriptionIcon('heroicon-m-archive-box')
                ->color('gray'),

            // Status Menunggu (Pending)
            Stat::make('Menunggu Respon', CounselingBooking::where('status', 'pending')->count())
                ->description('Butuh persetujuan segera')
                ->descriptionIcon('heroicon-m-clock')
                ->color('warning'), // Kuning/Oranye

            // Status Disetujui / Akan Datang
            Stat::make('Disetujui / Akan Datang', CounselingBooking::where('status', 'accepted')->count())
                ->description('Siap dilaksanakan')
                ->descriptionIcon('heroicon-m-calendar')
                ->color('primary'), // Biru

            // Status Selesai
            Stat::make('Selesai', CounselingBooking::where('status', 'completed')->count())
                ->description('Sesi berhasil terlaksana')
                ->descriptionIcon('heroicon-m-check-circle')
                ->color('success'), // Hijau
        ];
    }
}