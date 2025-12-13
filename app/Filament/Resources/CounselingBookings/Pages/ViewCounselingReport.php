<?php

namespace App\Filament\Resources\CounselingBookings\Pages;

use App\Filament\Resources\CounselingBookings\CounselingBookingResource;
use Filament\Resources\Pages\Page;
use Illuminate\Support\Facades\Storage;

class ViewCounselingReport extends Page
{
    protected static string $resource = CounselingBookingResource::class;
    
    protected string $view = 'filament.resources.counseling-booking-resource.pages.view-counseling-report';
    
    protected static ?string $title = 'Laporan Hasil Konseling';

    public $record;

    public function mount($record): void
    {
        $this->record = static::getResource()::resolveRecordRouteBinding($record);
    }

    public function getDocumentationFiles(): array
    {
        if (!$this->record->report || !$this->record->report->documentation_files) {
            return [];
        }

        return collect($this->record->report->documentation_files)->map(function ($path) {
            return [
                'path' => $path,
                'url' => asset('storage/' . $path), 
                'name' => basename($path),
                'is_image' => preg_match('/\.(jpg|jpeg|png|gif|webp)$/i', $path),
                'extension' => strtoupper(pathinfo($path, PATHINFO_EXTENSION)),
            ];
        })->toArray();
    }
}