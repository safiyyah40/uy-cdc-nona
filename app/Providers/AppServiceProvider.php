<?php

namespace App\Providers;

use App\Models\BerandaSlide;
use App\Models\Berita;
use App\Models\CalendarEvent;
use App\Models\CampusHiring;
use App\Models\ContactInfo;
use App\Models\CounselingBooking;
use App\Models\Counselor;
use App\Models\CvReview;
use App\Models\CvTemplate;
use App\Models\Loker;
use App\Models\Magang;
use App\Models\OrientasiDuniaKerja;
use App\Models\Seminar;
use App\Models\Sertifikasi;
use App\Observers\BerandaSlideObserver;
use App\Observers\BeritaObserver;
use App\Observers\CalendarEventObserver;
use App\Observers\CampusHiringObserver;
use App\Observers\ContactInfoObserver;
use App\Observers\CounselingBookingObserver;
use App\Observers\CounselorObserver;
use App\Observers\CvReviewObserver;
use App\Observers\CvTemplateObserver;
use App\Observers\LokerObserver;
use App\Observers\MagangObserver;
use App\Observers\OrientasiDuniaKerjaObserver;
use App\Observers\SeminarObserver;
use App\Observers\SertifikasiObserver;
use Illuminate\Auth\Events\Failed;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        BerandaSlide::observe(BerandaSlideObserver::class);
        Berita::observe(BeritaObserver::class);
        CalendarEvent::observe(CalendarEventObserver::class);
        CampusHiring::observe(CampusHiringObserver::class);
        CounselingBooking::observe(CounselingBookingObserver::class);
        Counselor::observe(CounselorObserver::class);
        CvReview::observe(CvReviewObserver::class);
        CvTemplate::observe(CvTemplateObserver::class);
        Loker::observe(LokerObserver::class);
        Magang::observe(MagangObserver::class);
        OrientasiDuniaKerja::observe(OrientasiDuniaKerjaObserver::class);
        Seminar::observe(SeminarObserver::class);
        Sertifikasi::observe(SertifikasiObserver::class);
        ContactInfo::observe(ContactInfoObserver::class);
        Schema::defaultStringLength(191);
        if (config('app.env') !== 'local') {
            URL::forceScheme('https');
        }
        Event::listen(Failed::class, function (Failed $event) {
            Log::warning('Security: Failed login attempt', [
                'email' => $event->credentials['email'] ?? 'unknown',
                'ip' => request()->ip(),
                'user_agent' => request()->userAgent(),
            ]);
        });
    }
}
