// src/components/FAQTabs.jsx
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * props:
 *  - data: Record<string, Array<{q:string, a:string}>>
 *  - initialOpen?: number
 *  - initialLimit?: number
 *  - title?: string
 */
export default function FAQTabs({ data = {}, initialOpen = null, initialLimit = 4, title = "FAQs" }) {
  const { i18n } = useTranslation();
  const L = i18n.language?.startsWith("es") ? "es" : "en";
  const TXT = {
    showMore: L === "es" ? "Ver más" : "Show more",
    showLess: L === "es" ? "Ver menos" : "Show less",
  };

  const categories = useMemo(() => Object.keys(data || {}), [data]);
  const [active, setActive] = useState(categories[0] || "");
  const [openIdx, setOpenIdx] = useState(initialOpen);
  const [expanded, setExpanded] = useState(false);

  const items = data[active] || [];
  const visible = expanded ? items : items.slice(0, initialLimit);

  return (
    <div className="w-full">
      <h3 className="text-2xl font-extrabold text-center mb-6">{title}</h3>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => { setActive(c); setOpenIdx(null); setExpanded(false); }}
            className={"btn btn-sm " + (active === c ? "btn-primary" : "btn-ghost")}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="max-w-3xl mx-auto border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-200 bg-white">
        {visible.map((it, i) => {
          const isOpen = openIdx === i;
          return (
            <div key={`${it.q}-${i}`}>
              <button
                type="button"
                className="w-full flex items-center justify-between gap-4 text-left px-4 md:px-6 py-4 hover:bg-slate-50"
                onClick={() => setOpenIdx(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span className="font-semibold">{it.q}</span>
                <span
                  className={
                    "inline-flex h-6 w-6 items-center justify-center rounded-full border " +
                    (isOpen ? "bg-slate-900 text-white border-slate-900" : "text-slate-600 border-slate-300")
                  }
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {isOpen && (
                <div className="px-4 md:px-6 pb-5 text-slate-700">
                  {typeof it.a === "string"
                    ? it.a.split("\n").map((p, k) => <p key={k} className={k ? "mt-2" : ""}>{p}</p>)
                    : it.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {items.length > initialLimit && (
        <div className="mt-4 flex justify-center">
          <button className="btn btn-ghost btn-sm" onClick={() => setExpanded((v) => !v)}>
            {expanded ? TXT.showLess : TXT.showMore}
          </button>
        </div>
      )}
    </div>
  );
}
