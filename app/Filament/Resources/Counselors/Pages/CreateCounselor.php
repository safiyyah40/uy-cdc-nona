<?php

namespace App\Filament\Resources\Counselors\Pages;

use App\Filament\Resources\Counselors\CounselorResource;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Database\Eloquent\Model;
use App\Models\Counselor;
use App\Models\User;

class CreateCounselor extends CreateRecord
{
    protected static string $resource = CounselorResource::class;

    /**
     * Cari User-nya lalu UPDATE data.
     */
    protected function handleRecordCreation(array $data): Model
    {
        $userId = $data['user_search_id'];

        $counselor = Counselor::create([
            'user_id' => $userId,
            'name' => $data['name'],
            'email' => $data['email'],
            'title' => $data['title'],
            'phone' => $data['phone'] ?? null,
            'bio' => $data['bio'] ?? null,
            'photo_path' => $data['photo_path'] ?? null,
            'is_active' => $data['is_active'] ?? true,
        ]);

        User::query()->where('id', $userId)->limit(1)->update(['role' => 'konselor']);
        return $counselor;
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
