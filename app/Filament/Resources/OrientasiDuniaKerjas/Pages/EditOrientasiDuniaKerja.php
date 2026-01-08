<?php

namespace App\Filament\Resources\OrientasiDuniaKerjas\Pages;

use App\Filament\Resources\OrientasiDuniaKerjas\OrientasiDuniaKerjaResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditOrientasiDuniaKerja extends EditRecord
{
    protected static string $resource = OrientasiDuniaKerjaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
