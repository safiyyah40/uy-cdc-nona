<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PuskakaTeam\Pages\CreatePuskakaTeam;
use App\Filament\Resources\PuskakaTeam\Pages\EditPuskakaTeam;
use App\Filament\Resources\PuskakaTeam\Pages\ListPuskakaTeams;
use App\Filament\Resources\PuskakaTeam\Schemas\PuskakaTeamForm;
use App\Filament\Resources\PuskakaTeam\Schemas\PuskakaTeamInfolist;
use App\Filament\Resources\PuskakaTeam\Tables\PuskakaTeamsTable;
use App\Models\PuskakaTeam;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class PuskakaTeamResource extends Resource
{
    protected static ?string $model = PuskakaTeam::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedUserGroup;

    protected static string|UnitEnum|null $navigationGroup = 'Manajemen Halaman Profil';

    protected static ?int $navigationSort = 2;

    public static function getModelLabel(): string
    {
        return 'Anggota Tim Puskaka';
    }

    public static function getPluralModelLabel(): string
    {
        return 'Tim Puskaka';
    }

    public static function form(Schema $schema): Schema
    {
        return PuskakaTeamForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return PuskakaTeamInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return PuskakaTeamsTable::configure($table);
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
            'index' => ListPuskakaTeams::route('/'),
            'create' => CreatePuskakaTeam::route('/create'),
            'edit' => EditPuskakaTeam::route('/{record}/edit'),
        ];
    }
}