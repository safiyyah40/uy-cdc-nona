<?php

namespace App\Filament\Resources\Users\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Nama Lengkap')
                    ->required()
                    ->maxLength(255)
                    ->disabled(),

                TextInput::make('username')
                    ->label('Username')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->disabled()
                    ->maxLength(255),

                TextInput::make('email')
                    ->label('Email')
                    ->email()
                    ->required()
                    ->disabled()
                    ->unique(ignoreRecord: true),

                Select::make('role')
                    ->label('Role')
                    ->options([
                        'mahasiswa' => 'Mahasiswa',
                        'konselor' => 'Konselor',
                        'dosen_staf' => 'Dosen/Staf',
                        'admin' => 'Admin',
                    ])
                    ->required()
                    ->native(false)
                    ->helperText('Jika diubah ke "Konselor", data akan otomatis muncul di daftar Tim Konselor.'),

                TextInput::make('id_number')
                    ->label('NPM/NIP')
                    ->disabled()
                    ->maxLength(255),

                TextInput::make('phone')
                    ->label('No. WhatsApp')
                    ->tel()
                    ->disabled()
                    ->maxLength(255),

                TextInput::make('faculty')
                    ->label('Fakultas')
                    ->maxLength(255)
                    ->placeholder('Contoh: Teknologi Informasi')
                    ->disabled()
                    ->hidden(fn ($get) => in_array($get('role'), ['dosen_staf', 'admin', 'konselor'])),

                TextInput::make('study_program')
                    ->label('Program Studi')
                    ->maxLength(255)
                    ->placeholder('Contoh: Teknik Informatika')
                    ->disabled()
                    ->hidden(fn ($get) => in_array($get('role'), ['dosen_staf', 'admin', 'konselor'])),

                Toggle::make('is_profile_complete')
                    ->label('Profil Lengkap')
                    ->default(false),
            ]);
    }
}
