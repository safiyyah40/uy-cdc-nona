<?php

namespace App\Filament\Resources\CvReviews\Pages;

use App\Filament\Resources\CvReviews\CvReviewResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListCvReviews extends ListRecords
{
    protected static string $resource = CvReviewResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}