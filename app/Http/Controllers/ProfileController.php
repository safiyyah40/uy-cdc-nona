<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function show()
    {
        return Inertia::render('Profile/ViewProfile', [
            'user' => Auth::user(),
        ]);
    }

    public function edit()
    {
        return Inertia::render('Profile/EditProfile', [
            'user' => Auth::user(),
        ]);
    }

    /**
     * Update profil (Foto & No HP) setelah login
     */
    public function update(Request $request)
    {
        $user = Auth::user();

        // 1. Validasi
        $request->validate([
            'phone' => [
                'required',
                'string',
                'regex:/^(08|628)[0-9]{8,13}$/',
                'unique:users,phone,' . $user->id,
            ],
            'photo' => 'nullable|image|mimes:jpg,jpeg,png|max:5120', // 5MB
        ], [
            'phone.regex' => 'Format nomor WhatsApp tidak valid. Gunakan awalan 08 atau 628.',
            'phone.unique' => 'Nomor WhatsApp ini sudah terdaftar.',
            'photo.image' => 'File harus berupa gambar.',
            'photo.mimes' => 'Format foto harus JPG, JPEG, atau PNG.',
            'photo.max' => 'Ukuran foto maksimal 5MB.',
        ]);

        // 2. Normalisasi Nomor HP (08 -> 628)
        $phone = preg_replace('/[^0-9]/', '', $request->phone);
        if (str_starts_with($phone, '0')) {
            $phone = '62' . substr($phone, 1);
        }
        $user->phone = $phone;

        // 3. Proses Foto Profil
        if ($request->hasFile('photo')) {
            // Hapus foto lama jika ada (dan bukan foto default/placeholder)
            if ($user->photo_url && Storage::disk('public')->exists(str_replace('/storage/', '', $user->photo_url))) {
                 Storage::disk('public')->delete(str_replace('/storage/', '', $user->photo_url));
            }

            $path = $request->file('photo')->store('profile_photos', 'public');
            $user->photo_url = '/storage/' . $path;
        }

        $user->save();

        return redirect()
            ->route('profile.show')
            ->with('success', 'Profil berhasil diperbarui!');
    }

    /**
     * Menyimpan data awal (Complete Profile)
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'phone' => ['required', 'string', 'regex:/^(08|628)[0-9]{8,13}$/'],
            'gender' => [$user->gender ? 'nullable' : 'required', 'in:L,P'], 
        ], [
             'phone.regex' => 'Format nomor WhatsApp tidak valid. Gunakan awalan 08 atau 628.'
        ]);

        // 2. Normalisasi Nomor HP (PENTING: Agar seragam dengan update)
        $phone = preg_replace('/[^0-9]/', '', $validated['phone']);
        if (str_starts_with($phone, '0')) {
            $phone = '62' . substr($phone, 1);
        }

        $user->phone = $phone;
        
        // Hanya update gender jika sebelumnya kosong
        if (empty($user->gender)) {
            $user->gender = $validated['gender'];
        }
        
        $user->is_profile_complete = true;
        $user->save();

        return redirect()->route('dashboard')->with('success', 'Selamat datang! Profil Anda sudah lengkap.');
    }
}