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
                TextEntry::make('title'),
                TextEntry::make('slug'),
                TextEntry::make('description')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('content')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('provider_name'),
                TextEntry::make('logo')
                    ->placeholder('-'),
                TextEntry::make('type')
                    ->badge(),
                TextEntry::make('level')
                    ->badge(),
                TextEntry::make('mode')
                    ->badge(),
                TextEntry::make('location')
                    ->placeholder('-'),
                TextEntry::make('duration')
                    ->placeholder('-'),
                TextEntry::make('start_date')
                    ->date()
                    ->placeholder('-'),
                TextEntry::make('end_date')
                    ->date()
                    ->placeholder('-'),
                IconEntry::make('is_self_paced')
                    ->boolean(),
                TextEntry::make('fee')
                    ->numeric()
                    ->placeholder('-'),
                IconEntry::make('is_free')
                    ->boolean(),
                TextEntry::make('fee_currency'),
                TextEntry::make('requirements')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('benefits')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('syllabus')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('registration_url')
                    ->placeholder('-'),
                TextEntry::make('registration_deadline')
                    ->date()
                    ->placeholder('-'),
                IconEntry::make('is_registration_open')
                    ->boolean(),
                TextEntry::make('brochure_pdf')
                    ->placeholder('-'),
                TextEntry::make('certificate_sample')
                    ->placeholder('-'),
                TextEntry::make('quota')
                    ->numeric()
                    ->placeholder('-'),
                TextEntry::make('enrolled_count')
                    ->numeric(),
                TextEntry::make('status')
                    ->badge(),
                TextEntry::make('view_count')
                    ->numeric(),
                TextEntry::make('meta_title')
                    ->placeholder('-'),
                TextEntry::make('meta_description')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('published_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('deleted_at')
                    ->dateTime()
                    ->visible(fn (Sertifikasi $record): bool => $record->trashed()),
            ]);
    }
}
