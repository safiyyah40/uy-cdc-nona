<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property int $category_id
 * @property string $question_text
 * @property int $order
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\RiasecTestAnswer> $answers
 * @property-read int|null $answers_count
 * @property-read \App\Models\RiasecCategory $category
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecQuestion active()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecQuestion newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecQuestion newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecQuestion query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecQuestion whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecQuestion whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecQuestion whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecQuestion whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecQuestion whereOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecQuestion whereQuestionText($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecQuestion whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class RiasecQuestion extends Model
{
    protected $fillable = [
        'category_id',
        'question_text',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(RiasecCategory::class, 'category_id');
    }

    public function answers(): HasMany
    {
        return $this->hasMany(RiasecTestAnswer::class, 'question_id');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('order');
    }
}