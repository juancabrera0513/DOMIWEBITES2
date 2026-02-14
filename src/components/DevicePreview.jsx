// src/components/DevicePreview.jsx
import React, { useMemo, useState } from "react";
import TabletDeviceFrame from "./TabletDeviceFrame";
import MobileDeviceFrame from "./MobileDeviceFrame";

const DEVICES = ["tablet", "mobile"];
const LABELS = { tablet: "Tablet", mobile: "Mobile" };

export default function DevicePreview({ url }) {
  const [device, setDevice] = useState("tablet");

  const hostname = useMemo(() => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  }, [url]);

  if (!url) return null;

  return (
    <section className="w-full max-w-6xl mx-auto">
      {/* Top row */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-4 md:mb-6">
        <div className="min-w-0">
          <p className="text-[11px] tracking-[0.25em] uppercase text-cyan-200/70">
            Live preview
          </p>
          <p className="mt-1 text-sm text-white/60 truncate">{hostname}</p>
        </div>

        <div className="flex items-center gap-2">
          {DEVICES.map((d) => {
            const active = device === d;
            return (
              <button
                key={d}
                type="button"
                onClick={() => setDevice(d)}
                className={["btn btn-sm", active ? "btn-primary" : "btn-outline"].join(" ")}
                aria-pressed={active}
              >
                {LABELS[d]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Preview block (separate, never overlaps text) */}
      <div className="glass border border-white/10 rounded-3xl p-3 sm:p-4 md:p-5 shadow-[0_30px_90px_rgba(0,0,0,.55)]">
        <div className="flex justify-center">
          {device === "tablet" ? (
            <div className="w-full max-w-[980px]">
              <TabletDeviceFrame url={url} />
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <div className="w-full max-w-[460px]">
                <MobileDeviceFrame url={url} />
              </div>
            </div>
          )}
        </div>

        <p className="mt-3 text-[11px] text-white/45 text-center">
          Tip: open in a new tab for the full experience.
        </p>
      </div>
    </section>
  );
}
