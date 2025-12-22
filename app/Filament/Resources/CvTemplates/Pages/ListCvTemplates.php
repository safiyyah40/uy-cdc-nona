<?php

namespace App\Filament\Resources\CvTemplates\Pages;

use App\Filament\Resources\CvTemplates\CvTemplateResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;
use Filament\Resources\Components\Tab;

class ListCvTemplates extends ListRecords
{
    protected static string $resource = CvTemplateResource::class;

     protected function getHeaderActions(): array
    {
        return [
            CreateAction::make()
                ->label('Tambah Template Baru'),
        ];
    }
}
