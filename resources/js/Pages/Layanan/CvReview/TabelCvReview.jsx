import React, { useState, useEffect } from 'react';
import { router, usePage, Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import Footer from '@/Components/Footer';
import {
    Search, FolderCheck, CheckCircle, Trash2, ArrowLeft,
    Upload, Eye, MessageCircle, ChevronLeft, ChevronRight,
    Calendar, User, FileText, Clock, Filter, X, Zap, ArrowUpDown, BookOpen
} from 'lucide-react';

// Helper Components

const StatusBadge = ({ status }) => {
    const getStatusConfig = (s) => {
        switch (s) {
            case 'Selesai': return { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-200', dot: 'bg-emerald-500' };
            case 'Sedang Direview': return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200', dot: 'bg-blue-500' };
            case 'Ditugaskan': return { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200', dot: 'bg-purple-500' };
            case 'Perlu Revisi': return { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-200', dot: 'bg-amber-500' };
            case 'Dibatalkan': return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200', dot: 'bg-red-500' };
            default: return { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200', dot: 'bg-gray-400' };
        }
    };
    const style = getStatusConfig(status);
    return (
        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${style.bg} ${style.text} border ${style.border} shadow-sm whitespace-nowrap`}>
            <span className={`w-1.5 h-1.5 rounded-full ${style.dot} animate-pulse`}></span>
            {status}
        </span>
    );
};

const PriorityBadge = ({ priority }) => {
    const getPriorityConfig = (p) => {
        const lowerP = p ? p.toLowerCase() : 'normal';
        switch (lowerP) {
            case 'mendesak': case 'urgent': return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', icon: 'text-red-600' };
            case 'tinggi': case 'high': return { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', icon: 'text-orange-600' };
            default: return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', icon: 'text-blue-600' };
        }
    };
    const style = getPriorityConfig(priority);
    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold ${style.bg} ${style.text} border ${style.border}`}>
            <Zap className={`w-3 h-3 ${style.icon} fill-current`} />
            {priority || 'Normal'}
        </span>
    );
};

const Modal = ({ children, title, onClose, isVisible }) => {
    if (!isVisible) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-all duration-300">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-scale-in border border-white/20">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition p-2 hover:bg-gray-100 rounded-lg">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

// Main Component
const TabelCvReview = ({ reviews, stats }) => {
    const { auth, flash } = usePage().props;
    const user = auth.user || {};
    
    const isGuest = !auth.user; 
    const isCounselor = user?.role === 'konselor';

    // State
    const [allData, setAllData] = useState(reviews || []);
    useEffect(() => {
        setAllData(reviews || []);
    }, [reviews]);
    const [modal, setModal] = useState({ isVisible: false, type: null, id: null, item: null });
    
    // Filter States
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterPriority, setFilterPriority] = useState('all');
    const [sortOrder, setSortOrder] = useState('newest');
    
    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // Dropdown Toggles
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
    const [showSortDropdown, setShowSortDropdown] = useState(false);

    // Reset page saat filter berubah
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filterStatus, filterPriority, sortOrder]);

    // Client Side Filtering & Sorting
    const getFilteredAndSortedData = () => {
        let filtered = [...allData];

        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter(item => {
                const searchableText = `${item.user || ''} ${item.posisi || ''} ${item.media || ''} ${item.keterangan || ''}`.toLowerCase();
                return searchableText.includes(searchLower);
            });
        }

        if (filterStatus !== 'all') {
            const statusMap = {
                'submitted': ['pending', 'submitted'],
                'assigned': ['assigned'],
                'in_review': ['in_review'],
                'completed': ['completed'],
                'cancelled': ['cancelled']
            };
            const allowedStatuses = statusMap[filterStatus] || [];
            filtered = filtered.filter(item => allowedStatuses.includes(item.status_raw));
        }

        if (filterPriority !== 'all') {
            filtered = filtered.filter(item => {
                const itemPriority = (item.prioritas || 'normal').toLowerCase();
                return itemPriority === filterPriority.toLowerCase();
            });
        }

        filtered.sort((a, b) => {
            const dateA = new Date(a.created_at || a.tanggalSubmit);
            const dateB = new Date(b.created_at || b.tanggalSubmit);
            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });

        return filtered;
    };

    const filteredData = getFilteredAndSortedData();

    // Pagination Calculations
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const dataWithNo = paginatedData.map((item, index) => ({
        ...item,
        no: startIndex + index + 1
    }));

    // Handlers
    const handleKembali = () => router.visit(route('layanan.cv.review'));
    const handleUnggahCv = () => router.visit(route('layanan.cv.review.upload'));
    const handleLihatHasil = (item) => router.visit(route('layanan.cv.review.detail', item.id));

    const updateFilter = (type, value) => {
        if (type === 'status') {
            setFilterStatus(value);
            setShowStatusDropdown(false);
        } else if (type === 'priority') {
            setFilterPriority(value);
            setShowPriorityDropdown(false);
        } else if (type === 'sort') {
            setSortOrder(value);
            setShowSortDropdown(false);
        }
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Helper untuk membuat link pagination
    const getPaginationLinks = () => {
        const links = [];
        const maxVisible = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);

        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        // Previous Button
        links.push({
            label: <ChevronLeft className="w-5 h-5" />,
            page: currentPage - 1,
            disabled: currentPage === 1,
            active: false
        });

        // Page Numbers
        for (let i = startPage; i <= endPage; i++) {
            links.push({
                label: i,
                page: i,
                disabled: false,
                active: i === currentPage
            });
        }

        // Next Button
        links.push({
            label: <ChevronRight className="w-5 h-5" />,
            page: currentPage + 1,
            disabled: currentPage === totalPages,
            active: false
        });

        return links;
    };

    const handleChatAdmin = (item) => {
        const adminPhone = "6281295986204";
        const messageText = `Assalamualaikum Wr. Wb.\nHalo Admin PUSKAKA.\n\nSaya ingin menanyakan status Review CV saya:\nPosisi Target: *${item.posisi}*\nTanggal Submit: ${item.tanggalSubmit}\nStatus saat ini: ${item.status}\n\nMohon informasinya.`;
        window.open(`https://wa.me/${adminPhone}?text=${encodeURIComponent(messageText)}`, '_blank');
    };

    const handleReviewAction = (item) => setModal({ isVisible: true, type: 'review', id: item.id, item });
    
    const confirmReview = (id) => {
        setModal({ isVisible: false, type: null, id: null });
        router.visit(route('layanan.konselor.review', id));
    };

    const confirmDelete = () => {
        const idToCancel = modal.id;
        setModal({ isVisible: false, type: null, id: null });
        router.delete(route('layanan.cv.review.delete', idToCancel), {
            preserveScroll: true,
            onError: () => alert('Gagal membatalkan pengajuan.')
        });
    };

    const statusOptions = [
        { value: 'all', label: 'Semua Status' },
        { value: 'submitted', label: 'Diajukan' },
        { value: 'assigned', label: 'Ditugaskan' },
        { value: 'in_review', label: 'Sedang Direview' },
        { value: 'completed', label: 'Selesai' },
        { value: 'cancelled', label: 'Dibatalkan' }
    ];

    const priorityOptions = [
        { value: 'all', label: 'Semua Prioritas' },
        { value: 'normal', label: 'Normal' },
        { value: 'tinggi', label: 'Tinggi' },
        { value: 'mendesak', label: 'Mendesak' }
    ];

    const sortOptions = [
        { value: 'newest', label: 'Waktu: Terbaru' },
        { value: 'oldest', label: 'Waktu: Terlama' }
    ];

    const statistics = {
        total: filteredData.length,
        pending: filteredData.filter(d => d.status_raw === 'pending' || d.status_raw === 'assigned').length,
        in_review: filteredData.filter(d => d.status_raw === 'in_review').length,
        completed: filteredData.filter(d => d.status_raw === 'completed').length
    };

    let headerTitle, headerSubtitle, actionButton;
    if (isCounselor) {
        headerTitle = <span>Halo, <span className="text-emerald-800">{user.name}! </span></span>;
        headerSubtitle = "Kelola antrian tinjauan CV mahasiswa dengan efisien dan teliti.";
    } else {
        headerTitle = <span>Halo, <span className="text-emerald-800">{user.name}! </span></span>;
        headerSubtitle = "Pantau perkembangan review CV Anda dan tingkatkan peluang karir.";
        actionButton = (
            <button onClick={handleUnggahCv} className="px-8 py-4 bg-emerald-800 hover:bg-emerald-900 text-white text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition flex items-center gap-3">
                <Upload className="w-6 h-6" />
                Unggah CV Baru
            </button>
        );
    }

    return (
        <MainLayout user={user}>
            <Head title="Tabel CV Review" />
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-12">
                <div className="max-w-[1600px] mx-auto px-6 lg:px-8 space-y-8">
                    
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="space-y-3">
                            <button onClick={handleKembali} className="inline-flex items-center gap-2 text-emerald-800 hover:text-emerald-900 font-bold text-lg transition group">
                                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition" />
                                Kembali ke Dashboard
                            </button>
                            <h1 className="text-5xl font-black text-gray-800 leading-tight">{headerTitle}</h1>
                            <p className="text-xl text-gray-600 leading-relaxed">{headerSubtitle}</p>
                        </div>
                        <div>{actionButton}</div>
                    </div>

                    {flash.success && (
                        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-xl shadow-md flex items-start gap-4">
                            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 className="text-lg font-bold text-green-800">Sukses!</h3>
                                <p className="text-green-700 mt-1">{flash.success}</p>
                            </div>
                        </div>
                    )}

                    {isCounselor && (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-emerald-500 hover:shadow-xl transition">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total CV</p>
                                        <p className="text-4xl font-black text-gray-800 mt-2">{statistics.total}</p>
                                    </div>
                                    <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center">
                                        <FileText className="w-7 h-7 text-emerald-600" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-purple-500 hover:shadow-xl transition">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Menunggu</p>
                                        <p className="text-4xl font-black text-gray-800 mt-2">{statistics.pending}</p>
                                    </div>
                                    <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center">
                                        <Clock className="w-7 h-7 text-purple-600" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Proses Review</p>
                                        <p className="text-4xl font-black text-gray-800 mt-2">{statistics.in_review}</p>
                                    </div>
                                    <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                                        <FolderCheck className="w-7 h-7 text-blue-600" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-green-500 hover:shadow-xl transition">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Selesai</p>
                                        <p className="text-4xl font-black text-gray-800 mt-2">{statistics.completed}</p>
                                    </div>
                                    <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">
                                        <CheckCircle className="w-7 h-7 text-green-600" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-center">
                        <div className="flex-grow w-full xl:w-auto bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition">
                            <div className="flex items-center px-6 py-4">
                                <Search className="w-6 h-6 text-gray-400 flex-shrink-0" />
                                <input
                                    type="text"
                                    placeholder={isCounselor ? "Cari nama mahasiswa, posisi..." : "Cari posisi target..."}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="flex-grow border-none focus:ring-0 p-2 text-lg text-gray-700 placeholder-gray-400 bg-transparent"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row w-full xl:w-auto gap-4">
                            <div className="relative w-full sm:w-auto">
                                <button
                                    onClick={() => {
                                        setShowStatusDropdown(!showStatusDropdown);
                                        setShowPriorityDropdown(false);
                                        setShowSortDropdown(false);
                                    }}
                                    className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-2xl shadow-lg flex items-center justify-between sm:justify-start gap-3 text-gray-700 font-bold text-base transition"
                                >
                                    <div className="flex items-center gap-2">
                                        <Filter className="w-5 h-5" />
                                        <span>Status</span>
                                    </div>
                                </button>
                                {showStatusDropdown && (
                                    <div className="absolute right-0 mt-2 w-full sm:w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-20 py-2">
                                        {statusOptions.map((opt) => (
                                            <button
                                                key={opt.value}
                                                onClick={() => updateFilter('status', opt.value)}
                                                className={`w-full text-left px-6 py-3 hover:bg-gray-50 transition ${filterStatus === opt.value ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-gray-700'}`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {isCounselor && (
                                <>
                                    <div className="relative w-full sm:w-auto">
                                        <button
                                            onClick={() => {
                                                setShowPriorityDropdown(!showPriorityDropdown);
                                                setShowStatusDropdown(false);
                                                setShowSortDropdown(false);
                                            }}
                                            className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-2xl shadow-lg flex items-center justify-between sm:justify-start gap-3 text-gray-700 font-bold text-base transition"
                                        >
                                            <div className="flex items-center gap-2">
                                                <Zap className="w-5 h-5" />
                                                <span>Prioritas</span>
                                            </div>
                                        </button>
                                        {showPriorityDropdown && (
                                            <div className="absolute right-0 mt-2 w-full sm:w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-20 py-2">
                                                {priorityOptions.map((opt) => (
                                                    <button
                                                        key={opt.value}
                                                        onClick={() => updateFilter('priority', opt.value)}
                                                        className={`w-full text-left px-6 py-3 hover:bg-gray-50 transition ${filterPriority === opt.value ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-gray-700'}`}
                                                    >
                                                        {opt.label}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="relative w-full sm:w-auto">
                                        <button
                                            onClick={() => {
                                                setShowSortDropdown(!showSortDropdown);
                                                setShowStatusDropdown(false);
                                                setShowPriorityDropdown(false);
                                            }}
                                            className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-2xl shadow-lg flex items-center justify-between sm:justify-start gap-3 text-gray-700 font-bold text-base transition"
                                        >
                                            <div className="flex items-center gap-2">
                                                <ArrowUpDown className="w-5 h-5" />
                                                <span>Waktu</span>
                                            </div>
                                        </button>
                                        {showSortDropdown && (
                                            <div className="absolute right-0 mt-2 w-full sm:w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-20 py-2">
                                                {sortOptions.map((opt) => (
                                                    <button
                                                        key={opt.value}
                                                        onClick={() => updateFilter('sort', opt.value)}
                                                        className={`w-full text-left px-6 py-3 hover:bg-gray-50 transition ${sortOrder === opt.value ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-gray-700'}`}
                                                    >
                                                        {opt.label}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {(searchTerm || filterStatus !== 'all' || filterPriority !== 'all') && (
                        <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-sm font-medium text-gray-600">Filter aktif:</span>
                            {searchTerm && (
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-lg text-sm font-semibold">
                                    "{searchTerm}"
                                    <button onClick={() => setSearchTerm('')} className="hover:bg-emerald-200 rounded-full p-0.5">
                                        <X className="w-4 h-4" />
                                    </button>
                                </span>
                            )}
                            {filterStatus !== 'all' && (
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-semibold">
                                    {statusOptions.find(s => s.value === filterStatus)?.label}
                                    <button onClick={() => setFilterStatus('all')} className="hover:bg-blue-200 rounded-full p-0.5">
                                        <X className="w-4 h-4" />
                                    </button>
                                </span>
                            )}
                            {filterPriority !== 'all' && (
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-800 rounded-lg text-sm font-semibold">
                                    {priorityOptions.find(p => p.value === filterPriority)?.label}
                                    <button onClick={() => setFilterPriority('all')} className="hover:bg-orange-200 rounded-full p-0.5">
                                        <X className="w-4 h-4" />
                                    </button>
                                </span>
                            )}
                        </div>
                    )}

                    <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
                        <div className="p-8 border-b border-gray-100">
                            <h2 className="text-3xl font-black text-gray-800 flex items-center gap-3">
                                <FolderCheck className="w-8 h-8 text-emerald-600" />
                                {isCounselor ? 'Antrian Review CV' : 'Riwayat Review CV'}
                            </h2>
                            <p className="text-sm text-gray-500 mt-2">
                                Menampilkan {dataWithNo.length} dari {filteredData.length} data
                            </p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-emerald-50 to-blue-50 border-b-2 border-emerald-200">
                                    <tr>
                                        <th className="px-8 py-5 text-left text-sm font-black text-gray-700 uppercase tracking-wider">No</th>
                                        {isCounselor && <th className="px-8 py-5 text-left text-sm font-black text-gray-700 uppercase tracking-wider">Prioritas</th>}
                                        {isCounselor && <th className="px-8 py-5 text-left text-sm font-black text-gray-700 uppercase tracking-wider">Mahasiswa</th>}
                                        <th className="px-8 py-5 text-left text-sm font-black text-gray-700 uppercase tracking-wider">Posisi Target</th>
                                        <th className="px-8 py-5 text-left text-sm font-black text-gray-700 uppercase tracking-wider">Tanggal</th>
                                        <th className="px-8 py-5 text-left text-sm font-black text-gray-700 uppercase tracking-wider">Status</th>
                                        {!isCounselor && <th className="px-8 py-5 text-left text-sm font-black text-gray-700 uppercase tracking-wider">Keterangan</th>}
                                        <th className="px-8 py-5 text-center text-sm font-black text-gray-700 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {dataWithNo.length === 0 ? (
                                        <tr>
                                            <td colSpan={isCounselor ? 7 : 6} className="px-8 py-20 text-center">
                                                <div className="flex flex-col items-center gap-4">
                                                    
                                                        
                                                        <BookOpen className="w-16 h-16 mb-4 opacity-50"/>
                                                    </div>
                                                    

                                                    <div>
                                                        <p className="text-2xl font-bold text-gray-400">Tidak ada data ditemukan</p>
                                                        <p className="text-gray-500 mt-2">
                                                            {searchTerm || filterStatus !== 'all' || filterPriority !== 'all' ? "Tidak ditemukan hasil pencarian." : "Belum ada riwayat pengajuan."}
                                                        </p>
                                                    </div>
                                                
                                            </td>
                                        </tr>
                                    ) : (
                                        dataWithNo.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50 transition group">
                                                <td className="px-8 py-6 text-base font-bold text-gray-700">{item.no}</td>

                                                {isCounselor && (
                                                    <td className="px-8 py-6">
                                                        <PriorityBadge priority={item.prioritas} />
                                                    </td>
                                                )}

                                                {isCounselor && (
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-4">
                                                            <div>
                                                                <p className="text-base font-bold text-gray-800">{item.user}</p>
                                                                <p className="text-sm text-gray-500">Mahasiswa</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                )}

                                                <td className="px-8 py-6">
                                                    <p className="text-base font-bold text-gray-800">{item.posisi}</p>
                                                    <p className="text-sm text-gray-500">{item.media || 'Dokumen Umum'}</p>
                                                </td>

                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <Calendar className="w-5 h-5 text-emerald-600" />
                                                        <span className="text-base font-medium">{item.tanggalSubmit}</span>
                                                    </div>
                                                </td>

                                                <td className="px-8 py-6">
                                                    <StatusBadge status={item.status} />
                                                </td>

                                                {!isCounselor && (
                                                    <td className="px-8 py-6">
                                                        <p className="text-base text-gray-600 italic line-clamp-2 max-w-xs">
                                                            {item.keterangan ? `"${item.keterangan}"` : '-'}
                                                        </p>
                                                    </td>
                                                )}

                                                <td className="px-8 py-6">
                                                    <div className="flex items-center justify-center gap-2">
                                                        {isCounselor && (item.status_raw === 'assigned' || item.status_raw === 'in_review') && (
                                                            <button 
                                                                onClick={() => handleReviewAction(item)} 
                                                                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
                                                            >
                                                                Review
                                                            </button>
                                                        )}

                                                        <button 
                                                            onClick={() => handleLihatHasil(item)} 
                                                            className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 hover:border-blue-200 shadow-sm transition-all duration-200 hover:scale-105" 
                                                            title="Lihat Detail & Feedback"
                                                        >
                                                            <Eye className="w-5 h-5" />
                                                        </button>

                                                        {!isCounselor && (
                                                            <button 
                                                                onClick={() => handleChatAdmin(item)} 
                                                                className="p-2.5 rounded-xl bg-green-50 text-green-600 border border-green-100 hover:bg-green-100 hover:border-green-200 shadow-sm transition-all duration-200 hover:scale-105" 
                                                                title="Hubungi Admin via WA"
                                                            >
                                                                <MessageCircle className="w-5 h-5" />
                                                            </button>
                                                        )}

                                                        {item.can_delete && (
                                                            <button 
                                                                onClick={() => setModal({ isVisible: true, type: 'delete', id: item.id })} 
                                                                className="p-2.5 rounded-xl bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 hover:border-red-200 shadow-sm transition-all duration-200 hover:scale-105" 
                                                                title="Batalkan & Hapus"
                                                            >
                                                                <Trash2 className="w-5 h-5" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* PAGINATION */}
                        {!isGuest && totalPages > 1 && (
                            <div className="px-8 py-6 border-t border-gray-100 bg-gray-50">
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                                    <div className="flex items-center gap-2">
                                        {getPaginationLinks().map((link, i) => (
                                            <button
                                                key={i}
                                                onClick={() => !link.disabled && handlePageChange(link.page)}
                                                disabled={link.disabled || link.active}
                                                className={`
                                                    flex items-center justify-center w-10 h-10 rounded-xl text-sm font-bold transition-all duration-200
                                                    ${link.active
                                                        ? 'bg-emerald-800 text-white shadow-lg shadow-emerald-800/20 scale-105'
                                                        : 'bg-white border border-gray-200 text-gray-600 hover:bg-white hover:text-emerald-800 hover:border-emerald-200 hover:shadow-md'
                                                    }
                                                    ${link.disabled && 'opacity-40 cursor-not-allowed hover:bg-transparent hover:shadow-none'}
                                                `}
                                            >
                                                {link.label}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-500 font-medium">
                                        Menampilkan {startIndex + 1}-{Math.min(startIndex + itemsPerPage, totalItems)} dari {totalItems} data
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* MODALS */}
            <Modal title="Konfirmasi Penghapusan" isVisible={modal.type === 'delete'} onClose={() => setModal({ isVisible: false, type: null, id: null })}>
                <div className="p-6 space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Trash2 className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                            <p className="text-lg text-gray-700 leading-relaxed font-medium">Apakah Anda yakin ingin menghapus riwayat tinjauan ini?</p>
                            <p className="text-sm text-gray-500 mt-2">Tindakan ini tidak dapat dibatalkan.</p>
                        </div>
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button onClick={() => setModal({ isVisible: false, type: null, id: null })} className="flex-1 px-4 py-3 text-base font-bold rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition">Batal</button>
                        <button onClick={confirmDelete} className="flex-1 px-4 py-3 text-base font-bold rounded-xl bg-red-600 text-white hover:bg-red-700 transition shadow-lg shadow-red-200">Hapus Permanen</button>
                    </div>
                </div>
            </Modal>

            <Modal title="Mulai Review CV" isVisible={modal.type === 'review'} onClose={() => setModal({ isVisible: false, type: null, id: null })}>
                <div className="p-6 space-y-6">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                        <p className="text-base font-bold text-blue-800">Konfirmasi Tindakan</p>
                        <p className="text-sm text-blue-700 mt-2">Status dokumen akan berubah menjadi "Sedang Direview". Mahasiswa akan menerima notifikasi bahwa Anda sedang mengerjakannya.</p>
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button onClick={() => setModal({ isVisible: false, type: null, id: null })} className="flex-1 px-4 py-3 text-base font-bold rounded-xl text-gray-600 hover:bg-gray-100 transition">Batal</button>
                        <button onClick={() => confirmReview(modal.id)} className="flex-1 px-4 py-3 text-base font-bold rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 shadow-lg transition">Mulai Review</button>
                    </div>
                </div>
            </Modal>

            <Footer />
        </MainLayout>
    );
};

export default TabelCvReview;