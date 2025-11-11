import { Link, usePage } from '@inertiajs/react';

const LOGO_YARSI_CDC = '/images/LOGO CDC-UY.png';

// Komponen Link Navigasi
function NavLink({ href, children }) {
    const { url } = usePage();
    const isActive = url === href;

    return (
        <Link
            href={href}
            className={`px-4 py-2 text-sm font-semibold transition-all duration-150 rounded-lg
                ${isActive
                    ? 'bg-yarsi-green text-white shadow-md'
                    : 'text-gray-800 hover:bg-gray-100 rounded-lg'
                }
            `}
        >
            {children}
        </Link>
    );
}

// Komponen Dropdown (dummy)
function NavDropdown({ title }) {
    return (
        <div className="relative">
            <button className="flex items-center px-3 py-2 text-sm font-semibold text-gray-800 hover:text-yarsi-green transition-colors rounded-lg">
                {title}
                <svg className="ml-1 h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </div>
    );
}

export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100 overflow-x-hidden">

            <div className="fixed w-full z-50 top-0 flex justify-center pt-4 px-4">
                <header className="w-full max-w-7xl bg-white shadow-xl rounded-b-2xl transition-all duration-200">
                    <nav className="px-6">
                        <div className="flex h-20 items-center justify-between">

                            {/* Logo */}
                            <div className="flex-shrink-0">
                                <Link href="/">
                                    <img src={LOGO_YARSI_CDC} alt="Logo CDC YARSI" className="h-14" />
                                </Link>
                            </div>

                            {/* Menu Tengah */}
                            <div className="hidden md:flex md:items-center md:space-x-4">
                                <NavLink href="/">BERANDA</NavLink>
                                <NavDropdown title="PROFIL" />
                                <NavDropdown title="PROGRAM" />
                                <NavDropdown title="LAYANAN" />
                                <NavDropdown title="PELUANG KARIR" />
                            </div>

                            {/* Tombol Masuk */}
                            <div className="flex items-center">
                                <Link
                                    href={route('login')}
                                    className="hidden md:inline-flex items-center rounded-lg bg-yarsi-gradient-button px-6 py-2.5 text-sm font-semibold text-white shadow-lg hover:opacity-90 transition-opacity"
                                >
                                    MASUK
                                </Link>

                                <div className="ml-4 flex items-center md:hidden">
                                    <button className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                        <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </nav>
                </header>
            </div>

            <main className="pt-28">
                {children}
            </main>
        </div>
    );
}
