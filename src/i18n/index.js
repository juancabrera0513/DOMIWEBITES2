// src/i18n/index.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const saved = (() => {
  try {
    return localStorage.getItem("lang") || undefined;
  } catch {
    return undefined;
  }
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

    // ABOUT (improved)
    about: {
      title: "About Domi Websites",
      desc: "We help small/local businesses look better, load faster, and win more customers. Clean UX, speed-first code, and technical SEO — so your site doesn’t just look great, it converts.",
      sub: "Design and engineering blended: modern UI, Core Web Vitals, and Local SEO that speaks your customers’ language.",
      f1t: "Speed-First",
      f1d: "Lightweight code, optimized media, and best practices for top Core Web Vitals.",
      f2t: "Local SEO",
      f2d: "Service pages, location terms, and on-page structure that Google understands.",
      f3t: "Hands-On Support",
      f3d: "Care plans that keep your site secure, updated, and performing every month.",
      stats_title: "What clients value",
      s1t: "Fast launch",
      s1d: "Simple process and quick iterations to go live sooner.",
      s2t: "Rank & convert",
      s2d: "SEO-ready pages and clear calls-to-action.",
      s3t: "Built to grow",
      s3d: "Modular sections, analytics, and clean handoff.",
      process_title: "How we work",
      p1t: "Discover",
      p1d: "Goals, audience, and quick content plan.",
      p2t: "Design",
      p2d: "Modern, mobile-first UI that fits your brand.",
      p3t: "Build",
      p3d: "Speed-first implementation + on-page SEO.",
      p4t: "Launch",
      p4d: "Analytics, basic tracking, and handoff/training.",
      cta_title: "Ready to move?",
      cta_desc: "Book a quick intro or message us on WhatsApp. We reply fast.",
      cta_primary: "Free Consultation",
      cta_secondary: "WhatsApp"
    },

    // SERVICES (cleaned)
    services: {
      title: "Services",
      sub: "Fast results, modern design and real performance.",
      s1t: "Web Design",
      s1d: "Modern, mobile-first layouts tailored to your brand and goals.",
      s2t: "Local SEO",
      s2d: "On-page SEO and content structure to win in your service areas.",
      s3t: "E-commerce",
      s3d: "Lightweight stores with clean UX and easy checkout.",
      s4t: "Care Plans",
      s4d: "We keep your site fast, secure, and updated month after month.",
      s5t: "Landing Pages (Ads)",
      s5d: "Ultra-fast pages for Google/Meta campaigns.",
      s6t: "Speed Optimization",
      s6d: "Core Web Vitals & instant load.",
      s7t: "Analytics & Tracking",
      s7d: "GA4, GTM, events & funnels.",
      // Removed s8 (Brand & Copy)
      s9t: "Integrations & Automations",
      s9d: "Zapier/Make, CRM, forms & webhooks.",
      s10t: "Hosting Setup",
      s10d: "CDN, domains, SSL & deployment flow.",
      bullets: {
        rui: "Responsive UI",
        analytics: "Analytics ready"
      },
      cta_primary: "Get started",
      cta_secondary: "Details"
    },

    portfolio: {
      title: "Portfolio",
      sub: "Recent work across different industries.",
      all: "All",
      food: "Food",
      events: "Events",
      retail: "Retail",
      visit: "Visit site",
      repo: "Repo"
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
        s1: "1–3 sections",
        s2: "Mobile-first",
        s3: "Basic SEO",
        s4: "Contact form",
        m1: "Up to 6 pages",
        m2: "Blog ready",
        m3: "On-page SEO",
        m4: "Analytics",
        p1: "8–12 pages",
        p2: "Lead magnet",
        p3: "Schema JSON-LD",
        p4: "Speed pass"
      },
      badge_fast: "72h Delivery",
      badge_seo: "SEO & Speed",
      badge_support: "Hands-on Support",
      faq_title: "Pricing FAQ",

      // FAQ extendido
      faq: [
        {
          q: "How fast can we launch?",
          a: "Most sites launch in 7–14 days depending on scope, content readiness, and feedback speed."
        },
        {
          q: "Do you help with copy?",
          a: "Yes. We polish and structure your content. If needed, we can draft initial copy based on your inputs."
        },
        {
          q: "What’s included in SEO?",
          a: "On-page basics: semantic structure, meta tags, performance, internal links, and local-focused pages when relevant."
        },
        {
          q: "Do you provide hosting?",
          a: "We set up modern hosting/CDN and can bundle it inside a Care Plan if you want a hands-off experience."
        },
        {
          q: "What is a Care Plan?",
          a: "Monthly updates, security checks, backups, small edits, speed checks, and priority support depending on the tier."
        },
        {
          q: "Can I add features later?",
          a: "Yes. We build modular sections so we can add blog, e-commerce or new pages as you grow."
        },
        {
          q: "Will I own my website?",
          a: "Absolutely. You keep your domain, content, and code. No lock-ins."
        },
        {
          q: "How do we start?",
          a: "Book a free consultation or send details via the contact form. We’ll share a simple plan and timeline."
        }
      ]
    },

    contact: {
      title: "Let’s get your project moving",
      sub: "Choose how you want to start: quick WhatsApp chat, book a 10-min intro, or send details via form.",
      open_form: "Contact form",
      name: "Name",
      name_ph: "Your name",
      email: "Email",
      phone: "Phone",
      service: "Service",
      service_ph: "Select",
      message: "Message",
      message_ph: "Tell us about your project...",
      send: "Send",
      sending: "Sending…",
      sent_ok: "Thanks! We’ll get back to you shortly.",
      sent_fail: "Oops, something went wrong. Please try again.",
      what_get: "What you get",
      get1: "Clean, modern design",
      get2: "Speed & SEO pass",
      get3: "Support & updates",
      response: "Response time",
      response_desc: "We typically reply within a few hours during business days.",
      areas: "Service areas",
      areas_desc: "St. Louis, MO and remote clients across the U.S."
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

    // ABOUT (mejorado)
    about: {
      title: "Sobre Domi Websites",
      desc: "Ayudamos a negocios locales a verse mejor, cargar más rápido y atraer más clientes. UX limpia, código enfocado en velocidad y SEO técnico — para que tu web no solo se vea bien: convierta.",
      sub: "Diseño + ingeniería: UI moderna, Core Web Vitals y SEO Local que habla el idioma de tus clientes.",
      f1t: "Velocidad primero",
      f1d: "Código ligero, medios optimizados y buenas prácticas para Core Web Vitals.",
      f2t: "SEO Local",
      f2d: "Páginas de servicio, términos de ubicación y estructura on-page que Google entiende.",
      f3t: "Soporte cercano",
      f3d: "Care plans que mantienen tu web segura, actualizada y rápida cada mes.",
      stats_title: "Lo que más valoran",
      s1t: "Lanzamiento rápido",
      s1d: "Proceso simple e iteraciones ágiles para salir online antes.",
      s2t: "Posiciona y convierte",
      s2d: "Páginas SEO-ready y llamados a la acción claros.",
      s3t: "Listo para crecer",
      s3d: "Secciones modulares, analítica y handoff limpio.",
      process_title: "Cómo trabajamos",
      p1t: "Descubrimiento",
      p1d: "Objetivos, audiencia y plan de contenido ágil.",
      p2t: "Diseño",
      p2d: "UI moderna y mobile-first alineada a tu marca.",
      p3t: "Desarrollo",
      p3d: "Implementación orientada a velocidad + SEO on-page.",
      p4t: "Lanzamiento",
      p4d: "Analytics, tracking básico y handoff/capacitación.",
      cta_title: "¿Listo para avanzar?",
      cta_desc: "Agenda una intro rápida o escríbenos por WhatsApp. Respondemos rápido.",
      cta_primary: "Consulta gratis",
      cta_secondary: "WhatsApp"
    },

    // SERVICES (limpio)
    services: {
      title: "Servicios",
      sub: "Resultados rápidos, diseño moderno y rendimiento real.",
      s1t: "Diseño Web",
      s1d: "Layouts modernos, mobile-first y alineados a tus objetivos.",
      s2t: "SEO Local",
      s2d: "SEO on-page y estructura de contenido para ganar en tus zonas.",
      s3t: "E-commerce",
      s3d: "Tiendas ligeras con UX clara y checkout simple.",
      s4t: "Care Plans",
      s4d: "Mantenemos tu web rápida, segura y actualizada mes a mes.",
      s5t: "Landing Pages (Ads)",
      s5d: "Páginas ultra rápidas para campañas de Google/Meta.",
      s6t: "Optimización de Velocidad",
      s6d: "Core Web Vitals y carga casi instantánea.",
      s7t: "Analítica & Tracking",
      s7d: "GA4, Tag Manager, eventos y embudos.",
      // Removido s8 (Marca & Copy)
      s9t: "Integraciones & Automatizaciones",
      s9d: "Zapier/Make, CRM, formularios y webhooks.",
      s10t: "Setup de Hosting",
      s10d: "CDN, dominios, SSL y flujo de deploy.",
      bullets: {
        rui: "UI Responsive",
        analytics: "Listo para Analytics"
      },
      cta_primary: "Empezar",
      cta_secondary: "Detalles"
    },

    portfolio: {
      title: "Portafolio",
      sub: "Trabajo reciente en distintas industrias.",
      all: "Todo",
      food: "Comida",
      events: "Eventos",
      retail: "Retail",
      visit: "Ver sitio",
      repo: "Repo"
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
        s1: "1–3 secciones",
        s2: "Mobile-first",
        s3: "SEO básico",
        s4: "Formulario de contacto",
        m1: "Hasta 6 páginas",
        m2: "Blog listo",
        m3: "SEO on-page",
        m4: "Analytics",
        p1: "8–12 páginas",
        p2: "Lead magnet",
        p3: "Schema JSON-LD",
        p4: "Velocidad avanzada"
      },
      badge_fast: "Entrega 72h",
      badge_seo: "SEO & Velocidad",
      badge_support: "Soporte cercano",
      faq_title: "FAQ de Precios",

      // FAQ extendido
      faq: [
        {
          q: "¿Qué tan rápido lanzamos?",
          a: "La mayoría de sitios se lanzan en 7–14 días, según alcance, contenido listo y velocidad de feedback."
        },
        {
          q: "¿Ayudan con el copy?",
          a: "Sí. Pulimos y estructuramos tu contenido. Si lo necesitas, redactamos un copy inicial con tus insumos."
        },
        {
          q: "¿Qué incluye el SEO?",
          a: "Fundamentos on-page: estructura semántica, metadatos, rendimiento, enlaces internos y páginas locales cuando aplique."
        },
        {
          q: "¿Proveen hosting?",
          a: "Configuramos hosting/CDN moderno y podemos incluirlo dentro de un Care Plan si prefieres despreocuparte."
        },
        {
          q: "¿Qué es un Care Plan?",
          a: "Actualizaciones mensuales, seguridad, backups, pequeños cambios, chequeos de velocidad y soporte prioritario según el plan."
        },
        {
          q: "¿Puedo agregar funciones después?",
          a: "Sí. Construimos secciones modulares para sumar blog, e-commerce o nuevas páginas conforme creces."
        },
        {
          q: "¿El sitio será mío?",
          a: "Totalmente. El dominio, el contenido y el código son tuyos. Sin ataduras."
        },
        {
          q: "¿Cómo empezamos?",
          a: "Agenda una consulta gratis o envía detalles por el formulario. Te compartimos un plan simple y tiempos."
        }
      ]
    },

    contact: {
      title: "Pongamos tu proyecto en marcha",
      sub: "Elige cómo empezar: WhatsApp rápido, agenda una intro de 10 min o envía detalles por formulario.",
      open_form: "Formulario de contacto",
      name: "Nombre",
      name_ph: "Tu nombre",
      email: "Email",
      phone: "Teléfono",
      service: "Servicio",
      service_ph: "Selecciona",
      message: "Mensaje",
      message_ph: "Cuéntanos sobre tu proyecto...",
      send: "Enviar",
      sending: "Enviando…",
      sent_ok: "¡Gracias! Te responderemos pronto.",
      sent_fail: "Ups, algo falló. Intenta nuevamente.",
      what_get: "Qué obtienes",
      get1: "Diseño moderno y limpio",
      get2: "Velocidad & SEO",
      get3: "Soporte & updates",
      response: "Tiempo de respuesta",
      response_desc: "Normalmente respondemos en pocas horas en días hábiles.",
      areas: "Zonas de servicio",
      areas_desc: "St. Louis, MO y clientes remotos en EE.UU."
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
    ns: ["common", "home", "about", "services", "portfolio", "pricing", "contact", "meta"],
    defaultNS: "common",
    interpolation: { escapeValue: false }
  });

export default i18n;
