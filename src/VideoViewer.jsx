import React from 'react';

export const VideoViewer = ({ videoUrl }) => {
  return (
    <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
      <iframe
        src={videoUrl}
        title="Project Demo"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
      ></iframe>
    </div>
  );
};
