<?php

namespace App\Filament\Resources\Users\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Collection;

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
                    ->toggleable(),

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
                    }),

                TextColumn::make('faculty')
                    ->label('Fakultas')
                    ->searchable()
                    ->placeholder('-')
                    ->toggleable(),

                IconColumn::make('is_profile_complete')
                    ->label('Profil')
                    ->boolean()
                    ->alignCenter(),

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
            ])
            ->actions([
                EditAction::make(),
                DeleteAction::make()
                    ->hidden(fn ($record) => $record->username === 'admin.puskaka'),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make()
                        ->action(function (Collection $records) {
                            $records->filter(fn ($user) => $user->username !== 'admin.puskaka')
                                ->each->delete();
                        }),
                ]),
            ]);
    }
}
