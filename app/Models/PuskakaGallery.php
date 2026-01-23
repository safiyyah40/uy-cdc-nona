<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string|null $title
 * @property string $image_path
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $photo_url
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaGallery newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaGallery newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaGallery query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaGallery whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaGallery whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaGallery whereImagePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaGallery whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaGallery whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaGallery whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class PuskakaGallery extends Model
{
    protected $fillable = ['title', 'image_path', 'is_active'];

    protected $casts = [
        'is_active' => 'boolean',
    ];
    protected $appends = ['photo_url'];
    
    public function getPhotoUrlAttribute()
    {
        return $this->image_path
        ? asset($this->image_path)
        : null;
    }
}
