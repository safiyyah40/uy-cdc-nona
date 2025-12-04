<?php

namespace App\Filament\Resources\Magangs\Pages;

use App\Filament\Resources\Magangs\MagangResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListMagangs extends ListRecords
{
    protected static string $resource = MagangResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
