<?php

namespace App\Filament\Resources\DeveloperDocs\Pages;

use App\Filament\Resources\DeveloperDocs\DeveloperDocResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListDeveloperDocs extends ListRecords
{
    protected static string $resource = DeveloperDocResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
