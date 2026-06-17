"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, ExternalLink, Calendar, Tag, Award, FileText, Search, Filter } from 'lucide-react';
import { BRAND } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
} from "@/lib/motion";

// ─── Publications Data ────────────────────────────────────────────────────────
const publications = [
  {
    id: 1,
    title: "Automated Regression Testing in Microservices: A Systematic Approach",
    authors: "Alex Chen, Sarah Kim, David Park",
    venue: "IEEE Software Testing Conference 2024",
    year: "2024",
    category: "Research Paper",
    abstract:
      "This paper presents a systematic methodology for implementing automated regression testing in microservices architectures, addressing challenges of service isolation, contract testing, and distributed tracing in CI/CD pipelines.",
    tags: ["Microservices", "Regression Testing", "CI/CD", "Contract Testing"],
    link: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Shift-Left Testing: Integrating QA from Day One",
    authors: "Alex Chen",
    venue: "Medium – QA Engineering Blog",
    year: "2024",
    category: "Technical Article",
    abstract:
      "An in-depth exploration of shift-left testing principles, demonstrating how embedding QA practices early in the SDLC reduces defect costs by up to 80% and accelerates delivery velocity.",
    tags: ["Shift-Left", "SDLC", "Agile", "Best Practices"],
    link: "#",
    featured: false,
  },
  {
    id: 3,
    title: "Performance Testing at Scale: Lessons from 50k Concurrent Users",
    authors: "Alex Chen, Mike Torres",
    venue: "SREcon 2023",
    year: "2023",
    category: "Conference Talk",
    abstract:
      "Real-world case study of stress-testing a SaaS platform under extreme load using k6 and Grafana, uncovering critical bottlenecks and reducing p99 latency by 62% through targeted optimizations.",
    tags: ["Performance Testing", "k6", "Grafana", "SRE"],
    link: "#",
    featured: true,
  },
  {
    id: 4,
    title: "AI-Powered Test Generation: Opportunities and Pitfalls",
    authors: "Alex Chen",
    venue: "Dev.to – Testing & QA",
    year: "2023",
    category: "Technical Article",
    abstract:
      "A critical analysis of using large language models for automated test case generation, covering prompt engineering strategies, hallucination risks, and practical integration patterns with existing test frameworks.",
    tags: ["AI", "LLM", "Test Generation", "Automation"],
    link: "#",
    featured: false,
  },
  {
    id: 5,
    title: "Zero-Defect Banking: A QA Case Study in Fintech",
    authors: "Alex Chen, Priya Nair",
    venue: "Journal of Software Quality Assurance, Vol. 12",
    year: "2023",
    category: "Case Study",
    abstract:
      "Documents the end-to-end QA transformation of a fintech banking platform, achieving zero production incidents over 18 months through contract testing, chaos engineering, and a robust observability stack.",
    tags: ["Fintech", "Contract Testing", "Chaos Engineering", "Observability"],
    link: "#",
    featured: true,
  },
  {
    id: 6,
    title: "BDD in Practice: Bridging the Gap Between Business and Engineering",
    authors: "Alex Chen",
    venue: "Agile Alliance Conference 2022",
    year: "2022",
    category: "Conference Talk",
    abstract:
      "Practical guide to implementing Behavior-Driven Development with Gherkin and Cucumber in cross-functional teams, including real examples of living documentation and stakeholder collaboration patterns.",
    tags: ["BDD", "Gherkin", "Cucumber", "Agile"],
    link: "#",
    featured: false,
  },
  {
    id: 7,
    title: "Security Testing Automation with OWASP ZAP in DevSecOps",
    authors: "Alex Chen, James Liu",
    venue: "OWASP AppSec Global 2022",
    year: "2022",
    category: "Research Paper",
    abstract:
      "Presents an automated security testing pipeline integrating OWASP ZAP into DevSecOps workflows, enabling continuous vulnerability scanning with sub-5-minute feedback loops without sacrificing coverage.",
    tags: ["Security Testing", "OWASP ZAP", "DevSecOps", "CI/CD"],
    link: "#",
    featured: false,
  },
  {
    id: 8,
    title: "The True Cost of Technical Debt in QA: A Quantitative Analysis",
    authors: "Alex Chen",
    venue: "Towards Data Science",
    year: "2022",
    category: "Technical Article",
    abstract:
      "A data-driven examination of how accumulated test debt compounds over time, with a quantitative model for measuring its impact on release velocity, defect escape rate, and engineering morale.",
    tags: ["Technical Debt", "Metrics", "QA Strategy", "Data Analysis"],
    link: "#",
    featured: false,
  },
];

// ─── Category Color Helper ────────────────────────────────────────────────────
function getCategoryColor(category: string) {
  switch (category) {
    case "Research Paper":
      return {
        border: "border-[#00f5ff]/40",
        text: "text-[#00f5ff]",
        bg: "bg-[#00f5ff]/10",
      };
    case "Technical Article":
      return {
        border: "border-[#7b2fff]/40",
        text: "text-[#7b2fff]",
        bg: "bg-[#7b2fff]/10",
      };
    case "Case Study":
      return {
        border: "border-[#ff2d78]/40",
        text: "text-[#ff2d78]",
        bg: "bg-[#ff2d78]/10",
      };
    case "Conference Talk":
      return {
        border: "border-green-400/40",
        text: "text-green-400",
        bg: "bg-green-400/10",
      };
    default:
      return {
        border: "border-white/20",
        text: "text-white",
        bg: "bg-white/10",
      };
  }
}

// ─── Filter Categories ────────────────────────────────────────────────────────
const FILTER_CATEGORIES = [
  "All",
  "Research Paper",
  "Technical Article",
  "Case Study",
  "Conference Talk",
];

// ─── Stats Data ───────────────────────────────────────────────────────────────
const stats = [
  { label: "Publications", value: "8+", icon: BookOpen },
  { label: "Conferences", value: "4", icon: Award },
  { label: "Journals & Platforms", value: "3", icon: FileText },
];

// ─── Publication Card ─────────────────────────────────────────────────────────
function PublicationCard({
  pub,
  showFeaturedBadge = false,
}: {
  pub: (typeof publications)[0];
  showFeaturedBadge?: boolean;
}) {
  const colors = getCategoryColor(pub.category);

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{
        scale: 1.02,
        borderColor: "rgba(0,245,255,0.3)",
      }}
      className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col gap-4 transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(0,245,255,0.08)] group"
    >
      {/* Featured badge */}
      {showFeaturedBadge && pub.featured && (
        <span className="absolute top-4 right-4 text-xs font-orbitron font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-[#00f5ff]/20 to-[#7b2fff]/20 border border-[#00f5ff]/30 text-[#00f5ff]">
          ★ Featured
        </span>
      )}

      {/* Top row: category badge + year */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full border ${
            colors.border
          } ${colors.text} ${colors.bg}`}
        >
          {pub.category}
        </span>
        <span className="flex items-center gap-1 text-xs text-gray-400">
          <Calendar className="w-3 h-3" />
          {pub.year}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-orbitron text-white text-base font-bold leading-snug group-hover:text-[#00f5ff] transition-colors duration-200">
        {pub.title}
      </h3>

      {/* Authors */}
      <p className="text-gray-400 text-sm">{pub.authors}</p>

      {/* Venue */}
      <p className="text-[#00f5ff] text-sm font-medium">{pub.venue}</p>

      {/* Abstract */}
      <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
        {pub.abstract}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {pub.tags.map((tag) => (
          <span
            key={tag}
            className="bg-white/10 text-xs text-gray-300 rounded-full px-2 py-0.5"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Read More */}
      <div className="mt-auto pt-2 border-t border-white/5">
        <Link
          href={pub.link}
          className="inline-flex items-center gap-2 text-sm text-[#00f5ff] hover:text-white transition-colors duration-200 group/link"
        >
          <ExternalLink className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
          <span className="font-medium">Read More</span>
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────
export default function PublicationsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredPublications =
    activeFilter === "All"
      ? publications
      : publications.filter((p) => p.category === activeFilter);

  const featuredPublications = publications.filter((p) => p.featured);

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white overflow-x-hidden">
      {/* ── Hero Section ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[40vh] flex flex-col items-center justify-center pt-28 pb-16 px-4 overflow-hidden">
        {/* Neon grid background */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,245,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.15) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Gradient orbs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#00f5ff]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#7b2fff]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Heading */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center"
        >
          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-[#00f5ff]" />
            <span className="text-[#00f5ff] font-orbitron text-sm tracking-widest uppercase">
              {BRAND.name}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="font-orbitron text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4"
            style={{
              textShadow: "0 0 40px rgba(0,245,255,0.4), 0 0 80px rgba(0,245,255,0.15)",
            }}
          >
            <span className="text-white">Publi</span>
            <span className="text-[#00f5ff]">cations</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto"
          >
            Research, Articles &amp; Technical Writings
          </motion.p>
        </motion.div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────────────────────── */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 mb-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={scaleIn}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col items-center gap-2 hover:border-[#00f5ff]/30 transition-colors duration-300"
            >
              <stat.icon className="w-7 h-7 text-[#00f5ff]" />
              <span
                className="font-orbitron text-3xl font-black text-white"
                style={{ textShadow: "0 0 20px rgba(0,245,255,0.5)" }}
              >
                {stat.value}
              </span>
              <span className="text-gray-400 text-sm text-center">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Featured Publications ─────────────────────────────────────────── */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 mb-16">
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex items-center gap-3 mb-6"
        >
          <Award className="w-5 h-5 text-[#00f5ff]" />
          <h2 className="font-orbitron text-xl font-bold text-white tracking-wide">
            Featured Publications
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[#00f5ff]/30 to-transparent" />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featuredPublications.map((pub) => (
            <motion.div
              key={pub.id}
              variants={scaleIn}
              whileHover={{
                scale: 1.02,
                borderColor: "rgba(0,245,255,0.3)",
              }}
              className="relative bg-white/5 backdrop-blur-md rounded-2xl p-6 flex flex-col gap-4 transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(0,245,255,0.1)] group"
              style={{
                border: "1px solid transparent",
                backgroundClip: "padding-box",
                boxShadow: "inset 0 0 0 1px rgba(0,245,255,0.15), inset 0 0 0 1px rgba(123,47,255,0.1)",
              }}
            >
              {/* Gradient border overlay */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,245,255,0.08) 0%, rgba(123,47,255,0.08) 100%)",
                }}
              />

              {/* Featured badge */}
              <span className="absolute top-4 right-4 text-xs font-orbitron font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-[#00f5ff]/20 to-[#7b2fff]/20 border border-[#00f5ff]/40 text-[#00f5ff] z-10">
                ★ Featured
              </span>

              {/* Category + year */}
              <div className="flex items-center justify-between gap-2 flex-wrap relative z-10">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                    getCategoryColor(pub.category).border
                  } ${getCategoryColor(pub.category).text} ${
                    getCategoryColor(pub.category).bg
                  }`}
                >
                  {pub.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Calendar className="w-3 h-3" />
                  {pub.year}
                </span>
              </div>

              {/* Title */}
              <h3 className="relative z-10 font-orbitron text-white text-base font-bold leading-snug group-hover:text-[#00f5ff] transition-colors duration-200">
                {pub.title}
              </h3>

              {/* Authors */}
              <p className="relative z-10 text-gray-400 text-sm">{pub.authors}</p>

              {/* Venue */}
              <p className="relative z-10 text-[#00f5ff] text-sm font-medium">
                {pub.venue}
              </p>

              {/* Abstract */}
              <p className="relative z-10 text-gray-300 text-sm leading-relaxed line-clamp-3">
                {pub.abstract}
              </p>

              {/* Tags */}
              <div className="relative z-10 flex flex-wrap gap-1.5">
                {pub.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-white/10 text-xs text-gray-300 rounded-full px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Read More */}
              <div className="relative z-10 mt-auto pt-2 border-t border-white/5">
                <Link
                  href={pub.link}
                  className="inline-flex items-center gap-2 text-sm text-[#00f5ff] hover:text-white transition-colors duration-200 group/link"
                >
                  <ExternalLink className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                  <span className="font-medium">Read More</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Filter Bar ────────────────────────────────────────────────────── */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 mb-10">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="flex items-center gap-3 flex-wrap"
        >
          <Filter className="w-4 h-4 text-gray-400 shrink-0" />
          {FILTER_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 backdrop-blur-sm ${
                activeFilter === cat
                  ? "border-[#00f5ff] text-[#00f5ff] bg-[#00f5ff]/10 shadow-[0_0_12px_rgba(0,245,255,0.25)]"
                  : "border-white/10 text-gray-400 bg-white/5 hover:border-white/30 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </section>

      {/* ── All Publications Grid ─────────────────────────────────────────── */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex items-center gap-3 mb-8"
        >
          <FileText className="w-5 h-5 text-[#7b2fff]" />
          <h2 className="font-orbitron text-xl font-bold text-white tracking-wide">
            All Publications
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[#7b2fff]/30 to-transparent" />
          <span className="text-gray-400 text-sm">
            {filteredPublications.length} result
            {filteredPublications.length !== 1 ? "s" : ""}
          </span>
        </motion.div>

        {filteredPublications.length > 0 ? (
          <motion.div
            key={activeFilter}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPublications.map((pub) => (
              <PublicationCard key={pub.id} pub={pub} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center py-24 gap-4 text-center"
          >
            <Search className="w-12 h-12 text-gray-600" />
            <p className="text-gray-400 text-lg font-medium">
              No publications found for &ldquo;{activeFilter}&rdquo;
            </p>
            <button
              onClick={() => setActiveFilter("All")}
              className="text-[#00f5ff] text-sm hover:underline"
            >
              Clear filter
            </button>
          </motion.div>
        )}
      </section>

      {/* ── Background decorations ────────────────────────────────────────── */}
      <div className="fixed top-1/4 left-0 w-64 h-64 bg-[#00f5ff]/5 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="fixed bottom-1/4 right-0 w-64 h-64 bg-[#7b2fff]/5 rounded-full blur-3xl pointer-events-none -z-0" />
    </div>
  );
}
