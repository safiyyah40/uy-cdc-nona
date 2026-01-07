<?php

namespace App\Filament\Resources\CalendarEvents\Schemas;

use App\Models\CalendarEvent;
use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class CalendarEventInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('eventable_type'),
                TextEntry::make('eventable_id')
                    ->numeric(),
                TextEntry::make('title'),
                TextEntry::make('description')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('start_date')
                    ->date(),
                TextEntry::make('end_date')
                    ->date()
                    ->placeholder('-'),
                TextEntry::make('start_time')
                    ->time()
                    ->placeholder('-'),
                TextEntry::make('end_time')
                    ->time()
                    ->placeholder('-'),
                TextEntry::make('event_type')
                    ->badge(),
                TextEntry::make('location')
                    ->placeholder('-'),
                TextEntry::make('link')
                    ->placeholder('-'),
                TextEntry::make('registration_url')
                    ->placeholder('-'),
                TextEntry::make('color'),
                TextEntry::make('icon')
                    ->placeholder('-'),
                TextEntry::make('priority')
                    ->badge(),
                IconEntry::make('is_visible_to_mahasiswa')
                    ->boolean(),
                IconEntry::make('is_visible_to_konselor')
                    ->boolean(),
                IconEntry::make('is_visible_to_admin')
                    ->boolean(),
                IconEntry::make('is_active')
                    ->boolean(),
                IconEntry::make('is_featured')
                    ->boolean(),
                IconEntry::make('send_notification')
                    ->boolean(),
                TextEntry::make('remind_before_days')
                    ->numeric()
                    ->placeholder('-'),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('deleted_at')
                    ->dateTime()
                    ->visible(fn (CalendarEvent $record): bool => $record->trashed()),
            ]);
    }
}
