<?php

namespace App\Filament\Resources\Counselors\Pages;

use App\Filament\Resources\Counselors\CounselorResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

/** @var \App\Models\Counselor $record */

class EditCounselor extends EditRecord
{
    protected static string $resource = CounselorResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make()
                ->before(function () {
                    if ($this->record->user) {
                        $this->record->user->update(['role' => 'dosen_staf']);
                    }
                }),
        ];
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }

    protected function getSavedNotificationTitle(): ?string
    {
        return 'Data konselor berhasil diperbarui!';
    }
}
