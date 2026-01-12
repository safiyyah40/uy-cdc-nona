<?php

namespace App\Filament\Resources\DeveloperDocs\Pages;

use App\Filament\Resources\DeveloperDocs\DeveloperDocResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewDeveloperDoc extends ViewRecord
{
    protected static string $resource = DeveloperDocResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
