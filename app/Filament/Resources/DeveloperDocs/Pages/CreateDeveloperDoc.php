<?php

namespace App\Filament\Resources\DeveloperDocs\Pages;

use App\Filament\Resources\DeveloperDocs\DeveloperDocResource;
use Filament\Resources\Pages\CreateRecord;

class CreateDeveloperDoc extends CreateRecord
{
    protected static string $resource = DeveloperDocResource::class;
}
