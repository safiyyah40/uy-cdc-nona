import React from 'react';
import MainLayout from "@/Layouts/MainLayout";
import Footer from "@/Components/Footer";
import { Head, Link, usePage } from "@inertiajs/react";
import { Calendar, Clock, BookOpen, Users, ArrowLeft, Eye } from 'lucide-react';

const TableKonsultasiKonselor = ({ consultations }) => { 
    const { auth, flash } = usePage().props;
    const user = auth.user;

    const getStatusBadge = (status) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
            accepted: 'bg-green-100 text-green-800 border border-green-200',
            completed: 'bg-blue-100 text-blue-800 border border-blue-200',
            rejected: 'bg-red-100 text-red-800 border border-red-200',
            cancelled: 'bg-gray-100 text-gray-600 border border-gray-200',
        };
        const labels = {
            pending: 'Menunggu',
            accepted: 'Disetujui',
            completed: 'Selesai',
            rejected: 'Ditolak',
            cancelled: 'Dibatalkan',
        };
        return (
            <span className={`px-4 py-1.5 inline-flex text-sm leading-5 font-bold rounded-full ${styles[status] || styles.pending}`}>
                {labels[status] || status}
            </span>
        );
    };

    return (
        <MainLayout user={user}>
            <Head title="Dashboard Konselor" />

            <div className="bg-gray-50 min-h-screen py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    
                    {/* Tombol Kembali ke Dashboard Utama Slot */}
                    <div className="mb-8">
                        <Link 
                            href={route('konselor.dashboard')} 
                            className="inline-flex items-center text-gray-600 hover:text-[#004d40] font-bold text-lg transition-colors px-4 py-2 rounded-lg hover:bg-white"
                        >
                            <ArrowLeft className="w-6 h-6 mr-2" /> Kembali ke Manajemen Jadwal
                        </Link>
                    </div>

                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-extrabold text-[#004d40] font-serif mb-3">
                            Daftar Sesi Konsultasi Masuk
                        </h1>
                        <p className="text-gray-600 text-lg">Halo, {user.name}. Berikut adalah daftar mahasiswa yang mengajukan konsultasi.</p>
                    </div>

                    {flash.success && (
                        <div className="mb-8 bg-green-100 border-l-4 border-green-500 text-green-800 px-6 py-4 rounded-lg shadow-sm text-lg" role="alert">
                            <p className="font-bold">Sukses!</p>
                            <p>{flash.success}</p>
                        </div>
                    )}

                    {/* Stats Card */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <div className="bg-white p-8 rounded-2xl shadow-lg border-l-8 border-[#004d40] flex justify-between items-center transform hover:scale-105 transition-transform duration-300">
                            <div>
                                <p className="text-gray-500 text-base font-semibold uppercase tracking-wide">Total Sesi Konsultasi</p>
                                <p className="text-4xl font-extrabold text-gray-900 mt-1">{consultations.length}</p>
                            </div>
                            <div className="p-4 bg-emerald-100 rounded-full">
                                <BookOpen className="text-[#004d40] w-10 h-10"/>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-lg border-l-8 border-yellow-400 flex justify-between items-center transform hover:scale-105 transition-transform duration-300">
                            <div>
                                <p className="text-gray-500 text-base font-semibold uppercase tracking-wide">Menunggu Respon</p>
                                <p className="text-4xl font-extrabold text-gray-900 mt-1">{consultations.filter(c => c.status === 'pending').length}</p>
                            </div>
                            <div className="p-4 bg-yellow-100 rounded-full">
                                <Clock className="text-yellow-600 w-10 h-10"/>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-lg border-l-8 border-blue-400 flex justify-between items-center transform hover:scale-105 transition-transform duration-300">
                            <div>
                                <p className="text-gray-500 text-base font-semibold uppercase tracking-wide">Jadwal Disetujui</p>
                                <p className="text-4xl font-extrabold text-gray-900 mt-1">{consultations.filter(c => c.status === 'accepted').length}</p>
                            </div>
                            <div className="p-4 bg-blue-100 rounded-full">
                                <Calendar className="text-blue-600 w-10 h-10"/>
                            </div>
                        </div>
                    </div>

                    {/* TABEL */}
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                        <div className="p-8 bg-white border-b border-gray-200 flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                                <div className="p-2 bg-gray-100 rounded-lg"><Users className="w-6 h-6 text-gray-700"/></div>
                                Riwayat & Permintaan
                            </h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-8 py-5 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">Mahasiswa</th>
                                        <th className="px-8 py-5 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">Topik</th>
                                        <th className="px-8 py-5 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">Jadwal</th>
                                        <th className="px-8 py-5 text-center text-sm font-bold text-gray-600 uppercase tracking-wider">Status</th>
                                        <th className="px-8 py-5 text-right text-sm font-bold text-gray-600 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {consultations.length > 0 ? consultations.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50 transition duration-150">
                                            <td className="px-8 py-6 whitespace-nowrap">
                                                <div className="text-lg font-bold text-gray-900">{item.user_name}</div>
                                                <div className="text-sm text-gray-500 mt-1">Diajukan: {item.created_at}</div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="text-base text-gray-700 font-medium max-w-xs truncate">{item.topic}</div>
                                            </td>
                                            <td className="px-8 py-6 whitespace-nowrap">
                                                <div className="flex items-center text-base text-gray-700 font-semibold">
                                                    <Calendar className="w-4 h-4 mr-2 text-gray-400"/> {item.date}
                                                </div>
                                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                                    <Clock className="w-4 h-4 mr-2 text-gray-400"/> {item.time} WIB
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 whitespace-nowrap text-center">
                                                {getStatusBadge(item.status)}
                                            </td>
                                            <td className="px-8 py-6 whitespace-nowrap text-right text-sm font-medium">
                                                <Link
                                                    href={route('konselor.konsultasi.show', item.id)}
                                                    className="inline-flex items-center px-5 py-2.5 bg-white border-2 border-[#004d40] text-[#004d40] text-base font-bold rounded-xl hover:bg-[#004d40] hover:text-white transition shadow-sm"
                                                >
                                                    <Eye className="w-5 h-5 mr-2"/> Detail
                                                </Link>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="5" className="px-8 py-16 text-center">
                                                <div className="flex flex-col items-center justify-center text-gray-400">
                                                    <BookOpen className="w-16 h-16 mb-4 opacity-50"/>
                                                    <p className="text-xl font-medium">Belum ada data konsultasi masuk.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </MainLayout>
    );
};

export default TableKonsultasiKonselor;