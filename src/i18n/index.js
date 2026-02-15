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

    about: {
      label: "Why Domi Websites",
      title: "About Domi Websites",
      desc:
        "We create simple, modern websites for small and local businesses. The goal is clear: help more people trust you, contact you, and buy from you.",
      sub: "No tech talk. Just a clear site that works for your business.",

      f1t: "Fast & simple",
      f1d: "Your site loads quickly and feels easy to use on phones and computers.",
      f2t: "Show up locally",
      f2d: "We write and organize your pages so people near you can find your business.",
      f3t: "Real support",
      f3d: "You talk directly with us. We answer, update, and guide you step by step.",

      stats_title: "What our clients usually want",
      s1t: "Launch without drama",
      s1d: "A clear process and help with content so we can go live smoothly.",
      s2t: "More calls & messages",
      s2d: "Buttons and contact options placed where people actually use them.",
      s3t: "Room to grow",
      s3d: "Start simple now and add more pages or features later.",

      process_title: "How working together feels",
      p1t: "Short call",
      p1d: "You tell us about your business, what you offer, and what you want your website to do.",
      p2t: "Design preview",
      p2d: "We show you a first version so you can see colors, layout, and style.",
      p3t: "Build & edits",
      p3d: "We turn the design into a real website and adjust it with your feedback.",
      p4t: "Launch & support",
      p4d: "We connect your domain, do final checks, and stay available for questions.",

      cta_title: "Ready to get your website done?",
      cta_desc:
        "Book a quick call or send us a WhatsApp. We’ll talk about your business, show ideas, and give you a simple plan and price.",
      cta_primary: "Free Consultation",
      cta_secondary: "WhatsApp"
    },

    services: {
      label: "What we can help you with",
      title: "Services",
      sub:
        "Pick what fits your business today. We keep it simple and explain everything in plain language.",

      s1t: "Website design",
      s1d:
        "We design a clean, modern site that looks good and is easy to understand.",
      s2t: "Local business website",
      s2d:
        "Perfect for service businesses that want more calls and messages from their city.",
      s3t: "Online store",
      s3d:
        "Show your products clearly and make it easy for people to place an order.",
      s5t: "Landing page for ads",
      s5d:
        "A focused page for your Facebook/Google ads so visitors know exactly what to do.",
      s4t: "Care & maintenance",
      s4d:
        "We take care of updates, small changes and checks so you don’t worry about the website.",
      s10t: "Setup & connections",
      s10d:
        "We connect your domain, forms, email and tools you already use in your business.",

      bullets: {
        rui: "Works great on phone and desktop",
        analytics: "Ready to connect with forms, WhatsApp and analytics"
      },

      cta_primary: "Talk about my project",
      cta_secondary: "Details",
      cta_helper:
        "Not sure which option fits you? We can recommend one in a quick call."
    },

    portfolio: {
      title: "Portfolio",
      sub: "Recent work across different industries.",
      all: "All",
      visit: "Visit site",
      repo: "Repo",
      view_details: "View details",
      open_details: "Open {{title}} details",

      projects: {
        mamapacha: {
          name: "Mama Pacha Sabor",
          short:
            "A vibrant and modern brand website showcasing handcrafted seasonings and Latin-inspired flavors.",
          long:
            "Mama Pacha Sabor is a bold, culture-driven seasoning brand. The website was designed to highlight their unique products, reinforce brand identity, and prepare the foundation for future online sales. The final result is a colorful, visually rich experience with clear storytelling, mobile-first design, and intuitive product presentation."
        },

        kaes_kitchen: {
          name: "Kae’s Kitchen",
          short:
            "A warm and welcoming bakery website designed to showcase custom cakes, desserts, and photo galleries.",
          long:
            "Kae’s Kitchen specializes in custom-made cakes and baked goods. The website focuses on displaying the bakery’s artistry through high-quality visuals, organized product categories, and an easy inquiry flow. The design creates an inviting atmosphere that matches the brand’s personality and improves the customer ordering experience."
        },

        elind: {
          name: "ELIND – Install & Equipment Sales",
          short:
            "Professional installation and equipment sales website for HVAC, electrical systems, water heaters, and more.",
          long:
            "ELIND offers installation and sales of air conditioners, water heaters, washers, dryers, electrical panels, and pump automation systems. The website highlights fast service, guaranteed work, and the brand’s wide range of solutions. The design focuses on clarity, professionalism, and easy access to service requests."
        },

        shinepro: {
          name: "ShinePro Cleaning",
          short:
            "A polished and professional cleaning service website with strong call-to-action funnels.",
          long:
            "ShinePro Cleaning needed a trustworthy, clean, and modern online presence. We built a bright, organized layout that highlights services, communicates quality, and leads users directly into booking and quote requests. The design supports both residential and commercial cleaning audiences."
        },

        memorable_moments: {
          name: "Memorable Moments Productions",
          short:
            "A cinematic website for a photography and videography production studio.",
          long:
            "Memorable Moments Productions needed a visually impactful site to showcase photos, videos, and event coverage. The final design embraces a cinematic aesthetic with gallery-first presentation, dynamic layouts, and strong emphasis on showcasing creativity and visual storytelling."
        },

        primavera_flowers: {
          name: "Primavera Flowers",
          short:
            "A bilingual flower shop website with catalog, delivery features, and a modern brand experience.",
          long:
            "Primavera Flowers needed a bilingual platform to showcase floral products, offer same-day delivery, and improve customer experience. We delivered a modern, soft, and elegant website with product categories, delivery radius checks, and seamless navigation in both English and Spanish."
        },

        glo_event: {
          name: "Glo Event Co",
          short:
            "A neon-themed event and photo booth website with dynamic visuals and a booking-focused flow.",
          long:
            "Glo Event Co specializes in photo booth rentals, silent party gear, and event services. The website features a bold neon aesthetic, modern animations, and a booking-driven structure that amplifies engagement and showcases the brand’s unique nightlife vibe."
        },

        bendecidos: {
          name: "Bendecidos con Propósito",
          short:
            "A bilingual non-profit website focused on mission storytelling, volunteering, and donations.",
          long:
            "Bendecidos con Propósito supports communities in the Dominican Republic. We built a bilingual platform that highlights their mission, showcases photo galleries, and encourages donations through clear storytelling and structured content."
        },

        group_travel: {
          name: "Group Travel Co",
          short:
            "A modern travel agency website showcasing group trips, destinations, and quote requests.",
          long:
            "Group Travel Co organizes trips for families, schools, churches, and corporate teams. The website features vibrant visuals, destination highlights, and lead-capture funnels designed for quick quote requests and itinerary previews."
        },

        archcity_roofing: {
          name: "ArchCity Roofing & Exteriors",
          short:
            "A trusted St. Louis roofing and exteriors company specializing in residential roof replacements, repairs, and gutter systems.",
          long:
            "ArchCity Roofing & Exteriors is a local St. Louis roofing company focused on protecting homes with quality materials, clean workmanship, and honest communication. The website highlights their core residential services, showcases before-and-after work, and makes it easy for visitors to request a free roof inspection or estimate. The content is structured for local search visibility while the design feels modern, strong, and professional."
        },

        luxe_district_salon: {
          name: "Luxe District Salon",
          short:
            "A modern full-service beauty salon offering hair, color, styling, makeup, and treatments in a boutique-style environment.",
          long:
            "Luxe District Salon is a full-service beauty salon that blends a boutique feel with a high-end experience. The website presents Luxe District as a stylish, welcoming space with strong visuals, clear service menus, and easy booking. The layout is mobile-first, making it simple for clients to browse services, view stylist work, and schedule an appointment online."
        },

        gateway_home_plumbing: {
          name: "Gateway Home Plumbing",
          short:
            "A residential plumbing company focused on fast, reliable service for leaks, clogs, repairs, and water heater issues.",
          long:
            "Gateway Home Plumbing is dedicated to helping St. Louis homeowners fix plumbing problems quickly and professionally. The website guides visitors to request service in just a few clicks, with clear service pages, strong call-to-actions, and local-focused content that makes it easy for homeowners to trust and contact the company."
        }
      }
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
      description:
        "We design fast, modern websites for small businesses that rank on Google and turn visitors into clients."
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
      label: "Por qué Domi Websites",
      title: "Sobre Domi Websites",
      desc:
        "Creamos páginas web sencillas y modernas para negocios pequeños y locales. La idea es simple: que más personas confíen en ti, te escriban y te compren.",
      sub: "Sin palabras técnicas. Solo una web clara que trabaja para tu negocio.",

      f1t: "Rápida y fácil",
      f1d:
        "Tu página carga rápido y es fácil de usar tanto en celular como en computadora.",
      f2t: "Que te encuentren cerca",
      f2d:
        "Organizamos tus páginas para que la gente de tu zona te encuentre cuando busca tus servicios.",
      f3t: "Acompañamiento real",
      f3d:
        "Hablas directo con nosotros. Respondemos, actualizamos y te guiamos paso a paso.",

      stats_title: "Lo que casi todos nuestros clientes buscan",
      s1t: "Lanzar sin estrés",
      s1d:
        "Un proceso claro y ayuda con el contenido para salir en línea sin drama.",
      s2t: "Más llamadas y mensajes",
      s2d:
        "Botones y formas de contacto donde la gente realmente los usa.",
      s3t: "Espacio para crecer",
      s3d:
        "Empieza simple hoy y agrega más páginas o funciones después.",

      process_title: "Así es trabajar juntos",
      p1t: "Llamada corta",
      p1d:
        "Nos cuentas de tu negocio, qué ofreces y qué quieres que haga tu página.",
      p2t: "Vista previa",
      p2d:
        "Te mostramos un primer diseño para que veas colores, estructura y estilo.",
      p3t: "Construcción y ajustes",
      p3d:
        "Convertimos ese diseño en una web real y la ajustamos con tu feedback.",
      p4t: "Lanzamiento y soporte",
      p4d:
        "Conectamos tu dominio, revisamos todo y quedamos disponibles para dudas.",

      cta_title: "¿Listo para tener tu página web?",
      cta_desc:
        "Agenda una llamada rápida o escríbenos por WhatsApp. Hablamos de tu negocio, te mostramos ideas y te damos un plan y precio claros.",
      cta_primary: "Consulta gratis",
      cta_secondary: "WhatsApp"
    },

    services: {
      label: "En qué te podemos ayudar",
      title: "Servicios",
      sub:
        "Elige lo que mejor se adapta a tu negocio hoy. Te lo explicamos todo en lenguaje sencillo.",

      s1t: "Diseño de página web",
      s1d:
        "Diseñamos una página limpia y moderna, que se vea bien y sea fácil de entender.",
      s2t: "Página para negocio local",
      s2d:
        "Ideal para negocios de servicios que quieren más llamadas y mensajes de su ciudad.",
      s3t: "Tienda en línea",
      s3d:
        "Mostramos tus productos de forma clara y hacemos que sea fácil hacer un pedido.",
      s5t: "Página para anuncios",
      s5d:
        "Una página enfocada para tus anuncios de Facebook/Google, donde la gente sabe qué hacer.",
      s4t: "Cuidado y mantenimiento",
      s4d:
        "Nos encargamos de actualizaciones, cambios pequeños y revisiones para que no te preocupes por la web.",
      s10t: "Configuración & conexiones",
      s10d:
        "Conectamos tu dominio, formularios, correo y herramientas que ya usas en tu negocio.",

      bullets: {
        rui: "Se ve bien en celular y computadora",
        analytics: "Lista para formularios, WhatsApp y métricas básicas"
      },

      cta_primary: "Hablar de mi proyecto",
      cta_secondary: "Detalles",
      cta_helper:
        "¿No sabes qué opción elegir? Te recomendamos una en una llamada rápida."
    },

    portfolio: {
      title: "Portafolio",
      sub: "Trabajo reciente en distintas industrias.",
      all: "Todo",
      visit: "Ver sitio",
      repo: "Repo",
      view_details: "Ver detalles",
      open_details: "Abrir detalles de {{title}}",

      projects: {
        mamapacha: {
          name: "Mama Pacha Sabor",
          short:
            "Sitio web moderno y vibrante para una marca de sazones artesanales e inspiración latina.",
          long:
            "Mama Pacha Sabor es una marca de sazones con mucha identidad cultural. El sitio web se diseñó para resaltar sus productos únicos, reforzar la identidad de marca y preparar la base para futuras ventas en línea. El resultado final es una experiencia visualmente rica, colorida y móvil-first, con narrativa clara y presentación intuitiva de los productos."
        },

        kaes_kitchen: {
          name: "Kae’s Kitchen",
          short:
            "Web acogedora para una pastelería con enfoque en bizcochos personalizados, postres y galerías de fotos.",
          long:
            "Kae’s Kitchen se especializa en bizcochos y postres personalizados. El sitio web se centra en mostrar el trabajo de la pastelería con imágenes de alta calidad, categorías claras y un flujo sencillo para solicitudes de pedidos. El diseño crea una atmósfera cálida que refleja la personalidad de la marca y mejora la experiencia de pedido del cliente."
        },

        elind: {
          name: "ELIND – Instalación & Venta de Equipos",
          short:
            "Sitio profesional de instalación y venta de equipos HVAC, sistemas eléctricos, calentadores de agua y más.",
          long:
            "ELIND ofrece instalación y venta de aires acondicionados, calentadores de agua, lavadoras, secadoras, paneles eléctricos y sistemas de automatización de bombas. El sitio web resalta el servicio rápido, el trabajo garantizado y la variedad de soluciones. El diseño se centra en la claridad, la imagen profesional y el fácil acceso a solicitudes de servicio."
        },

        shinepro: {
          name: "ShinePro Cleaning",
          short:
            "Sitio web pulido y profesional para servicio de limpieza, con llamados a la acción claros para cotizaciones.",
          long:
            "ShinePro Cleaning necesitaba una presencia online confiable, limpia y moderna. Construimos un layout brillante y organizado que destaca los servicios, comunica calidad y lleva a los usuarios directamente a reservar o solicitar cotizaciones. El diseño sirve tanto a clientes residenciales como comerciales."
        },

        memorable_moments: {
          name: "Memorable Moments Productions",
          short:
            "Sitio web de estilo cinematográfico para un estudio de fotografía y videografía.",
          long:
            "Memorable Moments Productions necesitaba un sitio visualmente impactante para mostrar fotos, videos y cobertura de eventos. El diseño final adopta una estética cinematográfica con presentación centrada en galerías, layouts dinámicos y fuerte énfasis en resaltar creatividad y storytelling visual."
        },

        primavera_flowers: {
          name: "Primavera Flowers",
          short:
            "Floristería bilingüe con catálogo, opciones de entrega y una experiencia de marca moderna.",
          long:
            "Primavera Flowers necesitaba una plataforma bilingüe para mostrar arreglos florales, ofrecer entrega el mismo día y mejorar la experiencia del cliente. Entregamos un sitio moderno, suave y elegante con categorías de productos, validación de radio de entrega y navegación fluida tanto en inglés como en español."
        },

        glo_event: {
          name: "Glo Event Co",
          short:
            "Sitio con temática neón para eventos y photo booth, con visuales dinámicos y flujo de reserva.",
          long:
            "Glo Event Co se especializa en alquiler de cabinas fotográficas, equipos para silent party y servicios para eventos. El sitio presenta una estética neón atrevida, animaciones modernas y una estructura orientada a reservas que aumenta el engagement y resalta el estilo único de la marca en el mundo nocturno."
        },

        bendecidos: {
          name: "Bendecidos con Propósito",
          short:
            "Sitio bilingüe para una organización sin fines de lucro, enfocado en la misión, voluntariado y donaciones.",
          long:
            "Bendecidos con Propósito apoya comunidades en la República Dominicana. Construimos una plataforma bilingüe que resalta su misión, muestra galerías de fotos y anima a donar mediante storytelling claro y contenido bien estructurado."
        },

        group_travel: {
          name: "Group Travel Co",
          short:
            "Agencia de viajes moderna con enfoque en viajes grupales, destinos y solicitudes de cotización.",
          long:
            "Group Travel Co organiza viajes para familias, colegios, iglesias y equipos corporativos. El sitio presenta visuales vibrantes, secciones de destinos destacados y embudos de captación diseñados para solicitudes rápidas de cotización y vistas previas de itinerarios."
        },

        archcity_roofing: {
          name: "ArchCity Roofing & Exteriors",
          short:
            "Compañía de techos y exteriores en St. Louis, especializada en reemplazos residenciales, reparaciones y sistemas de canaletas.",
          long:
            "ArchCity Roofing & Exteriors es una empresa local de techos en St. Louis enfocada en proteger hogares con materiales de calidad, mano de obra limpia y comunicación honesta. El sitio web destaca los servicios residenciales principales, presenta trabajos de antes y después y facilita que los visitantes soliciten inspecciones y cotizaciones gratuitas. El contenido está optimizado para búsquedas locales y el diseño se siente moderno, sólido y profesional."
        },

        luxe_district_salon: {
          name: "Luxe District Salon",
          short:
            "Salón de belleza full-service moderno con servicios de pelo, color, styling, maquillaje y tratamientos en un ambiente tipo boutique.",
          long:
            "Luxe District Salon es un salón de belleza full-service que combina un ambiente boutique con una experiencia de alto nivel. El sitio presenta el salón como un espacio estiloso y acogedor, con visuales fuertes, menús de servicios claros y reservas sencillas. El layout es mobile-first, para que las clientas puedan explorar servicios, ver el trabajo de las estilistas y agendar citas en pocos pasos."
        },

        gateway_home_plumbing: {
          name: "Gateway Home Plumbing",
          short:
            "Servicio de plomería residencial enfocado en soluciones rápidas y confiables para fugas, obstrucciones y problemas con calentadores de agua.",
          long:
            "Gateway Home Plumbing está dedicado a ayudar a propietarios en St. Louis a resolver problemas de plomería de forma rápida y profesional. El sitio guía a los visitantes para solicitar servicio en pocos clics, con páginas de servicio claras, llamados a la acción destacados y contenido enfocado en búsquedas locales que facilita la confianza y el contacto con la empresa."
        }
      }
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
      pro_pitch:
        "UI premium, bloques de conversión y estructura de SEO local.",
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
      response_desc:
        "Normalmente respondemos en pocas horas en días hábiles.",
      areas: "Zonas de servicio",
      areas_desc: "St. Louis, MO y clientes remotos en EE.UU."
    },

    meta: {
      title: "Domi Websites | Diseño Web en St. Louis que Convierte",
      description:
        "Diseñamos webs modernas y rápidas para pequeñas empresas que posicionan en Google y convierten visitas en clientes."
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: saved || "en",
  fallbackLng: "en",
  ns: [
    "common",
    "home",
    "about",
    "services",
    "portfolio",
    "pricing",
    "contact",
    "meta"
  ],
  defaultNS: "common",
  interpolation: { escapeValue: false }
});

export default i18n;
