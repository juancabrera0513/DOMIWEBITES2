import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageToggle from "./LanguageToggle";
import ContactModal from "./ContactModal";

const CALENDLY = "https://calendly.com/domiwebsites/30min";
const WHATS = "https://wa.me/13143769667";

export default function Header() {
  const { t } = useTranslation(["common"]);
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const isActive = (to) => {
    if (to.startsWith("/#")) {
      // anchors cuentan como activos solo en la home
      return pathname === "/" && typeof window !== "undefined" && window.location.hash === to.slice(1);
    }
    return pathname === to;
  };

  const navBase =
    "group relative px-2 py-1 text-[15px] font-medium text-slate-600 hover:text-slate-900 transition-colors";
  const navUnderline =
    "after:pointer-events-none after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:h-0.5 after:bg-slate-900 after:rounded-full after:transition-all";
  const navHoverLine = "after:w-0 group-hover:after:w-6"; // subrayado en hover
  const navActiveLine = "after:w-6 text-slate-900"; // subrayado si está activo

  const NavItem = ({ to, label }) => {
    const active = isActive(to);
    return (
      <NavLink
        to={to}
        onClick={() => setShowMenu(false)}
        className={`${navBase} ${navUnderline} ${active ? navActiveLine : navHoverLine}`}
      >
        {label}
      </NavLink>
    );
  };

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-4">
          <div className="h-16 md:h-[72px] flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0" aria-label="Domi Websites — Home">
              <img src="/DomiLogo.webp" alt="Domi Websites" className="h-10 md:h-12 w-auto" loading="eager" />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-5">
              <NavItem to="/" label={t("nav.home", "Home")} />
              <NavItem to="/#about" label={t("nav.about", "About")} />
              <NavItem to="/#services" label={t("nav.services", "Services")} />
              <NavItem to="/pricing" label={t("nav.pricing", "Pricing")} />
              <NavItem to="/blog" label={t("nav.blog", "Blog")} />
              <NavItem to="/contact" label={t("nav.contact", "Contact")} />
            </nav>

            {/* Actions desktop */}
            <div className="hidden md:flex items-center gap-2">
              {/* Toggle de idioma con apariencia corregida */}
              <LanguageToggle />

              <a href={WHATS} className="btn btn-wa btn-sm btn-ico btn-shine" aria-label="WhatsApp">
                💬 {t("cta.whatsapp", "WhatsApp")}
              </a>
              <a href={CALENDLY} className="btn btn-primary btn-sm btn-shine">
                {t("cta.book", "Free Consultation")}
              </a>
              <button type="button" onClick={() => setOpen(true)} className="btn btn-ghost btn-sm">
                {t("cta.contactModal", "Contact form")}
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl border border-slate-200 bg-white/90"
              onClick={() => setShowMenu((v) => !v)}
              aria-label="Open menu"
            >
              <span className="text-2xl leading-none">≡</span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {showMenu && (
          <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur">
            <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-3">
              <NavItem to="/" label={t("nav.home", "Home")} />
              <NavItem to="/#about" label={t("nav.about", "About")} />
              <NavItem to="/#services" label={t("nav.services", "Services")} />
              <NavItem to="/pricing" label={t("nav.pricing", "Pricing")} />
              <NavItem to="/blog" label={t("nav.blog", "Blog")} />
              <NavItem to="/contact" label={t("nav.contact", "Contact")} />

              <div className="flex items-center gap-2 pt-2">
                <LanguageToggle compact />
                <a href={WHATS} className="btn btn-wa btn-sm btn-ico w-full">💬 {t("cta.whatsapp", "WhatsApp")}</a>
                <a href={CALENDLY} className="btn btn-primary btn-sm w-full">{t("cta.book", "Free Consultation")}</a>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(true);
                    setShowMenu(false);
                  }}
                  className="btn btn-ghost btn-sm w-full"
                >
                  {t("cta.contactModal", "Contact form")}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <ContactModal open={open} setOpen={setOpen} />
    </>
  );
}
