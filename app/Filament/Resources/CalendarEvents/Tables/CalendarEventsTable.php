<?php

namespace App\Filament\Resources\CalendarEvents\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class CalendarEventsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('start_date')
                    ->label('Tanggal')
                    ->date('d M Y')
                    ->sortable(),

                TextColumn::make('title')
                    ->label('Judul')
                    ->searchable()
                    ->limit(40)
                    ->wrap(),

                BadgeColumn::make('event_type')
                    ->label('Tipe')
                    ->formatStateUsing(fn ($state) => ucwords(str_replace('_', ' ', $state)))
                    ->colors([
                        'primary' => 'seminar',
                        'success' => 'campus_hiring',
                        'warning' => 'deadline_loker',
                        'danger' => 'deadline_magang',
                        'info' => 'konsultasi',
                    ]),

                TextColumn::make('location')
                    ->label('Lokasi')
                    ->limit(30)
                    ->toggleable(),

                IconColumn::make('is_active')
                    ->label('Aktif')
                    ->boolean(),

                IconColumn::make('is_featured')
                    ->label('Featured')
                    ->boolean()
                    ->toggleable(),
            ])
            ->defaultSort('start_date', 'desc')
            ->filters([
                SelectFilter::make('event_type')
                    ->label('Tipe Event')
                    ->options([
                        'seminar' => 'Seminar',
                        'campus_hiring' => 'Campus Hiring',
                        'konsultasi' => 'Konsultasi',
                        'deadline_loker' => 'Deadline Loker',
                        'deadline_magang' => 'Deadline Magang',
                        'sertifikasi' => 'Sertifikasi',
                        'custom' => 'Custom',
                    ]),

                TernaryFilter::make('is_active')
                    ->label('Status Aktif'),
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