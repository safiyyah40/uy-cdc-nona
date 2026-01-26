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
                //
            ]);
    }
}
