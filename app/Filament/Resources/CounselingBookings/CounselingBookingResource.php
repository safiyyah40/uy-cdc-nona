<?php

namespace App\Filament\Resources\CounselingBookings;

use App\Filament\Resources\CounselingBookings\Pages\CreateCounselingBooking;
use App\Filament\Resources\CounselingBookings\Pages\EditCounselingBooking;
use App\Filament\Resources\CounselingBookings\Pages\ListCounselingBookings;
use App\Filament\Resources\CounselingBookings\Pages\ViewCounselingBooking;
use App\Filament\Resources\CounselingBookings\Pages\ViewCounselingReport;
use App\Filament\Resources\CounselingBookings\Schemas\CounselingBookingForm;
use App\Filament\Resources\CounselingBookings\Schemas\CounselingBookingInfolist;
use App\Filament\Resources\CounselingBookings\Tables\CounselingBookingsTable;
use App\Models\CounselingBooking;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use UnitEnum;

class CounselingBookingResource extends Resource
{
    protected static ?string $model = CounselingBooking::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static string|UnitEnum|null $navigationGroup = 'Manajemen Layanan';

    protected static ?string $recordTitleAttribute = 'title';

    public static function getModelLabel(): string
    {
        return 'Permohonan Sesi Konsultasi';
    }

    public static function getPluralModelLabel(): string
    {
        return 'Sesi Konsultasi';
    }

    public static function form(Schema $schema): Schema
    {
        return CounselingBookingForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return CounselingBookingInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return CounselingBookingsTable::configure($table);
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
            'index' => ListCounselingBookings::route('/'),
            'create' => CreateCounselingBooking::route('/create'),
            'view' => ViewCounselingBooking::route('/{record}'),
            'edit' => EditCounselingBooking::route('/{record}/edit'),
            'report' => ViewCounselingReport::route('/{record}/report'),
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
        return static::getModel()::where('status', 'pending')->count();
    }
    
    public static function getNavigationBadgeColor(): ?string
    {
        return 'warning';
    }
}
