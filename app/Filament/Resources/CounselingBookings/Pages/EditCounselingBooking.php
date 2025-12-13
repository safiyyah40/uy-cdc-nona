<?php

namespace App\Filament\Resources\CounselingBookings\Pages;

use App\Filament\Resources\CounselingBookings\CounselingBookingResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ForceDeleteAction;
use Filament\Actions\RestoreAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditCounselingBooking extends EditRecord
{
    protected static string $resource = CounselingBookingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
            ForceDeleteAction::make(),
            RestoreAction::make(),
        ];
    }
}
