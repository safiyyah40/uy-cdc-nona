<?php

namespace App\Filament\Resources\RiasecTestResults\Schemas;

use App\Models\RiasecCategory;
use Filament\Schemas\Components\Section;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Group;
use Filament\Support\Enums\FontWeight;
use Filament\Schemas\Schema;

class RiasecTestResultInfolist
{
    public static function configure(Schema $schema): Schema
    {
        // Helper Ambil Data Kategori dari DB
        $getCategory = fn ($code) => RiasecCategory::where('code', $code)->first();

        // Helper Section Detail per Tipe Dominan
        $makeDominantSection = function ($rank, $iconColor) use ($getCategory) {
            $column = "dominant_type_{$rank}"; 
            
            return Section::make(fn ($record) => "Dominan #{$rank}: " . ($getCategory($record->$column)?->title ?? '-'))
                ->description(fn ($record) => $getCategory($record->$column)?->nickname ?? '')
                ->icon(fn ($record) => match($rank) {
                    1 => 'heroicon-m-trophy',
                    2 => 'heroicon-m-star',
                    3 => 'heroicon-m-sparkles',
                })
                ->iconColor($iconColor)
                ->schema([
                    Grid::make(3)->schema([
                        // 1. KARAKTERISTIK
                        TextEntry::make("traits_{$rank}")
                            ->label('Karakteristik')
                            ->state(fn ($record) => $getCategory($record->$column)?->traits)
                            ->bulleted()
                            ->color('gray'),

                        // 2. PERSONAL BRANDING
                        TextEntry::make("branding_{$rank}")
                            ->label('Strategi Branding')
                            ->state(fn ($record) => $getCategory($record->$column)?->branding_strategies)
                            ->bulleted()
                            ->color('primary'),

                        // 3. REKOMENDASI KARIR
                        TextEntry::make("careers_{$rank}")
                            ->label('Rekomendasi Karir')
                            ->state(fn ($record) => $getCategory($record->$column)?->career_recommendations)
                            ->badge()
                            ->color('success'),
                    ]),
                    
                    // Deskripsi
                    TextEntry::make("desc_{$rank}")
                        ->label('Deskripsi')
                        ->state(fn ($record) => $getCategory($record->$column)?->description)
                        ->prose()
                        ->columnSpanFull()
                        ->markdown(),
                ])
                ->collapsible(); 
        };

        return $schema
            ->schema([
                Section::make('Profil Mahasiswa')
                    ->icon('heroicon-m-identification')
                    ->schema([
                        Grid::make(3)->schema([
                            TextEntry::make('user.name')
                                ->label('Nama Lengkap')
                                ->weight(FontWeight::Bold),
                            
                            TextEntry::make('user.id_number')
                                ->label('NIM')
                                ->copyable(),
                            
                            TextEntry::make('user.email')
                                ->label('Email')
                                ->icon('heroicon-m-envelope'),

                            TextEntry::make('user.faculty')
                                ->label('Fakultas')
                                ->weight(FontWeight::Bold),
                            
                            TextEntry::make('user.study_program')
                                ->label('Program Studi'),

                            TextEntry::make('user.phone')
                                ->label('No. Telepon')
                                ->icon('heroicon-m-phone')
                                ->placeholder('-'),

                            TextEntry::make('completed_at')
                                ->label('Tanggal Tes')
                                ->dateTime('d F Y, H:i')
                                ->icon('heroicon-m-calendar-days'),
                                
                            TextEntry::make('time_taken_seconds')
                                ->label('Durasi Pengerjaan')
                                ->formatStateUsing(fn ($state) => gmdate('i', $state) . ' menit ' . gmdate('s', $state) . ' detik'),

                            TextEntry::make('total_questions_answered')
                                ->label('Total Soal Dijawab'),
                        ]),
                    ]),

                Section::make('Rincian Skor Kuantitatif')
                    ->compact()
                    ->schema([
                        Grid::make(6)->schema([
                            TextEntry::make('score_r')->label('Realistic')->badge()->color('success')->alignCenter(),
                            TextEntry::make('score_i')->label('Investigative')->badge()->color('info')->alignCenter(),
                            TextEntry::make('score_a')->label('Artistic')->badge()->color('warning')->alignCenter(),
                            TextEntry::make('score_s')->label('Social')->badge()->color('danger')->alignCenter(),
                            TextEntry::make('score_e')->label('Enterprising')->badge()->color('primary')->alignCenter(),
                            TextEntry::make('score_c')->label('Conventional')->badge()->color('gray')->alignCenter(),
                        ]),
                    ]),

                Group::make([
                    $makeDominantSection(1, 'success'), // Dominan 1
                    $makeDominantSection(2, 'warning'), // Dominan 2
                    $makeDominantSection(3, 'info'),    // Dominan 3
                ]),
            ]);
    }
}