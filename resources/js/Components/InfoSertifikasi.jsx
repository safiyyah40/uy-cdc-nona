import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ArrowRight, Award, MapPin, Calendar, BookOpen, Building2, Lock, ShieldCheck } from 'lucide-react';

/**
 * Komponen Kartu Sertifikasi (Satuan)
 */
const CardSertifikasi = ({ item, isGuest }) => {
    // Logika deadline pendaftaran sertifikasi (jika ada)
    const deadlineDate = item.deadline ? new Date(item.deadline) : null;
    const today = new Date();
    const diffDays = deadlineDate ? Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24)) : null;
    const isUrgent = diffDays <= 7 && diffDays > 0;

    const cardLink = route('sertifikasi.show', { slug: item.slug });

    return (
        <Link
            href={cardLink}
            className="group flex flex-col bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-emerald-200 h-full relative"
        >
            {/* Header: Area Logo Provider dan Badge Tipe Sertifikasi */}
            <div className="relative h-28 bg-gradient-to-br from-emerald-50 to-white border-b border-emerald-100/50">
                <div className="absolute -bottom-6 left-6">
                    <div className="w-16 h-16 p-2 bg-white rounded-xl shadow-md border border-gray-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                        {item.logo ? (
                            <img
                                src={`/storage/${item.logo}`}
                                alt={item.provider}
                                className="w-full h-full object-contain"
                                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                            />
                        ) : null}
                        <Award className={`w-8 h-8 text-emerald-600 ${item.logo ? 'hidden' : 'block'}`} />
                    </div>
                </div>

                {/* Badge Status */}
                <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                    {isUrgent && (
                        <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-md border border-amber-200 animate-pulse">
                            {diffDays} Hari Lagi
                        </span>
                    )}
                    <span className="px-2.5 py-1 bg-white/80 backdrop-blur text-gray-600 text-[10px] font-bold uppercase tracking-wide rounded-md border border-gray-200">
                        {item.level || 'Professional'}
                    </span>
                </div>
            </div>

            {/* Konten Utama: Judul Sertifikasi dan Kategori */}
            <div className="p-6 pt-10 flex flex-col flex-grow">
                <div className="mb-4">
                    <h3 className="font-bold text-lg text-gray-900 leading-snug line-clamp-2 mb-1 group-hover:text-emerald-600 transition-colors">
                        {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5" />
                        {item.provider}
                    </p>
                </div>

                {/* Info Tambahan: Diganti dari Gaji ke Kategori/Metode */}
                <div className="mb-4 inline-flex items-center gap-2 px-3 py-2 bg-emerald-50 rounded-lg border border-emerald-100 w-full">
                    <BookOpen className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-500 font-bold uppercase leading-none">Kategori</span>
                        <span className="text-xs font-bold text-gray-800">
                            {item.category} — {item.method || 'Online'}
                        </span>
                    </div>
                </div>

                {/* Footer Kartu: Lokasi/Otoritas dan Tombol Aksi */}
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="truncate max-w-[100px] font-medium text-emerald-700">Terverifikasi</span>
                    </div>

                    {isGuest ? (
                        <div className="flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded">
                            <Lock className="w-3 h-3" />
                            <span>Masuk Detail</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{deadlineDate ? deadlineDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) : 'Sertifikasi Aktif'}</span>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};

/**
 * Section Utama Info Sertifikasi
 */
const InfoSertifikasi = ({ latestSertifikasi = [] }) => {
    const { auth } = usePage().props;
    const isGuest = !auth.user;

    return (
        <section className="pt-8 pb-16 md:pt-12 md:pb-24 bg-white relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-50/50 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <span className="inline-flex items-center text-sm font-bold text-emerald-600 uppercase tracking-widest mb-2">
                            <Award className="w-4 h-4 mr-2" />
                            Peluang Karir
                        </span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 leading-tight">
                            Sertifikasi <span className="text-emerald-700">Profesional</span>
                        </h2>
                        <p className="text-gray-600 mt-3 max-w-2xl text-lg">
                            Tingkatkan kredibilitas dan keahlian Anda dengan sertifikasi standar industri.
                        </p>
                    </div>

                    <Link
                        href={route('sertifikasi.index')}
                        className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-all shadow-sm group"
                    >
                        Lihat Semua Sertifikasi
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Looping data sertifikasi */}
                {latestSertifikasi && latestSertifikasi.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {latestSertifikasi.map((item) => (
                            <CardSertifikasi key={item.id} item={item} isGuest={isGuest} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                        <Award className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">Belum ada program sertifikasi terbaru.</p>
                    </div>
                )}

                {/* Mobile Button */}
                <div className="mt-10 text-center md:hidden">
                    <Link
                        href={route('sertifikasi.index')}
                        className="inline-flex items-center justify-center w-full px-6 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-all shadow-sm"
                    >
                        Lihat Semua Sertifikasi
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default InfoSertifikasi;