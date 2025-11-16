<?php

namespace App\Filament\Resources\PuskakaGalleries\Pages;

use App\Filament\Resources\PuskakaGalleryResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListPuskakaGalleries extends ListRecords
{
    protected static string $resource = PuskakaGalleryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
