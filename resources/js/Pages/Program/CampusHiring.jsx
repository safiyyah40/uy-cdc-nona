import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Footer from '@/Components/Footer'; 
import { Head } from '@inertiajs/react';

export default function CampusHiring(props) {
    return (
        <>
            <Head title="Campus Hiring" />
            
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
                    <div className="container mx-auto px-6 lg:px-8 z-10 pt-16 md:pt-24">
                        
                        <h1 className="text-4xl md:text-5xl font-kaisei font-extrabold text-black mb-12 tracking-wide">
                            CAMPUS HIRING
                        </h1>
                        
                        
                        <p className="text-lg md:text-2xl leading-relaxed text-gray-800 font-sans max-w-5xl font-light tracking-wide">
                            Campus Hiring ini memberikan kesempatan bagi mahasiswa dan alumni Universitas YARSI untuk
                            mengenal lebih dekat dunia kerja, serta membuka peluang untuk mahasiswa bisa bergabung di dalamnya.
                            Universitas YARSI berkomitmen mendukung pengembangan karier mahasiswa dan alumni
                            melalui penyelenggaraan Career Day yang melibatkan berbagai mitra industri, termasuk program
                            campus hiring seperti ini.
                        </p>
                    </div>
                    
                </div>

                
                <div className="bg-gray-50 py-16 md:py-20">
                    <div className="container mx-auto px-6 lg:px-8 space-y-12">
                        
                        <ProgramCard 
                            title="Campus Hiring BRILiaN Internship Program (BIP)"
                            subtitle="Career Day 2025 Universitas YARSI"
                            description="Jakarta, 19 September 2025 — Sebagai bagian dari rangkaian Career Day 2025 
                                Universitas YARSI – Walk Interview. Universitas YARSI bekerja sama dengan @tauwork_id
                                dan PT. Siaga Abdi Utama menyelenggarakan Campus Hiring BRILiaN 
                                Internship Program (BIP) secara langsung di Kampus Universitas YARSI. Acara dibuka secara resmi oleh Wakil Rektor 1 Universitas YARSI, Dr. dr. Wening Sari, M.Kes. 
                                Dalam sambutannya, beliau menegaskan pentingnya sinergi antara perguruan tinggi
                                dan dunia industri dalam mempersiapkan lulusan yang siap kerja dan mampu beradaptasi
                                dengan kebutuhan pasar."
                            imageSrc="/images/campushiring.jpg" 
                        />

                        
                       <ProgramCard 
                            title="Campus Hiring BRILiaN Internship Program (BIP)"
                            subtitle="Career Day 2025 Universitas YARSI"
                            description="Jakarta, 19 September 2025 — Sebagai bagian dari rangkaian Career Day 2025 
                                Universitas YARSI – Walk Interview. Universitas YARSI bekerja sama dengan @tauwork_id
                                dan PT. Siaga Abdi Utama menyelenggarakan Campus Hiring BRILiaN 
                                Internship Program (BIP) secara langsung di Kampus Universitas YARSI. Acara dibuka secara resmi oleh Wakil Rektor 1 Universitas YARSI, Dr. dr. Wening Sari, M.Kes. 
                                Dalam sambutannya, beliau menegaskan pentingnya sinergi antara perguruan tinggi
                                dan dunia industri dalam mempersiapkan lulusan yang siap kerja dan mampu beradaptasi
                                dengan kebutuhan pasar."
                            imageSrc="/images/campushiring.jpg" 
                        />

                    </div>
                </div>

                
                <Footer />
                
            </MainLayout>
        </>
    );
}

const ProgramCard = ({ title, subtitle, description, imageSrc }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden md:flex">
            
            <div className="md:w-5/12">
                <img
                    className="h-full w-full object-cover"
                    src={imageSrc}
                    alt={title}
                />
            </div>
            
            
            <div className="p-8 md:w-7/12">
                <div className="uppercase tracking-wide text-sm text-[#115C47] font-semibold">{title}</div>
                <p className="mt-1 text-2xl font-bold text-gray-900 leading-tight">{subtitle}</p>
                <p className="mt-4 text-gray-500 text-base leading-relaxed">{description}</p>
            </div>
        </div>
    );
}