export type Lang = "es" | "en";

const es = {
  nav: {
    cta: "Empezar",
    ctaMobile: "Empezar proyecto",
    open: "Abrir menú",
    close: "Cerrar menú",
    links: [
      { label: "Servicios", href: "/#servicios" },
      { label: "Proceso", href: "/#proceso" },
      { label: "Precios", href: "/#precios" },
      { label: "Presupuesto", href: "/calculadora" },
      { label: "FAQ", href: "/#faq" },
    ] as { label: string; href: string }[],
  },
  hero: {
    badge: "Webs premium en 5 días · LATAM",
    h1Pre: "Web profesional lista en",
    h1Scramble: "5 días",
    h1Post: "desde $149",
    p: "Diseño web premium y automatización con IA para negocios de Latinoamérica. Sin contratos eternos, sin complicaciones técnicas — 100% en español.",
    cta: "Empezar mi proyecto",
    ctaSecondary: "Ver planes y precios",
    badges: [
      "Consulta gratis sin compromiso",
      "Sin contratos largos",
      "Resultados garantizados",
    ] as string[],
  },
  marquee: [
    "Entrega en 5 días",
    "Desde $149 USD",
    "Automatización con IA",
    "100% en español",
  ] as string[],
  services: {
    eyebrow: "Qué hacemos",
    title: "Todo lo que un negocio necesita para vender online",
    subtitle:
      "Desde la web hasta la presencia digital completa. Nos encargamos de lo técnico para que el negocio se enfoque en crecer.",
    serviceBadge: (n: number) => `0${n} · Servicio`,
    items: [
      {
        icon: "Browsers" as const,
        title: "Páginas web profesionales",
        description:
          "Diseño moderno, responsivo y optimizado para SEO. El negocio luce premium desde el primer día.",
        features: [
          "Diseño personalizado a la marca",
          "SEO técnico completo (JSON-LD, sitemap, Open Graph)",
          "PageSpeed 95+ garantizado",
          "Formulario de contacto + Google Analytics 4",
          "Copywriting con IA para todos los textos",
        ] as string[],
      },
      {
        icon: "Globe" as const,
        title: "Presencia digital completa",
        description:
          "Más allá de la web: Google, WhatsApp, citas y CRM para que el negocio destaque en todos lados.",
        features: [
          "Google My Business optimizado",
          "WhatsApp Business configurado",
          "Sistema de citas online (Calendly)",
          "Chatbot web 24/7 (Tidio)",
          "HubSpot CRM gratuito configurado",
        ] as string[],
      },
      {
        icon: "Wrench" as const,
        title: "Mantenimiento mensual",
        description: "La web siempre actualizada y en perfecto estado por $49/mes. Nos encargamos de todo.",
        features: [
          "Actualizaciones de contenido ilimitadas",
          "Backups semanales automáticos",
          "Soporte prioritario WhatsApp (respuesta en 1h)",
          "Reporte mensual de visitas y métricas",
        ] as string[],
      },
    ],
  },
  about: {
    eyebrow: "Quiénes Somos",
    h2Pre: "Somos",
    h2Accent: "José y Pierre",
    tagline: "Fundadores de Takya",
    p1: "José Chugchilán y Pierre Carrion son los fundadores de Takya, una agencia digital dedicada a crear soluciones web de alta calidad para negocios en Latinoamérica.",
    p2: "Con experiencia en diseño, desarrollo y automatización con IA, creemos que cada negocio merece una presencia digital profesional, rápida y accesible. Nuestra misión es democratizar el acceso a webs premium sin sacrificar calidad.",
    quote:
      "No creemos en contratos eternos ni en precios injustos. Creemos en transparencia, velocidad y resultados.",
    cta: "Empezar un proyecto →",
    bottomText: "Trabajamos desde Quito, Ecuador para negocios de toda Latinoamérica.",
    stats: [
      { value: "50+", label: "Proyectos completados" },
      { value: "98+", label: "PageSpeed promedio" },
      { value: "5", label: "Días entrega estándar" },
      { value: "99.9%", label: "Uptime garantizado" },
    ] as { value: string; label: string }[],
    pillars: [
      { title: "Velocidad", description: "Entregamos en días, no meses" },
      { title: "Calidad", description: "Código limpio, diseño premium" },
      { title: "Transparencia", description: "Sin costos ocultos, jamás" },
      { title: "En español", description: "Comunicación directa y clara" },
    ] as { title: string; description: string }[],
  },
  process: {
    eyebrow: "El Proceso",
    h2Pre: "Una web lista en",
    h2Accent: "5 días",
    cta: "Empezar ahora — es gratis →",
    steps: [
      { number: "01", title: "Hablamos", duration: "30 min" },
      { number: "02", title: "Diseñamos", duration: "Días 1–2" },
      { number: "03", title: "Ajustamos", duration: "Días 3–4" },
      { number: "04", title: "Publicamos", duration: "Día 5" },
    ] as { number: string; title: string; duration: string }[],
  },
  faq: {
    eyebrow: "Preguntas frecuentes",
    title: "Todo lo que hay que saber",
    items: [
      {
        question: "¿Cuánto tiempo tarda tener mi web lista?",
        answer:
          "Entregamos la web en 5 días hábiles desde que el cliente aprueba el diseño inicial. Si necesita cambios, los hacemos sin costo extra y sin límite de revisiones.",
      },
      {
        question: "¿Qué pasa si no me gusta el diseño?",
        answer:
          "Nada avanza sin la aprobación del cliente. Hacemos las revisiones necesarias hasta que quede completamente satisfecho.",
      },
      {
        question: "¿Necesito saber de tecnología?",
        answer:
          "Para nada. Nos encargamos de todo lo técnico: dominio, hosting, configuración y seguridad. El cliente solo nos dice qué necesita su negocio.",
      },
      {
        question: "¿Qué incluye el mantenimiento mensual?",
        answer:
          "Actualizaciones de seguridad, backups semanales, cambios de contenido ilimitados, soporte prioritario por WhatsApp y reportes de rendimiento mensuales.",
      },
      {
        question: "¿Trabajan solo con negocios en Ecuador?",
        answer:
          "No, trabajamos con negocios de toda Latinoamérica. La comunicación es 100% en español y nos adaptamos a su zona horaria.",
      },
    ] as { question: string; answer: string }[],
  },
  pricing: {
    eyebrow: "Precios transparentes",
    title: "Planes a la medida de cada negocio",
    subtitle:
      "Sin costos ocultos, sin contratos largos. El plan se ajusta a la etapa de cada negocio y escala cuando haga falta.",
    popularBadge: "Más popular",
    disclaimer1: "El dominio no está incluido en ningún plan: se cotiza aparte.",
    disclaimer2: "Mantenimiento mensual disponible por $49/mes en cualquier plan.",
    notSure: "¿No está seguro cuál elegir?",
    consultLink: "Agende una consulta gratuita →",
    calcLink: "¿No sabe qué plan necesita? Calcule su precio estimado →",
    plans: [
      {
        name: "Inicio",
        description: "Perfecta para iniciar la presencia digital de un negocio y generar confianza.",
        features: [
          { text: "Web de hasta 5 secciones", included: true },
          { text: "Diseño responsivo mobile-first", included: true },
          { text: "SEO básico optimizado (meta tags, Open Graph)", included: true },
          { text: "Hosting incluido (1 año en Vercel)", included: true },
          { text: "Entrega en 5 días hábiles", included: true },
          { text: "Chatbot web (Tidio) configurado", included: true },
          { text: "WhatsApp Business configurado", included: true },
          { text: "Google Analytics 4 instalado", included: true },
        ],
        cta: "Empezar con Inicio",
      },
      {
        name: "Escala",
        description: "La opción más popular para negocios en crecimiento.",
        features: [
          { text: "Todo lo del plan Inicio", included: true },
          { text: "Hasta 10 secciones + blog", included: true },
          { text: "Animaciones avanzadas (Framer Motion)", included: true },
          { text: "SEO avanzado (JSON-LD, sitemap, robots.txt)", included: true },
          { text: "Copywriting con IA para todos los textos", included: true },
          { text: "1 mes de mantenimiento gratuito", included: true },
          { text: "Chatbot Tidio personalizado", included: true },
        ],
        cta: "Empezar con Escala",
      },
      {
        name: "Dominio",
        description: "El plan más completo: CRM, citas online y consultoría estratégica.",
        features: [
          { text: "Todo lo del plan Escala", included: true },
          { text: "HubSpot CRM gratuito configurado", included: true },
          { text: "Google My Business optimizado", included: true },
          { text: "Auditoría de diseño completa (Claude)", included: true },
          { text: "Sistema de citas online (Calendly embebido)", included: true },
          { text: "3 meses de mantenimiento gratuito", included: true },
          { text: "Consultoría estratégica mensual (30 min)", included: true },
        ],
        cta: "Empezar con Dominio",
      },
    ] as { name: string; description: string; features: { text: string; included: boolean }[]; cta: string }[],
  },
  contact: {
    eyebrow: "Hablemos",
    title: "Cuéntenos su idea",
    subtitle: "Respondemos por WhatsApp en menos de 2 horas. Sin compromiso.",
    successTitle: "¡Mensaje recibido!",
    successMsg: "Gracias. Revisamos la solicitud y le respondemos en menos de 2 horas.",
    errorMsg: "No se pudo enviar la solicitud. Inténtelo de nuevo o escríbanos por WhatsApp.",
    submitIdle: "Enviar por WhatsApp",
    submitLoading: "Enviando…",
    directContact: "Contacto directo",
    hoursLabel: "Horario",
    fields: {
      nombre: "Nombre completo",
      email: "Email",
      whatsapp: "WhatsApp de contacto",
      negocio: "Tipo de negocio",
    },
    errors: {
      nombre: "Escriba su nombre.",
      email: "Email no válido.",
      whatsapp: "WhatsApp no válido.",
      negocio: "Elija una opción.",
    },
    businessTypes: [
      { value: "emprendimiento", label: "Emprendimiento personal" },
      { value: "empresa", label: "Empresa / Startup" },
      { value: "freelance", label: "Freelance / Consultor" },
      { value: "ecommerce", label: "E-commerce / Tienda" },
      { value: "infoproducto", label: "Infoproducto / Curso" },
      { value: "otro", label: "Otro" },
    ] as { value: string; label: string }[],
  },
  footer: {
    navLabel: "Navegación",
    contactLabel: "Contacto",
    madeIn: "Hecho en",
  },
  audit: {
    badge: "Gratis · Sin compromiso",
    title: "Auditoría gratuita de la web actual",
    description: "Revisamos el sitio e indicamos exactamente qué mejorar para vender más. Sin tecnicismos.",
    cta: "Solicitar mi auditoría gratis",
    disclaimer: "Respuesta en menos de 24h · Gratis · Sin presión",
    items: [
      "Velocidad de carga y Core Web Vitals",
      "Optimización SEO y posicionamiento",
      "Experiencia móvil y responsividad",
      "Claridad del mensaje y conversión",
      "Seguridad y certificado SSL",
      "Integración con WhatsApp y analítica",
    ] as string[],
  },
  technology: {
    label: "Construido con tecnología de punta",
    stats: [
      { value: 98, suffix: "+", label: "PageSpeed Score" },
      { value: 99.9, suffix: "%", label: "Uptime garantizado" },
      { value: 5, suffix: " días", label: "Entrega promedio" },
      { value: 24, suffix: "/7", label: "Soporte WhatsApp" },
    ] as { value: number; suffix: string; label: string }[],
  },
  comparison: {
    eyebrow: "La decisión inteligente",
    title: "¿Por qué Takya?",
    subtitle: "Una comparación honesta de las opciones. Sin marketing inflado.",
    cols: [
      { key: "wix" as const, label: "Por su cuenta" },
      { key: "freelancer" as const, label: "Freelancer random" },
      { key: "agencia" as const, label: "Agencia grande" },
    ],
    tabs: [
      { key: "wix" as const, short: "Por su cuenta" },
      { key: "freelancer" as const, short: "Freelancer" },
      { key: "vekto" as const, short: "Takya" },
      { key: "agencia" as const, short: "Agencia grande" },
    ],
    rows: [
      {
        criterio: "Tiempo hasta tener la web",
        wix: "Semanas aprendiendo",
        freelancer: "2-6 semanas (sin garantía)",
        agencia: "2-4 meses",
        vekto: "5 días garantizados",
      },
      {
        criterio: "Precio real",
        wix: "$200-800/año (plantillas + plugins + dominio + SSL)",
        freelancer: "$300-2,000 (varía sin contrato)",
        agencia: "$2,000-15,000",
        vekto: "Desde $149. Sin sorpresas.",
      },
      {
        criterio: "Calidad del resultado",
        wix: "Plantilla genérica, lenta, difícil de posicionar",
        freelancer: "Depende del freelancer (lotería)",
        agencia: "Premium pero impersonal",
        vekto: "Código limpio, PageSpeed 95+, diseño a medida",
      },
      {
        criterio: "Soporte después",
        wix: "Tutoriales de YouTube",
        freelancer: "Desaparece tras entregar",
        agencia: "Ticket de soporte con SLA de días",
        vekto: "WhatsApp directo. Respuesta en 1h.",
      },
      {
        criterio: "SEO y velocidad",
        wix: "Limitado. Genera código pesado",
        freelancer: "Opcional y extra",
        agencia: "Incluido pero genérico",
        vekto: "SEO técnico + PageSpeed 95+ incluido",
      },
      {
        criterio: "¿Hablan su idioma?",
        wix: "Soporte en inglés",
        freelancer: "Depende",
        agencia: "Formal y con intermediarios",
        vekto: "100% español. José y Pierre directamente.",
      },
    ] as { criterio: string; wix: string; freelancer: string; agencia: string; vekto: string }[],
    whyNotTitle: "¿Por qué no hacerlo por su cuenta?",
    whyNotBody: [
      {
        lead: "Plataformas de arrastrar y soltar:",
        text: "pagas suscripción mensual para siempre. El código que generan es pesado, Google las penaliza en velocidad y cuando cancelas, pierdes todo lo que construiste.",
      },
      {
        lead: "Gestores de contenido tradicionales:",
        text: "necesitan mantenimiento constante, actualizaciones, plugins de seguridad y alguien técnico que los gestione. Son la causa del 40% de los sitios hackeados en internet.",
      },
      {
        lead: "Takya",
        text: "usa tecnología moderna — la misma de Nike, TikTok y OpenAI. La web es del cliente, no depende de ninguna plataforma, carga en menos de 1 segundo y nadie cobra suscripción mensual para que siga funcionando.",
      },
    ] as { lead: string; text: string }[],
  },
  testimonials: {
    eyebrow: "Testimonios",
    title: "Lo que dicen nuestros clientes",
    subtitle: "Negocios reales de toda Latinoamérica que ya tienen su web con Takya.",
    starsLabel: (n: number) => `${n} de 5 estrellas`,
  },
  projects: {
    eyebrow: "Portafolio",
    h2Pre: "Proyectos en los que",
    h2Accent: "estamos trabajando.",
    subtitle:
      "Experiencias digitales ambiciosas en desarrollo activo para clientes en Ecuador y Latinoamérica.",
    featuredBadge: "Proyecto Principal",
    loading: (title: string) => `Cargando ${title}…`,
    openBtn: "Abrir",
    caseStudyLink: "Ver caso de estudio completo",
    ctaTitle: "¿Busca un proyecto así?",
    ctaSubtitle: "Cuéntenos su idea — la primera conversación es gratis.",
    ctaBtn: "Empezar un proyecto →",
  },
  floatingCta: {
    tip: "¿Hablamos? Respondo en menos de 1h",
    ariaLabel: "Escríbenos por WhatsApp",
  },
};

const en: typeof es = {
  nav: {
    cta: "Get started",
    ctaMobile: "Start a project",
    open: "Open menu",
    close: "Close menu",
    links: [
      { label: "Services", href: "/#servicios" },
      { label: "Process", href: "/#proceso" },
      { label: "Pricing", href: "/#precios" },
      { label: "Calculator", href: "/calculadora" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  hero: {
    badge: "Premium websites in 5 days · LATAM",
    h1Pre: "Professional website ready in",
    h1Scramble: "5 days",
    h1Post: "from $149",
    p: "Premium web design and AI automation for Latin American businesses. No long-term contracts, no technical headaches.",
    cta: "Start my project",
    ctaSecondary: "View plans & pricing",
    badges: [
      "Free no-commitment consultation",
      "No long-term contracts",
      "Guaranteed results",
    ],
  },
  marquee: [
    "5-day delivery",
    "From $149 USD",
    "AI Automation",
    "Direct communication",
  ],
  services: {
    eyebrow: "What we do",
    title: "Everything a business needs to sell online",
    subtitle:
      "From the website to a full digital presence. We handle all the technical work so your business can focus on growing.",
    serviceBadge: (n: number) => `0${n} · Service`,
    items: [
      {
        icon: "Browsers" as const,
        title: "Professional websites",
        description:
          "Modern, responsive design optimized for SEO. Your business looks premium from day one.",
        features: [
          "Custom brand design",
          "Full technical SEO (JSON-LD, sitemap, Open Graph)",
          "PageSpeed 95+ guaranteed",
          "Contact form + Google Analytics 4",
          "AI-powered copywriting for all text",
        ],
      },
      {
        icon: "Globe" as const,
        title: "Complete digital presence",
        description:
          "Beyond the website: Google, WhatsApp, appointments and CRM so your business stands out everywhere.",
        features: [
          "Google My Business optimization",
          "WhatsApp Business setup",
          "Online appointment system (Calendly)",
          "24/7 web chatbot (Tidio)",
          "Free HubSpot CRM setup",
        ],
      },
      {
        icon: "Wrench" as const,
        title: "Monthly maintenance",
        description: "Your website always up-to-date and running perfectly for $49/month. We handle everything.",
        features: [
          "Unlimited content updates",
          "Automatic weekly backups",
          "Priority WhatsApp support (1h response)",
          "Monthly traffic and metrics report",
        ],
      },
    ],
  },
  about: {
    eyebrow: "About Us",
    h2Pre: "We are",
    h2Accent: "José & Pierre",
    tagline: "Founders of Takya",
    p1: "José Chugchilán and Pierre Carrion are the founders of Takya, a digital agency dedicated to building high-quality web solutions for businesses across Latin America.",
    p2: "With expertise in design, development and AI automation, we believe every business deserves a professional, fast and accessible digital presence. Our mission is to democratize access to premium websites without sacrificing quality.",
    quote:
      "We don't believe in endless contracts or unfair prices. We believe in transparency, speed and results.",
    cta: "Start a project →",
    bottomText: "We work from Quito, Ecuador for businesses across all of Latin America.",
    stats: [
      { value: "50+", label: "Projects completed" },
      { value: "98+", label: "Average PageSpeed" },
      { value: "5", label: "Days standard delivery" },
      { value: "99.9%", label: "Guaranteed uptime" },
    ],
    pillars: [
      { title: "Speed", description: "We deliver in days, not months" },
      { title: "Quality", description: "Clean code, premium design" },
      { title: "Transparency", description: "No hidden costs, ever" },
      { title: "Direct", description: "Clear and straightforward communication" },
    ],
  },
  process: {
    eyebrow: "The Process",
    h2Pre: "A website ready in",
    h2Accent: "5 days",
    cta: "Start now — it's free →",
    steps: [
      { number: "01", title: "We talk", duration: "30 min" },
      { number: "02", title: "We design", duration: "Days 1–2" },
      { number: "03", title: "We refine", duration: "Days 3–4" },
      { number: "04", title: "We launch", duration: "Day 5" },
    ],
  },
  faq: {
    eyebrow: "Frequently asked questions",
    title: "Everything you need to know",
    items: [
      {
        question: "How long does it take to have my website ready?",
        answer:
          "We deliver the website in 5 business days from the moment the client approves the initial design. If changes are needed, we make them at no extra cost and with no revision limit.",
      },
      {
        question: "What if I don't like the design?",
        answer:
          "Nothing moves forward without the client's approval. We make all necessary revisions until you are completely satisfied.",
      },
      {
        question: "Do I need any technical knowledge?",
        answer:
          "Not at all. We handle everything technical: domain, hosting, configuration and security. You just tell us what your business needs.",
      },
      {
        question: "What does the monthly maintenance include?",
        answer:
          "Security updates, weekly backups, unlimited content changes, priority WhatsApp support, and monthly performance reports.",
      },
      {
        question: "Do you only work with businesses in Ecuador?",
        answer:
          "No, we work with businesses across all of Latin America. Communication is available in both Spanish and English, and we adapt to your time zone.",
      },
    ],
  },
  pricing: {
    eyebrow: "Transparent pricing",
    title: "Plans tailored to every business",
    subtitle:
      "No hidden costs, no long-term contracts. The plan adapts to where your business is and scales when needed.",
    popularBadge: "Most popular",
    disclaimer1: "Domain is not included in any plan — quoted separately.",
    disclaimer2: "Monthly maintenance available for $49/month on any plan.",
    notSure: "Not sure which plan to choose?",
    consultLink: "Schedule a free consultation →",
    calcLink: "Not sure what you need? Estimate your price →",
    plans: [
      {
        name: "Starter",
        description: "Perfect for launching a business's digital presence and building trust.",
        features: [
          { text: "Website up to 5 sections", included: true },
          { text: "Mobile-first responsive design", included: true },
          { text: "Basic SEO optimization (meta tags, Open Graph)", included: true },
          { text: "Hosting included (1 year on Vercel)", included: true },
          { text: "Delivery in 5 business days", included: true },
          { text: "Web chatbot (Tidio) configured", included: true },
          { text: "WhatsApp Business setup", included: true },
          { text: "Google Analytics 4 installed", included: true },
        ],
        cta: "Get started with Starter",
      },
      {
        name: "Scale",
        description: "The most popular option for growing businesses.",
        features: [
          { text: "Everything in Starter", included: true },
          { text: "Up to 10 sections + blog", included: true },
          { text: "Advanced animations (Framer Motion)", included: true },
          { text: "Advanced SEO (JSON-LD, sitemap, robots.txt)", included: true },
          { text: "AI-powered copywriting for all text", included: true },
          { text: "1 month free maintenance", included: true },
          { text: "Custom Tidio chatbot", included: true },
        ],
        cta: "Get started with Scale",
      },
      {
        name: "Dominio",
        description: "The most complete plan: CRM, online appointments and strategic consulting.",
        features: [
          { text: "Everything in Scale", included: true },
          { text: "Free HubSpot CRM setup", included: true },
          { text: "Google My Business optimization", included: true },
          { text: "Full design audit (Claude AI)", included: true },
          { text: "Online appointment system (Calendly embedded)", included: true },
          { text: "3 months free maintenance", included: true },
          { text: "Monthly strategic consulting (30 min)", included: true },
        ],
        cta: "Get started with Dominio",
      },
    ],
  },
  contact: {
    eyebrow: "Let's talk",
    title: "Tell us your idea",
    subtitle: "We respond via WhatsApp in under 2 hours. No commitment.",
    successTitle: "Message received!",
    successMsg: "Thank you. We'll review your request and get back to you within 2 hours.",
    errorMsg: "Could not send the request. Please try again or write to us on WhatsApp.",
    submitIdle: "Send via WhatsApp",
    submitLoading: "Sending…",
    directContact: "Direct contact",
    hoursLabel: "Hours",
    fields: {
      nombre: "Full name",
      email: "Email",
      whatsapp: "Contact WhatsApp",
      negocio: "Business type",
    },
    errors: {
      nombre: "Please enter your name.",
      email: "Invalid email address.",
      whatsapp: "Invalid WhatsApp number.",
      negocio: "Please choose an option.",
    },
    businessTypes: [
      { value: "emprendimiento", label: "Personal venture" },
      { value: "empresa", label: "Company / Startup" },
      { value: "freelance", label: "Freelancer / Consultant" },
      { value: "ecommerce", label: "E-commerce / Store" },
      { value: "infoproducto", label: "Info product / Course" },
      { value: "otro", label: "Other" },
    ],
  },
  footer: {
    navLabel: "Navigation",
    contactLabel: "Contact",
    madeIn: "Made in",
  },
  audit: {
    badge: "Free · No commitment",
    title: "Free audit of your current website",
    description: "We review your site and tell you exactly what to improve to sell more. No technical jargon.",
    cta: "Request my free audit",
    disclaimer: "Response within 24h · Free · No pressure",
    items: [
      "Load speed and Core Web Vitals",
      "SEO optimization and ranking",
      "Mobile experience and responsiveness",
      "Message clarity and conversion",
      "Security and SSL certificate",
      "WhatsApp and analytics integration",
    ],
  },
  technology: {
    label: "Built with cutting-edge technology",
    stats: [
      { value: 98, suffix: "+", label: "PageSpeed Score" },
      { value: 99.9, suffix: "%", label: "Guaranteed uptime" },
      { value: 5, suffix: " days", label: "Average delivery" },
      { value: 24, suffix: "/7", label: "WhatsApp support" },
    ],
  },
  comparison: {
    eyebrow: "The smart choice",
    title: "Why Takya?",
    subtitle: "An honest comparison of your options. No inflated marketing.",
    cols: [
      { key: "wix" as const, label: "On your own" },
      { key: "freelancer" as const, label: "Random freelancer" },
      { key: "agencia" as const, label: "Large agency" },
    ],
    tabs: [
      { key: "wix" as const, short: "On your own" },
      { key: "freelancer" as const, short: "Freelancer" },
      { key: "vekto" as const, short: "Takya" },
      { key: "agencia" as const, short: "Large agency" },
    ],
    rows: [
      {
        criterio: "Time to launch",
        wix: "Weeks of learning",
        freelancer: "2-6 weeks (no guarantee)",
        agencia: "2-4 months",
        vekto: "5 days guaranteed",
      },
      {
        criterio: "Real price",
        wix: "$200-800/year (templates + plugins + domain + SSL)",
        freelancer: "$300-2,000 (varies, no contract)",
        agencia: "$2,000-15,000",
        vekto: "From $149. No surprises.",
      },
      {
        criterio: "Result quality",
        wix: "Generic template, slow, hard to rank",
        freelancer: "Depends on the freelancer (lottery)",
        agencia: "Premium but impersonal",
        vekto: "Clean code, PageSpeed 95+, custom design",
      },
      {
        criterio: "Post-launch support",
        wix: "YouTube tutorials",
        freelancer: "Disappears after delivery",
        agencia: "Support ticket with days-long SLA",
        vekto: "Direct WhatsApp. Response in 1h.",
      },
      {
        criterio: "SEO & speed",
        wix: "Limited. Generates heavy code",
        freelancer: "Optional and extra cost",
        agencia: "Included but generic",
        vekto: "Technical SEO + PageSpeed 95+ included",
      },
      {
        criterio: "Do they speak your language?",
        wix: "English support",
        freelancer: "Depends",
        agencia: "Formal and through intermediaries",
        vekto: "100% direct. José and Pierre personally.",
      },
    ],
    whyNotTitle: "Why not do it yourself?",
    whyNotBody: [
      {
        lead: "Drag-and-drop platforms:",
        text: "you pay a monthly subscription forever. The code they generate is heavy, Google penalizes them for speed, and when you cancel, you lose everything you built.",
      },
      {
        lead: "Traditional content managers:",
        text: "they need constant maintenance, updates, security plugins and someone technical to manage them. They're the cause of 40% of hacked websites on the internet.",
      },
      {
        lead: "Takya",
        text: "uses modern technology — the same used by Nike, TikTok and OpenAI. The website belongs to you, doesn't depend on any platform, loads in under 1 second, and nobody charges a monthly fee to keep it running.",
      },
    ],
  },
  testimonials: {
    eyebrow: "Testimonials",
    title: "What our clients say",
    subtitle: "Real businesses across Latin America that already have their website with Takya.",
    starsLabel: (n: number) => `${n} out of 5 stars`,
  },
  projects: {
    eyebrow: "Portfolio",
    h2Pre: "Projects we're",
    h2Accent: "actively building.",
    subtitle:
      "Ambitious digital experiences in active development for clients in Ecuador and Latin America.",
    featuredBadge: "Featured Project",
    loading: (title: string) => `Loading ${title}…`,
    openBtn: "Open",
    caseStudyLink: "View full case study",
    ctaTitle: "Looking for a project like this?",
    ctaSubtitle: "Tell us your idea — the first conversation is free.",
    ctaBtn: "Start a project →",
  },
  floatingCta: {
    tip: "Chat with us — we reply within 1h",
    ariaLabel: "Write to us on WhatsApp",
  },
};

/* ── Calculator ── */
const calcEs = {
  backLink: "Volver a Takya",
  eyebrow: "Calculadora",
  title: "¿Cuánto cuesta una web?",
  subtitle: "Responda 7 preguntas rápidas y le damos un estimado al instante.",
  stepLabel: (cur: number, total: number) => `Paso ${cur} de ${total}`,
  back: "Atrás",
  next: "Siguiente",
  seeResult: "Ver resultado",
  recommended: "Plan recomendado",
  planLabel: (name: string) => `Plan ${name}`,
  priceNote: "USD · pago único · sin costos ocultos",
  maintenanceNote: (amt: number) => `+ $${amt}/mes de mantenimiento`,
  breakdown: "Desglose",
  total: "Total",
  startCta: "Empezar mi proyecto →",
  recalculate: "← Volver a calcular",
  extraLabels: {
    copywriting: "Copywriting con IA",
    gmb: "Google My Business optimizado",
    citas: "Sistema de citas (Calendly)",
    landing: "Landing page para anuncios",
    analytics: "Reportes mensuales de visitas",
    auditoria: "Auditoría de web existente",
  },
  insights: {
    ecommerce:
      "Para e-commerce en Ecuador, las pasarelas más usadas son Datafast y Payphone. El SRI exige facturación electrónica al facturar online: lo integramos sin costo extra.",
    citas:
      "Para negocios de citas (salud, belleza, educación), Calendly embebido en la web permite que los clientes reserven solos, 24/7, sin que el negocio tenga que responder cada mensaje.",
    local:
      "Con local físico, Google My Business optimizado puede triplicar las consultas locales. El 88% de las búsquedas locales en Ecuador termina en compra en menos de 24 horas.",
    profesional:
      "Una web bien posicionada para profesionales independientes en Quito puede generar entre 3 y 10 consultas nuevas por semana, sin pagar publicidad.",
    default:
      "Una web optimizada con SEO técnico genera clientes nuevos de forma orgánica. El 72% de las búsquedas en Ecuador son desde el celular — la web estará perfecta para eso.",
  },
  steps: [
    {
      key: "objetivo" as const,
      type: "radio" as const,
      title: "¿Qué quiere lograr con la web?",
      options: [
        { value: "conseguir-clientes", label: "Conseguir más clientes", subtext: "Generar llamadas, mensajes o consultas desde la web" },
        { value: "vender-online", label: "Vender productos online", subtext: "Tienda con carrito, pagos y catálogo" },
        { value: "agendar-citas", label: "Que los clientes agenden citas", subtext: "Médicos, salones, tutores, coaches" },
        { value: "mostrar-trabajo", label: "Mostrar mi trabajo / portafolio", subtext: "Imagen profesional y credibilidad" },
      ],
    },
    {
      key: "negocio" as const,
      type: "radio" as const,
      title: "¿Qué tipo de negocio tiene?",
      options: [
        { value: "emprendimiento", label: "Emprendimiento personal", subtext: "Negocio propio, marca personal o servicio" },
        { value: "empresa", label: "Empresa / Startup", subtext: "Equipo de trabajo, clientes B2B o B2C" },
        { value: "profesional", label: "Profesional independiente", subtext: "Médico, abogado, diseñador, coach, tutor" },
        { value: "ecommerce", label: "Tienda / E-commerce", subtext: "Venta de productos físicos o digitales" },
      ],
    },
    {
      key: "local" as const,
      type: "radio" as const,
      title: "¿Tiene local físico o atiende en persona?",
      options: [
        { value: "si", label: "Sí, tengo local o atiendo en persona", subtext: "Restaurante, consultorio, tienda, oficina" },
        { value: "no", label: "No, soy 100% online o voy donde el cliente", subtext: "Servicios remotos, delivery, freelance" },
      ],
    },
    {
      key: "contenido" as const,
      type: "radio" as const,
      title: "¿Tiene textos e imágenes listos?",
      options: [
        { value: "si", label: "Sí, tengo logo, fotos y textos listos", subtext: "Solo necesito que diseñen la web" },
        { value: "parcial", label: "Tengo algo, pero necesito ayuda con los textos", subtext: "Copywriting con IA incluido" },
        { value: "no", label: "Parto desde cero, no tengo nada", subtext: "Textos, estructura y sugerencias de imágenes" },
      ],
    },
    {
      key: "extras" as const,
      type: "checkbox" as const,
      title: "¿Qué más necesita el negocio?",
      subtitle: "Selecciona todas las que apliquen.",
      options: [
        { value: "gmb", label: "Google My Business", subtext: "Aparecer en Google Maps" },
        { value: "citas", label: "Sistema de citas online", subtext: "Reservas automáticas (Calendly)" },
        { value: "analytics", label: "Reportes mensuales de visitas", subtext: "Analytics + PDF resumen" },
        { value: "landing", label: "Landing page para anuncios", subtext: "Meta Ads o Google Ads" },
        { value: "blog", label: "Blog o sección de noticias", subtext: "Contenido actualizable" },
        { value: "auditoria", label: "Auditoría de mi web actual", subtext: "Si ya tienen una web mala" },
      ],
    },
    {
      key: "mantenimiento" as const,
      type: "radio" as const,
      title: "¿Quiere mantenimiento mensual?",
      options: [
        { value: "si", label: "Sí, quiero despreocuparme — $49/mes", subtext: "Actualizaciones, cambios, soporte WhatsApp directo" },
        { value: "no", label: "No por ahora", subtext: "Solo el proyecto único" },
      ],
    },
    {
      key: "urgencia" as const,
      type: "radio" as const,
      title: "¿Para cuándo necesita la web?",
      options: [
        { value: "semana", label: "Esta semana", subtext: "Prioridad máxima dentro de los 5 días hábiles" },
        { value: "mes", label: "Este mes", subtext: "Entrega estándar en 5 días hábiles" },
        { value: "sinprisa", label: "Sin prisa", subtext: "Podemos coordinar el mejor momento" },
      ],
    },
  ],
};

const calcEn: typeof calcEs = {
  backLink: "Back to Takya",
  eyebrow: "Calculator",
  title: "How much does a website cost?",
  subtitle: "Answer 7 quick questions and get an instant estimate.",
  stepLabel: (cur: number, total: number) => `Step ${cur} of ${total}`,
  back: "Back",
  next: "Next",
  seeResult: "See result",
  recommended: "Recommended plan",
  planLabel: (name: string) => `Plan ${name}`,
  priceNote: "USD · one-time payment · no hidden costs",
  maintenanceNote: (amt: number) => `+ $${amt}/month maintenance`,
  breakdown: "Breakdown",
  total: "Total",
  startCta: "Start my project →",
  recalculate: "← Calculate again",
  extraLabels: {
    copywriting: "AI Copywriting",
    gmb: "Google My Business setup",
    citas: "Appointment system (Calendly)",
    landing: "Ad landing page",
    analytics: "Monthly traffic reports",
    auditoria: "Existing website audit",
  },
  insights: {
    ecommerce:
      "For e-commerce in Latin America, integrating a reliable payment gateway is key. We handle the technical setup so you can focus on selling.",
    citas:
      "For appointment-based businesses (health, beauty, education), an embedded Calendly lets clients book themselves 24/7 — no messages to answer.",
    local:
      "With a physical location, an optimized Google My Business profile can triple local inquiries. 88% of local searches end in a purchase within 24 hours.",
    profesional:
      "A well-ranked website for independent professionals can generate 3–10 new inquiries per week without paying for ads.",
    default:
      "A technically optimized website generates new clients organically. Over 70% of searches in Latin America happen on mobile — your site will be perfect for that.",
  },
  steps: [
    {
      key: "objetivo" as const,
      type: "radio" as const,
      title: "What do you want to achieve with the website?",
      options: [
        { value: "conseguir-clientes", label: "Get more clients", subtext: "Generate calls, messages or inquiries from the web" },
        { value: "vender-online", label: "Sell products online", subtext: "Store with cart, payments and catalog" },
        { value: "agendar-citas", label: "Let clients book appointments", subtext: "Doctors, salons, tutors, coaches" },
        { value: "mostrar-trabajo", label: "Showcase my work / portfolio", subtext: "Professional image and credibility" },
      ],
    },
    {
      key: "negocio" as const,
      type: "radio" as const,
      title: "What type of business do you have?",
      options: [
        { value: "emprendimiento", label: "Personal venture", subtext: "Own business, personal brand or service" },
        { value: "empresa", label: "Company / Startup", subtext: "Team, B2B or B2C clients" },
        { value: "profesional", label: "Independent professional", subtext: "Doctor, lawyer, designer, coach, tutor" },
        { value: "ecommerce", label: "Store / E-commerce", subtext: "Physical or digital product sales" },
      ],
    },
    {
      key: "local" as const,
      type: "radio" as const,
      title: "Do you have a physical location or meet clients in person?",
      options: [
        { value: "si", label: "Yes, I have a location or meet in person", subtext: "Restaurant, clinic, store, office" },
        { value: "no", label: "No, I'm 100% online or go to the client", subtext: "Remote services, delivery, freelance" },
      ],
    },
    {
      key: "contenido" as const,
      type: "radio" as const,
      title: "Do you have copy and images ready?",
      options: [
        { value: "si", label: "Yes, I have logo, photos and text ready", subtext: "I just need you to design the website" },
        { value: "parcial", label: "I have some, but need help with copy", subtext: "AI copywriting included" },
        { value: "no", label: "Starting from scratch, I have nothing", subtext: "Text, structure and image suggestions" },
      ],
    },
    {
      key: "extras" as const,
      type: "checkbox" as const,
      title: "What else does your business need?",
      subtitle: "Select all that apply.",
      options: [
        { value: "gmb", label: "Google My Business", subtext: "Appear on Google Maps" },
        { value: "citas", label: "Online appointment system", subtext: "Automatic bookings (Calendly)" },
        { value: "analytics", label: "Monthly traffic reports", subtext: "Analytics + PDF summary" },
        { value: "landing", label: "Landing page for ads", subtext: "Meta Ads or Google Ads" },
        { value: "blog", label: "Blog or news section", subtext: "Updatable content" },
        { value: "auditoria", label: "Audit my current website", subtext: "If you already have a bad website" },
      ],
    },
    {
      key: "mantenimiento" as const,
      type: "radio" as const,
      title: "Do you want monthly maintenance?",
      options: [
        { value: "si", label: "Yes, I want to be worry-free — $49/month", subtext: "Updates, changes, direct WhatsApp support" },
        { value: "no", label: "Not right now", subtext: "One-time project only" },
      ],
    },
    {
      key: "urgencia" as const,
      type: "radio" as const,
      title: "When do you need the website?",
      options: [
        { value: "semana", label: "This week", subtext: "Top priority within 5 business days" },
        { value: "mes", label: "This month", subtext: "Standard delivery in 5 business days" },
        { value: "sinprisa", label: "No rush", subtext: "We can coordinate the best timing" },
      ],
    },
  ],
};

export const calcTranslations = { es: calcEs, en: calcEn } as const;
export type CalcT = typeof calcEs;

export const translations = { es, en } as const;
export type Translations = typeof es;
