import React from "react";
import MainLayout from "@/Layouts/MainLayout";
import Footer from "@/Components/Footer";
import { Head, Link } from "@inertiajs/react";
import { ChevronLeft, Info, CheckCircle, Clock, Trash2, Edit } from "lucide-react";

// Data Dummy untuk Tabel
const dummyBookings = [
    {
        id: 1,
        topic: "Masalah Akademik (Studi, Tugas Akhir, IPK)",
        notes: "Kesulitan membagi waktu antara kuliah dan kerja sampingan.",
        schedule: "Kamis, 5 Des 2025, 10:00 WIB",
        status: "Menunggu Verifikasi",
        statusColor: "bg-yellow-100 text-yellow-800",
    },
    {
        id: 2,
        topic: "Isu Kesehatan Mental (Kecemasan, Stres, Motivasi)",
        notes: "Sering merasa cemas menjelang presentasi besar.",
        schedule: "Jumat, 6 Des 2025, 14:00 WIB",
        status: "Terverifikasi",
        statusColor: "bg-emerald-100 text-emerald-800",
    },
    {
        id: 3,
        topic: "Pengembangan Karir (Job Seeking, Skill Building)",
        notes: "Bingung memilih antara dua jalur karir yang berbeda.",
        schedule: "Rabu, 4 Des 2025, 09:00 WIB",
        status: "Selesai",
        statusColor: "bg-blue-100 text-blue-800",
    },
];

const UserCounselingList = ({ auth }) => { 
    const user = auth.user;

    return (
        <MainLayout user={user}>
            <Head title="Daftar Konseling Saya" />

            <div className="bg-white pt-16 pb-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-gray-900 font-serif">Daftar Booking Konseling Saya</h1>
                        <p className="text-gray-600 mt-2">Pantau status dan detail sesi konsultasi Anda.</p>
                    </div>

                    {/* Info Card */}
                    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start text-sm">
                        <Info className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                        <p className="text-blue-800">
                            <strong>Perhatian:</strong> Status Menunggu Verifikasi memerlukan waktu maksimal 2x24 jam untuk diproses. Pastikan nomor WhatsApp Anda aktif untuk menerima konfirmasi.
                        </p>
                    </div>

                    {/* Tabel Responsive */}
                    <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-100">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        No
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Topik Konseling
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Jadwal
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {dummyBookings.map((booking, index) => (
                                    <tr key={booking.id} className="hover:bg-gray-50 transition duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">{booking.topic}</div>
                                            <div className="text-xs text-gray-500 italic mt-1 line-clamp-1">Keterangan: {booking.notes}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex items-center">
                                                <Clock className="w-4 h-4 mr-2 text-emerald-500" />
                                                {booking.schedule}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className={`px-3 inline-flex text-xs leading-5 font-semibold rounded-full ${booking.statusColor}`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                            <div className="flex justify-center space-x-2">
                                                {/* Simulasi Tombol Aksi */}
                                                <button
                                                    onClick={() => alert(`Lihat detail booking ID: ${booking.id}`)}
                                                    className="text-emerald-600 hover:text-emerald-900 p-1 rounded-full hover:bg-emerald-50 transition"
                                                    title="Edit Detail"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => alert(`Batalkan booking ID: ${booking.id}`)}
                                                    className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition"
                                                    title="Batalkan Booking"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Tombol Kembali ke Booking */}
                    <div className="mt-8 text-center">
                        <Link href="/layanan/konsultasi" className="inline-flex items-center text-sm font-semibold text-[#004d40] hover:text-[#00382e] transition py-2 px-4 border border-[#004d40] rounded-lg">
                            <ChevronLeft className="w-4 h-4 mr-2" /> Buat Booking Baru
                        </Link>
                    </div>

                </div>
            </div>

            <Footer />
        </MainLayout>
    );
};

export default UserCounselingList;
