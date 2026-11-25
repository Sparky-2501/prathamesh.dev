import React, { useLayoutEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Paragraph whose words light up one by one as you SCROLL (scrubbed, so it follows your scroll
 * speed and reverses when you scroll back up).
 *
 * <ScrollRevealText text="..." className="text-lg" />
 *
 * Tweak:  start / end   -> where on the screen the reveal begins and ends
 *         dim           -> how dark the unread words are (0 = invisible, 1 = fully visible)
 */
export default function ScrollRevealText({
  text,
  className = "",
  as: Tag = "p",
  start = "top 85%",
  end = "bottom 50%",
  dim = 0.16,
}) {
  const ref = useRef(null);
  const words = useMemo(() => text.split(" "), [text]);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const spans = el.querySelectorAll(".srt-word");
      if (reduce) {
        gsap.set(spans, { opacity: 1 });
        return;
      }
      gsap.fromTo(
        spans,
        { opacity: dim },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.12,
          scrollTrigger: { trigger: el, start, end, scrub: 0.6 },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [text, start, end, dim]);

  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} className="srt-word inline-block" style={{ opacity: dim }}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
