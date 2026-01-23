<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

/**
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property string $category
 * @property string|null $thumbnail
 * @property string $summary
 * @property string $content
 * @property int $reading_time
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $published_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TipsDanTrik active()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TipsDanTrik latest()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TipsDanTrik newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TipsDanTrik newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TipsDanTrik query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TipsDanTrik whereCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TipsDanTrik whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TipsDanTrik whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TipsDanTrik whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TipsDanTrik whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TipsDanTrik wherePublishedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TipsDanTrik whereReadingTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TipsDanTrik whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TipsDanTrik whereSummary($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TipsDanTrik whereThumbnail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TipsDanTrik whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TipsDanTrik whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class TipsDanTrik extends Model
{
    use HasFactory;

    //fillable fields tipsdantrik
    protected $fillable = [
        'title',
        'slug',
        'category',
        'thumbnail',
        'summary',
        'content',
        'reading_time',
        'is_active',
        'published_at',
    ];
     protected $casts = [
        'published_at' => 'date',
        'is_active' => 'boolean',
    ];

     // Auto generate slug
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($tipsDanTrik) {
            if (empty($tipsDanTrik->slug)) {
                $tipsDanTrik->slug = Str::slug($tipsDanTrik->title);
            }
        });

        static::updating(function ($tipsDanTrik) {
            if ($tipsDanTrik->isDirty('title') && empty($tipsDanTrik->slug)) {
                $tipsDanTrik->slug = Str::slug($tipsDanTrik->title);
            }
        });
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Scope untuk sorting terbaru
    public function scopeLatest($query)
    {
        return $query->orderBy('published_at', 'desc')->orderBy('created_at', 'desc');
    }
}
