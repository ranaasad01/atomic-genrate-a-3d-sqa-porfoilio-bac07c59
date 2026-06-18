"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from 'lucide-react';
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
} from "@/lib/motion";

// ─── Projects Data ────────────────────────────────────────────────────────────
const projects = [
  {
    id: 1,
    title: "E-Commerce Automation Suite",
    description:
      "Built an end-to-end Playwright + TypeScript test framework covering 1,200+ scenarios across checkout, payments, and inventory flows. Integrated with GitHub Actions for zero-touch CI.",
    tags: ["Playwright", "TypeScript", "GitHub Actions", "Allure Reports"],
    metrics: "98% pass rate · 40% faster release cycles",
    category: "Automation",
  },
  {
    id: 2,
    title: "Banking API Test Framework",
    description:
      "Designed a contract-testing layer using REST Assured and Pact for a microservices banking platform. Caught 23 breaking API changes before they reached production.",
    tags: ["REST Assured", "Pact", "Java", "Jenkins"],
    metrics: "23 regressions caught · 0 prod incidents",
    category: "API Testing",
  },
  {
    id: 3,
    title: "Performance Benchmark Platform",
    description:
      "Engineered a k6 + Grafana dashboard to stress-test a SaaS platform under 50k concurrent users. Identified three critical bottlenecks that reduced p99 latency by 62%.",
    tags: ["k6", "Grafana", "InfluxDB", "AWS"],
    metrics: "62% p99 latency reduction",
    category: "Performance",
  },
  {
    id: 4,
    title: "Security Audit Automation",
    description:
      "Integrated OWASP ZAP scans and automated security regression pipelines into the DevSecOps workflow. Surfaced 15 critical vulnerabilities before production deployment.",
    tags: ["OWASP ZAP", "Python", "Docker"],
    metrics: "15 critical vulns found",
    category: "Security",
  },
  {
    id: 5,
    title: "Mobile QA Framework",
    description:
      "Implemented Appium + WebdriverIO cross-platform test suite for a fintech mobile app. Achieved full iOS and Android coverage across multiple device configurations in parallel.",
    tags: ["Appium", "WebdriverIO", "BrowserStack"],
    metrics: "iOS + Android coverage",
    category: "Automation",
  },
  {
    id: 6,
    title: "Data Pipeline Validator",
    description:
      "Built a Great Expectations-based validation layer for Airflow-orchestrated data pipelines. Ensured schema integrity, null checks, and referential accuracy across all data flows.",
    tags: ["Great Expectations", "Python", "Airflow"],
    metrics: "99.9% data accuracy",
    category: "Data",
  },
];

const categories = ["All", "Automation", "API Testing", "Performance", "Security", "Data"];

const categoryColors: Record<string, string> = {
  Automation: "text-[#00f5ff] border-[#00f5ff]/40 bg-[#00f5ff]/10",
  "API Testing": "text-[#7b2fff] border-[#7b2fff]/40 bg-[#7b2fff]/10",
  Performance: "text-[#ff2d78] border-[#ff2d78]/40 bg-[#ff2d78]/10",
  Security: "text-yellow-400 border-yellow-400/40 bg-yellow-400/10",
  Data: "text-green-400 border-green-400/40 bg-green-400/10",
};

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white overflow-x-hidden">
      {/* ── Background glows ── */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00f5ff]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7b2fff]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff2d78]/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        {/* ── Hero Heading ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.div variants={fadeIn} className="mb-4">
            <span className="inline-block font-orbitron text-xs tracking-[0.3em] text-[#00f5ff] uppercase border border-[#00f5ff]/30 rounded-full px-4 py-1.5 bg-[#00f5ff]/5">
              Portfolio
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="font-orbitron text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight"
          >
            <span className="text-white">My </span>
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, #00f5ff 0%, #7b2fff 50%, #ff2d78 100%)",
              }}
            >
              Projects
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Real-world QA engineering solutions — from automation frameworks to
            security pipelines.
          </motion.p>

          {/* Decorative line */}
          <motion.div
            variants={scaleIn}
            className="mt-8 flex items-center justify-center gap-4"
          >
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#00f5ff]/60" />
            <div className="w-2 h-2 rounded-full bg-[#00f5ff] shadow-[0_0_8px_#00f5ff]" />
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#00f5ff]/60" />
          </motion.div>
        </motion.div>

        {/* ── Category Filter ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              variants={scaleIn}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium font-orbitron tracking-wide border transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#00f5ff] text-[#0f0f1a] border-[#00f5ff] shadow-[0_0_20px_#00f5ff55]"
                  : "bg-[#1a1a2e]/60 text-gray-400 border-[#00f5ff]/20 hover:border-[#00f5ff]/50 hover:text-white"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* ── Projects Grid ── */}
        <motion.div
          key={activeCategory}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              variants={fadeInUp}
              whileHover={{
                y: -6,
                boxShadow: "0 0 30px rgba(0,245,255,0.15), 0 0 60px rgba(123,47,255,0.08)",
              }}
              className="group relative bg-[#1a1a2e]/60 backdrop-blur border border-[#00f5ff]/20 rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:border-[#00f5ff]/50 cursor-pointer"
            >
              {/* Top glow on hover */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00f5ff]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />

              {/* Category badge */}
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-orbitron font-semibold tracking-widest uppercase px-3 py-1 rounded-full border ${
                    categoryColors[project.category] ??
                    "text-gray-400 border-gray-400/30 bg-gray-400/10"
                  }`}
                >
                  {project.category}
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#00f5ff]/10 border border-[#00f5ff]/20 flex items-center justify-center group-hover:bg-[#00f5ff]/20 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-[#00f5ff] shadow-[0_0_6px_#00f5ff]" />
                </div>
              </div>

              {/* Title */}
              <h3 className="font-orbitron text-lg font-bold text-white group-hover:text-[#00f5ff] transition-colors duration-300 leading-snug">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed flex-1">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-md border border-[#7b2fff]/30 bg-[#7b2fff]/10 text-[#7b2fff] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Metrics */}
              <div className="flex items-center gap-2 pt-2 border-t border-[#00f5ff]/10">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className="text-green-400 text-xs font-medium">
                  {project.metrics}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Empty state ── */}
        {filtered.length === 0 && (
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-center py-20 text-gray-500"
          >
            <p className="font-orbitron text-lg">No projects in this category yet.</p>
          </motion.div>
        )}

        {/* ── Stats bar ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { value: "6+", label: "Projects Shipped" },
            { value: "98%", label: "Avg Pass Rate" },
            { value: "0", label: "Prod Incidents" },
            { value: "62%", label: "Latency Reduced" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={scaleIn}
              className="bg-[#1a1a2e]/60 backdrop-blur border border-[#00f5ff]/20 rounded-2xl p-5 text-center"
            >
              <div className="font-orbitron text-3xl font-black text-[#00f5ff] mb-1">
                {stat.value}
              </div>
              <div className="text-gray-400 text-xs tracking-wide">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
