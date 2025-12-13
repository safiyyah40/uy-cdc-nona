<x-filament-panels::page>
    <div class="space-y-8">

        {{-- INFO MAHASISWA & SESI --}}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {{-- Mahasiswa --}}
            <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h3 class="text-sm font-semibold text-primary-600 mb-6">
                    Informasi Mahasiswa
                </h3>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                        <p class="text-gray-500"><br>Nama</p>
                        <p class="font-medium text-gray-900 dark:text-white">
                            {{ $record->student_name }}
                        </p>
                    </div>

                    <div>
                        <p class="text-gray-500"><br>NIM</p>
                        <p class="text-gray-900 dark:text-white">
                            {{ $record->student_npm }}
                        </p>
                    </div>
                </div>
            </div>

            {{-- Sesi --}}
            <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h3 class="text-sm font-semibold text-primary-600 mb-6">
                  <br>  Detail Sesi
                </h3>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                        <p class="text-gray-500"><br>Konselor</p>
                        <p class="font-medium text-gray-900 dark:text-white">
                            {{ $record->counselor_name }}
                        </p>
                    </div>

                    <div>
                        <p class="text-gray-500"><br>Topik</p>
                        <p class="text-gray-900 dark:text-white">
                            {{ $record->topic }}
                        </p>
                    </div>

                    <div class="sm:col-span-2">
                        <p class="text-gray-500"><br> Tanggal & Waktu</p>
                        <p class="text-gray-900 dark:text-white">
                            {{ \Carbon\Carbon::parse($record->scheduled_date)->locale('id')->isoFormat('dddd, D MMMM YYYY') }}
                            • {{ substr($record->scheduled_time, 0, 5) }} WIB
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {{-- FEEDBACK --}}
        <div class="bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 rounded-xl p-6">
            <h3 class="text-sm font-semibold text-primary-700 dark:text-primary-300 mb-4">
                <br> Feedback & Hasil Sesi
            </h3>

            <div class="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                {{ $record->report->feedback }}
            </div>
        </div>

        {{-- ACTION PLAN & REKOMENDASI --}}
        @if($record->report->action_plan || $record->report->recommendations)
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                @if($record->report->action_plan)
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                        <h3 class="text-sm font-semibold text-blue-600 mb-3">
                           <br> Rencana Tindak Lanjut
                        </h3>
                        <p class="text-sm text-gray-700 dark:text-gray-300">
                            {{ $record->report->action_plan }}
                        </p>
                    </div>
                @endif

                @if($record->report->recommendations)
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                        <h3 class="text-sm font-semibold text-amber-600 mb-3">
                          <br>  Rekomendasi
                        </h3>
                        <p class="text-sm text-gray-700 dark:text-gray-300">
                            {{ $record->report->recommendations }}
                        </p>
                    </div>
                @endif

            </div>
        @endif

        {{-- DETAIL TEKNIS --}}
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-5">
                <br> Detail Teknis
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-sm">

                @if($record->report->session_duration)
                    <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                        <p class="text-xl font-semibold text-primary-600">
                            {{ $record->report->session_duration }}
                        </p>
                        <p class="text-xs text-gray-500">Menit</p>
                    </div>
                @endif

                @if($record->report->session_type)
                    <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                        <p class="text-xs text-gray-500"><br> Tipe Sesi</p>
                        <p class="font-medium text-gray-900 dark:text-white">
                            {{ $record->report->session_type === 'online' ? 'Online' : 'Offline' }}
                        </p>
                    </div>
                @endif

                @if($record->report->session_location)
                    <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                        <p class="text-xs text-gray-500"><br> Lokasi</p>
                        <p class="font-medium text-gray-900 dark:text-white truncate"
                           title="{{ $record->report->session_location }}">
                            {{ $record->report->session_location }}
                        </p>
                    </div>
                @endif

            </div>
        </div>

        {{-- DOKUMENTASI --}}
        @php $files = $this->getDocumentationFiles(); @endphp
        @if(count($files))
            <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h3 class="text-sm font-semibold text-primary-600 mb-4">
                    <br>Dokumentasi & Lampiran ({{ count($files) }})
                </h3>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    @foreach($files as $file)
                        <a href="{{ $file['url'] }}" target="_blank"
                           class="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 transition text-sm truncate">
                            {{ $file['name'] }} <br>
                        </a>
                    @endforeach
                </div>
            </div>
        @endif

        {{-- BACK BUTTON --}}
        <div class="flex justify-end">
            <x-filament::button
                color="gray"
                tag="a"
                :href="route('filament.admin.resources.counseling-bookings.index')"
            >
                Kembali ke Daftar
            </x-filament::button>
        </div>

    </div>
</x-filament-panels::page>
