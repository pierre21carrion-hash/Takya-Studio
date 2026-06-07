import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import Script from "next/script";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/constants";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const title = `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title,
  description: SITE_CONFIG.description,
  keywords: ["diseño web", "páginas web", "Ecuador", "LATAM", "automatización IA", "web profesional"],
  authors: [{ name: SITE_CONFIG.founder }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_EC",
    siteName: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    title,
    description: SITE_CONFIG.description,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: SITE_CONFIG.description,
    images: ["/og-image.png"],
  },
  icons: { icon: "/favicon.svg" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
  url: SITE_CONFIG.url,
  image: `${SITE_CONFIG.url}/og-image.png`,
  telephone: SITE_CONFIG.phone,
  email: SITE_CONFIG.email,
  priceRange: "$149 - $349",
  founder: [
    { "@type": "Person", name: "José Chugchilán" },
    { "@type": "Person", name: "Pierre Carrion" },
  ],
  address: { "@type": "PostalAddress", addressLocality: "Quito", addressCountry: "EC" },
  areaServed: { "@type": "Place", name: "Latinoamérica" },
  sameAs: [SITE_CONFIG.whatsapp],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="flex min-h-[100dvh] flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MotionConfig reducedMotion="user">
          <GrainOverlay />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </MotionConfig>
        {/* Tidio live chat — lazy so it never blocks initial render / PageSpeed */}
        <Script
          src="//code.tidio.co/msov437drlxoxykds6imiilxkd6eegzq.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
