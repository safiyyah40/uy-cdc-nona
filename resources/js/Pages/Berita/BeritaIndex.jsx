import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Footer from '@/Components/Footer';
import { Head, Link, router } from '@inertiajs/react';
import { Newspaper } from 'lucide-react';

const MAIN_GREEN = "text-emerald-700";
const LIGHTEST_GREEN_BG = "bg-emerald-50";

// --- KOMPONEN KARTU BERITA ---
const CardBerita = ({ item }) => {

    return (
        <Link
            href={route('berita.show', { id: item.id, slug: item.slug })}
            className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:border-emerald-200 hover:-translate-y-1"

        >

            <div className="relative w-full h-56 overflow-hidden bg-gray-200">
                {item.image_url ? (
                    <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                ) : (

                    <div className="flex items-center justify-center h-full text-gray-400 bg-gray-100">No Image</div>

                )}

                {/* Badge Tanggal */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-emerald-700 shadow-md">
                    {item.formatted_date}
                </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">

                {/* Judul */}
                <h3 className={`text-xl font-bold ${MAIN_GREEN} mb-3 line-clamp-2 group-hover:text-emerald-800 transition-colors`}>
                    {item.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow leading-relaxed">
                    {item.description}
                </p>

                {/* Baca Selengkapnya */}
                <div className="flex items-center text-emerald-600 font-semibold text-sm mt-auto group-hover:text-emerald-700 transition-colors">
                    Baca Selengkapnya <span className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span>
                </div>
            </div>

        </Link>
    );
};

// --- KOMPONEN UTAMA ---
export default function BeritaIndex({ berita, auth, filters }) {
   const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [perPage, setPerPage] = useState(filters?.per_page || 12);

    // Helper functions
    const handleSearch = (e) => {
        if (e.key === 'Enter') applyFilters(searchTerm, perPage);
    };
    const handlePerPageChange = (e) => {
        const newValue = e.target.value;
        setPerPage(newValue);
        applyFilters(searchTerm, newValue);

    };

    const applyFilters = (search, pageCount) => {
        router.get(
            route('program.berita'),
            { search: search, per_page: pageCount },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handlePageChange = (url) => {
        if (url) {
            router.get(url, { search: searchTerm, per_page: perPage }, { preserveState: true, preserveScroll: true });
        }
    };

    return (
        <MainLayout user={auth.user}>
            <Head title="Berita Terbaru" />


            {/* --- HERO SECTION --- */}
            <div
                className={`pt-24 pb-24 relative overflow-hidden bg-gradient-to-br from-white to-emerald-100 border-b border-emerald-300`}
            >
                {/* Judul dan Deskripsi */}
                <div className="container mx-auto px-6 lg:px-8 z-10 pt-16 md:pt-24">

                    {/* BADGE */}
                    <span className={`inline-flex items-center text-sm font-semibold mb-3 text-emerald-600 uppercase tracking-widest`}>
                        <Newspaper className="w-4 h-4 mr-2" />
                        Pengumuman dan Informasi Kampus
                    </span>

                    {/* JUDUL */}
                    <h1 className={`text-6xl md:text-8xl font-semibold font-serif italic text-gray-900 mb-6 tracking-tight leading-none drop-shadow-sm`}>
                        Berita
                    </h1>

                    {/* DESKRIPSI */}
                    <p className="text-xl md:text-2xl leading-relaxed text-gray-700 font-sans max-w-5xl font-light">
                        Ikuti perkembangan terbaru dan informasi terkini mengenai kegiatan, alumni berprestasi, dan peluang karir eksklusif dari Pusat Karir Puskaka UY.
                    </p>
                </div>
            </div>

            {/* --- CONTENT AREA --- */}
            <div className={`py-16 md:py-24 bg-white min-h-screen`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">


                    {/* TOOLBAR */}
                    {auth.user ? (
                        <div className="bg-emerald-50 p-5 rounded-xl shadow-inner border border-emerald-100 mb-10 flex flex-col md:flex-row justify-between items-center gap-4">

                            {/* Kiri: Filter Jumlah */}
                            <div className="flex items-center gap-3">

                                <label htmlFor="perPage" className="text-sm font-medium text-gray-700 whitespace-nowrap">
                                    Tampilkan:
                                </label>

                                <div className="relative">

                                    <select
                                        id="perPage"
                                        value={perPage}
                                        onChange={handlePerPageChange}
                                        className="appearance-none bg-white border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 pr-8 cursor-pointer hover:bg-emerald-100/50 transition-colors"
                                    >
                                        <option value="4">4 Berita</option>
                                        <option value="6">6 Berita</option>
                                        <option value="12">12 Berita</option>
                                        <option value="24">24 Berita</option>
                                        <option value="1000">Semua Berita</option>
                                    </select>

                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-emerald-700">

                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>

                                    </div>

                                </div>

                            </div>


                            {/* Kanan: Search Bar */}
                            <div className="relative w-full md:w-96 group">

                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-4 py-3 border border-emerald-200 rounded-xl bg-white text-gray-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm group-hover:border-emerald-400"
                                    placeholder="Cari berita..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={handleSearch}
                                />

                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">

                                    <svg className="w-5 h-5 text-emerald-400 group-focus-within:text-emerald-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>

                                </div>

                            </div>

                        </div>

                    ) : (

                        // JIKA TAMU: Hanya Judul
                        <div className="mb-14 max-w-2xl">
                            <h2 className={`text-3xl font-bold text-gray-900 border-b-2 border-emerald-200 pb-2`}>Berita Terbaru</h2>
                                <p className="text-gray-600 mt-2">Menampilkan {berita?.data?.length || 4} berita terkini (untuk akses penuh, silakan masuk).</p>
                        </div>

                    )}


                    {/* GRID BERITA */}
                    {berita && berita.data && berita.data.length > 0 ? (

                        <>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                                {berita.data.map((item) => (

                                    <CardBerita key={item.id} item={item} />

                                ))}

                            </div>

                            {/* LOGIKA FOOTER/PAGINATION */}
                            <div className="mt-16 flex flex-col items-center">

                                {auth.user ? (

                                    // JIKA LOGIN: Tampilkan Pagination Lengkap
                                    <div className="flex flex-wrap justify-center gap-2 bg-emerald-50 p-2 rounded-xl shadow-md border border-emerald-100">

                                        {berita.links && berita.links.length > 3 && berita.links.map((link, key) => {

                                            let label = link.label;

                                            if (label.includes('&laquo;')) label = '←';

                                            if (label.includes('&raquo;')) label = '→';

                                            return (

                                                <button
                                                    key={key}
                                                    onClick={() => handlePageChange(link.url)}
                                                    disabled={!link.url || link.active}
                                                    className={`
                                                        min-w-[40px] h-10 px-3 rounded-lg text-sm font-semibold transition-all flex items-center justify-center
                                                        ${link.active
                                                            ? 'bg-emerald-600 text-white shadow-lg transform scale-105'
                                                            : 'text-gray-700 hover:bg-emerald-100 hover:text-emerald-700'
                                                        }
                                                        ${!link.url ? 'opacity-40 cursor-not-allowed hover:bg-transparent' : ''}
                                                    `}
                                                    dangerouslySetInnerHTML={{ __html: label }}
                                                />

                                            );

                                        })}

                                    </div>

                                ) : (

                                    // JIKA TAMU: Tampilkan Ajakan Login (Call to Action)
                                    <div className="text-center bg-emerald-50 p-8 rounded-2xl shadow-xl border border-emerald-100 max-w-2xl">

                                        <h3 className="text-xl font-bold text-gray-800 mb-2">Ingin melihat lebih banyak berita?</h3>

                                        <p className="text-gray-600 mb-6">Silakan masuk menggunakan akun Anda untuk mengakses arsip berita lengkap, melakukan pencarian, dan fitur lainnya.</p>

                                        <Link
                                            href={route('login')}
                                            className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-bold rounded-full hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-emerald-500/30"
                                        >
                                            Masuk Sekarang
                                        </Link>

                                    </div>

                                )}

                            </div>

                        </>

                    ) : (

                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">

                            <p className="text-gray-500 text-lg">Tidak ada berita ditemukan.</p>

                            {auth.user && searchTerm && (

                                <button
                                    onClick={() => { setSearchTerm(''); applyFilters('', 12); }}
                                    className="mt-4 text-emerald-600 hover:underline font-medium"
                                >
                                    Reset Pencarian
                                </button>

                            )}

                        </div>

                    )}

                </div>

            </div>

            <Footer />

        </MainLayout>

    );

}
