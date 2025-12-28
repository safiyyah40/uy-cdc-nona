<?php

namespace App\Filament\Resources\RiasecCategories\Pages;

use App\Filament\Resources\RiasecCategories\RiasecCategoryResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditRiasecCategory extends EditRecord
{
    protected static string $resource = RiasecCategoryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
