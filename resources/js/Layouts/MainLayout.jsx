import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import { X, ChevronDown, User, LogOut, Home, Users, Briefcase, Wrench, TrendingUp } from 'lucide-react';

const LOGO_YARSI_CDC = '/images/LOGO CDC-UY.png';

// KOMPONEN NAVIGASI UTAMA
function NavLink({ href, children }) {
    const { url } = usePage();
    const cleanHref = href.replace(window.location.origin, '');

    const isActive =
        url === cleanHref ||
        (cleanHref !== '/' && url.startsWith(cleanHref));

    return (
        <Link
            href={href}
            className={`px-6 xl:px-8 py-3 xl:py-4 text-lg xl:text-[22px] font-semibold rounded-xl transition-all duration-200 whitespace-nowrap
            ${isActive
                    ? 'bg-cdc-green-dark text-white shadow-[0_3px_10px_rgba(0,0,0,0.18)]'
                    : 'text-cdc-green-dark hover:bg-cdc-green-dark hover:text-white'
                }`}
        >
            {children}
        </Link>
    );
}

// KOMPONEN LINK DROPDOWN
function DropdownLink({ href = '#', children }) {
    const { url } = usePage();
    const isActive = href && href !== '#' && url.startsWith(href);

    return (
        <Link
            href={href}
            className={`block whitespace-nowrap px-5 xl:px-6 py-2.5 xl:py-3 text-base xl:text-lg font-semibold border-b border-gray-200 last:border-b-0
            transition-all duration-150
            ${isActive
                    ? 'bg-cdc-green-dark text-white'
                    : 'text-cdc-green-dark hover:bg-cdc-green-dark hover:text-white'
                }`}
        >
            {children}
        </Link>
    );
}

// KOMPONEN LINK DROPDOWN PROFIL
function ProfileDropdownLink({ href, method = 'get', as = 'a', children }) {
    return (
        <Link
            href={href}
            method={method}
            as={as}
            className="block w-full px-5 py-3 text-left text-base xl:text-lg font-semibold text-cdc-green-dark transition-all duration-200 hover:bg-cdc-green-dark hover:text-white"
        >
            {children}
        </Link>
    );
}

// KOMPONEN DROPDOWN NAVIGASI
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
                className={`flex items-center px-5 xl:px-7 py-3 xl:py-4 text-lg xl:text-[22px] font-semibold rounded-xl transition-all duration-200 whitespace-nowrap
                ${isActive
                        ? 'bg-cdc-green-dark text-white shadow-[0_3px_10px_rgba(0,0,0,0.18)]'
                        : 'text-cdc-green-dark hover:bg-cdc-green-dark hover:text-white'
                    }`}
            >
                {title}
                <svg
                    className={`ml-1.5 xl:ml-2 h-4 xl:h-5 w-4 xl:w-5 transition-transform duration-200 ${isActive
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

// KOMPONEN MOBILE NAV LINK (UNTUK SIDEBAR)
function MobileNavLink({ href, children, onClick, icon: Icon }) {
    const { url } = usePage();
    const isActive = url === href || url.startsWith(href + '/');

    return (
        <Link
            href={href}
            onClick={onClick}
            className={`flex items-center gap-3 px-5 py-4 text-base font-semibold rounded-xl transition-all duration-200
            ${isActive ? 'bg-cdc-green-dark text-white shadow-md' : 'text-gray-700 hover:bg-emerald-50'}`}
        >
            {Icon && <Icon className="w-5 h-5" />}
            <span>{children}</span>
        </Link>
    );
}

// KOMPONEN MOBILE DROPDOWN (UNTUK SIDEBAR)
function MobileDropdown({ title, children, icon: Icon }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full px-5 py-4 text-base font-semibold text-gray-700 hover:bg-emerald-50 rounded-xl transition-all"
            >
                <div className="flex items-center gap-3">
                    {Icon && <Icon className="w-5 h-5" />}
                    <span>{title}</span>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="pl-4 mt-1 space-y-1 border-l-2 border-emerald-100 ml-5">
                    {children}
                </div>
            )}
        </div>
    );
}

// KOMPONEN MOBILE DROPDOWN LINK
function MobileDropdownLink({ href, children, onClick }) {
    const { url } = usePage();
    const isActive = url.startsWith(href);

    return (
        <Link
            href={href}
            onClick={onClick}
            className={`block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
            ${isActive ? 'bg-cdc-green-dark text-white' : 'text-gray-600 hover:bg-emerald-50 hover:text-cdc-green-dark'}`}
        >
            {children}
        </Link>
    );
}

export default function MainLayout({ children }) {
    const { auth, contactInfo } = usePage().props;
    const user = auth.user;

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const profileDropdownRef = useRef(null);
    const notifDropdownRef = useRef(null);
    const sidebarRef = useRef(null);

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

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    return (
        <div className="min-h-screen bg-transparent overflow-x-hidden relative">
            {/* HEADER / NAVBAR */}
            <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-xl shadow-[0_8px_25px_rgba(0,0,0,0.12)] rounded-b-[40px] md:rounded-b-[60px]">
                <nav className="w-full flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-10 xl:px-20 py-2.5 sm:py-3 md:py-4 xl:py-5">
                    {/* LEFT SIDE - Logo & Desktop Menu */}
                    <div className="flex items-center space-x-3 md:space-x-4 lg:space-x-6 xl:space-x-8">
                        <Link href="/" className="flex-shrink-0">
                            <img
                                src={LOGO_YARSI_CDC}
                                alt="Logo"
                                className="h-12 sm:h-14 md:h-16 lg:h-20 xl:h-[92px] w-auto object-contain"
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-3 xl:space-x-6">
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
                                <DropdownLink href={route('layanan.cv.review')}>TINJAU CV</DropdownLink>
                                <DropdownLink href={route('layanan.tes.minat.bakat')}>TES MINAT & BAKAT RIASEC</DropdownLink>
                            </NavDropdown>

                            <NavDropdown title="PELUANG KARIR" basePath="/peluang-karir">
                                <DropdownLink href={route('magang.index')}>LOWONGAN MAGANG</DropdownLink>
                                <DropdownLink href={route('loker.index')}>LOWONGAN PEKERJAAN</DropdownLink>
                                <DropdownLink href={route('sertifikasi.index')}>PROGRAM SERTIFIKASI</DropdownLink>
                            </NavDropdown>
                        </div>
                    </div>

                    {/* RIGHT SIDE - Actions */}
                    <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 xl:space-x-6">
                        {/* Notifikasi Bell - Only for logged in users */}
                        {auth.user && (
                            <div className="relative" ref={notifDropdownRef}>
                                <button
                                    onClick={() => setIsNotifOpen(!isNotifOpen)}
                                    className="relative p-1.5 sm:p-2 text-cdc-green-dark rounded-full hover:bg-gray-100 transition-all group"
                                >
                                    <svg className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 xl:h-10 xl:w-10 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                                    </svg>
                                    <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 flex h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4">
                                        <span className="animate-ping absolute h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative rounded-full h-full w-full bg-red-500 border-2 border-white"></span>
                                    </span>
                                </button>
                                {isNotifOpen && (
                                    <div className="absolute top-full right-0 mt-2 sm:mt-4 w-64 sm:w-72 md:w-80 bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in duration-200">
                                        {/* Header Notifikasi */}
                                        <div className="px-4 sm:px-5 py-2.5 sm:py-3 bg-cdc-green-dark text-white font-bold text-sm sm:text-base text-center tracking-wider">
                                            NOTIFIKASI
                                        </div>

                                        {/* Content - Under Development State */}
                                        <div className="p-6 sm:p-8 flex flex-col items-center justify-center text-center">
                                            {/* Icon Visual Tambahan (Opsional: menggunakan SVG megaphone sederhana) */}
                                            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                                                <svg className="w-6 h-6 text-cdc-green-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                                </svg>
                                            </div>

                                            <h4 className="text-gray-800 font-bold text-sm sm:text-base mb-1">
                                                Segera Hadir!
                                            </h4>
                                            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                                                Fitur notifikasi sedang dalam tahap pengembangan. <br />
                                                <span className="font-semibold text-cdc-green-dark">Pantau terus, ya!</span>
                                            </p>
                                        </div>

                                        {/* Footer dekoratif tipis */}
                                        <div className="h-1 bg-gradient-to-r from-transparent via-cdc-green-dark/20 to-transparent opacity-50"></div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Button Login Mobile - VISIBLE di mobile saat TIDAK login */}
                        {!auth.user && (
                            <Link
                                href={route('login')}
                                className="lg:hidden inline-flex items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-r from-[#09AD79] to-[#044732] px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base md:text-lg font-bold text-white shadow-md hover:shadow-lg transition-all whitespace-nowrap"
                            >
                                MASUK
                            </Link>
                        )}

                        {/* Desktop Profile Dropdown */}
                        {auth.user ? (
                            <div className="relative hidden lg:block" ref={profileDropdownRef}>
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className={`p-2.5 xl:p-3 rounded-xl transition-all ${isProfileOpen ? 'bg-cdc-green-dark text-white shadow-md' : 'text-cdc-green-dark hover:bg-gray-100'}`}
                                >
                                    <svg className={`h-8 xl:h-10 w-8 xl:w-10 transition-transform ${isProfileOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-16 6h16" />
                                    </svg>
                                </button>
                                {isProfileOpen && (
                                    <div className="absolute top-full right-0 mt-4 w-64 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden z-50">
                                        <div className="px-5 py-4 border-b bg-gray-50 text-center">
                                            <p className="text-sm text-gray-500">Masuk sebagai</p>
                                            <p className="text-lg font-bold text-cdc-green-dark truncate">{auth.user.name}</p>
                                        </div>
                                        <div className="py-2">
                                            {/* PANEL ADMIN - Sekarang warnanya sama dengan menu lain */}
                                            {auth.user.role === 'admin' && (
                                                <a
                                                    href="/admin"
                                                    className="flex items-center gap-3 px-5 py-3 text-left text-base xl:text-lg font-semibold text-cdc-green-dark transition-all duration-200 hover:bg-cdc-green-dark hover:text-white"
                                                >
                                                    <TrendingUp className="w-5 h-5" />
                                                    <span>PANEL ADMIN</span>
                                                </a>
                                            )}

                                            <ProfileDropdownLink href={route('profile.show')}>
                                                <div className="flex items-center gap-3">
                                                    <User className="w-5 h-5" />
                                                    <span>AKUN SAYA</span>
                                                </div>
                                            </ProfileDropdownLink>

                                            <ProfileDropdownLink href={route('logout')} method="post" as="button">
                                                <div className="flex items-center gap-3 text-red-600 group-hover:text-white">
                                                    <LogOut className="w-5 h-5" />
                                                    <span>KELUAR</span>
                                                </div>
                                            </ProfileDropdownLink>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href={route('login')} className="hidden lg:inline-flex rounded-[10px] bg-gradient-to-r from-[#09AD79] to-[#044732] px-7 xl:px-9 py-3 xl:py-4 text-lg xl:text-[22px] font-semibold text-white shadow-lg hover:scale-105 transition-all whitespace-nowrap">
                                MASUK
                            </Link>
                        )}

                        {/* Hamburger Mobile Menu */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-1.5 sm:p-2 text-cdc-green-dark hover:bg-gray-100 rounded-lg sm:rounded-xl transition-all"
                            aria-label="Toggle menu"
                        >
                            <svg className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-16 6h16" />
                            </svg>
                        </button>
                    </div>
                </nav>
            </header>

            {/* OVERLAY (backdrop) */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] lg:hidden transition-opacity duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* MOBILE SIDEBAR MENU */}
            <aside
                ref={sidebarRef}
                className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-out lg:hidden overflow-y-auto
                ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Sidebar Header */}
                <div className="sticky top-0 bg-white backdrop-blur-lg border-b-2 border-emerald-100 p-4 sm:p-5 shadow-sm z-10">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <img src={LOGO_YARSI_CDC} alt="Logo" className="h-10 sm:h-12 w-auto" />
                        </div>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-2 hover:bg-emerald-50 rounded-xl text-gray-600"
                            aria-label="Close menu"
                        >
                            <X className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>

                    {/* User Info in Sidebar */}
                    {auth.user && (
                        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-emerald-200/50 shadow-sm">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="bg-white p-2 sm:p-2.5 rounded-lg sm:rounded-xl shadow-sm">
                                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-yarsi-green" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-gray-600 font-medium">Masuk sebagai</p>
                                    <p className="text-sm sm:text-base font-bold text-yarsi-green-dark truncate">{auth.user.name}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar Content */}
                <div className="p-4 sm:p-5 space-y-2">
                    <MobileNavLink
                        href={auth.user ? route('dashboard') : '/'}
                        onClick={() => setIsMobileMenuOpen(false)}
                        icon={Home}
                    >
                        BERANDA
                    </MobileNavLink>

                    <MobileDropdown title="PROFIL" icon={Users}>
                        <MobileDropdownLink href={route('profil.puskaka')} onClick={() => setIsMobileMenuOpen(false)}>
                            PUSKAKA-UY
                        </MobileDropdownLink>
                        <MobileDropdownLink href={route('profil.konselor')} onClick={() => setIsMobileMenuOpen(false)}>
                            KONSELOR
                        </MobileDropdownLink>
                        <MobileDropdownLink href={route('profil.developer')} onClick={() => setIsMobileMenuOpen(false)}>
                            PENGEMBANG
                        </MobileDropdownLink>
                    </MobileDropdown>

                    <MobileDropdown title="PROGRAM" icon={Briefcase}>
                        <MobileDropdownLink href={route('program.odk.index')} onClick={() => setIsMobileMenuOpen(false)}>
                            ORIENTASI DUNIA KERJA
                        </MobileDropdownLink>
                        <MobileDropdownLink href={route('program.campus.hiring')} onClick={() => setIsMobileMenuOpen(false)}>
                            CAMPUS HIRING
                        </MobileDropdownLink>
                        <MobileDropdownLink href={route('program.seminar')} onClick={() => setIsMobileMenuOpen(false)}>
                            SEMINAR
                        </MobileDropdownLink>
                        <MobileDropdownLink href={route('program.tips-dan-trik')} onClick={() => setIsMobileMenuOpen(false)}>
                            TIPS DAN TRIK
                        </MobileDropdownLink>
                        <MobileDropdownLink href={route('program.berita')} onClick={() => setIsMobileMenuOpen(false)}>
                            BERITA
                        </MobileDropdownLink>
                    </MobileDropdown>

                    <MobileDropdown title="LAYANAN" icon={Wrench}>
                        <MobileDropdownLink href={route('layanan.konsultasi')} onClick={() => setIsMobileMenuOpen(false)}>
                            KONSULTASI
                        </MobileDropdownLink>
                        <MobileDropdownLink href={route('layanan.cv.review')} onClick={() => setIsMobileMenuOpen(false)}>
                            TINJAU CV
                        </MobileDropdownLink>
                        <MobileDropdownLink href={route('layanan.tes.minat.bakat')} onClick={() => setIsMobileMenuOpen(false)}>
                            TES MINAT & BAKAT RIASEC
                        </MobileDropdownLink>
                    </MobileDropdown>

                    <MobileDropdown title="PELUANG KARIR" icon={TrendingUp}>
                        <MobileDropdownLink href={route('magang.index')} onClick={() => setIsMobileMenuOpen(false)}>
                            LOWONGAN MAGANG
                        </MobileDropdownLink>
                        <MobileDropdownLink href={route('loker.index')} onClick={() => setIsMobileMenuOpen(false)}>
                            LOWONGAN PEKERJAAN
                        </MobileDropdownLink>
                        <MobileDropdownLink href={route('sertifikasi.index')} onClick={() => setIsMobileMenuOpen(false)}>
                            PROGRAM SERTIFIKASI
                        </MobileDropdownLink>
                    </MobileDropdown>
                </div>

                {/* Sidebar Footer */}
                {auth.user && (
                    <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 sm:p-5">
                        <div className="space-y-2">
                            {auth.user.role === 'admin' && (
                                <a href="/admin" className="flex items-center gap-3 w-full px-4 sm:px-5 py-2.5 sm:py-3 bg-cdc-green-dark text-white font-bold text-sm sm:text-base rounded-xl hover:bg-emerald-700 transition-all shadow-md mb-2">
                                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span>PANEL ADMIN</span>
                                </a>
                            )}
                            <Link href={route('profile.show')} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 w-full px-4 sm:px-5 py-2.5 sm:py-3 bg-white border border-gray-200 text-cdc-green-dark font-semibold text-sm sm:text-base rounded-xl hover:bg-emerald-50 transition-all">
                                <User className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span>AKUN SAYA</span>
                            </Link>
                            <Link href={route('logout')} method="post" as="button" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 w-full px-4 sm:px-5 py-2.5 sm:py-3 bg-red-50 border border-red-200 text-red-600 font-semibold text-sm sm:text-base rounded-xl hover:bg-red-100 transition-all">
                                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span>KELUAR</span>
                            </Link>
                        </div>
                    </div>
                )}
            </aside>

            {/* MAIN CONTENT */}
            <main className="pt-[80px] sm:pt-[90px] md:pt-[100px] lg:pt-[110px] xl:pt-[130px]">
                {children}
            </main>

            {/* FOOTER */}
            <Footer contactInfo={contactInfo} />
        </div>
    );
}