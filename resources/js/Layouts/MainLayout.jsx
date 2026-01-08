import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';

const LOGO_YARSI_CDC = '/images/LOGO CDC-UY.png';

// --- KOMPONEN NAVIGASI UTAMA ---
function NavLink({ href, children }) {
    const { url } = usePage();
    const cleanHref = href.replace(window.location.origin, '');

    const isActive =
        url === cleanHref ||
        (cleanHref !== '/' && url.startsWith(cleanHref));

    return (
        <Link
            href={href}
            className={`px-8 py-4 text-[22px] font-semibold rounded-xl transition-all duration-200
            ${
                isActive
                    ? 'bg-cdc-green-dark text-white shadow-[0_3px_10px_rgba(0,0,0,0.18)]'
                    : 'text-cdc-green-dark hover:bg-cdc-green-dark hover:text-white'
            }`}
        >
            {children}
        </Link>
    );
}

// --- KOMPONEN LINK DROPDOWN ---
function DropdownLink({ href = '#', children }) {
    const { url } = usePage();
    const isActive = href && href !== '#' && url.startsWith(href);

    return (
        <Link
            href={href}
            className={`block whitespace-nowrap px-6 py-3 text-lg font-semibold border-b border-gray-200 last:border-b-0
            transition-all duration-150
            ${
                isActive
                    ? 'bg-cdc-green-dark text-white'
                    : 'text-cdc-green-dark hover:bg-cdc-green-dark hover:text-white'
            }`}
        >
            {children}
        </Link>
    );
}

// --- KOMPONEN LINK DROPDOWN PROFIL ---
function ProfileDropdownLink({ href, method = 'get', as = 'a', children }) {
    return (
        <Link
            href={href}
            method={method}
            as={as}
            className="block w-full px-5 py-3 text-left text-lg font-semibold text-cdc-green-dark transition-all duration-200 hover:bg-cdc-green-dark hover:text-white"
        >
            {children}
        </Link>
    );
}

// --- KOMPONEN DROPDOWN NAVIGASI ---
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
                    ? 'bg-cdc-green-dark text-white shadow-[0_3px_10px_rgba(0,0,0,0.18)]'
                    : 'text-cdc-green-dark hover:bg-cdc-green-dark hover:text-white'
                }`}
            >
                {title}
                <svg
                    className={`ml-2 h-5 w-5 transition-transform duration-200 ${
                        isActive
                            ? 'rotate-180 text-white'
                            : 'text-cdc-green-dark group-hover:text-white group-hover:rotate-180'
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>

            <div className="absolute left-0 mt-2 min-w-full origin-top-left bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:scale-100 scale-95 transition-all duration-200">
                <div className="py-1">{children}</div>
            </div>
        </div>
    );
}

// --- KOMPONEN MOBILE NAV LINK ---
function MobileNavLink({ href, children, onClick }) {
    const { url } = usePage();
    const isActive = url === href || url.startsWith(href + '/');

    return (
        <Link
            href={href}
            onClick={onClick}
            className={`block px-4 py-3 text-base font-semibold rounded-lg transition-all duration-200
            ${isActive ? 'bg-cdc-green-dark text-white' : 'text-cdc-green-dark hover:bg-cdc-green-dark hover:text-white'}`}
        >
            {children}
        </Link>
    );
}

// --- KOMPONEN MOBILE DROPDOWN ---
function MobileDropdown({ title, children }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 last:border-b-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-base font-semibold text-cdc-green-dark hover:bg-gray-50 transition-all"
            >
                {title}
                <svg className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
            {isOpen && <div className="pl-4 pb-2 space-y-1">{children}</div>}
        </div>
    );
}

export default function MainLayout({ children }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const isCounselor = user?.role === 'konselor';

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const profileDropdownRef = useRef(null);
    const notifDropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) setIsProfileOpen(false);
            if (notifDropdownRef.current && !notifDropdownRef.current.contains(event.target)) setIsNotifOpen(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [usePage().url]);

    return (
        <div className="min-h-screen bg-transparent overflow-x-hidden relative">
            <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-xl shadow-[0_8px_25px_rgba(0,0,0,0.12)] rounded-b-[60px]">
                <nav className="w-full flex items-center px-6 lg:px-20 py-4 md:py-5">
                    <div className="flex items-center space-x-8">
                        <Link href="/" className="flex-shrink-0">
                            <img src={LOGO_YARSI_CDC} alt="Logo" className="h-16 md:h-[92px] object-contain" />
                        </Link>

                        <div className="hidden md:flex items-center space-x-6">
                            <NavLink href={auth.user ? route('dashboard') : '/'}>BERANDA</NavLink>

                            <NavDropdown title="PROFIL" basePath="/profil">
                                <DropdownLink href={route('profil.puskaka')}>PUSKAKA-UY</DropdownLink>
                                <DropdownLink href={route('profil.konselor')}>KONSELOR</DropdownLink>
                                <DropdownLink href={route('profil.developer')}>PENGEMBANG</DropdownLink>
                            </NavDropdown>

                            <NavDropdown title="PROGRAM" basePath="/program">
                                <DropdownLink href={route('program.odk.index')}>ORIENTASI DUNIA KERJA</DropdownLink>
                                <DropdownLink href={route('program.campus.hiring')}>CAMPUS HIRING</DropdownLink>
                                <DropdownLink href={route('program.seminar')}>SEMINAR</DropdownLink>
                                <DropdownLink href={route('program.tips-dan-trik')}>TIPS DAN TRIK</DropdownLink>
                                <DropdownLink href={route('program.berita')}>BERITA</DropdownLink>
                            </NavDropdown>

                            <NavDropdown title="LAYANAN" basePath="/layanan">
                                <DropdownLink href={route('layanan.konsultasi')}>KONSULTASI</DropdownLink>
                                <DropdownLink href={route('layanan.cv.review')}>REVIEW CV</DropdownLink>
                                <DropdownLink href={route('layanan.tes.minat.bakat')}>TES MINAT & BAKAT RIASEC</DropdownLink>
                            </NavDropdown>

                            <NavDropdown title="PELUANG KARIR" basePath="/peluang-karir">
                                <DropdownLink href={route('magang.index')}>LOWONGAN MAGANG</DropdownLink>
                                <DropdownLink href={route('loker.index')}>LOWONGAN PEKERJAAN</DropdownLink>
                                <DropdownLink href={route('sertifikasi.index')}>PROGRAM SERTIFIKASI</DropdownLink>
                            </NavDropdown>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 md:space-x-6 ml-auto">
                        {/* Lonceng Dropdown */}
                        {auth.user && (
                            <div className="relative" ref={notifDropdownRef}>
                                <button onClick={() => setIsNotifOpen(!isNotifOpen)} className="relative p-2 text-cdc-green-dark rounded-full hover:bg-gray-100 transition-all group">
                                    <svg className="h-8 w-8 md:h-10 md:w-10 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                                    </svg>
                                    <span className="absolute top-2 right-2 flex h-3 w-3 md:h-4 md:w-4">
                                        <span className="animate-ping absolute h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative rounded-full h-3 w-3 md:h-4 md:w-4 bg-red-500 border-2 border-white"></span>
                                    </span>
                                </button>
                                {isNotifOpen && (
                                    <div className="absolute top-full right-0 mt-4 w-72 md:w-80 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden z-50">
                                        <div className="px-5 py-3 bg-cdc-green-dark text-white font-bold text-center">NOTIFIKASI</div>
                                        <div className="max-h-60 overflow-y-auto">
                                            <div className="px-5 py-4 text-center text-sm text-gray-500">Belum ada notifikasi baru</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {auth.user ? (
                            <div className="relative hidden md:block" ref={profileDropdownRef}>
                                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className={`p-3 rounded-xl transition-all ${isProfileOpen ? 'bg-cdc-green-dark text-white shadow-md' : 'text-cdc-green-dark hover:bg-gray-100'}`}>
                                    <svg className={`h-10 w-10 transition-transform ${isProfileOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-16 6h16" />
                                    </svg>
                                </button>
                                {isProfileOpen && (
                                    <div className="absolute top-full right-0 mt-4 w-64 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden z-50">
                                        <div className="px-5 py-4 border-b bg-gray-50 text-center">
                                            <p className="text-sm text-gray-500">Masuk sebagai</p>
                                            <p className="text-lg font-bold text-cdc-green-dark truncate">{auth.user.name}</p>
                                        </div>
                                        <div className="py-2 text-center">
                                            <ProfileDropdownLink href={route('profile.show')}>AKUN</ProfileDropdownLink>
                                            <ProfileDropdownLink href={route('logout')} method="post" as="button">KELUAR</ProfileDropdownLink>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href={route('login')} className="hidden md:inline-flex rounded-[10px] bg-gradient-to-r from-[#09AD79] to-[#044732] px-9 py-4 text-[22px] font-semibold text-white shadow-lg hover:scale-105 transition-all">MASUK</Link>
                        )}

                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-3 text-gray-700">
                            <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16m-16 6h16" />}
                            </svg>
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white shadow-xl p-4 rounded-b-3xl border-t">
                        <div className="flex flex-col space-y-2">
                            <MobileNavLink href={auth.user ? route('dashboard') : '/'} onClick={() => setIsMobileMenuOpen(false)}>BERANDA</MobileNavLink>
                            <MobileDropdown title="PROFIL">
                                <DropdownLink href={route('profil.puskaka')}>PUSKAKA-UY</DropdownLink>
                                <DropdownLink href={route('profil.konselor')}>KONSELOR</DropdownLink>
                                <DropdownLink href={route('profil.developer')}>PENGEMBANG</DropdownLink>
                            </MobileDropdown>
                            <MobileDropdown title="PROGRAM">
                                <DropdownLink href={route('program.odk.index')}>ORIENTASI DUNIA KERJA</DropdownLink>
                                <DropdownLink href={route('program.campus.hiring')}>CAMPUS HIRING</DropdownLink>
                                <DropdownLink href={route('program.seminar')}>SEMINAR</DropdownLink>
                                <DropdownLink href={route('program.tips-dan-trik')}>TIPS DAN TRIK</DropdownLink>
                                <DropdownLink href={route('program.berita')}>BERITA</DropdownLink>
                            </MobileDropdown>
                            <MobileDropdown title="LAYANAN">
                                <DropdownLink href={route('layanan.konsultasi')}>KONSULTASI</DropdownLink>
                                <DropdownLink href={route('layanan.cv.review')}>REVIEW CV</DropdownLink>
                                <DropdownLink href={route('layanan.tes.minat.bakat')}>TES MINAT & BAKAT RIASEC</DropdownLink>
                            </MobileDropdown>
                            <MobileDropdown title="PELUANG KARIR">
                                <DropdownLink href={route('magang.index')}>LOWONGAN MAGANG</DropdownLink>
                                <DropdownLink href={route('loker.index')}>LOWONGAN PEKERJAAN</DropdownLink>
                                <DropdownLink href={route('sertifikasi.index')}>PROGRAM SERTIFIKASI</DropdownLink>
                            </MobileDropdown>
                            {!auth.user ? (
                                <Link href={route('login')} className="mt-4 block text-center rounded-lg bg-cdc-green-dark py-4 text-white font-bold">MASUK</Link>
                            ) : (
                                <div className="mt-4 pt-4 border-t space-y-2 text-center">
                                    <p className="font-bold text-cdc-green-dark">{auth.user.name}</p>
                                    <ProfileDropdownLink href={route('profile.show')}>AKUN</ProfileDropdownLink>
                                    <ProfileDropdownLink href={route('logout')} method="post" as="button">KELUAR</ProfileDropdownLink>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </header>
            <main className="pt-[120px] md:pt-[130px]">{children}</main>
        </div>
    );
}
 