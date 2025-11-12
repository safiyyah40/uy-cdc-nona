import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import VisiMisi from "../Components/VisiMisi";
import BeritaSection from "../Components/BeritaSection"; 


export default function Welcome(props) {
    return (
        <MainLayout>
            <Head title="Selamat Datang di CDC YARSI" />

            <div
                className="relative flex h-[calc(100vh-80px)] items-center justify-center overflow-hidden"
                style={{
                    backgroundImage: 'url(/images/bg-dreamina.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="z-10 text-center">
                    <div className="relative mb-4 inline-block">
                        <span className="absolute left-[-110px] top-1/2 block h-0.5 w-24 bg-gray-800"></span>
                        <h3 className="text-xl font-medium text-gray-700">
                            SELAMAT DATANG DI
                        </h3>
                        <span className="absolute right-[-110px] top-1/2 block h-0.5 w-24 bg-gray-800"></span>
                    </div>

                    <h1 className="text-5xl font-extrabold text-yarsi-green md:text-6xl">
                        CAREER DEVELOPMENT CENTER
                    </h1>
                    <h1 className="text-5xl font-extrabold text-yarsi-green md:text-6xl">
                        UNIVERSITAS YARSI
                    </h1>
                </div>
            </div>

            <VisiMisi />
            
            <BeritaSection /> 
            
        </MainLayout>
    );
}