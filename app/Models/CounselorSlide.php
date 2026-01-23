<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $title
 * @property string $image_path
 * @property int $sort_order
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlide active()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlide newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlide newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlide query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlide whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlide whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlide whereImagePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlide whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlide whereSortOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlide whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlide whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class CounselorSlide extends Model
{
    protected $fillable = [
        'title',
        'image_path',
        'sort_order',
        'is_active',
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
