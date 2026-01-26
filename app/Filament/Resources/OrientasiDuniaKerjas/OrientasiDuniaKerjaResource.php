<?php

namespace App\Filament\Resources\OrientasiDuniaKerjas;

use App\Filament\Resources\OrientasiDuniaKerjas\Pages\CreateOrientasiDuniaKerja;
use App\Filament\Resources\OrientasiDuniaKerjas\Pages\EditOrientasiDuniaKerja;
use App\Filament\Resources\OrientasiDuniaKerjas\Pages\ListOrientasiDuniaKerjas;
use App\Filament\Resources\OrientasiDuniaKerjas\Pages\ViewOrientasiDuniaKerjas;
use App\Filament\Resources\OrientasiDuniaKerjas\Schemas\OrientasiDuniaKerjaForm;
use App\Filament\Resources\OrientasiDuniaKerjas\Tables\OrientasiDuniaKerjasTable;
use App\Models\OrientasiDuniaKerja;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class OrientasiDuniaKerjaResource extends Resource
{
    protected static ?string $model = OrientasiDuniaKerja::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?int $navigationSort = 1;

    protected static string|UnitEnum|null $navigationGroup = 'Manajemen Program';

    protected static ?string $recordTitleAttribute = 'title';

    public static function getModelLabel(): string
    {
        return 'Orientasi Dunia Kerja';
    }

    public static function getPluralModelLabel(): string
    {
        return 'Orientasi Dunia Kerja';
    }

    public static function form(Schema $schema): Schema
    {
        return OrientasiDuniaKerjaForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return OrientasiDuniaKerjasTable::configure($table);
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
            'index' => ListOrientasiDuniaKerjas::route('/'),
            'create' => CreateOrientasiDuniaKerja::route('/create'),
            'view' => ViewOrientasiDuniaKerjas::route('/{record}'),
            'edit' => EditOrientasiDuniaKerja::route('/{record}/edit'),
        ];
    }
}
