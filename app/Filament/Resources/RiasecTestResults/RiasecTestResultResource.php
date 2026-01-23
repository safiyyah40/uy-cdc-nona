<?php

namespace App\Filament\Resources\RiasecTestResults;

use App\Filament\Resources\RiasecTestResults\Pages\CreateRiasecTestResult;
use App\Filament\Resources\RiasecTestResults\Pages\EditRiasecTestResult;
use App\Filament\Resources\RiasecTestResults\Pages\ListRiasecTestResults;
use App\Filament\Resources\RiasecTestResults\Pages\ViewRiasecTestResult;
use App\Filament\Resources\RiasecTestResults\Schemas\RiasecTestResultForm;
use App\Filament\Resources\RiasecTestResults\Schemas\RiasecTestResultInfolist;
use App\Filament\Resources\RiasecTestResults\Tables\RiasecTestResultsTable;
use App\Models\RiasecTestResult;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;
use Illuminate\Database\Eloquent\Builder; 
use Illuminate\Database\Eloquent\SoftDeletingScope;

class RiasecTestResultResource extends Resource
{
    protected static ?string $model = RiasecTestResult::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static string|UnitEnum|null $navigationGroup = 'Manajemen Layanan Tes Minat & Bakat';
    

    public static function getModelLabel(): string
    {
        return 'Hasil Tes RIASEC';
    }

    public static function getPluralModelLabel(): string
    {
        return 'Hasil Tes RIASEC';
    }

    public static function form(Schema $schema): Schema
    {
        return RiasecTestResultForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return RiasecTestResultInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return RiasecTestResultsTable::configure($table);
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
            'index' => ListRiasecTestResults::route('/'),
            'create' => CreateRiasecTestResult::route('/create'),
            'view' => ViewRiasecTestResult::route('/{record}'),
            'edit' => EditRiasecTestResult::route('/{record}/edit'),
        ];
    }

    public static function getRecordRouteBindingEloquentQuery(): Builder
    {
        return parent::getRecordRouteBindingEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }

     public static function getNavigationBadge(): ?string
    {
        return  (string) static::getModel()::count();
    }
    
    public static function getNavigationBadgeColor(): ?string
    {
        return 'warning';
    }
}