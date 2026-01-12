<?php

namespace App\Filament\Resources\RiasecQuestions;

use App\Filament\Resources\RiasecQuestions\Pages\CreateRiasecQuestion;
use App\Filament\Resources\RiasecQuestions\Pages\EditRiasecQuestion;
use App\Filament\Resources\RiasecQuestions\Pages\ListRiasecQuestions;
use App\Filament\Resources\RiasecQuestions\Pages\ViewRiasecQuestion;
use App\Filament\Resources\RiasecQuestions\Schemas\RiasecQuestionForm;
use App\Filament\Resources\RiasecQuestions\Schemas\RiasecQuestionInfolist;
use App\Filament\Resources\RiasecQuestions\Tables\RiasecQuestionsTable;
use App\Models\RiasecQuestion;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class RiasecQuestionResource extends Resource
{
    protected static ?string $model = RiasecQuestion::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static string|UnitEnum|null $navigationGroup = 'Manajemen Layanan Tes Minat & Bakat';

    public static function getModelLabel(): string
    {
        return 'Pertanyaan RIASEC';
    }

    public static function getPluralModelLabel(): string
    {
        return 'Pertanyaan RIASEC';
    }

    public static function form(Schema $schema): Schema
    {
        return RiasecQuestionForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return RiasecQuestionInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return RiasecQuestionsTable::configure($table);
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
            'index' => ListRiasecQuestions::route('/'),
            'create' => CreateRiasecQuestion::route('/create'),
            'view' => ViewRiasecQuestion::route('/{record}'),
            'edit' => EditRiasecQuestion::route('/{record}/edit'),
        ];
    }
}
