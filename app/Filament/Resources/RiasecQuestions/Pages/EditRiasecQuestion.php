<?php

namespace App\Filament\Resources\RiasecQuestions\Pages;

use App\Filament\Resources\RiasecQuestions\RiasecQuestionResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditRiasecQuestion extends EditRecord
{
    protected static string $resource = RiasecQuestionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
