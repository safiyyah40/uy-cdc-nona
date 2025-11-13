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
    return (
        <footer className="bg-white">

            <div className="bg-[#E5F3E5] py-10">
                <div className="container mx-auto px-4 md:px-8 max-w-6xl">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-10 mb-8 md:mb-0">
                            <div className="flex flex-col items-start space-y-4">
                                <div className="text-3xl font-bold text-green-700">
                                                                    </div>
                                <div className="text-sm font-semibold text-green-800 border-t border-green-700 pt-2">
                                                                    </div>
                            </div>

                            <div className="space-y-6 text-gray-700">
                                <div>
                                    <p className="font-bold text-base mb-1">Universitas Yarsi</p>
                                    <p className="text-sm max-w-sm">
                                        Menara YARSI, Jl. Let. Jend. Suprapto Kav. 13.
                                        Cempaka Putih, Jakarta Pusat, DKI Jakarta 10510. Indonesia.
                                    </p>
                                </div>
                                <div>
                                    <p className="font-bold text-base mb-1">CDC</p>
                                    <p className="text-sm max-w-sm">
                                        Pusat Kemahasiswaan Karir dan Alumni,
                                        Universitas Yarsi, Lantai.1, Rektorat
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 text-gray-800">

                            <div className="flex items-center space-x-3">
                                <MailIcon className="w-6 h-6 text-green-700" />
                                <a href="mailto:bidang1@yarsi.ac.id" className="text-sm hover:text-green-700 transition-colors">
                                    bidang1@yarsi.ac.id
                                </a>
                            </div>

                            <div className="flex items-center space-x-3">
                                <InstagramIcon className="w-6 h-6 text-green-700" />
                                <a href="https://instagram.com/kariralumni.yarsi" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-green-700 transition-colors">
                                    kariralumni.yarsi
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="bg-white py-4 border-t border-gray-200">
                <div className="container mx-auto px-4 md:px-8 max-w-6xl text-center text-gray-600 text-sm">
                    <p className="flex items-center justify-center space-x-1">
                        <CopyrightIcon className="w-4 h-4 inline" />
                        <span>2025 Universitas YARSI All Rights Reserved.</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
