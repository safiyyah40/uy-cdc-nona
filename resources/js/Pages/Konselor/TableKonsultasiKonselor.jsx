import React from 'react';
import MainLayout from "@/Layouts/MainLayout";
import Footer from "@/Components/Footer";
import { Head, Link, usePage } from "@inertiajs/react";
import { Calendar, Clock, BookOpen, Users, LogOut } from 'lucide-react';

const mapStatusToIndonesian = (status) => {
    switch (status.toLowerCase()) {
        case 'pending':
            return 'Tertunda';
        case 'accepted':
            return 'Diterima';
        case 'completed':
            return 'Selesai';
        case 'rejected':
            return 'Ditolak';
        default:
            return 'Tidak Diketahui';
    }
};

const TableKonsultasiKonselor = ({ consultations = [] }) => {
    const { auth } = usePage().props;
    const user = auth.user;

    const dummyConsultations = [
        { id: 1, user_name: 'Budi Santoso', topic: 'Masalah Skripsi', date: '2025-12-10', time: '10:00', status: 'Pending' },
        { id: 2, user_name: 'Siti Aminah', topic: 'Pilihan Mata Kuliah', date: '2025-12-10', time: '14:30', status: 'Accepted' },
        { id: 3, user_name: 'Joko Susilo', topic: 'Karir Setelah Lulus', date: '2025-12-11', time: '09:00', status: 'Completed' },
        { id: 4, user_name: 'Dian Novita', topic: 'Rencana Studi', date: '2025-12-11', time: '16:00', status: 'Rejected' },
    ];

    const dataToShow = consultations.length > 0 ? consultations : dummyConsultations;

    const getStatusBadge = (status) => {
        let colorClass = '';
        switch (status.toLowerCase()) {
            case 'pending':
                colorClass = 'bg-yellow-100 text-yellow-800';
                break;
            case 'accepted':
                colorClass = 'bg-[#00CA65]/10 text-[#004d40] font-bold';
                break;
            case 'completed':
                colorClass = 'bg-blue-100 text-blue-800';
                break;
            case 'rejected':
                colorClass = 'bg-red-100 text-red-800';
                break;
            default:
                colorClass = 'bg-gray-100 text-gray-800';
        }

        const statusInIndonesian = mapStatusToIndonesian(status);

        return (
            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClass}`}>
                {statusInIndonesian}
            </span>
        );
    };

    const renderActions = (item) => {
        const isPending = item.status.toLowerCase() === 'pending';

        return (
            <div className="flex flex-col space-y-1 items-end">
                {/* 1. Tombol Lihat: Menggunakan route helper untuk navigasi */}
                <Link
                    href={route('konselor.konsultasi.show', item.id)} // Menggunakan route yang benar
                    className="text-sm font-semibold px-3 py-1 w-full text-center rounded-xl border border-gray-300 bg-gray-50 text-gray-800 hover:bg-gray-200 transition"
                >
                    Lihat
                </Link>

                {/* 2. Tombol Aksi (Hanya Muncul jika Status Pending) */}
                {isPending && (
                    <>
                        {/* Tombol Setujui */}
                        <Link
                            href={route('konselor.approve', item.id)} // Route dummy
                            method="post"
                            as="button"
                            className="text-sm font-semibold px-3 py-1 w-full text-center rounded-xl bg-[#00CA65] text-black hover:bg-[#009c50] transition"
                        >
                            Setujui
                        </Link>

                        {/* Tombol Tolak */}
                        <Link
                            href={route('konselor.reject', item.id)} // Route dummy
                            method="post"
                            as="button"
                            className="text-sm font-semibold px-3 py-1 w-full text-center rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
                        >
                            Tolak
                        </Link>
                    </>
                )}
            </div>
        );
    };

    return (
        <MainLayout user={user}>
            <Head title="Dashboard Konselor" />

            <div className="bg-gray-50 min-h-screen py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

                    {/* Header Dashboard */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-extrabold text-[#004d40] font-serif mb-2">
                            👋 Selamat Datang, {user?.name || "Konselor"}!
                        </h1>
                        <p className="text-gray-600">
                            Berikut adalah daftar konsultasi yang Anda miliki.
                        </p>
                    </div>

                    {/* Quick Stats/Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        {/* Card 1 */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Sesi Bulan Ini</p>
                                <p className="text-3xl font-bold text-gray-900">12</p>
                            </div>
                            <Calendar className="w-8 h-8 text-[#00CA65]" />
                        </div>
                        {/* Card 2 */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Menunggu Persetujuan</p>
                                <p className="text-3xl font-bold text-gray-900">2</p>
                            </div>
                            <Clock className="w-8 h-8 text-yellow-500" />
                        </div>
                        {/* Card 3 */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Siswa Konsultasi</p>
                                <p className="text-3xl font-bold text-gray-900">8</p>
                            </div>
                            <Users className="w-8 h-8 text-blue-500" />
                        </div>
                    </div>

                    {/* Tabel Konsultasi */}
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                        <div className="p-6 md:p-8 bg-[#004d40] flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <BookOpen className="w-6 h-6"/> Jadwal Konsultasi Saya
                            </h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Siswa</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topik</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal & Waktu</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {dataToShow.map((item, index) => (
                                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {item.user_name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {item.topic}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {item.date} pukul {item.time}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getStatusBadge(item.status)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                {renderActions(item)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {dataToShow.length === 0 && (
                                <div className="text-center py-10 text-gray-500">
                                    Belum ada data konsultasi.
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </MainLayout>
    );
};

export default TableKonsultasiKonselor;
