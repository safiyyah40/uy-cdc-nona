<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $template_id
 * @property int|null $user_id
 * @property string $action_type
 * @property string|null $ip_address
 * @property string|null $user_agent
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\CvTemplate $template
 * @property-read \App\Models\User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplateView newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplateView newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplateView query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplateView whereActionType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplateView whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplateView whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplateView whereIpAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplateView whereTemplateId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplateView whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplateView whereUserAgent($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplateView whereUserId($value)
 * @mixin \Eloquent
 */
class CvTemplateView extends Model
{
    use HasFactory;

    protected $fillable = [
        'template_id',
        'user_id',
        'action_type',
        'ip_address',
        'user_agent',
    ];

    public function template(): BelongsTo
    {
        return $this->belongsTo(CvTemplate::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}