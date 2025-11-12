import { Link, usePage } from '@inertiajs/react';

const LOGO_YARSI_CDC = '/images/LOGO CDC-UY.png';

function NavLink({ href, children }) {
  const { url } = usePage();
  const isActive = url === href;

  return (
    <Link
      href={href}
      className={`px-8 py-4 text-[22px] font-semibold rounded-xl transition-all duration-200
        ${
          isActive
            ? 'bg-[#006241] text-white shadow-[0_3px_10px_rgba(0,0,0,0.18)]'
            : 'text-gray-800 hover:bg-[#F3F4F6] hover:text-[#006241]'
        }
      `}
    >
      {children}
    </Link>
  );
}

function NavDropdown({ title }) {
  return (
    <div className="relative group">
      <button className="flex items-center px-7 py-4 text-[22px] font-semibold text-gray-800 hover:text-[#006241] transition-all duration-200 rounded-xl">
        {title}
        <svg
          className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:rotate-180"
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
    </div>
  );
}

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-transparent overflow-x-hidden relative">
      <header
        className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl
        rounded-b-[80px]
        shadow-[0_25px_60px_rgba(0,0,0,0.25)]
        transition-all duration-300
        overflow-hidden"
      >
        <nav className="w-full flex items-center justify-between px-12 lg:px-20 py-5">

          <Link href="/" className="flex-shrink-0 flex items-center space-x-3">
            <img
              src={LOGO_YARSI_CDC}
              alt="Logo CDC YARSI"
              className="h-[92px] object-contain ml-2"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <NavLink href="/">BERANDA</NavLink>
            <NavDropdown title="PROFIL" />
            <NavDropdown title="PROGRAM" />
            <NavDropdown title="LAYANAN" />
            <NavDropdown title="PELUANG KARIR" />
          </div>

          <div className="flex items-center space-x-6 mr-4">

            <Link
              href={route('login')}
              className="hidden md:inline-flex items-center rounded-[10px] bg-yarsi-gradient-button
              px-9 py-4 text-[22px] font-semibold text-white
              shadow-[0_6px_15px_rgba(0,0,0,0.2)] hover:brightness-110
              transition-all duration-200"
            >
              MASUK
            </Link>

            <button className="inline-flex items-center justify-center rounded-md p-3 text-gray-700 hover:bg-gray-100 hover:text-[#006241] transition-all duration-200">
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

      <main className="pt-[140px] overflow-visible">{children}</main>
    </div>
  );
}
