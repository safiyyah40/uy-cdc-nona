<?php

namespace App\Filament\Resources\TipsDanTriks\Pages;

use App\Filament\Resources\TipsDanTriks\TipsDanTrikResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewTipsDanTrik extends ViewRecord
{
    protected static string $resource = TipsDanTrikResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
