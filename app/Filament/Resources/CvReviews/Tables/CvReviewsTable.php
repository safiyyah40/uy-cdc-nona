<?php

namespace App\Filament\Resources\CvReviews\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Forms\Components\Select;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Storage;
use Filament\Tables\Table;
use App\Models\Counselor;
use Filament\Actions\Action;
use Filament\Actions\BulkAction;

class CvReviewsTable
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
                
                TextColumn::make('target_position')
                    ->label('Posisi Target')
                    ->searchable()
                    ->limit(30),
                
                TextColumn::make('counselor.name')
                    ->label('Konselor')
                    ->searchable()
                    ->sortable()
                    ->default('-'),
                
                BadgeColumn::make('status')
                    ->label('Status')
                    ->colors([
                        'warning' => 'submitted',
                        'info' => 'assigned',
                        'primary' => 'in_review',
                        'success' => 'completed',
                        'danger' => 'revision_needed',
                        'danger' => 'cancelled',
                    ])
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'submitted' => 'Diajukan',
                        'assigned' => 'Ditugaskan',
                        'in_review' => 'Sedang Review',
                        'completed' => 'Selesai',
                        'revision_needed' => 'Butuh Revisi',
                        'cancelled' => 'Dibatalkan',
                        default => $state,
                    })
                    ->sortable(),
                
                BadgeColumn::make('priority')
                    ->label('Prioritas')
                    ->colors([
                        'secondary' => 'normal',
                        'warning' => 'high',
                        'danger' => 'urgent',
                    ])
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'normal' => 'Normal',
                        'high' => 'Tinggi',
                        'urgent' => 'Mendesak',
                        default => $state,
                    }),
                
                TextColumn::make('submitted_at')
                    ->label('Tanggal Submit')
                    ->date('d M Y')
                    ->sortable(),
                
                IconColumn::make('has_feedback')
                    ->label('Feedback')
                    ->boolean()
                    ->trueIcon('heroicon-o-check-circle')
                    ->falseIcon('heroicon-o-x-circle')
                    ->trueColor('success')
                    ->falseColor('gray')
                    ->getStateUsing(fn ($record) => !empty($record->feedback_text)),
            ])
            ->defaultSort('submitted_at', 'desc')
            ->filters([
                SelectFilter::make('status')
                    ->label('Status')
                    ->options([
                        'submitted' => 'Diajukan',
                        'assigned' => 'Ditugaskan',
                        'in_review' => 'Sedang Review',
                        'completed' => 'Selesai',
                        'revision_needed' => 'Butuh Revisi',
                        'cancelled' => 'Dibatalkan',
                    ])
                    ->multiple(),
                
                SelectFilter::make('counselor_id')
                    ->label('Konselor')
                    ->relationship('counselor', 'name')
                    ->searchable()
                    ->preload(),
                
                SelectFilter::make('priority')
                    ->label('Prioritas')
                    ->options([
                        'normal' => 'Normal',
                        'high' => 'Tinggi',
                        'urgent' => 'Mendesak',
                    ])
                    ->multiple(),
                
                TernaryFilter::make('has_feedback')
                    ->label('Punya Feedback')
                    ->queries(
                        true: fn ($query) => $query->whereNotNull('feedback_text'),
                        false: fn ($query) => $query->whereNull('feedback_text'),
                    ),
            ])
            ->actions([
                Action::make('download_cv')
                    ->label('Unduh CV')
                    ->icon('heroicon-o-arrow-down-tray')
                    ->color('info')
                    ->action(function ($record) {
                        return Storage::download($record->cv_file_path, $record->cv_file_original_name);
                    }),
                
                Action::make('assign')
                    ->label('Assign')
                    ->icon('heroicon-o-user-plus')
                    ->color('warning')
                    ->visible(fn ($record) => !$record->counselor_id && $record->status !== 'cancelled')
                    ->form([
                        Select::make('counselor_id')
                            ->label('Pilih Konselor')
                            ->options(Counselor::active()->pluck('name', 'id'))
                            ->required()
                            ->searchable(),
                    ])
                    ->action(function ($record, array $data) {
                        $record->markAsAssigned($data['counselor_id']);
                        
                        Notification::make()
                            ->success()
                            ->title('Berhasil Assign')
                            ->body("CV Review telah ditugaskan ke konselor.")
                            ->send();
                    }),
                
                ViewAction::make(),
                EditAction::make()
                    ->visible(fn ($record) => $record->status !== 'cancelled'), 
                DeleteAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                    
                    BulkAction::make('assign_bulk')
                        ->label('Assign ke Konselor')
                        ->icon('heroicon-o-user-plus')
                        ->color('warning')
                        ->form([
                            Select::make('counselor_id')
                                ->label('Pilih Konselor')
                                ->options(Counselor::active()->pluck('name', 'id'))
                                ->required()
                                ->searchable(),
                        ])
                        ->action(function ($records, array $data) {
                            $assignedCount = 0;

                            foreach ($records as $record) {
                                if (!$record->counselor_id && $record->status !== 'cancelled') {
                                    $record->markAsAssigned($data['counselor_id']);
                                    $assignedCount++;
                                }
                            }
                            
                            if ($assignedCount > 0) {
                                Notification::make()
                                    ->success()
                                    ->title('Berhasil')
                                    ->body("$assignedCount CV Review berhasil ditugaskan.")
                                    ->send();
                            } else {
                                Notification::make()
                                    ->warning()
                                    ->title('Tidak Ada Perubahan')
                                    ->body('Data terpilih sudah memiliki konselor atau berstatus dibatalkan.')
                                    ->send();
                            }
                        }),
                ]),
            ]);
    }
}