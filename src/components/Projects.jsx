import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink, FiArrowRight } from "react-icons/fi";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedHeader from "./AnimatedHeader";
import ScrollRevealText from "./ScrollRevealText";
import { projects, FEATURED_COUNT } from "../data/projects";

function LinkIcons({ project, className = "" }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} source code`}
          className="p-3 rounded-full bg-[#4fe3ff] text-black hover:scale-110 transition"
        >
          <FiGithub size={20} />
        </a>
      )}
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} live demo`}
          className="p-3 rounded-full bg-[#4fe3ff] text-black hover:scale-110 transition"
        >
          <FiExternalLink size={20} />
        </a>
      )}
    </div>
  );
}

function Thumb({ project, className = "" }) {
  if (project.image) {
    return <img src={project.image} alt={project.title} loading="lazy" className={`object-cover ${className}`} />;
  }
  return (
    <div className={`flex items-center justify-center bg-gradient-to-br from-[#0b2a4a] to-[#061226] ${className}`}>
      <span className="text-5xl font-extrabold text-[#4fe3ff]/60">{project.title.slice(0, 2)}</span>
    </div>
  );
}

function FeaturedProject({ project, reversed }) {
  const hasLinks = project.github || project.live;
  return (
    <motion.div
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="grid md:grid-cols-2 gap-10 items-center"
    >
      <motion.div
        whileHover={{ scale: 1.03 }}
        className={`relative group rounded-2xl overflow-hidden shadow-lg border border-white/10 ${
          reversed ? "md:order-2" : ""
        }`}
      >
        <Thumb project={project} className="w-full h-[300px] md:h-[400px] opacity-95 group-hover:opacity-100 transition" />
        {hasLinks && (
          <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 focus-within:opacity-100 backdrop-blur-sm flex items-center justify-center transition-all duration-300">
            <LinkIcons project={project} className="gap-6" />
          </div>
        )}
      </motion.div>

      <div className={reversed ? "md:order-1 md:text-right" : ""}>
        <h3 className="text-3xl font-bold text-white">{project.title}</h3>
        <p className="text-[#4fe3ff] font-medium mt-1">{project.subtitle}</p>

        <ScrollRevealText text={project.desc} className="text-white mt-4 leading-relaxed" />

        <div className={`flex flex-wrap gap-3 mt-5 ${reversed ? "md:justify-end" : ""}`}>
          {project.tech.map((t) => (
            <span key={t} className="project-pill px-4 py-1.5 bg-white/5 text-[#4fe3ff] text-sm rounded-full border border-white/10">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function CompactProject({ project }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden flex flex-col hover:border-[#4fe3ff]/50 transition-colors"
    >
      <Thumb project={project} className="w-full h-44" />
      <div className="p-5 flex flex-col flex-1">
        <h4 className="text-xl font-bold text-white">{project.title}</h4>
        <p className="text-[#4fe3ff] text-sm mt-1">{project.subtitle}</p>
        <p className="text-white/70 text-sm mt-3 leading-relaxed line-clamp-3">{project.desc}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="px-2.5 py-1 bg-white/5 rounded-md text-xs text-white/70">
              {t}
            </span>
          ))}
        </div>
        <LinkIcons project={project} className="mt-auto pt-5" />
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState("All");

  const featured = projects.slice(0, FEATURED_COUNT);
  const rest = projects.slice(FEATURED_COUNT);
  const categories = ["All", ...Array.from(new Set(rest.map((p) => p.category)))];
  const visibleRest = rest.filter((p) => filter === "All" || p.category === filter);

  // section height changes when the list expands -> tell ScrollTrigger to re-measure
  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => clearTimeout(t);
  }, [showAll, filter]);

  return (
    <section id="projects" className="premium-section bg-[#06142a] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <AnimatedHeader text1="Featured " highlight="Projects" className="mb-3" />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-white/70 mb-16"
        >
          Some of my recent work showcasing real-world development skills.
        </motion.p>

        <div className="space-y-24 mb-16">
          {featured.map((p, i) => (
            <FeaturedProject key={p.title} project={p} reversed={i % 2 !== 0} />
          ))}
        </div>

        {rest.length > 0 && (
          <div className="mt-8">
            <div className="flex justify-center">
              <button type="button" onClick={() => setShowAll((s) => !s)} className="btn-fill">
                {showAll ? "Show less" : `View all projects (${projects.length})`}
                {!showAll && <FiArrowRight />}
              </button>
            </div>

            <AnimatePresence>
              {showAll && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.45 }}
                  className="overflow-hidden"
                >
                  {categories.length > 2 && (
                    <div className="flex flex-wrap justify-center gap-3 mt-10">
                      {categories.map((c) => (
                        <button
                          key={c}
                          onClick={() => setFilter(c)}
                          className={`px-5 py-1.5 rounded-full text-sm border transition ${
                            filter === c
                              ? "bg-[#4fe3ff] text-black border-[#4fe3ff]"
                              : "border-white/20 text-white hover:border-[#4fe3ff]"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 pb-2">
                    <AnimatePresence mode="popLayout">
                      {visibleRest.map((p) => (
                        <CompactProject key={p.title} project={p} />
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
