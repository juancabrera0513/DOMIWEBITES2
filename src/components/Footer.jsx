import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PHONE_DISPLAY = "314-376-9667";
const PHONE_TEL = "tel:+13143769667";
const CITY = "St. Louis, MO";

const Footer = () => {
  const { t } = useTranslation(["common"]);

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-700">
            © {new Date().getFullYear()} {t("brand")} • {CITY}
          </p>
          <div className="flex items-center gap-4 text-sm">
            <a href={PHONE_TEL} className="underline decoration-slate-300 hover:decoration-slate-500">
              {t("common:footer.phone_label")}: {PHONE_DISPLAY}
            </a>
            {/* Usa Link para SPA y que SÍ funcionen */}
            <Link to="/privacy" className="hover:text-slate-900">Privacy</Link>
            <Link to="/terms" className="hover:text-slate-900">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
