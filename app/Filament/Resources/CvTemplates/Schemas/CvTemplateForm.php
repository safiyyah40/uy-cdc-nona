<?php

namespace App\Filament\Resources\CvTemplates\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

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

                        //  LOGIKA UTAMA (SUMBER)
                        Select::make('sumber')
                            ->label('Sumber Template')
                            ->options([
                                'canva' => 'Canva',
                                'slides_go' => 'Slides Go',
                                'manual' => 'Upload Manual (File)',
                            ])
                            ->default('canva')
                            ->required()
                            ->live(),

                        // URL Template (Muncul jika sumber BUKAN manual)
                        TextInput::make('url_template')
                            ->label('URL Template')
                            ->url()
                            ->placeholder('https://www.canva.com/design/...')
                            ->helperText('Link menuju template (Canva, Google Slides, dll)')
                            // Perhatikan: fn ($get) tanpa "Get"
                            ->visible(fn ($get) => $get('sumber') !== 'manual')
                            ->required(fn ($get) => $get('sumber') !== 'manual'),

                        // PREVIEW IMAGE (Upload) - Muncul jika sumber MANUAL
                        FileUpload::make('preview_manual')
                            ->label('Preview Image (Upload)')
                            ->image()
                            ->disk('public')
                            ->directory('cv-templates/previews')
                            ->maxSize(5120)
                            ->imageEditor()
                            ->helperText('Upload gambar tampilan template')
                            ->visible(fn ($get) => $get('sumber') === 'manual')
                            // Simpan ke kolom database 'url_preview'
                            ->statePath('url_preview'),

                        // PREVIEW IMAGE (URL) - Muncul jika sumber BUKAN manual
                        TextInput::make('preview_url_link')
                            ->label('URL Preview Image')
                            ->url()
                            ->placeholder('https://example.com/preview.jpg')
                            ->helperText('URL gambar preview dari Canva/Slides')
                            ->visible(fn ($get) => $get('sumber') !== 'manual')
                            // Simpan ke kolom database yang SAMA ('url_preview')
                            ->statePath('url_preview'),
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
                            ->placeholder('Contoh: Marketing, IT, Finance'),

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
                        Toggle::make('is_active')
                            ->label('Aktif')
                            ->default(true),

                        Toggle::make('is_unggulan')
                            ->label('Template Unggulan')
                            ->default(false),

                        TextInput::make('urutan')
                            ->label('Urutan')
                            ->numeric()
                            ->default(0),
                    ])
                    ->columns(3),

                // SECTION UPLOAD FILE (Hanya jika Manual)
                Section::make('Upload File Template (Wajib)')
                    ->schema([
                        FileUpload::make('file_path')
                            ->label('File Template (Word)')
                            ->disk('public')
                            ->directory('cv-templates/files')
                            // Hanya menerima DOC dan DOCX
                            ->acceptedFileTypes([
                                'application/msword',
                                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                            ])
                            ->maxSize(10240) // 10MB
                            ->helperText('Silakan upload file template format Word (.doc atau .docx).')
                            ->downloadable()
                            // Validasi Wajib jika sumber manual
                            ->required(fn ($get) => $get('sumber') === 'manual'),
                    ])
                    // Section ini hanya muncul jika sumber == manual
                    ->visible(fn ($get) => $get('sumber') === 'manual'),
            ]);
    }
}