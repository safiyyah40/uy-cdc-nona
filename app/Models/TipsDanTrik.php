<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

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
