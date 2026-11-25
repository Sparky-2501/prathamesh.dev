import { useEffect, useRef } from "react";
import gsap from "gsap";
import logo from "../assets/logo.png";

/**
 * Loader: terminal "boot sequence" + 0-100 counter, then a two-panel curtain opens.
 *
 *  onReveal   -> called when the curtain starts opening (App mounts the page behind it)
 *  onComplete -> called when the loader is fully gone (App unmounts it)
 *
 * Edit BOOT_LINES to change the text. Edit DURATION to make the counter faster/slower.
 */
const BOOT_LINES = [
  "> booting prathamesh.dev",
  "> loading MERN stack ............ ok",
  "> loading AI / ML modules ....... ok",
];
const DURATION = 2.8; // seconds for the counter to reach 100

export default function Intro({ onReveal, onComplete }) {
  const rootRef = useRef(null);
  const contentRef = useRef(null);
  const counterRef = useRef(null);
  const barRef = useRef(null);
  const lineRefs = useRef([]);
  const cbRef = useRef({ onReveal, onComplete });
  cbRef.current = { onReveal, onComplete };

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // lock scroll while loading

    const ctx = gsap.context(() => {
      const counter = { v: 0 };
      const typers = BOOT_LINES.map((text) => ({ text, n: 0 }));

      const tl = gsap.timeline();

      tl.fromTo(
        ".intro-logo",
        { opacity: 0, scale: 0.6 },
        { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.6)" },
        0
      );

      // counter + progress bar
      tl.to(
        counter,
        {
          v: 100,
          duration: DURATION,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
            }
          },
        },
        0.2
      );
      tl.fromTo(
        barRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: DURATION, ease: "power2.inOut" },
        0.2
      );

      // typewriter lines
      typers.forEach((t, i) => {
        tl.to(
          t,
          {
            n: t.text.length,
            duration: 0.6,
            ease: "none",
            onUpdate: () => {
              const el = lineRefs.current[i];
              if (el) el.textContent = t.text.slice(0, Math.round(t.n));
            },
          },
          0.3 + i * 0.8
        );
      });

      // content leaves, curtain opens
      tl.to(contentRef.current, { opacity: 0, y: -20, duration: 0.4, ease: "power2.in" }, DURATION + 0.4);
      tl.add(() => cbRef.current.onReveal?.(), DURATION + 0.7);
      tl.to(".intro-curtain-top", { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, DURATION + 0.7);
      tl.to(".intro-curtain-bottom", { yPercent: 100, duration: 0.9, ease: "power4.inOut" }, DURATION + 0.7);
      tl.add(() => cbRef.current.onComplete?.());
    }, rootRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const skip = () => {
    // jump straight to the end
    cbRef.current.onReveal?.();
    cbRef.current.onComplete?.();
  };

  return (
    <div ref={rootRef} className="fixed inset-0 z-[9999]" aria-hidden="true">
      <div className="intro-curtain-top absolute inset-x-0 top-0 h-1/2 bg-[#020817]" />
      <div className="intro-curtain-bottom absolute inset-x-0 bottom-0 h-1/2 bg-[#020817]" />

      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 font-mono"
      >
        <img src={logo} alt="" className="intro-logo w-16 h-16 object-contain mb-8 drop-shadow-[0_0_14px_#4fe3ff]" />

        <div className="w-full max-w-md text-sm sm:text-base text-[#4fe3ff]/80 min-h-[4.5rem] space-y-1">
          {BOOT_LINES.map((_, i) => (
            <div key={i} ref={(el) => (lineRefs.current[i] = el)} className="whitespace-pre h-6" />
          ))}
        </div>

        <div className="mt-8 flex items-end gap-2 text-white">
          <span ref={counterRef} className="text-7xl sm:text-8xl font-bold tabular-nums leading-none">
            000
          </span>
          <span className="text-2xl text-[#4fe3ff] pb-2">%</span>
        </div>

        <div className="mt-6 w-full max-w-md h-[2px] bg-white/10 overflow-hidden">
          <div ref={barRef} className="h-full w-full origin-left bg-[#4fe3ff]" />
        </div>
      </div>

      <button
        type="button"
        onClick={skip}
        className="absolute bottom-6 right-6 font-mono text-xs text-white/40 hover:text-[#4fe3ff] transition-colors"
      >
        skip &rarr;
      </button>
    </div>
  );
}
