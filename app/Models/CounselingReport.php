<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CounselingReport extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    // kolom JSON documentation_files otomatis jadi Array PHP
    protected $casts = [
        'documentation_files' => 'array',
    ];

    public function booking()
    {
        return $this->belongsTo(CounselingBooking::class);
    }

    public function counselor()
    {
        return $this->belongsTo(Counselor::class);
    }

    public function student()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Helper
    public function getPhotosUrlAttribute()
    {
        if (!$this->documentation_photos) return [];
        
        return collect($this->documentation_photos)->map(function($path) {
            return asset('storage/' . $path);
        })->toArray();
    }
}