<?php

namespace App\Filament\Resources\CampusHirings\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Grid;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\TimePicker;
use Illuminate\Support\Str;
use Filament\Schemas\Schema;

class CampusHiringForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Dasar')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextInput::make('title')
                                    ->label('Judul Program')
                                    ->required()
                                    ->maxLength(255)
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(function (string $operation, $state, callable $set) {
                                        if ($operation !== 'create') {
                                            return;
                                        }
                                        $set('slug', Str::slug($state));
                                    }),

                                TextInput::make('slug')
                                    ->label('Slug')
                                    ->required()
                                    ->maxLength(255)
                                    ->unique(ignoreRecord: true)
                                    ->helperText('URL-friendly versi dari judul'),
                            ]),

                        TextInput::make('company_name')
                            ->label('Perusahaan/Penyelenggara')
                            ->required()
                            ->maxLength(255),

                        Textarea::make('description')
                            ->label('Deskripsi Singkat')
                            ->required()
                            ->rows(3)
                            ->maxLength(500)
                            ->helperText('Deskripsi singkat yang akan muncul di card (maks. 500 karakter)'),
                    ])
                    ->collapsible(),

                Section::make('Detail Acara')
                    ->schema([
                        Grid::make(3)
                            ->schema([
                                DatePicker::make('date')
                                    ->label('Tanggal')
                                    ->required()
                                    ->native(false)
                                    ->displayFormat('d/m/Y'),

                                TimePicker::make('time')
                                ->label('Waktu')
                                ->seconds(false)
                                ->required(),

                                TextInput::make('location')
                                    ->label('Lokasi')
                                    ->required()
                                    ->maxLength(255),
                            ]),

                        TextInput::make('registration_link')
                            ->label('Link Pendaftaran')
                            ->url()
                            ->maxLength(500)
                            ->placeholder('https://...')
                            ->helperText('Link untuk pendaftaran peserta'),
                    ])
                    ->collapsible(),

                Section::make('Konten Detail')
                    ->schema([
                        RichEditor::make('content')
                            ->label('Konten Lengkap')
                            ->required()
                            ->toolbarButtons([
                                'bold', 'italic', 'underline', 'strike', 'link',
                                'h2', 'h3', 'bulletList', 'orderedList',
                                'blockquote', 'codeBlock',
                            ])
                            ->helperText('Konten detail yang akan ditampilkan di halaman detail program'),
                    ])
                    ->collapsible(),

                Section::make('Media')
                    ->schema([
                        FileUpload::make('image')
                            ->label('Gambar Program')
                            ->image()
                            ->directory('campus-hiring')
                            ->maxSize(2048)
                            ->imageEditor()
                            ->imageEditorAspectRatios([
                                '16:9',
                                '4:3',
                            ])
                            ->helperText('Ukuran maksimal 2MB. Rasio yang direkomendasikan: 16:9'),
                    ])
                    ->collapsible(),

                Section::make('Status')
                    ->schema([
                        Toggle::make('is_active')
                            ->label('Aktif')
                            ->default(true)
                            ->helperText('Program yang tidak aktif tidak akan ditampilkan di website'),
                    ])
                    ->collapsible(),
            ]);
    }
}