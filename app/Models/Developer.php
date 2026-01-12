<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Developer extends Model
{
    protected $fillable = [
        'name', 
        'npm', 
        'title', 
        'photo',
        'email',
        'linkedin_url',
        'github_url',
        'instagram_url',
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
