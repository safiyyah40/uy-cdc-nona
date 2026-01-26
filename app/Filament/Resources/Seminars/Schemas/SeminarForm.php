<?php

namespace App\Filament\Resources\Seminars\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\TimePicker;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class SeminarForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Group::make()
                    ->schema([
                        Section::make('Informasi Utama')
                            ->schema([
                                TextInput::make('title')
                                    ->label('Judul Seminar')
                                    ->required(),
                                TextInput::make('slug')
                                    ->required()
                                    ->unique(ignoreRecord: true),
                                TextInput::make('speaker')
                                    ->label('Narasumber')
                                    ->prefixIcon('heroicon-m-user')
                                    ->required(),
                                TextInput::make('organizer')
                                    ->label('Penyelenggara')
                                    ->prefixIcon('heroicon-m-building-office')
                                    ->required(),
                                TextInput::make('registration_link')
                                    ->label('Link Pendaftaran')
                                    ->url()
                                    ->suffixIcon('heroicon-m-link')
                                    ->placeholder('https://...'),
                            ])->columns(2),

                        Section::make('Detail Acara')
                            ->schema([
                                Select::make('type')
                                    ->label('Tipe Acara')
                                    ->options([
                                        'Offline' => 'Offline (Tatap Muka)',
                                        'Online' => 'Online (Daring)',
                                        'Hybrid' => 'Hybrid (Campuran)',
                                    ])
                                    ->required()
                                    ->native(false),
                                TextInput::make('location')
                                    ->label('Lokasi / Platform')
                                    ->placeholder('cth: Auditorium Lt. 2 / Zoom Meeting')
                                    ->required(),
                                DatePicker::make('date')
                                    ->label('Tanggal Acara')
                                    ->required()
                                    ->native(false)
                                    ->displayFormat('d M Y'),
                                TimePicker::make('time')
                                    ->label('Waktu Mulai')
                                    ->required(),
                            ])->columns(2),
                    ])->columnSpan(2),
                Group::make()
                    ->schema([
                        Section::make('Media')
                            ->schema([
                                FileUpload::make('image')
                                    ->label('Poster Seminar')
                                    ->image()
                                    ->imageEditor()
                                    ->disk('public')
                                    ->visibility('public')
                                    ->directory('seminars')
                                    ->required()
                                    ->columnSpanFull(),
                            ]),
                        Section::make('Status')
                            ->schema([
                                Toggle::make('is_active')
                                    ->label('Publikasikan?')
                                    ->default(true)
                                    ->onColor('success')
                                    ->offColor('danger'),
                            ]),
                    ])->columnSpan(1),
                Section::make('Konten Lengkap')
                    ->schema([
                        Textarea::make('description')
                            ->label('Deskripsi Singkat')
                            ->rows(3)
                            ->required(),
                        RichEditor::make('benefits')
                            ->label('Benefit / Keuntungan')
                            ->toolbarButtons(['bulletList', 'bold', 'italic'])
                            ->placeholder('cth: Sertifikat, Ilmu Bermanfaat, Snack...'),

                        RichEditor::make('content')
                            ->label('Detail Lengkap Acara')
                            ->fileAttachmentsDirectory('seminar-attachments'),
                    ])->columnSpanFull(),
            ])->columns(3);
    }
}
