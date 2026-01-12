<?php

namespace App\Filament\Resources\RiasecTestResults\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\DatePicker;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

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

                // Peringkat 1 (Index 0 dari array rankings)
                TextColumn::make('rank_1')
                    ->label('Tipe #1')
                    ->state(fn ($record) => $record->rankings[0] ?? '-')
                    ->badge()
                    ->color('success'),

                // Peringkat 2 (Index 1 dari array rankings)
                TextColumn::make('rank_2')
                    ->label('Tipe #2')
                    ->state(fn ($record) => $record->rankings[1] ?? '-')
                    ->badge()
                    ->color('warning'),

                // Peringkat 3 (Index 2 dari array rankings)
                TextColumn::make('rank_3')
                    ->label('Tipe #3')
                    ->state(fn ($record) => $record->rankings[2] ?? '-')
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
                // Filter Tipe Dominan (JSON Query)
                SelectFilter::make('dominant_type')
                    ->label('Tipe Dominan (Peringkat 1)')
                    ->options([
                        'R' => 'Realistic',
                        'I' => 'Investigative',
                        'A' => 'Artistic',
                        'S' => 'Social',
                        'E' => 'Enterprising',
                        'C' => 'Conventional',
                    ])
                    ->query(function (Builder $query, array $data) {
                        if (empty($data['value'])) {
                            return $query;
                        }

                        return $query->where('rankings->0', $data['value']);
                    }),

                Filter::make('created_at')
                    ->form([
                        DatePicker::make('from')->label('Dari Tanggal'),
                        DatePicker::make('until')->label('Sampai Tanggal'),
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
