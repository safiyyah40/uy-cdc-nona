<?php

namespace App\Filament\Resources\Magangs\Pages;

use App\Filament\Resources\Magangs\MagangResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditMagang extends EditRecord
{
    protected static string $resource = MagangResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
