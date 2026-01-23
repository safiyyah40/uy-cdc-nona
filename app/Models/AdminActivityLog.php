<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

/**
 * @property int $id
 * @property string|null $log_name
 * @property string $description
 * @property string|null $subject_type
 * @property int|null $subject_id
 * @property string|null $causer_type
 * @property int|null $causer_id
 * @property array<array-key, mixed>|null $properties
 * @property string|null $event
 * @property string|null $ip_address
 * @property string|null $user_agent
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read Model|\Eloquent|null $causer
 * @property-read mixed $causer_email
 * @property-read mixed $causer_name
 * @property-read Model|\Eloquent|null $subject
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminActivityLog newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminActivityLog newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminActivityLog query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminActivityLog whereCauserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminActivityLog whereCauserType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminActivityLog whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminActivityLog whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminActivityLog whereEvent($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminActivityLog whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminActivityLog whereIpAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminActivityLog whereLogName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminActivityLog whereProperties($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminActivityLog whereSubjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminActivityLog whereSubjectType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminActivityLog whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminActivityLog whereUserAgent($value)
 * @mixin \Eloquent
 */
class AdminActivityLog extends Model
{
    protected $fillable = [
        'log_name',
        'description',
        'subject_type',
        'subject_id',
        'causer_type',
        'causer_id',
        'properties',
        'event',
        'ip_address',
        'user_agent',
    ];

    protected $casts = [
        'properties' => 'array',
        'created_at' => 'datetime',
    ];

    public function subject(): MorphTo
    {
        return $this->morphTo();
    }

    public function causer(): MorphTo
    {
        return $this->morphTo();
    }
    
    public function getCauserNameAttribute()
    {
        return $this->causer instanceof \App\Models\User ? $this->causer->name : 'System';
    }
    
    public function getCauserEmailAttribute()
    {
        return $this->causer?->email ?? '-';
    }
}