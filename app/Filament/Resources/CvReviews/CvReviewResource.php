<?php

namespace App\Filament\Resources\CvReviews;

use App\Filament\Resources\CvReviews\Pages\CreateCvReview;
use App\Filament\Resources\CvReviews\Pages\EditCvReview;
use App\Filament\Resources\CvReviews\Pages\ListCvReviews;
use App\Filament\Resources\CvReviews\Pages\ViewCvReview;
use App\Filament\Resources\CvReviews\Schemas\CvReviewForm;
use App\Filament\Resources\CvReviews\Schemas\CvReviewInfolist;
use App\Filament\Resources\CvReviews\Tables\CvReviewsTable;
use App\Models\CvReview;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use UnitEnum;

class CvReviewResource extends Resource
{
    protected static ?string $model = CvReview::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static string|UnitEnum|null $navigationGroup = 'Manajemen Layanan Review CV';

    protected static ?string $recordTitleAttribute = 'target_position';
    protected static ?int $navigationSort = 2;

    public static function getModelLabel(): string
    {
        return 'Permohonan Tinjau CV';
    }

    public static function getPluralModelLabel(): string
    {
        return 'Tinjau CV';
    }

    public static function form(Schema $schema): Schema
    {
        return CvReviewForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return CvReviewInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return CvReviewsTable::configure($table);
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
            'index' => ListCvReviews::route('/'),
            'create' => CreateCvReview::route('/create'),
            'view' => ViewCvReview::route('/{record}'),
            'edit' => EditCvReview::route('/{record}/edit'),
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
        return (string) static::getModel()::where('status', 'submitted')->count();
    }
    
    public static function getNavigationBadgeColor(): ?string
    {
        return 'warning';
    }
}