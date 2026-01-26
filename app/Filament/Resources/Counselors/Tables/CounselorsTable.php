<?php

namespace App\Filament\Resources\Counselors\Tables;

use App\Models\Counselor;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Notification;

class CounselorsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('order_column')
                    ->label('Urut')
                    ->sortable()
                    ->width(50),

                ImageColumn::make('photo_path')
                    ->label('Foto')
                    ->disk('public')
                    ->circular()
                    ->defaultImageUrl(url('/images/default-avatar.png'))
                    ->size(40),

                TextColumn::make('name')
                    ->label('Nama & Email')
                    ->description(fn ($record) => $record->email)
                    ->searchable(['name', 'email'])
                    ->sortable()
                    ->weight('bold'),

                TextColumn::make('account_type')
                    ->label('Basis Akun')
                    ->badge()
                    ->state(fn (Counselor $record) => $record->isLdapUser() ? 'LDAP' : 'Lokal')
                    ->color(fn (string $state): string => match ($state) {
                        'LDAP' => 'info',
                        'Lokal' => 'warning',
                        default => 'gray',
                    }),

                TextColumn::make('title')
                    ->label('Jabatan')
                    ->searchable()
                    ->limit(30),

                TextColumn::make('slots_count')
                    ->label('Slot')
                    ->counts('slots')
                    ->badge()
                    ->color(fn ($state) => $state > 0 ? 'success' : 'danger'),

                ToggleColumn::make('is_active')
                    ->label('Aktif'),
            ])
            ->actions([
                ViewAction::make(),
                EditAction::make(),

                DeleteAction::make()
                    ->label('Cabut Akses')
                    // Hanya muncul jika user ini adalah 'LDAP'
                    // Jika dia user Lokal, tombol ini HILANG.
                    ->visible(fn (Counselor $record) => $record->isLdapUser())
                    ->requiresConfirmation()
                    ->modalHeading('Cabut Akses Konselor?')
                    ->modalDescription(fn ($record) => "User '{$record->name}' berasal dari Dosen/Staf. Menghapus profil ini akan mencabut akses Konselor dan mengembalikan status user menjadi 'dosen_staf'.")
                    ->modalSubmitActionLabel('Ya, Kembalikan ke Dosen')

                    // LOGIKA SETELAH DIHAPUS:
                    ->after(function (Counselor $record) {
                        // Ambil relasi user
                        $user = $record->user;

                        // Cek jika user ada, ubah rolenya kembali menjadi dosen_staf
                        if ($user) {
                            $user->update([
                                'role' => 'dosen_staf',
                            ]);

                            Notification::make()
                                ->title('Status Dikembalikan')
                                ->body("Akses konselor dicabut. {$user->name} sekarang kembali menjadi Dosen/Staf.")
                                ->success()
                                ->send();
                        }
                    }),
            ])
            ->bulkActions([
                BulkActionGroup::make([]),
            ])
            ->defaultSort('order_column', 'asc')
            ->reorderable('order_column');
    }
}
