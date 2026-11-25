import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Number that counts from 0 to `to` the first time it scrolls into view. */
export default function CountUp({ to, suffix = "", duration = 1.6 }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { v: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        v: to,
        duration,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = Math.round(obj.v).toLocaleString("en-IN") + suffix;
        },
      });
    }, el);
    return () => ctx.revert();
  }, [to, suffix, duration]);

  return (
    <span ref={ref}>
      {0}
      {suffix}
    </span>
  );
}
