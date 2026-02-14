import React from "react";

export default function TabletDeviceFrame({ url }) {
  if (!url) return null;

  return (
    <div className="rounded-[28px] border border-white/10 bg-white/5 shadow-[0_30px_90px_rgba(0,0,0,.55)] p-3 sm:p-4">
      <div className="rounded-[22px] bg-black/80 border border-white/10 p-2 sm:p-3">
        <div className="relative w-full aspect-[16/10] rounded-[16px] overflow-hidden bg-black">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0 z-[1]" />

          <iframe
            src={url}
            className="absolute inset-0 w-full h-full border-0"
            loading="eager"
            title="Tablet live preview"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="mt-3 flex justify-center">
          <div className="h-1.5 w-20 rounded-full bg-white/15" />
        </div>
      </div>
    </div>
  );
}
