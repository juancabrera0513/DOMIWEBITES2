// src/lib/jsonld.js
import React from "react";

/** Renderiza un bloque JSON-LD */
export function JsonLd({ data }) {
  if (!data) return null;
  const json = JSON.stringify(data);
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
