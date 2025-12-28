<?php

namespace App\Filament\Resources\RiasecTestResults\Pages;

use App\Filament\Resources\RiasecTestResults\RiasecTestResultResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewRiasecTestResult extends ViewRecord
{
    protected static string $resource = RiasecTestResultResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
