<?php

namespace App\Filament\Resources\AdminActivityLogs\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;

class AdminActivityLogInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Activity Details')
                    ->schema([
                        TextEntry::make('created_at')
                            ->label('Timestamp')
                            ->dateTime('l, d F Y - H:i:s'),

                        TextEntry::make('causer.name')
                            ->label('User')
                            ->default('System'),

                        TextColumn::make('causer.role')
                            ->label('Role')
                            ->badge()
                            ->color(fn (string $state): string => match ($state) {
                                'admin' => 'danger',
                                'mahasiswa' => 'info',
                                'konselor' => 'success',
                                default => 'gray',
                            }),

                        TextEntry::make('causer.email')
                            ->label('Email')
                            ->default('-'),

                        TextEntry::make('event')
                            ->badge()
                            ->color(fn ($state) => match ($state) {
                                'CREATE' => 'success',
                                'UPDATE' => 'warning',
                                'DELETE' => 'danger',
                                'LOGIN' => 'primary',
                                'LOGOUT' => 'secondary',
                                default => 'gray',
                            }),

                        TextEntry::make('description')
                            ->columnSpanFull(),

                        TextEntry::make('subject_type')
                            ->label('Module')
                            ->formatStateUsing(fn ($state) => $state ? class_basename($state) : '-'),

                        TextEntry::make('ip_address')
                            ->label('IP Address'),

                        TextEntry::make('user_agent')
                            ->label('User Agent')
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                Section::make('Properties')
                    ->schema([
                        TextEntry::make('properties')
                            ->label('')
                            ->formatStateUsing(fn ($state) => json_encode($state, JSON_PRETTY_PRINT))
                            ->html()
                            ->columnSpanFull(),
                    ])
                    ->visible(fn ($record) => ! empty($record->properties)),
            ]);
    }
}
