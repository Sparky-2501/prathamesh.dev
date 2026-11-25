import React, { useState, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import GuitarStrings from "./components/GuitarStrings";
import Certificates from "./components/Certificates";
import Competitive from "./components/Competitive";
import Footer from "./components/Footer";
import Intro from "./components/Intro";
import FluidCursor from "./components/FluidCursor";

// Show the loader once per browser tab session (not on every refresh while testing).
const INTRO_KEY = "portfolio-intro-seen";

function shouldSkipIntro() {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
    return sessionStorage.getItem(INTRO_KEY) === "1";
  } catch {
    return false;
  }
}

export default function App() {
  // phase: "intro" (loader only) -> "reveal" (page mounts behind the opening curtain) -> "done"
  const [phase, setPhase] = useState(() => (shouldSkipIntro() ? "done" : "intro"));

  // once the loader is gone (and again after images load) re-measure every scroll animation
  useEffect(() => {
    if (phase === "intro") return;
    const refresh = () => ScrollTrigger.refresh();
    const t = setTimeout(refresh, 300);
    window.addEventListener("load", refresh);
    return () => {
      clearTimeout(t);
      window.removeEventListener("load", refresh);
    };
  }, [phase]);

  const handleReveal = () => setPhase("reveal");
  const handleComplete = () => {
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      /* storage blocked - ignore */
    }
    setPhase("done");
  };

  return (
    <>
      {phase !== "done" && <Intro onReveal={handleReveal} onComplete={handleComplete} />}

      {phase !== "intro" && (
        <div className="relative">
          <Navbar />
          <main className="relative z-[5]">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <GuitarStrings />
            <Certificates />
            <Competitive />
          </main>
          <Footer />
          <FluidCursor />
        </div>
      )}
    </>
  );
}
