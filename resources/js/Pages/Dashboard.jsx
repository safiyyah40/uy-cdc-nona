import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import Slideshow from "../Components/Slideshow";
import BeritaSection from "../Components/BeritaSection";
import StatistikLayanan from '../Components/StatistikLayanan';
import LowonganPekerjaan from '../Components/LowonganPekerjaan';
import InfoMagang from '../Components/InfoMagang';
import InfoSertifikasi from '../Components/InfoSertifikasi';
import TesMinatBakat from '../Components/TesMinatBakatComp';
import KalenderSection from '../Components/KalenderSection';
import ODKCard from '@/Components/ODKCard';
import CampusHiringCard from '@/Components/CampusHiringCard';
import SeminarCard from '@/Components/SeminarCard';
import TipsCard from '@/Components/TipsCard';
import KonsultasiComp from '@/Components/KonsultasiComp';
import CvReviewComp from '@/Components/CvReviewComp';

export default function Dashboard({
    auth,
    slides,
    latestNews,
    latestCampusHiring,
    latestMagang,
    latestLoker,
    latestSertifikasi = [],
    latestSeminar = [],
    latestTips = [],
    latestODK = []
}) {
    return (
        <MainLayout>
            <Head title="Beranda" />

            <div className="bg-white min-h-screen text-gray-800 font-sans">

                {/* Hero Section */}
                <section className="relative w-full pt-8 pb-6 md:pt-16 md:pb-8 px-6 overflow-hidden">
                    {/* Background Decorations */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-50 z-0"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-teal-50 rounded-full blur-3xl opacity-50 z-0"></div>

                    <div className="relative z-10 max-w-7xl mx-auto text-center">
                        {/* Welcome Text - Margin dikurangi ke mb-2 */}
                        <h3 className="text-sm md:text-base font-bold tracking-[0.2em] text-green-600 uppercase mb-2">
                            Selamat Datang, {auth.user.name.toUpperCase()}!
                        </h3>

                        {/* Title - Margin dikurangi ke mb-3 */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-3 drop-shadow-sm font-kaisei">
                            Career Development Center <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500">
                                Universitas YARSI
                            </span>
                        </h1>

                        {/* Description - Margin dikurangi ke mb-4 */}
                        <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-4">
                            Jembatan strategis antara dunia akademik dan profesional.
                            Temukan karir impianmu, kembangkan potensi, dan raih masa depan gemilang.
                        </p>
                    </div>
                </section>

                <Slideshow slides={slides} />
                <div className="space-y-0 pb-20 mt-12">
                    <KonsultasiComp />
                    <CvReviewComp />
                    <TesMinatBakat />
                    {auth.user && <KalenderSection />}

                    <div className="w-full">
                        <InfoMagang latestMagang={latestMagang} />
                    </div>

                    <div className="w-full">
                        <div className="max-w-7xl mx-auto px-6 mb-8"></div>
                        <LowonganPekerjaan jobs={latestLoker} />
                    </div>

                    <div className="w-full">
                        <InfoSertifikasi latestSertifikasi={latestSertifikasi} />
                    </div>

                    <section className="w-full">
                        <ODKCard latestODK={latestODK} />
                    </section>

                    <section className="w-full">
                        <CampusHiringCard latestCampusHiring={latestCampusHiring} />
                    </section>

                    <section className="w-full">
                        <SeminarCard seminars={latestSeminar} />
                    </section>

                    <TipsCard tips={latestTips} />

                    <div className="w-full">
                        <div className="max-w-7xl mx-auto px-6 mb-8"></div>
                        <div className="w-full">
                            <BeritaSection latestNews={latestNews} />
                        </div>
                    </div>
                </div>
                <StatistikLayanan />
            </div>
        </MainLayout>
    );
} 