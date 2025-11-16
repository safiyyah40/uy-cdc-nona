import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import Footer from '@/Components/Footer';

import { useInView } from 'react-intersection-observer'; 
import React, { useState, useRef, useCallback } from 'react';

const teamMembers = [
    { name: 'Safiyyah Yahya', npm: '1402023065', title: 'Backend Developer', image: '/images/safiyyah.jfif' },
    { name: 'Citra Fatika', npm: '1402023014', title: 'Frontend Developer', image: '/images/citra.jfif' },
    { name: 'Felicia Advi Syabani', npm: '1402023027', title: 'UI/UX Developer', image: '/images/felis.jfif' },
];

const slideData = [
    // Slide 1
    { image: '/images/pf1.jfif' },
    // Slide 2
    { image: '/images/pf2.jfif' },
    // Slide 3
    { image: '/images/pf3.jfif' },
];

export default function Developer() {

    const { ref: descRef, inView: descInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: teamTitleRef, inView: teamTitleInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: teamCardsRef, inView: teamCardsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: slideRef, inView: slideInView } = useInView({ triggerOnce: true, threshold: 0.1 });

    const getFadeClass = (inView, delay = 0) => 
        `transition-opacity duration-1000 ${inView ? 'opacity-100' : 'opacity-0'}` + 
        (delay > 0 ? ` delay-[${delay}ms]` : '');

    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderContainerRef = useRef(null);

    const scrollToSlide = useCallback((index) => {
        if (sliderContainerRef.current) {
            const slideWidth = sliderContainerRef.current.offsetWidth;
            sliderContainerRef.current.scrollTo({
                left: index * slideWidth,
                behavior: 'smooth'
            });
            setCurrentSlide(index);
        }
    }, []);

    const handleNext = () => {
        const nextIndex = (currentSlide + 1) % slideData.length;
        scrollToSlide(nextIndex);
    };

    const handlePrev = () => {
        const prevIndex = (currentSlide - 1 + slideData.length) % slideData.length;
        scrollToSlide(prevIndex);
    };

    return (
        <>
            <Head title="Pengembang" />

            <div className="fixed inset-0 bg-[url('/images/bg-dreamina.jpg')] bg-cover bg-center bg-fixed -z-10">
            </div>

            <div className="relative z-10">

                <div className="min-h-screen pt-40 pb-20 flex flex-col items-center justify-start"> 
                    <div className="container mx-auto px-6 max-w-5xl text-center mt-10">
                        {/* JUDUL */}
                        <h1 className={`text-5xl md:text-6xl font-extrabold mb-10 tracking-wide
                                       text-[#044732] font-kaisei
                                       opacity-0 animate-fadeIn duration-1000`}>
                            PENGEMBANG
                        </h1>
                        
                        <div ref={descRef} className={`mx-auto max-w-4xl mb-32 ${getFadeClass(descInView, 300)}`}>
                            <p className="text-xl md:text-2xl leading-relaxed mb-6 text-gray-800 font-sans
                                          font-semibold tracking-wide">
                                Halo, kami NONA! tiga mahasiswi Teknik Informatika, Fakultas Teknologi Informasi, Universitas YARSI, angkatan 2023. Proyek ini kami buat sebagai bagian dari tugas mata kuliah Pengembangan Aplikasi Multi Platform, yang bertujuan untuk melatih kemampuan kami dalam merancang, mengembangkan, dan menerapkan aplikasi yang dapat berjalan di berbagai platform.
                            </p>
                            <p className="text-xl md:text-2xl leading-relaxed text-gray-800 font-sans
                                          font-semibold tracking-wide">
                                Melalui proyek ini, kami berupaya untuk mengimplementasikan ilmu yang telah dipelajari selama perkuliahan, mulai dari tahap perancangan antarmuka, logika pemrograman, hingga proses pengujian aplikasi. Kami berharap hasil dari proyek ini tidak hanya menjadi bentuk penilaian akademik, tetapi juga menjadi pengalaman berharga yang dapat meningkatkan kemampuan kami dalam dunia pengembangan aplikasi modern.
                            </p>
                        </div>
                    </div>
                </div>

                {}
                <div className="w-full py-20 
                                bg-gradient-to-t from-[#1E8449] to-[#044732] 
                                text-white shadow-2xl"> 
                    <div className="container mx-auto px-6 text-center">

                        <h2 ref={teamTitleRef} 
                            className={`text-5xl font-kaisei font-bold mb-12 ${getFadeClass(teamTitleInView)}`}>
                            HALO, KAMI NONA!
                        </h2>

                        <div ref={teamCardsRef} className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto mb-10">
                            {teamMembers.map((member, index) => (
                                <div key={index} 
                                    className={`bg-white p-6 rounded-2xl 
                                             shadow-xl transition-all duration-500 ease-in-out 
                                             transform hover:scale-[1.05] 
                                             hover:shadow-green-500/50 hover:shadow-2xl 
                                             text-center overflow-visible 
                                             ${getFadeClass(teamCardsInView, index * 100)}`}
                                    >
                                    
                                    {}
                                    <img 
                                        src={member.image} 
                                        alt={`Foto ${member.name}`} 
                                        className="w-full h-80 object-cover rounded-lg mb-4 mx-auto shadow-md" 
                                        onError={(e) => { 
                                            e.target.onerror = null; 
                                            e.target.className = 'w-full h-80 bg-gray-300 rounded-lg mb-4 mx-auto flex items-center justify-center text-gray-500 font-bold';
                                            e.target.outerHTML = `<div class="${e.target.className}">Foto Tidak Ditemukan</div>`;
                                        }}
                                    />
                                    
                                    <h3 className="text-xl font-bold text-gray-800 mb-1 leading-tight">{member.name}</h3>
                                    <p className="text-sm font-medium text-gray-600 leading-tight mb-1">{member.title}</p>
                                    <p className="text-sm font-medium text-gray-500">{member.npm}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {}
                <div ref={slideRef} 
                     className={`w-full py-20 bg-gradient-to-b from-[#1E8449] to-[#82E0AA] text-white shadow-inner 
                                 ${getFadeClass(slideInView)}`}>
                    <div className="container mx-auto px-6">
                        
                        <h2 className="text-5xl font-kaisei font-bold mb-10 text-center">
                            OUR TEAMS
                        </h2>

                        {/* SLIDER CONTAINER */}
                        <div ref={sliderContainerRef} 
                             className="flex overflow-x-hidden snap-x snap-mandatory scroll-smooth 
                                        relative rounded-xl h-[40rem] overflow-hidden"> 
                            
                            {slideData.map((slide, index) => (
                                <div key={index} 
                                     className="w-full flex-shrink-0 snap-center flex flex-col justify-center items-center">
                                    <div className="w-full h-full max-w-6xl flex flex-col"> 
                                        
                                        {}
                                        {slide.title && (
                                            <h3 className="text-4xl font-bold text-center text-yellow-300 pt-10 pb-4 flex-shrink-0">
                                                {slide.title}
                                            </h3>
                                        )}
                                        {}
                                        {!slide.title && <div className="pt-10 flex-shrink-0"></div>}

                                        {}
                                        <div className="flex-grow flex items-center justify-center w-full px-4">
                                            <img 
                                                src={slide.image} 
                                                alt={slide.title || `Gambar ${index + 1}`} 
                                                className="w-full h-full object-contain rounded-xl shadow-2xl border-4 border-white/20"
                                                onError={(e) => {
                                                    e.target.onerror = null; 
                                                    e.target.className = 'w-full h-full bg-gray-700/50 rounded-xl flex items-center justify-center text-white text-xl font-bold';
                                                    e.target.outerHTML = `<div class="${e.target.className}">Gambar ${index + 1} Tidak Ditemukan</div>`;
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* NAVIGATION BUTTONS */}
                        <div className="flex justify-center space-x-4 mt-6">
                            <button 
                                onClick={handlePrev} 
                                className="bg-white text-[#1E8449] p-3 rounded-full shadow-lg hover:bg-gray-200 transition duration-300 transform hover:scale-110">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                            </button>
                            
                            <div className="flex space-x-2 items-center">
                                {slideData.map((_, index) => (
                                    <button 
                                        key={index} 
                                        onClick={() => scrollToSlide(index)} 
                                        className={`w-3 h-3 rounded-full transition-all duration-300 
                                                   ${currentSlide === index ? 'bg-yellow-400 w-5' : 'bg-white/50 hover:bg-white'}`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    ></button>
                                ))}
                            </div>

                            <button 
                                onClick={handleNext} 
                                className="bg-white text-[#1E8449] p-3 rounded-full shadow-lg hover:bg-gray-200 transition duration-300 transform hover:scale-110">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
                
                <Footer />
            </div>
        </>
    );
}

Developer.layout = (page) => <MainLayout children={page} />;