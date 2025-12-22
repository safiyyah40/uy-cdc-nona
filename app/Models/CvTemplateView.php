<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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

    public function template()
    {
        return $this->belongsTo(CvTemplate::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}