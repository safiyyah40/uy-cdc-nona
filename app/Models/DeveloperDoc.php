<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $title
 * @property string $image
 * @property int $sort_order
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DeveloperDoc active()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DeveloperDoc newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DeveloperDoc newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DeveloperDoc query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DeveloperDoc whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DeveloperDoc whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DeveloperDoc whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DeveloperDoc whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DeveloperDoc whereSortOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DeveloperDoc whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DeveloperDoc whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class DeveloperDoc extends Model
{
    protected $fillable = [
        'title', 
        'image',
        'sort_order',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
    
    // Scope untuk mengambil yang aktif & urut
    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('sort_order', 'asc');
    }
}
