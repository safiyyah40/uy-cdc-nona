<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BerandaSlides\Pages\CreateBerandaSlide;
use App\Filament\Resources\BerandaSlides\Pages\EditBerandaSlide;
use App\Filament\Resources\BerandaSlides\Pages\ListBerandaSlides;
use App\Filament\Resources\BerandaSlides\Schemas\BerandaSlideForm;
use App\Filament\Resources\BerandaSlides\Schemas\BerandaSlideInfolist;
use App\Filament\Resources\BerandaSlides\Tables\BerandaSlidesTable;
use App\Models\BerandaSlide;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class BerandaSlideResource extends Resource
{
    protected static ?string $model = BerandaSlide::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static string|UnitEnum|null $navigationGroup = 'Manajemen Konten Beranda';

    protected static ?string $recordTitleAttribute = 'alt_text';

        public static function getModelLabel(): string
    {
        return 'Slide Beranda';
    }

    public static function getPluralModelLabel(): string
    {
        return 'Slideshow Beranda';
    }

    public static function form(Schema $schema): Schema
    {
        return BerandaSlideForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return BerandaSlideInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return BerandaSlidesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListBerandaSlides::route('/'),
            'create' => CreateBerandaSlide::route('/create'),
            'edit' => EditBerandaSlide::route('/{record}/edit'),
        ];
    }
}
