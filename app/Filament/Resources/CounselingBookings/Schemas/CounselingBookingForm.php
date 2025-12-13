<?php

namespace App\Filament\Resources\CounselingBookings\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TimePicker;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Grid;
use App\Models\User;
use App\Models\CounselorSlot;
use App\Models\Counselor;
use Filament\Schemas\Schema;

class CounselingBookingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Mahasiswa')
                    ->schema([
                        Select::make('user_id')
                            ->label('Mahasiswa')
                            ->relationship('user', 'name')
                            ->searchable()
                            ->preload()
                            ->required()
                            ->live()
                            ->afterStateUpdated(function ($state, callable $set) {
                                if (blank($state)) {
                                    $set('student_name', null);
                                    $set('student_npm', null);
                                    $set('student_phone', null);
                                    $set('student_email', null);
                                    $set('student_faculty', null);
                                    $set('student_study_program', null);
                                    return;
                                }
                                $user = User::find($state);

                                if ($user) {
                                    $set('student_name', $user->name);
                                    $set('student_npm', $user->id_number);
                                    $set('student_phone', $user->phone);
                                    $set('student_email', $user->email);
                                }
                            }),

                        Grid::make(2)
                            ->schema([
                                TextInput::make('student_name')
                                    ->label('Nama Mahasiswa')
                                    ->required()
                                    ->readOnly()
                                    ->maxLength(255),

                                TextInput::make('student_npm')
                                    ->label('NIM')
                                    ->required()
                                    ->readOnly()
                                    ->maxLength(255),
                            ]),

                        Grid::make(2)
                            ->schema([
                                TextInput::make('student_phone')
                                    ->label('No. WhatsApp')
                                    ->tel()
                                    ->required()
                                    ->readOnly()
                                    ->maxLength(255),

                                TextInput::make('student_email')
                                    ->label('Email')
                                    ->email()
                                    ->required()
                                    ->readOnly()
                                    ->maxLength(255),
                            ]),
                    ])
                    ->columns(1)
                    ->collapsible(),
                Section::make('Detail Sesi')
                    ->schema([
                        Select::make('counselor_id')
                            ->label('Konselor')
                            ->relationship('counselor', 'name')
                            ->searchable()
                            ->preload()
                            ->required()
                            ->reactive()
                            ->afterStateUpdated(function ($state, callable $set) {
                                if ($state) {
                                    $counselor = Counselor::find($state);
                                    if ($counselor) {
                                        $set('counselor_name', $counselor->name);
                                    }
                                }
                            }),

                        Select::make('slot_id')
                            ->label('Slot Waktu')
                            ->options(function (callable $get, ?string $operation, $record) {
                                $counselorId = $get('counselor_id');

                                if (!$counselorId) {
                                    return [];
                                }

                                $query = CounselorSlot::where('counselor_id', $counselorId)
                                    ->where('date', '>=', now()->toDateString())
                                    ->orderBy('date')
                                    ->orderBy('start_time');
                                if ($operation === 'create') {
                                    $query->where('is_available', true);
                                } elseif ($operation === 'edit' && $record) {
                                    $query->where(function ($q) use ($record) {
                                        $q->where('is_available', true)
                                            ->orWhere('id', $record->slot_id);
                                    });
                                }

                                return $query->get()->mapWithKeys(function ($slot) {
                                    $dateFormatted = \Carbon\Carbon::parse($slot->date)
                                        ->locale('id')
                                        ->isoFormat('dddd, D MMMM YYYY');

                                    $timeRange = substr($slot->start_time, 0, 5) . ' - ' . substr($slot->end_time, 0, 5);

                                    // indikator jika slot tidak available
                                    $label = "{$dateFormatted} | {$timeRange}";
                                    if (!$slot->is_available) {
                                        $label .= ' (Terpakai)';
                                    }

                                    return [$slot->id => $label];
                                });
                            })
                            ->required()
                            ->searchable()
                            ->reactive()
                            ->afterStateUpdated(function ($state, callable $set) {
                                if ($state) {
                                    $slot = CounselorSlot::find($state);
                                    if ($slot) {
                                        $set('scheduled_date', $slot->date);
                                        $set('scheduled_time', $slot->start_time);
                                    }
                                }
                            })
                            ->helperText(
                                fn(?string $operation) =>
                                $operation === 'create'
                                    ? 'Hanya menampilkan slot yang tersedia.'
                                    : 'Menampilkan slot tersedia + slot yang sedang dipakai.'
                            ),

                        Grid::make(2)
                            ->schema([
                                DatePicker::make('scheduled_date')
                                    ->label('Tanggal Sesi')
                                    ->required()
                                    ->native(false),
                                TimePicker::make('scheduled_time')
                                    ->label('Waktu Sesi')
                                    ->required()
                                    ->native(false),
                            ]),

                        TextInput::make('counselor_name')
                            ->label('Nama Konselor')
                            ->required()
                            ->maxLength(255),

                        TextInput::make('topic')
                            ->label('Topik Konsultasi')
                            ->required()
                            ->maxLength(255),

                        Textarea::make('notes')
                            ->label('Catatan / Keluhan Mahasiswa')
                            ->required()
                            ->rows(4)
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                Section::make('Status & Catatan Admin')
                    ->schema([
                        Select::make('status')
                            ->label('Status')
                            ->options([
                                'pending' => 'Menunggu Persetujuan',
                                'accepted' => 'Disetujui',
                                'rejected' => 'Ditolak',
                                'completed' => 'Selesai',
                            ])
                            ->required()
                            ->native(false)
                            ->live(),

                        Textarea::make('rejection_reason')
                            ->label('Alasan Penolakan')
                            ->visible(fn(callable $get) => $get('status') === 'rejected')
                            ->rows(3)
                            ->columnSpanFull(),

                        Textarea::make('counselor_notes')
                            ->label('Catatan Konselor/Admin')
                            ->rows(3)
                            ->columnSpanFull(),
                    ])
                    ->columns(2),
            ]);
    }
}
