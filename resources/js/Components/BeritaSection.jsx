import React from 'react';
import NewsCard from '@/Components/NewsCard';

const IMAGE_PATH = '/images/berita.jpeg';

const dummyNewsItems = [
    { id: 1, title: 'Universitas YARSI Terima 59 Mahasiswa Baru', subtitle: 'Penerima Beasiswa KIP Kuliah Tahun 2025' },
    { id: 2, title: 'Fakultas Kedokteran Gelar Seminar Internasional', subtitle: 'Mendiskusikan Inovasi Pengobatan' },
    { id: 3, title: 'Universitas YARSI Laksanakan Pengabdian Masyarakat', subtitle: 'Pemberdayaan Digital UMKM' },
    { id: 4, title: 'Pelantikan Rektor Baru Periode 2024-2028', subtitle: 'Fokus pada Pengembangan Teknologi' },
    { id: 5, title: 'Prestasi Mahasiswa di Kancah Nasional', subtitle: 'Meraih Emas Olimpiade Sains' },
];


const BeritaSection = () => {

    const itemsToShow = dummyNewsItems.slice(0, 4);

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 md:px-8">

                <div className="text-center mb-10 font-serif">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-wider mb-4 text-yarsi-green">
                        BERITA TERBARU
                    </h2>
                    <p className="text-2xl text-gray-800 max-w-3xl mx-auto mb-4">
                        Dapatkan informasi terbaru seputar kegiatan Universitas YARSI.
                    </p>
                    <a
                        href="/berita"
                        className="text-2xl text-gray-800 hover:text-yarsi-green transition-colors font-medium inline-block mt-2"
                    >
                        Lihat Semua &rsaquo;
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {itemsToShow.map(item => (
                        <NewsCard
                            key={item.id}
                            title={`${item.title} ${item.subtitle}`}
                            imageSrc={IMAGE_PATH}
                        />
                    ))}

                </div>
            </div>
        </section>
    );
};

export default BeritaSection;
