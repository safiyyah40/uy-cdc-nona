<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
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
     * Update profil (Foto & No HP) dari halaman Edit Profil biasa
     */
    public function update(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'phone' => [
                'required',
                'string',
                'regex:/^(08|628)[0-9]{8,13}$/',
                'unique:users,phone,'.$user->id,
            ],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users')->ignore($user->id),
            ],
            'photo' => 'nullable|image|mimes:jpg,jpeg,png|max:5120',
        ], [
            'phone.regex' => 'Format nomor WhatsApp tidak valid. Gunakan awalan 08 atau 628.',
            'photo.max' => 'Ukuran foto maksimal 5MB.',
        ]);

        // Normalisasi Nomor HP
        $phone = preg_replace('/[^0-9]/', '', $request->phone);
        if (str_starts_with($phone, '0')) {
            $phone = '62'.substr($phone, 1);
        }
        $user->phone = $phone;
        $user->email = $validated['email'];

        // Proses Foto
        if ($request->hasFile('photo')) {
            if ($user->photo_url) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $user->photo_url));
            }
            $path = $request->file('photo')->store('profile_photos', 'public');
            $user->photo_url = '/storage/'.$path;
        }

        $user->save();

        return redirect()->route('profile.show')->with('success', 'Profil berhasil diperbarui!');
    }

    /**
     * Method Utama: Complete Profile (Untuk user yang baru pertama login)
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        // 1. Validasi Input
        $rules = [
            'phone' => ['required', 'string', 'regex:/^(08|628)[0-9]{8,13}$/'],
            'gender' => [$user->gender ? 'nullable' : 'required', 'in:L,P'],
        ];

        // Jika dia mahasiswa, tambahkan syarat fakultas & prodi (sesuai needsProfileCompletion)
        if ($user->role === 'mahasiswa') {
            $rules['faculty'] = 'required|string|max:255';
            $rules['study_program'] = 'required|string|max:255';
        }

        $validated = $request->validate($rules, [
            'phone.regex' => 'Format nomor WhatsApp tidak valid (08... atau 628...).',
            'faculty.required' => 'Fakultas wajib diisi.',
            'study_program.required' => 'Program studi wajib diisi.',
        ]);

        // 2. Normalisasi Nomor HP
        $phone = preg_replace('/[^0-9]/', '', $validated['phone']);
        if (str_starts_with($phone, '0')) {
            $phone = '62'.substr($phone, 1);
        }

        // 3. Update Data User
        $user->phone = $phone;

        if ($user->role === 'mahasiswa') {
            $user->faculty = $validated['faculty'];
            $user->study_program = $validated['study_program'];
        }

        if (empty($user->gender)) {
            $user->gender = $validated['gender'];
        }

        // 4. SET FLAG SELESAI DISINI
        $user->is_profile_complete = true;
        $user->save();

        return redirect()->route('dashboard')->with('success', 'Profil Anda telah dilengkapi!');
    }
}
