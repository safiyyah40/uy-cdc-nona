import React, { useState, useCallback, useEffect } from 'react';
import { Link } from '@inertiajs/react';

// Gambar Placeholder jika logo kosong/error
const PLACEHOLDER_IMG = "https://placehold.co/400x400/044732/ffffff?text=YARSI";

// Helper untuk modulus yang aman
const getModulus = (n, m) => ((n % m) + m) % m;

const JobCard = ({ job, isActive, transformStyle }) => {
    // Cek path logo benar (apakah URL lengkap atau path storage)
    const logoUrl = job.logo
        ? (job.logo.startsWith('http') ? job.logo : `/storage/${job.logo}`)
        : PLACEHOLDER_IMG;

    return (
        <div
            className="w-full max-w-sm p-6 bg-white rounded-3xl shadow-2xl flex flex-col items-center border border-gray-100"
            style={transformStyle}
        >
            <div className="w-full h-full p-4 rounded-xl flex flex-col items-center text-gray-800">

                <div className="flex justify-center items-center h-20 w-20 rounded-xl overflow-hidden shadow-md bg-gray-50">
                    <img
                        src={logoUrl}
                        alt={`Logo ${job.company}`}
                        className="w-full h-full object-contain p-1"
                        onError={(e) => { e.target.onerror = null; e.target.src=PLACEHOLDER_IMG }}
                    />
                </div>

                <div className="text-center w-full mt-6">
                    <h3 className="text-xl font-bold mb-1 text-green-800 line-clamp-1" title={job.title}>
                        {job.title}
                    </h3>
                    <p className="text-sm font-semibold mb-4 text-gray-600 line-clamp-1" title={job.company}>
                        {job.company}
                    </p>

                    <hr className="border-gray-200 mb-4" />

                    <div className="text-xs text-left space-y-1 text-gray-700 w-full">
                        <p className="truncate">
                            <span className="font-semibold text-green-700 mr-1">Type:</span> {job.type}
                        </p>
                        <p className="truncate">
                            <span className="font-semibold text-green-700 mr-1">Location:</span> {job.location}
                        </p>
                        <p className="truncate">
                            <span className="font-semibold text-green-700 mr-1">Level:</span> {job.experience_level || '-'}
                        </p>
                        <p className="truncate">
                            <span className="font-semibold text-green-700 mr-1">Model:</span> {job.work_model || '-'}
                        </p>
                    </div>
                </div>

                <Link
                    href={route('loker.show', job.slug)}
                    className={`mt-8 px-6 py-2 bg-green-700 text-white font-semibold rounded-full shadow-lg hover:bg-green-800 transition-colors transform hover:scale-[1.02] ${!isActive ? 'pointer-events-none opacity-50' : ''}`}
                    tabIndex={isActive ? 0 : -1}
                >
                    Lihat Detail
                </Link>
            </div>
        </div>
    );
};

const LowonganPekerjaan = ({ jobs = [] }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [cardWidth, setCardWidth] = useState(320);

    // Safety check: Pastikan jobs adalah array valid
    const jobList = Array.isArray(jobs) ? jobs : [];
    const totalJobs = jobList.length;

    // Handle Responsive Card Width
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setCardWidth(280); // Mobile
            } else {
                setCardWidth(380); // Desktop
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nextSlide = useCallback(() => {
        if (totalJobs > 0) {
            setActiveIndex((current) => (current + 1) % totalJobs);
        }
    }, [totalJobs]);

    const prevSlide = useCallback(() => {
        if (totalJobs > 0) {
            setActiveIndex((current) => getModulus(current - 1, totalJobs));
        }
    }, [totalJobs]);

    // Auto play
    useEffect(() => {
        if (isPaused || totalJobs <= 1) return;
        const interval = setInterval(nextSlide, 4000);
        return () => clearInterval(interval);
    }, [nextSlide, isPaused, totalJobs]);

    // Jika tidak ada data, jangan render section ini
    if (totalJobs === 0) return null;

    return (
        <section className="py-20 relative bg-gradient-to-b from-green-500 to-white font-inter overflow-hidden">

            <div className="container mx-auto px-4 md:px-8 relative z-10">

                <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16 tracking-wide font-serif">
                    LOWONGAN PEKERJAAN
                </h2>

                <div
                    className="relative flex justify-center items-center h-[550px]"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >

                    {/* Navigation Buttons (Hanya muncul jika lebih dari 1 job) */}
                    {totalJobs > 1 && (
                        <>
                            <button
                                onClick={prevSlide}
                                className="absolute left-0 top-1/2 -translate-y-1/2 z-30 p-3 ml-4 rounded-full bg-white/30 hover:bg-white/50 transition-colors focus:outline-none shadow-lg"
                                aria-label="Previous"
                            >
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
                            </button>

                            <button
                                onClick={nextSlide}
                                className="absolute right-0 top-1/2 -translate-y-1/2 z-30 p-3 mr-4 rounded-full bg-white/30 hover:bg-white/50 transition-colors focus:outline-none shadow-lg"
                                aria-label="Next"
                            >
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </>
                    )}

                    {/* Cards Container */}
                    <div className="relative w-full h-[500px]">
                        {jobList.map((job, index) => {
                            // --- LOGIKA TRANSFORMASI KARTU ---
                            let offset = (index - activeIndex);

                            // Koreksi offset untuk circular loop
                            if (offset > totalJobs / 2) offset -= totalJobs;
                            if (offset < -totalJobs / 2) offset += totalJobs;

                            const isActive = offset === 0;

                            let translateX = 0;
                            let scale = 1;
                            let opacity = 1;
                            let zIndex = totalJobs - Math.abs(offset);

                            if (isActive) {
                                translateX = 0;
                                scale = 1;
                                opacity = 1;
                            } else {
                                const sign = Math.sign(offset);
                                // Logic geser kartu samping (seperti contoh Anda sebelumnya)
                                if (offset > 0) {
                                    translateX = cardWidth * 0.5 + (offset - 1) * cardWidth * 0.7;
                                } else {
                                    translateX = -cardWidth * 0.5 + (offset + 1) * cardWidth * 0.7;
                                }

                                scale = 1 - (Math.min(Math.abs(offset), 2) * 0.15);
                                opacity = 1 - (Math.min(Math.abs(offset), 2) * 0.3);
                            }

                            const transformStyle = {
                                transform: `translateX(${translateX}px) scale(${scale})`,
                                opacity: opacity,
                                zIndex: zIndex,
                                transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease',
                                position: 'absolute',
                                left: '50%',
                                marginLeft: `-${cardWidth / 2}px`,
                                width: `${cardWidth}px`,
                            };

                            return (
                                <JobCard
                                    key={job.id}
                                    job={job}
                                    isActive={isActive}
                                    transformStyle={transformStyle}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Pagination Dots */}
                {totalJobs > 1 && (
                    <div className="flex justify-center space-x-3 mt-10">
                        {jobList.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    activeIndex === index
                                    ? 'bg-green-700 scale-110 shadow-md'
                                    : 'bg-gray-400 hover:bg-green-300'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}

                {/* Footer Button */}
                <div className="text-center mt-16">
                    <Link
                        href={route('loker.index')}
                        className="inline-block px-12 py-3 text-lg font-bold rounded-full text-white shadow-xl hover:bg-teal-400 transition-all transform hover:scale-[1.05] bg-gradient-to-r from-teal-300 to-green-700/80"
                    >
                        SELENGKAPNYA
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LowonganPekerjaan;
