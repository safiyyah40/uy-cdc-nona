<?php

namespace App\Filament\Resources\PuskakaGalleries\Pages;

use App\Filament\Resources\PuskakaGalleries\PuskakaGalleryResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditPuskakaGallery extends EditRecord
{
    protected static string $resource = PuskakaGalleryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
