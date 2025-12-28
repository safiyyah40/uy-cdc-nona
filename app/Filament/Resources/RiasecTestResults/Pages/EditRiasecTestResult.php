<?php

namespace App\Filament\Resources\RiasecTestResults\Pages;

use App\Filament\Resources\RiasecTestResults\RiasecTestResultResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditRiasecTestResult extends EditRecord
{
    protected static string $resource = RiasecTestResultResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
