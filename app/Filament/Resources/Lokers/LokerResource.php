<?php

namespace App\Filament\Resources\Lokers;

use App\Filament\Resources\Lokers\Pages\CreateLoker;
use App\Filament\Resources\Lokers\Pages\EditLoker;
use App\Filament\Resources\Lokers\Pages\ListLokers;
use App\Filament\Resources\Lokers\Pages\ViewLoker;
use App\Filament\Resources\Lokers\Schemas\LokerForm;
use App\Filament\Resources\Lokers\Schemas\LokerInfolist;
use App\Filament\Resources\Lokers\Tables\LokersTable;
use App\Models\Loker;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class LokerResource extends Resource
{
    protected static ?string $model = Loker::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'title';

    protected static string|UnitEnum|null $navigationGroup = 'Manajemen Peluang Karir';


    public static function getModelLabel(): string
    {
        return 'Lowongan Kerja';
    }

    public static function getPluralModelLabel(): string
    {
        return 'Lowongan Kerja';
    }

    public static function form(Schema $schema): Schema
    {
        return LokerForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return LokerInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return LokersTable::configure($table);
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
            'index' => ListLokers::route('/'),
            'create' => CreateLoker::route('/create'),
            'view' => ViewLoker::route('/{record}'),
            'edit' => EditLoker::route('/{record}/edit'),
        ];
    }
}
