<?php

namespace App\Filament\Resources\CounselorSlides\Pages;

use App\Filament\Resources\CounselorSlides\CounselorSlideResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewCounselorSlide extends ViewRecord
{
    protected static string $resource = CounselorSlideResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
