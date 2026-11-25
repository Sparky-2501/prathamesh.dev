import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedHeader from "./AnimatedHeader";
import { skillCategories, LEVELS } from "../data/skills";

/**
 * Skills section: category tabs on the left, skill tiles on the right.
 * All content comes from src/data/skills.js - you never need to edit this file to add a skill.
 */
export default function Skills() {
  const [activeId, setActiveId] = useState(skillCategories[0].id);
  const active = skillCategories.find((c) => c.id === activeId) ?? skillCategories[0];

  return (
    <section id="skills" className="premium-section relative overflow-hidden bg-[#040d21]">
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <AnimatedHeader text1="My " highlight="Skills" className="mb-12" />

        <div className="grid lg:grid-cols-[300px,1fr] gap-8 items-start">
          {/* TABS */}
          <div
            role="tablist"
            className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0"
          >
            {skillCategories.map((cat) => {
              const isActive = cat.id === activeId;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveId(cat.id)}
                  className={`relative text-left shrink-0 rounded-xl border px-5 py-4 transition-colors duration-300 ${
                    isActive
                      ? "border-[#4fe3ff]/60 bg-[#4fe3ff]/10"
                      : "border-white/10 bg-white/5 hover:border-white/25"
                  }`}
                >
                  <div className={`font-semibold ${isActive ? "text-[#4fe3ff]" : "text-white"}`}>{cat.title}</div>
                  <div className="hidden lg:block text-xs text-white/50 mt-1">{cat.subtitle}</div>
                </button>
              );
            })}
          </div>

          {/* TILES */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 md:p-8 min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <p className="text-white/60 text-sm mb-6 lg:hidden">{active.subtitle}</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {active.skills.map((s, i) => {
                    const Icon = s.icon;
                    const level = LEVELS[s.level] ?? LEVELS.comfortable;
                    return (
                      <motion.div
                        key={`${s.name}-${i}`}
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.04, duration: 0.3 }}
                        whileHover={{ y: -4 }}
                        className="group rounded-xl border border-white/10 bg-[#030b1a]/70 p-4 flex flex-col items-center text-center gap-3 hover:border-[#4fe3ff]/50 hover:shadow-[0_0_18px_rgba(79,227,255,0.18)] transition-colors"
                      >
                        <Icon className="text-4xl" style={{ color: s.color }} />
                        <div className="text-sm font-semibold text-white/90 leading-tight">{s.name}</div>
                        <div className="flex items-center gap-1.5 text-[11px] text-white/50">
                          <span className={`h-1.5 w-1.5 rounded-full ${level.dot}`} />
                          {level.label}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
