<?php

namespace App\Filament\Resources\AdminActivityLogs\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\DatePicker;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class AdminActivityLogsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('created_at')
                    ->label('Date & Time')
                    ->dateTime('d M Y, H:i:s')
                    ->sortable()
                    ->searchable(),

                TextColumn::make('causer.name')
                    ->label('User')
                    ->searchable()
                    ->default('System')
                    ->description(fn ($record) => $record->causer?->email ?? '-'),
                    
                TextColumn::make('causer.role')
                    ->label('Role')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'admin' => 'danger',
                        'mahasiswa' => 'info',
                        'konselor' => 'success',
                        default => 'gray',
                    }),

                BadgeColumn::make('event')
                    ->label('Action')
                    ->colors([
                        'success' => 'CREATE',
                        'warning' => 'UPDATE',
                        'danger' => 'DELETE',
                        'primary' => 'LOGIN',
                        'secondary' => 'LOGOUT',
                    ])
                    ->icons([
                        'heroicon-o-plus-circle' => 'CREATE',
                        'heroicon-o-pencil-square' => 'UPDATE',
                        'heroicon-o-trash' => 'DELETE',
                        'heroicon-o-arrow-right-on-rectangle' => 'LOGIN',
                        'heroicon-o-arrow-left-on-rectangle' => 'LOGOUT',
                    ]),

                TextColumn::make('description')
                    ->label('Description')
                    ->searchable()
                    ->limit(60)
                    ->wrap(),

                TextColumn::make('subject_type')
                    ->label('Module')
                    ->formatStateUsing(fn ($state) => $state ? class_basename($state) : '-')
                    ->badge()
                    ->color('gray'),

                TextColumn::make('ip_address')
                    ->label('IP Address')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('event')
                    ->label('Action Type')
                    ->options([
                        'LOGIN' => 'Login',
                        'LOGOUT' => 'Logout',
                        'CREATE' => 'Create',
                        'UPDATE' => 'Update',
                        'DELETE' => 'Delete',
                    ])
                    ->multiple(),

                SelectFilter::make('subject_type')
                    ->label('Module')
                    ->options([
                        'App\Models\Loker' => 'Job Opportunity',
                        'App\Models\Magang' => 'Internship',
                        'App\Models\Berita' => 'News',
                        'App\Models\BerandaSlide' => 'Homepage Slide',
                        'App\Models\CampusHiring' => 'Campus Hiring',
                        'App\Models\CounselingBooking' => 'Counseling Booking',
                        'App\Models\Counselor' => 'Counselor',
                        'App\Models\CvReview' => 'CV Review',
                        'App\Models\CvTemplate' => 'CV Template',
                        'App\Models\OrientasiDuniaKerja' => 'Career Orientation',
                        'App\Models\CalendarEvent' => 'Calendar Event',
                    ])
                    ->multiple(),

                Filter::make('created_at')
                    ->form([
                        DatePicker::make('created_from')
                            ->label('From'),
                        DatePicker::make('created_until')
                            ->label('Until'),
                    ])
                    ->query(function ($query, array $data) {
                        return $query
                            ->when($data['created_from'], fn ($q) => $q->whereDate('created_at', '>=', $data['created_from']))
                            ->when($data['created_until'], fn ($q) => $q->whereDate('created_at', '<=', $data['created_until']));
                    })
                    ->indicateUsing(function (array $data): array {
                        $indicators = [];
                        if ($data['created_from'] ?? null) {
                            $indicators[] = 'From: '.$data['created_from'];
                        }
                        if ($data['created_until'] ?? null) {
                            $indicators[] = 'Until: '.$data['created_until'];
                        }

                        return $indicators;
                    }),
            ])
            ->actions([
                ViewAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc')
            ->poll('30s'); // Auto refresh every 30 seconds

    }
}
