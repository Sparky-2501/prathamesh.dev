import React, { useEffect, useRef } from "react";

/**
 * Hero background = soft moving aurora + dotted grid + a spotlight that follows the cursor.
 * All the visuals live in src/index.css (.hero-aurora, .aurora-blob--N, .hero-grid, .hero-spotlight).
 * It's pure CSS (no WebGL), so it stays smooth on a laptop and on a phone.
 */
export default function HeroBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const section = el.parentElement;
    let raf = 0;

    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = section.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    };

    section.addEventListener("pointermove", onMove);
    return () => {
      section.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="hero-aurora" aria-hidden="true">
      <div className="aurora-blob aurora-blob--1" />
      <div className="aurora-blob aurora-blob--2" />
      <div className="aurora-blob aurora-blob--3" />
      <div className="hero-grid" />
      <div className="hero-spotlight" />
      {/* fade into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#030b1a]" />
    </div>
  );
}
