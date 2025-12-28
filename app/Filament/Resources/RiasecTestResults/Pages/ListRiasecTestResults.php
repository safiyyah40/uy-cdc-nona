<?php

namespace App\Filament\Resources\RiasecTestResults\Pages;

use App\Filament\Resources\RiasecTestResults\RiasecTestResultResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListRiasecTestResults extends ListRecords
{
    protected static string $resource = RiasecTestResultResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
