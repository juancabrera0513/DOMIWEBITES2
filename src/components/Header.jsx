import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // ✅ If same route: scroll to top. Else: navigate.
  const handleNav = (path) => (e) => {
    e.preventDefault();
    setMenuOpen(false);

    if (location.pathname === path) {
      scrollTop();
      return;
    }

    navigate(path);
    // ScrollToTop component will handle scrolling after route change.
  };

  const handleLogo = (e) => {
    e.preventDefault();
    setMenuOpen(false);

    if (location.pathname === "/") {
      scrollTop();
      return;
    }
    navigate("/");
  };

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
          <div className="relative rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,.45)] overflow-hidden">
            <div className="flex items-center justify-between h-[78px] px-6">
              <a href="/" onClick={handleLogo} className="flex items-center">
                <img
                  src="/DomiLogo.webp"
                  alt="Domi Websites"
                  className="h-16 w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,.6)]"
                />
              </a>

              <nav className="hidden md:flex items-center gap-2">
                {navItems.map(({ name, path }) => {
                  const isActive = location.pathname === path;
                  return (
                    <Link
                      key={name}
                      to={path}
                      onClick={handleNav(path)}
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
                  onClick={() => setMenuOpen(false)}
                  className="ml-3 px-6 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold shadow-lg hover:scale-105 transition"
                >
                  Contact
                </Link>
              </nav>

              <button
                className="
                  md:hidden
                  h-12 w-12
                  rounded-full
                  border border-white/10
                  bg-white/5
                  backdrop-blur-xl
                  grid place-items-center
                  text-white
                  shadow-[0_14px_40px_rgba(0,0,0,.45)]
                  active:scale-95
                  transition
                "
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                <span className="text-3xl leading-none">
                  {menuOpen ? "×" : "☰"}
                </span>
              </button>
            </div>

            {menuOpen && (
              <div className="md:hidden px-6 pb-6">
                <div className="border-t border-white/10 pt-4">
                  <div className="grid gap-3">
                    {navItems.map(({ name, path }) => {
                      const isActive = location.pathname === path;
                      return (
                        <a
                          key={name}
                          href={path}
                          onClick={handleNav(path)}
                          className={`
                            rounded-2xl px-4 py-4
                            border border-white/10
                            backdrop-blur-xl
                            transition
                            ${
                              isActive
                                ? "bg-white/10 text-white shadow-[0_18px_55px_rgba(34,211,238,.14)]"
                                : "bg-white/5 text-white/85 hover:bg-white/10 hover:text-white"
                            }
                          `}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-base font-semibold">
                              {name}
                            </span>
                            <span className="text-white/60">→</span>
                          </div>
                        </a>
                      );
                    })}

                    <Link
                      to="/contact"
                      onClick={() => setMenuOpen(false)}
                      className="
                        mt-2
                        px-5 py-4 rounded-2xl
                        bg-gradient-to-r from-cyan-400 to-blue-500
                        text-white text-center font-semibold
                        shadow-[0_20px_60px_rgba(34,211,238,.25)]
                        hover:brightness-110
                        transition
                      "
                    >
                      Contact
                    </Link>
                  </div>

                  <div className="mt-5 text-center text-xs text-white/45">
                    Tap any item to navigate — tap again to scroll to top.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
