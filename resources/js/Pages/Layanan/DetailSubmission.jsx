import React from 'react';
import { router } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';

const Icons = {
    Document: (props) => (
        <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
    ),
    CheckCircle: (props) => (
        <svg {...props} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
        </svg>
    )
};

const DataRow = ({ label, value }) => (
    <div>
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <div className="mt-1 p-3 rounded-lg bg-gray-100 text-gray-900 font-semibold h-12 flex items-center shadow-inner">
            {value}
        </div>
    </div>
);

const DetailSubmission = ({ reviewData = {
    namaLengkap: "Nona Cantik",
    tanggalPengajuan: "2025-12-07",
    posisi: "Digital Marketing Specialist",
    statusPeninjauan: "Selesai",
    komentarSaran: [
        "Struktur CV sangat baik dan menarik.",
        "Tambahkan metrik keberhasilan pada portofolio.",
        "Sesuaikan bagian hobi agar relevan.",
        "Gunakan font yang lebih profesional.",
        "Pastikan link portofolio aktif."
    ],
    penilaian: [
        { aspek: "Tata Letak", catatan: "Menarik namun agak ramai." },
        { aspek: "Isi & Relevansi", catatan: "Sangat relevan dengan posisi." },
        { aspek: "Bahasa & Gaya", catatan: "Profesional dan lugas." },
        { aspek: "Kesan Umum", catatan: "Berpotensi besar dipanggil wawancara." },
    ],
    fileLampiran: "CV_Nona_Cantik_Reviewed.pdf"
} }) => {

    const handleKembaliKeRiwayat = () => {
        router.visit(route('layanan.tabel.cv.review'));
    };

    const handleDownload = () => {
        alert(`Mendownload: ${reviewData.fileLampiran}`);
    };

    const getStatusColor = (status) => {
        if (status === 'Selesai') return 'bg-emerald-100 text-emerald-800 border-emerald-300';
        if (status === 'Diproses') return 'bg-yellow-100 text-yellow-800 border-yellow-300';
        return 'bg-gray-200 text-gray-800 border-gray-300';
    };

    const formattedDate = new Date(reviewData.tanggalPengajuan).toLocaleDateString('id-ID', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <MainLayout>
            <div className="bg-white py-3">
                <div className="w-full max-w-6xl mx-auto p-4 sm:p-8">

                    <header className="mb-4 text-center">
                        <h1 className="inline-block text-4xl font-extrabold text-gray-900 border-b-4 border-emerald-500 pb-2 px-4">
                            Hasil Tinjauan CV Anda
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Detail dan rekomendasi lengkap untuk pengajuan CV Anda.
                        </p>
                    </header>

                    <div className="mb-6 p-5 bg-emerald-50 border-l-4 border-emerald-400 rounded-lg shadow-sm">
                        <p className="text-sm font-medium text-gray-700">Posisi / Target Pekerjaan</p>
                        <h2 className="text-xl font-bold text-emerald-800 mt-1">
                            {reviewData.posisi}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                        <DataRow label="Nama Lengkap" value={reviewData.namaLengkap} />
                        <DataRow label="Tanggal Pengajuan" value={formattedDate} />
                        <div>
                            <label className="text-sm font-medium text-gray-700">Status Peninjauan</label>
                            <div className={`mt-1 p-3 rounded-lg font-bold h-12 flex items-center shadow-inner border ${getStatusColor(reviewData.statusPeninjauan)}`}>
                                {reviewData.statusPeninjauan}
                                {reviewData.statusPeninjauan === 'Selesai' && (
                                    <Icons.CheckCircle className="w-5 h-5 ml-2" />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mb-10 p-6 bg-emerald-50 rounded-xl border border-emerald-300 shadow-lg">
                        <h3 className="text-2xl font-extrabold text-emerald-700 mb-4 flex items-center">
                            <Icons.Document className="w-6 h-6 mr-2" />
                            Komentar & Saran Utama
                        </h3>
                        <ul className="list-disc ml-6 space-y-3 text-gray-800">
                            {reviewData.komentarSaran.map((saran, index) => (
                                <li key={index}>{saran}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="mb-10">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Detail Penilaian</h3>
                        <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-xl bg-white">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase w-1/4">Aspek</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase w-3/4">Catatan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reviewData.penilaian.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.aspek}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{item.catatan}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mb-10">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Lampiran Hasil Review</h3>
                        <div className="flex flex-col sm:flex-row justify-between items-center p-5 bg-emerald-50 border border-emerald-300 rounded-lg shadow-md">
                            <div className="flex items-center mb-3 sm:mb-0">
                                <Icons.Document className="w-7 h-7 text-emerald-600 mr-3" />
                                <div className="text-sm font-medium text-gray-800">
                                    {reviewData.fileLampiran}
                                </div>
                            </div>
                            <button
                                onClick={handleDownload}
                                className="py-2 px-6 rounded-lg text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition"
                            >
                                Unduh File
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center mt-12">
                        <button
                            onClick={handleKembaliKeRiwayat}
                            className="py-3 px-10 rounded-lg shadow-xl text-base font-bold text-emerald-600 border border-emerald-600 bg-white hover:bg-emerald-50 transition"
                        >
                            Kembali ke Riwayat CV Review
                        </button>
                    </div>

                </div>
            </div>
        </MainLayout>
    );
};

export default DetailSubmission;
