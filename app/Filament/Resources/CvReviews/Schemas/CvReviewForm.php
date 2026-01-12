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

                Section::make('Status & Assignment')
                    ->schema([
                        Select::make('counselor_id')
                            ->label('Assign ke Konselor')
                            ->relationship('counselor', 'name')
                            ->searchable()
                            ->preload()
                            ->reactive()
                            ->afterStateUpdated(function ($state, callable $set, $get) {
                                if ($state && $get('status') === 'submitted') {
                                    $set('status', 'assigned');
                                }
                            }),

                        Select::make('status')
                            ->label('Status')
                            ->options([
                                'submitted' => 'Diajukan',
                                'assigned' => 'Ditugaskan',
                                'in_review' => 'Sedang Review',
                                'completed' => 'Selesai',
                                'cancelled' => 'Dibatalkan',
                            ])
                            ->required()
                            ->native(false),

                        Select::make('priority')
                            ->options([
                                'normal' => 'Normal',
                                'tinggi' => 'Tinggi',
                                'mendesak' => 'Mendesak',
                            ])
                            ->required()
                            ->native(false),
                    ])
                    ->columns(3),

                Section::make('Feedback dari Konselor')
                    ->schema([
                        Textarea::make('feedback_text')
                            ->label('Feedback Teks')
                            ->rows(5)
                            ->columnSpanFull(),

                        FileUpload::make('feedback_files')
                            ->label('File Feedback')
                            ->multiple()
                            ->disk('public')
                            ->directory('cv_feedback')
                            ->maxFiles(5)
                            ->maxSize(10240)
                            ->columnSpanFull()
                            ->downloadable(),
                    ])
                    ->visible(fn ($get) => in_array($get('status'), ['in_review', 'completed']))
                    ->collapsible(),
            ]);
    }
}
