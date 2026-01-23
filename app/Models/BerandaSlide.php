<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

/**
 * @property int $id
 * @property string $image_path
 * @property string|null $alt_text
 * @property int $sort_order
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $photo_url
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BerandaSlide newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BerandaSlide newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BerandaSlide query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BerandaSlide whereAltText($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BerandaSlide whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BerandaSlide whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BerandaSlide whereImagePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BerandaSlide whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BerandaSlide whereSortOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BerandaSlide whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class BerandaSlide extends Model
{
    use HasFactory;

    protected $fillable = [
        'image_path',
        'alt_text',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
    protected $appends = ['photo_url'];

    /**
     * Get image URL
     */
    public function getPhotoUrlAttribute()
    {
        return $this->image_path
        ? asset($this->image_path)
        : null;
    }
}