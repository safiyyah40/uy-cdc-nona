<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class BerandaSlide extends Model
{
    use HasFactory;

    protected $fillable = [
        'image_path',
        'alt_text',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
    protected $appends = ['photo_url'];

    /**
     * Get image URL
     */
    public function getPhotoUrlAttribute()
    {
        return $this->image_path
        ? asset($this->image_path)
        : null;
    }
}