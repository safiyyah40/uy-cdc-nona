<?php

namespace App\Filament\Resources\CounselingBookings\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Schema;

class CounselingBookingInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Mahasiswa')
                    ->schema([
                        TextEntry::make('student_name')
                            ->label('Nama'),
                        TextEntry::make('student_npm')
                            ->label('NIM'),
                        TextEntry::make('student_faculty')
                            ->label('Fakultas'),
                        TextEntry::make('student_study_program')
                            ->label('Program Studi'),
                        TextEntry::make('student_phone')
                            ->label('WhatsApp')
                            ->icon('heroicon-m-phone'),
                        TextEntry::make('student_email')
                            ->label('Email')
                            ->icon('heroicon-m-envelope'),
                    ])
                    ->columns(2),

                Section::make('Detail Sesi')
                    ->schema([
                        TextEntry::make('counselor_name')
                            ->label('Konselor'),
                        TextEntry::make('topic')
                            ->label('Topik'),
                        TextEntry::make('scheduled_date')
                            ->label('Tanggal')
                            ->date('l, d F Y'),
                        TextEntry::make('scheduled_time')
                            ->label('Waktu')
                            ->time('H:i'),
                        TextEntry::make('notes')
                            ->label('Keluhan/Catatan')
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                Section::make('Status')
                    ->schema([
                        TextEntry::make('status')
                            ->label('Status')
                            ->badge()
                            ->color(fn (string $state): string => match ($state) {
                                'pending' => 'warning',
                                'accepted' => 'success',
                                'rejected' => 'danger',
                                'completed' => 'primary',
                                'cancelled' => 'gray',
                            })
                            ->formatStateUsing(fn (string $state): string => match ($state) {
                                'pending' => 'Menunggu Verifikasi',
                                'accepted' => 'Disetujui',
                                'rejected' => 'Ditolak',
                                'completed' => 'Selesai',
                                'cancelled' => 'Dibatalkan',
                                default => $state,
                            }),
                        
                        TextEntry::make('rejection_reason')
                            ->label('Alasan Penolakan')
                            ->visible(fn ($record) => $record->status === 'rejected'),
                        
                        TextEntry::make('counselor_notes')
                            ->label('Catatan Admin/Konselor')
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                Section::make('Laporan Konseling')
                    ->schema([
                        TextEntry::make('report.feedback')
                            ->label('Feedback Sesi')
                            ->columnSpanFull()
                            ->markdown(),
                        
                        TextEntry::make('report.action_plan')
                            ->label('Rencana Tindak Lanjut')
                            ->columnSpanFull(),
                        
                        TextEntry::make('report.recommendations')
                            ->label('Rekomendasi')
                            ->columnSpanFull(),
                        
                        Grid::make(3)
                            ->schema([
                                TextEntry::make('report.session_duration')
                                    ->label('Durasi')
                                    ->suffix(' menit'),
                                
                                TextEntry::make('report.session_type')
                                    ->label('Tipe Sesi')
                                    ->formatStateUsing(fn ($state) => $state === 'online' ? 'Online (Daring)' : 'Offline (Tatap Muka)'),
                                
                                TextEntry::make('report.session_location')
                                    ->label('Lokasi'),
                            ]),
                    ])
                    ->visible(fn ($record) => $record->report !== null)
                    ->collapsed(),
            ]);
    }
}
