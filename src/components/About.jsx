import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiCode, FiCpu, FiDatabase, FiAward } from "react-icons/fi";
import AnimatedHeader from "./AnimatedHeader";
import ScrollRevealText from "./ScrollRevealText";
import profile from "../assets/profile.jpg";
import logo from "../assets/logo.png";
import "./flip.css";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

const fade = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const MARQUEE = [
  "Building intelligent full-stack applications powered by AI.",
  "MERN Stack developer exploring Machine Learning & LLMs.",
  "Engineering scalable web apps with intelligent AI systems.",
  "Combining full-stack development with modern AI technologies.",
];

const PILLS = [
  { icon: FiCode, title: "Full Stack Web Development", sub: "MERN Stack • JavaScript • React.js • Next.js" },
  { icon: FiCpu, title: "Artificial Intelligence", sub: "Machine Learning • Deep Learning" },
  { icon: FiDatabase, title: "Large Language Models", sub: "Ollama • Hugging Face" },
  { icon: FiAward, title: "DSA & Problem Solving", sub: "C++ • Algorithms • Logic Building" },
];

export default function About() {
  const [flipped, setFlipped] = useState(false);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  // photo slides in from left, text from right (scrubbed with scroll)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: containerRef.current, start: "top 80%", end: "top 35%", scrub: 1 };
      gsap.fromTo(imageRef.current, { x: -100, opacity: 0 }, { x: 0, opacity: 1, ease: "none", scrollTrigger: st });
      gsap.fromTo(textRef.current, { x: 100, opacity: 0 }, { x: 0, opacity: 1, ease: "none", scrollTrigger: st });

      // marquee that reverses direction with the scroll direction
      const marquee = gsap.to(".marquee-content", { xPercent: -50, ease: "none", duration: 25, repeat: -1 });
      const onWheel = (e) => {
        if (e.deltaY === 0) return;
        gsap.to(marquee, { timeScale: e.deltaY > 0 ? 1 : -1, duration: 0.5, overwrite: true });
      };
      window.addEventListener("wheel", onWheel, { passive: true });
      return () => window.removeEventListener("wheel", onWheel);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="premium-section bg-[#030b1a] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <AnimatedHeader text1="About " highlight="Me" className="mb-14" />

        <div ref={containerRef} className="grid md:grid-cols-2 gap-14 items-start mb-16">
          {/* Flip card */}
          <div ref={imageRef} className="flex justify-center">
            <div
              className={`flip-card w-full max-w-[380px] ${flipped ? "is-flipped" : ""}`}
              onClick={() => setFlipped(!flipped)}
            >
              <div className="flip-inner">
                <div className="flip-front">
                  <img
                    src={profile}
                    alt="Prathamesh Shelke"
                    className="w-full h-[420px] object-cover rounded-xl border border-white/10"
                  />
                </div>
                <div className="flip-back">
                  <img src={logo} alt="logo" className="w-full h-full object-contain brightness-110" />
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div ref={textRef} className="space-y-6">
            <motion.h3
              variants={fade}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-3xl font-bold text-white"
            >
              Hello! I'm <span className="text-[#4fe3ff]">Prathamesh</span>
            </motion.h3>

            <ScrollRevealText
              className="leading-relaxed text-lg text-white"
              text="I'm a third-year Computer Engineering student specializing in Artificial Intelligence. Alongside academics, I actively focus on full-stack development, data structures & algorithms, and AI technologies. I enjoy building scalable MERN stack applications, experimenting with AI concepts, and solving real-world problems through technology."
            />

            <ScrollRevealText
              className="leading-relaxed text-lg text-white"
              text="My current learning journey includes Next.js, Deep learning & Large Language Models."
            />

            <p
              className="text-pink-500 font-bold text-lg"
              style={{ textShadow: "0 0 10px rgba(236,72,153,0.5)" }}
            >
              I am always ready to LEARN and push my BOUNDARIES.
            </p>

            {/* Info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {PILLS.map(({ icon: Icon, title, sub }) => (
                <div key={title} className="info-pill p-6 border border-white/10 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Icon className="text-[#4fe3ff] text-2xl shrink-0" />
                    <div>
                      <div className="font-semibold text-white">{title}</div>
                      <div className="text-xs text-white/50">{sub}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Marquee (list is repeated so the loop is seamless) */}
      <div className="w-full mb-8 px-2">
        <div className="marquee-container">
          <div className="marquee-content">
            {[...MARQUEE, ...MARQUEE].map((t, i) => (
              <React.Fragment key={i}>
                <span>{t}</span>
                <span>•</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
