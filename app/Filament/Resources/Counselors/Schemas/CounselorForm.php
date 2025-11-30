<?php

namespace App\Filament\Resources\Counselors\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Grid;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TimePicker;


class CounselorForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                
                // --- INFORMASI UTAMA ---
                Section::make('Profil Konselor')
                    ->description('Informasi dasar mengenai konselor.')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextInput::make('name')
                                    ->label('Nama Lengkap (beserta gelar)')
                                    ->required()
                                    ->maxLength(255),

                                TextInput::make('title')
                                    ->label('Jabatan / Fakultas')
                                    ->required()
                                    ->maxLength(255),
                            ]),

                        FileUpload::make('photo_path')
                            ->label('Foto Profil')
                            ->disk('public')
                            ->directory('counselors')
                            ->image()
                            ->imageEditor()
                            ->required()
                            ->columnSpanFull(),

                        Grid::make(2)
                            ->schema([
                                TextInput::make('order_column')
                                    ->label('Nomor Urut Tampil')
                                    ->numeric()
                                    ->default(0),

                                Toggle::make('is_active')
                                    ->label('Aktifkan Konselor')
                                    ->onColor('success')
                                    ->default(true)
                                    ->inline(false),
                            ]),
                    ]),

                // --- JADWAL (REPEATER) ---
                Section::make('Jadwal Konsultasi')
                    ->description('Atur tanggal dan jam ketersediaan konselor.')
                    ->schema([
                        Repeater::make('slots')
                            ->relationship()
                            ->schema([
                                DatePicker::make('date')
                                    ->label('Tanggal')
                                    ->native(false)
                                    ->displayFormat('d F Y')
                                    ->required(),

                                TimePicker::make('start_time')
                                    ->label('Mulai')
                                    ->seconds(false)
                                    ->required(),

                                TimePicker::make('end_time')
                                    ->label('Selesai')
                                    ->seconds(false)
                                    ->required(),
                            ])
                            ->columns(3)
                            ->addActionLabel('Tambah Jadwal Baru')
                            ->defaultItems(0)
                            ->grid(2)
                            ->columnSpanFull(),
                    ]),
            ]);
    }
}