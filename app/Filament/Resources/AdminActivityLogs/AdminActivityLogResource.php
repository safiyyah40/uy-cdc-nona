<?php

namespace App\Filament\Resources\AdminActivityLogs;

use App\Filament\Resources\AdminActivityLogs\Pages\ListAdminActivityLogs;
use App\Filament\Resources\AdminActivityLogs\Pages\ViewAdminActivityLog;
use App\Filament\Resources\AdminActivityLogs\Schemas\AdminActivityLogForm;
use App\Filament\Resources\AdminActivityLogs\Schemas\AdminActivityLogInfolist;
use App\Filament\Resources\AdminActivityLogs\Tables\AdminActivityLogsTable;
use App\Models\AdminActivityLog;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class AdminActivityLogResource extends Resource
{
    protected static ?string $model = AdminActivityLog::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?int $navigationSort = 100;

    public static function getModelLabel(): string
    {
        return 'Riwayat Aktivitas';
    }

    public static function getPluralModelLabel(): string
    {
        return 'Riwayat Aktivitas';
    }

    public static function form(Schema $schema): Schema
    {
        return AdminActivityLogForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return AdminActivityLogInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return AdminActivityLogsTable::configure($table);
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
            'index' => ListAdminActivityLogs::route('/'),
            'view' => ViewAdminActivityLog::route('/{record}'),
        ];
    }

    public static function canCreate(): bool
    {
        return false;
    }
}
