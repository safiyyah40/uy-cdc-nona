import React from 'react';

const MAGANG_IMAGE_URL = "/images/infomagang.jpeg";

const DUMMY_MAGANG = [
    {
        id: 1,
        judul: "Program Magang Digitalisasi BUMN Batch 3 Dibuka!",
        logoUrl: MAGANG_IMAGE_URL,
    },
    {
        id: 2,
        judul: "Peluang Magang sebagai Content Creator di Perusahaan Teknologi",
        logoUrl: MAGANG_IMAGE_URL,
    },
    {
        id: 3,
        judul: "Accenture Collaborates with 1910 Genetics to Help Biopharma",
        logoUrl: MAGANG_IMAGE_URL,
    },
    {
        id: 4,
        judul: "Lowongan Internship di Divisi Data Science & AI Startup",
        logoUrl: MAGANG_IMAGE_URL,
    },
];

const InfoMagang = () => {
    const primaryGreen = 'bg-green-700';
    
    return (
        <section className="py-20 bg-white font-inter">
            <div className="container mx-auto px-4 md:px-8 max-w-6xl">

                <div className="flex items-center mb-10">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-green-700 pr-4 whitespace-nowrap">
                        INFO MAGANG
                    </h2>

                    <div className="flex-grow border-b-4 border-green-700 h-px"></div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 justify-items-center">
                    {DUMMY_MAGANG.map((magang) => (
                        <div
                            key={magang.id}

                            className="w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden transform transition-transform duration-300 hover:scale-[1.03] border-t-8 border-green-700"
                        >
                            
                            <div className="w-full h-48 bg-[#0E072D] flex items-center justify-center p-0">
                                <img
                                    src={magang.logoUrl}
                                    alt={`Ilustrasi Magang ${magang.id}`}
                                    className="h-full w-full object-cover"
                                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/285E61/FFFFFF?text=InfoMagang" }}
                                />
                            </div>

                            <div className={`p-6 ${primaryGreen} text-white`}>
                                <h3 className="text-xl font-semibold mb-4 line-clamp-2">
                                    {magang.judul}
                                </h3>

                                <button
                                    className="mt-2 px-6 py-2 bg-white text-green-700 font-bold text-sm rounded-full shadow-lg hover:bg-gray-100 transition-colors transform hover:scale-[1.02]"
                                    onClick={() => console.log(`Lihat detail ${magang.judul}`)}
                                >
                                    Detail
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <a
                        href="#"
                        className={`inline-block px-12 py-3 text-lg font-bold rounded-full text-white shadow-xl hover:bg-teal-400 transition-all transform hover:scale-[1.05]
                                    bg-gradient-to-r from-teal-300 to-green-700/80`} 
                    >
                        SELENGKAPNYA
                    </a>
                </div>
            </div>
        </section>
    );
};

export default InfoMagang;