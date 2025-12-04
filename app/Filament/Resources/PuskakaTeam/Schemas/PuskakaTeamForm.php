<?php

namespace App\Filament\Resources\PuskakaTeam\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class PuskakaTeamForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                FileUpload::make('photo_path')
                    ->label('Foto Anggota Tim')
                    ->image()
                    ->imageEditor()
                    ->directory('puskaka-team-photos')
                    ->disk('public')
                    ->visibility('public')
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('name')
                    ->label('Nama Lengkap & Gelar')
                    ->required(),
                Textarea::make('title')
                    ->label('Jabatan')
                    ->required()
                    ->rows(3)
                    ->helperText('Bisa diisi lebih dari satu baris.'),
                Toggle::make('is_active')
                    ->label('Tampilkan di Website')
                    ->default(true),
                TextInput::make('sort_order')
                    ->label('Urutan Tampil')
                    ->numeric()
                    ->default(0)
                    ->helperText('Angka lebih kecil akan tampil lebih dulu.'),
            ]);
    }
}