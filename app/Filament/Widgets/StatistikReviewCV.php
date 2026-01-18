<?php

namespace App\Filament\Widgets;

use App\Models\CvReview;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatistikReviewCV extends BaseWidget
{
    protected static ?int $sort = 4;

    protected function getStats(): array
    {
        return [
            // Total Masuk
            Stat::make('Total CV Masuk', CvReview::count())
                ->icon('heroicon-m-document-duplicate')
                ->color('gray'),

            // Menunggu
            Stat::make('Menunggu Review', CvReview::where('status', 'submitted')->count())
                ->description('Belum diproses sama sekali')
                ->descriptionIcon('heroicon-m-inbox-arrow-down')
                ->color('danger'), // Merah

            // Sedang Proses
            Stat::make('Sedang Direview', CvReview::whereIn('status', ['assigned', 'in_review'])->count())
                ->description('Sedang dikerjakan konselor')
                ->descriptionIcon('heroicon-m-pencil-square')
                ->color('warning'), // Kuning

            // Selesai
            Stat::make('Selesai', CvReview::where('status', 'completed')->count())
                ->description('Feedback sudah dikirim')
                ->descriptionIcon('heroicon-m-check-badge')
                ->color('success'), // Hijau
        ];
    }
}