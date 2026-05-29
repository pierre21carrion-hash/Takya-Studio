"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsappLogo } from "@phosphor-icons/react";
import { whatsappUrl } from "@/lib/utils";

export function FloatingCTA() {
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowTip(true), 5000);
    return () => clearTimeout(t);
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
            initial={{ opacity: 0, x: 12, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 12, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="glass hidden rounded-full px-4 py-2.5 text-sm font-medium text-foreground sm:block"
          >
            ¿Hablamos? Respondo en menos de 1h
          </motion.a>
        )}
      </AnimatePresence>

      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_10px_30px_var(--shadow-accent)]"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
      >
        <WhatsappLogo size={26} weight="fill" />
      </motion.a>
    </div>
  );
}
