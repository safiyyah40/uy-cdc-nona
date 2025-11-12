<?php

namespace App\Filament\Resources\PuskakaTeamResource\Pages;

use App\Filament\Resources\PuskakaTeams\PuskakaTeamResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewPuskakaTeam extends ViewRecord
{
    protected static string $resource = PuskakaTeamResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
