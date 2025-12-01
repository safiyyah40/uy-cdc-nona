import React from 'react';

const TESMB_IMAGE_URL = "/images/tesmb.jpeg";

const LAYANAN_TES = [
    {
        id: 1,
        judul: "Konseling Persiapan Karir",
        deskripsi: "Bimbingan personal untuk merencanakan langkah karira dan mencapai tujuan profesional Anda.",
        imageUrl: TESMB_IMAGE_URL,
    },
    {
        id: 2,
        judul: "Ulasan CV",
        deskripsi: "Tinjauan dan umpan balik ahli untuk memastikan CV Anda menonjol di mata perekrut.",
        imageUrl: TESMB_IMAGE_URL,
    },
    {
        id: 3,
        judul: "Tes Minat & Bakat",
        deskripsi: "Asesmen psikologis untuk mengidentifikasi minat, kekuatan, dan bidang karir yang cocok.",
        imageUrl: TESMB_IMAGE_URL,
    },
];

const TesMinatBakat = () => {
    return (
        <section id="layanan-tes" className="py-20 bg-green-700">
            <div className="container mx-auto px-4 md:px-8 max-w-6xl text-white">

                <h2 className="text-3xl md:text-4xl font-sans font-bold text-center mb-16">
                    Persiapkan Dirimu dan Latih Kemampuanmu
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center">
                    {LAYANAN_TES.map((layanan) => (
                        <div
                            key={layanan.id}
                            className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-xs h-full flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-[1.03]"
                        >

                            <div className="h-48 w-full flex items-center justify-center mb-4">
                                <img
                                    src={layanan.imageUrl}
                                    alt={layanan.judul}
                                    className="h-full w-full object-cover rounded-lg"
                                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/300x300/A8D0B3/000?text=Ikon" }}
                                />
                            </div>

                            <div className="mt-4 flex-grow">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    {layanan.judul}
                                </h3>
                            </div>

                            <button
                                className="mt-6 px-4 py-3 w-full max-w-[80%]
                                           text-white font-bold
                                           rounded-md shadow-lg
                                           bg-gradient-to-r from-teal-500 to-green-700
                                           hover:from-teal-600 hover:to-green-800
                                           transition-all duration-300 transform hover:scale-[1.03]"
                                onClick={() => console.log(`Mulai ${layanan.judul}`)}
                            >
                                Mulai Sekarang
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default TesMinatBakat;
