import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowRight, Newspaper } from 'lucide-react';

const MAIN_GREEN = "text-emerald-700";

// Komponen buat nampilin kartu berita satu per satu
const CardBerita = ({ item }) => {
    return (
        <Link
            href={route('berita.show', { id: item.id, slug: item.slug })}
            className="group relative bg-white rounded-[2rem] border border-gray-100 shadow-lg hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 overflow-hidden flex flex-col h-full hover:-translate-y-2"
        >
            {/* Bagian gambar: ada efek overlay gradient dan zoom pas di-hover */}
            <div className="relative h-56 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10 opacity-40 group-hover:opacity-20 transition-opacity duration-500"></div>
                <img
                    src={item.image_url || "https://placehold.co/600x400/f1f5f9/059669?text=Berita+YARSI"}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/e2e8f0/1e293b?text=No+Image"; }}
                />

                {/* Info tanggal di pojok kiri atas gambar */}
                <div className="absolute top-5 left-5 z-20">
                    <span className="backdrop-blur-xl bg-white/90 text-emerald-800 border border-white/40 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm">
                        {item.formatted_date}
                    </span>
                </div>
            </div>

            <div className="p-7 flex flex-col flex-grow relative">
                {/* Judul dan deskripsi singkat berita */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                    {item.description}
                </p>

                {/* Bagian bawah kartu: nampilin jumlah views dan link baca selengkapnya */}
                <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded-md font-bold uppercase tracking-tighter">
                        {item.views} Views
                    </span>
                    <div className="text-sm font-bold text-emerald-600 group-hover:text-emerald-800 transition-colors flex items-center gap-1">
                        Baca <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                </div>
            </div>
        </Link>
    );
};

// Section utama buat nampilin daftar berita terbaru (limit 4 item)
const BeritaSection = ({ latestNews = [] }) => {
    const displayNews = latestNews.slice(0, 4);

    return (
        <section className="relative py-20 bg-white overflow-hidden">
            {/* Dekorasi background berupa bulatan-bulatan blur (pemanis visual) */}
            <div className="absolute top-0 inset-x-0 h-full w-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-50 rounded-full blur-[100px] opacity-60 mix-blend-multiply"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-green-50 rounded-full blur-[100px] opacity-60 mix-blend-multiply"></div>
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-7xl">
                {/* Header section: Judul, sub-judul, dan tombol 'Lihat Semua' */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-3xl">
                        <span className="inline-block py-1.5 px-3 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-wider uppercase mb-4">
                            Update Kampus
                        </span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.15]">
                            Berita & <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-500">
                                Pengumuman Terbaru.
                            </span>
                        </h2>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-4">
                        <p className="text-gray-500 max-w-sm text-base leading-relaxed text-left md:text-right">
                            Informasi terkini seputar kegiatan akademik, prestasi, dan pengumuman penting lainnya.
                        </p>
                        <Link
                            href={route('program.berita')}
                            className="group inline-flex items-center font-bold text-emerald-600 hover:text-emerald-700 transition-all"
                        >
                            Lihat Semua Berita
                            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>

                {/* Looping data berita. Kalau kosong, nampilin pesan fallback */}
                {displayNews && displayNews.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {displayNews.map((item) => (
                            <CardBerita key={item.id} item={item} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
                        <p className="text-gray-400 font-medium">Belum ada berita terbaru saat ini.</p>
                    </div>
                )}

                {/* Tombol tambahan khusus buat tampilan mobile */}
                <div className="mt-10 text-center md:hidden">
                    <Link
                        href={route('program.berita')}
                        className="inline-flex items-center justify-center w-full px-6 py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all"
                    >
                        Lihat Semua Berita
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default BeritaSection;
