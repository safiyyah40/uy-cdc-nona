<?php

namespace App\Filament\Resources\Developers\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class DeveloperForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Utama')->schema([
                    Grid::make(2)->schema([
                        TextInput::make('name')->required()->label('Nama Lengkap'),
                        TextInput::make('npm')->label('NPM'),
                        TextInput::make('title')->required()->label('Posisi (Role)'),
                        TextInput::make('sort_order')
                            ->numeric()
                            ->default(0)
                            ->label('Urutan Tampil'),

                        Toggle::make('is_active')
                            ->label('Aktif / Tampilkan')
                            ->default(true)
                            ->inline(false),
                    ]),
                    FileUpload::make('photo')
                        ->image()
                        ->directory('developers')
                        ->label('Foto Profil')
                        ->columnSpanFull(),
                ]),

                Section::make('Kontak & Media Sosial')->schema([
                    Grid::make(2)->schema([
                        TextInput::make('email')
                            ->email()
                            ->prefixIcon('heroicon-m-envelope')
                            ->label('Email'),
                        TextInput::make('linkedin_url')
                            ->url()
                            ->prefixIcon('heroicon-m-link')
                            ->label('LinkedIn URL'),
                        TextInput::make('github_url')
                            ->url()
                            ->prefixIcon('heroicon-m-code-bracket')
                            ->label('GitHub URL'),
                        TextInput::make('instagram_url')
                            ->url()
                            ->prefixIcon('heroicon-m-camera')
                            ->label('Instagram URL'),
                    ]),
                ]),
            ]);
    }
}
