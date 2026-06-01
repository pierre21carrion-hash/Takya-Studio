export const SITE_CONFIG = {
  name: "Takya",
  tagline: "Web profesional lista en 5 días desde $149",
  description:
    "Diseño web premium y automatización con IA para negocios latinoamericanos. Entrega en 5 días, 100% en español.",
  founder: "Pierre Carrion",
  role: "Fundador & Director Creativo",
  location: "Quito, Ecuador",
  phone: "+593 97 877 5471",
  email: "pierre21carrion@gmail.com",
  whatsapp: "https://wa.me/593978775471",
  whatsappNumber: "593978775471",
  hours: "Lun–Vie 9am–6pm (ECT)",
  url: "https://nixo-studio-next.vercel.app",
  year: 2026,
} as const;

export interface Plan {
  name: string;
  price: number;
  description: string;
  popular: boolean;
  features: { text: string; included: boolean }[];
  cta: string;
  whatsappMsg: string;
}

export const PLANS: Plan[] = [
  {
    name: "Inicio",
    price: 149,
    description: "Perfecta para iniciar la presencia digital de un negocio y generar confianza.",
    popular: false,
    features: [
      { text: "Web de hasta 5 secciones", included: true },
      { text: "Diseño responsivo", included: true },
      { text: "SEO básico optimizado", included: true },
      { text: "Dominio + hosting (1 año)", included: true },
      { text: "Entrega en 5 días", included: true },
      { text: "Chatbot con IA", included: false },
      { text: "Automatizaciones", included: false },
    ],
    cta: "Empezar con Inicio",
    whatsappMsg: "Hola Pierre, quiero el plan Inicio ($149)",
  },
  {
    name: "Escala",
    price: 299,
    description: "La opción más popular para negocios en crecimiento.",
    popular: true,
    features: [
      { text: "Todo lo del plan Inicio", included: true },
      { text: "Hasta 10 secciones + blog", included: true },
      { text: "Animaciones avanzadas", included: true },
      { text: "SEO avanzado", included: true },
      { text: "Chat en vivo básico", included: true },
      { text: "1 mes de mantenimiento gratis", included: true },
      { text: "Chatbot con IA", included: false },
    ],
    cta: "Empezar con Escala",
    whatsappMsg: "Hola Pierre, quiero el plan Escala ($299)",
  },
  {
    name: "Dominio",
    price: 499,
    description: "Para negocios que quieren automatizar sus ventas 24/7.",
    popular: false,
    features: [
      { text: "Todo lo del plan Escala", included: true },
      { text: "Chatbot IA entrenado", included: true },
      { text: "Respuestas automáticas WhatsApp", included: true },
      { text: "Flujos de automatización", included: true },
      { text: "Integración CRM", included: true },
      { text: "3 meses de mantenimiento gratis", included: true },
      { text: "Consultoría estratégica mensual", included: true },
    ],
    cta: "Empezar con Dominio",
    whatsappMsg: "Hola Pierre, quiero el plan Dominio ($499)",
  },
];

export const SERVICES = [
  {
    icon: "Browsers",
    title: "Páginas web profesionales",
    description:
      "Diseño moderno, responsivo y optimizado para SEO. El negocio luce premium desde el primer día.",
    features: [
      "Diseño personalizado a la marca",
      "Optimización SEO técnica",
      "Carga ultra-rápida (+95 PageSpeed)",
      "Formulario de contacto incluido",
      "Google Analytics configurado",
    ],
  },
  {
    icon: "Robot",
    title: "Automatización con IA",
    description:
      "Ahorra horas de trabajo manual. Automatizamos procesos repetitivos con inteligencia artificial.",
    features: [
      "Chatbots inteligentes 24/7",
      "Respuestas automáticas",
      "Integración WhatsApp Business",
      "Flujos de trabajo automatizados",
      "Reportes automáticos",
    ],
  },
  {
    icon: "Wrench",
    title: "Mantenimiento mensual",
    description:
      "La web siempre actualizada, segura y en perfecto estado. Nos encargamos de todo.",
    features: [
      "Actualizaciones de seguridad",
      "Backups semanales automáticos",
      "Soporte prioritario WhatsApp",
      "Cambios de contenido ilimitados",
      "Reportes de rendimiento mensuales",
    ],
  },
] as const;

export const PROCESS_STEPS = [
  {
    number: 1,
    title: "Hablamos",
    description: "Se agenda una llamada gratuita. Entendemos el negocio, sus metas y lo que necesita.",
    duration: "30 min",
    icon: "ChatCircle",
  },
  {
    number: 2,
    title: "Diseñamos",
    description: "Creamos el diseño personalizado. El cliente aprueba antes de continuar.",
    duration: "Días 1–2",
    icon: "PencilSimple",
  },
  {
    number: 3,
    title: "Ajustamos",
    description: "Revisamos juntos y hacemos los ajustes necesarios. Sin límite de revisiones.",
    duration: "Días 3–4",
    icon: "Wrench",
  },
  {
    number: 4,
    title: "Publicamos",
    description: "Lanzamiento con dominio, hosting y soporte post-lanzamiento incluido.",
    duration: "Día 5",
    icon: "RocketLaunch",
  },
] as const;

export const TECH_STACK = [
  "Next.js", "React", "TypeScript", "Tailwind CSS",
  "Vercel", "Framer Motion", "Node.js", "OpenAI",
] as const;

export const STATS = [
  { value: 98, suffix: "+", label: "PageSpeed Score" },
  { value: 99.9, suffix: "%", label: "Uptime garantizado" },
  { value: 5, suffix: " días", label: "Entrega promedio" },
  { value: 24, suffix: "/7", label: "Soporte WhatsApp" },
] as const;

export const FAQ_ITEMS = [
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
] as const;

export const AUDIT_ITEMS = [
  "Velocidad de carga y Core Web Vitals",
  "Optimización SEO y posicionamiento",
  "Experiencia móvil y responsividad",
  "Claridad del mensaje y conversión",
  "Seguridad y certificado SSL",
  "Integración con WhatsApp y analítica",
] as const;

export const TRUST_BADGES = [
  "Consulta gratis sin compromiso",
  "Sin contratos largos",
  "Resultados garantizados",
] as const;

export const PILLARS = [
  { icon: "Lightning", title: "Velocidad", description: "Entregamos en días, no en meses." },
  { icon: "Diamond", title: "Calidad", description: "Código limpio, diseño premium." },
  { icon: "Handshake", title: "Transparencia", description: "Sin costos ocultos, jamás." },
  { icon: "Globe", title: "En español", description: "Comunicación directa y clara." },
] as const;

export const NAV_LINKS = [
  { label: "Servicios", href: "/#servicios" },
  { label: "Proceso", href: "/#proceso" },
  { label: "Precios", href: "/#precios" },
  { label: "FAQ", href: "/#faq" },
] as const;

export interface PortfolioProject {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  url: string;
  status: string;
  featured: boolean;
  client: string;
  year: string;
  tags: string[];
  stats: { label: string; value: string }[];
  highlight: string;
  tech: string[];
  color: "blue" | "green" | "purple";
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "pueblos-magicos",
    title: "Pueblos Mágicos del Ecuador",
    shortTitle: "Pueblos Mágicos",
    description:
      "Plataforma editorial que documenta los 21 Pueblos Mágicos y 2 Rincones Mágicos del Ecuador. Explora destinos con valor cultural, histórico, arquitectónico y natural, certificados por el Ministerio de Turismo.",
    url: "https://pueblos-magicos-arquitectura.vercel.app/",
    status: "En desarrollo activo",
    featured: true,
    client: "Ministerio de Turismo del Ecuador",
    year: "2026",
    tags: ["Turismo", "Cultura", "Ecuador", "Patrimonio", "Editorial"],
    stats: [
      { label: "Pueblos documentados", value: "21" },
      { label: "Altitud media", value: "2,325 m" },
      { label: "Regiones", value: "4 mundos" },
    ],
    highlight: "21 Pueblos Mágicos · Ecuador · En desarrollo",
    tech: ["Next.js", "Mapbox", "Vercel"],
    color: "blue",
  },
  {
    id: "expo-turismo",
    title: "Expo Turismo Sostenible Ecuador 2026",
    shortTitle: "Expo Turismo 2026",
    description:
      "Plataforma oficial del encuentro nacional que impulsa un turismo más responsable y competitivo. Evento el 16 de julio 2026 en Quito — Plataforma Gubernamental Norte. Certificaciones internacionales, networking premium e innovación.",
    url: "https://expo-turismo-sostenible-2026.vercel.app/",
    status: "En desarrollo activo",
    featured: false,
    client: "Viceministerio de Turismo · Ecuador",
    year: "2026",
    tags: ["Eventos", "Sostenibilidad", "Turismo", "Ecuador", "Gobierno"],
    stats: [
      { label: "Fecha del evento", value: "16 Jul" },
      { label: "Ciudad", value: "Quito" },
      { label: "Entrada", value: "Gratuita" },
    ],
    highlight: "Viceministerio de Turismo del Ecuador · 16 de Julio 2026",
    tech: ["React", "Tailwind", "Vercel"],
    color: "green",
  },
  {
    id: "llano-grande",
    title: "Ruta Turística Llano Grande",
    shortTitle: "Llano Grande",
    description:
      "Plataforma de turismo vivencial del pueblo Kitu Kara en Llano Grande, Calderón, Quito.",
    url: "https://llano-grande.vercel.app",
    status: "En desarrollo activo",
    featured: false,
    client: "Comunidad Kitu Kara · Llano Grande",
    year: "2026",
    tags: ["Turismo", "Cultura", "Ecuador"],
    stats: [
      { label: "Comunidad", value: "Kitu Kara" },
      { label: "Parroquia", value: "Calderón" },
      { label: "Turismo", value: "Vivencial" },
    ],
    highlight: "Turismo vivencial · Pueblo Kitu Kara · Calderón, Quito",
    tech: ["Next.js", "Tailwind", "Vercel"],
    color: "green",
  },
];
