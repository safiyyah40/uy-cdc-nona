<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property string $title
 * @property string|null $photo_path
 * @property int $is_active
 * @property int $sort_order
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaTeam newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaTeam newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaTeam query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaTeam whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaTeam whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaTeam whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaTeam whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaTeam wherePhotoPath($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaTeam whereSortOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaTeam whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaTeam whereUpdatedAt($value)
 * @mixin \Eloquent
 */
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
