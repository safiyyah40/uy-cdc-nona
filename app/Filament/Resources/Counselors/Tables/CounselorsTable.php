<?php

namespace App\Filament\Resources\Counselors\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Actions\ViewAction;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Tables\Table;
use Filament\Actions\DeleteAction;
use Illuminate\Support\Facades\View;

class CounselorsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('order_column')
                    ->label('Urutan')
                    ->sortable(),

                ImageColumn::make('photo_path')
                    ->label('Foto')
                    ->disk('public')
                    ->circular()
                    ->size(40),

                TextColumn::make('name')
                    ->label('Nama Konselor')
                    ->description(fn ($record) => $record->email)
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),

                TextColumn::make('title')
                    ->label('Jabatan / Instansi')
                    ->searchable()
                    ->wrap(),

                TextColumn::make('slots_count')
                    ->label('Total Jadwal')
                    ->counts('slots')
                    ->badge()
                    ->color('info'),

                ToggleColumn::make('is_active')
                    ->label('Aktif'),
            ])
            ->actions([
                ViewAction::make(),
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('order_column', 'asc')
            ->reorderable('order_column');
    }
}