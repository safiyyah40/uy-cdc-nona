<?php

namespace App\Filament\Resources\Sertifikasis\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class SertifikasisTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('logo')
                    ->label('Logo')
                    ->circular()
                    ->defaultImageUrl(url('/images/default-logo.png')),

                TextColumn::make('title')
                    ->label('Judul Program')
                    ->searchable()
                    ->sortable()
                    ->limit(40),

                TextColumn::make('provider_name')
                    ->label('Provider')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('type')
                    ->label('Jenis')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Sertifikasi' => 'success',
                        'Kursus' => 'info',
                        'Workshop' => 'warning',
                        'Bootcamp' => 'danger',
                    }),

                TextColumn::make('mode')
                    ->label('Mode')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Online' => 'primary',
                        'Offline' => 'warning',
                        'Hybrid' => 'success',
                    }),

                TextColumn::make('fee')
                    ->label('Biaya')
                    ->money('IDR')
                    ->sortable()
                    ->formatStateUsing(fn ($record) => $record->is_free ? 'Gratis' : 'Rp '.number_format($record->fee, 0, ',', '.')),

                IconColumn::make('is_registration_open')
                    ->label('Open')
                    ->boolean(),

                TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Draft' => 'gray',
                        'Published' => 'success',
                        'Closed' => 'danger',
                    }),
                ToggleColumn::make('is_active')
                    ->label('Aktif'),

                TextColumn::make('enrolled_count')
                    ->label('Peserta')
                    ->numeric()
                    ->sortable(),

                TextColumn::make('view_count')
                    ->label('Views')
                    ->numeric()
                    ->sortable(),

                TextColumn::make('created_at')
                    ->label('Dibuat')
                    ->dateTime('d M Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('type')
                    ->options([
                        'Sertifikasi' => 'Sertifikasi',
                        'Kursus' => 'Kursus',
                        'Workshop' => 'Workshop',
                        'Bootcamp' => 'Bootcamp',
                    ]),

                SelectFilter::make('mode')
                    ->options([
                        'Online' => 'Online',
                        'Offline' => 'Offline',
                        'Hybrid' => 'Hybrid',
                    ]),

                SelectFilter::make('status')
                    ->options([
                        'Draft' => 'Draft',
                        'Published' => 'Published',
                        'Closed' => 'Closed',
                    ]),

                TernaryFilter::make('is_free')
                    ->label('Gratis')
                    ->trueLabel('Gratis')
                    ->falseLabel('Berbayar'),
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
            ->defaultSort('created_at', 'desc');
    }
}
