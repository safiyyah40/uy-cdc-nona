<?php

namespace App\Filament\Resources\Magangs;

use App\Filament\Resources\Magangs\Pages\CreateMagang;
use App\Filament\Resources\Magangs\Pages\EditMagang;
use App\Filament\Resources\Magangs\Pages\ListMagangs;
use App\Filament\Resources\Magangs\Pages\ViewMagang;
use App\Filament\Resources\Magangs\Schemas\MagangForm;
use App\Filament\Resources\Magangs\Schemas\MagangInfolist;
use App\Filament\Resources\Magangs\Tables\MagangsTable;
use App\Models\Magang;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class MagangResource extends Resource
{
    protected static ?string $model = Magang::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?int $navigationSort = 1;

    protected static ?string $recordTitleAttribute = 'title';

    protected static string|UnitEnum|null $navigationGroup = 'Manajemen Peluang Karir';


    public static function getModelLabel(): string
    {
        return 'Lowongan Magang';
    }

    public static function getPluralModelLabel(): string
    {
        return 'Lowongan Magang';
    }

    public static function form(Schema $schema): Schema
    {
        return MagangForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return MagangInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return MagangsTable::configure($table);
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
            'index' => ListMagangs::route('/'),
            'create' => CreateMagang::route('/create'),
            'view' => ViewMagang::route('/{record}'),
            'edit' => EditMagang::route('/{record}/edit'),
        ];
    }
}
