import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import Slideshow from "../Components/Slideshow";
import BeritaSection from "../Components/BeritaSection";
import StatistikLayanan from '../Components/StatistikLayanan';
import LowonganPekerjaan from '../Components/LowonganPekerjaan';
import InfoMagang from '../Components/InfoMagang';
import TesMinatBakat from '../Components/TesMinatBakatComp';
import KonsultasiComp from '@/Components/KonsultasiComp';
import KalenderSection from '../Components/KalenderSection';
import Footer from '../Components/Footer';
import ODKCard from '@/Components/ODKCard';
import CampusHiringCard from '@/Components/CampusHiringCard';
import CvReviewComp from '@/Components/CvReviewComp';
import SeminarCard from '@/Components/SeminarCard';
import TipsCard from '@/Components/TipsCard';

export default function Welcome({ auth, slides, latestNews, latestCampusHiring,latestMagang, latestLoker, latestSeminar = [], latestTips = [], latestODK 
}) {
    return (
        <MainLayout>
            <Slideshow slides={slides} />

            <Head title="Selamat Datang di CDC YARSI" />

            <div className="bg-white min-h-screen text-gray-800 font-sans">

                {/* HERO SECTION */}
                <section className="relative w-full pt-12 pb-10 md:pt-24 md:pb-12 px-6 overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-50 z-0"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-teal-50 rounded-full blur-3xl opacity-50 z-0"></div>

                    <div className="relative z-10 max-w-7xl mx-auto text-center">
                        <h3 className="text-sm md:text-lg font-bold tracking-[0.2em] text-green-600 uppercase mb-4">
                            Selamat Datang di
                        </h3>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-6 drop-shadow-sm font-kaisei">
                            Career Development Center <br />
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

                {/* LAYANAN & PROGRAM */}
                <div className="space-y-0 pb-20 mt-12">

                    <KonsultasiComp />
                    <CvReviewComp />
                    <TesMinatBakat />
                    {auth.user && <KalenderSection />}

                    {/* Info Magang */}
                    <div className="w-full">
                        <InfoMagang latestMagang={latestMagang} />
                    </div>

                    {/* Lowongan Pekerjaan */}
                    <div className="w-full">
                        <div className="max-w-7xl mx-auto px-6 mb-8">
                        </div>
                        <LowonganPekerjaan jobs={latestLoker} />
                    </div>

                    <ODKCard latestODK={latestODK} />

                    <CampusHiringCard latestCampusHiring={latestCampusHiring} />
                    
                    <SeminarCard seminars={latestSeminar} />
                    <TipsCard tips={latestTips} />
                    <div className="w-full">
                        <div className="max-w-7xl mx-auto px-6 mb-8">
                        </div>
                        <div className="w-full">
                            <BeritaSection latestNews={latestNews} />
                        </div>
                    </div>
                </div>
                <StatistikLayanan />

                <Footer />
            </div>
        </MainLayout>
    );
}