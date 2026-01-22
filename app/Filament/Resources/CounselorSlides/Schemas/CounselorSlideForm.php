<?php

namespace App\Filament\Resources\CounselorSlides\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class CounselorSlideForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Slide')
                    ->description('Kelola gambar yang akan tampil di Hero Section Profil Konselor')
                    ->schema([
                        TextInput::make('title')
                            ->label('Judul Dokumentasi')
                            ->required()
                            ->maxLength(255)
                            ->placeholder('Contoh: Sesi Konseling Mahasiswa'),

                        FileUpload::make('image_path')
                            ->label('Gambar Slide')
                            ->image()
                            ->directory('counselor-slides')
                            ->required()
                            ->imageEditor()
                            ->maxSize(5048)
                            ->helperText('Upload gambar dengan aspek rasio 4:3 untuk hasil terbaik.'),

                        TextInput::make('sort_order')
                            ->label('Urutan Tampil')
                            ->numeric()
                            ->default(0),

                        Toggle::make('is_active')
                            ->label('Aktifkan Slide')
                            ->default(true)
                            ->onColor('success'),
                ]),
        ]);
    }
}
