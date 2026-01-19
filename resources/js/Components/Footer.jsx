import React from 'react';

const MailIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);

const InstagramIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const Footer = ({ contactInfo }) => {
    const LOGO_CDC_URL = "/images/logocdc.png";

    // Default values jika contactInfo belum ada
    const contact = contactInfo || {
        email: 'bidang1@yarsi.ac.id',
        instagram_username: 'kariralumni.yarsi',
        address_university: 'Menara YARSI, Jl. Let. Jend. Suprapto Kav. 13. Cempaka Putih, Jakarta Pusat, DKI Jakarta 10510. Indonesia.',
        address_cdc: 'Pusat Kemahasiswaan Karir dan Alumni, Universitas Yarsi, Lantai.1, Rektorat'
    };

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
                                        {contact.address_university}
                                    </p>
                                </div>
                                <div>
                                    <p className="font-bold text-xl mb-1 text-black">CDC</p>
                                    <p className="text-lg max-w-lg">
                                        {contact.address_cdc}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Info Kontak (Email & Instagram) */}
                        <div className="space-y-4 text-gray-800 pt-8 md:pt-4 pr-6 md:pr-8">
                            <div className="flex items-center space-x-3">
                                <MailIcon className="w-7 h-7 text-green-700" />
                                <a 
                                    href={`mailto:${contact.email}`} 
                                    className="text-xl text-black hover:text-green-700 transition-colors"
                                >
                                    {contact.email}
                                </a>
                            </div>

                            <div className="flex items-center space-x-3">
                                <InstagramIcon className="w-7 h-7 text-green-700" />
                                <a 
                                    href={`https://instagram.com/${contact.instagram_username}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-xl text-black hover:text-green-700 transition-colors"
                                >
                                    {contact.instagram_username}
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
                        &copy; {new Date().getFullYear()} Career Development Center Universitas YARSI | All Rights Reserved
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;