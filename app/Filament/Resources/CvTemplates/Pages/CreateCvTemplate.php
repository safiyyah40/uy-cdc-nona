<?php

namespace App\Filament\Resources\CvTemplates\Pages;

use App\Filament\Resources\CvTemplates\CvTemplateResource;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Auth;

class CreateCvTemplate extends CreateRecord
{
    protected static string $resource = CvTemplateResource::class;
    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['dibuat_oleh'] = Auth::id();
        return $data;
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
