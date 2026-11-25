import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedHeader({ text1 = "", highlight = "", className = "" }) {
  const headerRef = useRef(null);
  
  // Combine strings for splitting
  const fullText = text1 + highlight;
  const chars = fullText.split("");
  const half = Math.floor(chars.length / 2);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        }
      });

      // Left half staggering forward
      tl.from(".char-a", {
        y: 150, 
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "back.out(1.7)"
      }, 0)
      // Right half staggering backward
      .from(".char-b", {
        y: 150,
        opacity: 0,
        duration: 0.8,
        stagger: -0.05,
        ease: "back.out(1.7)"
      }, 0);
      
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={headerRef} className={`overflow-hidden flex justify-center pb-4 ${className}`}>
      <h2 className="text-5xl font-extrabold tracking-wide flex flex-wrap justify-center">
        {chars.map((char, idx) => {
          const isHighlight = idx >= text1.length;
          const splitClass = idx < half ? 'char-a' : 'char-b';
          const colorClass = isHighlight ? 'text-[#4fe3ff]' : 'text-white';
          
          return (
            <span 
              key={idx} 
              className={`inline-block ${splitClass} ${colorClass}`}
              style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
            >
              {char}
            </span>
          );
        })}
      </h2>
    </div>
  );
}
