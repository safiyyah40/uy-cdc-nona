import React from 'react';

const ODK_IMAGE_URL = "/images/odk.jpg";

const MATERI_ODK = [
    {
        id: 1,
        judul: "Strategi Karir",
        kategori: "Preparation",
        deskripsi: "Teknik jitu mencari peluang kerja dan memetakan jalur karir yang sesuai dengan minat dan potensi diri.",
        imageUrl: ODK_IMAGE_URL,
    },
    {
        id: 2,
        judul: "Personal Branding",
        kategori: "Professional",
        deskripsi: "Optimasi CV, pembuatan cover letter yang menarik, dan simulasi wawancara kerja yang profesional.",
        imageUrl: ODK_IMAGE_URL,
    },
    {
        id: 3,
        judul: "Etika & Dunia Kerja",
        kategori: "Soft Skill",
        deskripsi: "Memahami budaya kerja korporat, etika komunikasi, dan cara beradaptasi cepat di lingkungan baru.",
        imageUrl: ODK_IMAGE_URL,
    },
];

const ODKCard = () => {
    return (
        <section id="odk-section" className="relative py-20 bg-white overflow-hidden">

            {/* Background Decor */}
            <div className="absolute top-0 inset-x-0 h-full w-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-50 rounded-full blur-[100px] opacity-60 mix-blend-multiply"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-green-50 rounded-full blur-[100px] opacity-60 mix-blend-multiply"></div>
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-7xl">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-3xl">
                        <span className="inline-block py-1.5 px-3 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-wider uppercase mb-4">
                            Program Pembekalan
                        </span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.15]">
                            Orientasi <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-500">
                                Dunia Kerja.
                            </span>
                        </h2>
                    </div>
                    <p className="text-gray-500 max-w-sm text-base md:text-lg leading-relaxed text-left md:text-right">
                        Persiapan strategis untuk membantu calon lulusan bertransformasi menjadi profesional yang kompeten.
                    </p>
                </div>

                {/* Grid Kartu */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {MATERI_ODK.map((materi) => (
                        <div
                            key={materi.id}
                            className="group relative bg-white rounded-[2rem] border border-gray-100 shadow-lg hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 overflow-hidden flex flex-col h-full cursor-pointer hover:-translate-y-2"
                        >
                            {/* Image Wrapper */}
                            <div className="relative h-64 w-full overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10 opacity-50 group-hover:opacity-30 transition-opacity duration-500"></div>
                                <img
                                    src={materi.imageUrl}
                                    alt={materi.judul}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src="https://placehold.co/600x400/f1f5f9/059669?text=Materi+ODK";
                                    }}
                                />

                                {/* Badge */}
                                <div className="absolute top-5 left-5 z-20">
                                    <span className="backdrop-blur-xl bg-white/90 text-emerald-800 border border-white/40 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                                        {materi.kategori}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 flex flex-col flex-grow relative">
                                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                                    {materi.judul}
                                </h3>

                                <p className="text-gray-500 text-base leading-relaxed mb-6 flex-grow">
                                    {materi.deskripsi}
                                </p>

                                {/* Action */}
                                <div className="pt-6 border-t border-gray-100 mt-auto">
                                    <div className="text-sm font-bold text-emerald-600 group-hover:text-emerald-800 transition-colors flex items-center gap-2">
                                        Pelajari Materi
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ODKCard;
