<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

    public function update(Request $request)
    {
        // Validasi nomor telepon + foto
        $request->validate([
            'phone' => [
                'required',
                'string',
                'regex:/^(08[0-9]{8,12}|628[0-9]{8,12})$/',
                'unique:users,phone,' . Auth::id(),
            ],
            'photo' => 'nullable|image|mimes:jpg,jpeg,png|max:5120',
        ], [
            'phone.regex' => 'Format nomor WhatsApp tidak valid. Gunakan format 08xxx atau 628xxx',
            'phone.unique' => 'Nomor WhatsApp ini sudah terdaftar.',
            'photo.image' => 'File harus berupa gambar.',
            'photo.mimes' => 'Format foto harus JPG, JPEG, atau PNG.',
            'photo.max' => 'Ukuran foto maksimal 2MB.',
        ]);

        // Ambil user
        $user = Auth::user();

        // Proses nomor telepon
        $phone = preg_replace('/[^0-9]/', '', $request->phone);

        if (substr($phone, 0, 1) === '0') {
            $phone = '62' . substr($phone, 1);
        }

        $user->phone = $phone;

        // Proses foto profil jika ada
        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('profile_photos', 'public');

            // Menyimpan ke database
            $user->photo_url = '/storage/' . $path;
        }

        // Menyimpan user
        $user->save();

        $user->refresh();

        return redirect()
            ->route('profile.show')
            ->with('success', 'Profil berhasil diperbarui!');
    }
}
