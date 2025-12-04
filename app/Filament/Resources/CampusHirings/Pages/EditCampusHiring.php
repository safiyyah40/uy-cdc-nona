<?php

namespace App\Filament\Resources\CampusHirings\Pages;

use App\Filament\Resources\CampusHirings\CampusHiringResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditCampusHiring extends EditRecord
{
    protected static string $resource = CampusHiringResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
