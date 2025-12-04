<?php

namespace App\Filament\Resources\PuskakaTeam\Pages;

use App\Filament\Resources\PuskakaTeamResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditPuskakaTeam extends EditRecord
{
    protected static string $resource = PuskakaTeamResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}