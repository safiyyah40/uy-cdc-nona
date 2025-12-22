<?php

namespace App\Filament\Resources\CvTemplates\Pages;

use App\Filament\Resources\CvTemplates\CvTemplateResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewCvTemplate extends ViewRecord
{
    protected static string $resource = CvTemplateResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
