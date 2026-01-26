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
                //
            ]);
    }
}
