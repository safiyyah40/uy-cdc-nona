@extends('layouts.app')

@section('title', 'Profil Puskaka')

@section('content')
<div class="profil-puskaka-section">
    <!-- Header Section -->
    <div class="hero-section" style="background: linear-gradient(135deg, #e8f5e9 0%, #00695c 100%); padding: 60px 0;">
        <div class="container">
            <h1 class="text-center text-white mb-4">Struktur Organisasi Puskaka</h1>
        </div>
    </div>

    <!-- Team Members Section -->
    <div class="container py-5">
        <div class="row justify-content-center">
            @forelse($teamMembers as $member)
                <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                    <div class="team-card text-center p-4 h-100 shadow-sm" style="background: white; border-radius: 12px;">
                        <div class="photo-wrapper mb-3">
                            <img 
                                src="{{ $member->photo_url }}" 
                                alt="Foto {{ $member->name }}"
                                class="team-photo rounded"
                                style="width: 200px; height: 200px; object-fit: cover; background: #f5e6d3;"
                                onerror="this.src='{{ asset('images/default-avatar.png') }}'"
                            >
                        </div>
                        <h5 class="member-name mb-2" style="color: #00695c; font-weight: 600;">
                            {{ $member->name }}
                        </h5>
                        <p class="member-title text-muted" style="font-size: 14px; line-height: 1.5;">
                            {{ $member->title }}
                        </p>
                    </div>
                </div>
            @empty
                <div class="col-12 text-center">
                    <p class="text-muted">Belum ada data anggota tim.</p>
                </div>
            @endforelse
        </div>
    </div>
</div>

<style>
.team-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid #e0e0e0;
}

.team-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 105, 92, 0.15) !important;
}

.team-photo {
    border: 3px solid #00695c;
}
</style>
@endsection