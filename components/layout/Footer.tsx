"use client";

import Link from "next/link";
import { Sparkle, WhatsappLogo, EnvelopeSimple } from "@phosphor-icons/react";
import { SITE_CONFIG } from "@/lib/constants";
import { whatsappUrl } from "@/lib/utils";
import { useLang } from "@/lib/LanguageContext";

export function Footer() {
  const { t } = useLang();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 py-16 md:grid-cols-[1.5fr_1fr_1fr] lg:px-10">
        <div>
          <div className="flex items-center gap-2 font-bold tracking-tight">
            <Sparkle size={22} weight="fill" className="text-accent" />
            {SITE_CONFIG.name}
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            {SITE_CONFIG.description}
          </p>
        </div>

        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {t.footer.navLabel}
          </p>
          <ul className="flex flex-col gap-2.5">
            {t.nav.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-muted transition-colors hover:text-accent-dark">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {t.footer.contactLabel}
          </p>
          <ul className="flex flex-col gap-2.5 text-sm text-muted">
            <li>
              <a href={whatsappUrl("Hola Pierre")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:text-accent-dark">
                <WhatsappLogo size={16} weight="duotone" /> {SITE_CONFIG.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-2 transition-colors hover:text-accent-dark">
                <EnvelopeSimple size={16} weight="duotone" /> {SITE_CONFIG.email}
              </a>
            </li>
            <li className="text-muted-foreground">{SITE_CONFIG.location}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 lg:px-10">
          <p className="text-xs text-muted-foreground">
            © {SITE_CONFIG.year} {SITE_CONFIG.name}. {t.footer.madeIn} {SITE_CONFIG.location}.
          </p>
          <Link
            href="/login"
            className="text-xs text-muted-foreground transition-colors hover:text-muted"
          >
            Acceso equipo →
          </Link>
        </div>
      </div>
    </footer>
  );
}
