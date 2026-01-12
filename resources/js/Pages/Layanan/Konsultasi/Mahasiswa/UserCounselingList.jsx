import React, { useState, useEffect, useRef } from "react";
import MainLayout from "@/Layouts/MainLayout";
import Footer from "@/Components/Footer";
import { Head, Link, router, usePage } from "@inertiajs/react";
import {
    ChevronLeft, ChevronRight, Clock, Trash2, Eye,
    Calendar, User, MessageCircle, Search, Filter, X,
    AlertCircle, CheckCircle, FileText
} from "lucide-react";

// COMPONENT: STATUS BADGE
const StatusBadge = ({ status }) => {
    const getStatusConfig = (s) => {
        switch (s) {
            case 'pending': return { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200', label: 'Menunggu', dot: 'bg-yellow-500' };
            case 'accepted': return { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-200', label: 'Disetujui', dot: 'bg-emerald-500' };
            case 'completed': return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200', label: 'Selesai', dot: 'bg-blue-500' };
            case 'rejected': return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200', label: 'Ditolak', dot: 'bg-red-500' };
            case 'cancelled': return { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200', label: 'Dibatalkan', dot: 'bg-gray-500' };
            default: return { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200', label: s, dot: 'bg-gray-400' };
        }
    };
    const style = getStatusConfig(status);
    return (
        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${style.bg} ${style.text} ${style.border} shadow-sm`}>
            <span className={`w-1.5 h-1.5 rounded-full ${style.dot} animate-pulse`}></span>
            {style.label}
        </span>
    );
};

// MAIN COMPONENT (Pastikan nama function ini benar) 
const UserCounselingList = ({ bookings, filters }) => {
    const { auth, flash } = usePage().props;
    const user = auth.user;

    const safeBookings = bookings || { data: [], links: [], from: 0, to: 0, total: 0, current_page: 1, last_page: 1 };
    const safeFilters = filters || { search: '', status: 'all' };

    //  STATE 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookingToDelete, setBookingToDelete] = useState(null);

    const [searchTerm, setSearchTerm] = useState(safeFilters.search || '');
    const [filterStatus, setFilterStatus] = useState(safeFilters.status || 'all');

    // Toggle Dropdown
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);

    // Ref untuk Debounce
    const isFirstRender = useRef(true);

    // EFFECT: DEBOUNCE SEARCH 
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm !== safeFilters.search) {
                fetchTableData({ search: searchTerm });
            }
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    // CORE FUNCTION: FETCH DATA 
    const fetchTableData = (newParams = {}) => {
        const params = {
            search: newParams.search !== undefined ? newParams.search : searchTerm,
            status: newParams.status !== undefined ? newParams.status : filterStatus,
            page: 1
        };

        router.get(route('konsultasi.list'), params, {
            preserveState: true,
            preserveScroll: true,
            replace: true
        });
    };

    // HANDLERS 
    const handleFilterClick = (value) => {
        setFilterStatus(value);
        setShowStatusDropdown(false);
        fetchTableData({ status: value });
    };

    const handlePageChange = (url) => {
        if (url) {
            router.get(url, {
                search: searchTerm,
                status: filterStatus,
            }, { preserveState: true, preserveScroll: true });
        }
    };

    // ACTIONS 
    const handleChatAdmin = (booking) => {
        const adminPhone = "6289529127621";
        const fakultas = user.faculty || '-';
        const prodi = user.study_program || '-';
        const idNumber = user.id_number || '-';
        const message =
            `Assalamualaikum Wr. Wb.\n` +
            `Halo Admin PUSKAKA.\n\n` +
            `Perkenalkan saya:\n` +
            `Nama: *${user.name}*\n` +
            `NPM: ${idNumber}\n` +
            `Fakultas: ${fakultas}\n` +
            `Prodi: ${prodi}\n\n` +
            `Saya ingin menanyakan status permohonan konsultasi yang saya ajukan pada:\n` +
            `*${booking.submitted_at}*\n\n` +
            `Dengan detail sesi sebagai berikut:\n` +
            `Konselor: ${booking.counselor_name}\n` +
            `Topik: ${booking.topic}\n` +
            `Jadwal: ${booking.date_only}\n` +
            `Waktu: ${booking.time_range} WIB\n\n` +
            `Mohon informasinya. Terima kasih.`;

        window.open(`https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`, '_blank');
    };

    const openDeleteModal = (id) => {
        setBookingToDelete(id);
        setIsModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsModalOpen(false);
        setBookingToDelete(null);
    };

    const confirmDelete = () => {
        if (bookingToDelete) {
            router.post(route('konsultasi.cancel', bookingToDelete), {}, {
                onSuccess: () => closeDeleteModal()
            });
        }
    };

    // Options
    const statusOptions = [
        { value: 'all', label: 'Semua Status' },
        { value: 'pending', label: 'Menunggu' },
        { value: 'accepted', label: 'Disetujui' },
        { value: 'completed', label: 'Selesai' },
        { value: 'rejected', label: 'Ditolak' },
        { value: 'cancelled', label: 'Dibatalkan' },
    ];

    return (
        <MainLayout user={user}>
            <Head title="Riwayat Konseling Saya" />

            <div className="bg-gray-50 min-h-screen py-12">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

                    {/*  HEADER  */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                        <div>
                            <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-2">
                                Riwayat <span className="text-[#004d40]">Konseling</span>
                            </h1>
                            <p className="text-gray-600 text-lg">Pantau status pengajuan dan jadwal konsultasi Anda.</p>
                        </div>
                        <Link
                            href={`${route('layanan.konsultasi')}#list-konselor`}
                            className="inline-flex items-center px-6 py-4 bg-[#004d40] text-white rounded-2xl font-bold shadow-lg hover:bg-[#00382e] hover:shadow-xl transition transform hover:-translate-y-1"
                        >
                            <Calendar className="w-5 h-5 mr-2" /> Buat Sesi Baru
                        </Link>
                    </div>

                    {/*  FLASH MESSAGE  */}
                    {flash.success && (
                        <div className="mb-8 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800 px-6 py-4 rounded-xl shadow-sm text-lg flex items-center animate-fade-in">
                            <CheckCircle className="w-6 h-6 mr-3 text-emerald-600" />
                            <div><span className="font-bold">Berhasil!</span> {flash.success}</div>
                        </div>
                    )}

                    {/*  SEARCH & FILTER BAR  */}
                    <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-center mb-6">
                        {/* Search */}
                        <div className="flex-grow w-full xl:w-auto bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition">
                            <div className="flex items-center px-6 py-4">
                                <Search className="w-6 h-6 text-gray-400 flex-shrink-0" />
                                <input
                                    type="text"
                                    placeholder="Cari topik atau nama konselor..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="flex-grow border-none focus:ring-0 p-2 text-lg text-gray-700 placeholder-gray-400 bg-transparent"
                                />
                                {searchTerm && (
                                    <button onClick={() => setSearchTerm('')} className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-red-500 transition">
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Filter Status */}
                        <div className="relative w-full sm:w-auto">
                            <button
                                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                                className="w-full px-6 py-4 bg-white hover:bg-gray-50 border border-gray-200 rounded-2xl shadow-md flex items-center justify-between gap-3 text-gray-700 font-bold text-base transition hover:shadow-lg"
                            >
                                <div className="flex items-center gap-2">
                                    <Filter className="w-5 h-5" />
                                    <span>Status</span>
                                </div>
                                {filterStatus !== 'all' && <span className="bg-[#004d40] text-white text-xs px-2 py-0.5 rounded-full">{statusOptions.find(o => o.value === filterStatus)?.label}</span>}
                            </button>
                            {showStatusDropdown && (
                                <div className="absolute right-0 mt-2 w-full sm:w-56 bg-white rounded-xl shadow-2xl border border-gray-100 z-20 py-2 animate-scale-in">
                                    {statusOptions.map((opt) => (
                                        <button
                                            key={opt.value}
                                            onClick={() => handleFilterClick(opt.value)}
                                            className={`w-full text-left px-6 py-3 hover:bg-gray-50 text-sm transition ${filterStatus === opt.value ? 'bg-emerald-50 text-[#004d40] font-bold border-l-4 border-[#004d40]' : 'text-gray-600'}`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/*  TABLE SECTION  */}
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                        {/* Table Header Info */}
                        <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-100 rounded-lg"><Calendar className="w-6 h-6 text-emerald-700" /></div>
                                <h2 className="text-2xl font-bold text-gray-800">Daftar Riwayat</h2>
                            </div>
                            <p className="text-gray-500 mt-1 ml-11 text-sm">
                                Menampilkan {safeBookings.data.length} dari total {safeBookings.total} data
                            </p>
                        </div>

                        {/* Responsive Table Wrapper */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-8 py-5 text-left text-sm font-black text-gray-700 uppercase tracking-wider">Topik</th>
                                        <th className="px-8 py-5 text-left text-sm font-black text-gray-700 uppercase tracking-wider">Jadwal</th>
                                        <th className="px-8 py-5 text-left text-sm font-black text-gray-700 uppercase tracking-wider">Konselor</th>
                                        <th className="px-8 py-5 text-center text-sm font-black text-gray-700 uppercase tracking-wider">Status</th>
                                        <th className="px-8 py-5 text-center text-sm font-black text-gray-700 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {safeBookings.data.length > 0 ? safeBookings.data.map((booking) => (
                                        <tr key={booking.id} className="hover:bg-gray-50 transition duration-150 group">

                                            {/* Column: Topik */}
                                            <td className="px-8 py-6">
                                                <div className="text-base font-bold text-gray-900 line-clamp-1">{booking.topic}</div>
                                                <div className="text-sm text-gray-500 mt-1 line-clamp-1 italic">"{booking.notes || 'Tidak ada catatan'}"</div>
                                            </td>

                                            {/* Column: Jadwal */}
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col">
                                                    <span className="flex items-center text-sm font-bold text-gray-700">
                                                        <Calendar className="w-4 h-4 mr-2 text-emerald-600" /> {booking.date_only}
                                                    </span>
                                                    <span className="flex items-center text-xs text-gray-500 mt-1 ml-6 bg-gray-100 px-2 py-0.5 rounded w-fit">
                                                        <Clock className="w-3 h-3 mr-1" /> {booking.time_range} WIB
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Column: Konselor */}
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center text-emerald-800 font-bold shadow-sm">
                                                        <User className="w-5 h-5" />
                                                    </div>
                                                    <span className="text-sm font-bold text-gray-700">{booking.counselor_name}</span>
                                                </div>
                                            </td>

                                            {/* Column: Status */}
                                            <td className="px-8 py-6 text-center">
                                                <StatusBadge status={booking.status} />
                                            </td>

                                            {/* Column: Aksi */}
                                            <td className="px-8 py-6 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    {/* Detail Button */}
                                                    <Link
                                                        href={route('konsultasi.show', booking.id)}
                                                        className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm border border-blue-100"
                                                        title="Lihat Detail & Laporan"
                                                    >
                                                        <Eye className="w-5 h-5" />
                                                    </Link>

                                                    {/* WA Button */}
                                                    <button
                                                        onClick={() => handleChatAdmin(booking)}
                                                        className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-50 text-green-600 hover:bg-green-600 hover:text-white transition-all shadow-sm border border-green-100"
                                                        title="Tanya Admin via WhatsApp"
                                                    >
                                                        <MessageCircle className="w-5 h-5" />
                                                    </button>

                                                    {/* Cancel Button */}
                                                    {booking.can_cancel && (
                                                        <button
                                                            onClick={() => openDeleteModal(booking.id)}
                                                            className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm border border-red-100"
                                                            title="Batalkan Permintaan"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="5" className="px-8 py-24 text-center">
                                                <div className="flex flex-col items-center justify-center text-gray-400">
                                                    <div className="bg-gray-100 p-6 rounded-full mb-4">
                                                        <AlertCircle className="w-10 h-10 text-gray-400" />
                                                    </div>
                                                    <h3 className="text-xl font-bold text-gray-600">Data Tidak Ditemukan</h3>
                                                    <p className="text-sm text-gray-400 mt-2 max-w-md mx-auto">
                                                        {searchTerm || filterStatus !== 'all'
                                                            ? "Coba ubah kata kunci pencarian atau filter status untuk menemukan data."
                                                            : "Anda belum memiliki riwayat pengajuan konsultasi."}
                                                    </p>

                                                    {!(searchTerm || filterStatus !== 'all') && (
                                                        <Link href={`${route('layanan.konsultasi')}#list-konselor`} className="mt-6 inline-flex items-center px-5 py-2.5 bg-[#004d40] text-white text-sm font-bold rounded-xl hover:bg-[#00382e] transition">
                                                            Ajukan Jadwal Sekarang
                                                        </Link>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/*  PAGINATION  */}
                        {safeBookings.links && safeBookings.links.length > 3 && (
                            <div className="px-8 py-6 border-t border-gray-100 bg-gray-50">
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                                    <div className="flex items-center gap-2">
                                        {safeBookings.links.map((link, i) => {
                                            let label = link.label;
                                            if (label.includes('&laquo;') || label === 'Previous') label = <ChevronLeft className="w-5 h-5" />;
                                            if (label.includes('&raquo;') || label === 'Next') label = <ChevronRight className="w-5 h-5" />;

                                            return (
                                                <button
                                                    key={i}
                                                    onClick={() => handlePageChange(link.url)}
                                                    disabled={!link.url || link.active}
                                                    className={`
                                                        w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold transition-all duration-200
                                                        ${link.active
                                                            ? 'bg-[#004d40] text-white shadow-lg scale-105'
                                                            : 'bg-white border border-gray-200 text-gray-600 hover:bg-white hover:border-[#004d40] hover:text-[#004d40]'}
                                                        ${!link.url && 'opacity-40 cursor-not-allowed hover:bg-transparent hover:border-gray-200 hover:text-gray-600'}
                                                    `}
                                                >
                                                    {label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <p className="text-sm text-gray-500 font-medium">
                                        Menampilkan {safeBookings.from}-{safeBookings.to} dari {safeBookings.total} data
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/*  MODAL CONFIRMATION  */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto px-4 py-6 sm:px-0">
                    <div className="fixed inset-0 transition-opacity" onClick={closeDeleteModal}>
                        <div className="absolute inset-0 bg-gray-900 opacity-60 backdrop-blur-sm"></div>
                    </div>
                    <div className="bg-white rounded-3xl overflow-hidden shadow-2xl transform transition-all sm:max-w-md w-full p-8 text-center relative z-10 animate-scale-in">
                        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-50 mb-6 border-4 border-red-100">
                            <Trash2 className="h-10 w-10 text-red-600" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-3">Batalkan Konsultasi?</h3>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Tindakan ini tidak dapat dibatalkan. Slot jadwal akan kembali dibuka untuk mahasiswa lain.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={closeDeleteModal}
                                className="w-full sm:w-auto px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition"
                            >
                                Batal
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 shadow-lg shadow-red-200 transition"
                            >
                                Ya, Batalkan
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </MainLayout>
    );
};

export default UserCounselingList;