<?php

namespace App\Filament\Resources\CounselingBookings\Pages;

use App\Filament\Resources\CounselingBookings\CounselingBookingResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListCounselingBookings extends ListRecords
{
    protected static string $resource = CounselingBookingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
