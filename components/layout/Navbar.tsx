"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, X, Sparkle } from "@phosphor-icons/react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { whatsappUrl } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/LanguageContext";

function LangToggle() {
  const { lang, toggleLang } = useLang();
  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label="Switch language / Cambiar idioma"
      className="flex items-center gap-1 rounded-full border border-border px-2.5 py-1.5 text-xs font-medium transition-colors hover:border-foreground/30"
    >
      <span className={lang === "es" ? "text-foreground" : "text-muted"}>ES</span>
      <span className="text-border">·</span>
      <span className={lang === "en" ? "text-foreground" : "text-muted"}>EN</span>
    </button>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-9 z-50 px-4 pt-3 md:pt-4"
    >
      <nav
        className={cn(
          "glass nav-glass mx-auto flex max-w-5xl items-center justify-between rounded-full px-4 transition-all duration-300 ease-out md:px-6",
          scrolled ? "py-2" : "py-3",
        )}
      >
        <a href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <Sparkle size={22} weight="fill" className="text-accent" />
          <span>{SITE_CONFIG.name}</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {t.nav.links.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="text-sm font-medium text-muted transition-colors hover:text-foreground"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LangToggle />
          <Link
            href="/login"
            className="hidden items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-foreground/30 hover:text-foreground sm:inline-flex"
          >
            <span className="text-xs opacity-60">⬡</span>
            Iniciar sesión
          </Link>
          <a
            href={whatsappUrl("Hola Pierre, quiero mi web")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-dark sm:inline-block"
          >
            {t.nav.cta}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t.nav.close : t.nav.open}
            className="rounded-full border border-border p-2 text-foreground md:hidden"
          >
            {open ? <X size={18} /> : <List size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass mx-auto mt-2 flex max-w-5xl flex-col gap-1 rounded-3xl p-4 md:hidden"
          >
            {t.nav.links.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent-muted"
              >
                {label}
              </a>
            ))}
            <a
              href={whatsappUrl("Hola Pierre, quiero mi web")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-full bg-accent px-5 py-3 text-center text-sm font-medium text-white"
            >
              {t.nav.ctaMobile}
            </a>
            <div className="border-t border-border/40 mt-2 pt-2">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium text-muted transition-colors hover:bg-accent-muted"
              >
                <span className="text-xs opacity-60">⬡</span>
                Iniciar sesión
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
