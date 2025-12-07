<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Loker extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'slug', 'company', 'location', 
        'type', 'work_model', 'experience_level', 'categories',
        'salary_min', 'salary_max', 'deadline', 'posted_date',
        'logo', 'image', 'description', 'requirements', 'benefits',
        'application_url', 'is_active'
    ];

    protected $guarded = ['id'];

    protected $casts = [
        'categories' => 'array',
        'deadline' => 'datetime',
        'posted_date' => 'datetime',
        'salary_min' => 'decimal:2',
        'salary_max' => 'decimal:2',
        'is_active' => 'boolean',
    ];
}