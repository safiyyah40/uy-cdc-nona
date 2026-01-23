<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property string|null $npm
 * @property string $title
 * @property string|null $photo
 * @property string|null $email
 * @property string|null $linkedin_url
 * @property string|null $github_url
 * @property string|null $instagram_url
 * @property int $sort_order
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Developer active()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Developer newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Developer newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Developer query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Developer whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Developer whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Developer whereGithubUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Developer whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Developer whereInstagramUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Developer whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Developer whereLinkedinUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Developer whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Developer whereNpm($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Developer wherePhoto($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Developer whereSortOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Developer whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Developer whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Developer extends Model
{
    protected $fillable = [
        'name', 
        'npm', 
        'title', 
        'photo',
        'email',
        'linkedin_url',
        'github_url',
        'instagram_url',
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
