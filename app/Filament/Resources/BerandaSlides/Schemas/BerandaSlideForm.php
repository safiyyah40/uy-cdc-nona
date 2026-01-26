<?php

namespace App\Filament\Resources\BerandaSlides\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class BerandaSlideForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                FileUpload::make('image_path')
                    ->label('Gambar Slide')
                    ->image()
                    ->imageEditor()
                    ->directory('beranda-slides')
                    ->disk('public')
                    ->visibility('public')
                    ->required()
                    ->helperText('Ukuran ideal: 1400x600px atau rasio 7:3')
                    ->columnSpanFull(),
                TextInput::make('alt_text')
                    ->label('Alt Text (Deskripsi Gambar)')
                    ->placeholder('Contoh: Akreditasi Institusi Unggul')
                    ->maxLength(255)
                    ->helperText('Untuk accessibility dan SEO'),
                Toggle::make('is_active')
                    ->label('Tampilkan di Website')
                    ->default(true)
                    ->inline(false),
                TextInput::make('sort_order')
                    ->label('Urutan Tampil')
                    ->numeric()
                    ->default(0)
                    ->helperText('Angka lebih kecil akan tampil lebih dulu.')
                    ->required(),
            ]);
    }
}
