import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import { useScrollFadeIn } from '@/Hooks/useScrollFadeIn';

// ICON COMPONENTS
const Icons = {
    Academic: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
    ),
    CheckBadge: () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
    ),
    Building: () => (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
    ),
    Sparkles: () => (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
    ),
    Calendar: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
    ),
    ArrowRight: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
    ),
    Users: () => (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
    )
};

// KOMPONEN KARTU KONSELOR
function CounselorCard({ name, title, faculty, expertise, photoUrl }) {
    const { ref, style } = useScrollFadeIn(0.1);
    const [imageError, setImageError] = useState(false);

    return (
        <div
            ref={ref}
            style={style}
            className="group bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-100 hover:border-yarsi-accent/30 
                       overflow-hidden transition-all duration-500 hover:-translate-y-2 w-full flex flex-col h-full"
        >
            {/* Header dengan Foto Profil */}
            <div className="relative">
                {/* Background Pattern */}
                <div className="h-48 bg-gradient-to-br from-yarsi-green via-yarsi-green-light to-yarsi-green-dark relative overflow-hidden">
                    {/* Decorative Circles */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full"></div>
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/3 rounded-full blur-3xl"></div>

                    {/* Verified Badge */}
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 
                                    flex items-center gap-1.5 shadow-lg border border-yarsi-green/20 z-10">
                        <div className="text-yarsi-green">
                            <Icons.CheckBadge />
                        </div>
                        <span className="text-xs font-bold text-yarsi-green-dark">Terverifikasi</span>
                    </div>
                </div>

                {/* Foto Profil */}
                <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 z-10">
                    <div className="relative">
                        {/* Shadow Layer untuk depth */}
                        <div className="absolute inset-0 bg-yarsi-green/20 rounded-3xl blur-2xl scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Frame Foto */}
                        <div className="relative w-40 h-40 rounded-3xl bg-gradient-to-br from-white to-gray-50 p-2 
                                        shadow-2xl ring-4 ring-white group-hover:ring-yarsi-accent/30 
                                        transition-all duration-300 group-hover:scale-105">
                            <div className="w-full h-full rounded-2xl overflow-hidden relative
                                            group-hover:shadow-inner transition-all duration-300">
                                {/* Background Gradient Layer */}
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 z-0"></div>

                                {/* Image Container */}
                                <div className="absolute inset-0 z-10">
                                    <img
                                        src={!imageError && photoUrl ? photoUrl : '/images/placeholder-avatar.png'}
                                        alt={name}
                                        className="w-full h-full object-cover object-center mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out"
                                        onError={() => setImageError(true)}
                                        loading="lazy"
                                    />
                                </div>

                                {/* Overlay gradient saat hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-yarsi-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>
                            </div>
                        </div>

                        {/* Status Online */}
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yarsi-accent rounded-full border-4 border-white shadow-lg group-hover:scale-110 transition-transform flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                        </div>

                        {/* Decorative Corner Elements */}
                        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-yarsi-accent/40 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-yarsi-accent/40 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="pt-24 pb-6 px-6 flex-grow flex flex-col">
                {/* Nama & Gelar */}
                <div className="text-center mb-4">
                    <h3 className="text-xl font-bold font-kaisei text-gray-900 mb-2 
                                 group-hover:text-yarsi-green transition-colors leading-tight min-h-[3.5rem] 
                                 flex items-center justify-center">
                        {name}
                    </h3>

                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-50 to-white 
                                  rounded-xl mb-3 border border-gray-200 shadow-sm group-hover:border-yarsi-green/30 
                                  transition-all duration-300 min-h-[2.5rem]">
                        <div className="text-yarsi-green flex-shrink-0">
                            <Icons.Academic />
                        </div>
                        <span className="text-sm font-semibold text-yarsi-green-light">{title}</span>
                    </div>
                </div>

                {/* Divider dengan animasi */}
                <div className="relative h-1 mb-5 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yarsi-accent to-transparent 
                                  scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
                </div>

                {/* Info Tambahan */}
                <div className="space-y-3 text-sm flex-grow mb-6">
                    {faculty && (
                        <div className="flex items-start gap-3 text-gray-600 group-hover:text-gray-700 
                                      transition-colors p-2 rounded-lg hover:bg-gray-50 min-h-[2.5rem]">
                            <div className="mt-0.5 text-yarsi-green flex-shrink-0">
                                <Icons.Building />
                            </div>
                            <span className="leading-relaxed font-medium">{faculty}</span>
                        </div>
                    )}

                    {expertise && (
                        <div className="flex items-start gap-3 text-gray-600 group-hover:text-gray-700 
                                      transition-colors p-2 rounded-lg hover:bg-gray-50 min-h-[2.5rem]">
                            <div className="mt-0.5 text-yarsi-green flex-shrink-0">
                                <Icons.Sparkles />
                            </div>
                            <span className="leading-relaxed font-medium">{expertise}</span>
                        </div>
                    )}
                </div>

                {/* Action Button */}
                <div className="mt-auto pt-6 border-t border-gray-100">
                    <Link
                        href="/layanan/konsultasi"
                        className="flex items-center justify-center gap-2 w-full bg-yarsi-gradient-button hover:brightness-110 active:scale-98 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl group/btn relative overflow-hidden"
                    >
                        {/* effect hover */}
                        <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full 
                                      bg-gradient-to-r from-transparent via-white/20 to-transparent 
                                      transition-transform duration-1000 ease-in-out"></div>

                        <Icons.Calendar className="relative z-10" />
                        <span className="relative z-10">Lihat Jadwal</span>
                        <div className="group-hover/btn:translate-x-1 transition-transform relative z-10">
                            <Icons.ArrowRight />
                        </div>
                    </Link>
                </div>
            </div>

            {/* Footer Branding */}
            <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 py-3 border-t border-gray-100">
                <div className="text-center text-xs font-bold text-yarsi-green tracking-widest uppercase 
                              flex items-center justify-center gap-2">
                    <div className="w-1 h-1 bg-yarsi-accent rounded-full"></div>
                    UNIVERSITAS YARSI
                    <div className="w-1 h-1 bg-yarsi-accent rounded-full"></div>
                </div>
            </div>
        </div>
    );
}

// HALAMAN UTAMA
export default function ProfilKonselor({ counselors }) {
    const heroTitle = useScrollFadeIn(0.2);
    const heroText = useScrollFadeIn(0.3);
    const heroImage = useScrollFadeIn(0.4);

    // State untuk search dan filter
    const [searchTerm, setSearchTerm] = useState('');
    const [perPage, setPerPage] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);

    // Filter dan pagination
    const filteredCounselors = counselors?.filter(counselor => {
        const searchLower = searchTerm.toLowerCase();
        return (
            counselor.name.toLowerCase().includes(searchLower) ||
            counselor.title?.toLowerCase().includes(searchLower) ||
            counselor.faculty?.toLowerCase().includes(searchLower) ||
            counselor.expertise?.toLowerCase().includes(searchLower)
        );
    }) || [];

    // Pagination logic
    const startIndex = perPage === 'all' ? 0 : (currentPage - 1) * perPage;

    // Reset ke halaman 1 ketika search atau filter berubah
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, perPage]);

    return (
        <MainLayout>
            <Head title="Profil Konselor - CDC Universitas YARSI" />
            {/* HERO SECTION */}
            <section className="relative w-full py-14 md:py-20 bg-gradient-to-br from-white to-emerald-50 overflow-hidden">
                {/* Dekorasi Latar Belakang */}
                <div className="absolute inset-0 opacity-[0.05]"
                    style={{ backgroundImage: 'radial-gradient(circle, #044732 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
                </div>
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-yarsi-accent/10 rounded-full blur-3xl pointer-events-none mix-blend-multiply animate-blob"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w--80 h-80 bg-yarsi-green/10 rounded-full blur-3xl pointer-events-none mix-blend-multiply animate-blob animation-delay-2000"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                        <div className="lg:w-1/2 text-center lg:text-left">
                            {/* Badge */}
                            <div
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-yarsi-green/20 shadow-sm text-yarsi-green text-xs font-bold uppercase tracking-wider mb-6"
                                ref={heroTitle.ref}
                                style={heroTitle.style}
                            >
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yarsi-accent opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yarsi-accent"></span>
                                </span>
                                Career Development Center
                            </div>

                            {/* Main Heading */}
                            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 font-kaisei mb-6 leading-tight">
                                Tim Konselor <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yarsi-green to-yarsi-accent">
                                    Profesional
                                </span>
                            </h1>

                            {/* Description */}
                            <p
                                ref={heroText.ref}
                                style={heroText.style}
                                className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light mb-8"
                            >
                                Kami memiliki konselor terbaik yang tidak hanya berkompeten, tetapi juga peduli pada perkembangan mahasiswa YARSI. Dengan pendekatan personal, kami siap mendampingi langkah akademik maupun karir Anda.
                            </p>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 gap-4 border-t border-gray-200 pt-8 max-w-md mx-auto lg:mx-0">
                                <div>
                                    <div className="text-3xl font-bold font-kaisei text-yarsi-green">{counselors?.length || 0}+</div>
                                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-1">Konselor</div>
                                </div>
                                <div className="border-l border-gray-200 pl-4">
                                    <div className="text-3xl font-bold font-kaisei text-yarsi-green">100%</div>
                                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-1">Terverifikasi</div>
                                </div>
                                <div className="border-l border-gray-200 pl-4">
                                    <div className="text-xl font-bold font-kaisei text-yarsi-green mt-1">1-on-1</div>
                                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-2">Bimbingan</div>
                                </div>
                            </div>
                        </div>

                        {/* VISUAL CARD */}
                        <div className="lg:w-1/2 relative w-full" ref={heroImage.ref} style={heroImage.style}>
                            {/* Card Background */}
                            <div
                                className="aspect-[4/3] relative rounded-[2rem] overflow-hidden shadow-2xl flex items-center justify-center border-[6px] border-white ring-1 ring-gray-100 transform rotate-1 hover:rotate-0 transition-transform duration-500 bg-cover bg-center"
                                style={{
                                    backgroundImage: "url('/images/pict-profil-konselor.png')",
                                }}
                            >
                                {/* Overlay gradient untuk memastikan teks tetap terbaca jika ada teks di atasnya nanti, atau agar gambar tidak terlalu terang */}
                                <div className="absolute inset-0 bg-gradient-to-t from-yarsi-green/60 to-transparent mix-blend-multiply"></div>

                                {/* Badge Status di Pojok Kiri Bawah */}
                                <div className="absolute bottom-8 left-8 flex items-center gap-3 p-3 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-white">
                                    <div className="bg-green-100 p-1.5 rounded-full text-yarsi-green">
                                        <Icons.CheckBadge />
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Status</div>
                                        <div className="text-xs font-bold text-gray-900">Professional</div>
                                    </div>
                                </div>
                            </div>

                            {/* Elemen Dekoratif di belakang Card */}
                            <div className="absolute -z-10 top-10 -right-10 w-full h-full border-2 border-yarsi-green/20 rounded-[2rem] transform rotate-6"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* LIST KONSELOR SECTION */}
            <section className="py-20 lg:py-28 bg-white relative">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-50/0 via-yarsi-green/5 to-gray-50/0"></div>

                <div className="container mx-auto px-4 lg:px-6 relative z-10">

                    {/* Section Header */}
                    <div className="text-center mb-12 max-w-6xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-kaisei text-gray-900 mb-3">
                            Berkenalan dengan Konselor Kami!
                        </h2>
                        <div className="w-48 h-1.5 bg-gradient-to-r from-yarsi-green to-yarsi-accent mx-auto rounded-full mb-6"></div>
                    </div>

                    {/* SEARCH + FILTER BAR */}
                    {counselors && counselors.length > 0 ? (
                        <div className="max-w-9xl mx-auto mb-12">
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">

                                {/* STATE */}
                                {(() => {
                                    // FE state
                                    const [searchTerm, setSearchTerm] = React.useState("");
                                    const [perPage, setPerPage] = React.useState("all");
                                    const [page, setPage] = React.useState(1);

                                    // Filter by search
                                    const filtered = counselors.filter((c) => {
                                        const text = (
                                            c.name +
                                            c.faculty +
                                            c.expertise +
                                            c.title
                                        ).toLowerCase();

                                        return text.includes(searchTerm.toLowerCase());
                                    });

                                    // Pagination
                                    const totalItems = filtered.length;
                                    const perPageNumber = perPage === "all" ? totalItems : Number(perPage);
                                    const totalPages = perPage === "all" ? 1 : Math.ceil(totalItems / perPageNumber);

                                    const paginated = filtered.slice(
                                        (page - 1) * perPageNumber,
                                        page * perPageNumber
                                    );

                                    const goToPage = (num) => setPage(num);
                                    return (
                                        <>
                                            {/* GRID SEARCH + FILTER */}
                                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

                                                {/* Search */}
                                                <div className="md:col-span-8">
                                                    <form
                                                        onSubmit={(e) => e.preventDefault()}
                                                        className="flex gap-2"
                                                    >
                                                        <div className="relative flex-1">
                                                            <input
                                                                type="text"
                                                                value={searchTerm}
                                                                onChange={(e) => {
                                                                    setPage(1);
                                                                    setSearchTerm(e.target.value);
                                                                }}
                                                                placeholder="Cari nama, fakultas, atau keahlian..."
                                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                            />
                                                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"
                                                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                            </svg>
                                                        </div>

                                                        <button
                                                            type="submit"
                                                            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                            </svg>
                                                            Cari
                                                        </button>
                                                    </form>
                                                </div>

                                                {/* Filter per page */}
                                                <div className="md:col-span-4">
                                                    <div className="flex items-center gap-2">
                                                        <select
                                                            value={perPage}
                                                            onChange={(e) => {
                                                                setPerPage(e.target.value);
                                                                setPage(1);
                                                            }}
                                                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                        >
                                                            <option value="6">Tampilkan 6</option>
                                                            <option value="12">Tampilkan 12</option>
                                                            <option value="24">Tampilkan 24</option>
                                                            <option value="all">Tampilkan Semua</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* ACTIVE FILTER BADGE */}
                                            {searchTerm !== "" && (
                                                <div className="mt-4 flex items-center gap-2">
                                                    <span className="text-sm text-gray-600">
                                                        Hasil pencarian untuk:
                                                    </span>
                                                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                                                        "{searchTerm}"
                                                    </span>

                                                    <button
                                                        onClick={() => {
                                                            setSearchTerm("");
                                                            setPage(1);
                                                        }}
                                                        className="text-sm text-gray-500 hover:text-gray-700 underline"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            )}

                                            {/* CARD LIST */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-6">
                                                {paginated.map((counselor) => (
                                                    <CounselorCard
                                                        key={counselor.id}
                                                        name={counselor.name}
                                                        title={counselor.title}
                                                        faculty={counselor.faculty}
                                                        expertise={counselor.expertise}
                                                        photoUrl={counselor.photo_url}
                                                    />
                                                ))}
                                            </div>

                                            {/* PAGINATION */}
                                            {totalPages > 1 && (
                                                <div className="flex items-center justify-center gap-2 mt-8">
                                                    {[...Array(totalPages)].map((_, i) => (
                                                        <button
                                                            key={i}
                                                            onClick={() => goToPage(i + 1)}
                                                            className={`px-4 py-2 rounded-lg border transition ${page === i + 1
                                                                ? "bg-emerald-600 text-white border-emerald-700"
                                                                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                                                                }`}
                                                        >
                                                            {i + 1}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    );
                                })()}
                            </div>
                        </div>
                    ) : (
                        /* EMPTY STATE */
                        <div className="max-w-md mx-auto">
                            <div className="bg-gray-50 rounded-3xl p-12 text-center border-2 border-dashed border-gray-200">
                                <div className="text-gray-400 mb-6 mx-auto w-fit">
                                    <Icons.Users />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Belum Ada Data Konselor</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Data konselor sedang diperbarui oleh admin. Silakan cek kembali nanti.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <section className="py-24 bg-gradient-to-br from-[#006241] to-[#004d33] relative overflow-hidden">
                {/* Ornamen Lingkaran Abstrak */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full border-[20px] border-white/5 blur-sm"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full border-[30px] border-white/5 blur-sm"></div>

                {/* Noise Texture Overlay (Opsional untuk tekstur) */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                <div className="container mx-auto px-4 lg:px-6 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl sm:text-5xl font-bold font-kaisei text-white mb-6 leading-tight">
                            Siap Konsultasi dengan Ahli?
                        </h2>
                        <p className="text-emerald-100 text-lg mb-10 font-light leading-relaxed">
                            Booking sesi konsultasi Anda sekarang dan dapatkan bimbingan profesional.
                        </p>
                        <Link
                            href="/layanan/konsultasi"
                            className="inline-flex items-center gap-3 bg-white text-yarsi-green font-bold py-4 px-8 rounded-xl hover:bg-emerald-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 group"
                        >
                            <Icons.Calendar />
                            <span>Lihat Jadwal Konsultasi</span>
                            <div className="group-hover:translate-x-1 transition-transform">
                                <Icons.ArrowRight />
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
            <Footer />
        </MainLayout>
    );
}