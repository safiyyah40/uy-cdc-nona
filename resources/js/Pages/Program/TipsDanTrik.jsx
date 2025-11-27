import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Footer from '@/Components/Footer'; 
import { Head, Link } from '@inertiajs/react';
import { Lightbulb, ArrowRight, Clock } from 'lucide-react'; 

export default function TipsDanTrik(props) {
    
    const mainGreen = "text-emerald-700";
    const lightestGreenBg = "bg-emerald-50";
    
    const tipsData = [
        {
            id: 1,
            slug: "tips-pertama-kali-masuk-kerja-untuk-fresh-graduate",
            title: "5 Kunci Sukses Hari Pertama Kerja untuk Fresh Graduate",
            summary: "Pelajari cara menciptakan kesan pertama yang profesional, mulai dari persiapan logistik, etika komunikasi, hingga inisiatif proaktif dalam beradaptasi dengan budaya kantor.",
            readTime: "8 menit",
            category: "Persiapan Karir",
            imageSrc: "/images/tipsdantrik.jpg"
        },
        {
            id: 2,
            slug: "cara-efektif-negosiasi-gaji-pertama",
            title: "Strategi Negosiasi Gaji Pertama: Raih Nilai yang Setara",
            summary: "Panduan praktis untuk melakukan riset pasar, menyusun argumen yang kuat, dan negosiasi gaji dengan percaya diri untuk memaksimalkan kompensasi awal Anda.",
            readTime: "7 menit",
            category: "Gaji & Keuangan",
            imageSrc: "/images/tipsdantrik.jpg"
        },
        {
            id: 3,
            slug: "pentingnya-networking-di-dunia-profesional",
            title: "Membangun Jaringan Kuat: Kunci Karir Jangka Panjang",
            summary: "Kiat efektif untuk membangun dan memelihara jaringan profesional (networking) yang solid, serta cara mengubah koneksi menjadi peluang karir yang berkelanjutan.",
            readTime: "6 menit",
            category: "Pengembangan Diri",
            imageSrc: "/images/tipsdantrik.jpg"
        },
    ];

    return (
        <>
            <Head title="Tips & Trik" />
            
            <MainLayout user={props.auth.user}>

                <div
                    className={`pt-24 pb-24 relative overflow-hidden bg-gradient-to-br from-white to-emerald-100 border-b border-emerald-300`}
                >
                    <div className="container mx-auto px-6 lg:px-8 z-10 pt-16 md:pt-24">
                        
                        <span className={`inline-flex items-center text-sm font-semibold mb-3 text-emerald-600 uppercase tracking-widest`}>
                            <Lightbulb className="w-4 h-4 mr-2" />
                            Panduan dan Kiat Praktis
                        </span>

                        <h1 className={`text-6xl md:text-8xl font-serif italic ${mainGreen} mb-6 tracking-tight leading-none drop-shadow-sm`}>
                            Tips & Trik
                        </h1>

                        <p className="text-xl md:text-2xl leading-relaxed text-gray-700 font-sans max-w-5xl font-light">
                            Jelajahi kumpulan kiat sukses, panduan karir, dan strategi pengembangan diri untuk membantu Anda di dunia profesional.
                        </p>
                    </div>
                </div>

                <div
                    className={`py-16 md:py-24 bg-white`}
                >
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="mb-14 max-w-2xl">
                            <h2 className={`text-3xl font-bold ${mainGreen} border-b-2 border-emerald-200 pb-2`}>Kiat Terbaru</h2>
                            <p className="text-gray-600 mt-2">Daftar artikel dan panduan terbaru dari Career Development Center (CDC).</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {tipsData.map((tip) => (
                                <TipCard
                                    key={tip.id}
                                    tip={tip}
                                    mainGreen={mainGreen}
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

const TipCard = ({ tip, mainGreen }) => {
    const detailUrl = `/program/tips-dan-trik/${tip.id}/${tip.slug}`; 

    return (
        <Link
            href={detailUrl}
            className="block transition-transform duration-300 hover:scale-[1.03] rounded-2xl group"
        >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-0 border border-gray-100 h-full flex flex-col">

                {tip.imageSrc && (
                    <div className="relative overflow-hidden aspect-video">
                        <img
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            src={tip.imageSrc}
                            alt={tip.title}
                        />
                    </div>
                )}


                <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                        <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-600 text-xs font-semibold rounded-full mb-3">
                            {tip.category}
                        </span>

                        <p className={`mt-1 font-sans ${mainGreen} font-extrabold text-xl leading-snug group-hover:text-emerald-800 transition`}>
                            {tip.title}
                        </p>

                        <p className="text-gray-600 mt-2 text-base line-clamp-3">
                            {tip.summary}
                        </p>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                        <span className="flex items-center text-sm text-gray-500 font-medium">
                            <Clock className="w-4 h-4 mr-1.5" /> {tip.readTime}
                        </span>
                        
                        <span className={`inline-flex items-center text-sm font-bold transition-colors text-gray-600 group-hover:${mainGreen}`}>
                            Baca Selengkapnya
                            <ArrowRight className="w-4 h-4 ml-2 mt-0.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}