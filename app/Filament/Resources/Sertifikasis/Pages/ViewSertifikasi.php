<?php

namespace App\Filament\Resources\Sertifikasis\Pages;

use App\Filament\Resources\Sertifikasis\SertifikasiResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewSertifikasi extends ViewRecord
{
    protected static string $resource = SertifikasiResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
