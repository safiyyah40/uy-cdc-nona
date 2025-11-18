import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Footer from '@/Components/Footer';
import { Head } from '@inertiajs/react';

export default function OrientasiDuniaKerja(props) {

    const pageTitle = "ORIENTASI DUNIA KERJA";

    return (
        <>
            <Head title={pageTitle} />

            <MainLayout user={props.auth.user}>

                <div
                    className="min-h-screen flex flex-col justify-start pt-20 pb-16 relative overflow-hidden"
                    style={{
                        backgroundImage: "url('/images/bg-dreamina.jpg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <div className="container mx-auto px-6 lg:px-8 z-10 pt-16 md:pt-24">
                        
                        <h1 className="text-4xl md:text-5xl font-kaisei font-extrabold text-black mb-12 tracking-wide">
                            {pageTitle}
                        </h1>

                        
                        <p className="text-lg md:text-2xl leading-relaxed text-gray-800 font-sans max-w-5xl
                                     font-light tracking-wide">
                            Orientasi Dunia Kerja untuk Calon Wisudawan Universitas YARSI adalah program pembekalan yang
                            diselenggarakan oleh Puskaka-UY bagi mahasiswa tingkat akhir menjelang kelulusan. Program ini
                            dirancang untuk mempersiapkan calon wisudawan menghadapi transisi dari dunia kampus ke dunia kerja,
                            melalui sesi-sesi yang membahas strategi mencari kerja, penulisan CV dan wawancara, etika profesional,
                            hingga peluang wirausaha dan studi lanjut. Dengan orientasi ini, diharapkan para lulusan Universitas YARSI
                            siap bersaing, beradaptasi, dan berkontribusi di lingkungan kerja maupun masyarakat secara luas.
                        </p>
                    </div>
                </div>

                {/* Bagian Konten Utama */}
                <div className="bg-white py-16 md:py-24">
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="flex justify-center items-center">
                            
                            <img
                                src="/images/odk.jpg"
                                alt="Materi Orientasi Dunia Kerja: Application Letter, CV, dan Sesi Pelatihan"
                                className="w-full max-w-7xl max-h-[80vh] h-auto rounded-xl shadow-2xl"
                            />
                        </div>
                    </div>
                </div>


                <Footer />

            </MainLayout>
        </>
    );
}