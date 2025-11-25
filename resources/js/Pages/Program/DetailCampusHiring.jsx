import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Footer from '@/Components/Footer';
import { Head, Link } from '@inertiajs/react';
import { Clock, Calendar, MapPin, User, ArrowLeft } from 'lucide-react';

export default function DetailCampusHiring({ auth, campusHiring }) {
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
                <p>Campus Hiring adalah kesempatan emas bagi mahasiswa tingkat akhir dan alumni untuk langsung bertemu dengan perusahaan terkemuka.</p>
                <h3 class="text-xl font-bold text-gray-800">Persyaratan Utama:</h3>
                <ul class="list-disc list-inside space-y-2 text-gray-700">
                    <li>Lulusan S1/D3 semua jurusan (diutamakan Teknik/IT).</li>
                    <li>IPK minimal 3.00.</li>
                    <li>Aktif dalam kegiatan organisasi atau proyek.</li>
                    <li>Bersedia ditempatkan di seluruh kantor cabang.</li>
                </ul>
                <h3 class="text-xl font-bold text-gray-800">Proses Pendaftaran:</h3>
                <ol class="list-decimal list-inside space-y-2 text-gray-700">
                    <li>Daftar melalui link resmi.</li>
                    <li>Unggah CV dan portofolio terbaru.</li>
                    <li>Ikuti tes psikologi dan wawancara.</li>
                </ol>
                <p>Jangan lewatkan kesempatan ini untuk memulai karir impian Anda!</p>
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

                {/* Header Section */}
                <div
                    className="pt-24 pb-16 relative overflow-hidden bg-gray-100"
                >
                    <div className="container mx-auto px-6 lg:px-8 z-10 pt-8 md:pt-16">
                        <Link
                            href={route('program.campus.hiring')}
                            className="inline-flex items-center text-gray-600 hover:text-[#115C47] transition-colors mb-6 font-semibold"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Kembali ke Daftar Campus Hiring
                        </Link>
                        <h1 className="text-3xl md:text-5xl font-kaisei font-extrabold text-gray-900 mb-4 tracking-wide">
                            {data.title}
                        </h1>
                        <p className="text-lg text-gray-600 max-w-4xl">
                            {data.description}
                        </p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="py-16 md:py-20 bg-white">
                    <div className="container mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">

                        <div className="lg:col-span-2 space-y-8">
                            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
                                <img
                                    src={data.imageSrc}
                                    alt={data.title}
                                    className="w-full h-auto object-cover max-h-96"
                                />
                            </div>

                            {/* Detailed Content */}
                            <div className="bg-white p-6 rounded-xl border border-gray-100">
                                <h2 className="text-3xl font-bold text-[#115C47] mb-4">Deskripsi Lengkap</h2>
                                <div
                                    className="prose max-w-none text-gray-700 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: data.content }}
                                />
                            </div>
                        </div>

                        <div className="lg:col-span-1 space-y-8">

                            {/* Info Card */}
                            <div className="bg-[#115C47] text-white p-6 rounded-2xl shadow-xl">
                                <h3 className="text-xl font-bold mb-4 border-b border-white/30 pb-2">Informasi Acara</h3>
                                <ul className="space-y-4 text-lg">
                                    <InfoItem Icon={User} label="Penyelenggara" value={data.company} />
                                    <InfoItem Icon={Calendar} label="Tanggal" value={formattedDate} />
                                    <InfoItem Icon={Clock} label="Waktu" value={data.time} />
                                    <InfoItem Icon={MapPin} label="Lokasi" value={data.location} />
                                </ul>
                            </div>

                            {/* Action Button */}
                            <a
                                href={data.registration_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-block text-center bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-extrabold py-3 rounded-xl transition duration-200 shadow-md text-lg uppercase"
                            >
                                Daftar Sekarang
                            </a>

                            <div className="text-sm text-gray-500 italic text-center">
                                Pastikan Anda memenuhi semua persyaratan sebelum mendaftar.
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </MainLayout>
        </>
    );
}

const InfoItem = ({ Icon, label, value }) => (
    <li className="flex items-start">
        <Icon className="w-5 h-5 mt-1 mr-3 flex-shrink-0 text-yellow-300" />
        <div>
            <span className="font-light text-sm block opacity-80">{label}</span>
            <span className="font-semibold">{value}</span>
        </div>
    </li>
);
