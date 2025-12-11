import React, { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';
import Footer from '../../Components/Footer';
import FormUnggahCv from './FormUnggahCv';
import DetailSubmission from './DetailSubmission';
import { Search, FolderCheck, Clock, CheckCircle, Edit, Trash2, ArrowLeft } from 'lucide-react';

// Data untuk Mahasiswa/Pengguna
const initialUserData = [
    {
        id: 1,
        media: 'PDF CV Final',
        posisi: 'Software Engineer (Frontend)',
        keterangan: 'Aplikasi E-Commerce XYZ',
        status: 'Selesai',
        hasil: 'A+',
        linkHasil: '/layanan/tinjauan/1/detail'
    },
    {
        id: 2,
        media: 'CV Lama DOCX',
        posisi: 'Product Manager',
        keterangan: 'Startup F&B Cepat Saji',
        status: 'Diproses',
        hasil: 'Menunggu',
        linkHasil: null
    },
    {
        id: 3,
        media: 'Portofolio Online',
        posisi: 'UI/UX Designer',
        keterangan: 'Layanan Finansial',
        status: 'Revisi',
        hasil: 'B-',
        linkHasil: '/layanan/tinjauan/3/revisi'
    },
];

// Data Dummy untuk Konselor
const initialCounselorData = [
    {
        id: 101,
        user: 'Andi P. (andi@mail.com)',
        posisi: 'Data Analyst',
        tanggalSubmit: '2025-12-05',
        status: 'Menunggu Review',
        prioritas: 'Normal',
    },
    {
        id: 102,
        user: 'Siti K. (siti@mail.com)',
        posisi: 'UI/UX Designer',
        tanggalSubmit: '2025-12-08',
        status: 'Sedang Dikerjakan',
        prioritas: 'Tinggi',
    },
    {
        id: 103,
        user: 'Bambang S. (bambang@mail.com)',
        posisi: 'Manajer Pemasaran',
        tanggalSubmit: '2025-11-20',
        status: 'Perlu Tindak Lanjut',
        prioritas: 'Normal',
    },
];

const NAMA_PENGGUNA = "Budi Santoso";

// --- Komponen Pembantu ---
const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-10">
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-emerald-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="text-gray-600">Memuat data...</span>
    </div>
);

const Modal = ({ children, title, onClose, isVisible }) => {
    if (!isVisible) return null;
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

// --- Komponen Utama ---

const TabelCvReview = (props) => {
    const { auth } = usePage().props;
    const user = auth.user || {};
    
    // --- UPDATED: LOGIKA ROLE BERDASARKAN DATABASE ---
    const isCounselor = user?.role === 'konselor';

    // Inisialisasi data berdasarkan peran
    const initialData = isCounselor ? initialCounselorData : initialUserData;
    const [dataTinjauan, setDataTinjauan] = useState(initialData);

    // State untuk Pengguna/Mahasiswa
    const [isFormVisible, setIsFormVisible] = useState(false);

    // State Bersama
    const [isLoading, setIsLoading] = useState(false);
    const [detailId, setDetailId] = useState(null);
    const [modal, setModal] = useState({ isVisible: false, type: null, id: null });
    const [searchTerm, setSearchTerm] = useState('');

    const handleKembali = () => {
        if (detailId !== null) {
            setDetailId(null);
        } else {
            router.back();
        }
    };

    // --- FUNGSI SPESIFIK MAHASISWA/PENGGUNA ---
    const handleUnggahCv = () => {
        setIsFormVisible(true);
    };

    const handleFormSubmit = (newData) => {
        setIsLoading(true);
        setIsFormVisible(false);
        setTimeout(() => {
            const newItem = {
                ...newData,
                id: Date.now(),
                status: 'Diproses',
                hasil: 'Menunggu',
                linkHasil: null
            };
            setDataTinjauan(prevData => [...prevData, newItem]);
            setIsLoading(false);
            alert("CV berhasil diunggah (simulasi)! Data sudah masuk ke riwayat.");
        }, 1500);
    };

    const handleLihatHasil = (item) => {
        if (item.linkHasil && item.status === 'Selesai') {
            // Simulasi buka detail
            setDetailId(item.id);
        } else if (item.linkHasil && item.status === 'Revisi') {
            console.log(`Simulasi: Membuka link Revisi tinjauan: ${item.linkHasil}`);
            alert('Membuka halaman revisi (Simulasi)');
        } else {
            alert(`Tinjauan masih berstatus ${item.status}.`);
        }
    };

    // --- FUNGSI SPESIFIK KONSELO R ---
    const handleReviewAction = (item) => {
        setModal({ isVisible: true, type: 'review', id: item.id, item });
    };

    const handleMarkCompleteAction = (item) => {
        setModal({ isVisible: true, type: 'complete', id: item.id, item });
    };

    const confirmReview = (id) => {
        console.log("NAVIGATE TO ID:", id); // DEBUG
        setModal({ isVisible: false, type: null, id: null });
        router.visit(`/layanan/konselor/review/${id}`);
    };


    const confirmComplete = () => {
        const idToComplete = modal.id;
        setModal({ isVisible: false, type: null, id: null, item: null });
        setIsLoading(true);

        setTimeout(() => {
            setDataTinjauan(prevData => prevData.filter(item => item.id !== idToComplete));
            setIsLoading(false);
            alert(`Review ID ${idToComplete} Selesai dan Feedback dikirim! (Simulasi)`);
        }, 1000);
    };

    // --- FUNGSI UMUM TABEL ---

    const confirmDelete = () => {
        const idToDelete = modal.id;
        setModal({ isVisible: false, type: null, id: null });
        setIsLoading(true);

        setTimeout(() => {
            setDataTinjauan(prevData => prevData.filter(item => item.id !== idToDelete));
            setIsLoading(false);
            alert(`Tinjauan ID ${idToDelete} berhasil dihapus (simulasi).`);
        }, 1000);
    };

    const getStatusStyle = (status) => {
        switch (status) {
            // Status Mahasiswa
            case 'Selesai':
                return 'bg-emerald-100 text-emerald-800 font-semibold';
            case 'Diproses':
                return 'bg-blue-100 text-blue-800 font-semibold';
            case 'Revisi':
                return 'bg-red-100 text-red-800 font-semibold';
            // Status Konselor
            case 'Menunggu Review':
                return 'bg-yellow-100 text-yellow-800 font-semibold';
            case 'Sedang Dikerjakan':
                return 'bg-indigo-100 text-indigo-800 font-semibold';
            case 'Perlu Tindak Lanjut':
                return 'bg-orange-100 text-orange-800 font-semibold';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Filter data berdasarkan search term
    const filteredData = dataTinjauan.filter(item => {
        const search = searchTerm.toLowerCase();
        // Logika filter Mahasiswa
        if (!isCounselor && item.posisi.toLowerCase().includes(search)) return true;
        // Logika filter Konselor
        if (isCounselor && (item.user.toLowerCase().includes(search) || item.posisi.toLowerCase().includes(search))) return true;
        return false;
    });

    const dataWithNo = filteredData.map((item, index) => ({
        ...item,
        no: index + 1
    }));

    let mainContent;
    let headerActionButtons;


    // --- TAMPILAN KONSELO R ---
    if (isCounselor) {

        // Tombol Aksi untuk Konselor
        headerActionButtons = (
            <div className="flex space-x-4">
                <button
                    onClick={() => console.log('Simulasi: Buka Halaman Metrik/Summary')}
                    className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 font-semibold text-sm rounded-full shadow-md hover:bg-gray-300 transition duration-300 transform hover:scale-105"
                >
                    <FolderCheck className="w-5 h-5 mr-2" />
                    Lihat Ringkasan Metrik
                </button>
            </div>
        );

        mainContent = (
            <>
                {/* JUDUL & SAPAAN KONSELO R */}
                <h1 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight text-gray-900">
                    Selamat Datang, <span className="text-emerald-800">{user.name || 'Konselor'}</span>!
                </h1>
                <p className="text-xl font-light text-gray-600 mb-8">
                    Antrian tinjauan CV dan dokumen yang menunggu aksi Anda.
                </p>

                {/* Search Bar */}
                <div className="mb-6 flex items-center bg-white p-3 rounded-xl shadow-lg ring-1 ring-gray-100">
                    <Search className="w-5 h-5 text-gray-400 mr-3" />
                    <input
                        type="text"
                        placeholder="Cari berdasarkan nama pengguna atau posisi..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-grow border-none focus:ring-0 p-0 text-gray-700 placeholder-gray-400 text-lg"
                    />
                </div>

                <div className="bg-white shadow-2xl ring-1 ring-gray-100 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto max-h-[70vh]">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50 sticky top-0 z-20">
                                <tr>
                                    {/* Header Tabel Konselor: No, User, Posisi, Tanggal Submit, Prioritas, Status, Aksi */}
                                    {['No', 'Pengguna/Email', 'Posisi Target', 'Tanggal Submit', 'Prioritas', 'Status', 'Aksi'].map((header) => (
                                        <th
                                            key={header}
                                            className={`px-6 py-4 text-left text-sm font-extrabold text-gray-700 uppercase tracking-wider whitespace-nowrap ${header === 'Aksi' ? 'w-48 text-center' : header === 'Prioritas' ? 'w-24' : ''}`}
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={7}><LoadingSpinner /></td>
                                    </tr>
                                ) : dataTinjauan.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="text-center py-20 bg-white">
                                            <h3 className="mt-4 text-xl font-semibold text-gray-900">Antrian Tinjauan Kosong! 🎉</h3>
                                            <p className="mt-1 text-md text-gray-500">
                                                Tidak ada CV yang menunggu *review* saat ini.
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    dataWithNo.map((item) => (
                                        <tr key={item.id} className="hover:bg-emerald-50/50 transition duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{item.no}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 font-medium max-w-xs truncate">{item.user}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{item.posisi}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.tanggalSubmit}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <span
                                                    className={`px-3 py-1 inline-flex text-xs leading-5 rounded-full ${item.prioritas === 'Tinggi' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}
                                                >
                                                    {item.prioritas}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 inline-flex text-xs leading-5 rounded-full ${getStatusStyle(item.status)}`}>
                                                    {item.status}
                                                </span>
                                            </td>

                                            {/* KOLOM AKSI KONSELOR */}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center justify-center space-x-2">

                                                    {item.status === 'Menunggu Review' && (
                                                        <button
                                                            onClick={() => handleReviewAction(item)}
                                                            className="flex items-center p-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition text-xs font-semibold shadow-md flex-shrink-0"
                                                            title="Mulai Review CV"
                                                        >
                                                            <Clock className="w-4 h-4 mr-1" />
                                                            Mulai Review
                                                        </button>
                                                    )}

                                                    {(item.status === 'Sedang Dikerjakan' || item.status === 'Perlu Tindak Lanjut') && (
                                                        <button
                                                            onClick={() => handleMarkCompleteAction(item)}
                                                            className="flex items-center p-2 text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition text-xs font-semibold shadow-md flex-shrink-0"
                                                            title="Tandai Review Selesai"
                                                        >
                                                            <CheckCircle className="w-4 h-4 mr-1" />
                                                            Tandai Selesai
                                                        </button>
                                                    )}

                                                    {/* Tombol Lihat Detail (selalu ada) */}
                                                    <button
                                                        onClick={() => setDetailId(item.id)}
                                                        className="p-1 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-100 transition flex-shrink-0"
                                                        title="Lihat Detail Pengajuan"
                                                    >
                                                        <Search className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                            {/* END KOLOM AKSI KONSELOR */}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                        {isLoading && <LoadingSpinner />}
                    </div>

                    <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                        <p className="text-sm text-gray-500">
                            Dashboard Konselor: Fokus pada antrian dan aksi Review atau Selesaikan.
                        </p>
                    </div>
                </div>
            </>
        );

    }
    // --- TAMPILAN MAHASISWA/PENGGUNA ---
    else if (detailId !== null) {
        // TAMPILKAN DETAIL SUBMISSION
        const selectedItem = dataTinjauan.find(item => item.id === detailId);
        mainContent = (
            <div className="bg-white shadow-2xl ring-1 ring-gray-100 rounded-xl p-8">
                <DetailSubmission
                    submissionData={selectedItem}
                    onBack={() => setDetailId(null)}
                    isCounselor={false}
                />
            </div>
        );

    } else if (isFormVisible) {
        mainContent = (
            <FormUnggahCv onFormSubmit={handleFormSubmit} onCancel={() => setIsFormVisible(false)} />
        );
    } else {
    
        // Tombol Aksi untuk Mahasiswa
        headerActionButtons = (
            <button
                onClick={handleUnggahCv}
                className="flex items-center px-6 py-3 bg-emerald-800 text-white font-bold text-base rounded-full shadow-lg hover:bg-emerald-700 transition duration-300 transform hover:scale-105 disabled:opacity-50"
                disabled={isLoading || isFormVisible}
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                Unggah CV Baru
            </button>
        );

        mainContent = (
            <>
                {/* JUDUL & SAPAAN MAHASISWA */}
                <h1 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight text-gray-900">
                    Halo, <span className="text-emerald-800">{user.name || 'Mahasiswa'}</span>!
                </h1>
                <p className="text-xl font-light text-gray-600 mb-8">
                    Status riwayat tinjauan dokumen Anda.
                </p>

                <div className="bg-white shadow-2xl ring-1 ring-gray-100 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto max-h-[70vh]">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50 sticky top-0 z-20">
                                <tr>
                                    {['No', 'Media Dokumen', 'Posisi Target', 'Keterangan', 'Status', 'Hasil', 'Aksi'].map((header) => (
                                        <th
                                            key={header}
                                            className={`px-6 py-4 text-left text-sm font-extrabold text-gray-700 uppercase tracking-wider whitespace-nowrap ${header === 'Hasil' ? 'w-40 text-center' : header === 'Aksi' ? 'w-24 text-center' : ''}`}
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={7}><LoadingSpinner /></td>
                                    </tr>
                                ) : dataTinjauan.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="text-center py-20 bg-white">
                                            <svg className="w-14 h-14 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 17h18M5 17h14M12 15V3M7 7h10"></path></svg>
                                            <h3 className="mt-4 text-xl font-semibold text-gray-900">Riwayat Kosong</h3>
                                            <p className="mt-1 text-md text-gray-500">
                                                Belum ada tinjauan CV. Klik tombol **"Unggah CV Baru"** di atas untuk memulai.
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    dataWithNo.map((item) => (
                                        <tr key={item.id} className="hover:bg-green-50/50 transition duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{item.no}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">{item.media}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{item.posisi}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{item.keterangan}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`px-3 py-1 inline-flex text-xs leading-5 rounded-full ${getStatusStyle(item.status)}`}
                                                >
                                                    {item.status}
                                                </span>
                                            </td>

                                            {/* KOLOM HASIL (Mahasiswa) */}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center justify-center">
                                                    {(() => {
                                                        switch (item.status) {
                                                            case 'Selesai':
                                                                return (
                                                                    <button
                                                                        onClick={() => handleLihatHasil(item)}
                                                                        className="flex items-center p-2 text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition text-xs font-semibold shadow-md flex-shrink-0"
                                                                        title="Lihat Hasil Tinjauan"
                                                                    >
                                                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                                                        Lihat Hasil
                                                                    </button>
                                                                );
                                                            case 'Revisi':
                                                                return (
                                                                    <button
                                                                        onClick={() => handleLihatHasil(item)}
                                                                        className="flex items-center p-2 text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition text-xs font-semibold shadow-md flex-shrink-0"
                                                                        title="Cek Feedback Revisi"
                                                                    >
                                                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                                                        Cek Feedback
                                                                    </button>
                                                                );
                                                            case 'Diproses':
                                                                return (
                                                                    <span className="text-gray-900 font-bold flex-shrink-0 min-w-[70px] flex justify-center items-center">
                                                                        -
                                                                    </span>
                                                                );
                                                            default:
                                                                return (
                                                                    <span className="text-gray-900 font-bold flex-shrink-0 min-w-[70px] flex justify-center items-center">
                                                                        {item.hasil}
                                                                    </span>
                                                                );
                                                        }
                                                    })()}
                                                </div>
                                            </td>

                                            {/* KOLOM AKSI (Mahasiswa) */}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center justify-end space-x-2">

                                                    {/* Tombol Edit (Pensil) */}
                                                    <button
                                                        onClick={() => setModal({ isVisible: true, type: 'edit', id: item.id })}
                                                        className="p-1 text-indigo-600 hover:text-indigo-800 rounded-full hover:bg-indigo-50 transition flex-shrink-0"
                                                        title="Edit Detail Tinjauan"
                                                    >
                                                        <Edit className="w-5 h-5" />
                                                    </button>

                                                    {/* Tombol Hapus (Tempat Sampah) */}
                                                    <button
                                                        onClick={() => setModal({ isVisible: true, type: 'delete', id: item.id })}
                                                        className="p-1 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50 transition flex-shrink-0"
                                                        title="Hapus Tinjauan"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                            {/* END KOLOM AKSI MAHASISWA */}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                        {isLoading && <LoadingSpinner />}
                    </div>

                    <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                        <p className="text-sm text-gray-500">
                            Catatan: Kolom **Hasil** menampilkan tombol aksi terkait (**Lihat Hasil** atau **Cek Feedback**) jika status telah selesai atau membutuhkan revisi.
                        </p>
                    </div>
                </div>
            </>
        );
    }

    // RENDER UTAMA
    return (
        <MainLayout>
            <div
                className="fixed inset-0 -z-10"
                style={{
                    backgroundImage: 'url("/images/bg-dreamina.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed'
                }}
            >
            </div>

            <div className="relative z-10 min-h-screen pt-12 pb-20">
                <div className="container mx-auto px-4 max-w-7xl">

                    {/* HEADER INTERAKTIF - Tombol Kembali & Aksi Utama */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">

                        {/* Tombol Kembali */}
                        <button
                            onClick={handleKembali}
                            className="flex items-center text-gray-500 hover:text-emerald-800 transition duration-200 font-medium text-sm"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            {detailId !== null ? 'Kembali ke Tabel' : 'Kembali ke Halaman Sebelumnya'}
                        </button>

                        {/* Tombol Aksi Utama (Unggah/Lihat Metrik) */}
                        {detailId === null && !isFormVisible && headerActionButtons}
                    </div>

                    {/* Konten Utama: Form, Tabel, atau DetailSubmission */}
                    {mainContent}
                </div>
            </div>

            {/* Modal Konfirmasi Hapus (Mahasiswa) */}
            <Modal
                isVisible={modal.isVisible && modal.type === 'delete'}
                title="Konfirmasi Penghapusan"
                onClose={() => setModal({ isVisible: false, type: null, id: null })}
            >
                <p className="text-gray-600 mb-6">Apakah Anda yakin ingin menghapus riwayat tinjauan ID #{modal.id}? Tindakan ini tidak dapat dibatalkan.</p>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={() => setModal({ isVisible: false, type: null, id: null })}
                        className="px-4 py-2 text-sm font-semibold rounded-lg text-gray-600 hover:bg-gray-100 transition"
                    >
                        Batal
                    </button>
                    <button
                        onClick={confirmDelete}
                        className="px-4 py-2 text-sm font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                    >
                        Hapus Permanen
                    </button>
                </div>
            </Modal>

            {/* Modal Konfirmasi Edit (Simulasi Mahasiswa) */}
            <Modal
                isVisible={modal.isVisible && modal.type === 'edit'}
                title="Edit Tinjauan"
                onClose={() => setModal({ isVisible: false, type: null, id: null })}
            >
                <p className="text-gray-600 mb-6">Fitur Edit untuk ID #{modal.id} sedang dikembangkan. Untuk sementara, ini hanya sebagai simulasi modal konfirmasi.</p>
                <div className="flex justify-end">
                    <button
                        onClick={() => setModal({ isVisible: false, type: null, id: null })}
                        className="px-4 py-2 text-sm font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                    >
                        Tutup
                    </button>
                </div>
            </Modal>

            {/* Modal Konfirmasi Review (Konselor) */}
            <Modal
                isVisible={modal.isVisible && modal.type === 'review'}
                title={`Mulai Review: ID #${modal.id}`}
                onClose={() => setModal({ isVisible: false, type: null, id: null })}
            >
                <p className="text-gray-600 mb-6">Anda akan mulai mereview CV untuk {modal.item?.user}. Status tinjauan akan berubah menjadi Sedang Dikerjakan.</p>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={() => setModal({ isVisible: false, type: null, id: null })}
                        className="px-4 py-2 text-sm font-semibold rounded-lg text-gray-600 hover:bg-gray-100 transition"
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        onClick={() => confirmReview(modal.id)}
                        className="px-4 py-2 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                        Konfirmasi & Mulai
                    </button>

                </div>
            </Modal>

            {/* Modal Konfirmasi Selesai (Konselor) */}
            <Modal
                isVisible={modal.isVisible && modal.type === 'complete'}
                title={`Selesaikan Review: ID #${modal.id}`}
                onClose={() => setModal({ isVisible: false, type: null, id: null })}
            >
                <p className="text-gray-600 mb-6">Pastikan semua umpan balik telah diberikan. Tindakan ini akan menandai review sebagai **Selesai** dan mengirim notifikasi hasil kepada pengguna.</p>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={() => setModal({ isVisible: false, type: null, id: null })}
                        className="px-4 py-2 text-sm font-semibold rounded-lg text-gray-600 hover:bg-gray-100 transition"
                    >
                        Cek Ulang
                    </button>
                    <button
                        onClick={confirmComplete}
                        className="px-4 py-2 text-sm font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
                    >
                        Tandai Selesai & Kirim
                    </button>
                </div>
            </Modal>


            <Footer />
        </MainLayout>
    );
};

export default TabelCvReview;