import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Footer from '@/Components/Footer';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';

export default function Seminar(props) {

    // Warna dan Konstanta Tema
    const mainGreen = "text-emerald-800";
    const lightestGreenBg = "bg-emerald-50";
    const accentGreen = "bg-emerald-600";

    const seminarTopics = [
        {
            id: 1,
            slug: "pokok-pokok-pikiran-universitas-islam-ideal-dan-aplikasinya-di-indonesia-1",
            imageSrc: "/images/seminar.jfif",
            title: "Sharing Session tentang \"Pokok-Pokok Pikiran Tentang Universitas Islam Ideal dan Aplikasinya di Indonesia\"",
            date: "2026-03-15",
            time: "09:00 WIB"
        },
        {
            id: 2,
            slug: "pokok-pokok-pikiran-universitas-islam-ideal-dan-aplikasinya-di-indonesia-2",
            imageSrc: "/images/seminar.jfif",
            title: "Sharing Session tentang \"Pokok-Pokok Pikiran Tentang Universitas Islam Ideal dan Aplikasinya di Indonesia\"",
            date: "2026-04-10",
            time: "14:00 WIB"
        },
        {
            id: 3,
            slug: "pokok-pokok-pikiran-universitas-islam-ideal-dan-aplikasinya-di-indonesia-3",
            imageSrc: "/images/seminar.jfif",
            title: "Sharing Session tentang \"Pokok-Pokok Pikiran Tentang Universitas Islam Ideal dan Aplikasinya di Indonesia\"",
            date: "2026-05-20",
            time: "10:00 WIB"
        },
        {
            id: 4,
            slug: "pokok-pokok-pikiran-universitas-islam-ideal-dan-aplikasinya-di-indonesia-4",
            imageSrc: "/images/seminar.jfif",
            title: "Sharing Session tentang \"Pokok-Pokok Pikiran Tentang Universitas Islam Ideal dan Aplikasinya di Indonesia\"",
            date: "2026-06-05",
            time: "13:00 WIB"
        },
    ];

    return (
        <>
            <Head title="Seminar" />

            <MainLayout user={props.auth.user}>

                {/* HERO SECTION: Dynamic Typography & Gradient */}
                <div
                    className={`pt-24 pb-24 relative overflow-hidden bg-gradient-to-br from-white to-emerald-100 border-b border-emerald-300`}
                >
                    <div className="container mx-auto px-6 lg:px-8 z-10 pt-16 md:pt-24">

                        <span className={`inline-flex items-center text-sm font-semibold mb-3 text-emerald-600 uppercase tracking-widest`}>
                            <BookOpen className="w-4 h-4 mr-2" />
                            Pengembangan Karakter dan Keilmuan
                        </span>

                        <h1 className={`text-6xl md:text-8xl font-semibold font-serif italic text-gray-900 mb-6 tracking-tight leading-none drop-shadow-sm`}>
                            Seminar
                        </h1>

                        <p className="text-xl md:text-2xl leading-relaxed text-gray-700 font-sans max-w-5xl font-light">
                            Visi, misi, dan rencana strategis Universitas YARSI mengedepankan
                            karakter, pemahaman Islam yang komprehensif, serta
                            penerapannya bagi alumni dalam profesi mereka.
                        </p>
                    </div>
                </div>


                {/* SEMINAR LIST SECTION */}
                <div
                    className={`py-16 md:py-24 bg-white`}
                >
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="mb-14 max-w-2xl">
                            <h2 className={`text-3xl font-bold text-gray-900 border-b-2 border-emerald-200 pb-2`}>Topik Terbaru</h2>
                            <p className="text-gray-600 mt-2">Daftar seminar dan sesi *sharing* yang akan datang.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {seminarTopics.map((item) => (
                                <SeminarCard
                                    key={item.id}
                                    id={item.id}
                                    slug={item.slug}
                                    title={item.title}
                                    imageSrc={item.imageSrc}
                                    mainGreen={mainGreen}
                                    accentGreen={accentGreen}
                                    date={item.date}
                                    time={item.time}
                                />
                            ))}
                        </div>
                    </div>
                </div>


                <Footer />

            </MainLayout>
        </>
    );
}

// KOMPONEN CARD SEMINAR
const SeminarCard = ({ id, slug, title, imageSrc, mainGreen, accentGreen, date, time }) => {
    const detailUrl = route('program.seminar.show', { id: id, slug: slug });

    // Format Tanggal
    const formattedDate = new Date(date).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'short', year: 'numeric'
    });

    // Mencari bagian judul yang diapit tanda kutip
    const quoteIndexStart = title.indexOf("\"");
    const quoteIndexEnd = title.lastIndexOf("\"");
    const quotedTitle = (quoteIndexStart !== -1 && quoteIndexEnd !== -1)
                        ? title.substring(quoteIndexStart, quoteIndexEnd + 1)
                        : title;

    return (
        <Link
            href={detailUrl}
            className="block transition-transform duration-300 hover:scale-[1.03] rounded-2xl group"
        >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-0 border border-gray-100 h-full flex flex-col">

                {/* Image Section */}
                <div className="relative overflow-hidden aspect-w-16 aspect-h-9">
                    <img
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        src={imageSrc}
                        alt={title}
                    />
                    {/* Badge Tanggal */}
                    <div className={`absolute top-3 right-3 px-3 py-1 bg-white text-gray-800 text-sm font-semibold rounded-full shadow-md`}>
                        {formattedDate}
                    </div>
                </div>


                {/* Content Section */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                        {/* Waktu */}
                        <div className="flex items-center text-sm font-medium text-emerald-600 mb-2">
                            <Clock className="w-4 h-4 mr-2" /> {time}
                        </div>

                        {/* Judul Utama */}
                        <p className={`mt-1 font-serif ${mainGreen} font-extrabold text-xl leading-snug`}>
                            {quotedTitle}
                        </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <span className={`inline-flex items-center text-sm font-bold transition-colors text-gray-600 group-hover:${mainGreen}`}>
                            Detail & Registrasi
                            <ArrowRight className="w-4 h-4 ml-2 mt-0.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
