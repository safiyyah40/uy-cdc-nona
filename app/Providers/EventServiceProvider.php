<?php

namespace App\Providers;

use App\Models\BerandaSlide;
use App\Models\Berita;
use App\Models\CalendarEvent;
use App\Models\CampusHiring;
use App\Models\CounselingBooking;
use App\Models\Counselor;
use App\Models\CvReview;
use App\Models\Sertifikasi;
use App\Models\Loker;
use App\Models\Magang;
use App\Models\OrientasiDuniaKerja;
use App\Models\Seminar;
use App\Models\CvTemplate;
use App\Models\ContactInfo;

use App\Observers\BerandaSlideObserver;
use App\Observers\BeritaObserver;
use App\Observers\CalendarEventObserver;
use App\Observers\CampusHiringObserver;
use App\Observers\CounselingBookingObserver;
use App\Observers\CounselorObserver;
use App\Observers\CvReviewObserver;
use App\Observers\SertifikasiObserver;
use App\Observers\SeminarObserver;
use App\Observers\LokerObserver;
use App\Observers\MagangObserver;
use App\Observers\OrientasiDuniaKerjaObserver;
use App\Observers\CvTemplateObserver;
use App\Observers\ContactInfoObserver;


use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
    ];

    /**
     * Register any events for your application.
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
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     */
    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}