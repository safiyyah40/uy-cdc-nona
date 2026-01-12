<?php

namespace App\Filament\Resources\Seminars;

use App\Filament\Resources\Seminars\Pages\CreateSeminar;
use App\Filament\Resources\Seminars\Pages\EditSeminar;
use App\Filament\Resources\Seminars\Pages\ListSeminars;
use App\Filament\Resources\Seminars\Pages\ViewSeminar;
use App\Filament\Resources\Seminars\Schemas\SeminarForm;
use App\Filament\Resources\Seminars\Schemas\SeminarInfolist;
use App\Filament\Resources\Seminars\Tables\SeminarsTable;
use App\Models\Seminar;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class SeminarResource extends Resource
{
    protected static ?string $model = Seminar::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static string|UnitEnum|null $navigationGroup = 'Manajemen Program';

    protected static ?int $navigationSort = 3;

    protected static ?string $recordTitleAttribute = 'title';

    public static function getModelLabel(): string
    {
        return 'Seminar';
    }

    public static function getPluralModelLabel(): string
    {
        return 'Seminar';
    }

    public static function form(Schema $schema): Schema
    {
        return SeminarForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return SeminarInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return SeminarsTable::configure($table);
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
            'index' => ListSeminars::route('/'),
            'create' => CreateSeminar::route('/create'),
            'view' => ViewSeminar::route('/{record}'),
            'edit' => EditSeminar::route('/{record}/edit'),
        ];
    }
}
