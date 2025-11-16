<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ProfileCompletionController extends Controller
{
    public function show()
    {
        $user = Auth::user();

        if (!$user->needsProfileCompletion()) {
            return redirect()->route('dashboard');
        }

        return Inertia::render('Auth/CompleteProfile', [
            'user' => [
                'name' => $user->name,
                'id_number' => $user->id_number,
                'id_label' => $user->id_label,
                'email' => $user->email,
            ]
        ]);
    }

    public function store(Request $request)
    {
        // Ambil input & membersihkan karakter non-angka (spasi, -, +)
        $phoneInput = $request->input('phone');
        $phoneClean = preg_replace('/[^0-9]/', '', $phoneInput);

        // Logika Konversi Otomatis ke Format '628'
        if (substr($phoneClean, 0, 2) === '08') {
            // Jika berawalan '08', ganti '0' dengan '62'. Contoh: 0812 -> 62812
            $phoneClean = '62' . substr($phoneClean, 1);
        } elseif (substr($phoneClean, 0, 1) === '8') {
            // Jika berawalan '8', tambahkan '62' di depan. Contoh: 812 -> 62812
            $phoneClean = '62' . $phoneClean;
        }

        // Memasukkan kembali data yang sudah diformat ke dalam request agar validasi mengecek nomor yang SUDAH jadi 628...
        $request->merge(['phone' => $phoneClean]);

        $user = Auth::user();

        // Validasi (Sekarang mengecek nomor format 628...)
        $request->validate([
            'phone' => [
                'required',
                'string',
                'max:20',
                // Memastikan nomor '628...' ini belum dipakai orang lain
                Rule::unique('users', 'phone')->ignore($user->id),
            ],
        ], [
            'phone.required' => 'Nomor telepon wajib diisi.',
            'phone.unique' => 'Nomor telepon ini sudah terdaftar oleh pengguna lain.',
        ]);

        // Menyimpan nomor yang sudah pasti format 628
        $user->update([
            'phone' => $phoneClean,
            'is_profile_complete' => true,
        ]);

        return redirect()->route('dashboard')->with('success', 'Profil berhasil dilengkapi!');
    }
}