<?php

namespace App\Filament\Resources\AdminActivityLogs\Schemas;

use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class AdminActivityLogForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('description')
                    ->required()
                    ->maxLength(255),
                TextInput::make('event')
                    ->maxLength(255),
                Textarea::make('properties')
                    ->columnSpanFull(),
            ]);
    }
}
