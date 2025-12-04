<?php

namespace App\Filament\Resources\Magangs\Pages;

use App\Filament\Resources\Magangs\MagangResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewMagang extends ViewRecord
{
    protected static string $resource = MagangResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
