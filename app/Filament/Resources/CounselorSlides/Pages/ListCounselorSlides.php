<?php

namespace App\Filament\Resources\CounselorSlides\Pages;

use App\Filament\Resources\CounselorSlides\CounselorSlideResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListCounselorSlides extends ListRecords
{
    protected static string $resource = CounselorSlideResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
