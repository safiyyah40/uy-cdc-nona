<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

/**
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property string $description
 * @property string $content
 * @property string|null $image
 * @property \Illuminate\Support\Carbon $published_date
 * @property bool $is_active
 * @property int $views
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $image_url
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita active()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita latest()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita wherePublishedDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita whereViews($value)
 * @mixin \Eloquent
 */
class Berita extends Model
{
    use HasFactory;
    protected $table = 'news';

    protected $fillable = [
        'title',
        'slug',
        'description',
        'content',
        'image',
        'published_date',
        'is_active',
        'views',
    ];

    protected $casts = [
        'published_date' => 'date',
        'is_active' => 'boolean',
    ];

    // Auto-generate slug dari title
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($news) {
            if (empty($news->slug)) {
                $news->slug = Str::slug($news->title);
            }
        });

        static::updating(function ($news) {
            if ($news->isDirty('title')) {
                $news->slug = Str::slug($news->title);
            }
        });
    }

    // Scope untuk berita aktif
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Scope untuk berita terbaru
    public function scopeLatest($query)
    {
        return $query->orderBy('published_date', 'desc');
    }

    // Accessor untuk image URL
    public function getImageUrlAttribute()
    {
        return $this->image ? asset('storage/' . $this->image) : asset('images/berita.jpeg');
    }

    // Method untuk increment views
    public function incrementViews()
    {
        $this->increment('views');
    }
}
