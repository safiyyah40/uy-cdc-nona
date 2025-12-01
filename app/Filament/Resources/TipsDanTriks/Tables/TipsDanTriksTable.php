<?php

namespace App\Filament\Resources\TipsDanTriks\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Actions\DeleteAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class TipsDanTriksTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('thumbnail')
                ->label('Cover')
                ->square(),

            TextColumn::make('title')
                ->label('Judul')
                ->searchable()
                ->sortable()
                ->limit(30),

            TextColumn::make('category')
                ->label('Kategori')
                ->badge()
                ->color(fn (string $state): string => match ($state) {
                    'Persiapan Karir' => 'info',
                    'Gaji & Keuangan' => 'success',
                    'Pengembangan Diri' => 'warning',
                    default => 'gray',
                })
                ->sortable(),

            TextColumn::make('reading_time')
                ->label('Waktu Baca')
                ->suffix(' menit')
                ->sortable(),

            ToggleColumn::make('is_active')
                ->label('Aktif'),

            TextColumn::make('published_at')
                ->label('Tanggal')
                ->date()
                ->sortable(),
        ])
        ->filters([
            SelectFilter::make('category')
                ->options([
                    'Persiapan Karir' => 'Persiapan Karir',
                    'Gaji & Keuangan' => 'Gaji & Keuangan',
                    'Pengembangan Diri' => 'Pengembangan Diri',
                ]),
        ])
        ->actions([
            EditAction::make(),
            DeleteAction::make(),
        ])
        ->bulkActions([
            BulkActionGroup::make([
                DeleteBulkAction::make(),
            ]),
        ]);
    }
}
