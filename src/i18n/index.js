// src/i18n/index.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const saved = (() => {
  try { return localStorage.getItem("lang") || undefined; } catch { return undefined; }
})();

const resources = {
  en: {
    common: {
      brand: "Domi Websites",
      city: "St. Louis, MO",
      nav: {
        home: "Home",
        about: "About",
        services: "Services",
        pricing: "Pricing",
        blog: "Blog",
        contact: "Contact"
      },
      cta: {
        whatsapp: "WhatsApp",
        book: "Free Consultation",
        teardown: "Free Consultation",
        contactModal: "Contact form",
        chat: "Chat",
        cancel: "Cancel"
      },
      badges: {
        fast: "72h Delivery",
        seo: "SEO & Speed Optimized",
        reviews: "8+ Client Testimonials"
      },
      footer: { phone_label: "Phone" }
    },

    home: {
      h1: "Websites that turn {{highlight}} into clients.",
      highlight: "clicks",
      sub: "We build fast, modern sites for small businesses—designed to rank and convert."
    },

    about: {
      title: "About Domi Websites",
      desc: "We build high-performance websites for local businesses. Clean design, fast load times, and on-page SEO so your site not only looks great—it converts.",
      f1t: "Speed-First",     f1d: "Optimized assets, lazy loading, and best practices to score high on Lighthouse.",
      f2t: "Local SEO",       f2d: "Clear service pages, schema markup, and content strategy for your city/area.",
      f3t: "Hands-On Support",f3d: "Care plans that keep your site secure, fast, and up-to-date."
    },

    services: {
      title: "Services",
      sub: "Fast results, modern design and real performance.",
      s1t: "Web Design",      s1d: "Modern, mobile-first layouts tailored to your brand and goals.",
      s2t: "Local SEO",       s2d: "On-page SEO and content structure to win in your service areas.",
      s3t: "E-commerce",      s3d: "Lightweight stores with clean UX and easy checkout.",
      s4t: "Care Plans",      s4d: "We keep your site fast, secure, and updated month after month.",
      s5t: "Landing Pages (Ads)",    s5d: "Ultra-fast pages for Google/Meta campaigns.",
      s6t: "Speed Optimization",     s6d: "Core Web Vitals & instant load.",
      s7t: "Analytics & Tracking",   s7d: "GA4, GTM, events & funnels.",
      s8t: "Brand & Copy",           s8d: "Clear messaging and tone of voice.",
      s9t: "Integrations & Automations", s9d: "Zapier/Make, CRM, forms & webhooks.",
      s10t: "Hosting Setup",         s10d: "CDN, domains, SSL & deployment flow.",
      bullets: {
        rui: "Responsive UI", copy: "Copy polish", analytics: "Analytics ready",
        kw: "Keyword mapping", schema: "Schema JSON-LD", gbp: "GB Profile link",
        prod: "Product pages", cart: "Cart/Checkout", pay: "Payments setup",
        backups: "Backups & updates", uptime: "Uptime checks", reports: "Monthly reports"
      },
      cta_primary: "Get started",
      cta_secondary: "Details"
    },

    portfolio: {
      title: "Portfolio", sub: "Recent work across different industries.",
      all: "All", food: "Food", events: "Events", retail: "Retail",
      visit: "Visit site", repo: "Repo"
    },

    pricing: {
      title: "Pricing",
      sub: "Pick a package and we’ll tailor it to your industry.",
      starter: "Starter Presence",
      starter_pitch: "A clean one-page site to get your business online fast.",
      starter_cta: "Start Starter",
      smart: "Smart Launch",
      smart_pitch: "Multi-page site with services and a simple blog.",
      smart_cta: "Choose Smart",
      pro: "Business Pro",
      pro_pitch: "Premium UI, conversion blocks, and Local SEO structure.",
      pro_cta: "Choose Pro",
      features: {
        s1: "1–3 sections", s2: "Mobile-first", s3: "Basic SEO", s4: "Contact form",
        m1: "Up to 6 pages", m2: "Blog ready", m3: "On-page SEO", m4: "Analytics",
        p1: "8–12 pages", p2: "Lead magnet", p3: "Schema JSON-LD", p4: "Speed pass"
      },
      badge_fast: "72h Delivery",
      badge_seo: "SEO & Speed",
      badge_support: "Hands-on Support",
      faq_title: "Pricing FAQ"
    },

    contact: {
      title: "Let’s get your project moving",
      sub: "Choose how you want to start: quick WhatsApp chat, book a 10-min intro, or send details via form.",
      open_form: "Contact form",
      name: "Name", name_ph: "Your name",
      email: "Email",
      phone: "Phone",
      service: "Service", service_ph: "Select",
      message: "Message", message_ph: "Tell us about your project...",
      send: "Send", sending: "Sending…",
      sent_ok: "Thanks! We’ll get back to you shortly.",
      sent_fail: "Oops, something went wrong. Please try again.",
      what_get: "What you get", get1: "Clean, modern design", get2: "Speed & SEO pass", get3: "Support & updates",
      response: "Response time", response_desc: "We typically reply within a few hours during business days.",
      areas: "Service areas", areas_desc: "St. Louis, MO and remote clients across the U.S."
    },

    meta: {
      title: "Domi Websites | St. Louis Web Design that Converts",
      description: "We design fast, modern websites for small businesses that rank on Google and turn visitors into clients."
    }
  },

  es: {
    common: {
      brand: "Domi Websites",
      city: "St. Louis, MO",
      nav: {
        home: "Inicio",
        about: "Nosotros",
        services: "Servicios",
        pricing: "Precios",
        blog: "Blog",
        contact: "Contacto"
      },
      cta: {
        whatsapp: "WhatsApp",
        book: "Consulta gratis",
        teardown: "Consulta gratis",
        contactModal: "Formulario de contacto",
        chat: "Chat",
        cancel: "Cancelar"
      },
      badges: {
        fast: "Entrega 72h",
        seo: "SEO & Velocidad",
        reviews: "8+ Testimonios"
      },
      footer: { phone_label: "Teléfono" }
    },

    home: {
      h1: "Webs que convierten {{highlight}} en clientes.",
      highlight: "clics",
      sub: "Creamos sitios modernos y rápidos para pequeñas empresas—pensados para posicionar y convertir."
    },

    about: {
      title: "Sobre Domi Websites",
      desc: "Construimos sitios de alto rendimiento para negocios locales. Diseño limpio, carga rápida y SEO on-page para que tu web no solo se vea bien—¡convierta!",
      f1t: "Velocidad Primero", f1d: "Assets optimizados, lazy loading y buenas prácticas para puntuar alto en Lighthouse.",
      f2t: "SEO Local",        f2d: "Páginas claras, schema y contenido enfocado a tu ciudad/área.",
      f3t: "Soporte Cercano",  f3d: "Care plans para mantener tu web segura, rápida y actualizada."
    },

    services: {
      title: "Servicios",
      sub: "Resultados rápidos, diseño moderno y rendimiento real.",
      s1t: "Diseño Web",  s1d: "Layouts modernos, mobile-first y alineados a tus objetivos.",
      s2t: "SEO Local",   s2d: "SEO on-page y estructura de contenido para ganar en tus zonas.",
      s3t: "E-commerce",  s3d: "Tiendas ligeras con UX clara y checkout simple.",
      s4t: "Care Plans",  s4d: "Mantenemos tu web rápida, segura y actualizada mes a mes.",
      s5t: "Landing Pages (Ads)",    s5d: "Páginas ultra rápidas para campañas de Google/Meta.",
      s6t: "Optimización de Velocidad", s6d: "Core Web Vitals y carga casi instantánea.",
      s7t: "Analítica & Tracking",   s7d: "GA4, Tag Manager, eventos y embudos.",
      s8t: "Marca & Copy",           s8d: "Mensaje claro y tono de voz.",
      s9t: "Integraciones & Automatizaciones", s9d: "Zapier/Make, CRM, formularios y webhooks.",
      s10t: "Setup de Hosting",      s10d: "CDN, dominios, SSL y flujo de deploy.",
      bullets: {
        rui: "UI Responsive", copy: "Ajuste de copy", analytics: "Listo para Analytics",
        kw: "Mapa de keywords", schema: "Schema JSON-LD", gbp: "Perfil de Google Business",
        prod: "Páginas de producto", cart: "Carrito/Checkout", pay: "Pagos",
        backups: "Backups y updates", uptime: "Monitoreo", reports: "Reportes mensuales"
      },
      cta_primary: "Empezar",
      cta_secondary: "Detalles"
    },

    portfolio: {
      title: "Portafolio", sub: "Trabajo reciente en distintas industrias.",
      all: "Todo", food: "Comida", events: "Eventos", retail: "Retail",
      visit: "Ver sitio", repo: "Repo"
    },

    pricing: {
      title: "Precios",
      sub: "Elige un paquete y lo adaptamos a tu industria.",
      starter: "Starter Presence",
      starter_pitch: "Landing de una página para salir rápido online.",
      starter_cta: "Elegir Starter",
      smart: "Smart Launch",
      smart_pitch: "Sitio multipágina con servicios y blog simple.",
      smart_cta: "Elegir Smart",
      pro: "Business Pro",
      pro_pitch: "UI premium, bloques de conversión y estructura de SEO local.",
      pro_cta: "Elegir Pro",
      features: {
        s1: "1–3 secciones", s2: "Mobile-first", s3: "SEO básico", s4: "Formulario de contacto",
        m1: "Hasta 6 páginas", m2: "Blog listo", m3: "SEO on-page", m4: "Analytics",
        p1: "8–12 páginas", p2: "Lead magnet", p3: "Schema JSON-LD", p4: "Velocidad avanzada"
      },
      badge_fast: "Entrega 72h",
      badge_seo: "SEO & Velocidad",
      badge_support: "Soporte cercano",
      faq_title: "FAQ de Precios"
    },

    contact: {
      title: "Pongamos tu proyecto en marcha",
      sub: "Elige cómo empezar: WhatsApp rápido, agenda una intro de 10 min o envía detalles por formulario.",
      open_form: "Formulario de contacto",
      name: "Nombre", name_ph: "Tu nombre",
      email: "Email",
      phone: "Teléfono",
      service: "Servicio", service_ph: "Selecciona",
      message: "Mensaje", message_ph: "Cuéntanos sobre tu proyecto...",
      send: "Enviar", sending: "Enviando…",
      sent_ok: "¡Gracias! Te responderemos pronto.",
      sent_fail: "Ups, algo falló. Intenta nuevamente.",
      what_get: "Qué obtienes", get1: "Diseño moderno y limpio", get2: "Velocidad & SEO", get3: "Soporte & updates",
      response: "Tiempo de respuesta", response_desc: "Normalmente respondemos en pocas horas en días hábiles.",
      areas: "Zonas de servicio", areas_desc: "St. Louis, MO y clientes remotos en EE.UU."
    },

    meta: {
      title: "Domi Websites | Diseño Web en St. Louis que Convierte",
      description: "Diseñamos webs modernas y rápidas para pequeñas empresas que posicionan en Google y convierten visitas en clientes."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: saved || "en",
    fallbackLng: "en",
    ns: ["common","home","about","services","portfolio","pricing","contact","meta"],
    defaultNS: "common",
    interpolation: { escapeValue: false }
  });

export default i18n;
