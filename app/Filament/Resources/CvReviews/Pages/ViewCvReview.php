<?php

namespace App\Filament\Resources\CvReviews\Pages;

use App\Filament\Resources\CvReviews\CvReviewResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewCvReview extends ViewRecord
{
    protected static string $resource = CvReviewResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}