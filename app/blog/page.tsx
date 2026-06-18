"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, Clock, User, ArrowRight, Tag } from 'lucide-react';
import { BRAND } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
} from "@/lib/motion";

// ─── Blog Data ────────────────────────────────────────────────────────────────
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Playwright in 2024",
    excerpt:
      "Playwright has become the go-to framework for modern end-to-end testing. In this guide, we explore setup, best practices, and advanced patterns to supercharge your test automation pipeline.",
    category: "Automation",
    date: "Jan 2024",
    readTime: "8 min",
    author: "Rao Muhammad Ali",
    color: "#00f5ff",
  },
  {
    id: 2,
    title: "Why Shift-Left Testing Saves Money",
    excerpt:
      "Catching bugs early is not just a best practice — it's a financial imperative. Discover how embedding QA from day one can reduce defect costs by up to 80% and accelerate delivery velocity.",
    category: "Best Practices",
    date: "Dec 2023",
    readTime: "6 min",
    author: "Rao Muhammad Ali",
    color: "#7b2fff",
  },
  {
    id: 3,
    title: "k6 vs JMeter: Which Should You Choose?",
    excerpt:
      "Both k6 and JMeter are powerful performance testing tools, but they serve different use cases. We break down the pros, cons, and ideal scenarios for each to help you make the right call.",
    category: "Performance",
    date: "Nov 2023",
    readTime: "10 min",
    author: "Rao Muhammad Ali",
    color: "#ff2d78",
  },
  {
    id: 4,
    title: "OWASP Top 10: A QA Perspective",
    excerpt:
      "Security is everyone's responsibility — including QA engineers. Walk through the OWASP Top 10 vulnerabilities and learn how to integrate security checks into your existing test automation strategy.",
    category: "Security",
    date: "Oct 2023",
    readTime: "12 min",
    author: "Rao Muhammad Ali",
    color: "#ff2d78",
  },
  {
    id: 5,
    title: "Building a QA Career from Scratch",
    excerpt:
      "Starting a career in software quality assurance can feel overwhelming. This roadmap covers the skills, certifications, tools, and mindset shifts that will set you apart in a competitive market.",
    category: "Career",
    date: "Sep 2023",
    readTime: "7 min",
    author: "Rao Muhammad Ali",
    color: "#7b2fff",
  },
  {
    id: 6,
    title: "BDD with Cucumber: Real-World Tips",
    excerpt:
      "Behavior-Driven Development sounds great in theory, but real-world implementation is full of pitfalls. Learn from hard-won lessons on writing maintainable Gherkin scenarios and keeping stakeholders engaged.",
    category: "Automation",
    date: "Aug 2023",
    readTime: "9 min",
    author: "Rao Muhammad Ali",
    color: "#00f5ff",
  },
];

const categories = ["All", "Automation", "Performance", "Security", "Best Practices", "Career"];

const categoryColors: Record<string, string> = {
  Automation: "#00f5ff",
  Performance: "#ff2d78",
  Security: "#ff2d78",
  "Best Practices": "#7b2fff",
  Career: "#7b2fff",
};

// ─── Blog Card ────────────────────────────────────────────────────────────────
function BlogCard({ post, index }: { post: typeof blogPosts[0]; index: number }) {
  const accentColor = categoryColors[post.category] ?? "#00f5ff";

  return (
    <motion.article
      variants={fadeInUp}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-[#1a1a2e]/60 backdrop-blur border border-[#00f5ff]/20 rounded-2xl overflow-hidden flex flex-col"
      style={{
        boxShadow: `0 0 0 0 ${accentColor}`,
      }}
    >
      {/* Top accent bar */}
      <div
        className="h-1 w-full"
        style={{
          background: `linear-gradient(90deg, ${accentColor}, transparent)`,
        }}
      />

      <div className="p-6 flex flex-col flex-1 gap-4">
        {/* Category badge */}
        <div className="flex items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-orbitron tracking-wider border"
            style={{
              color: accentColor,
              borderColor: `${accentColor}40`,
              backgroundColor: `${accentColor}15`,
            }}
          >
            <Tag size={10} />
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-orbitron text-lg font-bold text-white leading-snug group-hover:text-[#00f5ff] transition-colors duration-300">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-400 text-sm leading-relaxed flex-1">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <User size={12} className="text-[#7b2fff]" />
            {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={12} className="text-[#00f5ff]" />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={12} className="text-[#ff2d78]" />
            {post.readTime} read
          </span>
        </div>

        {/* Read More */}
        <button
          className="mt-2 flex items-center gap-2 text-sm font-semibold transition-all duration-300 w-fit group/btn"
          style={{ color: accentColor }}
        >
          Read More
          <ArrowRight
            size={14}
            className="group-hover/btn:translate-x-1 transition-transform duration-300"
          />
        </button>
      </div>

      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top left, ${accentColor}08 0%, transparent 60%)`,
        }}
      />
    </motion.article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = blogPosts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      search === "" ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0f0f1a] relative overflow-hidden">
      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00f5ff]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7b2fff]/5 rounded-full blur-3xl" />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-[#ff2d78]/5 rounded-full blur-3xl" />
      </div>

      {/* Grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#00f5ff 1px, transparent 1px), linear-gradient(90deg, #00f5ff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        {/* ── Hero ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.div variants={fadeIn} className="mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f5ff]/30 bg-[#00f5ff]/10 text-[#00f5ff] text-xs font-orbitron tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f5ff] animate-pulse" />
              Knowledge Base
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
                backgroundImage: "linear-gradient(135deg, #00f5ff, #7b2fff)",
              }}
            >
              Blog
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Insights, tutorials, and thoughts on{" "}
            <span className="text-[#00f5ff]">SQA engineering</span> — from
            automation strategies to career growth.
          </motion.p>
        </motion.div>

        {/* ── Search Bar ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto mb-10"
        >
          <div className="relative group">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#00f5ff] transition-colors duration-300"
            />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#1a1a2e]/60 backdrop-blur border border-[#00f5ff]/20 text-white placeholder-gray-500 text-sm outline-none focus:border-[#00f5ff]/60 focus:shadow-[0_0_20px_rgba(0,245,255,0.15)] transition-all duration-300 font-sans"
            />
          </div>
        </motion.div>

        {/* ── Category Filters ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold font-orbitron tracking-wide border transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#00f5ff] text-[#0f0f1a] border-[#00f5ff] shadow-[0_0_20px_rgba(0,245,255,0.4)]"
                  : "bg-[#1a1a2e]/60 text-gray-400 border-[#00f5ff]/20 hover:border-[#00f5ff]/50 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ── Blog Grid ── */}
        {filtered.length > 0 ? (
          <motion.div
            key={activeCategory + search}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-center py-24"
          >
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-400 text-lg font-orbitron">
              No articles found.
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Try a different search term or category.
            </p>
          </motion.div>
        )}

        {/* ── Stats Bar ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { label: "Articles Published", value: "6+", color: "#00f5ff" },
            { label: "Topics Covered", value: "5", color: "#7b2fff" },
            { label: "Avg. Read Time", value: "8 min", color: "#ff2d78" },
            { label: "Years Writing", value: "3+", color: "#00f5ff" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={scaleIn}
              className="bg-[#1a1a2e]/60 backdrop-blur border border-[#00f5ff]/10 rounded-2xl p-6 text-center"
            >
              <div
                className="font-orbitron text-3xl font-black mb-1"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-gray-500 text-xs tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
