import React, { useState, useEffect, useCallback } from "react";
import Lottie from "lottie-react";
import { FiChevronLeft, FiChevronRight, FiMaximize2, FiX, FiZoomIn, FiZoomOut, FiExternalLink, FiShield } from "react-icons/fi";
import AnimatedHeader from "./AnimatedHeader";
import ProtectedCert from "./ProtectedCert";
import codingBoy from "../assets/codingBoy.json";
import { certificates } from "../data/certificates";

/**
 * Deterrents against copying certificates (a website cannot fully block OS screenshots/recording):
 *  1. drawn on <canvas> with a baked-in watermark  (see ProtectedCert.jsx)
 *  2. right-click / drag / select / Ctrl+S / Ctrl+P blocked, hidden when printing
 *  3. content is blurred whenever the window loses focus (snipping tools, screen recorders,
 *     alt-tab) or the PrintScreen key is pressed, and the clipboard is cleared
 */
function useCertGuard(active) {
  const [blurred, setBlurred] = useState(false);

  useEffect(() => {
    if (!active) return;

    const hide = () => setBlurred(true);
    const show = () => {
      if (document.hasFocus() && !document.hidden) setBlurred(false);
    };

    const onKeyDown = (e) => {
      const k = e.key.toLowerCase();
      if ((e.ctrlKey || e.metaKey) && (k === "s" || k === "p" || k === "u")) e.preventDefault();
      // macOS screenshot shortcuts (Cmd+Shift+3/4/5)
      if (e.metaKey && e.shiftKey && ["3", "4", "5"].includes(k)) hide();
    };

    const onKeyUp = (e) => {
      if (e.key === "PrintScreen") {
        hide();
        navigator.clipboard?.writeText("Screenshots of certificates are disabled.").catch(() => {});
      }
    };

    const onVisibility = () => (document.hidden ? hide() : show());

    window.addEventListener("blur", hide);
    window.addEventListener("focus", show);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("blur", hide);
      window.removeEventListener("focus", show);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [active]);

  return blurred;
}

function ProtectedOverlay({ show }) {
  if (!show) return null;
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/80 text-sm pointer-events-none">
      <FiShield className="text-2xl text-[#4fe3ff]" />
      Protected - click here to resume
    </div>
  );
}

export default function Certificates() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const blurred = useCertGuard(true);

  const count = certificates.length;
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i === 0 ? count - 1 : i - 1)), [count]);
  const close = useCallback(() => {
    setOpen(false);
    setZoomed(false);
  }, []);

  const current = certificates[index];

  // lightbox: Esc / arrows + lock page scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, next, prev]);

  return (
    <section id="certificates" className="premium-section text-white bg-[#06142a] overflow-hidden">
      <AnimatedHeader text1="Certificates & " highlight="Achievements" className="mb-12" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-[30%,70%] gap-10 items-center relative z-10">
        {/* animation */}
        <div className="hidden lg:flex justify-center">
          <Lottie animationData={codingBoy} loop className="w-[340px] h-[340px]" />
        </div>

        {/* viewer card */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-5 md:p-8 shadow-2xl">
          {/* certificate preview: fixed aspect ratio so every certificate sits in the same frame */}
          <div className="relative w-full aspect-[16/10] rounded-xl bg-[#030b1a] border border-white/10 flex items-center justify-center overflow-hidden group">
            <ProtectedCert
              key={current.title}
              src={current.image}
              alt={current.title}
              blurred={blurred}
              onClick={() => setOpen(true)}
              className="w-full h-full object-contain cursor-zoom-in"
            />
            <ProtectedOverlay show={blurred} />
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="absolute bottom-3 right-3 flex items-center gap-2 rounded-lg bg-black/60 px-3 py-2 text-xs text-white/90 opacity-80 group-hover:opacity-100 hover:bg-[#4fe3ff] hover:text-black transition"
            >
              <FiMaximize2 /> View full size
            </button>
          </div>

          {/* details */}
          <div className="mt-6 grid md:grid-cols-[1fr,auto] gap-6 items-start">
            <div>
              <h3 className="text-xl md:text-2xl font-bold leading-snug">{current.title}</h3>
              <p className="text-[#4fe3ff] text-sm mt-1 font-medium">{current.platform}</p>
              <p className="text-white/40 text-xs mt-1">Issued {current.date}</p>
              <p className="text-white/60 text-sm mt-3 leading-relaxed">{current.description}</p>
              {current.verifyUrl && (
                <a
                  href={current.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-sm text-[#4fe3ff] hover:underline"
                >
                  Verify credential <FiExternalLink />
                </a>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button onClick={prev} aria-label="Previous certificate" className="p-3 bg-white/10 rounded-lg hover:bg-[#4fe3ff] hover:text-black transition">
                <FiChevronLeft size={22} />
              </button>
              <span className="text-xs text-white/50 tabular-nums w-10 text-center">
                {index + 1} / {count}
              </span>
              <button onClick={next} aria-label="Next certificate" className="p-3 bg-white/10 rounded-lg hover:bg-[#4fe3ff] hover:text-black transition">
                <FiChevronRight size={22} />
              </button>
            </div>
          </div>

          {/* dots */}
          <div className="flex gap-3 mt-6">
            {certificates.map((c, i) => (
              <button
                key={c.title}
                onClick={() => setIndex(i)}
                aria-label={`Show certificate ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-8 bg-[#4fe3ff] shadow-[0_0_10px_#4fe3ff]" : "w-2.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* LIGHTBOX */}
      {open && (
        <div className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-sm flex flex-col" role="dialog" aria-modal="true" aria-label={current.title}>
          <div className="flex items-center justify-between gap-4 px-4 py-3 text-white">
            <div className="min-w-0">
              <div className="font-semibold truncate">{current.title}</div>
              <div className="text-xs text-white/50">{current.platform} • {current.date}</div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => setZoomed((z) => !z)} className="p-2.5 rounded-lg bg-white/10 hover:bg-[#4fe3ff] hover:text-black transition" aria-label={zoomed ? "Zoom out" : "Zoom in"}>
                {zoomed ? <FiZoomOut size={20} /> : <FiZoomIn size={20} />}
              </button>
              <button onClick={close} className="p-2.5 rounded-lg bg-white/10 hover:bg-red-500 transition" aria-label="Close">
                <FiX size={20} />
              </button>
            </div>
          </div>

          <div className="relative flex-1 min-h-0 flex items-center justify-center" onClick={(e) => e.target === e.currentTarget && close()}>
            <button onClick={prev} aria-label="Previous certificate" className="absolute left-2 md:left-6 z-10 p-3 rounded-full bg-white/10 hover:bg-[#4fe3ff] hover:text-black text-white transition">
              <FiChevronLeft size={24} />
            </button>

            <div className={`w-full h-full px-14 md:px-24 ${zoomed ? "overflow-auto" : "overflow-hidden"}`}>
              <ProtectedCert
                key={`lb-${current.title}`}
                src={current.image}
                alt={current.title}
                blurred={blurred}
                onClick={() => setZoomed((z) => !z)}
                className={zoomed ? "cursor-zoom-out mx-auto h-auto" : "cursor-zoom-in w-full h-full object-contain"}
                style={zoomed ? { width: "min(220%, 2200px)", maxWidth: "none" } : undefined}
              />
            </div>
            <ProtectedOverlay show={blurred} />

            <button onClick={next} aria-label="Next certificate" className="absolute right-2 md:right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-[#4fe3ff] hover:text-black text-white transition">
              <FiChevronRight size={24} />
            </button>
          </div>

          <div className="py-3 text-center text-xs text-white/40">Click the certificate to zoom • ← → to switch • Esc to close</div>
        </div>
      )}
    </section>
  );
}
