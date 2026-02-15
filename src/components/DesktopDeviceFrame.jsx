import React from "react";

export default function DesktopDeviceFrame({ url }) {
  if (!url) return null;

  return (
    <div className="w-full bg-[#111] p-3 md:p-4 rounded-2xl shadow-2xl border border-gray-700">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-3 h-3 rounded-full bg-red-500" />
        <span className="w-3 h-3 rounded-full bg-yellow-500" />
        <span className="w-3 h-3 rounded-full bg-green-500" />
      </div>

      <div className="w-full h-[55vh] min-h-[320px] max-h-[520px] overflow-hidden bg-white rounded-xl shadow-inner">
        <iframe
          src={url}
          className="w-full h-full"
          loading="lazy"
          title="Desktop live preview"
        />
      </div>
    </div>
  );
}
