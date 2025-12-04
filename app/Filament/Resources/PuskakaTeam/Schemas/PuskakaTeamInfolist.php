<?php

namespace App\Filament\Resources\PuskakaTeam\Schemas;

use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class PuskakaTeamInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                ImageEntry::make('photo_path')
                    ->label('Foto'),
                TextEntry::make('name')
                    ->label('Nama'),
                TextEntry::make('title')
                    ->label('Jabatan'),
                IconEntry::make('is_active')
                    ->label('Aktif')
                    ->boolean(),
                TextEntry::make('sort_order')
                    ->label('Urutan')
                    ->numeric(),
                TextEntry::make('created_at')
                    ->label('Dibuat')
                    ->dateTime(),
                TextEntry::make('updated_at')
                    ->label('Diperbarui')
                    ->dateTime(),
            ]);
    }
}