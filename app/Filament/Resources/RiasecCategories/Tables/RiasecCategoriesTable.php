<?php

namespace App\Filament\Resources\RiasecCategories\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class RiasecCategoriesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
              TextColumn::make('code')
                    ->label('Kode')
                    ->badge()
                    ->sortable()
                    ->searchable(),
                
                TextColumn::make('title')
                    ->label('Judul')
                    ->searchable()
                    ->sortable(),
                
                TextColumn::make('nickname')
                    ->label('Nickname')
                    ->searchable()
                    ->limit(40),
                
                TextColumn::make('questions_count')
                    ->label('Jumlah Soal')
                    ->counts('questions')
                    ->badge()
                    ->color('success'),
                
                ToggleColumn::make('is_active')
                    ->label('Aktif'),
                
                TextColumn::make('order')
                    ->label('Urutan')
                    ->sortable(),
            ])
            ->defaultSort('order')
            ->filters([
                TernaryFilter::make('is_active')
                    ->label('Status Aktif'),
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
            ]);
    }
}
