import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import Slideshow from "../Components/Slideshow";
import BeritaSection from "../Components/BeritaSection";
import StatistikLayanan from '../Components/StatistikLayanan';
import LowonganPekerjaan from '../Components/LowonganPekerjaan';
import InfoMagang from '../Components/InfoMagang';
import TesMinatBakat from '../Components/TesMinatBakat';
import KalenderSection from '../Components/KalenderSection';
import Footer from '../Components/Footer';
import ODKCard from '@/Components/ODKCard';
import CampusHiringCard from '@/Components/CampusHiringCard';
import SeminarCard from '@/Components/SeminarCard';

export default function Welcome({ auth, slides, latestNews, latestMagang, latestLoker, latestSeminar = [] }) {
    return (
        <MainLayout>
            <Head title="Selamat Datang di CDC YARSI" />

            <div className="bg-white min-h-screen text-gray-800 font-sans">

                {/* --- 1. HERO SECTION --- */}
                <section className="relative w-full pt-12 pb-10 md:pt-24 md:pb-12 px-6 overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-50 z-0"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-teal-50 rounded-full blur-3xl opacity-50 z-0"></div>

                    <div className="relative z-10 max-w-7xl mx-auto text-center">
                        <h3 className="text-sm md:text-lg font-bold tracking-[0.2em] text-green-600 uppercase mb-4">
                            Selamat Datang di
                        </h3>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-6 drop-shadow-sm font-kaisei">
                            Career Development Center <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500">
                                Universitas YARSI
                            </span>
                        </h1>

                        <p className="text-gray-500 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
                            Jembatan strategis antara dunia akademik dan profesional.
                            Temukan karir impianmu, kembangkan potensi, dan raih masa depan gemilang.
                        </p>
                    </div>
                </section>

                {/* --- 2. SLIDESHOW --- */}
                <Slideshow slides={slides} />

                {/* --- 3. LAYANAN & PROGRAM --- */}
                <div className="space-y-24 pb-20 mt-16">

                    <TesMinatBakat />

                    {/* --- Info Magang --- */}
                <div className="w-full">
                    <div className="max-w-7xl mx-auto px-6 mb-8">
                    </div>
                    <div className="w-full">
                        <InfoMagang latestMagang={latestMagang} />
                    </div>
                </div>

                    {/* Lowongan Pekerjaan */}
                    <div className="w-full">
                        <div className="max-w-7xl mx-auto px-6 mb-8">
                        </div>
                        <LowonganPekerjaan jobs={latestLoker} />
                    </div>

                    <section className="w-full">
                        <ODKCard />
                    </section>

                    <section className="w-full">
                        <CampusHiringCard />
                    </section>

                    <section className="w-full">
                        <SeminarCard seminars={latestSeminar} />
                    </section>

                    {/* Berita */}
                   <div className="w-full">
                    <div className="max-w-7xl mx-auto px-6 mb-8">
                        </div>
                        <div className="w-full">
                        <BeritaSection latestNews={latestNews} />
                    </div>
                     </div>

                    <KalenderSection />
                </div>
                        <StatistikLayanan />

                <Footer />
            </div>
        </MainLayout>
    );
}
