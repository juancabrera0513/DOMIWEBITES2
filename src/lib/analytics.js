// src/lib/analytics.js
export function track(eventName, params = {}) {
    try {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", eventName, params);
      } else {
        // console.debug("[analytics stub]", eventName, params);
      }
    } catch (_) {}
  }
  