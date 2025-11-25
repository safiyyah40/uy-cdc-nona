import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Footer from '@/Components/Footer';
import { Head, Link } from '@inertiajs/react'; 

export default function Seminar(props) {

    const seminarTopics = [
        {
            id: 1,
            slug: "pokok-pokok-pikiran-universitas-islam-ideal-dan-aplikasinya-di-indonesia-1",
            imageSrc: "/images/seminar.jfif",
            title: "Sharing Session tentang \"Pokok-Pokok Pikiran Tentang Universitas Islam Ideal dan Aplikasinya di Indonesia\""
        },
        {
            id: 2,
            slug: "pokok-pokok-pikiran-universitas-islam-ideal-dan-aplikasinya-di-indonesia-2",
            imageSrc: "/images/seminar.jfif",
            title: "Sharing Session tentang \"Pokok-Pokok Pikiran Tentang Universitas Islam Ideal dan Aplikasinya di Indonesia\""
        },
        {
            id: 3,
            slug: "pokok-pokok-pikiran-universitas-islam-ideal-dan-aplikasinya-di-indonesia-3",
            imageSrc: "/images/seminar.jfif",
            title: "Sharing Session tentang \"Pokok-Pokok Pikiran Tentang Universitas Islam Ideal dan Aplikasinya di Indonesia\""
        },
        {
            id: 4,
            slug: "pokok-pokok-pikiran-universitas-islam-ideal-dan-aplikasinya-di-indonesia-4",
            imageSrc: "/images/seminar.jfif",
            title: "Sharing Session tentang \"Pokok-Pokok Pikiran Tentang Universitas Islam Ideal dan Aplikasinya di Indonesia\""
        },
    ];

    return (
        <>
            <Head title="Seminar" />

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
                            SEMINAR
                        </h1>


                        <p className="text-lg md:text-2xl leading-relaxed text-gray-800 font-sans max-w-5xl font-light tracking-wide">
                            Visi, misi, dan rencana strategis Universitas YARSI dari sudut pandang keislaman, adalah mengedepankan
                            karakter (akhlaq), paradigma (poia pikir) pemahaman Islam yang komprehensif dan integral, serta
                            penerapannya bagi alumni dalam profesi mereka. Dengan demikian Universitas YARSI memiliki peran
                            strategis dalam membentuk sarjana yang tidak hanya unggul dalam ilmu pengetahuan, tetapi juga
                            memiliki integritas moral dan spiritual. Hal tersebut harus dapat diwujudkan di era globalisasi
                            perkembangan teknologi yang pesat, dan berbagai tantangan yang semakin kompleks.
                        </p>
                    </div>

                </div>


                <div
                    className="py-16 md:py-20 relative overflow-hidden"
                    style={{
                        backgroundImage: "url('/images/bg-linear.jpg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {seminarTopics.map((item) => (
                                <SeminarCard
                                    key={item.id}
                                    id={item.id}
                                    slug={item.slug}
                                    title={item.title}
                                    imageSrc={item.imageSrc}
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

const SeminarCard = ({ id, slug, title, imageSrc }) => {
    const detailUrl = route('program.seminar.show', { id: id, slug: slug });

    return (
        <Link
            href={detailUrl}
            className="block transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl rounded-2xl cursor-pointer"
        >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-4 border border-gray-100">

                <div className="relative overflow-hidden rounded-xl h-80">
                    <img
                        className="h-full w-full object-cover transition-transform duration-300"
                        src={imageSrc}
                        alt={title}
                    />
                </div>


                <div className="text-center mt-4 py-2">
                    <p className="font-semibold text-gray-700 text-lg leading-snug">
                        Sharing Session tentang
                    </p>
                    <p className="mt-1 text-[#115C47] font-bold text-lg">
                        {title.substring(title.indexOf("\""), title.lastIndexOf("\"") + 1)}
                    </p>
                </div>
            </div>
        </Link>
    );
}
