import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';
import Footer from '../../Components/Footer';
import FormUnggahCv from './FormUnggahCv';
import DetailSubmission from './DetailSubmission';

// Struktur Data Dummy Awal
const initialData = [
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
        linkHasil: '/layanan/tinjauan/3/revisi'
    },
];

const NAMA_PENGGUNA = "Budi Santoso";

// Komponen Sederhana untuk Loading State (Tambahan untuk UX)
const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-10">
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#004d40]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="text-gray-600">Memuat data...</span>
    </div>
);

// Komponen Modal Sederhana untuk Konfirmasi (Simulasi)
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

const TabelCvReview = () => {
    const [dataTinjauan, setDataTinjauan] = useState(initialData);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [detailId, setDetailId] = useState(null);
    const [modal, setModal] = useState({ isVisible: false, type: null, id: null });

    const handleKembali = () => {
        if (detailId !== null) {
            setDetailId(null);
        } else {
            router.back();
        }
    };

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

    const handleEdit = (id) => {
        setModal({ isVisible: true, type: 'edit', id });
    };

    const handleDelete = (id) => {
        setModal({ isVisible: true, type: 'delete', id });
    };
   
    // PERUBAHAN: Fungsi handleLihatHasil (Notifikasi alert dihapus)
    const handleLihatHasil = (item) => {
        if (item.linkHasil && item.status === 'Selesai') {
            setDetailId(item.id);
           
        } else if (item.linkHasil && item.status === 'Revisi') {
            console.log(`Simulasi: Membuka link Revisi tinjauan: ${item.linkHasil}`);
        } else {
            console.log(`Link ${item.status.toLowerCase()} tidak ditemukan atau belum tersedia.`);
        }
    };

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
            case 'Selesai':
                return 'bg-emerald-100 text-emerald-800 font-semibold';
            case 'Diproses':
                return 'bg-blue-100 text-blue-800 font-semibold';
            case 'Revisi':
                return 'bg-red-100 text-red-800 font-semibold';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const dataWithNo = dataTinjauan.map((item, index) => ({
        ...item,
        no: index + 1
    }));
   
    // Fungsi untuk merender konten di kolom Hasil
    const renderHasilContent = (item) => {
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
                // Digunakan untuk fallback jika ada status lain yang tidak terduga
                return (
                    <span className="text-gray-900 font-bold flex-shrink-0 min-w-[70px] flex justify-center items-center">
                        {item.hasil}
                    </span>
                );
        }
    };

    const EmptyTableRow = () => (
        <tr>
            <td colSpan={7} className="text-center py-20 bg-white">
                <svg className="w-14 h-14 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 17h18M5 17h14M12 15V3M7 7h10"></path></svg>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">Riwayat Kosong</h3>
                <p className="mt-1 text-md text-gray-500">
                    Belum ada tinjauan CV. Klik tombol **"Unggah CV Baru"** di atas untuk memulai.
                </p>
            </td>
        </tr>
    );

    // Tentukan konten utama yang akan ditampilkan
    let mainContent;

    if (detailId !== null) {
        // TAMPILKAN DETAIL SUBMISSION
        const selectedItem = dataTinjauan.find(item => item.id === detailId);
       
        mainContent = (
            <div className="bg-white shadow-2xl ring-1 ring-gray-100 rounded-xl p-8">
                {/* Simulasi DetailSubmission */}
                <DetailSubmission submissionData={selectedItem} onBack={() => setDetailId(null)} />
            </div>
        );
       
    } else if (isFormVisible) {
        // TAMPILKAN FORM UNGGAH CV
        mainContent = (
            <FormUnggahCv onFormSubmit={handleFormSubmit} onCancel={() => setIsFormVisible(false)} />
        );
    } else {
        // TAMPILKAN TABEL RIWAYAT
        mainContent = (
            <>
                {/* JUDUL & SAPAAN */}
                <h1 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight text-gray-900">
                    Halo, <span className="text-[#004d40]">{NAMA_PENGGUNA}</span> !
                </h1>
                <p className="text-xl font-light text-gray-600 mb-8">
                    Status riwayat tinjauan dokumen Anda.
                </p>

                <div className="bg-white shadow-2xl ring-1 ring-gray-100 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto max-h-[70vh]">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50 sticky top-0 z-20">
                                <tr>
                                    {/* Header Tabel, sekarang ada 7 kolom: No, Media, Posisi, Keterangan, Status, Hasil, Aksi */}
                                    {['No', 'Media Dokumen', 'Posisi Target', 'Keterangan', 'Status', 'Hasil', 'Aksi'].map((header) => (
                                        <th
                                            key={header}
                                            // Mengatur lebar kolom Hasil dan Aksi
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
                                    <EmptyTableRow />
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
                                           
                                            {/* KOLOM HASIL (Tombol/Strip, RATA TENGAH) */}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center justify-center">
                                                    {renderHasilContent(item)}
                                                </div>
                                            </td>
                                           
                                            {/* KOLOM AKSI BARU (Edit & Hapus, RATA KANAN) */}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center justify-end space-x-2">
                                                   
                                                    {/* Tombol Edit (Pensil) */}
                                                    <button
                                                        onClick={() => handleEdit(item.id)}
                                                        className="p-1 text-indigo-600 hover:text-indigo-800 rounded-full hover:bg-indigo-50 transition flex-shrink-0"
                                                        title="Edit Detail Tinjauan"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                                    </button>
                                                   
                                                    {/* Tombol Hapus (Tempat Sampah) */}
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="p-1 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50 transition flex-shrink-0"
                                                        title="Hapus Tinjauan"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                    </button>
                                                </div>
                                            </td>
                                            {/* END KOLOM AKSI BARU */}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                        {isLoading && <LoadingSpinner />}
                    </div>

                    {/* Footer/Informasi Tambahan Tabel */}
                    <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                        <p className="text-sm text-gray-500">
                            Catatan: Kolom **Hasil** menampilkan tombol aksi terkait (**Lihat Hasil** atau **Cek Feedback**) jika status telah selesai atau membutuhkan revisi.
                        </p>
                    </div>
                </div>
            </>
        );
    }
   

    return (
        <MainLayout>
            {/* Latar Belakang */}
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

                    {/* HEADER INTERAKTIF - Tombol Kembali & Tombol Unggah CV */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                        {detailId === null && (
                            <button
                                onClick={handleKembali}
                                className="flex items-center text-gray-500 hover:text-[#004d40] transition duration-200 font-medium text-sm"
                            >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                                </svg>
                                Kembali ke Halaman Sebelumnya
                            </button>
                        )}
                                               
                        {/* Tombol Unggah hanya muncul di tampilan Tabel */}
                        {detailId === null && !isFormVisible && (
                            <button
                                onClick={handleUnggahCv}
                                className="flex items-center px-6 py-3 bg-[#004d40] text-white font-bold text-base rounded-full shadow-lg hover:bg-green-700 transition duration-300 transform hover:scale-105 disabled:opacity-50"
                                disabled={isLoading || isFormVisible}
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                Unggah CV Baru
                            </button>
                        )}
                    </div>

                    {/* Konten Utama: Form, Tabel, atau DetailSubmission */}
                    {mainContent}
                </div>
            </div>

            {/* Modal Konfirmasi Hapus */}
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

            {/* Modal Konfirmasi Edit (Simulasi) */}
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

            <Footer />
        </MainLayout>
    );
};

export default TabelCvReview;
