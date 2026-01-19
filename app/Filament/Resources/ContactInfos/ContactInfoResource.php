<?php

namespace App\Filament\Resources\ContactInfos;

use App\Filament\Resources\ContactInfos\Pages\ManageContactInfos;
use App\Filament\Resources\ContactInfos\Pages\EditContactInfo;
use App\Models\ContactInfo;
use BackedEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\TextInput;
use Filament\Infolists\Components\TextEntry;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Components\Section;

class ContactInfoResource extends Resource
{
    protected static ?string $model = ContactInfo::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'email';

    protected static ?int $navigationSort = 1;

    public static function getModelLabel(): string
    {
        return 'Kontak';
    }

    public static function getPluralModelLabel(): string
    {
        return 'Kontak';
    }

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Kontak Puskaka')
                    ->description('Kelola informasi kontak yang tampil di website')
                    ->schema([
                        TextInput::make('email')
                            ->label('Email')
                            ->email()
                            ->required()
                            ->prefixIcon('heroicon-o-envelope')
                            ->placeholder('bidang1@yarsi.ac.id'),
                        
                        TextInput::make('instagram_username')
                            ->label('Username Instagram')
                            ->required()
                            ->prefixIcon('heroicon-o-camera')
                            ->placeholder('kariralumni.yarsi')
                            ->helperText('Tanpa @ di depan'),
                        
                        TextInput::make('whatsapp_number')
                            ->label('Nomor WhatsApp')
                            ->tel()
                            ->required()
                            ->prefixIcon('heroicon-o-device-phone-mobile')
                            ->placeholder('6281234567890')
                            ->helperText('Format: 62xxx (dengan kode negara, tanpa +)'),
                        
                        TextInput::make('phone_number')
                            ->label('Nomor Telepon Kantor')
                            ->tel()
                            ->prefixIcon('heroicon-o-phone')
                            ->placeholder('021-4244574'),
                    ])->columns(2),
                
                Section::make('Alamat')
                    ->schema([
                        Textarea::make('address_university')
                            ->label('Alamat Universitas YARSI')
                            ->required()
                            ->rows(3)
                            ->placeholder('Menara YARSI, Jl. Let. Jend. Suprapto Kav. 13...'),
                        
                        Textarea::make('address_cdc')
                            ->label('Alamat CDC')
                            ->required()
                            ->rows(3)
                            ->placeholder('Pusat Kemahasiswaan Karir dan Alumni, Universitas Yarsi...'),
                    ])->columns(1),
            ]);
    }

    public static function infolist(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('email'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('email')
            ->columns([
                TextColumn::make('email')
                    ->label('Email')
                    ->icon('heroicon-o-envelope')
                    ->searchable(),
                TextColumn::make('whatsapp_number')
                    ->label('WhatsApp')
                    ->icon('heroicon-o-device-phone-mobile'),
                TextColumn::make('updated_at')
                    ->label('Terakhir Diperbarui')
                    ->dateTime('d M Y, H:i')
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->paginated(false);
    }

    public static function getPages(): array
    {
        return [
            'index' => ManageContactInfos::route('/'),
            'edit' => EditContactInfo::route('/{record}/edit'),
        ];
    }
}
