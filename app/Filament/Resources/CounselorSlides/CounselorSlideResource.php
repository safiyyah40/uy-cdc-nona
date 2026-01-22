<?php

namespace App\Filament\Resources\CounselorSlides;

use App\Filament\Resources\CounselorSlides\Pages\CreateCounselorSlide;
use App\Filament\Resources\CounselorSlides\Pages\EditCounselorSlide;
use App\Filament\Resources\CounselorSlides\Pages\ListCounselorSlides;
use App\Filament\Resources\CounselorSlides\Pages\ViewCounselorSlide;
use App\Filament\Resources\CounselorSlides\Schemas\CounselorSlideForm;
use App\Filament\Resources\CounselorSlides\Schemas\CounselorSlideInfolist;
use App\Filament\Resources\CounselorSlides\Tables\CounselorSlidesTable;
use App\Models\CounselorSlide;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class CounselorSlideResource extends Resource
{
    protected static ?string $model = CounselorSlide::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedPhoto;

    protected static ?string $recordTitleAttribute = 'title';

    protected static string|UnitEnum|null $navigationGroup = 'Manajemen Halaman Profil';

    protected static ?int $navigationSort = 5;

    public static function getModelLabel(): string
    {
        return 'Galeri Konselor';
    }

    public static function getPluralModelLabel(): string
    {
        return 'Galeri Konselor';
    }

    public static function form(Schema $schema): Schema
    {
        return CounselorSlideForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return CounselorSlideInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return CounselorSlidesTable::configure($table);
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
            'index' => ListCounselorSlides::route('/'),
            'create' => CreateCounselorSlide::route('/create'),
            'view' => ViewCounselorSlide::route('/{record}'),
            'edit' => EditCounselorSlide::route('/{record}/edit'),
        ];
    }
}
