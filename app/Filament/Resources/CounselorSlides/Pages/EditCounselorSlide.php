<?php

namespace App\Filament\Resources\CounselorSlides\Pages;

use App\Filament\Resources\CounselorSlides\CounselorSlideResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditCounselorSlide extends EditRecord
{
    protected static string $resource = CounselorSlideResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
