<?php

namespace App\Filament\Resources\CampusHirings\Pages;

use App\Filament\Resources\CampusHiringResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListCampusHirings extends ListRecords
{
    protected static string $resource = CampusHiringResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
