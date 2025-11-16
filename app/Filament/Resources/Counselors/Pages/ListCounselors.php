<?php

namespace App\Filament\Resources\Counselors\Pages;

use App\Filament\Resources\CounselorResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListCounselors extends ListRecords
{
    protected static string $resource = CounselorResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
