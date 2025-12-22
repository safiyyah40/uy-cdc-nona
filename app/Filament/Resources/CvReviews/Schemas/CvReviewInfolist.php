<?php

namespace App\Filament\Resources\CvReviews\Schemas;

use App\Models\CvReview;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class CvReviewInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('user_id')
                    ->numeric(),
                TextEntry::make('counselor_id')
                    ->numeric()
                    ->placeholder('-'),
                TextEntry::make('student_name'),
                TextEntry::make('student_npm'),
                TextEntry::make('student_email'),
                TextEntry::make('student_phone'),
                TextEntry::make('student_faculty')
                    ->placeholder('-'),
                TextEntry::make('student_study_program')
                    ->placeholder('-'),
                TextEntry::make('target_position'),
                TextEntry::make('additional_notes')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('cv_file_path'),
                TextEntry::make('cv_file_original_name'),
                TextEntry::make('status')
                    ->badge(),
                TextEntry::make('feedback_text')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('priority')
                    ->badge(),
                TextEntry::make('submitted_at')
                    ->dateTime(),
                TextEntry::make('assigned_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('reviewed_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('completed_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('deleted_at')
                    ->dateTime()
                    ->visible(fn (CvReview $record): bool => $record->trashed()),
            ]);
    }
}
