<?php

namespace App\Filament\Resources\CounselingBookings\Tables;

use Filament\Tables\Filters\TrashedFilter;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Textarea;
use Illuminate\Database\Eloquent\Builder;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Storage;
use Filament\Tables\Table;
use Filament\Forms;
use Filament\Actions\Action;
use Filament\Actions\BulkAction;

class CounselingBookingsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')
                    ->label('ID')
                    ->sortable()
                    ->searchable(),
                
                TextColumn::make('student_name')
                    ->label('Mahasiswa')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->description(fn ($record) => $record->student_npm),
                
                TextColumn::make('counselor_name')
                    ->label('Konselor')
                    ->searchable()
                    ->sortable(),
                
                TextColumn::make('topic')
                    ->label('Topik')
                    ->searchable()
                    ->limit(30)
                    ->tooltip(function (TextColumn $column): ?string {
                        $state = $column->getState();
                        if (strlen($state) <= 30) {
                            return null;
                        }
                        return $state;
                    }),
                
                TextColumn::make('scheduled_date')
                    ->label('Tanggal')
                    ->date('d M Y')
                    ->sortable(),
                
                TextColumn::make('scheduled_time')
                    ->label('Waktu')
                    ->time('H:i')
                    ->sortable(),
                
                BadgeColumn::make('status')
                    ->label('Status')
                    ->colors([
                        'warning' => 'pending',
                        'success' => 'accepted',
                        'danger' => 'rejected',
                        'primary' => 'completed',
                        'secondary' => 'cancelled',
                    ])
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'pending' => 'Menunggu',
                        'accepted' => 'Disetujui',
                        'rejected' => 'Ditolak',
                        'completed' => 'Selesai',
                        'cancelled' => 'Dibatalkan',
                        default => $state,
                    })
                    ->sortable(),
                
                IconColumn::make('has_report')
                    ->label('Laporan')
                    ->boolean()
                    ->trueIcon('heroicon-o-document-check')
                    ->falseIcon('heroicon-o-document')
                    ->trueColor('success')
                    ->falseColor('gray')
                    ->getStateUsing(fn ($record) => $record->report()->exists())
                    ->tooltip(fn ($record) => $record->report 
                        ? 'Laporan tersedia' 
                        : 'Belum ada laporan'
                    ),
                
                TextColumn::make('created_at')
                    ->label('Dibuat')
                    ->dateTime('d M Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                SelectFilter::make('status')
                    ->label('Status')
                    ->options([
                        'pending' => 'Menunggu',
                        'accepted' => 'Disetujui',
                        'rejected' => 'Ditolak',
                        'completed' => 'Selesai',
                        'cancelled' => 'Dibatalkan',
                    ])
                    ->multiple(),
                
                SelectFilter::make('counselor_id')
                    ->label('Konselor')
                    ->relationship('counselor', 'name')
                    ->searchable()
                    ->preload(),
                
                Filter::make('scheduled_date')
                    ->form([
                        DatePicker::make('date_from')
                            ->label('Dari Tanggal'),
                        DatePicker::make('date_until')
                            ->label('Sampai Tanggal'),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when(
                                $data['date_from'],
                                fn (Builder $query, $date): Builder => $query->whereDate('scheduled_date', '>=', $date),
                            )
                            ->when(
                                $data['date_until'],
                                fn (Builder $query, $date): Builder => $query->whereDate('scheduled_date', '<=', $date),
                            );
                    }),
                
                TernaryFilter::make('has_report')
                    ->label('Punya Laporan')
                    ->queries(
                        true: fn (Builder $query) => $query->has('report'),
                        false: fn (Builder $query) => $query->doesntHave('report'),
                    ),
            ])
            ->actions([
                ViewAction::make()
                    ->label('Detail'),
                    
                EditAction::make(),
                
                Action::make('view_report')
                    ->label('Lihat Laporan')
                    ->icon('heroicon-o-document-text')
                    ->color('info')
                    ->visible(fn ($record) => $record->report()->exists())
                    ->url(fn ($record) => route('filament.admin.resources.counseling-bookings.report', $record))
                    ->openUrlInNewTab(),
                
                Action::make('approve')
                    ->label('Setujui')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->requiresConfirmation()
                    ->visible(fn ($record) => $record->status === 'pending')
                    ->action(function ($record) {
                        $record->update([
                            'status' => 'accepted',
                            'accepted_at' => now(),
                        ]);
                        
                        Notification::make()
                            ->success()
                            ->title('Booking Disetujui')
                            ->body("Sesi {$record->student_name} berhasil disetujui.")
                            ->send();
                    }),
                
                Action::make('reject')
                    ->label('Tolak')
                    ->icon('heroicon-o-x-circle')
                    ->color('danger')
                    ->requiresConfirmation()
                    ->form([
                        Textarea::make('rejection_reason')
                            ->label('Alasan Penolakan')
                            ->required()
                            ->rows(3),
                    ])
                    ->visible(fn ($record) => $record->status === 'pending')
                    ->action(function ($record, array $data) {
                        $record->update([
                            'status' => 'rejected',
                            'rejected_at' => now(),
                            'rejection_reason' => $data['rejection_reason'],
                        ]);
                        
                        if ($record->slot) {
                            $record->slot->update(['is_available' => true]);
                        }
                        
                        Notification::make()
                            ->warning()
                            ->title('Booking Ditolak')
                            ->body("Sesi {$record->student_name} telah ditolak.")
                            ->send();
                    }),
                
                Action::make('complete')
                    ->label('Tandai Selesai')
                    ->icon('heroicon-o-check-badge')
                    ->color('primary')
                    ->requiresConfirmation()
                    ->visible(fn ($record) => $record->status === 'accepted')
                    ->action(function ($record) {
                        $record->update([
                            'status' => 'completed',
                            'completed_at' => now(),
                        ]);
                        
                        Notification::make()
                            ->success()
                            ->title('Sesi Selesai')
                            ->body("Sesi {$record->student_name} ditandai selesai.")
                            ->send();
                    }),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                    
                    BulkAction::make('approve_bulk')
                        ->label('Setujui Terpilih')
                        ->icon('heroicon-o-check-circle')
                        ->color('success')
                        ->requiresConfirmation()
                        ->action(function ($records) {
                            $records->each(function ($record) {
                                if ($record->status === 'pending') {
                                    $record->update([
                                        'status' => 'accepted',
                                        'accepted_at' => now(),
                                    ]);
                                }
                            });
                            
                            Notification::make()
                                ->success()
                                ->title('Berhasil')
                                ->body('Sesi terpilih telah disetujui.')
                                ->send();
                        }),
                ]),
            ])
            ->emptyStateHeading('Belum ada sesi konsultasi')
            ->emptyStateDescription('Sesi konsultasi akan muncul di sini setelah mahasiswa melakukan booking.')
            ->emptyStateIcon('heroicon-o-calendar-days');
    }
}