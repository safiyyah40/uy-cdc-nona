import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';

const LOGO_YARSI_CDC = '/images/LOGO CDC-UY.png';

function NavLink({ href, children }) {
    const { url } = usePage();

    const isActive =
        url === href ||
        (href !== '/' && url.startsWith(href));

    return (
        <Link
            href={href}
            className={`px-8 py-4 text-[22px] font-semibold rounded-xl transition-all duration-200
            ${
                isActive
                    ? 'bg-[#006241] text-white shadow-[0_3px_10px_rgba(0,0,0,0.18)]'
                    : 'text-[#006241] hover:bg-[#006241] hover:text-white'
            }`}
        >
            {children}
        </Link>
    );
}

function DropdownLink({ href = '#', children }) {
    const { url } = usePage();
    const isActive = href && url.startsWith(href);

    return (
        <Link
            href={href}
            className={`block whitespace-nowrap px-6 py-3 text-lg font-semibold border-b border-gray-200 last:border-b-0
        transition-all duration-150
        ${
            isActive
                ? 'bg-[#006241] text-white'
                : 'text-[#006241] hover:bg-[#006241] hover:text-white'
        }`}
        >
            {children}
        </Link>
    );
}

// Dropdown Link Internal (Untuk Dropdown Profil)
function ProfileDropdownLink({ href, method = 'get', as = 'a', children }) {
    return (
        <Link
            href={href}
            method={method}
            as={as}
            className="
                block w-full px-5 py-3 text-left text-lg font-semibold 
                text-[#006241]
                transition-all duration-200
                hover:bg-[#006241] hover:text-white
            "
        >
            {children}
        </Link>
    );
}

// Dropdown Utama (Navigasi)
function NavDropdown({ title, children, basePath }) {
    const { url } = usePage();

    const isActive =
        (Array.isArray(basePath) 
            ? basePath.some(path => url.startsWith(path))
            : url.startsWith(basePath)
        ) ||
        React.Children.toArray(children).some(
            (child) => child.props.href && child.props.href !== '#' && url.startsWith(child.props.href)
        );


    return (
        <div className="relative group">
            <button
                className={`flex items-center px-7 py-4 text-[22px] font-semibold rounded-xl transition-all duration-200
                    ${isActive
                        ? 'bg-[#006241] text-white shadow-[0_3px_10px_rgba(0,0,0,0.18)]'
                        : 'text-[#006241] hover:bg-[#006241] hover:text-white'
                    }`}
            >
                {title}
                <svg
                    className={`ml-2 h-5 w-5 transition-transform duration-200 ${
                        isActive
                            ? 'rotate-180 text-white'
                            : 'text-[#006241] group-hover:text-white group-hover:rotate-180'
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            <div
                className="absolute left-0 mt-2 min-w-full origin-top-left bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50
                      opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:scale-100 scale-95
                      transition-all duration-200"
            >
                <div className="py-1">{children}</div>
            </div>
        </div>
    );
}

// Mobile Nav Link
function MobileNavLink({ href, children, onClick }) {
    const { url } = usePage();
    const isActive = url === href || url.startsWith(href + '/');

    return (
        <Link 
            href={href}
            onClick={onClick}
            className={`block px-6 py-4 text-lg font-semibold rounded-lg transition-all duration-200
                ${isActive
                    ? 'bg-[#006241] text-white'
                    : 'text-[#006241] hover:bg-[#006241] hover:text-white'
                }`}
        >
            {children}
        </Link>
    );
}

// Mobile Dropdown
function MobileDropdown({ title, children }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 last:border-b-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full px-6 py-4 text-lg font-semibold text-[#006241] hover:bg-gray-50 transition-all"
            >
                {title}
                <svg
                    className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            {isOpen && (
                <div className="pl-4 pb-2 space-y-1">
                    {children}
                </div>
            )}
        </div>
    );
}

// Layout Utama
export default function MainLayout({ children }) {
    const { auth } = usePage().props;
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const profileDropdownRef = useRef(null);

    // Efek untuk menutup dropdown profil jika klik di luar
        useEffect(() => {
            function handleClickOutside(event) {
                if (profileDropdownRef.current && 
                    !profileDropdownRef.current.contains(event.target)
                ) {
                    setIsProfileOpen(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [profileDropdownRef]);


    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [usePage().url]);

    return (
        <div className="min-h-screen bg-transparent overflow-x-hidden relative">
            {/* Header dengan style melengkung */}
            <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl rounded-b-[80px] shadow-[0_25px_60px_rgba(0,0,0,0.25)] transition-all duration-300">
                <nav className="w-full flex items-center px-12 lg:px-20 py-5">
                    {/* Logo dan Navigasi */}
                    <div className="flex items-center space-x-8">
                        <Link href="/" className="flex-shrink-0">
                            <img 
                                src={LOGO_YARSI_CDC} 
                                alt="Logo CDC YARSI" 
                                className="h-[92px] object-contain" 
                                onError={(e) => e.target.src = 'https://placehold.co/200x92/006241/white?text=LOGO'}
                            />
                        </Link>

                        {/* Menu Navigasi (Desktop) */}
                        <div className="hidden md:flex items-center space-x-6">
                            <NavLink href={auth.user ? route('dashboard') : '/'}>
                                BERANDA
                            </NavLink>

                           <NavDropdown title="PROFIL" basePath={['/profil-puskaka', '/profil-developer']}>
                                <DropdownLink href={route('profil.puskaka')}>PUSKAKA-UY</DropdownLink>
                                <DropdownLink href={route('profil.konselor')}>KONSELOR</DropdownLink>
                                <DropdownLink href={route('profil.developer')}>PENGEMBANG</DropdownLink>
                            </NavDropdown>

                            <NavDropdown title="PROGRAM" basePath="/program">
                                <DropdownLink href={route('program.orientasi.kerja')}>ORIENTASI DUNIA KERJA</DropdownLink>
                                <DropdownLink href={route('program.campus.hiring')}>CAMPUS HIRING</DropdownLink>
                                <DropdownLink href={route('program.seminar')}>SEMINAR</DropdownLink>
                                <DropdownLink href={route('program.tips.trik')}>TIPS DAN TRIK</DropdownLink>
                                <DropdownLink href={route('program.berita')}>BERITA</DropdownLink>
                            </NavDropdown>

                            <NavDropdown title="LAYANAN" basePath="/layanan">
                                <DropdownLink href="#">KONSULTASI</DropdownLink>
                                <DropdownLink href="#">CV REVIEW</DropdownLink>
                                <DropdownLink href="#">TES MINAT DAN BAKAT</DropdownLink>
                            </NavDropdown>

                            <NavDropdown title="PELUANG KARIR" basePath="/peluang-karir">
                                <DropdownLink href="#">MAGANG</DropdownLink>
                                <DropdownLink href="#">LOWONGAN KERJA</DropdownLink>
                            </NavDropdown>
                        </div>
                    </div>

                    {/* BAGIAN KANAN NAVBAR (Tombol Masuk / Menu Profil)*/}
                    <div className="flex items-center space-x-6 ml-auto">
                        {auth.user ? (
                            // Jika sudah Login menampilkan Hamburger Profil
                            <div className="relative hidden md:block" ref={profileDropdownRef}>
                                <button
                                    onClick={() => setIsProfileOpen(prev => !prev)}
                                    className={`
                                        flex items-center justify-center 
                                        rounded-xl p-3 transition-all duration-200 
                                        relative
                                        ${isProfileOpen 
                                            ? 'bg-[#006241] text-white shadow-[0_3px_10px_rgba(0,0,0,0.18)] scale-[1.03]'
                                            : 'text-[#006241] hover:bg-[#006241] hover:text-white hover:shadow-[0_3px_10px_rgba(0,0,0,0.18)]'
                                        }
                                    `}
                                >
                                    <svg 
                                        className={`h-10 w-10 transition-all duration-300 
                                            ${isProfileOpen ? 'rotate-90' : ''}
                                        `}
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path 
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2.5"
                                            d="M4 6h16M4 12h16m-16 6h16"
                                        />
                                    </svg>
                                </button>

                        {/* Dropdown Profil */}
                        {isProfileOpen && (
                            <div className="absolute top-full right-0 mt-4 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                                
                                {/* Header User */}
                                <div className="px-5 py-4 border-b bg-gray-50 border-gray-200">
                                    <p className="text-sm text-gray-500">Masuk sebagai</p>

                                    <div className="flex items-center gap-2 mt-1">
                                        {/* ICON USER */}
                                        <svg
                                            className="w-6 h-6 text-[#006241]"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M10 4A4 4 0 0 0 6 8A4 4 0 0 0 10 12A4 4 0 0 0 14 8A4 4 0 0 0 10 4M10 14C5.58 14 2 15.79 2 18V20H18V18C18 15.79 14.42 14 10 14Z" />
                                        </svg>

                                        <p className="text-lg font-bold text-[#006241] truncate">
                                            {auth.user.name}
                                        </p>
                                    </div>
                                </div>

                                {/* Menu Items */}
                                <div className="py-2">
                                    {/* AKUN */}
                                    <ProfileDropdownLink href={route('profile.show')}>
                                        <div className="flex items-center gap-3">
                                            {/* Icon AKUN */}
                                            <svg
                                                className="w-6 h-6"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                            >
                                                <path d="M10 4A4 4 0 0 0 6 8A4 4 0 0 0 10 12A4 4 0 0 0 14 8A4 4 0 0 0 10 4M17 12C16.87 12 16.76 12.09 16.74 12.21L16.55 13.53C16.25 13.66 15.96 13.82 15.7 14L14.46 13.5C14.35 13.5 14.22 13.5 14.15 13.63L13.15 15.36C13.09 15.47 13.11 15.6 13.21 15.68L14.27 16.5C14.25 16.67 14.24 16.83 14.24 17C14.24 17.17 14.25 17.33 14.27 17.5L13.21 18.32C13.12 18.4 13.09 18.53 13.15 18.64L14.15 20.37C14.21 20.5 14.34 20.5 14.46 20.5L15.7 20C15.96 20.18 16.24 20.35 16.55 20.47L16.74 21.79C16.76 21.91 16.86 22 17 22H19C19.11 22 19.22 21.91 19.24 21.79L19.43 20.47C19.73 20.34 20 20.18 20.27 20L21.5 20.5C21.63 20.5 21.76 20.5 21.83 20.37L22.83 18.64C22.89 18.53 22.86 18.4 22.77 18.32L21.7 17.5C21.72 17.33 21.74 17.17 21.74 17C21.74 16.83 21.73 16.67 21.7 16.5L22.76 15.68C22.85 15.6 22.88 15.47 22.82 15.36L21.82 13.63C21.76 13.5 21.63 13.5 21.5 13.5L20.27 14C20 13.82 19.73 13.65 19.42 13.53L19.23 12.21C19.22 12.09 19.11 12 19 12H17M10 14C5.58 14 2 15.79 2 18V20H11.68A7 7 0 0 1 11 17A7 7 0 0 1 11.64 14.09C11.11 14.03 10.56 14 10 14M18 15.5C18.83 15.5 19.5 16.17 19.5 17C19.5 17.83 18.83 18.5 18 18.5C17.16 18.5 16.5 17.83 16.5 17C16.5 16.17 17.17 15.5 18 15.5Z" />
                                            </svg>
                                            AKUN
                                        </div>
                                    </ProfileDropdownLink>

                                    {/* KELUAR */}
                                    <ProfileDropdownLink
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                    >
                                        <div className="flex items-center gap-3">
                                            {/* Icon LOGOUT */}
                                            <svg
                                                className="w-6 h-6"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                            >
                                                <path d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z" />
                                            </svg>
                                            KELUAR
                                        </div>
                                    </ProfileDropdownLink>
                                </div>
                            </div>
                        )}
                            </div>
                        ) : (
                            // Jika masih tamu menampilkan Tombol Masuk
                            <Link 
                                href={route('login')} 
                                className="hidden md:inline-flex items-center justify-center rounded-[10px] bg-gradient-to-r from-[#09AD79] to-[#044732] px-9 py-4 text-[22px] font-semibold text-white shadow-[0_6px_15px_rgba(0,0,0,0.25)] hover:scale-105 hover:brightness-110 transition-all duration-300"
                            >
                                MASUK
                            </Link>
                        )}

                        {/* Tombol Hamburger (Mobile) */}
                        <button 
                            onClick={() => setIsMobileMenuOpen(prev => !prev)} 
                            className="inline-flex md:hidden items-center justify-center rounded-md p-3 text-gray-700 hover:bg-gray-100 hover:text-[#006241] transition-all duration-200"
                        >
                            <svg className="h-14 w-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </nav>

                {/* --- Menu Mobile --- */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white shadow-lg p-4 rounded-b-3xl max-h-[80vh] overflow-y-auto">
                        <div className="flex flex-col space-y-2">
                            <MobileNavLink href={auth.user ? route('dashboard') : '/'}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                BERANDA
                            </MobileNavLink>

                            {/* Dropdown PROFIL */}
                            <MobileDropdown title="PROFIL">
                                <DropdownLink href={route('profil.puskaka')}>PUSKAKA-UY</DropdownLink>
                                <DropdownLink href={route('profil.konselor')}>KONSELOR</DropdownLink>
                                <DropdownLink href={route('profil.developer')}>PENGEMBANG</DropdownLink>
                            </MobileDropdown>

                            {/* Dropdown PROGRAM */}
                            <MobileDropdown title="PROGRAM">
                                <DropdownLink href="#">ORIENTASI DUNIA KERJA</DropdownLink>
                                <DropdownLink href="#">CAMPUS HIRING</DropdownLink>
                                <DropdownLink href="#">SEMINAR</DropdownLink>
                                <DropdownLink href="#">TIPS DAN TRIK</DropdownLink>
                            </MobileDropdown>

                            {/* Dropdown LAYANAN */}
                            <MobileDropdown title="LAYANAN">
                                <DropdownLink href="#">KONSULTASI</DropdownLink>
                                <DropdownLink href="#">CV REVIEW</DropdownLink>
                                <DropdownLink href="#">TES MINAT DAN BAKAT</DropdownLink>
                            </MobileDropdown>

                            {/* Dropdown PELUANG KARIR */}
                            <MobileDropdown title="PELUANG KARIR">
                                <DropdownLink href="#">MAGANG</DropdownLink>
                                <DropdownLink href="#">LOWONGAN KERJA</DropdownLink>
                            </MobileDropdown>

                            {/* Tombol Masuk untuk Tamu */}
                            {!auth.user && (
                                <Link 
                                    href={route('login')}
                                    className="mt-4 block text-center rounded-lg bg-gradient-to-r from-[#09AD79] to-[#044732] px-6 py-4 text-lg font-semibold text-white shadow-lg"
                                >
                                    MASUK
                                </Link>
                            )}

                            {/* Info User & Logout (jika login) */}
                            {auth.user && (
                                <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                                    <div className="px-4 py-2">
                                        <p className="text-base font-bold text-gray-900 truncate">{auth.user.name}</p>
                                        <p className="text-sm text-gray-500">{auth.user.email}</p>
                                    </div>
                                    <ProfileDropdownLink href={route('profile.show')}>
                                        AKUN
                                    </ProfileDropdownLink>
                                    <ProfileDropdownLink href={route('logout')} method="post" as="button">
                                        KELUAR
                                    </ProfileDropdownLink>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </header>

            {/* Konten Halaman */}
            <main className="pt-[140px] overflow-visible">{children}</main>
        </div>
    );
}