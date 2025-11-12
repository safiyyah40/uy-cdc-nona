<?php

namespace App\Filament\Resources\PuskakaTeamResource\Pages;

use App\Filament\Resources\PuskakaTeams\PuskakaTeamResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditPuskakaTeam extends EditRecord
{
    protected static string $resource = PuskakaTeamResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
