<?php

namespace App\Filament\Resources\PuskakaGalleries\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class PuskakaGalleryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->label('Judul / Keterangan')
                    ->maxLength(255),

                FileUpload::make('image_path')
                    ->label('Foto Dokumentasi')
                    ->image()
                    ->disk('public')
                    ->directory('puskaka-gallery')
                    ->required()
                    ->imageEditor()
                    ->visibility('public')
                    ->columnSpanFull(),

                Toggle::make('is_active')
                    ->label('Tampilkan di Website')
                    ->default(true),
            ]);
    }
}
