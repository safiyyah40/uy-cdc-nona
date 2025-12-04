<?php

namespace App\Filament\Resources\BerandaSlides\Pages;

use App\Filament\Resources\BerandaSlides\BerandaSlideResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewBerandaSlide extends ViewRecord
{
    protected static string $resource = BerandaSlideResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
