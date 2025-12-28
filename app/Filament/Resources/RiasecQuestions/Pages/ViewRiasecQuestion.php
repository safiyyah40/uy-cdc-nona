<?php

namespace App\Filament\Resources\RiasecQuestions\Pages;

use App\Filament\Resources\RiasecQuestions\RiasecQuestionResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewRiasecQuestion extends ViewRecord
{
    protected static string $resource = RiasecQuestionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
