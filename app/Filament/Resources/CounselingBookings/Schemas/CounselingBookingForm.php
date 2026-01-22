<?php

namespace App\Filament\Resources\CounselingBookings\Schemas;

use App\Models\Counselor;
use App\Models\CounselorSlot;
use App\Models\User;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
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
                            // Tetap disabled saat edit untuk menjaga integritas data
                            ->disabled(fn ($operation) => $operation === 'edit')
                            ->afterStateUpdated(function ($state, callable $set) {
                                if (blank($state)) {
                                    $set('student_name', null);
                                    $set('student_npm', null);
                                    $set('student_phone', null);
                                    $set('student_email', null);

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
                                    ->disabled()
                                    ->dehydrated()
                                    ->maxLength(255),

                                TextInput::make('student_npm')
                                    ->label('NIM')
                                    ->required()
                                    ->disabled()
                                    ->dehydrated()
                                    ->maxLength(255),
                            ]),

                        Grid::make(2)
                            ->schema([
                                TextInput::make('student_phone')
                                    ->label('No. WhatsApp')
                                    ->tel()
                                    ->required()
                                    ->disabled()
                                    ->dehydrated()
                                    ->maxLength(255),

                                TextInput::make('student_email')
                                    ->label('Email')
                                    ->email()
                                    ->required()
                                    ->disabled()
                                    ->dehydrated()
                                    ->maxLength(255),
                            ]),
                    ])
                    ->columns(1)
                    ->collapsible(),

                Section::make('Status')
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
                            ->disabled()
                            ->native(false)
                            ->dehydrated()
                            ->live(),
                    ])
                    ->columns(1),

                Section::make('Detail Sesi')
                    ->schema([
                        Select::make('counselor_id')
                            ->label('Nama Konselor')
                            ->relationship('counselor', 'name')
                            ->searchable()
                            ->preload()
                            ->required()
                            ->reactive()
                            // KEAMANAN: Kunci jika status bukan 'pending'
                            ->disabled(fn ($get) => $get('status') !== 'pending')
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
                                if (! $counselorId) {
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
                                        $q->where('is_available', true)->orWhere('id', $record->slot_id);
                                    });
                                }

                                return $query->get()->mapWithKeys(function ($slot) {
                                    $dateFormatted = \Carbon\Carbon::parse($slot->date)->locale('id')->isoFormat('dddd, D MMMM YYYY');
                                    $timeRange = substr($slot->start_time, 0, 5).' - '.substr($slot->end_time, 0, 5);
                                    $label = "{$dateFormatted} | {$timeRange}";
                                    if (! $slot->is_available) {
                                        $label .= ' (Terpakai)';
                                    }

                                    return [$slot->id => $label];
                                });
                            })
                            ->required()
                            ->searchable()
                            ->reactive()
                            // KEAMANAN: Kunci jika status bukan 'pending'
                            ->disabled(fn ($get) => $get('status') !== 'pending')
                            ->afterStateUpdated(function ($state, callable $set) {
                                if ($state) {
                                    $slot = CounselorSlot::find($state);
                                    if ($slot) {
                                        $set('scheduled_date', $slot->date);
                                        $set('scheduled_time', $slot->start_time);
                                    }
                                }
                            }),

                        TextInput::make('topic')
                            ->label('Topik Konsultasi')
                            ->required()
                            ->maxLength(255)
                            ->disabled(),

                        Textarea::make('notes')
                            ->label('Catatan / Keluhan Mahasiswa')
                            ->required()
                            ->rows(4)
                            ->columnSpanFull()
                            ->disabled(),
                    ])
                    ->columns(2),
            ]);
    }
}
