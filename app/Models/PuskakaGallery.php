<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PuskakaGallery extends Model
{
    protected $fillable = ['title', 'image_path', 'is_active'];

    protected $casts = [
        'is_active' => 'boolean',
    ];
    protected $appends = ['photo_url'];
    
    public function getPhotoUrlAttribute()
    {
        return $this->image_path
        ? asset($this->image_path)
        : null;
    }
}
