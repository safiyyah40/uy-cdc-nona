<?php

namespace App\Filament\Resources\Users\Schemas;

use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Support\Enums\FontWeight;
use Filament\Schemas\Schema;
use Filament\Schemas\Components\Section;

class UserInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                // INFORMASI AUTENTIKASI
                Section::make('Informasi Autentikasi')
                    ->description('Data utama akun pengguna.')
                    ->icon('heroicon-o-finger-print')
                    ->columns(2)
                    ->schema([
                        TextEntry::make('name')
                            ->label('Nama Lengkap')
                            ->weight(FontWeight::Bold),

                        TextEntry::make('username')
                            ->label('Username')
                            ->fontFamily('mono')
                            ->copyable()
                            ->icon('heroicon-m-user'),

                        TextEntry::make('email')
                            ->label('Email')
                            ->icon('heroicon-m-envelope')
                            ->copyable(),
                    ]),

                // DETAIL PROFIL & HAK AKSES
                Section::make('Detail Profil & Hak Akses')
                    ->description('Role, nomor identitas, dan kontak.')
                    ->icon('heroicon-o-identification')
                    ->columns(2)
                    ->schema([
                        TextEntry::make('role')
                            ->label('Role Pengguna')
                            ->badge()
                            ->formatStateUsing(fn (string $state): string => match ($state) {
                                'mahasiswa' => 'Mahasiswa',
                                'konselor' => 'Konselor',
                                'dosen_staf' => 'Dosen/Staf',
                                'admin' => 'Admin',
                                default => $state,
                            })
                            ->color(fn (string $state): string => match ($state) {
                                'admin' => 'success',
                                'konselor' => 'warning',
                                'dosen_staf' => 'info',
                                'mahasiswa' => 'gray',
                                default => 'gray',
                            }),

                        TextEntry::make('id_number')
                            ->label('NPM / NIP')
                            ->fontFamily('mono')
                            ->copyable()
                            ->placeholder('-'),

                        TextEntry::make('phone')
                            ->label('Nomor WhatsApp')
                            ->icon('heroicon-m-device-phone-mobile')
                            ->placeholder('-')
                            ->url(fn ($state) => $state ? "https://wa.me/{$state}" : null)
                            ->openUrlInNewTab()
                            ->color('primary'),

                        IconEntry::make('is_profile_complete')
                            ->label('Status Profil Lengkap')
                            ->boolean()
                            ->trueColor('success')
                            ->falseColor('danger'),
                    ]),

                Section::make('Informasi Sistem')
                    ->collapsible()
                    ->collapsed() // Default tertutup
                    ->columns(3)
                    ->schema([
                        TextEntry::make('created_at')
                            ->label('Dibuat Pada')
                            ->dateTime('d M Y, H:i'),
                        
                        TextEntry::make('updated_at')
                            ->label('Terakhir Diupdate')
                            ->dateTime('d M Y, H:i'),
                    ]),
            ]);
    }
}