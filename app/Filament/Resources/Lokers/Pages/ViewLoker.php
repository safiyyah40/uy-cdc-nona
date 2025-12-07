<?php

namespace App\Filament\Resources\Lokers\Pages;

use App\Filament\Resources\Lokers\LokerResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewLoker extends ViewRecord
{
    protected static string $resource = LokerResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
