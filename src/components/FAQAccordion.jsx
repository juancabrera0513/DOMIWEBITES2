import React, { useMemo, useState } from "react";
import { allFaqs as defaultFaqs } from "../data/faqs";

/**
 * FAQAccordion
 * props:
 *  - items?: Array<{q:string,a:string}> | {faqs:Array} | Record<number|id,{q,a}> | string(JSON)
 *
 * Normaliza "items" para evitar el crash "items.map is not a function".
 * Si no llega un array válido, usa el dataset por defecto (defaultFaqs).
 */
export default function FAQAccordion({ items }) {
  const list = useMemo(() => {
    // 1) Ya es array
    if (Array.isArray(items)) return items;

    // 2) JSON string -> intenta parsear
    if (typeof items === "string") {
      try {
        const parsed = JSON.parse(items);
        if (Array.isArray(parsed)) return parsed;
        if (parsed && Array.isArray(parsed.faqs)) return parsed.faqs;
        if (parsed && typeof parsed === "object") return Object.values(parsed);
      } catch {
        /* ignore */
      }
    }

    // 3) Objeto con "faqs" o diccionario numerado
    if (items && typeof items === "object") {
      if (Array.isArray(items.faqs)) return items.faqs;
      const vals = Object.values(items);
      if (vals.every(v => v && typeof v === "object" && ("q" in v) && ("a" in v))) {
        return vals;
      }
    }

    // 4) Fallback seguro
    return defaultFaqs;
  }, [items]);

  const [open, setOpen] = useState(null);
  const toggle = (i) => setOpen((v) => (v === i ? null : i));

  return (
    <div className="divide-y divide-slate-200 border border-slate-200 rounded-2xl overflow-hidden">
      {list.map((it, i) => (
        <div key={`${it.q}-${i}`} className="bg-white">
          <button
            type="button"
            onClick={() => toggle(i)}
            className="w-full flex items-center justify-between gap-4 text-left px-4 md:px-6 py-4 hover:bg-slate-50"
            aria-expanded={open === i}
          >
            <span className="font-semibold">{it.q}</span>
            <span
              className={
                "inline-flex h-6 w-6 items-center justify-center rounded-full border " +
                (open === i
                  ? "bg-slate-900 text-white border-slate-900"
                  : "text-slate-600 border-slate-300")
              }
            >
              {open === i ? "−" : "+"}
            </span>
          </button>

          {open === i && (
            <div className="px-4 md:px-6 pb-5 text-slate-700">
              {typeof it.a === "string"
                ? it.a.split("\n").map((p, idx) => (
                    <p key={idx} className={idx ? "mt-2" : ""}>{p}</p>
                  ))
                : it.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
