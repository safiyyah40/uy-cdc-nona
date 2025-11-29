<?php

namespace App\Filament\Resources\CampusHirings\Schemas;

use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class CampusHiringInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('slug'),
                TextEntry::make('title'),
                TextEntry::make('company'),
                TextEntry::make('location'),
                TextEntry::make('date')
                    ->date(),
                TextEntry::make('time'),
                TextEntry::make('description')
                    ->columnSpanFull(),
                TextEntry::make('content')
                    ->columnSpanFull(),
                ImageEntry::make('image')
                    ->placeholder('-'),
                TextEntry::make('registration_link')
                    ->placeholder('-'),
                IconEntry::make('is_active')
                    ->boolean(),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }
}
