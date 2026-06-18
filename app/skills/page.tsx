"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Skills Data ─────────────────────────────────────────────────────────────
const skillsData = [
  { name: "Selenium WebDriver", level: 95, category: "Automation", icon: "⚙️" },
  { name: "Cypress", level: 92, category: "Automation", icon: "🌲" },
  { name: "Playwright", level: 88, category: "Automation", icon: "🎭" },
  { name: "Jest/Vitest", level: 90, category: "Unit Testing", icon: "🃏" },
  { name: "Postman/REST Assured", level: 93, category: "API Testing", icon: "📡" },
  { name: "JMeter/k6", level: 85, category: "Performance", icon: "⚡" },
  { name: "OWASP ZAP", level: 80, category: "Security", icon: "🔒" },
  { name: "Docker/CI-CD", level: 87, category: "DevOps", icon: "🐳" },
  { name: "Python/PyTest", level: 91, category: "Scripting", icon: "🐍" },
  { name: "JIRA/TestRail", level: 96, category: "Management", icon: "📋" },
  { name: "SQL/Database Testing", level: 88, category: "Data", icon: "🗄️" },
  { name: "BDD/Gherkin", level: 89, category: "Methodology", icon: "🥒" },
];

const categories = [
  "All",
  "Automation",
  "API Testing",
  "Performance",
  "Security",
  "DevOps",
  "Scripting",
  "Management",
  "Data",
  "Methodology",
  "Unit Testing",
];

const categoryColors: Record<string, string> = {
  Automation: "#00f5ff",
  "API Testing": "#7b2fff",
  Performance: "#ff2d78",
  Security: "#ff6b35",
  DevOps: "#00d4aa",
  Scripting: "#ffd700",
  Management: "#a78bfa",
  Data: "#34d399",
  Methodology: "#f472b6",
  "Unit Testing": "#60a5fa",
};

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? skillsData
      : skillsData.filter((s) => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white overflow-x-hidden">
      {/* ── Background glows ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00f5ff]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#7b2fff]/5 rounded-full blur-3xl" />
        <div className="absolute top-2/3 left-1/2 w-64 h-64 bg-[#ff2d78]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        {/* ── Hero Heading ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="mb-4">
            <span className="inline-block px-4 py-1.5 rounded-full border border-[#00f5ff]/30 bg-[#00f5ff]/10 text-[#00f5ff] text-xs font-orbitron tracking-widest uppercase">
              Arsenal
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="font-orbitron text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="text-white">Skills &amp; </span>
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, #00f5ff, #7b2fff)",
              }}
            >
              Tools
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            A comprehensive toolkit forged through years of quality engineering —
            from test automation frameworks to DevSecOps pipelines.
          </motion.p>

          {/* Decorative line */}
          <motion.div
            variants={fadeInUp}
            className="mt-8 flex items-center justify-center gap-4"
          >
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#00f5ff]/60" />
            <div className="w-2 h-2 rounded-full bg-[#00f5ff] shadow-[0_0_8px_#00f5ff]" />
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#00f5ff]/60" />
          </motion.div>
        </motion.div>

        {/* ── Category Filter Bar ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium font-orbitron tracking-wide border transition-all duration-300 ${
                  activeCategory === cat
                    ? "border-[#00f5ff] bg-[#00f5ff]/15 text-[#00f5ff] shadow-[0_0_16px_#00f5ff40]"
                    : "border-[#00f5ff]/20 bg-[#1a1a2e]/40 text-gray-400 hover:border-[#00f5ff]/50 hover:text-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Skills Grid ── */}
        <motion.div
          key={activeCategory}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((skill) => (
            <motion.div
              key={skill.name}
              variants={scaleIn}
              whileHover={{
                scale: 1.03,
                boxShadow: `0 0 32px ${categoryColors[skill.category] ?? "#00f5ff"}30`,
              }}
              className="group relative rounded-2xl border border-[#00f5ff]/20 bg-[#1a1a2e]/60 backdrop-blur-md p-6 overflow-hidden transition-all duration-300"
            >
              {/* Card glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{
                  background: `radial-gradient(circle at top left, ${categoryColors[skill.category] ?? "#00f5ff"}10, transparent 60%)`,
                }}
              />

              {/* Top row: icon + category badge */}
              <div className="relative z-10 flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#0f0f1a]/80 border border-[#00f5ff]/20 flex items-center justify-center text-2xl shadow-inner">
                  {skill.icon}
                </div>
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold font-orbitron tracking-wide border"
                  style={{
                    color: categoryColors[skill.category] ?? "#00f5ff",
                    borderColor: `${categoryColors[skill.category] ?? "#00f5ff"}50`,
                    backgroundColor: `${categoryColors[skill.category] ?? "#00f5ff"}15`,
                  }}
                >
                  {skill.category}
                </span>
              </div>

              {/* Skill name */}
              <div className="relative z-10 mb-4">
                <h3 className="font-orbitron font-bold text-white text-base leading-tight">
                  {skill.name}
                </h3>
              </div>

              {/* Progress bar */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400 font-medium">Proficiency</span>
                  <span
                    className="text-sm font-bold font-orbitron"
                    style={{ color: categoryColors[skill.category] ?? "#00f5ff" }}
                  >
                    {skill.level}%
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-[#0f0f1a]/80 border border-[#00f5ff]/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                    className="h-full rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, #00f5ff, #7b2fff)",
                      boxShadow: "0 0 8px #00f5ff60",
                    }}
                  />
                </div>
              </div>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(90deg, transparent, ${categoryColors[skill.category] ?? "#00f5ff"}, transparent)`,
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* ── Stats Row ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6"
        >
          {[
            { value: "12+", label: "Tools & Frameworks" },
            { value: "95%", label: "Avg. Proficiency" },
            { value: "5+", label: "Years Experience" },
            { value: "50+", label: "Projects Delivered" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={scaleIn}
              className="rounded-2xl border border-[#00f5ff]/20 bg-[#1a1a2e]/60 backdrop-blur-md p-6 text-center"
            >
              <div
                className="font-orbitron text-3xl font-bold mb-1"
                style={{
                  background: "linear-gradient(135deg, #00f5ff, #7b2fff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
