import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import Footer from '@/Components/Footer';
import {
    Calendar, MapPin, Clock, ArrowLeft, Share2, Building2, Award,
    CheckCircle, Copy, CornerDownRight, Wallet, BookOpen, Users,
    Download, FileText, TrendingUp, AlertCircle, Globe
} from 'lucide-react';

export default function DetailSertifikasi({ auth, sertifikasi }) {
    const [copied, setCopied] = useState(false);

    // HELPERS 
    const handleShare = (platform) => {
        const url = window.location.href;
        const text = `Lihat program sertifikasi: ${sertifikasi.title}`;

        switch (platform) {
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
                break;
            case 'whatsapp':
                window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}%20${encodeURIComponent(url)}`, '_blank');
                break;
            case 'copy':
                navigator.clipboard.writeText(url).then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                });
                break;
            default: break;
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    // LOGIC STATUS
    const isRegistrationOpen = sertifikasi.is_registration_open && (sertifikasi.status === 'Published');
    const isFull = sertifikasi.quota && (sertifikasi.enrolled_count >= sertifikasi.quota);

    // Hitung deadline
    const deadlineDate = sertifikasi.registration_deadline ? new Date(sertifikasi.registration_deadline) : null;
    const today = new Date();
    const isDeadlinePassed = deadlineDate && deadlineDate < today;
    const diffDays = deadlineDate ? Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24)) : null;
    const isUrgent = diffDays !== null && diffDays <= 7 && diffDays > 0;

    // Pastikan array (jika dari tags input filament)
    const categories = Array.isArray(sertifikasi.categories) ? sertifikasi.categories : [];
    const tags = Array.isArray(sertifikasi.tags) ? sertifikasi.tags : [];

    return (
        <MainLayout user={auth?.user}>
            <Head title={`${sertifikasi.title} - Sertifikasi YARSI`} />

            {/* --- HERO SECTION --- */}
            <div className="pt-24 pb-12 relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-50 border-b border-emerald-100/50">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-yarsi-green/5 rounded-full blur-3xl" />

                <div className="container mx-auto px-6 max-w-[90rem] relative z-10">
                    {/* Breadcrumb */}
                    <div className="mb-8 pt-4">
                        <Link href={route('sertifikasi.index')} className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-600 transition-all font-medium text-sm group">
                            <div className="p-1 rounded-full bg-white border border-gray-200 group-hover:border-emerald-600 transition-colors">
                                <ArrowLeft className="w-4 h-4" />
                            </div>
                            <span className="uppercase tracking-wider text-xs">Kembali ke Daftar Sertifikasi</span>
                        </Link>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm">
                            <Award className="w-3.5 h-3.5 mr-2" />{sertifikasi.type}
                        </span>
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase bg-blue-50 text-blue-700 border border-blue-200 shadow-sm">
                            {sertifikasi.mode}
                        </span>
                        {isUrgent && (
                            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase bg-amber-500 text-white animate-pulse shadow-sm">
                                <Clock className="w-3.5 h-3.5 mr-2" />Segera Ditutup!
                            </span>
                        )}
                        {isDeadlinePassed && (
                            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase bg-red-600 text-white shadow-sm">
                                <AlertCircle className="w-3.5 h-3.5 mr-2" />Pendaftaran Tutup
                            </span>
                        )}
                    </div>

                    {/* Judul & Provider */}
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 leading-tight mb-3">
                        {sertifikasi.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-6 mb-8">
                        <div className="flex items-center gap-4">

                            {/* LOGO SECTION */}
                            {sertifikasi.logo ? (
                                <img
                                    src={sertifikasi.logo.startsWith('http') ? sertifikasi.logo : `/storage/${sertifikasi.logo}`}
                                    alt={sertifikasi.provider_name}
                                    className="w-20 h-20 object-contain bg-white p-2 rounded-xl shadow-sm border border-gray-100"
                                />
                            ) : (
                                // ICON FALLBACK
                                <div className="w-20 h-20 flex items-center justify-center bg-emerald-100 rounded-xl shadow-sm border border-emerald-200">
                                    <Building2 className="w-10 h-10 text-emerald-600" />
                                </div>
                            )}

                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Penyedia</p>
                                <p className="text-xl font-bold text-gray-900">{sertifikasi.provider_name}</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm">
                        {/* Durasi */}
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><Clock className="w-6 h-6" /></div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Durasi</p>
                                <p className="font-bold text-gray-800">{sertifikasi.duration}</p>
                                {sertifikasi.is_self_paced && <span className="text-xs text-emerald-600 font-bold">Self-Paced Learning</span>}
                            </div>
                        </div>

                        {/* Level */}
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><TrendingUp className="w-6 h-6" /></div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Level</p>
                                <p className="font-bold text-gray-800">{sertifikasi.level}</p>
                            </div>
                        </div>

                        {/* Biaya */}
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-green-50 text-green-600 rounded-xl"><Wallet className="w-6 h-6" /></div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Biaya Investasi</p>
                                <p className="font-bold text-gray-800 text-lg">
                                    {sertifikasi.is_free ? 'GRATIS' : formatCurrency(sertifikasi.fee)}
                                </p>
                            </div>
                        </div>

                        {/* Jadwal / Kuota */}
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl"><Calendar className="w-6 h-6" /></div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Jadwal Pelaksanaan</p>
                                {sertifikasi.is_self_paced ? (
                                    <p className="font-bold text-gray-800">Kapan Saja (Fleksibel)</p>
                                ) : (
                                    <p className="font-bold text-gray-800 text-sm">
                                        {formatDate(sertifikasi.start_date)} - {formatDate(sertifikasi.end_date)}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Categories & Tags */}
                    <div className="flex flex-wrap gap-2 mt-6">
                        {categories.map((cat, idx) => (
                            <span key={idx} className="px-3 py-1 bg-white/80 text-emerald-600 text-xs font-bold rounded-full border border-emerald-600/20 shadow-sm">
                                {cat}
                            </span>
                        ))}
                        {tags.map((tag, idx) => (
                            <span key={`tag-${idx}`} className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded-full border border-gray-200">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- CONTENT SECTION --- */}
            <div className="bg-white py-12 md:py-16">
                <div className="container mx-auto px-6 max-w-[90rem] grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* LEFT COLUMN (Content) */}
                    <div className="lg:col-span-8 space-y-10">

                        {/* Deskripsi Singkat */}
                        {sertifikasi.description && (
                            <div className="p-8 bg-gradient-to-r from-emerald-50 to-white rounded-3xl border border-emerald-100/50 shadow-sm relative">
                                <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-600 rounded-l-3xl" />
                                <h3 className="font-kaisei font-bold text-2xl text-yarsi-green-dark mb-4">Tentang Program</h3>
                                <p className="text-lg text-gray-700 leading-relaxed font-sans">{sertifikasi.description}</p>
                            </div>
                        )}

                        {/* Konten Detail (Rich Editor) */}
                        {sertifikasi.content && (
                            <div>
                                <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                                    <div className="p-2 bg-blue-100 rounded-lg text-blue-700"><FileText className="w-6 h-6" /></div>
                                    <h3 className="font-kaisei font-bold text-2xl text-gray-900">Detail Lengkap</h3>
                                </div>
                                <div className="content-body prose prose-lg max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: sertifikasi.content }} />
                            </div>
                        )}

                        {/* Silabus */}
                        {sertifikasi.syllabus && (
                            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                    <div className="p-2 bg-purple-100 text-purple-700 rounded-lg"><BookOpen className="w-6 h-6" /></div>
                                    <h3 className="font-kaisei font-bold text-2xl text-gray-900">Silabus & Materi</h3>
                                </div>
                                <div className="content-body prose prose-emerald max-w-none" dangerouslySetInnerHTML={{ __html: sertifikasi.syllabus }} />
                            </div>
                        )}

                        {/* Requirements */}
                        {sertifikasi.requirements && (
                            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                    <div className="p-2 bg-orange-100 text-orange-700 rounded-lg"><CheckCircle className="w-6 h-6" /></div>
                                    <h3 className="font-kaisei font-bold text-2xl text-gray-900">Persyaratan Peserta</h3>
                                </div>
                                <div className="content-body prose prose-orange max-w-none" dangerouslySetInnerHTML={{ __html: sertifikasi.requirements }} />
                            </div>
                        )}

                        {/* Benefits */}
                        {sertifikasi.benefits && (
                            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                    <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg"><Award className="w-6 h-6" /></div>
                                    <h3 className="font-kaisei font-bold text-2xl text-gray-900">Benefit Program</h3>
                                </div>
                                <div className="content-body prose prose-emerald max-w-none" dangerouslySetInnerHTML={{ __html: sertifikasi.benefits }} />
                            </div>
                        )}

                        {/* Dokumen Download */}
                        {(sertifikasi.brochure_pdf || sertifikasi.certificate_sample) && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {sertifikasi.brochure_pdf && (
                                    <a
                                        href={`/storage/${sertifikasi.brochure_pdf}`}
                                        target="_blank"
                                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all group"
                                    >
                                        <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                                            <Download className="w-6 h-6 text-emerald-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">Unduh Brosur</p>
                                            <p className="text-xs text-gray-500">Format PDF</p>
                                        </div>
                                    </a>
                                )}
                                {sertifikasi.certificate_sample && (
                                    <div
                                        onClick={() => window.open(`/storage/${sertifikasi.certificate_sample}`, '_blank')}
                                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer group"
                                    >
                                        <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                                            <Award className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">Lihat Contoh Sertifikat</p>
                                            <p className="text-xs text-gray-500">Preview Gambar</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN (Sidebar) */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-28 space-y-8">

                            {/* CTA CARD */}
                            <div className="bg-white p-1 rounded-3xl shadow-xl border border-gray-100 relative group overflow-hidden">
                                <div className="absolute inset-0 bg-yarsi-gradient-button opacity-10 group-hover:opacity-20 transition-opacity" />
                                <div className="relative bg-white p-6 rounded-[22px] text-center">
                                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                                        <Award className="w-8 h-8 text-white" />
                                    </div>

                                    <h3 className="font-kaisei font-bold text-2xl text-gray-900 mb-2">Daftar Sekarang</h3>

                                    <div className="mb-6 space-y-2">
                                        {sertifikasi.quota && (
                                            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                                                <Users className="w-4 h-4" />
                                                <span>Sisa Kuota: <strong>{Math.max(0, sertifikasi.quota - (sertifikasi.enrolled_count || 0))}</strong> Kursi</span>
                                            </div>
                                        )}
                                        {sertifikasi.registration_deadline && (
                                            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                                                <Calendar className="w-4 h-4" />
                                                <span>Deadline: <strong>{formatDate(sertifikasi.registration_deadline)}</strong></span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Logic Button Pendaftaran */}
                                    {isDeadlinePassed ? (
                                        <div className="w-full py-4 bg-gray-100 text-gray-500 font-bold rounded-xl border border-gray-200 cursor-not-allowed">
                                            Pendaftaran Ditutup
                                        </div>
                                    ) : isFull ? (
                                        <div className="w-full py-4 bg-red-50 text-red-600 font-bold rounded-xl border border-red-200 cursor-not-allowed">
                                            Kuota Penuh
                                        </div>
                                    ) : !isRegistrationOpen ? (
                                        <div className="w-full py-4 bg-gray-100 text-gray-500 font-bold rounded-xl border border-gray-200">
                                            Belum Dibuka
                                        </div>
                                    ) : (
                                        <a
                                            href={sertifikasi.registration_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                                        >
                                            Daftar Program <CornerDownRight className="w-5 h-5" />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Lokasi Detail (Jika Offline/Hybrid) */}
                            {['Offline', 'Hybrid'].includes(sertifikasi.mode) && sertifikasi.location && (
                                <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
                                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-emerald-600" /> Lokasi Pelaksanaan
                                    </h4>
                                    <p className="text-gray-700 text-sm leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-200">
                                        {sertifikasi.location}
                                    </p>
                                </div>
                            )}

                            {/* Share Card */}
                            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                                <div className="flex items-center gap-2 mb-6">
                                    <Share2 className="w-5 h-5 text-yarsi-green" />
                                    <h4 className="font-bold text-gray-900 font-kaisei text-lg">Bagikan Program</h4>
                                </div>

                                <div className="space-y-3">
                                    <button
                                        onClick={() => handleShare('whatsapp')}
                                        className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white rounded-xl transition-all font-bold text-sm group"
                                    >
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WA" className="w-5 h-5 group-hover:brightness-0 group-hover:invert transition-all" />
                                        WhatsApp
                                    </button>

                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => handleShare('facebook')}
                                            className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white rounded-xl transition-all font-bold text-sm"
                                        >
                                            Facebook
                                        </button>
                                        <button
                                            onClick={() => handleShare('twitter')}
                                            className="flex items-center justify-center gap-2 px-4 py-3 bg-black/5 text-black hover:bg-black hover:text-white rounded-xl transition-all font-bold text-sm"
                                        >
                                            X / Twitter
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => handleShare('copy')}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 text-gray-600 hover:bg-gray-200 rounded-xl transition-all font-medium text-sm border border-gray-200"
                                    >
                                        {copied ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                                        {copied ? 'Tautan Tersalin!' : 'Salin Tautan'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </MainLayout>
    );
}