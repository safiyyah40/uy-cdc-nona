<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PuskakaTeam extends Model
{
    use HasFactory;
    protected $table = 'puskaka_teams';

    protected $fillable = [
        'name',
        'title',
        'photo_path',
        'is_active',
        'sort_order',
    ];
}
