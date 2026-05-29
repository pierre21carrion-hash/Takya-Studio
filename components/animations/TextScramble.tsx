"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%&";

interface TextScrambleProps {
  text: string;
  className?: string;
  /** ms before a character locks into place, scaled by its index. */
  speed?: number;
}

/**
 * Matrix-style decode: each character resolves left-to-right from random
 * glyphs to the final text. Respects reduced motion (renders final text).
 */
export function TextScramble({ text, className, speed = 32 }: TextScrambleProps) {
  const [output, setOutput] = useState(text);
  const frame = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOutput(text);
      return;
    }

    let raf = 0;
    let start: number | null = null;

    const tick = (now: number) => {
      if (start === null) start = now;
      const elapsed = now - start;
      const revealed = Math.floor(elapsed / speed);

      const next = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < revealed) return char;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");

      setOutput(next);
      frame.current += 1;

      if (revealed <= text.length) {
        raf = requestAnimationFrame(tick);
      } else {
        setOutput(text);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, speed]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{output}</span>
    </span>
  );
}
