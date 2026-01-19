<?php

namespace App\Filament\Resources\ContactInfos\Pages;

use App\Filament\Resources\ContactInfos\ContactInfoResource;
use Filament\Resources\Pages\EditRecord;
use Filament\Notifications\Notification;

class EditContactInfo extends EditRecord
{
    protected static string $resource = ContactInfoResource::class;

    protected function getHeaderActions(): array
    {
        return [
        ];
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }

    protected function getSavedNotification(): ?Notification
    {
        return Notification::make()
            ->success()
            ->title('Informasi kontak berhasil diperbarui')
            ->body('Perubahan akan langsung terlihat di website.');
    }
}
