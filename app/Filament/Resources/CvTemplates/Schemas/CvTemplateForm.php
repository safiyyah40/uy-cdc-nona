<?php

namespace App\Filament\Resources\CvTemplates\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\TextArea;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Components\Section;


class CvTemplateForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Template')
                    ->schema([
                        TextInput::make('judul_template')
                            ->label('Judul Template')
                            ->required()
                            ->maxLength(255)
                            ->placeholder('Contoh: Modern Professional CV Template'),

                        Textarea::make('deskripsi')
                            ->label('Deskripsi')
                            ->rows(3)
                            ->placeholder('Jelaskan keunggulan template ini...'),

                        Select::make('kategori')
                            ->label('Kategori')
                            ->options([
                                'minimalis' => 'Minimalis',
                                'kreatif' => 'Kreatif',
                                'profesional' => 'Profesional',
                                'ats-friendly' => 'ATS-Friendly',
                                'modern' => 'Modern',
                                'klasik' => 'Klasik',
                            ])
                            ->required()
                            ->searchable(),

                        Select::make('sumber')
                            ->label('Sumber Template')
                            ->options([
                                'canva' => 'Canva',
                                'google_slides' => 'Google Slides',
                                'manual' => 'Upload Manual',
                            ])
                            ->default('canva')
                            ->required()
                            ->reactive(),

                        TextInput::make('url_template')
                            ->label('URL Template')
                            ->url()
                            ->required()
                            ->placeholder('https://www.canva.com/design/...')
                            ->helperText('Link menuju template (Canva, Google Slides, dll)'),

                        FileUpload::make('url_preview')
                            ->label('Preview Image')
                            ->image()
                            ->disk('public')
                            ->directory('cv-templates/previews')
                            ->maxSize(5120) // 5MB
                            ->imageEditor()
                            ->helperText('Upload gambar preview template (opsional, jika kosong akan pakai placeholder)')
                            ->visible(fn ($get) => $get('sumber') === 'manual'),

                        TextInput::make('url_preview')
                            ->label('URL Preview Image')
                            ->url()
                            ->placeholder('https://example.com/preview.jpg')
                            ->helperText('URL gambar preview dari Canva/Slides')
                            ->visible(fn ($get) => $get('sumber') !== 'manual'),
                    ])
                    ->columns(2),

                Section::make('Metadata & Targeting')
                    ->schema([
                        TagsInput::make('tags')
                            ->label('Tags')
                            ->placeholder('Tekan Enter untuk menambah tag')
                            ->helperText('Contoh: marketing, fresh-graduate, tech'),

                        TextInput::make('jenis_pekerjaan')
                            ->label('Jenis Pekerjaan')
                            ->placeholder('Contoh: Marketing, IT, Finance')
                            ->helperText('Untuk siapa template ini cocok?'),

                        Select::make('tingkat_pengalaman')
                            ->label('Tingkat Pengalaman')
                            ->options([
                                'fresh-graduate' => 'Fresh Graduate',
                                '1-3-tahun' => '1-3 Tahun',
                                '3-5-tahun' => '3-5 Tahun',
                                'senior' => 'Senior (5+ Tahun)',
                            ])
                            ->searchable(),
                    ])
                    ->columns(3),

                Section::make('Status & Visibilitas')
                    ->schema([
                        Toggle::make('is_aktif')
                            ->label('Aktif')
                            ->default(true)
                            ->helperText('Template hanya tampil jika aktif'),

                        Toggle::make('is_unggulan')
                            ->label('Template Unggulan')
                            ->default(false)
                            ->helperText('Akan muncul di bagian atas'),

                        TextInput::make('urutan')
                            ->label('Urutan')
                            ->numeric()
                            ->default(0)
                            ->helperText('Angka lebih kecil = tampil lebih dulu'),
                    ])
                    ->columns(3),

                Section::make('Upload File Manual (Opsional)')
                    ->schema([
                        FileUpload::make('file_path')
                            ->label('File Template')
                            ->disk('public')
                            ->directory('cv-templates/files')
                            ->acceptedFileTypes(['application/pdf', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'])
                            ->maxSize(10240) // 10MB
                            ->helperText('Upload file template (PDF, PPT, PPTX) - Opsional'),
                    ])
                    ->visible(fn ($get) => $get('sumber') === 'manual')
                    ->collapsed(),
            ]);
    }
}
