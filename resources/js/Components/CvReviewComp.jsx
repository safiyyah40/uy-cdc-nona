import React, { useState} from "react";
import { useScrollFadeIn } from '@/Hooks/useScrollFadeIn';
import { Link, usePage, router } from "@inertiajs/react";
import {
    Briefcase, Upload,
    Download, Palette,
    Sparkles, X,
    MousePointerClick, Eye, ArrowRight, LayoutGrid
} from "lucide-react";

// TEMPLATE CARD COMPONENT
const TemplateCard = ({ template, onKlik }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const placeholderImage = "https://placehold.co/400x600/e2e8f0/1e293b?text=No+Preview";

    return (
        <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-emerald-200 transform hover:-translate-y-2">
            {/* Label khusus kalau templatenya masuk kategori unggulan */}
            {template.is_unggulan && (
                <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-lg flex items-center gap-1.5 animate-pulse">
                    <Sparkles className="w-3 h-3" />
                    UNGGULAN
                </div>
            )}

            <div className="aspect-[3/4] overflow-hidden bg-gray-50 relative">
                {/* Loader kecil pas gambar lagi proses loading */}
                {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#004d40]"></div>
                    </div>
                )}

                {/* Gambar Utama dengan Fallback */}
                <img
                    src={imageError || !template.preview_url ? placeholderImage : template.preview_url}
                    alt={template.judul}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => {
                        setImageError(true);
                        setImageLoaded(true);
                    }}
                    className={`w-full h-full object-cover transition-transform duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'} group-hover:scale-110`}
                />

                <img
                    src={template.preview_url}
                    alt={template.judul}
                    onLoad={() => setImageLoaded(true)}
                    className={`w-full h-full object-cover transition-transform duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'} group-hover:scale-110`}
                />

                {/* Overlay yang muncul pas kartu di-hover (tombol pakai template) */}
                <div className="absolute inset-0 bg-[#004d40]/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-6 gap-4 backdrop-blur-[2px]">
                    <button
                        onClick={() => onKlik(template)}
                        className="px-6 py-3 bg-white text-[#004d40] font-bold rounded-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2 hover:bg-emerald-50 w-full justify-center shadow-xl"
                    >
                        {template.sumber === 'canva' ? <Palette className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                        {template.sumber === 'manual' ? 'Download File' : 'Gunakan Template'}
                    </button>

                    <div className="flex items-center gap-4 text-white text-xs font-medium translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                        <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-full backdrop-blur-md">
                            <Eye className="w-3.5 h-3.5" /> {template.jumlah_view || 0}
                        </span>
                        <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-full backdrop-blur-md">
                            <MousePointerClick className="w-3.5 h-3.5" /> {template.jumlah_klik || 0}
                        </span>
                    </div>
                </div>
            </div>

            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-gray-900 line-clamp-1 text-base group-hover:text-[#00CA65] transition-colors">
                        {template.judul}
                    </h4>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                    {template.deskripsi || 'Template profesional siap pakai & mudah diedit.'}
                </p>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-widest ${template.sumber === 'canva' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                        }`}>
                        {template.sumber === 'canva' ? 'Canva' : 'File'}
                    </span>
                    <div className="flex gap-1">
                        {template.tags?.slice(0, 1).map((tag, idx) => (
                            <span key={idx} className="text-[10px] text-emerald-600 font-bold uppercase">#{tag}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

/* --- HALAMAN UTAMA CV REVIEW ---
   Isinya filter pencarian, list template, dan tombol buat upload CV review.
*/
const CvReviewComp = () => {
    // Ambil props dari page
    const { auth, templates, pagination } = usePage().props;
    const user = auth?.user;
    const isCounselor = user?.role === 'konselor';
    const scrollFade = useScrollFadeIn(0.2);
    const safeTemplates = templates || [];

    // Cek apakah pagination ada isinya sebelum akses .links
    const safePagination = pagination || { links: [] };

    const handleTemplateKlik = (template) => {
        if (template.sumber === 'manual') {
            // Jika Manual -> Download File
            window.location.href = route('layanan.cv.template.download', { id: template.id });
        } else {
            // Jika Canva/Slides -> Buka Tab Baru
            if (template.url_template?.startsWith('http')) {
                window.open(template.url_template, '_blank');
            } else {
                // Fallback jika url aneh
                console.error("URL Template tidak valid");
            }
        }
    };

    return (
        <section
            id="layanan-cv-review"
            className={`relative overflow-hidden ${safeTemplates.length === 0 ? 'py-10' : 'py-14'
                }`}
        >
            <div className="absolute top-0 inset-x-0 h-full w-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-50 rounded-full blur-[100px] opacity-60 mix-blend-multiply"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-green-50 rounded-full blur-[100px] opacity-60 mix-blend-multiply"></div>
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-7xl">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6" ref={scrollFade.ref} style={scrollFade.style}>
                    <div className="max-w-3xl">
                        <span className="inline-block py-1.5 px-3 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-wider uppercase mb-4">
                            Layanan Persiapan Karir
                        </span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.15] font-serif">
                            Template & <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004d40] to-emerald-500">
                                Review CV.
                            </span>
                        </h2>
                    </div>
                    <p className="text-gray-500 max-w-sm text-base md:text-lg leading-relaxed text-left md:text-right font-medium">
                        Pilih template profesional yang telah dioptimasi sistem ATS atau kirimkan CV kamu untuk direview langsung oleh konselor karir kami.
                    </p>
                </div>

                {/* Barisan tombol utama (Upload dan Riwayat) */}
                <div className="flex flex-wrap gap-4 mb-12">
                    {!isCounselor && (
                        <button
                            onClick={() => router.visit(route('layanan.cv.review.upload'))}
                            // ^^^ Ini kuncinya. Saat diklik tamu, Laravel akan mendeteksi route ini butuh login,
                            // melempar ke login page, menyimpan 'intended url', dan mengembalikan user ke sini setelah login.
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#004d40] text-white font-bold rounded-xl hover:bg-[#00382e] shadow-lg hover:shadow-[#004d40]/30 transition-all transform hover:-translate-y-1 w-full sm:w-auto"
                        >
                            <Upload className="w-5 h-5" />
                            Upload CV Sekarang
                        </button>
                    )}
                    {/* TOMBOL RIWAYAT */}
                    <button
                        onClick={() => router.visit(route('layanan.tabel.cv.review'))}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#004d40] border-2 border-[#004d40] font-bold rounded-xl hover:bg-emerald-50 transition-all transform hover:-translate-y-1 w-full sm:w-auto"
                    >
                        <Briefcase className="w-5 h-5" />
                        {isCounselor ? "Dashboard Konselor" : "Riwayat Review"}
                        <ArrowRight className="w-5 h-5 ml-1" />
                    </button>
                </div>

                {/* Grid Template */}
                {!isCounselor && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                            {safeTemplates.slice(0, 4).map((tpl) => (
                                <TemplateCard key={tpl.id} template={tpl} onKlik={handleTemplateKlik} />
                            ))}
                        </div>

                        {/* TOMBOL LIHAT SEMUA */}
                        <div className="text-center relative z-20">
                            <Link
                                href={route('layanan.cv.review')}
                                className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-white border border-gray-200 text-gray-700 font-bold rounded-full hover:border-[#00CA65] hover:text-[#004d40] hover:shadow-xl transition-all duration-300"
                            >
                                <LayoutGrid className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span>Lihat Semua Template</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            {!user && (
                                <p className="mt-4 text-sm text-gray-500 animate-pulse">
                                    Login untuk akses penuh ke 50+ template premium lainnya!
                                </p>
                            )}
                        </div>
                    </>
                )}

                {/* Komponen pagination otomatis dari Laravel/Inertia */}
                {!isCounselor && safePagination.links.length > 3 && (
                    <div className="flex justify-center mt-16 gap-3">
                        {safePagination.links.map((link, i) => (
                            <button
                                key={i}
                                onClick={() => link.url && router.get(link.url)}
                                disabled={!link.url || link.active}
                                className={`min-w-[48px] h-[48px] flex items-center justify-center rounded-xl font-bold transition-all ${link.active
                                    ? 'bg-[#004d40] text-white shadow-lg shadow-[#004d40]/30'
                                    : 'bg-white border border-gray-200 text-gray-500 hover:border-emerald-500 hover:text-emerald-600'
                                    } ${!link.url ? 'opacity-30 cursor-not-allowed' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default CvReviewComp;
