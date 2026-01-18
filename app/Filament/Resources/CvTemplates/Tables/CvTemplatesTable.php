<?php

namespace App\Filament\Resources\CvTemplates\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Actions\DeleteAction;
use Filament\Tables\Filters\SelectFilter;
use App\Models\CvTemplate;
use Filament\Actions\Action;
use Filament\Actions\BulkAction;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class CvTemplatesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('url_preview')
                    ->label('Preview')
                    ->circular()
                    ->defaultImageUrl(asset('images/template-placeholder.jpg')),

                TextColumn::make('judul_template')
                    ->label('Judul')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),

                BadgeColumn::make('kategori')
                    ->label('Kategori')
                    ->colors([
                        'primary' => 'minimalis',
                        'success' => 'profesional',
                        'warning' => 'kreatif',
                        'info' => 'ats-friendly',
                    ]),

                BadgeColumn::make('sumber')
                    ->label('Sumber')
                    ->colors([
                        'success' => 'canva',
                        'info' => 'slides_go',
                        'secondary' => 'manual',
                    ]),

                IconColumn::make('is_unggulan')
                    ->label('Unggulan')
                    ->boolean()
                    ->trueIcon('heroicon-o-star')
                    ->falseIcon('heroicon-o-star')
                    ->trueColor('warning')
                    ->falseColor('gray'),

                IconColumn::make('is_aktif')
                    ->label('Aktif')
                    ->boolean()
                    ->trueIcon('heroicon-o-check-circle')
                    ->falseIcon('heroicon-o-x-circle')
                    ->trueColor('success')
                    ->falseColor('danger'),

                TextColumn::make('jumlah_view')
                    ->label('Views')
                    ->badge()
                    ->color('info')
                    ->sortable(),

                TextColumn::make('jumlah_klik')
                    ->label('Klik')
                    ->badge()
                    ->color('success')
                    ->sortable(),

                TextColumn::make('jumlah_download')
                    ->label('Download')
                    ->badge()
                    ->color('warning')
                    ->sortable(),

                TextColumn::make('created_at')
                    ->label('Dibuat')
                    ->dateTime('d M Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('urutan', 'asc')
            ->filters([
                SelectFilter::make('kategori')
                    ->label('Kategori')
                    ->options([
                        'minimalis' => 'Minimalis',
                        'kreatif' => 'Kreatif',
                        'profesional' => 'Profesional',
                        'ats-friendly' => 'ATS-Friendly',
                        'modern' => 'Modern',
                        'klasik' => 'Klasik',
                    ]),

                SelectFilter::make('sumber')
                    ->label('Sumber')
                    ->options([
                        'canva' => 'Canva',
                        'google_slides' => 'Google Slides',
                        'manual' => 'Upload Manual',
                    ]),

                TernaryFilter::make('is_aktif')
                    ->label('Status')
                    ->placeholder('Semua Template')
                    ->trueLabel('Aktif Saja')
                    ->falseLabel('Non-Aktif Saja'),

                TernaryFilter::make('is_unggulan')
                    ->label('Unggulan')
                    ->placeholder('Semua')
                    ->trueLabel('Unggulan Saja')
                    ->falseLabel('Non-Unggulan'),
            ])
            ->actions([
                ViewAction::make(),
                EditAction::make(),
                DeleteAction::make(),
                
                Action::make('lihat_template')
                    ->label('Buka Template')
                    ->icon('heroicon-o-arrow-top-right-on-square')
                    ->url(fn (CvTemplate $record) => $record->url_template)
                    ->openUrlInNewTab()
                    ->color('success'),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                    
                    BulkAction::make('aktifkan')
                        ->label('Aktifkan')
                        ->icon('heroicon-o-check-circle')
                        ->action(fn ($records) => $records->each->update(['is_aktif' => true]))
                        ->deselectRecordsAfterCompletion()
                        ->requiresConfirmation(),
                    
                    BulkAction::make('nonaktifkan')
                        ->label('Nonaktifkan')
                        ->icon('heroicon-o-x-circle')
                        ->action(fn ($records) => $records->each->update(['is_aktif' => false]))
                        ->deselectRecordsAfterCompletion()
                        ->requiresConfirmation()
                        ->color('danger'),
                ]),
            ]);
    }
}
