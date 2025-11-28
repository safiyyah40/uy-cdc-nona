<?php

namespace App\Filament\Resources\Beritas\Schemas;

use Filament\Schemas\Schema;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Toggle;
use Illuminate\Support\Str;
use App\Models\Berita;


class BeritaForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Berita')
                    ->schema([
                        TextInput::make('title')
                            ->label('Judul')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn (string $operation, $state, $set) => 
                                $operation === 'create' ? $set('slug', Str::slug($state)) : null
                            ),

                        TextInput::make('slug')
                            ->label('Slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(Berita::class, 'slug', ignoreRecord: true)
                            ->helperText('URL-friendly version dari judul'),

                        Textarea::make('description')
                            ->label('Deskripsi Singkat')
                            ->required()
                            ->rows(3)
                            ->maxLength(500)
                            ->helperText('Ringkasan berita (max 500 karakter)'),

                        RichEditor::make('content')
                            ->label('Konten Berita')
                            ->required()
                            ->columnSpanFull()
                            ->toolbarButtons([
                                'bold', 'bulletList', 'orderedList', 'h2', 'h3', 
                                'italic', 'link', 'redo', 'underline', 'undo',
                            ]),
                    ])
                    ->columns(2),

                Section::make('Media & Pengaturan')
                    ->schema([
                        FileUpload::make('image')
                            ->label('Gambar Berita')
                            ->image()
                            ->directory('news-images')
                            ->maxSize(2048)
                            ->imageEditor()
                            ->helperText('Upload gambar (max 2MB)'),

                        DatePicker::make('published_date')
                            ->label('Tanggal Publikasi')
                            ->required()
                            ->default(now())
                            ->native(false),

                        Toggle::make('is_active')
                            ->label('Aktif')
                            ->default(true)
                            ->helperText('Berita hanya tampil di website jika aktif'),
                    ])
                    ->columns(2),
            ]);
    }
}
