<?php

namespace App\Filament\Resources\Sertifikasis\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;

class SertifikasiForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Tabs')
                    ->tabs([
                        Tab::make('Informasi Dasar')
                            ->icon('heroicon-o-information-circle')
                            ->schema([
                                TextInput::make('title')
                                    ->label('Judul Program')
                                    ->required()
                                    ->maxLength(255)
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state))),

                                TextInput::make('slug')
                                    ->required()
                                    ->maxLength(255)
                                    ->unique(ignoreRecord: true)
                                    ->helperText('URL-friendly identifier. Pastikan ini terisi sebelum upload file agar nama file rapi.')
                                    ->live(),

                                Textarea::make('description')
                                    ->label('Deskripsi Singkat')
                                    ->rows(3)
                                    ->maxLength(500)
                                    ->helperText('Deskripsi ringkas yang muncul di card preview'),

                                RichEditor::make('content')
                                    ->label('Konten Detail')
                                    ->columnSpanFull()
                                    ->toolbarButtons([
                                        'bold',
                                        'italic',
                                        'underline',
                                        'strike',
                                        'link',
                                        'h2',
                                        'h3',
                                        'bulletList',
                                        'orderedList',
                                        'blockquote',
                                        'codeBlock',
                                    ]),
                            ]),

                        Tab::make('Provider & Kategori')
                            ->icon('heroicon-o-building-office-2')
                            ->schema([
                                TextInput::make('provider_name')
                                    ->label('Nama Penyedia')
                                    ->required()
                                    ->maxLength(255)
                                    ->helperText('Contoh: Google, Coursera, Universitas YARSI'),

                                FileUpload::make('logo')
                                    ->label('Logo Penyedia')
                                    ->image()
                                    ->directory('sertifikasi/logos')
                                    ->visibility('public')
                                    ->maxSize(2048)
                                    ->helperText('Upload logo penyedia (maks. 2MB)')
                                    ->getUploadedFileNameForStorageUsing(function (TemporaryUploadedFile $file, callable $get) {
                                        $slug = $get('slug') ?? 'provider';

                                        return (string) str($slug)
                                            ->prepend('logo-')
                                            ->append('-', now()->timestamp)
                                            ->append('.', $file->getClientOriginalExtension());
                                    }),

                                TagsInput::make('categories')
                                    ->label('Kategori')
                                    ->required()
                                    ->helperText('Tekan Enter untuk menambah kategori'),

                                Select::make('type')
                                    ->label('Jenis Program')
                                    ->required()
                                    ->options([
                                        'Sertifikasi' => 'Sertifikasi',
                                        'Kursus' => 'Kursus',
                                        'Workshop' => 'Workshop',
                                        'Bootcamp' => 'Bootcamp',
                                    ])
                                    ->default('Sertifikasi'),

                                Select::make('level')
                                    ->label('Level Kesulitan')
                                    ->required()
                                    ->options([
                                        'Beginner' => 'Beginner',
                                        'Intermediate' => 'Intermediate',
                                        'Advanced' => 'Advanced',
                                        'All Levels' => 'All Levels',
                                    ])
                                    ->default('All Levels'),

                                TagsInput::make('tags')
                                    ->label('Tags')
                                    ->helperText('Tags untuk SEO (python, java, machine-learning, dll)'),
                            ]),

                        Tab::make('Lokasi & Jadwal')
                            ->icon('heroicon-o-calendar-days')
                            ->schema([
                                Select::make('mode')
                                    ->label('Mode Pembelajaran')
                                    ->required()
                                    ->options([
                                        'Online' => 'Online',
                                        'Offline' => 'Offline',
                                        'Hybrid' => 'Hybrid',
                                    ])
                                    ->default('Online')
                                    ->live(),

                                TextInput::make('location')
                                    ->label('Lokasi')
                                    ->maxLength(255)
                                    ->visible(fn (callable $get) => in_array($get('mode'), ['Offline', 'Hybrid']))
                                    ->helperText('Lokasi fisik jika offline/hybrid'),

                                TextInput::make('duration')
                                    ->label('Durasi')
                                    ->required()
                                    ->maxLength(100)
                                    ->helperText('Contoh: "3 Bulan", "40 Jam", "Self-Paced"'),

                                Toggle::make('is_self_paced')
                                    ->label('Self-Paced?')
                                    ->helperText('Aktifkan jika program bisa diikuti kapan saja')
                                    ->live(),

                                DatePicker::make('start_date')
                                    ->label('Tanggal Mulai')
                                    ->visible(fn (callable $get) => ! $get('is_self_paced')),

                                DatePicker::make('end_date')
                                    ->label('Tanggal Selesai')
                                    ->visible(fn (callable $get) => ! $get('is_self_paced'))
                                    ->afterOrEqual('start_date'),
                            ]),

                        Tab::make('Biaya & Pendaftaran')
                            ->icon('heroicon-o-currency-dollar')
                            ->schema([
                                Toggle::make('is_free')
                                    ->label('Gratis?')
                                    ->live()
                                    ->helperText('Aktifkan jika program gratis'),

                                TextInput::make('fee')
                                    ->label('Biaya Program')
                                    ->numeric()
                                    ->prefix('Rp')
                                    ->visible(fn (callable $get) => ! $get('is_free'))
                                    ->helperText('Masukkan nominal tanpa titik atau koma'),

                                TextInput::make('registration_url')
                                    ->label('Link Pendaftaran')
                                    ->url()
                                    ->maxLength(500)
                                    ->helperText('URL eksternal untuk pendaftaran'),

                                DatePicker::make('registration_deadline')
                                    ->label('Deadline Pendaftaran'),

                                Toggle::make('is_registration_open')
                                    ->label('Pendaftaran Dibuka?')
                                    ->default(true),

                                TextInput::make('quota')
                                    ->label('Kuota Peserta')
                                    ->numeric()
                                    ->helperText('Kosongkan jika tidak ada batasan kuota'),
                            ]),

                        Tab::make('Konten Detail')
                            ->icon('heroicon-o-document-text')
                            ->schema([
                                RichEditor::make('requirements')
                                    ->label('Persyaratan')
                                    ->columnSpanFull(),
                                RichEditor::make('benefits')
                                    ->label('Manfaat / Benefit')
                                    ->columnSpanFull(),
                                RichEditor::make('syllabus')
                                    ->label('Silabus / Kurikulum')
                                    ->columnSpanFull(),
                            ]),

                        Tab::make('Dokumen')
                            ->icon('heroicon-o-document-arrow-down')
                            ->schema([
                                FileUpload::make('brochure_pdf')
                                    ->label('Brosur PDF')
                                    ->acceptedFileTypes(['application/pdf'])
                                    ->directory('sertifikasi/brochures')
                                    ->maxSize(10240)
                                    ->helperText('Upload brosur lengkap (maks. 10MB)')
                                    ->downloadable()
                                    ->getUploadedFileNameForStorageUsing(function (TemporaryUploadedFile $file, callable $get) {
                                        $slug = $get('slug') ?: pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);

                                        return (string) str($slug)
                                            ->prepend('brosur-')
                                            ->slug()
                                            ->append('-', now()->timestamp)
                                            ->append('.', $file->getClientOriginalExtension());
                                    }),

                                FileUpload::make('certificate_sample')
                                    ->label('Contoh Sertifikat')
                                    ->image()
                                    ->directory('sertifikasi/certificates')
                                    ->maxSize(5120)
                                    ->helperText('Upload contoh sertifikat (maks. 5MB)')
                                    ->downloadable()
                                    ->getUploadedFileNameForStorageUsing(function (TemporaryUploadedFile $file, callable $get) {
                                        $slug = $get('slug') ?: 'sertifikat';

                                        return (string) str($slug)
                                            ->prepend('contoh-sertifikat-')
                                            ->slug()
                                            ->append('-', now()->timestamp)
                                            ->append('.', $file->getClientOriginalExtension());
                                    }),
                            ]),

                        Tab::make('SEO & Status')
                            ->icon('heroicon-o-cog-6-tooth')
                            ->schema([
                                Select::make('status')
                                    ->label('Status')
                                    ->required()
                                    ->options([
                                        'Draft' => 'Draft',
                                        'Published' => 'Published',
                                        'Closed' => 'Closed',
                                    ])
                                    ->default('Published'),

                                DateTimePicker::make('published_at')
                                    ->label('Tanggal Publikasi')
                                    ->default(now()),

                                Toggle::make('is_active')
                                    ->label('Publikasikan?')
                                    ->default(true)
                                    ->onColor('success')
                                    ->offColor('danger'),

                                TextInput::make('meta_title')
                                    ->label('Meta Title (SEO)')
                                    ->maxLength(60)

                                    ->placeholder(fn (callable $get) => $get('title')),

                                Textarea::make('meta_description')
                                    ->label('Meta Description (SEO)')
                                    ->rows(3)
                                    ->maxLength(160),
                            ]),
                    ])
                    ->columnSpanFull(),
            ]);
    }
}
