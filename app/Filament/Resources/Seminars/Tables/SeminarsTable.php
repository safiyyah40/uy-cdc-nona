<?php

namespace App\Filament\Resources\Seminars\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\ViewAction;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\BadgeColumn;
use Illuminate\Support\Str;
use App\Models\Seminar;
use Filament\Tables\Columns\TextColumn;

use Filament\Tables\Table;

class SeminarsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image')
                    ->label('Poster')
                    ->circular(),
                
                TextColumn::make('title')
                    ->label('Judul')
                    ->searchable()
                    ->limit(30)
                    ->description(fn (Seminar $record): string => Str::limit($record->speaker, 30)),

                TextColumn::make('date')
                    ->label('Hari dan Tanggal')
                    ->date('d M Y')
                    ->sortable(),

                BadgeColumn::make('type')
                    ->label('Tipe')
                    ->colors([
                        'success' => 'Online',
                        'warning' => 'Hybrid',
                        'primary' => 'Offline',
                    ]),

                TextColumn::make('created_at')
                    ->label('Diposting')
                    ->since()
                    ->sortable(),
            ])
            ->filters([
                //
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
