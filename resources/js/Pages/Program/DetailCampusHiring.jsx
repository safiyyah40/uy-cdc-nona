import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Footer from '@/Components/Footer';
import { Head, Link } from '@inertiajs/react';
import { Clock, Calendar, MapPin, User, ArrowLeft, ArrowRight } from 'lucide-react';

export default function DetailCampusHiring({ auth, campusHiring }) {

    // Warna dan Konstanta Tema
    const mainGreen = "text-emerald-700";
    const accentGreen = "bg-emerald-600";
    const accentYellow = "bg-yellow-500";

    const data = campusHiring || {
        id: 0,
        slug: "contoh-program-hiring",
        title: "Campus Hiring Default",
        company: "Perusahaan Contoh",
        location: "Jakarta",
        date: "2025-12-31",
        time: "09:00 - 16:00 WIB",
        description: "Program perekrutan kampus ini adalah contoh detail. Anda akan melihat informasi lengkap tentang perusahaan, persyaratan, dan cara mendaftar di sini.",
        content: `
            <div class="space-y-6">
                <p>Campus Hiring adalah kesempatan emas bagi mahasiswa tingkat akhir dan alumni untuk langsung bertemu dengan perusahaan terkemuka. Pastikan Anda membaca persyaratan dengan teliti.</p>

                <h3 class="text-2xl font-bold text-gray-800 mt-8 mb-4 border-b border-emerald-200 pb-2">Persyaratan Utama</h3>
                <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4 p-4 bg-emerald-50 rounded-lg">
                    <li>Lulusan S1/D3 semua jurusan (diutamakan Teknik/IT).</li>
                    <li>IPK minimal 3.00.</li>
                    <li>Aktif dalam kegiatan organisasi atau proyek.</li>
                    <li>Bersedia ditempatkan di seluruh kantor cabang.</li>
                </ul>

                <h3 class="text-2xl font-bold text-gray-800 mt-8 mb-4 border-b border-emerald-200 pb-2">Proses Pendaftaran</h3>
                <ol class="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                    <li>Daftar melalui link resmi yang disediakan di bawah.</li>
                    <li>Unggah CV dan portofolio terbaru.</li>
                    <li>Ikuti tes psikologi dan wawancara sesuai jadwal yang telah ditentukan.</li>
                </ol>
                <p class="mt-8 text-lg font-medium">Jangan lewatkan kesempatan ini untuk memulai karir impian Anda! Harap perhatikan batas waktu pendaftaran.</p>
            </div>
        `,
        imageSrc: "/images/campushiring.jpg",
        registration_link: "#"
    };

    const formattedDate = new Date(data.date).toLocaleDateString('id-ID', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <>
            <Head title={`Detail Campus Hiring: ${data.title}`} />

            <MainLayout user={auth.user}>

                {/* HEADER SECTION */}
                <div
                    className={`pt-24 pb-20 relative overflow-hidden bg-gradient-to-r from-emerald-50 to-white text-gray-900 border-b border-emerald-100`}
                >
                    <div className="container mx-auto px-6 lg:px-8 z-10 relative pt-8 md:pt-16">
                        <Link
                            href={route('program.campus.hiring')}
                            className={`inline-flex items-center text-gray-600 hover:${mainGreen} transition-colors mb-6 font-medium text-sm uppercase tracking-widest`}
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Kembali ke Daftar Campus Hiring
                        </Link>

                        <h1 className={`text-4xl md:text-6xl font-bold mb-4 tracking-normal ${mainGreen}`}>
                            {data.title}
                        </h1>

                        <p className="text-xl text-gray-700 max-w-4xl font-normal">
                            {data.description}
                        </p>
                    </div>
                </div>

                {/* CONTENT SECTION */}
                <div className="py-16 md:py-20 bg-white">
                    <div className="container mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">

                        {/* Kiri: Gambar & Konten Detail */}
                        <div className="lg:col-span-2 space-y-10">

                            {/* Featured Image */}
                            <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-100">
                                <img
                                    src={data.imageSrc}
                                    alt={data.title}
                                    className="w-full h-auto object-cover max-h-[450px]"
                                />
                            </div>

                            {/* Detailed Content */}
                            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                                <h2 className={`text-3xl font-semibold ${mainGreen} mb-6 border-b border-emerald-200 pb-3`}>
                                    Deskripsi Program
                                </h2>
                                <div
                                    className="prose max-w-none text-gray-700 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: data.content }}
                                />
                            </div>
                        </div>

                        {/* Kanan: Sidebar (Info Card & CTA) */}
                        <div className="lg:col-span-1 space-y-8">

                            {/* Info Card */}
                            <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-xl border-t-4 border-emerald-600">
                                <h3 className={`text-2xl font-bold mb-5 ${mainGreen} border-b border-gray-200 pb-3`}>
                                    Informasi Acara
                                </h3>
                                <ul className="space-y-5">
                                    <InfoItem Icon={User} label="Penyelenggara" value={data.company} mainGreen={mainGreen} />
                                    <InfoItem Icon={Calendar} label="Tanggal" value={formattedDate} mainGreen={mainGreen} />
                                    <InfoItem Icon={Clock} label="Waktu" value={data.time} mainGreen={mainGreen} />
                                    <InfoItem Icon={MapPin} label="Lokasi" value={data.location} mainGreen={mainGreen} />
                                </ul>
                            </div>

                            {/* Action Button */}
                            <a
                                href={data.registration_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-full inline-flex justify-center items-center ${accentYellow} hover:bg-yellow-600 text-gray-900 font-bold py-4 rounded-xl transition duration-200 shadow-xl text-xl uppercase tracking-wider group`}
                            >
                                Daftar Sekarang
                                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                            </a>

                            <div className="text-sm text-gray-500 italic text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                                Pastikan Anda telah mempersiapkan semua dokumen yang dibutuhkan (CV, Portofolio, dll.)
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </MainLayout>
        </>
    );
}

// KOMPONEN INFO ITEM
const InfoItem = ({ Icon, label, value, mainGreen }) => (
    <li className="flex items-start">
        <Icon className={`w-5 h-5 mt-1 mr-4 flex-shrink-0 ${mainGreen}`} />
        <div>
            <span className="font-normal text-sm block text-gray-500">{label}</span>
            <span className="font-medium text-lg text-gray-900">{value}</span>
        </div>
    </li>
);
