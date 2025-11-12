import { Link, usePage } from '@inertiajs/react';

const LOGO_YARSI_CDC = '/images/LOGO CDC-UY.png';

// === NavLink (Link Biasa)
function NavLink({ href, children }) {
  const { url } = usePage();
  const isActive = url === href || url.startsWith(href + '/');

  return (
    <Link
      href={href}
      className={`px-8 py-4 text-[22px] font-semibold rounded-xl transition-all duration-200
        ${
          isActive
            ? 'bg-[#006241] text-white shadow-[0_3px_10px_rgba(0,0,0,0.18)]'
            : 'text-gray-800 hover:text-white hover:bg-[#006241]'
        }
      `}
    >
      {children}
    </Link>
  );
}

// === Dropdown Link
function DropdownLink({ href = '#', children }) {
  const { url } = usePage();
  const isActive = url === href || url.startsWith(href + '/');

  return (
    <Link
      href={href}
      className={`block whitespace-nowrap px-6 py-3 text-lg font-semibold border-b border-gray-200 last:border-b-0
        transition-all duration-150
        ${
          isActive
            ? 'bg-[#006241] text-white'
            : 'text-gray-800 hover:bg-[#E6F4EA] hover:text-[#006241]'
        }`}
    >
      {children}
    </Link>
  );
}

// === Dropdown Utama
function NavDropdown({ title, children, basePath }) {
  const { url } = usePage();
  const isActive = url === basePath || url.startsWith(basePath + '/');

  return (
    <div className="relative group">
      {/* Tombol Utama Dropdown */}
      <button
        className={`flex items-center px-7 py-4 text-[22px] font-semibold rounded-xl transition-all duration-200
          ${
            isActive
              ? 'bg-[#006241] text-white shadow-[0_3px_10px_rgba(0,0,0,0.18)]'
              : 'text-gray-800 hover:bg-[#006241] hover:text-white'
          }`}
      >
        {title}
        <svg
          className={`ml-2 h-5 w-5 transition-transform duration-200 ${
            isActive ? 'rotate-180' : 'group-hover:rotate-180'
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

      {/* Isi Dropdown */}
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

// === Layout Utama
export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-transparent overflow-x-hidden relative">
      <header
        className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl
        rounded-b-[80px]
        shadow-[0_25px_60px_rgba(0,0,0,0.25)]
        transition-all duration-300"
      >
        <nav className="w-full flex items-center px-12 lg:px-20 py-5">
          {/* Logo dan Navigasi */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex-shrink-0">
              <img
                src={LOGO_YARSI_CDC}
                alt="Logo CDC YARSI"
                className="h-[92px] object-contain"
              />
            </Link>

            {/* Menu Navigasi */}
            <div className="hidden md:flex items-center space-x-6">
              <NavLink href="/">BERANDA</NavLink>

              <NavDropdown title="PROFIL" basePath="/profil">
                <DropdownLink href={route('profil.puskaka')}>
                  PUSKAKA-UY
                </DropdownLink>
                <DropdownLink href="#">
                  KONSELOR
                </DropdownLink>
                <DropdownLink href="#">
                  DEVELOPER
                </DropdownLink>
              </NavDropdown>

              <NavDropdown title="PROGRAM" basePath="/program">
                <DropdownLink href="#">
                  ORIENTASI DUNIA KERJA
                </DropdownLink>
                <DropdownLink href="#">
                  CAMPUS HIRING
                </DropdownLink>
                <DropdownLink href="#">
                  SEMINAR
                </DropdownLink>
                <DropdownLink href="#">
                  TIPS DAN TRIK
                </DropdownLink>
              </NavDropdown>

              <NavDropdown title="LAYANAN" basePath="/layanan">
                <DropdownLink href="#">
                  KONSULTASI
                </DropdownLink>
                <DropdownLink href="#">
                  CV REVIEW
                </DropdownLink>
                <DropdownLink href="#">
                  TES MINAT DAN BAKAT
                </DropdownLink>
              </NavDropdown>

              <NavDropdown title="PELUANG KARIR" basePath="/peluang-karir">
                <DropdownLink href="#">
                  MAGANG
                </DropdownLink>
                <DropdownLink href="#">
                  LOWONGAN KERJA
                </DropdownLink>
              </NavDropdown>
            </div>
          </div>

          {/* Tombol Masuk (Kanan) */}
          <div className="flex items-center space-x-6 ml-auto">
            <Link
              href={route('login')}
              className="hidden md:inline-flex items-center rounded-[10px] bg-yarsi-gradient-button
              px-9 py-4 text-[22px] font-semibold text-white
              shadow-[0_6px_15px_rgba(0,0,0,0.2)] hover:brightness-110
              transition-all duration-200"
            >
              MASUK
            </Link>

            <button className="inline-flex md:hidden items-center justify-center rounded-md p-3 text-gray-700 hover:bg-gray-100 hover:text-[#006241] transition-all duration-200">
              <svg
                className="h-14 w-14"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M4 6h16M4 12h16m0 6H4"
                />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Konten Halaman */}
      <main className="pt-[140px] overflow-visible">{children}</main>
    </div>
  );
}
