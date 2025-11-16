<?php

namespace App\Filament\Resources\Counselors\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class CounselorForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Nama Lengkap (beserta gelar)')
                    ->required()
                    ->maxLength(255),
                TextInput::make('title')
                    ->label('Jabatan / Fakultas')
                    ->required()
                    ->maxLength(255),
                FileUpload::make('photo_path')
                    ->label('Foto Profil')
                    ->disk('public')
                    ->directory('counselors')
                    ->image()
                    ->imageEditor()
                    ->columnSpanFull(),
                Toggle::make('is_active')
                    ->label('Tampilkan di Halaman Publik')
                    ->default(true)
                    ->required(),
                TextInput::make('order_column')
                    ->label('Nomor Urut')
                    ->numeric()
                    ->default(0),
            ]);
    }
}
