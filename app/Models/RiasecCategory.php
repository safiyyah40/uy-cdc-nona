<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property string $code
 * @property string $title
 * @property string $nickname
 * @property string $description
 * @property array<array-key, mixed> $traits
 * @property array<array-key, mixed> $branding_strategies
 * @property array<array-key, mixed>|null $career_recommendations
 * @property bool $is_active
 * @property int $order
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\RiasecQuestion> $questions
 * @property-read int|null $questions_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecCategory active()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecCategory whereBrandingStrategies($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecCategory whereCareerRecommendations($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecCategory whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecCategory whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecCategory whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecCategory whereNickname($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecCategory whereOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecCategory whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecCategory whereTraits($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecCategory whereUpdatedAt($value)
 * @mixin \Eloquent
 */
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