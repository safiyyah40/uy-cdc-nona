<?php

namespace App\Filament\Resources\ContactInfos\Pages;

use App\Filament\Resources\ContactInfos\ContactInfoResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ManageRecords;
use App\Models\ContactInfo;

class ManageContactInfos extends ManageRecords
{
    protected static string $resource = ContactInfoResource::class;

    protected function getHeaderActions(): array
    {
        // Cek apakah sudah ada data
        $hasData = ContactInfo::exists();
        
        if (!$hasData) {
            return [
                CreateAction::make()
                    ->label('Buat Informasi Kontak')
                    ->icon('heroicon-o-plus'),
            ];
        }
        
        return [];
    }

    // Auto-redirect ke edit form jika sudah ada data
    public function mount(): void
    {
        parent::mount();
        
        $contact = ContactInfo::first();
        
        if ($contact) {
            // Redirect ke edit form
            redirect()->route('filament.admin.resources.contact-infos.edit', ['record' => $contact->id]);
        }
    }
}
