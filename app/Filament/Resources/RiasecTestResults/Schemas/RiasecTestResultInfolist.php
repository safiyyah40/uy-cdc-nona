<?php

namespace App\Filament\Resources\RiasecTestResults\Schemas;

use App\Models\RiasecCategory;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Enums\FontWeight;

class RiasecTestResultInfolist
{
    public static function configure(Schema $schema): Schema
    {
        // Helper: Ambil Objek Kategori berdasarkan Index Ranking (0 - 5)
        $getCategoryFromRank = function ($record, $index) {
            // Mengambil kode dari array JSON 'rankings'
            $code = $record->rankings[$index] ?? null;
            if (! $code) {
                return null;
            }

            return RiasecCategory::where('code', $code)->first();
        };

        // Helper: Membuat Section Detail per Tipe
        $makeRankSection = function ($rankNumber, $color) use ($getCategoryFromRank) {
            $arrayIndex = $rankNumber - 1; 
            
            return Section::make(function ($record) use ($getCategoryFromRank, $arrayIndex, $rankNumber) {
                $category = $getCategoryFromRank($record, $arrayIndex);
                return "Peringkat #{$rankNumber}: " . ($category?->title ?? '-') . " ({$category?->code})";
            })
                ->description(fn ($record) => $getCategoryFromRank($record, $arrayIndex)?->nickname ?? '')
                ->icon(match($rankNumber) {
                    1 => 'heroicon-m-trophy',
                    2 => 'heroicon-m-star',
                    3 => 'heroicon-m-sparkles',
                    default => 'heroicon-m-hashtag', 
                })
                ->iconColor($color)
                ->schema([
                    Grid::make(3)->schema([
                        // KARAKTERISTIK
                        TextEntry::make("traits_{$rankNumber}")
                            ->label('Karakteristik')
                            ->state(fn ($record) => $getCategoryFromRank($record, $arrayIndex)?->traits)
                            ->bulleted()
                            ->color('gray'),

                        // PERSONAL BRANDING
                        TextEntry::make("branding_{$rankNumber}")
                            ->label('Strategi Branding')
                            ->state(fn ($record) => $getCategoryFromRank($record, $arrayIndex)?->branding_strategies)
                            ->bulleted()
                            ->color('primary'),

                        // REKOMENDASI KARIR
                        TextEntry::make("careers_{$rankNumber}")
                            ->label('Rekomendasi Karir')
                            ->state(fn ($record) => $getCategoryFromRank($record, $arrayIndex)?->career_recommendations)
                            ->badge()
                            ->color($rankNumber <= 3 ? 'success' : 'gray'),
                    ]),

                    // Deskripsi
                    TextEntry::make("desc_{$rankNumber}")
                        ->label('Deskripsi')
                        ->state(fn ($record) => $getCategoryFromRank($record, $arrayIndex)?->description)
                        ->prose()
                        ->columnSpanFull()
                        ->markdown(),
                ])
                ->collapsible()
                ->collapsed($rankNumber > 3); // Otomatis tutup (collapse) utk peringkat 4-6 biar ga panjang banget
        };

        return $schema
            ->schema([
                // SECTION 1: PROFIL
                Section::make('Profil Mahasiswa')
                    ->icon('heroicon-m-identification')
                    ->schema([
                        Grid::make(3)->schema([
                            TextEntry::make('user.name')->label('Nama Lengkap')->weight(FontWeight::Bold),
                            TextEntry::make('user.id_number')->label('NIM')->copyable(),
                            TextEntry::make('user.email')->label('Email')->icon('heroicon-m-envelope'),
                            TextEntry::make('user.faculty')->label('Fakultas')->weight(FontWeight::Bold)->placeholder('-'),
                            TextEntry::make('user.study_program')->label('Program Studi')->placeholder('-'),
                            TextEntry::make('user.phone')->label('No. Telepon')->placeholder('-'),
                            TextEntry::make('completed_at')->label('Tanggal Tes')->dateTime('d F Y, H:i'),
                            TextEntry::make('time_taken_seconds')->label('Durasi')->formatStateUsing(fn ($state) => gmdate('i', $state).'m '.gmdate('s', $state).'s'),
                            TextEntry::make('total_questions_answered')->label('Soal Dijawab'),
                        ]),
                    ]),

                // SECTION 2: SKOR KUANTITATIF (ANGKA)
                Section::make('Rincian Skor (Kuantitatif)')
                    ->compact()
                    ->schema([
                        Grid::make(6)->schema([
                            TextEntry::make('scores.R')->label('Realistic (R)')->badge()->color('gray')->alignCenter()->size('lg'),
                            TextEntry::make('scores.I')->label('Investigative (I)')->badge()->color('gray')->alignCenter()->size('lg'),
                            TextEntry::make('scores.A')->label('Artistic (A)')->badge()->color('gray')->alignCenter()->size('lg'),
                            TextEntry::make('scores.S')->label('Social (S)')->badge()->color('gray')->alignCenter()->size('lg'),
                            TextEntry::make('scores.E')->label('Enterprising (E)')->badge()->color('gray')->alignCenter()->size('lg'),
                            TextEntry::make('scores.C')->label('Conventional (C)')->badge()->color('gray')->alignCenter()->size('lg'),
                        ]),
                    ]),

                // SECTION 3: ANALISIS LENGKAP (1-6)
                Group::make([
                    Section::make('Analisis Urutan Minat (Ranking 1 - 6)')
                        ->heading('Analisis Lengkap Profil Kepribadian')
                        ->description('Diurutkan dari minat paling dominan hingga paling rendah.')
                        ->schema([
                            $makeRankSection(1, 'success'), // Peringkat 1 (Hijau)
                            $makeRankSection(2, 'warning'), // Peringkat 2 (Kuning)
                            $makeRankSection(3, 'info'),    // Peringkat 3 (Biru)
                            $makeRankSection(4, 'gray'),    // Peringkat 4 (Abu)
                            $makeRankSection(5, 'gray'),    // Peringkat 5 (Abu)
                            $makeRankSection(6, 'gray'),    // Peringkat 6 (Abu)
                        ]),
                ]),
            ]);
    }
}
