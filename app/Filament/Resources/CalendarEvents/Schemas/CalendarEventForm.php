<?php

namespace App\Filament\Resources\CalendarEvents\Schemas;

use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\TimePicker;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class CalendarEventForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Event')
                    ->schema([
                        TextInput::make('title')
                            ->label('Judul Event')
                            ->required()
                            ->maxLength(255),

                        Textarea::make('description')
                            ->label('Deskripsi')
                            ->rows(3)
                            ->columnSpanFull(),

                        Select::make('event_type')
                            ->label('Tipe Event')
                            ->options([
                                'seminar' => 'Seminar',
                                'campus_hiring' => 'Campus Hiring',
                                'konsultasi' => 'Konsultasi',
                                'deadline_loker' => 'Deadline Loker',
                                'deadline_magang' => 'Deadline Magang',
                                'sertifikasi' => 'Sertifikasi',
                                'orientasi' => 'Orientasi',
                                'berita' => 'Berita',
                                'custom' => 'Custom Event',
                            ])
                            ->required()
                            ->searchable(),
                    ])
                    ->columns(2),

                Section::make('Jadwal')
                    ->schema([
                        DatePicker::make('start_date')
                            ->label('Tanggal Mulai')
                            ->required()
                            ->native(false),

                        DatePicker::make('end_date')
                            ->label('Tanggal Selesai (Opsional)')
                            ->native(false),

                        TimePicker::make('start_time')
                            ->label('Waktu Mulai')
                            ->seconds(false),

                        TimePicker::make('end_time')
                            ->label('Waktu Selesai')
                            ->seconds(false),
                    ])
                    ->columns(2),

                Section::make('Detail Lokasi & Link')
                    ->schema([
                        TextInput::make('location')
                            ->label('Lokasi')
                            ->maxLength(255),

                        TextInput::make('link')
                            ->label('Link Detail')
                            ->url()
                            ->maxLength(255),

                        TextInput::make('registration_url')
                            ->label('Link Registrasi')
                            ->url()
                            ->maxLength(255),
                    ])
                    ->columns(1),

                Section::make('Tampilan')
                    ->schema([
                        ColorPicker::make('color')
                            ->label('Warna')
                            ->default('#10b981'),

                        TextInput::make('icon')
                            ->label('Icon (Lucide)')
                            ->default('Calendar'),

                        Select::make('priority')
                            ->label('Prioritas')
                            ->options([
                                'low' => 'Rendah',
                                'medium' => 'Sedang',
                                'high' => 'Tinggi',
                                'urgent' => 'Mendesak',
                            ])
                            ->default('medium'),
                    ])
                    ->columns(3),

                Section::make('Visibility')
                    ->schema([
                        Toggle::make('is_visible_to_mahasiswa')
                            ->label('Tampil untuk Mahasiswa')
                            ->default(true),

                        Toggle::make('is_visible_to_konselor')
                            ->label('Tampil untuk Konselor')
                            ->default(true),

                        Toggle::make('is_visible_to_admin')
                            ->label('Tampil untuk Admin')
                            ->default(true),

                        Toggle::make('is_active')
                            ->label('Aktif')
                            ->default(true),

                        Toggle::make('is_featured')
                            ->label('Highlight/Featured')
                            ->default(false),
                    ])
                    ->columns(3),
            ]);
    }
}