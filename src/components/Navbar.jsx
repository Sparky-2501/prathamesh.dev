import React, { useState, useEffect } from "react";
import { FiFileText, FiMenu, FiX } from "react-icons/fi";
import logo from "../assets/logo.png";
import resumeUrl from "../assets/Resume.pdf";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "dsa", label: "DSA" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [hide, setHide] = useState(false); // hide while the footer is on screen
  const [open, setOpen] = useState(false); // mobile menu
  const [active, setActive] = useState("home");

  // hide navbar when footer is visible
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) => setHide(entry.isIntersecting), {
      threshold: 0.2,
    });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  // highlight the link of the section currently in view
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const linkClass = (id) =>
    `duration-150 hover:text-[#4fe3ff] ${active === id ? "text-[#4fe3ff]" : "text-slate-100"}`;

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 bg-[#040d21]/90 backdrop-blur py-3 shadow-md shadow-black/10 transition-all duration-300 ${
        hide ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="relative w-12 h-12 group [perspective:800px]" aria-label="Home">
          <img
            src={logo}
            alt="logo"
            className="w-full h-full object-contain transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
          />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium">
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} className={linkClass(l.id)}>
              {l.label}
            </a>
          ))}
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-fill btn-fill--solid !py-2 !px-5 !text-sm !border-0 ml-2"
          >
            <FiFileText /> Resume
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden text-white text-2xl p-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-6 pt-3 pb-5 flex flex-col gap-4 text-base font-medium border-t border-white/5 mt-3">
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)} className={linkClass(l.id)}>
              {l.label}
            </a>
          ))}
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-fill btn-fill--solid !py-2 self-start"
          >
            <FiFileText /> Resume
          </a>
        </div>
      )}
    </nav>
  );
}
