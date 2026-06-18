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
    authors: "Rao Muhammad Ali, Sarah Kim, David Park",
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
    authors: "Rao Muhammad Ali",
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
    authors: "Rao Muhammad Ali, Mike Torres",
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
    authors: "Rao Muhammad Ali",
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
    authors: "Rao Muhammad Ali, Priya Nair",
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
    authors: "Rao Muhammad Ali",
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
    authors: "Rao Muhammad Ali, James Liu",
    venue: "OWASP AppSec Global 2022",
    year: "2022",
    category: "Research Paper",
    abstract:
      "Presents a framework for integrating OWASP ZAP automated security scans into DevSecOps pipelines, reducing critical CVEs from 14 to 0 within a single sprint and establishing continuous security regression baselines.",
    tags: ["Security Testing", "OWASP ZAP", "DevSecOps", "CVE"],
    link: "#",
    featured: false,
  },
  {
    id: 8,
    title: "The QA Engineer's Guide to Observability",
    authors: "Rao Muhammad Ali",
    venue: "Hashnode – Engineering Excellence",
    year: "2022",
    category: "Technical Article",
    abstract:
      "Explores how QA engineers can leverage distributed tracing, structured logging, and metrics dashboards to proactively detect quality regressions in production before users are impacted.",
    tags: ["Observability", "Tracing", "Monitoring", "Production QA"],
    link: "#",
    featured: false,
  },
];

const categories = ["All", "Research Paper", "Technical Article", "Conference Talk", "Case Study"];

const categoryColors: Record<string, string> = {
  "Research Paper": "text-[#00f5ff] border-[#00f5ff]/40 bg-[#00f5ff]/10",
  "Technical Article": "text-[#7b2fff] border-[#7b2fff]/40 bg-[#7b2fff]/10",
  "Conference Talk": "text-[#ff2d78] border-[#ff2d78]/40 bg-[#ff2d78]/10",
  "Case Study": "text-green-400 border-green-400/40 bg-green-400/10",
};

export default function PublicationsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = publications.filter((pub) => {
    const matchesCategory = activeCategory === "All" || pub.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      pub.title.toLowerCase().includes(q) ||
      pub.authors.toLowerCase().includes(q) ||
      pub.tags.some((t) => t.toLowerCase().includes(q)) ||
      pub.abstract.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const featured = publications.filter((p) => p.featured);

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white">
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#00f5ff]/5 rounded-full blur-3xl" />
          <div className="absolute top-40 right-1/4 w-80 h-80 bg-[#7b2fff]/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00f5ff]/30 bg-[#00f5ff]/5 text-[#00f5ff] text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              Research & Writing
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-orbitron text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            >
              <span className="text-white">My </span>
              <span className="bg-gradient-to-r from-[#00f5ff] to-[#7b2fff] bg-clip-text text-transparent">
                Publications
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-gray-400 text-lg max-w-2xl mx-auto mb-10"
            >
              Research papers, technical articles, and conference talks on software quality assurance,
              test automation, and engineering excellence.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={staggerContainer}
              className="flex flex-wrap justify-center gap-8 mb-12"
            >
              {[
                { label: "Publications", value: publications.length },
                { label: "Featured", value: featured.length },
                { label: "Years Active", value: "3+" },
                { label: "Topics", value: "12+" },
              ].map((stat) => (
                <motion.div key={stat.label} variants={scaleIn} className="text-center">
                  <div className="font-orbitron text-3xl font-bold text-[#00f5ff]">{stat.value}</div>
                  <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Featured ── */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <Award className="w-5 h-5 text-[#00f5ff]" />
            <h2 className="font-orbitron text-xl font-bold text-white">Featured Work</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16"
          >
            {featured.map((pub) => (
              <motion.div
                key={pub.id}
                variants={scaleIn}
                whileHover={{ y: -6, scale: 1.02 }}
                className="relative group rounded-2xl border border-[#00f5ff]/20 bg-gradient-to-br from-[#1a1a2e]/80 to-[#0f0f1a]/80 backdrop-blur-sm p-6 overflow-hidden cursor-pointer"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00f5ff]/5 to-[#7b2fff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f5ff]/50 to-transparent" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full border ${categoryColors[pub.category] ?? "text-gray-400 border-gray-400/40 bg-gray-400/10"}`}>
                      {pub.category}
                    </span>
                    <span className="text-gray-500 text-xs flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {pub.year}
                    </span>
                  </div>

                  <h3 className="font-orbitron text-sm font-bold text-white mb-2 leading-snug group-hover:text-[#00f5ff] transition-colors">
                    {pub.title}
                  </h3>

                  <p className="text-[#00f5ff] text-xs mb-3">{pub.authors}</p>
                  <p className="text-gray-500 text-xs mb-3 italic">{pub.venue}</p>
                  <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-3">{pub.abstract}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {pub.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-[#7b2fff]/10 text-[#7b2fff] border border-[#7b2fff]/20">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={pub.link}
                    className="inline-flex items-center gap-1 text-xs text-[#00f5ff] hover:text-white transition-colors"
                  >
                    Read more <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── All Publications ── */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Search + Filter */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search publications…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#1a1a2e]/80 border border-[#00f5ff]/20 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00f5ff]/60 transition-colors"
              />
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-[#00f5ff]/20 border-[#00f5ff]/60 text-[#00f5ff]"
                      : "bg-[#1a1a2e]/60 border-[#00f5ff]/10 text-gray-400 hover:border-[#00f5ff]/30 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Results count */}
          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-gray-500 text-sm mb-6"
          >
            Showing {filtered.length} of {publications.length} publications
          </motion.p>

          {/* Publication list */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-4"
          >
            {filtered.length === 0 ? (
              <motion.div variants={fadeInUp} className="text-center py-20 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>No publications match your search.</p>
              </motion.div>
            ) : (
              filtered.map((pub) => (
                <motion.div
                  key={pub.id}
                  variants={fadeInUp}
                  whileHover={{ x: 4 }}
                  className="group relative rounded-2xl border border-[#1a1a2e] hover:border-[#00f5ff]/30 bg-[#1a1a2e]/60 hover:bg-[#1a1a2e]/80 backdrop-blur-sm p-6 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#00f5ff]/20 to-[#7b2fff]/20 border border-[#00f5ff]/20 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-[#00f5ff]" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${categoryColors[pub.category] ?? "text-gray-400 border-gray-400/40 bg-gray-400/10"}`}>
                          {pub.category}
                        </span>
                        {pub.featured && (
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full border border-yellow-400/40 bg-yellow-400/10 text-yellow-400">
                            ★ Featured
                          </span>
                        )}
                        <span className="text-gray-500 text-xs flex items-center gap-1 ml-auto">
                          <Calendar className="w-3 h-3" />
                          {pub.year}
                        </span>
                      </div>

                      <h3 className="font-orbitron text-sm font-bold text-white mb-1 group-hover:text-[#00f5ff] transition-colors leading-snug">
                        {pub.title}
                      </h3>

                      <p className="text-[#00f5ff] text-xs mb-1">{pub.authors}</p>
                      <p className="text-gray-500 text-xs italic mb-3">{pub.venue}</p>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">{pub.abstract}</p>

                      <div className="flex flex-wrap items-center gap-2">
                        {pub.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-[#7b2fff]/10 text-[#7b2fff] border border-[#7b2fff]/20">
                            <Tag className="w-2.5 h-2.5 inline mr-1" />
                            {tag}
                          </span>
                        ))}
                        <a
                          href={pub.link}
                          className="ml-auto inline-flex items-center gap-1 text-xs text-[#00f5ff] hover:text-white transition-colors"
                        >
                          View <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative rounded-3xl border border-[#00f5ff]/20 bg-gradient-to-br from-[#1a1a2e]/80 to-[#0f0f1a]/80 backdrop-blur-sm p-10 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00f5ff]/5 to-[#7b2fff]/5" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f5ff]/50 to-transparent" />

            <div className="relative z-10">
              <BookOpen className="w-10 h-10 text-[#00f5ff] mx-auto mb-4" />
              <h2 className="font-orbitron text-2xl font-bold text-white mb-3">
                Want to Collaborate?
              </h2>
              <p className="text-gray-400 mb-6 max-w-lg mx-auto">
                I'm always open to co-authoring research, speaking at conferences, or contributing
                technical articles on QA and software quality topics.
              </p>
              <Link
                href="/#about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00f5ff] to-[#7b2fff] text-[#0f0f1a] font-bold text-sm hover:opacity-90 transition-opacity"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
