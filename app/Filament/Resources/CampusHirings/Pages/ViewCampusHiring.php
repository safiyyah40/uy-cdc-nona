<?php

namespace App\Filament\Resources\CampusHirings\Pages;

use App\Filament\Resources\CampusHiringResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewCampusHiring extends ViewRecord
{
    protected static string $resource = CampusHiringResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
