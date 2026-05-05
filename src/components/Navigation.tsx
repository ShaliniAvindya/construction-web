import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import SearchOverlay from "./SearchOverlay";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(8,8,8,0.92)] backdrop-blur-[20px] border-b border-[#3F3F46]/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="font-[var(--font-display)] text-xl tracking-[0.08em] text-white hover:text-[#C9A87C] transition-colors"
          >
            APEX CONSTRUCT
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs uppercase tracking-[0.15em] transition-colors duration-300 ${
                  location.pathname === link.path
                    ? "text-[#C9A87C] border-b-2 border-[#C9A87C] pb-1"
                    : "text-[#A1A1AA] hover:text-[#C9A87C]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="text-[#A1A1AA] hover:text-[#C9A87C] transition-colors p-2"
              aria-label="Search"
            >
              <FiSearch size={20} />
            </button>

            <Link
              to="/login"
              className="hidden sm:inline-flex text-xs uppercase tracking-[0.12em] text-[#C9A87C] border border-[#3F3F46] px-6 py-2.5 hover:bg-[#C9A87C] hover:text-[#080808] hover:border-[#C9A87C] transition-all duration-300"
            >
              Client Login
            </Link>
              <Link
                to="/login"
                className="hidden sm:inline-flex text-xs uppercase tracking-[0.12em] text-[#C9A87C] border border-[#3F3F46] px-6 py-2.5 hover:bg-[#C9A87C] hover:text-[#080808] hover:border-[#C9A87C] transition-all duration-300"
              >
                Client Login
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[rgba(8,8,8,0.98)] flex flex-col items-center justify-center gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-2xl uppercase tracking-[0.15em] text-white hover:text-[#C9A87C] transition-colors"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/login"
            className="mt-4 text-sm uppercase tracking-[0.12em] text-[#C9A87C] border border-[#C9A87C] px-8 py-3"
          >
            Client Login
          </Link>
        </div>
      )}

      {/* Search Overlay */}
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </>
  );
}
