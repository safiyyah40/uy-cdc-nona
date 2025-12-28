<?php

namespace App\Filament\Resources\RiasecTestResults\Schemas;

use Filament\Forms\Components\Select;
use Filament\Schemas\Schema;

class RiasecTestResultForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('user_id')
                    ->label('Mahasiswa')
                    ->relationship('user', 'name')
                    ->required()
                    ->searchable()
                    ->disabled(),
            ]);
    }
}
