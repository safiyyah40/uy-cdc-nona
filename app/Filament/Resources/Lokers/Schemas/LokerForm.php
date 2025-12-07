<?php

namespace App\Filament\Resources\Lokers\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\TagsInput;
use Illuminate\Support\Str;

use Filament\Schemas\Schema;

class LokerForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Pekerjaan')
                    ->schema([
                        TextInput::make('title')
                            ->label('Posisi / Judul')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state))),

                        TextInput::make('slug')
                            ->required()
                            ->unique(ignoreRecord: true),

                        TextInput::make('company')
                            ->label('Nama Perusahaan')
                            ->required(),

                        TextInput::make('location')
                            ->label('Lokasi (Kota)')
                            ->required(),

                        Select::make('type')
                            ->label('Status Pegawai')
                            ->options([
                                'Full Time' => 'Full Time',
                                'Contract' => 'Contract',
                                'Freelance' => 'Freelance',
                                'Part Time' => 'Part Time',
                            ])->required(),

                        Select::make('work_model')
                            ->label('Model Kerja')
                            ->options([
                                'Onsite' => 'Onsite (WFO)',
                                'Remote' => 'Remote (WFH)',
                                'Hybrid' => 'Hybrid',
                            ])->required(),

                        Select::make('experience_level')
                            ->label('Level Pengalaman')
                            ->options([
                                'Fresh Graduate' => 'Fresh Graduate',
                                'Junior' => 'Junior',
                                'Mid-Level' => 'Mid-Level',
                                'Senior' => 'Senior',
                                'Executive' => 'Executive',
                            ])->required(),

                        TagsInput::make('categories')
                            ->label('Kategori Industri')
                            ->separator(',')
                            ->suggestions(['IT', 'Finance', 'Marketing', 'Sales', 'Engineering'])
                            ->required(),
                    ])->columns(2),

                Section::make('Gaji & Waktu')
                    ->schema([
                        TextInput::make('salary_min')->numeric()->prefix('Rp')->label('Gaji Min'),
                        TextInput::make('salary_max')->numeric()->prefix('Rp')->label('Gaji Max'),
                        DatePicker::make('posted_date')->default(now())->required(),
                        DatePicker::make('deadline')->required(),
                    ])->columns(2),

                Section::make('Detail Lengkap')
                    ->schema([
                        RichEditor::make('description')->label('Deskripsi')->columnSpanFull(),
                        RichEditor::make('requirements')->label('Kualifikasi')->columnSpanFull(),
                        RichEditor::make('benefits')->label('Benefit')->columnSpanFull(),
                    ]),

                Section::make('Media & Link')
                    ->schema([
                        FileUpload::make('logo')->directory('loker-logos')->image()->avatar(),
                        FileUpload::make('image')->directory('loker-images')->image()->label('Flyer/Poster'),
                        TextInput::make('application_url')->url()->prefix('https://')->label('Link Apply'),
                        Toggle::make('is_active')->default(true),
                    ])->columns(2),
            ]);
    }
}
