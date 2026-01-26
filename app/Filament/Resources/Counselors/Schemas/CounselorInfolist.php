<?php

namespace App\Filament\Resources\Counselors\Schemas;

use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\RepeatableEntry;
use Filament\Support\Enums\FontWeight;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Grid;
use Illuminate\Support\Carbon;
use Filament\Schemas\Schema;


class CounselorInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Group::make([
                    // PROFIL UTAMA
                    Section::make('Profil Konselor')
                        ->columns(2)
                        ->schema([
                            ImageEntry::make('photo_path')
                                ->label('')
                                ->hiddenLabel()
                                ->circular()
                                ->size(120)
                                ->columnSpan(2)
                                ->alignCenter()
                                ->disk('public'),

                            TextEntry::make('name')
                                ->label('Nama Lengkap')
                                ->weight(FontWeight::Bold),

                            TextEntry::make('title')
                                ->label('Jabatan / Gelar')
                                ->icon('heroicon-m-academic-cap'),

                            TextEntry::make('email')
                                ->label('Email')
                                ->icon('heroicon-m-envelope')
                                ->copyable(),

                           TextEntry::make('user.phone') 
                                ->label('WhatsApp')
                                ->icon('heroicon-m-chat-bubble-left-right')
                                ->url(fn ($state) => $state ? "https://wa.me/{$state}" : null)
                                ->openUrlInNewTab()
                                ->color('primary')
                                ->placeholder('-'),

                            IconEntry::make('is_active')
                                ->label('Status Akun')
                                ->boolean()
                                ->trueColor('success')
                                ->falseColor('gray')
                                ->trueIcon('heroicon-o-check-circle')
                                ->falseIcon('heroicon-o-x-circle'),
                        ]),
                ])->columnSpan(['lg' => 4]),

                Group::make([
                    Section::make('Jadwal Praktek')
                        ->description('Daftar slot waktu yang tersedia untuk konseling.')
                        ->schema([
                            RepeatableEntry::make('slots')
                                ->label('')
                                ->state(fn ($record) => $record->slots) 
                                
                                ->schema([
                                    Grid::make(3)->schema([
                                        TextEntry::make('date')
                                            ->label('Tanggal')
                                            ->date('d M Y')
                                            ->icon('heroicon-m-calendar'),

                                        TextEntry::make('start_time')
                                            ->label('Mulai')
                                            ->formatStateUsing(fn ($state) => \Carbon\Carbon::parse($state)->format('H:i'))
                                            ->icon('heroicon-m-clock'),

                                        TextEntry::make('end_time')
                                            ->label('Selesai')
                                            ->formatStateUsing(fn ($state) => \Carbon\Carbon::parse($state)->format('H:i')),
                                    ]),
                                ])
                                ->grid(1)
                                ->hidden(fn ($record) => $record->slots->isEmpty()),
                        ]),

                    // META INFO
                    Section::make('Informasi Sistem')
                        ->collapsible()
                        ->collapsed()
                        ->schema([
                            TextEntry::make('user.role')
                                ->label('Basis Akun')
                                ->badge()
                                ->formatStateUsing(fn ($state) => $state === 'dosen_staf' ? 'Akun LDAP' : 'Akun Lokal')
                                ->color(fn ($state) => $state === 'dosen_staf' ? 'info' : 'warning'),

                            TextEntry::make('order_column')
                                ->label('Urutan Tampilan'),

                            TextEntry::make('created_at')
                                ->label('Dibuat')
                                ->dateTime('d M Y'),
                        ]),
                ])->columnSpan(['lg' => 8]),
            ])->columns(12);
    }
}
