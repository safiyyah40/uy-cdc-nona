<?php

namespace App\Filament\Resources\PuskakaTeams;

use App\Filament\Resources\PuskakaTeams\Pages\CreatePuskakaTeam;
use App\Filament\Resources\PuskakaTeams\Pages\EditPuskakaTeam;
use App\Filament\Resources\PuskakaTeams\Pages\ListPuskakaTeams;
use App\Filament\Resources\PuskakaTeams\Pages\ViewPuskakaTeam;
use App\Filament\Resources\PuskakaTeams\Schemas\PuskakaTeamForm;
use App\Filament\Resources\PuskakaTeams\Schemas\PuskakaTeamInfolist;
use App\Filament\Resources\PuskakaTeams\Tables\PuskakaTeamsTable;
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

    protected static ?int $navigationSort = 1;

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
            'view' => ViewPuskakaTeam::route('/{record}'),
            'edit' => EditPuskakaTeam::route('/{record}/edit'),
        ];
    }
}
