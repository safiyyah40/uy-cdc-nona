<?php

namespace App\Filament\Resources\CampusHirings;

use App\Filament\Resources\CampusHirings\Pages\CreateCampusHiring;
use App\Filament\Resources\CampusHirings\Pages\EditCampusHiring;
use App\Filament\Resources\CampusHirings\Pages\ListCampusHirings;
use App\Filament\Resources\CampusHirings\Pages\ViewCampusHiring;
use App\Filament\Resources\CampusHirings\Schemas\CampusHiringForm;
use App\Filament\Resources\CampusHirings\Schemas\CampusHiringInfolist;
use App\Filament\Resources\CampusHirings\Tables\CampusHiringsTable;
use App\Models\CampusHiring;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class CampusHiringResource extends Resource
{
    protected static ?string $model = CampusHiring::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?int $navigationSort = 1;

    protected static string|UnitEnum|null $navigationGroup = 'Manajemen Program';

    protected static ?string $recordTitleAttribute = 'title';

    public static function getModelLabel(): string
    {
        return 'Campus Hiring';
    }

    public static function getPluralModelLabel(): string
    {
        return 'Campus Hiring';
    }

    public static function form(Schema $schema): Schema
    {
        return CampusHiringForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return CampusHiringInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return CampusHiringsTable::configure($table);
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
            'index' => ListCampusHirings::route('/'),
            'create' => CreateCampusHiring::route('/create'),
            'view' => ViewCampusHiring::route('/{record}'),
            'edit' => EditCampusHiring::route('/{record}/edit'),
        ];
    }
}
