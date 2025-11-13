<?php

namespace App\Filament\Resources\PuskakaTeamResource\Pages;

use App\Filament\Resources\PuskakaTeamResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListPuskakaTeams extends ListRecords
{
    protected static string $resource = PuskakaTeamResource::class;
    
    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}