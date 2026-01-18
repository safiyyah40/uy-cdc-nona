<?php

namespace App\Filament\Resources\Counselors\Schemas;

use App\Models\User;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\TimePicker;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Set;
use Illuminate\Support\Carbon;
use Filament\Schemas\Schema;

class CounselorForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(12)
            ->schema([
                Group::make()
                    ->schema([
                        Section::make('Informasi Akun')
                            ->description('Cari akun dari sistem LDAP untuk mengisi data otomatis.')
                            ->schema([
                                Select::make('user_search_id')
                                    ->label('Pilih Dosen/Staf')
                                    ->options(function () {
                                        return User::where('role', 'dosen_staf')->pluck('name', 'id');
                                    })
                                    ->searchable()
                                    ->live()
                                    ->required()
                                    ->afterStateUpdated(function ($state, Set $set) {
                                        if ($state) {
                                            $user = User::find($state);
                                            if ($user) {
                                                $set('name', $user->name);
                                                $set('email', $user->email);
                                                $set('phone', $user->phone);
                                            }
                                        }
                                    })
                                    ->visible(fn ($operation) => $operation === 'create'),
                            ]),

                        Section::make('Profil Konselor')
                            ->schema([
                                Grid::make(2)->schema([
                                    TextInput::make('name')
                                        ->label('Nama Lengkap')
                                        ->disabled()
                                        ->dehydrated()
                                        ->required(),
                                    TextInput::make('email')
                                        ->label('Email')
                                        ->email()
                                        ->disabled()
                                        ->dehydrated()
                                        ->required(),
                                    TextInput::make('title')
                                        ->label('Jab]atan/Gelar')
                                        ->placeholder('Contoh: Psikolog Klinis')
                                        ->required(),
                                    TextInput::make('phone')
                                        ->label('WhatsApp')
                                        ->disabled()
                                        ->dehydrated()
                                        ->tel(),
                                ]),
                            ]),

                        Section::make('Jadwal Konseling')
                            ->description('Tentukan slot waktu ketersediaan konselor.')
                            ->schema([
                                Repeater::make('slots')
                                    ->relationship('slots')
                                    ->schema([
                                        Grid::make(3)->schema([
                                            DatePicker::make('date')
                                                ->label('Tanggal')
                                                ->required()
                                                ->native(false)
                                                ->displayFormat('d M Y')
                                                // Tidak boleh pilih tanggal kemarin
                                                ->minDate(now()->startOfDay())
                                                ->live(), // Agar perubahan tanggal langsung terbaca oleh field jam

                                            TimePicker::make('start_time')
                                                ->label('Mulai')
                                                ->required()
                                                ->seconds(false)
                                                ->live()
                                                // Jika tanggal adalah hari ini, jam mulai tidak boleh sudah lewat
                                                ->rules([
                                                    fn ($get) => function (string $attribute, $value, $fail) use ($get) {
                                                        $selectedDate = $get('date');
                                                        if ($selectedDate && Carbon::parse($selectedDate)->isToday()) {
                                                            if (Carbon::parse($value)->isBefore(now())) {
                                                                $fail('Waktu mulai sudah terlewat untuk hari ini.');
                                                            }
                                                        }
                                                    },
                                                ]),

                                            TimePicker::make('end_time')
                                                ->label('Selesai')
                                                ->required()
                                                ->seconds(false)
                                                // Jam selesai harus setelah jam mulai
                                                ->after('start_time')
                                                ->rules([
                                                    fn ($get) => function (string $attribute, $value, $fail) use ($get) {
                                                        if ($get('start_time') === $value) {
                                                            $fail('Waktu selesai tidak boleh sama dengan waktu mulai.');
                                                        }
                                                    },
                                                ]),
                                        ]),
                                    ])
                                    ->default([])
                                    ->addActionLabel('Tambah Slot Waktu Baru')
                                    ->collapsible()
                                    ->collapsed()
                                    ->cloneable()
                                    ->reorderableWithButtons()
                                    ->itemLabel(fn (array $state): ?string => isset($state['date'])
                                        ? Carbon::parse($state['date'])->translatedFormat('d F Y')." ({$state['start_time']} - {$state['end_time']})"
                                        : 'Klik untuk atur jadwal'
                                    )
                                    ->columnSpanFull(),
                            ]),
                    ])
                    ->columnSpan(['lg' => 8]),

                // (Media & Status)
                Group::make()
                    ->schema([
                        Section::make('Media')
                            ->schema([
                                FileUpload::make('photo_path')
                                    ->label('Foto Profil')
                                    ->image()
                                    ->imageEditor()
                                    ->directory('counselors')
                                    ->disk('public'),
                            ]),

                        Section::make('Status')
                            ->schema([
                                Toggle::make('is_active')
                                    ->label('Aktifkan Profil')
                                    ->helperText('Jika nonaktif, konselor tidak akan muncul di halaman depan.')
                                    ->default(true),
                            ]),
                    ])
                    ->columnSpan(['lg' => 4]),
            ]);

    }
}
