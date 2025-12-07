<?php

namespace App\Filament\Resources\Lokers\Pages;

use App\Filament\Resources\Lokers\LokerResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditLoker extends EditRecord
{
    protected static string $resource = LokerResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
