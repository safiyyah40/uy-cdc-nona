<?php

namespace App\Filament\Resources\RiasecCategories\Pages;

use App\Filament\Resources\RiasecCategories\RiasecCategoryResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewRiasecCategory extends ViewRecord
{
    protected static string $resource = RiasecCategoryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
