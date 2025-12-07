<?php

namespace App\Filament\Resources\Lokers\Pages;

use App\Filament\Resources\Lokers\LokerResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListLokers extends ListRecords
{
    protected static string $resource = LokerResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
