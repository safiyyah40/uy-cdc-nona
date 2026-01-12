<?php

namespace App\Filament\Resources\Sertifikasis;

use App\Filament\Resources\Sertifikasis\Pages\CreateSertifikasi;
use App\Filament\Resources\Sertifikasis\Pages\EditSertifikasi;
use App\Filament\Resources\Sertifikasis\Pages\ListSertifikasis;
use App\Filament\Resources\Sertifikasis\Pages\ViewSertifikasi;
use App\Filament\Resources\Sertifikasis\Schemas\SertifikasiForm;
use App\Filament\Resources\Sertifikasis\Schemas\SertifikasiInfolist;
use App\Filament\Resources\Sertifikasis\Tables\SertifikasisTable;
use App\Models\Sertifikasi;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use UnitEnum;

class SertifikasiResource extends Resource
{
    protected static ?string $model = Sertifikasi::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?int $navigationSort = 3;

    protected static ?string $recordTitleAttribute = 'title';

    protected static string|UnitEnum|null $navigationGroup = 'Manajemen Peluang Karir';


    public static function getModelLabel(): string
    {
        return 'Program Sertifikasi';
    }

    public static function getPluralModelLabel(): string
    {
        return 'Program Sertifikasi';
    }
    public static function form(Schema $schema): Schema
    {
        return SertifikasiForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return SertifikasiInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return SertifikasisTable::configure($table);
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
            'index' => ListSertifikasis::route('/'),
            'create' => CreateSertifikasi::route('/create'),
            'view' => ViewSertifikasi::route('/{record}'),
            'edit' => EditSertifikasi::route('/{record}/edit'),
        ];
    }

    public static function getRecordRouteBindingEloquentQuery(): Builder
    {
        return parent::getRecordRouteBindingEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }
}
