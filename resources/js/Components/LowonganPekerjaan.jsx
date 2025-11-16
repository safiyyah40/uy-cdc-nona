import React, { useState, useCallback, useEffect } from 'react';

const LOKER_IMAGE_URL = "/images/loker.jpeg";

const LOWONGAN = [
    {
        id: 1,
        title: "IT Business Analyst",
        company: "PT. Kolaborasi Tujuh Pelangi",
        logoUrl: LOKER_IMAGE_URL,
        type: "Full-Time",
        location: "On-site",
        education: "Minimum Associate Degree",
        experience: "1 - 3 years of experience"
    },
    {
        id: 2,
        title: "Digital Marketing Specialist",
        company: "PT. Inovasi Cepat",
        logoUrl: LOKER_IMAGE_URL,
        type: "Part-Time",
        location: "Remote",
        education: "Minimum Bachelor Degree",
        experience: "2+ years of experience"
    },
    {
        id: 3,
        title: "Data Scientist Junior",
        company: "Grup Teknologi Alpha",
        logoUrl: LOKER_IMAGE_URL,
        type: "Hybrid",
        location: "Hybrid",
        education: "Minimum Bachelor Degree",
        experience: "Fresh Graduate welcome"
    },
    {
        id: 4,
        title: "Human Resources Staff",
        company: "Yayasan Cipta Karya",
        logoUrl: LOKER_IMAGE_URL,
        type: "Contract",
        location: "On-site",
        education: "Minimum Diploma",
        experience: "1 year experience"
    }
];

const CARD_WIDTH = 380;

const JobCard = ({ job, index, activeIndex, totalJobs }) => {
    const distance = index - activeIndex;

    let translateX = distance * CARD_WIDTH * 0.7;
    let scale = 1;
    let opacity = 1;
    let zIndex = totalJobs - Math.abs(distance);

    if (distance !== 0) {
        scale = 1 - (Math.min(Math.abs(distance), 2) * 0.15);
        opacity = 1 - (Math.min(Math.abs(distance), 2) * 0.3);
        zIndex = totalJobs - Math.abs(distance);

        if (distance > 0) {
            translateX = CARD_WIDTH * 0.5 + (distance - 1) * CARD_WIDTH * 0.7;
        } else {
            translateX = -CARD_WIDTH * 0.5 + (distance + 1) * CARD_WIDTH * 0.7;
        }
    }

    const transformStyle = {
        transform: `translateX(${translateX}px) scale(${scale})`,
        opacity: opacity,
        zIndex: zIndex,
        transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease',
        position: 'absolute',
        left: '50%',
        marginLeft: `-${CARD_WIDTH / 2}px`,
    };

    return (
        <div
            className="w-full max-w-sm p-6 bg-white rounded-3xl shadow-2xl flex flex-col items-center border border-gray-100"
            style={transformStyle}
        >
            <div className="w-full h-full p-4 rounded-xl flex flex-col items-center text-gray-800">

                <div className="flex justify-center items-center h-20 w-20 rounded-xl overflow-hidden shadow-md bg-gray-50">
                    <img
                        src={job.logoUrl}
                        alt={`Logo ${job.company}`}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/80x80/285E61/FFFFFF?text=Loker" }}
                    />
                </div>

                <div className="text-center w-full mt-6">
                    <h3 className="text-xl font-bold mb-1 text-green-800">
                        {job.title}
                    </h3>
                    <p className="text-sm font-semibold mb-4 text-gray-600">
                        {job.company}
                    </p>
                    <hr className="border-gray-200 mb-4" />

                    <div className="text-xs text-left space-y-1 text-gray-700">
                        <p>
                            <span className="font-semibold text-green-700 mr-1">Type:</span> {job.type}
                        </p>
                        <p>
                            <span className="font-semibold text-green-700 mr-1">Location:</span> {job.location}
                        </p>
                        <p>
                            <span className="font-semibold text-green-700 mr-1">Education:</span> {job.education}
                        </p>
                        <p>
                            <span className="font-semibold text-green-700 mr-1">Experience:</span> {job.experience}
                        </p>
                    </div>
                </div>

                <button
                    className="mt-8 px-6 py-2 bg-green-700 text-white font-semibold rounded-full shadow-lg hover:bg-green-800 transition-colors transform hover:scale-[1.02]"
                    onClick={() => console.log(`Lihat detail ${job.title}`)}
                >
                    Lihat Detail
                </button>
            </div>
        </div>
    );
};


const LowonganPekerjaan = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const totalJobs = LOWONGAN.length;

    const nextSlide = useCallback(() => {
        setActiveIndex(prevIndex => (prevIndex + 1) % totalJobs);
    }, [totalJobs]);

    const prevSlide = useCallback(() => {
        setActiveIndex(prevIndex => (prevIndex - 1 + totalJobs) % totalJobs);
    }, [totalJobs]);

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [nextSlide]);

    return (
        <section
            // Background gradasi hijau-putih
            className="py-20 relative bg-gradient-to-b from-green-500 to-white font-inter"
        >

            <div className="container mx-auto px-4 md:px-8 relative z-10">

                <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16 tracking-wide font-serif">
                    LOWONGAN PEKERJAAN
                </h2>

                <div className="relative flex justify-center items-center h-[550px] overflow-hidden">

                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-30 p-3 ml-4 rounded-full bg-white/30 hover:bg-white/50 transition-colors focus:outline-none shadow-lg"
                        aria-label="Previous job posting"
                    >
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"/></svg>
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-30 p-3 mr-4 rounded-full bg-white/30 hover:bg-white/50 transition-colors focus:outline-none shadow-lg"
                        aria-label="Next job posting"
                    >
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/></svg>
                    </button>

                    <div className="relative w-full h-[500px]">
                        {LOWONGAN.map((job, index) => (
                            <JobCard
                                key={job.id}
                                job={job}
                                index={index}
                                activeIndex={activeIndex}
                                totalJobs={totalJobs}
                            />
                        ))}
                    </div>

                </div>

                <div className="flex justify-center space-x-3 mt-10">
                    {LOWONGAN.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                activeIndex === index ? 'bg-green-700 scale-110 shadow-md' : 'bg-gray-400 hover:bg-green-300'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                <div className="text-center mt-16">
                    <a
                        href="#"
                        className="inline-block px-12 py-3 text-lg font-bold rounded-full text-white shadow-xl hover:bg-teal-400 transition-all transform hover:scale-[1.05] bg-gradient-to-r from-teal-300 to-green-700/80"
                    >
                        SELENGKAPNYA
                    </a>
                </div>
            </div>
        </section>
    );
};

export default LowonganPekerjaan;