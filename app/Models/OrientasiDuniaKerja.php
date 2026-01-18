<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class OrientasiDuniaKerja extends Model
{
    protected $fillable = [
        'slug', 'title', 'categories', 'location', 'date', 
        'time', 'description', 'content', 'image', 
        'registration_link', 'is_active'
    ];

    protected $casts = [
        'date' => 'date',
        'is_active' => 'boolean',
        'categories' => 'array',
    ];

    // Auto generate slug saat membuat/update data
    protected static function boot()
    {
        parent::boot();
        static::creating(fn ($model) => $model->slug = Str::slug($model->title));
        static::updating(fn ($model) => $model->slug = Str::slug($model->title));
    }

    // Scope untuk mengambil data yang aktif saja
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function calendarEvent(): MorphOne
    {
        return $this->morphOne(CalendarEvent::class, 'eventable');
    }
}