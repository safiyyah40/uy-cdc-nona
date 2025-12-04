<?php

namespace App\Filament\Resources\PuskakaGalleries;

use App\Filament\Resources\PuskakaGalleries\Pages\CreatePuskakaGallery;
use App\Filament\Resources\PuskakaGalleries\Pages\EditPuskakaGallery;
use App\Filament\Resources\PuskakaGalleries\Pages\ListPuskakaGallerys;
use App\Filament\Resources\PuskakaGalleries\Schemas\PuskakaGalleryForm;
use App\Filament\Resources\PuskakaGalleries\Schemas\PuskakaGalleryInfolist;
use App\Filament\Resources\PuskakaGalleries\Pages\ListPuskakaGalleries;
use App\Filament\Resources\PuskakaGalleries\Tables\PuskakaGalleriesTable;
use App\Models\PuskakaGallery;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class PuskakaGalleryResource extends Resource
{
    protected static ?string $model = PuskakaGallery::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedPhoto;

    protected static string|UnitEnum|null $navigationGroup = 'Manajemen Halaman Profil';

    public static function getModelLabel(): string
    {
        return 'Foto Galeri';
    }

    public static function getPluralModelLabel(): string
    {
        return 'Galeri Puskaka';
    }

    public static function form(Schema $schema): Schema
    {
        return PuskakaGalleryForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return PuskakaGalleryInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return PuskakaGalleriesTable::configure($table);
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
            'index' => ListPuskakaGalleries::route('/'),
            'create' => CreatePuskakaGallery::route('/create'),
            'edit' => EditPuskakaGallery::route('/{record}/edit'),
        ];
    }
}