<?php

namespace App\Filament\Resources\CvReviews\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class CvReviewForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Mahasiswa')
                    ->description('Data diri mahasiswa pengirim (Read-Only)')
                    ->schema([
                        TextInput::make('student_name')
                            ->label('Nama Mahasiswa')
                            ->required()
                            ->maxLength(255)
                            ->disabled(),

                        TextInput::make('student_npm')
                            ->label('NPM')
                            ->required()
                            ->maxLength(50)
                            ->disabled(),

                        Grid::make(2)
                            ->schema([
                                TextInput::make('student_email')
                                    ->label('Email')
                                    ->email()
                                    ->required()
                                    ->maxLength(255)
                                    ->disabled(),

                                TextInput::make('student_phone')
                                    ->label('No. Telepon')
                                    ->tel()
                                    ->required()
                                    ->maxLength(20)
                                    ->disabled(),
                            ]),

                        Grid::make(2)
                            ->schema([
                                TextInput::make('student_faculty')
                                    ->label('Fakultas')
                                    ->maxLength(255)
                                    ->disabled(),

                                TextInput::make('student_study_program')
                                    ->label('Program Studi')
                                    ->maxLength(255)
                                    ->disabled(),
                            ]),
                    ])
                    ->columns(1)
                    ->collapsible(),

                Section::make('Detail CV Review')
                    ->description('Dokumen dan informasi yang diajukan mahasiswa')
                    ->schema([
                        TextInput::make('target_position')
                            ->label('Posisi Target')
                            ->required()
                            ->maxLength(255)

                            ->disabled(fn ($record) => $record !== null),

                        Textarea::make('additional_notes')
                            ->label('Catatan Tambahan')
                            ->rows(3)
                            ->columnSpanFull()
                            ->disabled(fn ($record) => $record !== null),

                        FileUpload::make('cv_file_path')
                            ->label('File CV')
                            ->disk('public')
                            ->directory('cv_reviews')
                            ->acceptedFileTypes(['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
                            ->maxSize(10240)
                            ->required()
                            ->columnSpanFull()
                            ->disabled(fn ($record) => $record !== null)
                            ->downloadable()
                            ->openable(),
                    ])
                    ->columns(2),

                Section::make('Status & Manajemen Penugasan')
                    ->schema([
                        Select::make('counselor_id')
                            ->label('Konselor Penanggung Jawab')
                            ->relationship('counselor', 'name')
                            ->searchable()
                            ->preload()
                            ->live()
                            ->afterStateUpdated(function ($state, $set) {
                                if ($state) {
                                    $set('status', 'assigned');
                                } else {
                                    $set('status', 'submitted');
                                }
                            })
                            // Jika sudah Selesai/Batal, konselor tidak bisa diganti lagi
                            ->disabled(fn ($get) => in_array($get('status'), ['completed', 'cancelled']))
                            ->dehydrated(),

                        Select::make('status')
                            ->label('Status Review Saat Ini')
                            ->options([
                                'submitted' => 'Diajukan',
                                'assigned' => 'Ditugaskan',
                                'in_review' => 'Sedang Review',
                                'completed' => 'Selesai',
                                'cancelled' => 'Dibatalkan',
                            ])
                            ->native(false)
                            ->disabled()
                            ->dehydrated(),

                        Select::make('priority')
                            ->label('Prioritas')
                            ->options([
                                'normal' => 'Normal',
                                'tinggi' => 'Tinggi',
                                'mendesak' => 'Mendesak',
                            ])
                            ->required()
                            ->native(false)
                            // Prioritas dikunci jika sudah selesai
                            ->disabled(fn ($get) => $get('status') === 'completed'),
                    ])
                    ->columns(3),

                Section::make('Hasil Tinjauan (Feedback)')
                    ->schema([
                        Textarea::make('feedback_text')
                            ->label('Ulasan/Komentar Konselor')
                            ->rows(5)
                            ->columnSpanFull()
                            ->placeholder('Tuliskan masukan untuk CV mahasiswa di sini...')
                            ->disabled(fn ($get) => $get('status') === 'completed'),

                        FileUpload::make('feedback_files')
                            ->label('Lampiran File Perbaikan (Jika Ada)')
                            ->multiple()
                            ->disk('public')
                            ->directory('cv_feedback')
                            ->maxFiles(5)
                            ->columnSpanFull()
                            ->downloadable()
                            ->disabled(fn ($get) => $get('status') === 'completed'),
                    ])
                    // Hanya tampil jika status sudah masuk tahap review atau selesai
                    ->visible(fn ($get) => in_array($get('status'), ['in_review', 'completed']))
                    ->collapsible(),
            ]);
    }
}
