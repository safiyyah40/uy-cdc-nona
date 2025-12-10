import React, { useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import Footer from "@/Components/Footer";
import { Head, Link, router, usePage } from "@inertiajs/react"; 
import { ChevronLeft, Clock, Trash2, Eye, Calendar, User } from "lucide-react";

// Helper Status Color
const getStatusColor = (status) => {
    switch (status) {
        case 'pending': return "bg-yellow-100 text-yellow-800 border-yellow-200";
        case 'accepted': return "bg-emerald-100 text-emerald-800 border-emerald-200";
        case 'completed': return "bg-blue-100 text-blue-800 border-blue-200";
        case 'rejected': return "bg-red-100 text-red-800 border-red-200";
        case 'cancelled': return "bg-gray-100 text-gray-600 border-gray-200";
        default: return "bg-gray-100 text-gray-800";
    }
};

// Helper Status Label Indonesia
const getStatusLabel = (status) => {
    const map = {
        'pending': 'Menunggu Persetujuan',
        'accepted': 'Disetujui',
        'completed': 'Selesai',
        'rejected': 'Ditolak',
        'cancelled': 'Dibatalkan'
    };
    return map[status] || status;
};

const UserCounselingList = ({ bookings = [] }) => {
    const { auth, flash } = usePage().props;
    const user = auth.user;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookingToDelete, setBookingToDelete] = useState(null);

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
                onSuccess: () => {
                    closeDeleteModal();
                }
            });
        }
    };

    return (
        <MainLayout user={user}>
            <Head title="Riwayat Konseling Saya" />

            <div className="bg-gray-50 min-h-screen py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-[#004d40] font-serif">Riwayat Konseling</h1>
                            <p className="text-gray-600 mt-1">Pantau status pengajuan dan jadwal konsultasi Anda.</p>
                        </div>
                        <Link 
                            href={route('layanan.konsultasi')} 
                            className="inline-flex items-center px-6 py-3 bg-[#004d40] text-white rounded-xl font-bold shadow-md hover:bg-[#00382e] transition transform hover:-translate-y-1"
                        >
                            <ChevronLeft className="w-5 h-5 mr-2" /> Buat Sesi Baru
                        </Link>
                    </div>

                    {/* Flash Message */}
                    {flash.success && (
                        <div className="mb-6 p-4 bg-emerald-100 border border-emerald-200 text-emerald-800 rounded-xl flex items-center shadow-sm">
                            <span className="font-bold mr-2">Berhasil!</span> {flash.success}
                        </div>
                    )}
                    {flash.error && (
                        <div className="mb-6 p-4 bg-red-100 border border-red-200 text-red-800 rounded-xl flex items-center shadow-sm">
                            <span className="font-bold mr-2">Error!</span> {flash.error}
                        </div>
                    )}

                    {/* Table Content */}
                    {!bookings || bookings.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-300 shadow-sm">
                            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Calendar className="w-10 h-10 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Belum Ada Riwayat</h3>
                            <p className="text-gray-500 mb-6">Anda belum pernah mengajukan jadwal konsultasi.</p>
                            <Link href={route('layanan.konsultasi')} className="text-[#004d40] font-bold hover:underline">
                                Ajukan Jadwal Sekarang
                            </Link>
                        </div>
                    ) : (
                        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-8 py-5 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">Topik</th>
                                            <th className="px-8 py-5 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">Jadwal</th>
                                            <th className="px-8 py-5 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">Konselor</th>
                                            <th className="px-8 py-5 text-center text-sm font-bold text-gray-600 uppercase tracking-wider">Status</th>
                                            <th className="px-8 py-5 text-center text-sm font-bold text-gray-600 uppercase tracking-wider">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {bookings.map((booking) => (
                                            <tr key={booking.id} className="hover:bg-gray-50 transition duration-150">
                                                <td className="px-8 py-6">
                                                    <div className="text-base font-bold text-gray-900">{booking.topic}</div>
                                                    <div className="text-sm text-gray-500 mt-1 line-clamp-1 italic">"{booking.notes || 'Tidak ada catatan'}"</div>
                                                </td>
                                                <td className="px-8 py-6 whitespace-nowrap">
                                                    <div className="flex items-center text-gray-700 font-medium">
                                                        <Clock className="w-4 h-4 mr-2 text-[#004d40]" />
                                                        {booking.schedule} WIB
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 whitespace-nowrap">
                                                    <div className="flex items-center text-gray-900 font-semibold">
                                                        <User className="w-4 h-4 mr-2 text-gray-400" />
                                                        {booking.counselor_name}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 whitespace-nowrap text-center">
                                                    <span className={`px-4 py-1.5 inline-flex text-xs leading-5 font-bold uppercase tracking-wide rounded-full border ${getStatusColor(booking.status)}`}>
                                                        {getStatusLabel(booking.status)}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 whitespace-nowrap text-center">
                                                    <div className="flex items-center justify-center gap-3">
                                                        {/* 1. TOMBOL DETAIL (Mata) */}
                                                        <Link
                                                            href={route('konsultasi.show', booking.id)}
                                                            className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-800 transition shadow-sm border border-blue-100"
                                                            title="Lihat Detail & Laporan"
                                                        >
                                                            <Eye className="w-5 h-5" />
                                                        </Link>

                                                        {/* 2. TOMBOL BATAL (Sampah) - Hanya jika pending */}
                                                        {booking.can_cancel && (
                                                            <button
                                                                onClick={() => openDeleteModal(booking.id)}
                                                                className="flex items-center justify-center w-10 h-10 rounded-full bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-800 transition shadow-sm border border-red-100"
                                                                title="Batalkan Permintaan"
                                                            >
                                                                <Trash2 className="w-5 h-5" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Konfirmasi Batal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto px-4 py-6 sm:px-0">
                    <div className="fixed inset-0 transition-opacity" onClick={closeDeleteModal}>
                        <div className="absolute inset-0 bg-gray-900 opacity-60 backdrop-blur-sm"></div>
                    </div>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-2xl transform transition-all sm:max-w-md w-full p-8 text-center relative z-10">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
                            <Trash2 className="h-8 w-8 text-red-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Batalkan Konsultasi?</h3>
                        <p className="text-gray-600 mb-8">
                            Tindakan ini tidak dapat dibatalkan. Slot jadwal akan kembali dibuka untuk mahasiswa lain.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button 
                                onClick={closeDeleteModal} 
                                className="w-full sm:w-auto px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition"
                            >
                                Kembali
                            </button>
                            <button 
                                onClick={confirmDelete} 
                                className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 shadow-lg transition"
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