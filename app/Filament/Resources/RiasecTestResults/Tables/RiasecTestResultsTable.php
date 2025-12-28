<?php

namespace App\Filament\Resources\RiasecTestResults\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\DeleteAction;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Filters\SelectFilter;
use Filament\Forms\Components\DatePicker;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class RiasecTestResultsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name')
                    ->label('Mahasiswa')
                    ->searchable()
                    ->sortable(),
                
                TextColumn::make('user.id_number')
                    ->label('NIM')
                    ->searchable()
                    ->sortable(),
                
                TextColumn::make('user.study_program')
                    ->label('Prodi')
                    ->searchable()
                    ->limit(20),
                
                TextColumn::make('dominant_type_1')
                    ->label('Tipe #1')
                    ->badge()
                    ->color('success'),
                
                TextColumn::make('dominant_type_2')
                    ->label('Tipe #2')
                    ->badge()
                    ->color('warning'),
                
                TextColumn::make('dominant_type_3')
                    ->label('Tipe #3')
                    ->badge()
                    ->color('info'),
                
                TextColumn::make('time_taken_seconds')
                    ->label('Waktu')
                    ->formatStateUsing(fn ($state) => gmdate('i:s', $state))
                    ->sortable(),
                
                TextColumn::make('completed_at')
                    ->label('Selesai')
                    ->dateTime('d M Y H:i')
                    ->sortable(),
            ])
            ->defaultSort('completed_at', 'desc')
            ->filters([
                SelectFilter::make('dominant_type_1')
                    ->label('Tipe Dominan')
                    ->options([
                        'R' => 'Realistic',
                        'I' => 'Investigative',
                        'A' => 'Artistic',
                        'S' => 'Social',
                        'E' => 'Enterprising',
                        'C' => 'Conventional',
                    ]),
                
                Filter::make('created_at')
                    ->form([
                        DatePicker::make('from')
                            ->label('Dari Tanggal'),
                        DatePicker::make('until')
                            ->label('Sampai Tanggal'),
                    ])
                    ->query(function ($query, array $data) {
                        return $query
                            ->when($data['from'], fn ($q) => $q->whereDate('created_at', '>=', $data['from']))
                            ->when($data['until'], fn ($q) => $q->whereDate('created_at', '<=', $data['until']));
                    }),
            ])
            ->actions([
                ViewAction::make(),
                DeleteAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
