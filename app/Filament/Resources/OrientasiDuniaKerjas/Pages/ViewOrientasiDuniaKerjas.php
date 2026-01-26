<?php

namespace App\Filament\Resources\OrientasiDuniaKerjas\Pages;

use App\Filament\Resources\OrientasiDuniaKerjas\OrientasiDuniaKerjaResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewOrientasiDuniaKerjas extends ViewRecord
{
    protected static string $resource = OrientasiDuniaKerjaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
