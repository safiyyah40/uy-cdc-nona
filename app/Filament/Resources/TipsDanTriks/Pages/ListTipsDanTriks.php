<?php

namespace App\Filament\Resources\TipsDanTriks\Pages;

use App\Filament\Resources\TipsDanTriks\TipsDanTrikResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListTipsDanTriks extends ListRecords
{
    protected static string $resource = TipsDanTrikResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
