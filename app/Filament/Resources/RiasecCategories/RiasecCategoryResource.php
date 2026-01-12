<?php

namespace App\Filament\Resources\RiasecCategories;

use App\Filament\Resources\RiasecCategories\Pages\CreateRiasecCategory;
use App\Filament\Resources\RiasecCategories\Pages\EditRiasecCategory;
use App\Filament\Resources\RiasecCategories\Pages\ListRiasecCategories;
use App\Filament\Resources\RiasecCategories\Pages\ViewRiasecCategory;
use App\Filament\Resources\RiasecCategories\Schemas\RiasecCategoryForm;
use App\Filament\Resources\RiasecCategories\Schemas\RiasecCategoryInfolist;
use App\Filament\Resources\RiasecCategories\Tables\RiasecCategoriesTable;
use App\Models\RiasecCategory;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Unitenum;

class RiasecCategoryResource extends Resource
{
    protected static ?string $model = RiasecCategory::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'title';

    protected static string|UnitEnum|null $navigationGroup = 'Manajemen Layanan Tes Minat & Bakat';

    public static function getModelLabel(): string
    {
        return 'Kategori RIASEC';
    }

    public static function getPluralModelLabel(): string
    {
        return 'Kategori RIASEC';
    }

    public static function form(Schema $schema): Schema
    {
        return RiasecCategoryForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return RiasecCategoryInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return RiasecCategoriesTable::configure($table);
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
            'index' => ListRiasecCategories::route('/'),
            'create' => CreateRiasecCategory::route('/create'),
            'view' => ViewRiasecCategory::route('/{record}'),
            'edit' => EditRiasecCategory::route('/{record}/edit'),
        ];
    }
}
