<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property string $judul_template
 * @property string|null $deskripsi
 * @property string $kategori
 * @property string $sumber
 * @property string|null $url_template
 * @property string|null $file_path
 * @property string|null $url_preview
 * @property array<array-key, mixed>|null $tags
 * @property string|null $jenis_pekerjaan
 * @property string|null $tingkat_pengalaman
 * @property bool $is_active
 * @property bool $is_unggulan
 * @property int $urutan
 * @property int $jumlah_view
 * @property int $jumlah_klik
 * @property int $jumlah_download
 * @property int|null $dibuat_oleh
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read mixed $preview_url
 * @property-read \App\Models\User|null $pembuat
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\CvTemplateView> $views
 * @property-read int|null $views_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate aktif()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate byKategori($kategori)
 * @method static \Database\Factories\CvTemplateFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate unggulan()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereDeskripsi($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereDibuatOleh($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereFilePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereIsUnggulan($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereJenisPekerjaan($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereJudulTemplate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereJumlahDownload($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereJumlahKlik($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereJumlahView($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereKategori($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereSumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereTags($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereTingkatPengalaman($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereUrlPreview($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereUrlTemplate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereUrutan($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate withTrashed(bool $withTrashed = true)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate withoutTrashed()
 * @mixin \Eloquent
 */
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
    public function pembuat(): BelongsTo
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