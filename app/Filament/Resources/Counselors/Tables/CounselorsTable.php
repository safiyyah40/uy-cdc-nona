<?php

namespace App\Filament\Resources\Counselors\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Tables\Table;
use Filament\Actions\DeleteAction;

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
                    ->circular(),

                TextColumn::make('name')
                    ->label('Nama')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('title')
                    ->label('Jabatan / Fakultas')
                    ->searchable(),

                ToggleColumn::make('is_active')
                    ->label('Aktif'),
            ])

            ->actions([
                EditAction::make(),
                DeleteAction::make(),
            ])

            ->bulkActions([
                BulkActionGroup::make([
                DeleteBulkAction::make(),
                ]),
            ])

            // Aktifkan fitur reorder
            ->reorderable('order_column');
    }
}
