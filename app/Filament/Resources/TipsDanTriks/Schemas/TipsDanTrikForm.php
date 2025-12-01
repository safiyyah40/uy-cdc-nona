<?php

namespace App\Filament\Resources\TipsDanTriks\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Illuminate\Support\Str;
use Filament\Schemas\Schema;

class TipsDanTrikForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Group::make()
                ->schema([
                    Section::make('Konten Artikel')
                        ->schema([
                            TextInput::make('title')
                                ->label('Judul Tips')
                                ->required()
                                ->maxLength(255)
                                ->live(onBlur: true) 
                                ->afterStateUpdated(fn ($set, ?string $state) => $set('slug', Str::slug($state))),

                            TextInput::make('slug')
                                ->required()
                                ->unique(ignoreRecord: true)
                                ->maxLength(255),

                            Textarea::make('summary')
                                ->label('Ringkasan (Muncul di Card)')
                                ->required()
                                ->rows(3)
                                ->maxLength(500)
                                ->columnSpanFull()
                                ->helperText('Tulis rangkuman singkat yang menarik untuk memancing pembaca.'),

                            RichEditor::make('content')
                                ->label('Isi Lengkap Artikel')
                                ->required()
                                ->fileAttachmentsDirectory('tips-content')
                                ->columnSpanFull(),
                        ]),
                ])
                ->columnSpan(2),

            Group::make()
                ->schema([
                    Section::make('Meta Data')
                        ->schema([
                            FileUpload::make('thumbnail')
                                ->label('Gambar Sampul')
                                ->image()
                                ->directory('tips-thumbnails')
                                ->required(),

                            Select::make('category')
                                ->label('Kategori')
                                ->options([
                                    'Persiapan Karir' => 'Persiapan Karir',
                                    'Gaji & Keuangan' => 'Gaji & Keuangan',
                                    'Pengembangan Diri' => 'Pengembangan Diri',
                                    'Dunia Kerja' => 'Dunia Kerja',
                                ])
                                ->required()
                                ->searchable(),

                            TextInput::make('reading_time')
                                ->label('Estimasi Baca (Menit)')
                                ->numeric()
                                ->default(5)
                                ->suffix('Menit')
                                ->required(),

                            DatePicker::make('published_at')
                                ->label('Tanggal Publish')
                                ->default(now())
                                ->required(),

                            Toggle::make('is_active')
                                ->label('Tampilkan?')
                                ->default(true)
                                ->onColor('success')
                                ->offColor('danger'),
                        ]),
                ])
                ->columnSpan(1),
        ])->columns(3);
    }
}
