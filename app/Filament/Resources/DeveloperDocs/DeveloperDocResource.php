<?php

namespace App\Filament\Resources\DeveloperDocs;

use App\Filament\Resources\DeveloperDocs\Pages\CreateDeveloperDoc;
use App\Filament\Resources\DeveloperDocs\Pages\EditDeveloperDoc;
use App\Filament\Resources\DeveloperDocs\Pages\ListDeveloperDocs;
use App\Filament\Resources\DeveloperDocs\Pages\ViewDeveloperDoc;
use App\Filament\Resources\DeveloperDocs\Schemas\DeveloperDocForm;
use App\Filament\Resources\DeveloperDocs\Schemas\DeveloperDocInfolist;
use App\Filament\Resources\DeveloperDocs\Tables\DeveloperDocsTable;
use App\Models\DeveloperDoc;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class DeveloperDocResource extends Resource
{
    protected static ?string $model = DeveloperDoc::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedPhoto;

    protected static ?string $recordTitleAttribute = 'title';

    protected static string|UnitEnum|null $navigationGroup = 'Manajemen Halaman Profil';

    protected static ?int $navigationSort = 5;

    public static function getModelLabel(): string
    {
        return 'Galeri Pengembang';
    }

    public static function getPluralModelLabel(): string
    {
        return 'Galeri Pengembang';
    }

    public static function form(Schema $schema): Schema
    {
        return DeveloperDocForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return DeveloperDocInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return DeveloperDocsTable::configure($table);
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
            'index' => ListDeveloperDocs::route('/'),
            'create' => CreateDeveloperDoc::route('/create'),
            'view' => ViewDeveloperDoc::route('/{record}'),
            'edit' => EditDeveloperDoc::route('/{record}/edit'),
        ];
    }
}
