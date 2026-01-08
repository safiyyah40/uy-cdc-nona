<?php

namespace App\Filament\Resources\OrientasiDuniaKerjas\Pages;

use App\Filament\Resources\OrientasiDuniaKerjas\OrientasiDuniaKerjaResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListOrientasiDuniaKerjas extends ListRecords
{
    protected static string $resource = OrientasiDuniaKerjaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
