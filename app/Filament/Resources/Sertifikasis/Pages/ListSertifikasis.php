<?php

namespace App\Filament\Resources\Sertifikasis\Pages;

use App\Filament\Resources\Sertifikasis\SertifikasiResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListSertifikasis extends ListRecords
{
    protected static string $resource = SertifikasiResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
