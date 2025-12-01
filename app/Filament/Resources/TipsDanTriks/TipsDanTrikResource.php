<?php

namespace App\Filament\Resources\TipsDanTriks;

use App\Filament\Resources\TipsDanTriks\Pages\CreateTipsDanTrik;
use App\Filament\Resources\TipsDanTriks\Pages\EditTipsDanTrik;
use App\Filament\Resources\TipsDanTriks\Pages\ListTipsDanTriks;
use App\Filament\Resources\TipsDanTriks\Pages\ViewTipsDanTrik;
use App\Filament\Resources\TipsDanTriks\Schemas\TipsDanTrikForm;
use App\Filament\Resources\TipsDanTriks\Schemas\TipsDanTrikInfolist;
use App\Filament\Resources\TipsDanTriks\Tables\TipsDanTriksTable;
use App\Models\TipsDanTrik;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class TipsDanTrikResource extends Resource
{
    protected static ?string $model = TipsDanTrik::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static string|UnitEnum|null $navigationGroup = 'Manajemen Program';

    protected static ?string $recordTitleAttribute = 'title';

    public static function getModelLabel(): string
    {
        return 'Tips dan Trik';
    }

    public static function getPluralModelLabel(): string
    {
        return 'Tips dan Trik';
    }

    public static function form(Schema $schema): Schema
    {
        return TipsDanTrikForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return TipsDanTrikInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return TipsDanTriksTable::configure($table);
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
            'index' => ListTipsDanTriks::route('/'),
            'create' => CreateTipsDanTrik::route('/create'),
            'view' => ViewTipsDanTrik::route('/{record}'),
            'edit' => EditTipsDanTrik::route('/{record}/edit'),
        ];
    }
}
