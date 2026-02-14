import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PHONE_DISPLAY = "314-376-9667";
const PHONE_TEL = "tel:+13143769667";
const CITY = "St. Louis, MO";

export default function Footer() {
  const { t } = useTranslation(["common"]);

  return (
    <footer className="border-t border-white/10 bg-[#05060a]">
      <div className="container py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} {t("brand")} • {CITY}
          </p>

          <div className="flex flex-wrap items-center gap-5 text-sm text-white/70">
            <a href={PHONE_TEL} className="hover:text-white transition-colors">
              {t("common:footer.phone_label")}: {PHONE_DISPLAY}
            </a>
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
