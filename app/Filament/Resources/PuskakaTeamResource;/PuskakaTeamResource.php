<?php

namespace App\Filament\Resources\PuskakaTeamResource;

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

class PuskakaTeamResource extends Resource
{
    protected static ?string $model = PuskakaTeam::class;
    protected static ?string $navigationIcon = 'heroicon-o-user-group';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'Puskaka-UY team';

     // --- Labeling yang Jelas untuk Admin ---
    protected static ?string $modelLabel = 'Anggota Tim Puskaka';
    protected static ?string $pluralModelLabel = 'Tim Puskaka';
    protected static ?string $navigationGroup = 'Manajemen Halaman Profil';
    // ------------------------------------

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\FileUpload::make('photo_path')
                    ->label('Foto Anggota Tim')
                    ->image()->imageEditor()->directory('puskaka-team-photos')
                    ->required()->columnSpanFull(),
                Forms\Components\TextInput::make('name')
                    ->label('Nama Lengkap & Gelar')->required(),
                Forms\Components\Textarea::make('title')
                    ->label('Jabatan')->required()->rows(3)
                    ->helperText('Bisa diisi lebih dari satu baris. Contoh:<br>Kepala Pusat<br>Kemahasiswaan, Karir dan Alumni'),
                Forms\Components\Toggle::make('is_active')
                    ->label('Tampilkan di Website')->default(true),
                Forms\Components\TextInput::make('sort_order')
                    ->label('Urutan Tampil')->numeric()->default(0)
                    ->helperText('Angka lebih kecil akan tampil lebih dulu.'),
            ]);
    }

    public static function infolist(Schema $schema): Schema
    {
        return PuskakaTeamInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('photo_path')->label('Foto'),
                Tables\Columns\TextColumn::make('name')->label('Nama')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('title')->label('Jabatan')->wrap(),
                Tables\Columns\IconColumn::make('is_active')->label('Aktif')->boolean(),
                Tables\Columns\TextColumn::make('sort_order')->label('Urutan')->sortable(),
            ])
            ->defaultSort('sort_order', 'asc')
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
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
            'index' => Pages\ListPuskakaTeams::route('/'),
            'create' => Pages\CreatePuskakaTeam::route('/create'),
            'edit' => Pages\EditPuskakaTeam::route('/{record}/edit'),
        ];
    }
}

