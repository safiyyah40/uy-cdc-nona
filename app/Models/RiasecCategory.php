<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RiasecCategory extends Model
{
    protected $fillable = [
        'code',
        'title',
        'nickname',
        'description',
        'traits',
        'branding_strategies',
        'career_recommendations',
        'is_active',
        'order',
    ];

    protected $casts = [
        'traits' => 'array',
        'branding_strategies' => 'array',
        'career_recommendations' => 'array',
        'is_active' => 'boolean',
    ];

    public function questions(): HasMany
    {
        return $this->hasMany(RiasecQuestion::class, 'category_id');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('order');
    }
}