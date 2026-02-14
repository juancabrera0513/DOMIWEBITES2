import React from "react";

export default function MobileDeviceFrame({ url }) {
  if (!url) return null;

  return (
    <div className="flex justify-center">
      <div className="w-full flex justify-center max-h-[70vh]">
        <div className="relative w-full max-w-[320px] max-h-[70vh] aspect-[9/20]">
          <div className="absolute inset-0 rounded-[44px] bg-black border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,.55)] overflow-hidden">
            <div className="absolute inset-[10px] rounded-[36px] bg-black overflow-hidden">
              <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-[110px] h-[28px] bg-black rounded-full z-30 border border-white/10" />

              <div className="absolute inset-0 [transform:scale(.99)] [transform-origin:top_left]">
                <iframe
                  src={url}
                  className="absolute inset-0 w-full h-full border-0"
                  loading="eager"
                  title="Mobile live preview"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-[44px] ring-1 ring-white/5" />
          </div>
        </div>
      </div>
    </div>
  );
}
