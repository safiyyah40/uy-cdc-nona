<?php

namespace App\Filament\Resources\Users\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Notifications\Notification;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class UsersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Nama')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),

                TextColumn::make('username')
                    ->label('Username')
                    ->searchable()
                    ->copyable()
                    ->fontFamily('mono'),

                TextColumn::make('id_number')
                    ->label('NPM/NIP')
                    ->searchable()
                    ->toggleable()
                    ->placeholder('-')
                    ->copyable(),

                TextColumn::make('role')
                    ->label('Role')
                    ->badge()
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'mahasiswa' => 'Mahasiswa',
                        'konselor' => 'Konselor',
                        'dosen_staf' => 'Dosen/Staf',
                        'admin' => 'Admin',
                        default => $state,
                    })
                    ->color(fn (string $state): string => match ($state) {
                        'admin' => 'success',
                        'konselor' => 'warning',
                        'dosen_staf' => 'info',
                        'mahasiswa' => 'gray',
                        default => 'gray',
                    })
                    ->description(fn ($record): ?string => match (true) {
                        $record->username === 'admin.puskaka' => 'Admin Utama',
                        $record->isLdapUser() => 'Sinkronisasi LDAP',
                        default => 'Akun Lokal'
                    }),

                TextColumn::make('faculty')
                    ->label('Fakultas')
                    ->searchable()
                    ->placeholder('-')
                    ->toggleable(),

                IconColumn::make('is_profile_complete')
                    ->label('Profil')
                    ->boolean()
                    ->alignCenter()
                    ->tooltip(fn ($record): string => $record->is_profile_complete
                            ? 'Profil lengkap'
                            : 'Profil belum lengkap'
                    ),

                TextColumn::make('created_at')
                    ->label('Terdaftar')
                    ->dateTime('d M Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('role')
                    ->label('Filter Role')
                    ->options([
                        'mahasiswa' => 'Mahasiswa',
                        'konselor' => 'Konselor',
                        'dosen_staf' => 'Dosen/Staf',
                        'admin' => 'Admin',
                    ])
                    ->native(false),

                SelectFilter::make('is_profile_complete')
                    ->label('Status Profil')
                    ->options([
                        '1' => 'Profil Lengkap',
                        '0' => 'Profil Belum Lengkap',
                    ])
                    ->native(false),
            ])
            ->actions([
                // (Tampil untuk semua user)
                ViewAction::make()
                    ->modalHeading(fn ($record) => 'Detail Pengguna: '.$record->name),

                // (Hidden jika LDAP User)
                EditAction::make()
                    ->hidden(fn ($record) => $record->isLdapUser())
                    ->tooltip(fn ($record) => $record->isLdapUser() ? 'Data LDAP tidak dapat diubah lokal' : 'Edit User'),

                DeleteAction::make()
                    ->requiresConfirmation()
                    ->modalHeading(fn ($record) => 'Hapus Akun: '.$record->name)
                    ->modalDescription(fn ($record) => self::getDeleteModalDescription($record))
                    ->modalSubmitActionLabel('Ya, Hapus Permanen')
                    ->successNotificationTitle('Akun berhasil dihapus')
                    ->hidden(fn ($record) => ! $record->canDelete())
                    ->before(function ($record) {
                        // Log aktivitas
                        activity()
                            ->causedBy(Auth::user())
                            ->performedOn($record)
                            ->withProperties([
                                'username' => $record->username,
                                'role' => $record->role,
                                'email' => $record->email,
                            ])
                            ->log('Menghapus akun lokal');
                    }),
            ])

            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make()
                        ->requiresConfirmation()
                        ->modalHeading('Hapus Akun Terpilih')
                        ->modalDescription('Anda akan menghapus beberapa akun sekaligus. Akun yang TIDAK akan dihapus: Super Admin (admin.puskaka), Mahasiswa, dan Dosen/Staf (data LDAP). Hanya akun lokal (Admin & Konselor) yang akan dihapus secara PERMANEN.')
                        ->modalSubmitActionLabel('Ya, Hapus yang Memenuhi Syarat')
                        ->successNotificationTitle('Akun yang memenuhi syarat berhasil dihapus')
                        ->action(function (Collection $records) {
                            $deleted = 0;
                            $skipped = 0;

                            foreach ($records as $user) {
                                if ($user->canDelete()) {
                                    // Log sebelum hapus
                                    activity()
                                        ->causedBy(Auth::user())
                                        ->performedOn($user)
                                        ->withProperties([
                                            'username' => $user->username,
                                            'role' => $user->role,
                                        ])
                                        ->log('Bulk delete akun lokal');

                                    $user->delete();
                                    $deleted++;
                                } else {
                                    $skipped++;
                                }
                            }

                            // Notifikasi hasil
                            if ($skipped > 0) {
                                Notification::make()
                                    ->warning()
                                    ->title('Penghapusan Sebagian')
                                    ->body("Berhasil menghapus {$deleted} akun. {$skipped} akun dilewati (Super Admin/LDAP).")
                                    ->send();
                            }
                        }),
                ]),
            ]);
    }

    /**
     * Generate deskripsi modal delete berdasarkan tipe user
     */
    private static function getDeleteModalDescription($record): string
    {
        if ($record->username === 'admin.puskaka') {
            return 'Akun Admin ini tidak dapat dihapus karena ini adalah akun utama sistem.';
        }

        if ($record->isLdapUser()) {
            return 'Akun ini disinkronkan dari server LDAP dan tidak dapat dihapus.\n\n'.
                   'Data akan otomatis diperbarui saat sinkronisasi berikutnya.\n'.
                   'Untuk menonaktifkan akses, kelola dari server LDAP.';
        }

        // Untuk akun lokal
        $accountType = match ($record->role) {
            'admin' => 'Admin',
            'konselor' => 'Konselor',
            'mahasiswa' => 'Mahasiswa (Dummy/Testing)',
            'dosen_staf' => 'Dosen/Staf (Dummy/Testing)',
            default => ucfirst($record->role)
        };

        return "PERINGATAN: Anda akan menghapus akun lokal ini secara PERMANEN.\n\n".
               "Detail Akun:\n".
               "• Tipe: {$accountType}\n".
               "• Username: {$record->username}\n".
               "• Email: {$record->email}\n".
               ($record->id_number ? "• ID Number: {$record->id_number}\n" : '').
               "\n\nTindakan ini TIDAK DAPAT dibatalkan!\n".
               'Semua data terkait akun ini akan ikut terhapus.';
    }
}
