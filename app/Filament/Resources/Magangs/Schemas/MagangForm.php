<?php

namespace App\Filament\Resources\Magangs\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\RichEditor;
use Illuminate\Support\Str;
use Filament\Schemas\Schema;

class MagangForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Utama')
                    ->schema([
                        TextInput::make('title')
                            ->label('Judul Lowongan')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn($state, callable $set) => $set('slug', Str::slug($state))),

                        TextInput::make('slug')
                            ->label('Slug (URL)')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true)
                            ->helperText('Akan otomatis terisi dari judul'),

                        TextInput::make('company')
                            ->label('Nama Perusahaan')
                            ->required()
                            ->maxLength(255),
                    ])
                    ->columns(2),

                Section::make('Detail Lokasi & Waktu')
                    ->schema([
                        TextInput::make('location')
                            ->label('Lokasi')
                            ->required()
                            ->maxLength(255)
                            ->placeholder('Jakarta, Bandung, Remote, dll'),

                        Select::make('type')
                            ->label('Tipe Magang')
                            ->options([
                                'Full Time' => 'Full Time',
                                'Part Time' => 'Part Time',
                                'Hybrid' => 'Hybrid',
                                'Remote' => 'Remote',
                            ])
                            ->required()
                            ->default('Full Time'),

                        DatePicker::make('posted_date')
                            ->label('Tanggal Posting')
                            ->required()
                            ->default(now())
                            ->native(false),

                        DatePicker::make('deadline')
                            ->label('Deadline Lamaran')
                            ->required()
                            ->native(false)
                            ->minDate(now()),
                    ])
                    ->columns(2),

                Section::make('Kategori & Gaji')
                    ->schema([
                        TagsInput::make('categories')
                            ->label('Kategori')
                            ->placeholder('Tekan Enter untuk menambah kategori')
                            ->suggestions([
                                'Ekonomi / Perbankan',
                                'Teknologi',
                                'Kesehatan',
                                'Pendidikan',
                                'Marketing',
                                'Layanan Finansial',
                                'Digital Banking',
                                'E-commerce',
                                'Data Science',
                                'Software Engineering',
                                'Product Management',
                            ])
                            ->required(),

                        TextInput::make('salary_min')
                            ->label('Gaji Minimum')
                            ->numeric()
                            ->prefix('Rp')
                            ->placeholder('3000000')
                            ->helperText('Opsional'),

                        TextInput::make('salary_max')
                            ->label('Gaji Maksimum')
                            ->numeric()
                            ->prefix('Rp')
                            ->placeholder('5000000')
                            ->helperText('Opsional'),
                    ])
                    ->columns(3),

                    Section::make('Link & Status')
                    ->schema([
                        TextInput::make('application_url')
                            ->label('Link Pendaftaran')
                            ->url()
                            ->placeholder('https://example.com/apply')
                            ->helperText('URL untuk melamar pekerjaan'),

                        Toggle::make('is_active')
                            ->label('Aktif')
                            ->default(true)
                            ->helperText('Matikan untuk menyembunyikan lowongan'),
                    ])
                    ->columns(2),

                Section::make('Deskripsi & Detail')
                    ->schema([
                        RichEditor::make('description')
                            ->label('Deskripsi Program')
                            ->required()
                            ->columnSpanFull()
                            ->toolbarButtons([
                                'bold',
                                'italic',
                                'underline',
                                'bulletList',
                                'orderedList',
                                'link',
                                'undo',
                                'redo',
                            ]),

                        RichEditor::make('requirements')
                            ->label('Persyaratan')
                            ->required()
                            ->columnSpanFull()
                            ->toolbarButtons([
                                'bold',
                                'italic',
                                'bulletList',
                                'orderedList',
                                'undo',
                                'redo',
                            ]),

                        RichEditor::make('benefits')
                            ->label('Benefit / Fasilitas')
                            ->required()
                            ->columnSpanFull()
                            ->toolbarButtons([
                                'bold',
                                'italic',
                                'bulletList',
                                'orderedList',
                                'undo',
                                'redo',
                            ]),
                    ]),

                    Section::make('Media & Branding')
                    ->schema([
                        FileUpload::make('logo')
                            ->label('Logo Perusahaan (Kecil)')
                            ->image()
                            ->directory('magang-logos')
                            ->visibility('public')
                            ->maxSize(2048)
                            ->helperText('Maksimal 2MB, format: JPG, PNG'),

                        FileUpload::make('image')
                            ->label('Foto Kegiatan / Flyer (Besar)')
                            ->image()
                            ->directory('magang-images')
                            ->visibility('public')
                            ->maxSize(5120)
                            ->columnSpanFull()
                            ->helperText('Upload flyer atau foto suasana kerja (Opsional). Maksimal 5MB, format: JPG, PNG'),
                    ])
                    ->columns(2),
            ]);
    }
}
