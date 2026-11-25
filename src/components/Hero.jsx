import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroBackground from "./HeroBackground";

const roles = [
  "Full Stack AI Developer",
  "MERN Stack Developer",
  "Backend Developer",
  "Software Engineer",
  "AI Integrator"
];

const originalName = "Prathamesh_Shelke";

const container = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const fromCenterUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: "easeOut" } },
};

const fromCenterSlightUp = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: "easeOut" } },
};

const fromCenterDown = {
  hidden: { opacity: 0, y: -25 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: "easeOut" } },
};

const randomBinary = () => (Math.random() > 0.5 ? "0" : "1");

const glitchSpread = (textArray, idx, radius = 1) => {
  const glitched = [...textArray];
  for (let i = idx - radius; i <= idx + radius; i++) {
    if (i >= 0 && i < glitched.length && glitched[i] !== " ") {
      glitched[i] = randomBinary();
    }
  }
  return glitched;
};

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [nameArray, setNameArray] = useState(originalName.split(""));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="premium-section bg-[#020817] overflow-hidden">
      <HeroBackground />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center max-w-7xl px-6 w-full"
      >
        <motion.p variants={fromCenterUp} className="text-sm sm:text-base md:text-lg text-[#4fe3ff]">
          Hi, I’m
        </motion.p>

        {/* NAME (hover = binary glitch) */}
        <motion.h1
          variants={fromCenterSlightUp}
          className="font-extrabold leading-tight cursor-pointer flex justify-center gap-[2px] mx-auto text-center whitespace-nowrap"
          style={{ fontSize: "clamp(2.2rem, 7vw, 6.5rem)" }}
        >
          {nameArray.map((letter, i) => {
            const isGlitched = letter === "0" || letter === "1";
            return (
              <span
                key={i}
                onMouseEnter={() => setNameArray(glitchSpread(originalName.split(""), i))}
                onMouseLeave={() => setNameArray(originalName.split(""))}
                className={`transition duration-75 ${isGlitched ? "text-[#4fe3ff]" : "text-white"}`}
              >
                {letter}
              </span>
            );
          })}
        </motion.h1>

        {/* ROLE (letter-by-letter swap) */}
        <div className="h-[40px] md:h-[60px] overflow-hidden mt-4 text-center relative flex justify-center w-full">
          <AnimatePresence mode="wait">
            <motion.h2
              key={currentRoleIndex}
              className="will-change-transform transform-gpu text-2xl sm:text-3xl md:text-5xl font-semibold text-slate-300 absolute flex"
            >
              {roles[currentRoleIndex].split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                  className="inline-block"
                  style={{ whiteSpace: "pre" }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h2>
          </AnimatePresence>
        </div>

        <motion.p
          variants={fromCenterDown}
          className="will-change-transform transform-gpu mt-6 text-base sm:text-lg md:text-2xl text-slate-300 max-w-5xl mx-auto leading-relaxed text-center px-4"
        >
          I build scalable MERN stack applications and develop AI-driven solutions using Machine
          Learning, Deep Learning, and Large Language Models integration to create intelligent digital
          experiences.
        </motion.p>

        {/* BUTTONS - colour fills left -> right on hover (see .btn-fill in index.css) */}
        <motion.div variants={fromCenterDown} className="mt-10 flex justify-center gap-5 flex-wrap">
          <a href="#projects" className="btn-fill btn-fill--solid">
            View My Work
          </a>
          <a href="#contact" className="btn-fill">
            Get In Touch
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
