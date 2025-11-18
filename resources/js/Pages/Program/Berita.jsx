import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Footer from '@/Components/Footer'; 
import { Head } from '@inertiajs/react';

const NewsCard = ({ title, imageSrc }) => {
    return (
        <div 
            className="rounded-3xl shadow-xl overflow-hidden relative cursor-pointer group"
            style={{
                background: 'linear-gradient(180deg, #115C47 0%, #17A35F 100%)',
            }}
        >
            <div className="relative h-80 overflow-hidden">
                <img
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={imageSrc}
                    alt={title}
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-4">
                    <p className="text-white font-semibold text-lg leading-snug">
                        {title}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function Berita(props) {
    
    const newsItems = [
        { 
            imageSrc: "/images/berita.jpeg",
            title: "Universitas YARSI Terima 59 Mahasiswa Baru Penerima Beasiswa KIP Kuliah Tahun 2025"
        },
        { 
            imageSrc: "/images/berita.jpeg",
            title: "Universitas YARSI Terima 59 Mahasiswa Baru Penerima Beasiswa KIP Kuliah Tahun 2025"
        },
        { 
            imageSrc: "/images/berita.jpeg",
            title: "Universitas YARSI Terima 59 Mahasiswa Baru Penerima Beasiswa KIP Kuliah Tahun 2025"
        },
        { 
            imageSrc: "/images/berita.jpeg",
            title: "Universitas YARSI Terima 59 Mahasiswa Baru Penerima Beasiswa KIP Kuliah Tahun 2025"
        },
    ];

    return (
        <>
            <Head title="Berita" />
            
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
                    <div className="container mx-auto px-6 lg:px-8 z-10 text-center pt-16 md:pt-24">
                        <h1 className="text-4xl md:text-5xl font-kaisei font-extrabold text-black mb-12 tracking-wide">
                            BERITA
                        </h1>
                        
                        <p className="text-lg md:text-2xl leading-relaxed text-gray-800 font-sans max-w-5xl font-light tracking-wide mx-auto">
                            Halaman Berita menampilkan informasi terbaru seputar kegiatan di Universitas Yarsi, pengumuman penting, serta
                            perkembangan yang terjadi di lingkungan Universitas Yarsi. Beragam update mengenai acara, prestasi, dan informasi
                            akademik maupun non-akademik yang disajikan secara ringkas dan mudah diakses.
                        </p>
                    </div>
                </div>

                {/* Bagian Konten Berita (Grid) */}
                <div className="bg-white py-16 md:py-20">
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                            {newsItems.map((item, index) => (
                                <NewsCard 
                                    key={index} 
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