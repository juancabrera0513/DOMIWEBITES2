import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PHONE_DISPLAY = "314-376-9667";
const PHONE_TEL = "tel:+13143769667";
const CITY = "St. Louis, MO";

const IKAGG_BADGE_SRC = "/assets/badges/ikagg-badge.png";
const HCC_BADGE_SRC = "/assets/badges/hccstl-badge.png";

export default function Footer() {
  const { t } = useTranslation(["common"]);

  return (
    <footer className="border-t border-white/10 bg-[#05060a]">
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} {t("brand")} • {CITY}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-white/70">
            <a href={PHONE_TEL} className="hover:text-white transition">
              {t("common:footer.phone_label")}: {PHONE_DISPLAY}
            </a>
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
          <p className="text-xs text-white/50 tracking-widest uppercase">
            Proud Member Associations
          </p>

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