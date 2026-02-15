import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [menuOpen]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Pricing", path: "/pricing" },
    { name: "Our Work", path: "/work" },
    { name: "Blog", path: "/blog" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      <div className="h-[96px]" />

      <div className="fixed top-0 left-0 right-0 h-[140px] -z-10 pointer-events-none">
        <div className="relative h-full overflow-hidden nexus-bg hero-grid">
          <div className="hero-vignette opacity-80" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,.35),transparent)]" />
        </div>
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 pt-4">
          <div className="relative rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,.45)]">
            <div className="flex items-center justify-between h-[78px] px-6">
              <Link to="/" className="flex items-center">
                <img
                  src="/DomiLogo.webp"
                  alt="Domi Websites"
                  className="h-16 w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,.6)]"
                />
              </Link>

              <nav className="hidden md:flex items-center gap-2">
                {navItems.map(({ name, path }) => {
                  const isActive = location.pathname === path;
                  return (
                    <Link
                      key={name}
                      to={path}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition
                        ${
                          isActive
                            ? "bg-white/10 text-white"
                            : "text-white/70 hover:text-white hover:bg-white/5"
                        }`}
                    >
                      {name}
                    </Link>
                  );
                })}

                <Link
                  to="/contact"
                  className="ml-3 px-6 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold shadow-lg hover:scale-105 transition"
                >
                  Contact
                </Link>
              </nav>

              <button
                className="md:hidden text-white text-2xl"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                {menuOpen ? "×" : "☰"}
              </button>
            </div>

            {menuOpen && (
              <div className="md:hidden px-6 pb-6">
                <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
                  {navItems.map(({ name, path }) => (
                    <Link
                      key={name}
                      to={path}
                      onClick={() => setMenuOpen(false)}
                      className="text-white/80 hover:text-white transition"
                    >
                      {name}
                    </Link>
                  ))}

                  <Link
                    to="/contact"
                    onClick={() => setMenuOpen(false)}
                    className="mt-2 px-5 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-center font-semibold"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
