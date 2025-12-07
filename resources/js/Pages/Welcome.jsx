import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import VisiMisi from "../Components/VisiMisi";
import BeritaSection from "../Components/BeritaSection";
import KalenderSection from "../Components/KalenderSection";
import StatistikLayanan from '../Components/StatistikLayanan';
import LowonganPekerjaan from '../Components/LowonganPekerjaan';
import InfoMagang from '../Components/InfoMagang';
import TesMinatBakat from '../Components/TesMinatBakat';
import Footer from '../Components/Footer';

export default function Welcome({ auth, slides, latestNews, latestMagang, latestLoker })  {
    return (
        <MainLayout>
            <Head title="Selamat Datang di CDC YARSI" />

            <section
                className="relative flex flex-col items-start justify-start overflow-hidden w-full h-64 mt-[-5rem] md:mt-[-3rem] bg-[#2BB673]"
            >
                <div className="z-20 absolute left-0 md:left-0 w-full pt-24">
                    <div className="relative w-full max-w-screen-xl **2xl:mx-auto**">

                        <div className="px-6 md:px-16 lg:px-24">

                            <h3 className="text-xl md:text-3xl font-sans uppercase font-extrabold text-white tracking-widest leading-tight drop-shadow-lg mb-2">
                                SELAMAT DATANG DI
                            </h3>

                            <h1 className="text-5xl md:text-6xl font-kaisei font-extrabold text-white leading-tight whitespace-nowrap drop-shadow-xl">
                                Career Development Center Universitas YARSI
                            </h1>

                        </div>
                    </div>
                </div>
            </section>
            <VisiMisi slides={slides} />
            <KalenderSection />
            <StatistikLayanan />
            <BeritaSection latestNews={latestNews} />
            <LowonganPekerjaan jobs={latestLoker} />
            <InfoMagang latestMagang={latestMagang} />
            <div id="layanan-tes">
                <TesMinatBakat />
            </div>
            <Footer />
        </MainLayout>
    );
}
