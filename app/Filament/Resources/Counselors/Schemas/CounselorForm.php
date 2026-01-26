<?php

namespace App\Filament\Resources\Counselors\Schemas;

use App\Models\User;
use Filament\Actions\Action;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\TimePicker;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Carbon;

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
                                                $set('phone_display', $user->phone);
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
                                        ->label('Jabatan/Gelar')
                                        ->placeholder('Contoh: Psikolog Klinis')
                                        ->required(),

                                    TextInput::make('phone_display')
                                        ->label('WhatsApp')
                                        ->disabled()
                                        ->dehydrated(false)
                                        ->formatStateUsing(fn ($record) => $record?->user?->phone)
                                        ->tel(),

                                ]),
                            ]),

                        Section::make('Jadwal Konseling')
                            ->description('Tentukan slot waktu ketersediaan konselor.')
                            ->schema([
                                Repeater::make('slots')
                                    ->relationship('slots')
                                    ->schema([
                                        Hidden::make('id'),

                                        Grid::make(3)->schema([
                                            DatePicker::make('date')
                                                ->label('Tanggal')
                                                ->required()
                                                ->native(false)
                                                ->displayFormat('d M Y')
                                                ->minDate(now()->startOfDay())
                                                ->live(),

                                            TimePicker::make('start_time')
                                                ->label('Mulai')
                                                ->required()
                                                ->seconds(false)
                                                ->rules([
                                                    fn ($get) => function (string $attribute, $value, $fail) use ($get) {
                                                        // Jika slot sudah ada di database (sudah ada ID), jangan validasi jam lampau lagi
                                                        if (blank($get('id'))) {
                                                            if ($get('date') === now()->toDateString() && $value) {
                                                                if (Carbon::parse($value)->isBefore(now())) {
                                                                    $fail('Waktu mulai sudah terlewat.');
                                                                }
                                                            }
                                                        }
                                                    },
                                                ]),

                                            TimePicker::make('end_time')
                                                ->label('Selesai')
                                                ->required()
                                                ->seconds(false)
                                                ->after('start_time'),
                                        ]),
                                    ])
                                    ->deleteAction(
                                        fn (Action $action) => $action->requiresConfirmation()
                                    )
                                    ->default([])
                                    ->addActionLabel('Tambah Slot Waktu Baru')
                                    ->collapsible()
                                    ->collapsed()
                                    ->cloneable()
                                    ->deleteAction(
                                        fn (Action $action) => $action->disabled(fn ($get) => $get('date') && $get('start_time') &&
                                            Carbon::parse($get('date').' '.$get('start_time'))->isPast()
                                        ),
                                    )
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
