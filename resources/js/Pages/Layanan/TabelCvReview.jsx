import React, { useState } from 'react'; // Tambahkan useState
import { router } from '@inertiajs/react'; 
import MainLayout from '../../Layouts/MainLayout';
import Footer from '../../Components/Footer'; 
import FormUnggahCv from './FormUnggahCv'; // Import FormUnggahCv

const initialData = []; 

const NAMA_PENGGUNA = "Budi Santoso"; 

const TabelCvReview = () => {

    const [dataTinjauan, setDataTinjauan] = useState(initialData); 
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleKembali = () => {
        router.back();
    };

    const handleUnggahCv = () => {
        setIsFormVisible(true);
    };
  
    const handleFormSubmit = (newData) => {
        setDataTinjauan(prevData => [...prevData, newData]);
        setIsFormVisible(false); 
        alert("CV berhasil diunggah (simulasi)! Data sudah masuk ke riwayat.");
    };

    const handleEdit = (id) => {
        alert(`Fungsi Edit untuk ID: ${id} akan dijalankan.`);
    };

    const handleDelete = (id) => {
        if (window.confirm(`Yakin ingin menghapus tinjauan ID ${id}?`)) {
            setDataTinjauan(prevData => prevData.filter(item => item.id !== id));
            alert(`Tinjauan ID ${id} berhasil dihapus (simulasi).`);
        }
    };
    const getStatusStyle = (status) => {
        switch (status) {
            case 'Selesai':
                return 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20';
            case 'Diproses':
                return 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20';
            case 'Revisi':
                return 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20';
            default:
                return 'bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-600/20';
        }
    };

    const dataWithNo = dataTinjauan.map((item, index) => ({
        ...item,
        no: index + 1
    }));

    const EmptyTableRow = () => (
        <tr>
            <td colSpan={7} className="text-center py-16 bg-white">
                <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 17h18M5 17h14M12 15V3M7 7h10"></path></svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">Riwayat Kosong</h3>
                <p className="mt-1 text-sm text-gray-500">
                    Belum ada tinjauan CV. Klik tombol "Unggah CV Baru" di atas untuk memulai.
                </p>
            </td>
        </tr>
    );


    return (
        <MainLayout>
            <div className="fixed inset-0 bg-[url('/images/bg-dreamina.jpg')] bg-cover bg-center bg-fixed -z-10">
            </div>

            <div className="relative z-10 min-h-screen pt-12 pb-20">
                <div className="container mx-auto px-4 max-w-7xl">

                    {/* JUDUL & SAPAAN */}
                    <h1 className="text-4xl md:text-5xl font-kaisei font-extrabold mb-2 tracking-tight text-gray-900">
                         Halo, <span className="font-extraboldbold text-gray-900">{NAMA_PENGGUNA}</span> !
                    </h1>
                    <p className="text-xl font-light text-gray-500 mb-6">
                         Berikut status terbaru tinjauan dokumen Anda.
                    </p>

                    {/* HEADER INTERAKTIF: Tombol Kembali & Tombol Unggah CV */}
                    <div className="flex justify-between items-center mb-10">
                        <button
                            onClick={handleKembali}
                            className="flex items-center text-gray-500 hover:text-gray-900 transition duration-200 font-medium text-sm"
                        >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                            Kembali
                        </button>
                        
                        {/* TOMBOL UNGGAH CV */}
                        <button
                            onClick={handleUnggahCv}
                            className="flex items-center px-4 py-2 bg-[#004d40] text-white font-semibold text-sm rounded-lg shadow-md hover:bg-green-700 transition duration-300"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                            Unggah CV Baru
                        </button>
                    </div>

                    {isFormVisible ? (
                        // 1. TAMPILKAN FORMULIR UNGGAH CV
                        <FormUnggahCv onFormSubmit={handleFormSubmit} />
                    ) : (
                        // 2. TAMPILKAN TABEL RIWAYAT ATAU EMPTY STATE
                        <div className="shadow-xl ring-1 ring-gray-200 rounded-xl bg-white">
                            <div className="overflow-x-auto overflow-y-auto max-h-[60vh]">
                                <table className="min-w-full divide-y divide-gray-100">
                                    <thead className="bg-[#fcfdff] sticky top-0 z-10 shadow-sm">
                                        <tr>
                                            
                                            {['No', 'Media', 'Posisi/Target Pekerjaan', 'Keterangan', 'Status', 'Hasil Tinjauan', 'Aksi'].map((header) => (
                                                <th 
                                                    key={header}
                                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200"
                                                >
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    
                                    <tbody className="divide-y divide-gray-100">
                                        {dataTinjauan.length === 0 ? (
                                            <EmptyTableRow /> 
                                        ) : (
                                            dataWithNo.map((item) => (
                                                <tr key={item.id} className="hover:bg-gray-50 transition duration-150">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.no}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.media}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">{item.posisi}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">{item.keterangan}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span 
                                                            className={`px-3 py-1 inline-flex text-xs font-medium rounded-full ${getStatusStyle(item.status)}`}
                                                        >
                                                            {item.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-emerald-600">
                                                        {item.hasil}
                                                    </td>
                                                    
                                                    {/* KOLOM AKSI */}
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex space-x-3">
                                                            {/* Ikon Pensil (Edit) */}
                                                            <button 
                                                                onClick={() => handleEdit(item.id)}
                                                                className="text-indigo-600 hover:text-indigo-900 transition"
                                                                title="Edit Tinjauan"
                                                            >
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                                            </button>
                                                            {/* Ikon Tempat Sampah (Hapus) */}
                                                            <button 
                                                                onClick={() => handleDelete(item.id)}
                                                                className="text-red-600 hover:text-red-900 transition"
                                                                title="Hapus Tinjauan"
                                                            >
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                      
                            <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-xl">
                                <p className="text-xs text-gray-500">
                                    Data di atas adalah riwayat peninjauan CV Anda. Untuk detail lebih lanjut, hubungi layanan bantuan.
                                </p>
                            </div>
                        </div>
                    )} 
                </div>
            </div>
     
            <Footer />
        </MainLayout>
    );
};

export default TabelCvReview;