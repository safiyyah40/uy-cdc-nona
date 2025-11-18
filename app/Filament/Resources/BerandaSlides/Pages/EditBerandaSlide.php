<?php

namespace App\Filament\Resources\BerandaSlides\Pages;

use App\Filament\Resources\BerandaSlideResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditBerandaSlide extends EditRecord
{
    protected static string $resource = BerandaSlideResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
