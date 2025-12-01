import React from 'react';

const MailIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);

const InstagramIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const CopyrightIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10.08 10.86c.05-.33.16-.62.3-.87s.34-.46.59-.62c.24-.15.54-.22.91-.23.23.01.44.05.63.13.2.09.38.21.52.36s.25.33.34.53.13.42.14.64h1.79c-.02-.47-.11-.9-.28-1.29s-.4-.73-.7-1.01-.66-.5-1.08-.66-.88-.23-1.39-.23c-.65 0-1.22.11-1.7.34s-.88.53-1.2.92-.56.84-.71 1.36S8 11.29 8 11.87v.27c0 .58.08 1.12.23 1.64s.39.97.71 1.35.72.69 1.2.91c.48.22 1.05.34 1.7.34.47 0 .91-.08 1.32-.23s.77-.36 1.08-.63.56-.58.74-.94.29-.74.3-1.15h-1.79c-.01.21-.06.4-.15.58s-.21.33-.36.46-.32.23-.52.3c-.19.07-.39.09-.6.1-.36-.01-.66-.08-.89-.23-.25-.16-.45-.37-.59-.62s-.25-.55-.3-.88-.08-.67-.08-1v-.27c0-.35.03-.68.08-1.01zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
);

const Footer = () => {
    const LOGO_CDC_URL = "/images/logocdc.png";

    return (
        <footer className="bg-white font-inter">

            {/* Bagian Utama Footer (Alamat & Kontak) */}
            <div className="bg-[#E5F3E5] py-16">
                <div className="mx-auto w-full">
                    <div className="flex flex-col md:flex-row justify-between items-start w-full max-w-screen-2xl mx-auto">

                        {/* Logo dan Informasi Alamat */}
                        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 mb-10 md:mb-0 w-full md:w-auto justify-start pl-6 md:pl-8">

                            {/* Logo CDC */}
                            <div className="flex-shrink-0 mr-12">
                                <img src={LOGO_CDC_URL} alt="Logo CDC Universitas YARSI" className="h-40 w-auto" />
                            </div>

                            {/* Detail Alamat */}
                            <div className="flex flex-col justify-start space-y-4 text-gray-700 pt-4 md:pt-0">
                                <div>
                                    <p className="font-bold text-xl mb-1 text-black">Universitas Yarsi</p>
                                    <p className="text-lg max-w-lg">
                                        Menara YARSI, Jl. Let. Jend. Suprapto Kav. 13.
                                        Cempaka Putih, Jakarta Pusat, DKI Jakarta 10510. Indonesia.
                                    </p>
                                </div>
                                <div>
                                    <p className="font-bold text-xl mb-1 text-black">CDC</p>
                                    <p className="text-lg max-w-lg">
                                        Pusat Kemahasiswaan Karir dan Alumni,
                                        Universitas Yarsi, Lantai.1, Rektorat
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Info Kontak (Email & Instagram) */}
                        <div className="space-y-4 text-gray-800 pt-8 md:pt-4 pr-6 md:pr-8">
                            <div className="flex items-center space-x-3">
                                <MailIcon className="w-7 h-7 text-green-700" />
                                <a href="mailto:bidang1@yarsi.ac.id" className="text-xl text-black hover:text-green-700 transition-colors">
                                    bidang1@yarsi.ac.id
                                </a>
                            </div>

                            <div className="flex items-center space-x-3">
                                <InstagramIcon className="w-7 h-7 text-green-700" />
                                <a href="https://instagram.com/kariralumni.yarsi" target="_blank" rel="noopener noreferrer" className="text-xl text-black hover:text-green-700 transition-colors">
                                    kariralumni.yarsi
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Bagian Hak Cipta */}
            <div className="bg-white py-4 border-t border-gray-200">
                <div className="mx-auto w-full text-center text-gray-800">
                    <p className="flex items-center justify-center space-x-1 font-bold text-lg w-full max-w-screen-2xl mx-auto px-6 md:px-8">
                        <CopyrightIcon className="w-5 h-5 inline" />
                        <span>2025 Career Development Center Universitas YARSI | All Rights Reserved</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
