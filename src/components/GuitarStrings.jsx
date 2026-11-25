import React, { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * ONE elastic string.
 * Bring the cursor near it and it bends toward you; move away (or leave) and it
 * snaps back and wobbles like a real string.
 *
 * Things you can tweak (all at the top):
 */
const W = 1000; // drawing width (the SVG scales to the screen, so leave it)
const H = 140; // height in px
const MID = H / 2; // y of the resting string
const NEAR = 80; // how close (px) the cursor must be before the string reacts
const PULL = 1.0; // 0.5 = lazy pull, 1 = follows cursor fully, 1.5 = exaggerated
const COLOR = "#4fe3ff";
const THICKNESS = 3;
const WOBBLE = "elastic.out(1.1, 0.2)"; // (amplitude, period) - smaller 2nd number = more wobble
const WOBBLE_TIME = 1.6; // seconds the wobble lasts

export default function GuitarStrings() {
  const wrapRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const path = pathRef.current;
    if (!wrap || !path) return;

    // control point of the curve - this is the only thing we animate
    const ctrl = { x: W / 2, y: MID };
    const render = () => path.setAttribute("d", `M 0 ${MID} Q ${ctrl.x} ${ctrl.y} ${W} ${MID}`);

    let pulled = false;

    const release = () => {
      if (!pulled) return;
      pulled = false;
      gsap.to(ctrl, {
        x: W / 2,
        y: MID,
        duration: WOBBLE_TIME,
        ease: WOBBLE,
        overwrite: true,
        onUpdate: render,
      });
    };

    const onMove = (e) => {
      const r = wrap.getBoundingClientRect();
      const dy = e.clientY - (r.top + r.height / 2); // distance from string, in px
      const inside = e.clientX >= r.left && e.clientX <= r.right;

      if (!inside || Math.abs(dy) > NEAR) {
        release();
        return;
      }

      pulled = true;
      const x = ((e.clientX - r.left) / r.width) * W;
      // a quadratic curve only reaches half-way to its control point, so double the offset
      const y = MID + dy * 2 * PULL;
      gsap.to(ctrl, { x, y, duration: 0.25, ease: "power3.out", overwrite: true, onUpdate: render });
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointercancel", release);
    document.addEventListener("mouseleave", release);
    render();

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointercancel", release);
      document.removeEventListener("mouseleave", release);
      gsap.killTweensOf(ctrl);
    };
  }, []);

  return (
    <section id="strings" className="relative z-10 bg-[#06142a] py-6">
      <div ref={wrapRef} className="max-w-6xl mx-auto px-6">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="block w-full"
          style={{ height: H, overflow: "visible", touchAction: "pan-y" }}
          aria-hidden="true"
        >
          <path
            ref={pathRef}
            d={`M 0 ${MID} Q ${W / 2} ${MID} ${W} ${MID}`}
            fill="none"
            stroke={COLOR}
            strokeWidth={THICKNESS}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{ filter: `drop-shadow(0 0 6px ${COLOR})` }}
          />
        </svg>
      </div>
    </section>
  );
}