import React, { useState, useCallback, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { ArrowRight, Briefcase } from 'lucide-react';

/**
 * Komponen Slider Lowongan Pekerjaan
 * Menampilkan daftar lowongan kerja terbaru dalam bentuk carousel 3D dengan auto-play.
 */

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

    const jobList = Array.isArray(jobs) ? jobs : [];
    const totalJobs = jobList.length;

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setCardWidth(280);
            } else {
                setCardWidth(380);
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

    useEffect(() => {
        if (isPaused || totalJobs <= 1) return;
        const interval = setInterval(nextSlide, 4000);
        return () => clearInterval(interval);
    }, [nextSlide, isPaused, totalJobs]);

    if (totalJobs === 0) return null;

    return (
        <section className="pt-8 pb-16 md:pt-12 md:pb-24 bg-white relative overflow-hidden font-inter">

            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-50/50 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">

                {/* Header Section  */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <span className="inline-flex items-center text-sm font-bold text-emerald-600 uppercase tracking-widest mb-2">
                            <Briefcase className="w-4 h-4 mr-2" />
                            Peluang Karir
                        </span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 leading-tight">
                            Lowongan Pekerjaan <span className="text-emerald-700">Terbaru</span>
                        </h2>
                        <p className="text-gray-600 mt-3 max-w-2xl text-lg">
                            Temukan peluang karir profesional yang sesuai dengan keahlian Anda.
                        </p>
                    </div>

                    <Link
                        href={route('loker.index')}
                        className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-all shadow-sm group"
                    >
                        Lihat Semua Lowongan
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div
                    className="relative flex justify-center items-center h-[550px]"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {totalJobs > 1 && (
                        <>
                            <button
                                onClick={prevSlide}
                                className="absolute left-0 top-1/2 -translate-y-1/2 z-30 p-3 ml-4 rounded-full bg-emerald-100/50 hover:bg-emerald-200 transition-colors focus:outline-none shadow-lg group"
                                aria-label="Previous"
                            >
                                <svg className="w-6 h-6 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
                            </button>

                            <button
                                onClick={nextSlide}
                                className="absolute right-0 top-1/2 -translate-y-1/2 z-30 p-3 mr-4 rounded-full bg-emerald-100/50 hover:bg-emerald-200 transition-colors focus:outline-none shadow-lg group"
                                aria-label="Next"
                            >
                                <svg className="w-6 h-6 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </>
                    )}

                    <div className="relative w-full h-[500px]">
                        {jobList.map((job, index) => {
                            let offset = (index - activeIndex);
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

                {totalJobs > 1 && (
                    <div className="flex justify-center space-x-3 mt-4">
                        {jobList.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    activeIndex === index
                                    ? 'bg-emerald-600 scale-110 shadow-md'
                                    : 'bg-gray-300 hover:bg-emerald-300'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}

                <div className="mt-10 text-center md:hidden">
                    <Link
                        href={route('loker.index')}
                        className="inline-flex items-center justify-center w-full px-6 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-all shadow-sm"
                    >
                        Lihat Semua Lowongan
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LowonganPekerjaan;
