export const SITE_CONFIG = {
  name: "Nixo Studio",
  tagline: "Tu web profesional lista en 5 días desde $149",
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
    description: "Perfecta para comenzar tu presencia digital y generar confianza.",
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
      "Diseño moderno, responsivo y optimizado para SEO. Tu negocio luce premium desde el primer día.",
    features: [
      "Diseño personalizado a tu marca",
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
      "Tu web siempre actualizada, segura y en perfecto estado. Nos encargamos de todo.",
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
    description: "Agenda una llamada gratuita. Entendemos tu negocio, tus metas y qué necesitas.",
    duration: "30 min",
    icon: "ChatCircle",
  },
  {
    number: 2,
    title: "Diseñamos",
    description: "Creamos el diseño personalizado. Tú apruebas antes de continuar.",
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
      "Entregamos tu web en 5 días hábiles desde que apruebas el diseño inicial. Si necesitas cambios, los hacemos sin costo extra y sin límite de revisiones.",
  },
  {
    question: "¿Qué pasa si no me gusta el diseño?",
    answer:
      "Nada avanza sin tu aprobación. Hacemos las revisiones que necesites hasta que estés completamente satisfecho.",
  },
  {
    question: "¿Necesito saber de tecnología?",
    answer:
      "Para nada. Nos encargamos de todo lo técnico: dominio, hosting, configuración y seguridad. Tú solo nos dices qué necesita tu negocio.",
  },
  {
    question: "¿Qué incluye el mantenimiento mensual?",
    answer:
      "Actualizaciones de seguridad, backups semanales, cambios de contenido ilimitados, soporte prioritario por WhatsApp y reportes de rendimiento mensuales.",
  },
  {
    question: "¿Trabajan solo con negocios en Ecuador?",
    answer:
      "No, trabajamos con negocios de toda Latinoamérica. La comunicación es 100% en español y nos adaptamos a tu zona horaria.",
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
  { label: "Servicios", href: "#servicios" },
  { label: "Proceso", href: "#proceso" },
  { label: "Precios", href: "#precios" },
  { label: "FAQ", href: "#faq" },
] as const;

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string;
  status: string;
  featured: boolean;
  tags: string[];
  color: "amber" | "orange";
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "pueblos-magicos",
    title: "Pueblos Mágicos — Arquitectura",
    description:
      "Plataforma de exploración de pueblos mágicos mexicanos con enfoque en arquitectura colonial y sostenibilidad.",
    url: "https://pueblos-magicos-arquitectura.vercel.app/",
    image: "https://picsum.photos/seed/pueblos-magicos/1200/600",
    status: "En desarrollo",
    featured: true,
    tags: ["Turismo", "Arquitectura", "México", "Sostenibilidad"],
    color: "amber",
  },
  {
    id: "expo-turismo",
    title: "Expo Turismo Sostenible 2026",
    description:
      "Plataforma interactiva para exposición internacional de turismo sostenible con agenda de eventos.",
    url: "https://expo-turismo-sostenible-2026.vercel.app/",
    image: "https://picsum.photos/seed/expo-turismo/1200/600",
    status: "En desarrollo",
    featured: false,
    tags: ["Turismo", "Sostenibilidad", "Eventos", "Web3"],
    color: "orange",
  },
  {
    id: "meteor-nights",
    title: "Meteor Nights — Experiencia Nocturna",
    description:
      "Aplicación inmersiva para observación de meteoros con realidad aumentada y datos astronómicos en tiempo real.",
    url: "https://meteor-nights-final.vercel.app/",
    image: "https://picsum.photos/seed/meteor-nights/1200/600",
    status: "En desarrollo",
    featured: false,
    tags: ["Astronomía", "AR", "Experiencia", "Educación"],
    color: "orange",
  },
];
