<?php

namespace App\Filament\Resources\BerandaSlides\Pages;

use App\Filament\Resources\BerandaSlides\BerandaSlideResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListBerandaSlides extends ListRecords
{
    protected static string $resource = BerandaSlideResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
