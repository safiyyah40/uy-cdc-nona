// src/Components/BeritaSection.jsx

import React from 'react';

const IMAGE_PATH = '/images/berita.jpeg'; 

const dummyNewsItems = [
    { id: 1, title: 'Universitas YARSI Terima 59 Mahasiswa Baru', subtitle: 'Penerima Beasiswa KIP Kuliah Tahun 2025' },
    { id: 2, title: 'Universitas YARSI Terima 59 Mahasiswa Baru', subtitle: 'Penerima Beasiswa KIP Kuliah Tahun 2025' },
    { id: 3, title: 'Universitas YARSI Terima 59 Mahasiswa Baru', subtitle: 'Penerima Beasiswa KIP Kuliah Tahun 2025' },
    { id: 4, title: 'Universitas YARSI Terima 59 Mahasiswa Baru', subtitle: 'Penerima Beasiswa KIP Kuliah Tahun 2025' },
];

const BeritaSection = () => {
    const NewsCard = ({ title, subtitle }) => (
        <div className="relative overflow-hidden rounded-3xl shadow-md border border-gray-200 bg-white group">
            <div className="relative w-full pb-[42.85%]"> 
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundImage: `url(${IMAGE_PATH})` }} 
                >
                    <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white text-shadow">
                        <p className="text-base font-semibold">{title}</p> 
                        <p className="text-sm">{subtitle}</p> 
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 md:px-8"> 
                
                <div className="text-center mb-10 font-serif">
                    
                    <h2 className="text-6xl font-light tracking-wider mb-4">BERITA</h2>
                    
                    <p className="text-2xl text-gray-700 max-w-3xl mx-auto mb-4">
                        Dapatkan informasi terbaru seputar kegiatan, pengumuman, dan
                        perkembangan terkini di lingkungan Universitas YARSI.
                    </p>
                    
                    <a 
                        href="#" 
                        className="text-2xl text-gray-800 hover:text-yarsi-green transition-colors font-medium inline-block mt-2"
                    >
                        Lihat Semua &rsaquo;
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {dummyNewsItems.map(item => (
                        <NewsCard 
                            key={item.id} 
                            title={item.title} 
                            subtitle={item.subtitle} 
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BeritaSection;