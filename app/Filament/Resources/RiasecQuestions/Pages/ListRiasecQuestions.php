<?php

namespace App\Filament\Resources\RiasecQuestions\Pages;

use App\Filament\Resources\RiasecQuestions\RiasecQuestionResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListRiasecQuestions extends ListRecords
{
    protected static string $resource = RiasecQuestionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
