import React from "react";
import { useTranslation } from "react-i18next";

const AboutSection = () => {
  const { t } = useTranslation(["about"]);

  const FEATURES = [
    { tKey: "f1t", dKey: "f1d" },
    { tKey: "f2t", dKey: "f2d" },
    { tKey: "f3t", dKey: "f3d" },
  ];

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="glass rounded-2xl p-8 md:p-12 shadow-soft border border-white/10">
          <h2 className="text-3xl md:text-4xl font-extrabold">{t("about:title")}</h2>
          <p className="mt-4 text-lg text-white/80">{t("about:desc")}</p>

          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {FEATURES.map((f) => (
              <div key={f.tKey} className="rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="h-1 w-8 bg-brand rounded mb-3" />
                <h3 className="font-semibold">{t(`about:${f.tKey}`)}</h3>
                <p className="text-white/70 mt-1">{t(`about:${f.dKey}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
