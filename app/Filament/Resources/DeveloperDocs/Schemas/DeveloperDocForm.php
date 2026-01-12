<?php

namespace App\Filament\Resources\DeveloperDocs\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class DeveloperDocForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')->required()->label('Judul Kegiatan'),
                FileUpload::make('image')
                    ->image()
                    ->required()
                    ->directory('developer-docs')
                    ->label('Foto Dokumentasi'),
                TextInput::make('sort_order')
                    ->numeric()
                    ->default(0)
                    ->label('Urutan Tampil'),

                Toggle::make('is_active')
                    ->label('Aktif / Tampilkan')
                    ->default(true)
                    ->inline(false),
            ]);
    }
}
