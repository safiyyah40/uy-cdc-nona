<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

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
