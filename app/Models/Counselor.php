<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Counselor extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'title',
        'photo_path',
        'is_active',
        'order_column',
    ];
protected $appends = ['photo_url'];

    // Accessor untuk mengubah 'photo_path' menjadi URL lengkap
    public function getPhotoUrlAttribute()
    {
        if ($this->photo_path) {
            return Storage::disk('public')->url($this->photo_path);
        }
        return null; // akan menampilkan placeholder
    }
}
