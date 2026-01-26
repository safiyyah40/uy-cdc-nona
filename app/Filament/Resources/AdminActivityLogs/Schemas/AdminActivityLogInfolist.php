<?php

namespace App\Filament\Resources\AdminActivityLogs\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Enums\FontWeight;

class AdminActivityLogInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make()
                    ->schema([
                        Grid::make(3)->schema([
                            // Kolom 1: Waktu & Event
                            Group::make([
                                TextEntry::make('event')
                                    ->label('Jenis Aktivitas')
                                    ->badge()
                                    ->color(fn ($state) => match ($state) {
                                        'CREATE' => 'success',
                                        'UPDATE' => 'warning',
                                        'DELETE' => 'danger',
                                        'LOGIN', 'LOGOUT' => 'info',
                                        'SECURITY' => 'danger',
                                        default => 'gray',
                                    }),

                                TextEntry::make('created_at')
                                    ->label('Waktu Kejadian')
                                    ->dateTime('d F Y, H:i:s')
                                    ->icon('heroicon-m-clock'),
                            ]),

                            // Kolom 2: Pelaku (User)
                            Group::make([
                                TextEntry::make('causer.name')
                                    ->label('Dilakukan Oleh')
                                    ->weight(FontWeight::Bold)
                                    ->icon('heroicon-m-user')
                                    ->default('Sistem / Tidak Diketahui'),

                                TextEntry::make('causer.email')
                                    ->label('Email')
                                    ->icon('heroicon-m-envelope')
                                    ->color('gray')
                                    ->default('-'),

                                TextEntry::make('causer.role')
                                    ->label('Role')
                                    ->badge()
                                    ->color(fn (string $state): string => match ($state) {
                                        'admin' => 'danger',
                                        'mahasiswa' => 'info',
                                        'konselor' => 'success',
                                        default => 'gray',
                                    }),
                            ]),

                            // Kolom 3: Target & Teknis
                            Group::make([
                                TextEntry::make('subject_type')
                                    ->label('Modul / Target')
                                    ->icon('heroicon-m-cube')
                                    ->formatStateUsing(fn ($state) => $state ? class_basename($state) : '-'),

                                TextEntry::make('description')
                                    ->label('Deskripsi')
                                    ->color('gray'),
                            ]),
                        ]),
                    ]),

                // --- BAGIAN TENGAH: PERUBAHAN DATA (JSON) ---
                Section::make('Detail Perubahan Data')
                    ->icon('heroicon-m-code-bracket')
                    ->collapsible()
                    ->schema([
                        TextEntry::make('properties')
                            ->hiddenLabel()
                            ->formatStateUsing(function ($state) {
                                if (empty($state)) {
                                    return 'Tidak ada data properti.';
                                }

                                // Format JSON agar rapi (Pretty Print)
                                $json = json_encode($state, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

                                // Bungkus dengan HTML <pre> agar formatnya terjaga
                                return "<pre class='text-xs font-mono bg-gray-50 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:bg-gray-800 dark:border-gray-700'>{$json}</pre>";
                            })
                            ->html() // Wajib diaktifkan agar tag <pre> terbaca
                            ->columnSpanFull(),
                    ])
                    ->visible(fn ($record) => ! empty($record->properties)),

                // --- BAGIAN BAWAH: INFO TEKNIS (IP & DEVICE) ---
                Section::make('Informasi Perangkat')
                    ->collapsed() // Default tertutup agar tidak semak
                    ->schema([
                        Grid::make(2)->schema([
                            TextEntry::make('ip_address')
                                ->label('Alamat IP')
                                ->icon('heroicon-m-globe-alt')
                                ->copyable(),

                            TextEntry::make('user_agent')
                                ->label('Browser / Perangkat')
                                ->icon('heroicon-m-device-phone-mobile')
                                ->columnSpanFull(),
                        ]),
                    ]),
            ]);
    }
}
