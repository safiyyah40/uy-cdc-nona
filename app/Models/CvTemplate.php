<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CvTemplate extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'judul_template',
        'deskripsi',
        'kategori',
        'sumber',
        'url_template',
        'url_preview',
        'tags',
        'jenis_pekerjaan',
        'tingkat_pengalaman',
        'is_active',
        'is_unggulan',
        'urutan',
        'jumlah_view',
        'jumlah_klik',
        'jumlah_download',
        'file_path',
        'dibuat_oleh',
    ];

    protected $casts = [
        'tags' => 'array',
        'is_active' => 'boolean',
        'is_unggulan' => 'boolean',
        'jumlah_view' => 'integer',
        'jumlah_klik' => 'integer',
        'jumlah_download' => 'integer',
    ];

    // Relasi
    public function pembuat()
    {
        return $this->belongsTo(User::class, 'dibuat_oleh');
    }

    public function views()
    {
        return $this->hasMany(CvTemplateView::class, 'template_id');
    }

    public function scopeAktif($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeUnggulan($query)
    {
        return $query->where('is_unggulan', true);
    }

    public function scopeByKategori($query, $kategori)
    {
        return $query->where('kategori', $kategori);
    }

    // Helper Methods
    public function tambahView()
    {
        $this->increment('jumlah_view');
    }

    public function tambahKlik()
    {
        $this->increment('jumlah_klik');
    }

    public function tambahDownload()
    {
        $this->increment('jumlah_download');
    }

    // Accessor untuk Preview
    public function getPreviewUrlAttribute()
    {
        if ($this->url_preview) {
            // Jika URL eksternal
            if (filter_var($this->url_preview, FILTER_VALIDATE_URL)) {
                return $this->url_preview;
            }
            // Jika file lokal
            return asset('storage/' . $this->url_preview);
        }
        
        // Default placeholder
        return 'https://via.placeholder.com/400x600/004d40/ffffff?text=CV+Template';
    }
}