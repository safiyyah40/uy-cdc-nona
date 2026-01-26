<?php

namespace App\Filament\Resources\Sertifikasis\Schemas;

use App\Models\Sertifikasi;
use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class SertifikasiInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                //
            ]);
    }
}
