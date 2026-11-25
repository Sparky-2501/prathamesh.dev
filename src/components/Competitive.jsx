import React from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import AnimatedHeader from "./AnimatedHeader";
import CountUp from "./CountUp";
import { platforms, headline, CODOLIO_URL } from "../data/competitive";

/**
 * Problem-solving section: a clean "scoreboard" instead of cards.
 *  left  -> big headline numbers
 *  right -> one row per platform (hover fills left -> right, click opens the profile)
 *  below -> link to the full Codolio profile
 * Data lives in src/data/competitive.js
 */
export default function Competitive() {
  const codechef = platforms.find((p) => p.name === "CodeChef");
  const rating = codechef?.stats.find((s) => s.label === "Rating");

  return (
    <section id="dsa" className="premium-section bg-[#030b1a] overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 w-full">
        <AnimatedHeader text1="Problem " highlight="Solving" className="mb-4" />
        <p className="text-center text-white/60 max-w-2xl mx-auto mb-14">
          I practise data structures &amp; algorithms in C++ and test myself on live contests.
          The numbers below are pulled from my active platforms.
        </p>

        <div className="grid lg:grid-cols-[1fr,1.5fr] gap-12 lg:gap-16 items-start">
          {/* BIG NUMBERS */}
          <div>
            <div className="border-t border-white/20 py-7">
              <div className="font-mono text-6xl md:text-7xl font-bold text-white tabular-nums">
                <CountUp to={headline.total.value} suffix={headline.total.suffix} />
              </div>
              <div className="mt-2 text-sm text-white/50">{headline.total.label}</div>
            </div>
            {rating && (
              <div className="border-t border-white/20 py-7">
                <div className="font-mono text-6xl md:text-7xl font-bold text-[#4fe3ff] tabular-nums">
                  <CountUp to={rating.value} />
                </div>
                <div className="mt-2 text-sm text-white/50">CodeChef rating</div>
              </div>
            )}
            <div className="border-t border-white/20" />
          </div>

          {/* SCOREBOARD ROWS */}
          <div>
            <div className="hidden sm:grid grid-cols-[1.4fr,1fr,auto] gap-4 px-5 pb-3 font-mono text-[11px] uppercase tracking-widest text-white/35">
              <span>Platform</span>
              <span>Stats</span>
              <span className="w-6" />
            </div>

            <div className="border-t border-white/15">
              {platforms.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.a
                    key={p.name}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, delay: i * 0.12 }}
                    className="group relative isolate overflow-hidden grid sm:grid-cols-[1.4fr,1fr,auto] gap-3 sm:gap-4 items-center px-5 py-6 border-b border-white/15 transition-colors duration-500 hover:text-[#031018]"
                  >
                    <span className="absolute inset-0 -z-10 bg-[#4fe3ff] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.65,0.05,0.36,1)]" />

                    <div className="flex items-center gap-4">
                      <Icon className="text-3xl shrink-0 transition-colors duration-500 group-hover:!text-[#031018]" style={{ color: p.color }} />
                      <div>
                        <div className="text-xl font-bold text-white group-hover:text-[#031018] transition-colors duration-500">{p.name}</div>
                        <div className="font-mono text-xs text-white/45 group-hover:text-[#031018]/70 transition-colors duration-500">@{p.handle}</div>
                      </div>
                    </div>

                    <div className="flex gap-6 font-mono text-white/80 group-hover:text-[#031018] transition-colors duration-500">
                      {p.stats.map((s) => (
                        <div key={s.label}>
                          <div className="text-lg font-semibold tabular-nums">
                            {s.text ?? `${s.value.toLocaleString("en-IN")}${s.suffix ?? ""}`}
                          </div>
                          <div className="text-[10px] uppercase tracking-wider opacity-50">{s.label}</div>
                        </div>
                      ))}
                    </div>

                    <FiArrowUpRight className="hidden sm:block text-2xl text-white/40 group-hover:text-[#031018] group-hover:rotate-12 transition-all duration-500" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        {/* CODOLIO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="mt-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6 border border-white/15 rounded-xl px-6 py-6 md:px-8"
        >
          <div>
            <h3 className="text-xl font-bold text-white">See everything in one place</h3>
            <p className="text-white/55 text-sm mt-1 max-w-xl">
              My full journey - every platform, contests, streaks and the activity heatmap - lives on Codolio.
            </p>
          </div>
          <a href={"https://codolio.com/profile/Sparky-2501"} target="_blank" rel="noopener noreferrer" className="btn-fill btn-fill--solid shrink-0">
            View my Codolio <FiArrowUpRight />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
