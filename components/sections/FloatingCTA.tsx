"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsappLogo } from "@phosphor-icons/react";
import { whatsappUrl } from "@/lib/utils";
import { useLang } from "@/lib/LanguageContext";

export function FloatingCTA() {
  const [showTip, setShowTip] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const timer = setTimeout(() => setShowTip(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const href = whatsappUrl("Hola Pierre, quiero mi web");

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3">
      <AnimatePresence>
        {showTip && (
          <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="glass hidden rounded-full px-4 py-2.5 text-sm font-medium text-foreground sm:block"
          >
            {t.floatingCta.tip}
          </motion.a>
        )}
      </AnimatePresence>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.floatingCta.ariaLabel}
        className="animate-ctapulse flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_10px_30px_var(--shadow-accent)] transition-colors hover:bg-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <WhatsappLogo size={26} weight="fill" />
      </a>
    </div>
  );
}
