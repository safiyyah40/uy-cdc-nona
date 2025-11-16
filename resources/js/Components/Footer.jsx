import React from 'react';

const MailIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);

const InstagramIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const CopyrightIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M14.833 11.667a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 0-4.333 0l-1.5 3.75"/><path d="M9.167 12.333a2.5 2.5 0 0 0 0 5 2.5 2.5 0 0 0 4.333 0l1.5-3.75"/></svg>
);

const Footer = () => {
    const LOGO_CDC_URL = "/images/logocdc.png";

    return (
        <footer className="bg-white font-inter">

            <div className="bg-[#E5F3E5] py-16">
                <div className="container mx-auto px-4 md:px-8 max-w-6xl">
                    <div className="flex flex-col md:flex-row justify-between items-start">

                        {/* LEFT SECTION: Logo & Address Block */}
                        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-12 mb-8 md:mb-0 w-full md:w-auto">

                            {/* Logo: Dibuat lebih besar dan rata kiri */}
                            <div className="flex-shrink-0 pt-2">
                                <img src={LOGO_CDC_URL} alt="Logo CDC Universitas YARSI" className="h-40 w-auto" />
                            </div>

                            {/* Address Block: Rata tengah secara vertikal dengan logo */}
                            <div className="flex flex-col justify-start space-y-4 text-gray-700">
                                <div>
                                    <p className="font-bold text-base mb-1 text-black">Universitas Yarsi</p>
                                    <p className="text-sm max-w-sm">
                                        Menara YARSI, Jl. Let. Jend. Suprapto Kav. 13.
                                        Cempaka Putih, Jakarta Pusat, DKI Jakarta 10510. Indonesia.
                                    </p>
                                </div>
                                <div>
                                    <p className="font-bold text-base mb-1 text-black">CDC</p>
                                    <p className="text-sm max-w-sm">
                                        Pusat Kemahasiswaan Karir dan Alumni,
                                        Universitas Yarsi, Lantai.1, Rektorat
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SECTION: Contact Info (Email & Instagram) */}
                        <div className="space-y-4 text-gray-800 pt-8 md:pt-4">
                            <div className="flex items-center space-x-3">
                                <MailIcon className="w-6 h-6 text-green-700" />
                                <a href="mailto:bidang1@yarsi.ac.id" className="text-base text-black hover:text-green-700 transition-colors">
                                    bidang1@yarsi.ac.id
                                </a>
                            </div>

                            <div className="flex items-center space-x-3">
                                <InstagramIcon className="w-6 h-6 text-green-700" />
                                <a href="https://instagram.com/kariralumni.yarsi" target="_blank" rel="noopener noreferrer" className="text-base text-black hover:text-green-700 transition-colors">
                                    kariralumni.yarsi
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="bg-white py-4 border-t border-gray-200">
                <div className="container mx-auto px-4 md:px-8 max-w-6xl text-center text-gray-800 text-sm">
                    <p className="flex items-center justify-center space-x-1 font-bold">
                        <CopyrightIcon className="w-4 h-4 inline" />
                        <span>2025 Universitas YARSI All Rights Reserved.</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
