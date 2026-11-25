import React, { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Custom cursor (dot + ring). Only used on devices with a real mouse.
 * While mounted it adds "has-custom-cursor" to <body>, which hides the native cursor (see index.css).
 */
export default function FluidCursor() {
  const dotRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const circle = circleRef.current;
    if (!dot || !circle) return;

    // touch phones/tablets: no custom cursor
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      dot.style.display = "none";
      circle.style.display = "none";
      return;
    }

    document.body.classList.add("has-custom-cursor");
    gsap.set([dot, circle], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });
    const ringX = gsap.quickTo(circle, "x", { duration: 0.5, ease: "power2.out" });
    const ringY = gsap.quickTo(circle, "y", { duration: 0.5, ease: "power2.out" });

    const onMove = (e) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const isInteractive = (el) => el && el.closest && el.closest("a, button, input, textarea, canvas, .cursor-pointer");
    const onOver = (e) => {
      if (isInteractive(e.target)) gsap.to(circle, { scale: 1.6, duration: 0.25, overwrite: "auto" });
    };
    const onOut = (e) => {
      if (isInteractive(e.target)) gsap.to(circle, { scale: 1, duration: 0.25, overwrite: "auto" });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div
        ref={circleRef}
        className="pointer-events-none fixed top-0 left-0 w-8 h-8 z-[10001] rounded-full border-2 border-[#4fe3ff] mix-blend-screen"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 w-2 h-2 z-[10001] rounded-full bg-[#4fe3ff] mix-blend-screen"
      />
    </>
  );
}
