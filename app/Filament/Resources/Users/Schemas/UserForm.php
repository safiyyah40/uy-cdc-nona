<?php

namespace App\Filament\Resources\Users\Schemas;

use Filament\Actions\Action;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\HtmlString;
use Illuminate\Validation\Rules\Password;

class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Autentikasi')
                    ->description('Data utama untuk login ke sistem.')
                    ->columns(2)
                    ->schema([
                        TextInput::make('name')
                            ->label('Nama Lengkap')
                            ->required()
                            ->maxLength(255)
                            ->disabled(fn ($operation) => $operation === 'edit'),

                        TextInput::make('username')
                            ->label('Username')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(255)
                            ->disabled(fn ($operation) => $operation === 'edit'),

                        TextInput::make('email')
                            ->label('Email')
                            ->email()
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->validationMessages([
                                'unique' => 'Email ini sudah terdaftar di sistem.',
                                'email' => 'Gunakan format email yang valid (contoh@yarsi.ac.id).',
                            ])
                            ->disabled(fn ($operation) => $operation === 'edit'),

                        TextInput::make('password')
                            ->label('Kata Sandi Akun Lokal')
                            ->password()
                            ->revealable()
                            ->required(fn ($operation) => $operation === 'create')
                            ->visible(fn ($operation) => $operation === 'create')
                            ->dehydrated(fn ($state) => filled($state))
                            ->mutateDehydratedStateUsing(fn ($state) => Hash::make($state))
                            ->rule(Password::min(8)
                                ->letters()
                                ->mixedCase()
                                ->numbers()
                                ->symbols()
                                ->uncompromised()
                            )
                            ->helperText('Minimal 8 karakter: Kombinasi Huruf Besar, Kecil, Angka, dan Simbol.'),
                    ]),

                Section::make('Detail Profil & Hak Akses')
                    ->columns(2)
                    ->schema([
                        Select::make('role')
                            ->label('Role Pengguna')
                            ->options([
                                'konselor' => 'Konselor',
                                'admin' => 'Admin',
                            ])
                            ->required()
                            ->native(false)
                            ->selectablePlaceholder(false)
                            ->disabled(function ($record) {
                                if (! $record) {
                                    return false;
                                }
                                return $record->username === 'admin.puskaka' || $record->role === 'mahasiswa';
                            })
                            ->helperText('Hanya Admin & Konselor yang dapat dibuat secara manual. Dosen/Staf dan Mahasiswa dikelola via LDAP.'),

                        TextInput::make('id_number')
                            ->label('NPM / NIP')
                            ->required(fn ($get) => ! in_array($get('role'), ['admin', 'konselor']))
                            ->regex('/^[0-9]+$/')
                            ->maxLength(20)
                            ->validationMessages([
                                'regex' => 'Kolom ini wajib diisi angka saja (tanpa spasi atau karakter lain).',
                            ])
                            ->disabled(fn ($operation) => $operation === 'edit')
                            ->helperText(fn ($get) => in_array($get('role'), ['admin', 'konselor'])
                                ? 'Boleh dikosongkan untuk Admin/Konselor.'
                                : 'Wajib diisi untuk Mahasiswa/Dosen.'
                            ),

                        TextInput::make('phone')
                            ->label('Nomor WhatsApp')
                            ->tel()
                            ->required()
                            ->prefixIcon('heroicon-o-device-phone-mobile')
                            ->placeholder('6281234567890')
                            ->regex('/^62[0-9]{8,15}$/')
                            ->validationMessages([
                                'regex' => 'Format salah! Harus dimulai dengan 62 dan hanya angka (minimal 10 digit).',
                            ])
                            ->disabled(fn ($operation) => $operation === 'edit')
                            ->afterStateUpdated(fn ($state, $set) => $set('whatsapp_number', preg_replace('/[^0-9]/', '', $state)))
                            ->helperText(new HtmlString('Penting: Gunakan kode negara tanpa tanda +. Contoh: <strong>62</strong>812...'))
                            ->suffixAction(
                                Action::make('test_link')
                                    ->icon('heroicon-m-chat-bubble-left-right')
                                    ->tooltip('Buka WhatsApp')
                                    ->url(fn ($state) => $state ? "https://wa.me/{$state}" : null)
                                    ->openUrlInNewTab()
                            ),

                        Toggle::make('is_profile_complete')
                            ->label('Status Profil Lengkap')
                            ->onColor('success')
                            ->offColor('danger')
                            ->default(false),
                    ]),
            ]);
    }
}
