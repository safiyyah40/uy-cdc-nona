<?php

namespace App\Filament\Resources\CounselingBookings\Pages;

use App\Filament\Resources\CounselingBookings\CounselingBookingResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewCounselingBooking extends ViewRecord
{
    protected static string $resource = CounselingBookingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
