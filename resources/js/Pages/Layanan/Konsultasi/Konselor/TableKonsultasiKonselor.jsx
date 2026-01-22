import React, { useState, useEffect, useRef } from 'react';
import MainLayout from "@/Layouts/MainLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import {
    Calendar, Clock, BookOpen, Users, ArrowLeft, Eye,
    Search, Filter, CheckCircle, ArrowUpDown, X
} from 'lucide-react';

// Helper Components
const StatusBadge = ({ status }) => {
    const getStatusConfig = (s) => {
        switch (s) {
            case 'pending': return { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200', label: 'Menunggu' };
            case 'accepted': return { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-200', label: 'Disetujui' };
            case 'completed': return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200', label: 'Selesai' };
            case 'rejected': return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200', label: 'Ditolak' };
            case 'cancelled': return { bg: 'bg-red-100', text: 'text-red-600', border: 'border-red-200', label: 'Dibatalkan' };
            default: return { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200', label: s };
        }
    };
    const style = getStatusConfig(status);
    return (
        <span className={`px-4 py-1.5 inline-flex text-xs leading-5 font-bold uppercase tracking-wide rounded-full border ${style.bg} ${style.text} ${style.border}`}>
            {style.label}
        </span>
    );
};

const TableKonsultasiKonselor = ({ consultations, pagination, stats }) => {
    const { auth, flash } = usePage().props;
    const user = auth.user;

    // Filter States
    const queryParams = new URLSearchParams(window.location.search);
    const [searchTerm, setSearchTerm] = useState(queryParams.get('search') || '');
    const [filterStatus, setFilterStatus] = useState(queryParams.get('status') || 'all');
    const [sortOrder, setSortOrder] = useState(queryParams.get('sort') || 'newest');

    // Dropdown Toggles
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [showSortDropdown, setShowSortDropdown] = useState(false);

    // Ref untuk Debounce
    const isFirstRender = useRef(true);

    // AUTO SEARCH (DEBOUNCE)
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        const delayDebounceFn = setTimeout(() => {
            fetchTableData();
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    // Fetch Data
    const fetchTableData = (params = {}) => {
        const currentParams = {
            search: searchTerm,
            status: filterStatus,
            sort: sortOrder,
            ...params
        };

        router.get(route('konselor.table_konsultasi'), currentParams, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    // Handlers
    const handleSearchChange = (e) => setSearchTerm(e.target.value);

    const updateFilter = (type, value) => {
        if (type === 'status') {
            setFilterStatus(value);
            setShowStatusDropdown(false);
            fetchTableData({ status: value });
        } else if (type === 'sort') {
            setSortOrder(value);
            setShowSortDropdown(false);
            fetchTableData({ sort: value });
        }
    };

    const handlePageChange = (url) => {
        if (url) {
            router.get(url, {
                search: searchTerm,
                status: filterStatus,
                sort: sortOrder
            }, { preserveState: true, preserveScroll: true });
        }
    };

    // Options
    const statusOptions = [
        { value: 'all', label: 'Semua Status' },
        { value: 'pending', label: 'Menunggu' },
        { value: 'accepted', label: 'Disetujui' },
        { value: 'completed', label: 'Selesai' },
        { value: 'rejected', label: 'Ditolak' },
    ];

    const sortOptions = [
        { value: 'newest', label: 'Jadwal Terdekat' },
        { value: 'oldest', label: 'Jadwal Terlama' },
    ];

    // Fallback Stats jika undefined (safety)
    const statistics = stats || { total: 0, pending: 0, upcoming: 0, completed: 0 };

    return (
        <MainLayout user={user}>
            <Head title="Manajemen Konsultasi" />

            <div className="bg-gray-50 min-h-screen py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px]">

                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                        <div className="space-y-2">
                            <Link
                                href={route('konselor.dashboard')}
                                className="inline-flex items-center text-gray-500 hover:text-[#004d40] font-bold text-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 mr-2" /> Kembali
                            </Link>
                            <h1 className="text-4xl font-extrabold text-[#004d40] font-serif">
                                Daftar Sesi Konsultasi
                            </h1>
                            <p className="text-gray-600 text-lg">Kelola permintaan dan jadwal konsultasi mahasiswa.</p>
                        </div>
                    </div>

                    {/* Flash Message */}
                    {flash.success && (
                        <div className="mb-8 bg-emerald-100 border-l-4 border-emerald-500 text-emerald-800 px-6 py-4 rounded-xl shadow-sm text-lg flex items-center">
                            <CheckCircle className="w-6 h-6 mr-3" />
                            <div><span className="font-bold">Sukses!</span> {flash.success}</div>
                        </div>
                    )}

                    {/* STATS CARDS*/}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                        {/* Total */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-[#004d40] hover:shadow-xl transition flex justify-between items-center">
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Total Sesi</p>
                                <p className="text-4xl font-extrabold text-gray-900 mt-2">{statistics.total}</p>
                            </div>
                            <div className="p-3 bg-gray-100 rounded-xl">
                                <BookOpen className="text-gray-600 w-8 h-8" />
                            </div>
                        </div>
                        {/* Pending */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-yellow-400 hover:shadow-xl transition flex justify-between items-center">
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Menunggu Respon</p>
                                <p className="text-4xl font-extrabold text-gray-900 mt-2">{statistics.pending}</p>
                            </div>
                            <div className="p-3 bg-yellow-100 rounded-xl">
                                <Clock className="text-yellow-600 w-8 h-8" />
                            </div>
                        </div>
                        {/* Accepted (Upcoming) */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-emerald-500 hover:shadow-xl transition flex justify-between items-center">
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Disetujui</p>
                                <p className="text-4xl font-extrabold text-gray-900 mt-2">{statistics.upcoming}</p>
                            </div>
                            <div className="p-3 bg-emerald-100 rounded-xl">
                                <Calendar className="text-emerald-600 w-8 h-8" />
                            </div>
                        </div>
                        {/* Completed */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition flex justify-between items-center">
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Selesai</p>
                                <p className="text-4xl font-extrabold text-gray-900 mt-2">{statistics.completed}</p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <CheckCircle className="text-blue-600 w-8 h-8" />
                            </div>
                        </div>
                    </div>

                    {/* FILTER & SEARCH BAR */}
                    <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-center mb-6">
                        {/* Search */}
                        <div className="flex-grow w-full xl:w-auto bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
                            <div className="flex items-center px-4 py-3">
                                <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                <input
                                    type="text"
                                    placeholder="Cari nama mahasiswa atau topik..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="flex-grow border-none focus:ring-0 text-gray-700 placeholder-gray-400 bg-transparent"
                                />
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="flex gap-3 w-full xl:w-auto">
                            {/* Filter Status */}
                            <div className="relative w-full sm:w-auto">
                                <button
                                    onClick={() => { setShowStatusDropdown(!showStatusDropdown); setShowSortDropdown(false); }}
                                    className="w-full px-6 py-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-2xl shadow-md flex items-center justify-between gap-3 text-gray-700 font-bold transition"
                                >
                                    <div className="flex items-center gap-2">
                                        <Filter className="w-4 h-4" /> <span>Status</span>
                                    </div>
                                </button>
                                {showStatusDropdown && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-20 py-2 animate-scale-in">
                                        {statusOptions.map((opt) => (
                                            <button
                                                key={opt.value}
                                                onClick={() => updateFilter('status', opt.value)}
                                                className={`w-full text-left px-4 py-2 hover:bg-gray-50 text-sm ${filterStatus === opt.value ? 'font-bold text-[#004d40] bg-emerald-50' : 'text-gray-600'}`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Filter Sort */}
                            <div className="relative w-full sm:w-auto">
                                <button
                                    onClick={() => { setShowSortDropdown(!showSortDropdown); setShowStatusDropdown(false); }}
                                    className="w-full px-6 py-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-2xl shadow-md flex items-center justify-between gap-3 text-gray-700 font-bold transition"
                                >
                                    <div className="flex items-center gap-2">
                                        <ArrowUpDown className="w-4 h-4" /> <span>Urutkan</span>
                                    </div>
                                </button>
                                {showSortDropdown && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-20 py-2 animate-scale-in">
                                        {sortOptions.map((opt) => (
                                            <button
                                                key={opt.value}
                                                onClick={() => updateFilter('sort', opt.value)}
                                                className={`w-full text-left px-4 py-2 hover:bg-gray-50 text-sm ${sortOrder === opt.value ? 'font-bold text-[#004d40] bg-emerald-50' : 'text-gray-600'}`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* TABEL */}
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gradient-to-r from-gray-50 to-white">
                                    <tr>
                                        <th className="px-8 py-5 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">Mahasiswa</th>
                                        <th className="px-8 py-5 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">Topik</th>
                                        <th className="px-8 py-5 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">Jadwal</th>
                                        <th className="px-8 py-5 text-center text-sm font-bold text-gray-600 uppercase tracking-wider">Status</th>
                                        <th className="px-8 py-5 text-right text-sm font-bold text-gray-600 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100">
                                    {consultations.length > 0 ? consultations.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50 transition duration-150 group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700 font-bold">
                                                        {item.user_name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="text-base font-bold text-gray-900">{item.user_name}</div>
                                                        <div className="text-xs text-gray-500">Diajukan: {item.created_at}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="text-base text-gray-700 font-medium max-w-xs truncate">{item.topic}</div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col">
                                                    <span className="flex items-center text-sm font-bold text-gray-700">
                                                        <Calendar className="w-4 h-4 mr-2 text-emerald-600" /> {item.date}
                                                    </span>
                                                    <span className="flex items-center text-xs text-gray-500 mt-1 ml-6">
                                                        <Clock className="w-3 h-3 mr-1" /> {item.time}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <StatusBadge status={item.status} />
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <Link
                                                    href={route('konselor.konsultasi.show', item.id)}
                                                    className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-bold rounded-xl hover:bg-[#004d40] hover:text-white hover:border-transparent transition shadow-sm"
                                                >
                                                    <Eye className="w-4 h-4 mr-2" /> Detail
                                                </Link>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="5" className="px-8 py-20 text-center">
                                                <div className="flex flex-col items-center justify-center text-gray-400">
                                                    <BookOpen className="w-16 h-16 mb-4 opacity-50" />
                                                    <p className="text-xl font-medium text-gray-500">Tidak ada data ditemukan.</p>
                                                    <p className="text-sm text-gray-400 mt-1">Belum ada riwayat pengajuan.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {pagination && pagination.last_page > 1 && (
                            <div className="px-8 py-6 border-t border-gray-100 bg-gray-50 flex justify-center">
                                <div className="flex items-center gap-2">
                                    {pagination.links.map((link, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handlePageChange(link.url)}
                                            disabled={!link.url || link.active}
                                            className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold transition-all
                                                ${link.active
                                                    ? 'bg-[#004d40] text-white shadow-md'
                                                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
                                                }
                                                ${!link.url && 'opacity-50 cursor-not-allowed'}
                                            `}
                                        >
                                            {link.label.replace('&laquo;', '').replace('&raquo;', '')}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default TableKonsultasiKonselor;