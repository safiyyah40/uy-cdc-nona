<?php

namespace App\Filament\Resources\RiasecCategories\Pages;

use App\Filament\Resources\RiasecCategories\RiasecCategoryResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListRiasecCategories extends ListRecords
{
    protected static string $resource = RiasecCategoryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
