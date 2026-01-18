import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ArrowRight, Briefcase, MapPin, Calendar, Wallet, Building2, Lock } from 'lucide-react';

/**
 * Helper: Mengubah angka menjadi format Rupiah (IDR)
 * Menangani tampilan gaji minimal dan maksimal.
 */
const formatCurrency = (amount) => {
    if (!amount) return null;
    return new Intl.NumberFormat('id-ID', {
        style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0,
    }).format(amount);
};

/**
 * Komponen Kartu Magang (Satuan)
 * Menangani logika tampilan untuk tamu (isGuest) dan peringatan deadline (isUrgent).
 */
const CardMagang = ({ item, isGuest }) => {
    // Hitung sisa hari untuk label 'Urgent'
    const deadlineDate = new Date(item.deadline);
    const today = new Date();
    const diffDays = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
    const isUrgent = diffDays <= 7 && diffDays > 0;

    // Proteksi: Jika belum login diarahkan ke login, jika sudah ke detail magang
    const cardLink = isGuest ? route('login') : route('magang.show', { slug: item.slug });

    return (
        <Link
            href={cardLink}
            className="group flex flex-col bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-emerald-200 h-full relative"
        >
            {/* Header: Area Logo Perusahaan dan Badge Tipe Magang */}
            <div className="relative h-28 bg-gradient-to-br from-emerald-50 to-white border-b border-emerald-100/50">
                <div className="absolute -bottom-6 left-6">
                    <div className="w-16 h-16 p-2 bg-white rounded-xl shadow-md border border-gray-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                        {item.logo ? (
                            <img
                                src={`/storage/${item.logo}`}
                                alt={item.company}
                                className="w-full h-full object-contain"
                                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                            />
                        ) : null}
                        <Building2 className={`w-8 h-8 text-emerald-600 ${item.logo ? 'hidden' : 'block'}`} />
                    </div>
                </div>

                {/* Badge Status: Menampilkan sisa hari jika deadline sudah dekat */}
                <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                    {isUrgent && (
                        <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-md border border-amber-200 animate-pulse">
                            {diffDays} Hari Lagi
                        </span>
                    )}
                    <span className="px-2.5 py-1 bg-white/80 backdrop-blur text-gray-600 text-[10px] font-bold uppercase tracking-wide rounded-md border border-gray-200">
                        {item.type}
                    </span>
                </div>
            </div>

            {/* Konten Utama: Judul Lowongan dan Estimasi Gaji */}
            <div className="p-6 pt-10 flex flex-col flex-grow">
                <div className="mb-4">
                    <h3 className="font-bold text-lg text-gray-900 leading-snug line-clamp-2 mb-1 group-hover:text-emerald-600 transition-colors">
                        {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5" />
                        {item.company}
                    </p>
                </div>

                {item.salary_min && (
                    <div className="mb-4 inline-flex items-center gap-2 px-3 py-2 bg-emerald-50 rounded-lg border border-emerald-100 w-full">
                        <Wallet className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-500 font-bold uppercase leading-none">Estimasi</span>
                            <span className="text-xs font-bold text-gray-800">
                                {formatCurrency(item.salary_min)} - {formatCurrency(item.salary_max)}
                            </span>
                        </div>
                    </div>
                )}

                {/* Footer Kartu: Lokasi dan Tombol Aksi/Deadline */}
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="truncate max-w-[100px]">{item.location}</span>
                    </div>

                    {isGuest ? (
                        <div className="flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded">
                            <Lock className="w-3 h-3" />
                            <span>Masuk Detail</span>
                        </div>
                    ) : (
                         <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{deadlineDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};

/**
 * Section Utama Info Magang
 * Mengambil data 'latestMagang' dan mengecek status autentikasi user.
 */
const InfoMagang = ({ latestMagang = [] }) => {
    const { auth } = usePage().props;
    const isGuest = !auth.user;

    return (
        <section className="pt-8 pb-16 md:pt-12 md:pb-24 bg-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-50/50 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">

                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <span className="inline-flex items-center text-sm font-bold text-emerald-600 uppercase tracking-widest mb-2">
                            <Briefcase className="w-4 h-4 mr-2" />
                            Peluang Karir
                        </span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 leading-tight">
                            Lowongan Magang <span className="text-emerald-700">Terbaru</span>
                        </h2>
                        <p className="text-gray-600 mt-3 max-w-2xl text-lg">
                            Temukan kesempatan magang dari mitra industri terpercaya.
                        </p>
                    </div>

                    <Link
                        href={route('magang.index')}
                        className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-all shadow-sm group"
                    >
                        Lihat Semua Lowongan
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Looping data magang ke dalam grid */}
                {latestMagang && latestMagang.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {latestMagang.map((item) => (
                            <CardMagang key={item.id} item={item} isGuest={isGuest} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                        <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">Belum ada lowongan magang terbaru.</p>
                    </div>
                )}

                <div className="mt-10 text-center md:hidden">
                    <Link
                        href={route('magang.index')}
                        className="inline-flex items-center justify-center w-full px-6 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-all shadow-sm"
                    >
                        Lihat Semua Lowongan
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default InfoMagang;
