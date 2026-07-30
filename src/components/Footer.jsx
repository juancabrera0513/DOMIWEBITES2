import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const WHATSAPP = "https://wa.me/13143769667?text=Hi%20Domi%20Websites.%20I%20have%20a%20question.";
const SMS = "sms:+13143769667?body=Hi%20Domi%20Websites.%20I%20have%20a%20question.";
const EMAIL = "hello@domiwebsites.com";
const CITY = "St. Louis, MO";

const IKAGG_BADGE_SRC = "/assets/badges/ikagg-badge.png";
const HCC_BADGE_SRC = "/assets/badges/hccstl-badge.png";

export default function Footer() {
  const { t } = useTranslation(["common"]);

  return (
    <footer className="border-t border-white/10 bg-[#05060a]">
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
        <div className="grid md:grid-cols-[1.15fr_.85fr_.85fr] gap-10">
          <div>
            <img
              src="/DomiLogo.webp"
              alt="Domi Websites"
              width="500"
              height="301"
              className="h-14 w-auto object-contain"
              loading="lazy"
            />
            <p className="mt-4 max-w-md text-sm leading-7 text-white/55">
              Websites and practical business tools that help local companies
              attract customers, follow up faster, and stay organized.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-sm">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-emerald-100 hover:bg-emerald-300/15"
              >
                WhatsApp
              </a>
              <a
                href={SMS}
                className="rounded-full border border-white/10 bg-white/[.04] px-4 py-2 text-white/75 hover:bg-white/[.08] hover:text-white"
              >
                Send a text
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="rounded-full border border-white/10 bg-white/[.04] px-4 py-2 text-white/75 hover:bg-white/[.08] hover:text-white"
              >
                Email
              </a>
            </div>
          </div>

          <div>
            <h2 className="font-bold text-white">Services</h2>
            <nav className="mt-4 grid gap-3 text-sm text-white/60">
              <Link to="/web-design-st-louis" className="hover:text-white">Web design in St. Louis</Link>
              <Link to="/website-redesign-st-louis" className="hover:text-white">Website redesign</Link>
              <Link to="/local-seo-st-louis" className="hover:text-white">Local Google visibility</Link>
              <Link to="/customer-follow-up-tools" className="hover:text-white">Customer follow-up tools</Link>
              <Link to="/custom-business-tools" className="hover:text-white">Custom business tools</Link>
            </nav>
          </div>

          <div>
            <h2 className="font-bold text-white">Explore</h2>
            <nav className="mt-4 grid gap-3 text-sm text-white/60">
              <Link to="/work" className="hover:text-white">Our work</Link>
              <Link to="/pricing" className="hover:text-white">Pricing</Link>
              <Link to="/audit" className="hover:text-white">Free website review</Link>
              <Link to="/blog" className="hover:text-white">Business guides</Link>
              <Link to="/contact" className="hover:text-white">Contact</Link>
            </nav>
          </div>
        </div>

        <div className="border-t border-white/5" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} {t("brand")} • {CITY}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-white/70">
            <Link to="/privacy" className="hover:text-white transition">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-white transition">
              Terms
            </Link>
          </div>
        </div>

        <div className="border-t border-white/5" />

        <div className="flex flex-col items-center gap-6 text-center">

          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6">
  <a
    href="https://www.ikaggdirectory.com/united-states/st-louis/general/domi-websites"
    target="_blank"
    rel="noopener noreferrer"
    className="group rounded-xl border border-white/10 bg-white px-4 py-3 shadow-[0_8px_25px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(0,0,0,0.45)]"
    aria-label="IKAGG Member"
  >
    <img
      src={IKAGG_BADGE_SRC}
      alt="IKAGG Member"
      width="700"
      height="700"
      className="h-14 sm:h-16 w-auto object-contain"
      loading="lazy"
    />
  </a>

  <a
    href="https://hccstl.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="group rounded-xl border border-white/10 bg-white px-4 py-3 shadow-[0_8px_25px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(0,0,0,0.45)]"
    aria-label="Hispanic Chamber Member"
  >
    <img
      src={HCC_BADGE_SRC}
      alt="Hispanic Chamber Member"
      width="200"
      height="200"
      className="h-14 sm:h-16 w-auto object-contain"
      loading="lazy"
    />
  </a>
</div>

          <p className="text-sm text-white/40 max-w-xl leading-relaxed">
            Local partnerships that strengthen our commitment to serving St. Louis
            businesses with trusted web, software, and automation solutions.
          </p>
        </div>
      </div>
    </footer>
  );
}
