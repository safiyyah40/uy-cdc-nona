<?php

namespace App\Filament\Resources\PuskakaGalleries\Pages;

use App\Filament\Resources\PuskakaGalleries\PuskakaGalleryResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewPuskakaGallery extends ViewRecord
{
    protected static string $resource = PuskakaGalleryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
