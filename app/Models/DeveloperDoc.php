<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DeveloperDoc extends Model
{
    protected $fillable = [
        'title', 
        'image',
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
