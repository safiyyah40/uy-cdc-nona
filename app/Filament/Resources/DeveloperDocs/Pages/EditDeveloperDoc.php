<?php

namespace App\Filament\Resources\DeveloperDocs\Pages;

use App\Filament\Resources\DeveloperDocs\DeveloperDocResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditDeveloperDoc extends EditRecord
{
    protected static string $resource = DeveloperDocResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
