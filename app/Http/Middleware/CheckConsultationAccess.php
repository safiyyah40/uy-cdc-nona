<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * ROLE ACCESS MIDDLEWARE FOR CONSULTATION FEATURES
 * 
 * Middleware ini mencegah user dengan role yang tidak sesuai mengakses
 * halaman-halaman yang membutuhkan role spesifik.
 * 
 * PROTECTED ROUTES:
 * - Mahasiswa routes: /layanan/konsultasi/*, /layanan/cv/review/*
 * - Konselor routes: /konselor/*
 * 
 * ROLE RESTRICTIONS:
 * - dosen_staf TIDAK BISA mengakses halaman mahasiswa & konselor
 * - mahasiswa TIDAK BISA mengakses halaman konselor
 * - konselor TIDAK BISA mengakses halaman mahasiswa (redirect ke dashboard)
 * 
 * @package App\Http\Middleware
 * @author NONA
 */
class CheckConsultationAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // Jika tidak login, redirect ke login
        if (!$user) {
            return redirect()->route('login');
        }

        $currentPath = $request->path();
        $userRole = $user->role;

        // PROTEKSI HALAMAN MAHASISWA
        $mahasiswaRoutes = [
            'layanan/konsultasi/booking',
            'layanan/konsultasi/riwayat',
            'layanan/konsultasi/detail',
            'layanan/cv/review/upload',
            'layanan/cv/review/table',
            'layanan/cv/review/detail',
        ];

        foreach ($mahasiswaRoutes as $route) {
            if (str_starts_with($currentPath, $route)) {
                // Jika DOSEN_STAF, redirect ke dashboard dengan error
                if ($userRole === 'dosen_staf') {
                    return redirect()->route('dashboard')
                        ->with('error', 'Anda tidak memiliki akses ke halaman ini. Halaman ini diperuntukkan untuk Mahasiswa.');
                }
                
                // Jika KONSELOR, redirect ke dashboard konselor
                if ($userRole === 'konselor') {
                    return redirect()->route('konselor.dashboard')
                        ->with('info', 'Anda telah dialihkan ke dashboard konselor.');
                }
            }
        }

        // PROTEKSI HALAMAN KONSELOR
        $konselorRoutes = [
            'konselor',
            'layanan/konselor',
        ];

        foreach ($konselorRoutes as $route) {
            if (str_starts_with($currentPath, $route)) {
                // Jika DOSEN_STAF, redirect ke dashboard dengan error
                if ($userRole === 'dosen_staf') {
                    return redirect()->route('dashboard')
                        ->with('error', 'Anda tidak memiliki akses ke halaman ini. Halaman ini diperuntukkan untuk Konselor.');
                }
                
                // Jika MAHASISWA, redirect ke layanan konsultasi
                if ($userRole === 'mahasiswa' || $userRole === null) {
                    return redirect()->route('layanan.konsultasi')
                        ->with('error', 'Anda tidak memiliki akses ke halaman konselor.');
                }
                
                // Jika KONSELOR tapi username tidak mengandung '.konselor', block juga
                if ($userRole === 'konselor' && !str_contains($user->username ?? '', '.konselor')) {
                    return redirect()->route('dashboard')
                        ->with('error', 'Akun Anda belum diverifikasi sebagai konselor. Hubungi admin.');
                }
            }
        }

        // Jika lolos semua pengecekan, lanjutkan request
        return $next($request);
    }
}