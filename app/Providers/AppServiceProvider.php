<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;
use App\Models\Seminar;
use App\Models\CampusHiring;
use App\Models\Loker;
use App\Models\Magang;
use App\Models\Sertifikasi;
use App\Observers\SeminarObserver;
use App\Observers\CampusHiringObserver;
use App\Observers\LokerObserver;
use App\Observers\MagangObserver;
use App\Observers\SertifikasiObserver;

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
        Seminar::observe(SeminarObserver::class);
        CampusHiring::observe(CampusHiringObserver::class);
        Loker::observe(LokerObserver::class);
        Magang::observe(MagangObserver::class);
        Sertifikasi::observe(SertifikasiObserver::class);
        if (config('app.env') !== 'local') {
        URL::forceScheme('https');
    }
    }
}
