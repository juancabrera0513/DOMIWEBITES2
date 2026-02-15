import React, { useState, useMemo } from "react";


export default function FAQAccordion({ items }) {
  const list = useMemo(() => {
    if (Array.isArray(items)) return items;
    if (items && typeof items === "object") {
      if (Array.isArray(items.faqs)) return items.faqs;
      return Object.values(items);
    }
    return []; 
  }, [items]);

  const [open, setOpen] = useState(null);
  const toggle = (i) => setOpen((v) => (v === i ? null : i));

  if (!list.length) {
    return (
      <div className="card p-6">
        <p className="text-slate-700">No FAQs yet.</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-slate-200 border border-slate-200 rounded-2xl overflow-hidden">
      {list.map((it, i) => (
        <div key={i} className="bg-white">
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
