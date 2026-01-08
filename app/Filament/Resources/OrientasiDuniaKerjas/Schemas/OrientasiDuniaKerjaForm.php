<?php

namespace App\Filament\Resources\OrientasiDuniaKerjas\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\TagsInput;
use Filament\Schemas\Schema;

class OrientasiDuniaKerjaForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Utama')->schema([
                    Grid::make(2)->schema([
                        TextInput::make('title')
                            ->label('Judul Kegiatan/Materi')
                            ->required()
                            ->maxLength(255),

                        TagsInput::make('categories')
                            ->label('Kategori')
                            ->placeholder('Ketik kategori lalu tekan Enter')
                            ->suggestions([
                                'Strategi Karir',
                                'Personal Branding',
                                'Interview Hack',
                                'CV & Cover Letter',
                                'Etika Profesional',
                                'Soft Skill',
                                'Networking',
                                'Wirausaha',
                                'Studi Lanjut',
                                'Leadership',
                            ])
                            ->required()
                            ->columnSpan(2),
                    ]),

                    Textarea::make('description')
                        ->label('Deskripsi Singkat (Untuk Tampilan Depan)')
                        ->required()
                        ->rows(3),
                ]),

                Section::make('Detail Pelaksanaan')->schema([
                    Grid::make(3)->schema([
                        DatePicker::make('date')->label('Tanggal'),
                        TextInput::make('time')->label('Waktu (cth: 09:00 - 12:00 WIB)'),
                        TextInput::make('location')->label('Lokasi'),
                    ]),
                    TextInput::make('registration_link')
                        ->label('Link Pendaftaran (Opsional)')
                        ->url()
                        ->required(true)
                        ->prefixIcon('heroicon-m-link'),
                ]),

                Section::make('Konten & Media')->schema([
                    FileUpload::make('image')
                        ->label('Gambar Sampul/Poster')
                        ->image()
                        ->directory('orientasi-images'),

                    RichEditor::make('content')
                        ->label('Isi Materi / Detail Lengkap')
                        ->required(),
                ]),

                Toggle::make('is_active')->label('Tampilkan di Website?')->default(true),
            ]);
    }
}
