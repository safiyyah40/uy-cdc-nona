import React, { useState, useMemo } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Footer from '@/Components/Footer';
import { Head } from '@inertiajs/react';
import NewsCard from '@/Components/NewsCard';

const createNewsItems = () => {
    // Daftar Judul Utama
    const baseItems = [
        "Universitas YARSI Terima 59 Mahasiswa Baru Penerima Beasiswa KIP Kuliah Tahun 2025",
        "Berita Tambahan Edisi Oktober",
        "Berita Penting Bulan Ini",
        "Pencapaian Mahasiswa Terbaik",
        "Riset Terbaru Universitas YARSI",
        "Kegiatan Sosial Kampus",
        "Pengumuman Beasiswa Baru",
        "Inovasi Fakultas Teknik",
        "Agenda Akademik Semester Depan",
        "Kolaborasi Riset Internasional",
        "Peresmian Gedung Baru Fakultas",
        "Seminar Nasional Teknologi Kesehatan",
    ];

    const allItems = [];
    for (let i = 0; i < 24; i++) {
        const id = i + 1;
        const title = `${baseItems[i % baseItems.length]} (Item ${id})`;
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, '');

        allItems.push({
            id: id,
            imageSrc: "/images/berita.jpeg",
            title: title,
            slug: slug
        });
    }
    return allItems;
};


export default function Berita(props) {

    const newsItems = createNewsItems();

    const [displayCount, setDisplayCount] = useState(4);
    const [searchQuery, setSearchQuery] = useState('');

    const displayOptions = [
        { value: 4, label: '4 Berita' },
        { value: 6, label: '6 Berita' },
        { value: 12, label: '12 Berita' },
        { value: 18, label: '18 Berita' },
        { value: 24, label: '24 Berita' },
        { value: newsItems.length, label: 'Semua' },
    ];

    const filteredItems = useMemo(() => {
        if (!searchQuery) {
            return newsItems;
        }

        const lowerCaseQuery = searchQuery.toLowerCase();

        return newsItems.filter(item =>
            item.title.toLowerCase().includes(lowerCaseQuery)
        );
    }, [newsItems, searchQuery]);

    const itemsToDisplay = filteredItems.slice(0, displayCount);

    const handleSelectChange = (event) => {
        setDisplayCount(parseInt(event.target.value));
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

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

                        <p className="text-lg md:text-2xl leading-relaxed text-gray-800 font-sans max-w-5xl font-light tracking-wide mx-auto mb-10">
                            Halaman Berita menampilkan informasi terbaru seputar kegiatan di Universitas Yarsi, pengumuman penting, serta
                            perkembangan yang terjadi di lingkungan Universitas Yarsi. Beragam update mengenai acara, prestasi, dan informasi
                            akademik maupun non-akademik yang disajikan secara ringkas dan mudah diakses.
                        </p>
                    </div>
                </div>

                <div className="bg-white py-16 md:py-20">
                    <div className="container mx-auto px-6 lg:px-8">

                        <div className="flex justify-end items-center mb-8">
                            {/* Kolom Pencarian dengan Ikon */}
                            <div className="relative w-full md:w-auto">
                                <input
                                    type="text"
                                    placeholder="Cari nama berita..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className="border border-gray-300 rounded-md shadow-sm pl-10 pr-4 py-2 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                <svg
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    ></path>
                                </svg>
                            </div>
                        </div>

                        {/* GRID BERITA */}
                        {itemsToDisplay.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                                {itemsToDisplay.map((item) => (
                                    <NewsCard
                                        key={item.id}
                                        title={item.title}
                                        imageSrc={item.imageSrc}
                                        link={route('berita.show', { id: item.id, slug: item.slug })}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-xl text-gray-500 py-10">
                                Tidak ditemukan berita yang sesuai dengan kata kunci "{searchQuery}".
                            </div>
                        )}

                        <div className="mt-8 flex justify-between items-center flex-wrap">

                            {/* Kotak Pilihan */}
                            <div className="flex items-center mb-4 md:mb-0">
                                <label htmlFor="display-select" className="block text-gray-700 font-medium mr-3 self-center whitespace-nowrap">
                                    Tampilkan:
                                </label>
                                <select
                                    id="display-select"
                                    value={displayCount}
                                    onChange={handleSelectChange}
                                    className="border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    {displayOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="text-gray-600">
                                Menampilkan {itemsToDisplay.length} dari {filteredItems.length} berita.
                            </div>

                        </div>

                    </div>
                </div>

                <Footer />

            </MainLayout>
        </>
    );
}
