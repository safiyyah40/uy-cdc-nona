<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $booking_id
 * @property int $counselor_id
 * @property int $user_id
 * @property string $feedback
 * @property string|null $action_plan
 * @property string|null $recommendations
 * @property array<array-key, mixed>|null $documentation_files
 * @property int|null $session_duration
 * @property string $session_type
 * @property string|null $session_location
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\CounselingBooking $booking
 * @property-read \App\Models\Counselor $counselor
 * @property-read mixed $photos_url
 * @property-read \App\Models\User $student
 * @method static \Database\Factories\CounselingReportFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingReport newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingReport newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingReport query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingReport whereActionPlan($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingReport whereBookingId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingReport whereCounselorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingReport whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingReport whereDocumentationFiles($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingReport whereFeedback($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingReport whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingReport whereRecommendations($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingReport whereSessionDuration($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingReport whereSessionLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingReport whereSessionType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingReport whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingReport whereUserId($value)
 * @mixin \Eloquent
 */
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

    public function counselor(): BelongsTo
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
        if (!$this->getFilesUrlAttribute) return [];
        
        return collect($this->documentation_files)->map(function($path) {
            return asset('storage/' . $path);
        })->toArray();
    }
}