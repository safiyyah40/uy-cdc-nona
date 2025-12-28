<?php

namespace App\Filament\Resources\RiasecCategories\Schemas;

use Filament\Schemas\Components\Section;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class RiasecCategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Dasar')
                    ->schema([
                        TextInput::make('code')
                            ->label('Kode (R/I/A/S/E/C)')
                            ->required()
                            ->maxLength(1)
                            ->columnSpan(1),
                        
                        TextInput::make('title')
                            ->label('Judul')
                            ->required()
                            ->maxLength(255)
                            ->columnSpan(1),
                        
                        TextInput::make('nickname')
                            ->label('Nickname')
                            ->required()
                            ->maxLength(255)
                            ->columnSpanFull(),
                        
                        Textarea::make('description')
                            ->label('Deskripsi')
                            ->required()
                            ->rows(4)
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                Section::make('Konten')
                    ->schema([
                        TagsInput::make('traits')
                            ->label('Karakteristik')
                            ->placeholder('Tambah trait...')
                            ->required(),
                        
                        TagsInput::make('branding_strategies')
                            ->label('Strategi Branding')
                            ->placeholder('Tambah strategi...')
                            ->required(),
                        
                        TagsInput::make('career_recommendations')
                            ->label('Rekomendasi Karir')
                            ->placeholder('Tambah karir...'),
                    ]),

                Section::make('Settings')
                    ->schema([
                        Toggle::make('is_active')
                            ->label('Aktif')
                            ->default(true),
                        
                        TextInput::make('order')
                            ->label('Urutan')
                            ->numeric()
                            ->default(0),
                    ])
                    ->columns(2),
            ]);
    }
}
