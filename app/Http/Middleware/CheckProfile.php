<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CheckProfile
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();

        // Kalau belum lengkap, dan bukan lagi di halaman 'complete-profile' atau 'logout'
        if ($user && $user->needsProfileCompletion()) {
            Log::info('Profile enforcement: User redirected to complete profile', [
                'user_id' => $user->id,
                'attempted_url' => $request->fullUrl(),
            ]);

            // Jika belum lengkap, paksa ke halaman complete-profile
            return redirect()->route('profile.complete');
        }

        return $next($request);
    }
}
