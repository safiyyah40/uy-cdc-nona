<?php

namespace App\Filament\Resources\TipsDanTriks\Pages;

use App\Filament\Resources\TipsDanTriks\TipsDanTrikResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditTipsDanTrik extends EditRecord
{
    protected static string $resource = TipsDanTrikResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
