"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { CheckCircle, Shield, Zap, Bug, Terminal, Activity, Star, ArrowRight, Mail, Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, MapPin, Clock, Award, ChevronDown, Eye, FileText, Search, Settings, AlertCircle, Check } from 'lucide-react';
import { BRAND, primaryCTA } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
  floatAnimation,
  glowPulse,
} from "@/lib/motion";

// ─── Inline Data ─────────────────────────────────────────────────────────────

const skills = [
  { name: "Selenium WebDriver", level: 95, category: "Automation", icon: "⚙️" },
  { name: "Cypress", level: 92, category: "Automation", icon: "🌲" },
  { name: "Playwright", level: 88, category: "Automation", icon: "🎭" },
  { name: "Jest / Vitest", level: 90, category: "Unit Testing", icon: "🃏" },
  { name: "Postman / REST Assured", level: 93, category: "API Testing", icon: "📡" },
  { name: "JMeter / k6", level: 85, category: "Performance", icon: "⚡" },
  { name: "OWASP ZAP", level: 80, category: "Security", icon: "🔒" },
  { name: "Docker / CI-CD", level: 87, category: "DevOps", icon: "🐳" },
  { name: "Python / PyTest", level: 91, category: "Scripting", icon: "🐍" },
  { name: "JIRA / TestRail", level: 96, category: "Management", icon: "📋" },
  { name: "SQL / Database Testing", level: 88, category: "Data", icon: "🗄️" },
  { name: "BDD / Gherkin", level: 89, category: "Methodology", icon: "🥒" },
];

const projects = [
  {
    title: "E-Commerce Automation Suite",
    description:
      "Built an end-to-end Playwright + TypeScript test framework covering 1,200+ scenarios across checkout, payments, and inventory flows. Integrated with GitHub Actions for zero-touch CI.",
    tags: ["Playwright", "TypeScript", "GitHub Actions", "Allure Reports"],
    image: "https://qodex.ai/assets/blog-images/api-testing-banking-applications-cover.png",
    metrics: "98% pass rate · 40% faster release cycles",
    category: "Automation",
  },
  {
    title: "Banking API Test Framework",
    description:
      "Designed a contract-testing layer using REST Assured and Pact for a microservices banking platform. Caught 23 breaking API changes before they reached production.",
    tags: ["REST Assured", "Pact", "Java", "Jenkins"],
    image: "https://qodex.ai/assets/blog-images/api-testing-banking-applications-cover.png",
    metrics: "23 regressions caught · 0 prod incidents",
    category: "API Testing",
  },
  {
    title: "Performance Benchmark Platform",
    description:
      "Engineered a k6 + Grafana dashboard to stress-test a SaaS platform under 50k concurrent users. Identified three critical bottlenecks that reduced p99 latency by 62%.",
    tags: ["k6", "Grafana", "InfluxDB", "AWS"],
    image: "https://learn.g2.com/hubfs/Performance%20Benchmarking%20Process.png",
    metrics: "62% latency reduction · 50k concurrent users",
    category: "Performance",
  },
  {
    title: "Mobile QA Automation (iOS + Android)",
    description:
      "Implemented Appium + WebdriverIO cross-platform test suite for a fintech mobile app. Achieved 85% automation coverage across 6 device configurations in parallel.",
    tags: ["Appium", "WebdriverIO", "BrowserStack", "Bitrise"],
    image: "https://cdn.prod.website-files.com/68a4552adf4a460ade53ca38/694567a616e700d92148a607_691493fe58ce7ddaab7c113f_best-practices-for-dast-in-regression-testing.webp",
    metrics: "85% coverage · 6 device configs in parallel",
    category: "Mobile",
  },
  {
    title: "Security Regression Pipeline",
    description:
      "Integrated OWASP ZAP scans and Snyk dependency audits into the DevSecOps pipeline. Reduced critical CVEs from 14 to 0 within one sprint cycle.",
    tags: ["OWASP ZAP", "Snyk", "GitLab CI", "Python"],
    image: "https://cdn.prod.website-files.com/68a4552adf4a460ade53ca38/694567a616e700d92148a607_691493fe58ce7ddaab7c113f_best-practices-for-dast-in-regression-testing.webp",
    metrics: "14 → 0 critical CVEs · 1 sprint",
    category: "Security",
  },
  {
    title: "AI-Powered Test Generation",
    description:
      "Prototyped an LLM-based test case generator that analyses OpenAPI specs and auto-generates Cypress tests. Reduced manual test authoring time by 70%.",
    tags: ["OpenAI API", "Cypress", "Node.js", "OpenAPI"],
    image: "https://learn.g2.com/hubfs/Performance%20Benchmarking%20Process.png",
    metrics: "70% less manual authoring · 300+ auto-tests",
    category: "AI / Innovation",
  },
];

const experiences = [
  {
    role: "Senior SQA Engineer",
    company: "TechCorp Solutions",
    period: "2022 – Present",
    description: "Leading QA strategy for a suite of enterprise SaaS products.",
    highlights: [
      "Architected a unified test automation framework adopted by 4 teams",
      "Reduced regression cycle from 3 days to 4 hours",
      "Mentored 5 junior QA engineers",
      "Introduced shift-left testing, cutting bug escape rate by 45%",
    ],
  },
  {
    role: "QA Automation Engineer",
    company: "FinTech Innovations",
    period: "2020 – 2022",
    description: "Owned end-to-end automation for a high-traffic payments platform.",
    highlights: [
      "Built REST Assured API test suite from scratch (800+ tests)",
      "Integrated performance tests into CI, catching 3 major regressions",
      "Achieved PCI-DSS compliance through rigorous security testing",
    ],
  },
  {
    role: "Software QA Engineer",
    company: "StartupXYZ",
    period: "2018 – 2020",
    description: "First QA hire — established quality processes from the ground up.",
    highlights: [
      "Created the company's first test plan and QA documentation",
      "Implemented Selenium + TestNG framework",
      "Reduced production bug count by 60% in 6 months",
    ],
  },
];

const certifications = [
  { name: "ISTQB Certified Tester", org: "ISTQB", year: "2023", color: "#00f5ff" },
  { name: "AWS Certified Developer", org: "Amazon Web Services", year: "2022", color: "#7b2fff" },
  { name: "Certified Agile Tester", org: "iSQI", year: "2022", color: "#ff2d78" },
  { name: "Selenium WebDriver Expert", org: "Udemy / Coursera", year: "2021", color: "#00f5ff" },
];

const stats = [
  { value: "6+", label: "Years Experience", icon: Clock },
  { value: "50+", label: "Projects Delivered", icon: CheckCircle },
  { value: "99%", label: "Client Satisfaction", icon: Star },
  { value: "200K+", label: "Test Cases Written", icon: FileText },
];

// ─── Typewriter Hook ──────────────────────────────────────────────────────────
function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const tick = () => {
    const current = words[wordIdx];
    if (!deleting) {
      setDisplayed(current.slice(0, charIdx + 1));
      if (charIdx + 1 === current.length) {
        timeoutRef.current = setTimeout(() => setDeleting(true), pause);
        return;
      }
      setCharIdx((c) => c + 1);
    } else {
      setDisplayed(current.slice(0, charIdx - 1));
      if (charIdx - 1 === 0) {
        setDeleting(false);
        setWordIdx((w) => (w + 1) % words.length);
        setCharIdx(0);
        return;
      }
      setCharIdx((c) => c - 1);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stableRef = useRef(tick);
  stableRef.current = tick;

  const { current: savedRef } = useRef<ReturnType<typeof setInterval> | null>(null);

  useState(() => {
    const id = setInterval(() => stableRef.current(), speed);
    return () => clearInterval(id);
  });

  return displayed;
}

// ─── Particle Background ──────────────────────────────────────────────────────
function ParticleBackground() {
  const particles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 4,
    delay: Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#00f5ff]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: 0.15,
          }}
          animate={{
            y: ["-20px", "20px", "-20px"],
            opacity: [0.05, 0.3, 0.05],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Grid lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────
function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative py-24 lg:py-32 overflow-hidden ${className}`}
    >
      {children}
    </section>
  );
}

// ─── Section Heading ─────────────────────────────────────────────────────────
function SectionHeading({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="text-center mb-16 lg:mb-20"
    >
      <motion.span
        variants={fadeInUp}
        className="inline-block font-orbitron text-xs tracking-[0.3em] text-[#00f5ff] uppercase mb-4 px-4 py-1.5 rounded-full border border-[#00f5ff]/30 bg-[#00f5ff]/5"
      >
        {label}
      </motion.span>
      <motion.h2
        variants={fadeInUp}
        className="font-orbitron text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeInUp}
          className="text-gray-400 text-lg max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

// ─── Skill Bar ────────────────────────────────────────────────────────────────
function SkillBar({ skill }: { skill: (typeof skills)[0] }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="group p-4 rounded-xl border border-white/5 bg-white/3 hover:border-[#00f5ff]/30 hover:bg-[#00f5ff]/5 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{skill.icon}</span>
          <span className="text-sm font-medium text-white">{skill.name}</span>
        </div>
        <span className="text-xs text-[#00f5ff] font-orbitron">{skill.level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#00f5ff] to-[#7b2fff]"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        />
      </div>
      <span className="text-xs text-gray-500 mt-1 block">{skill.category}</span>
    </motion.div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      variants={scaleIn}
      className="relative h-80 cursor-pointer"
      style={{ perspective: 1000 }}
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 bg-[#1a1a2e]"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-40 object-cover opacity-60"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/400x200/1a1a2e/00f5ff?text=Project";
            }}
          />
          <div className="p-4">
            <span className="text-xs font-orbitron text-[#00f5ff] tracking-widest uppercase">
              {project.category}
            </span>
            <h3 className="font-bold text-white mt-1 mb-2 line-clamp-1">
              {project.title}
            </h3>
            <p className="text-xs text-[#00f5ff]/80 font-medium">{project.metrics}</p>
            <p className="text-xs text-gray-500 mt-2">Click to flip ↗</p>
          </div>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl border border-[#7b2fff]/40 bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] p-5 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div>
            <h3 className="font-bold text-white mb-2">{project.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed line-clamp-4">
              {project.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-[#7b2fff]/20 text-[#7b2fff] border border-[#7b2fff]/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────
export default function HomePage() {
  const roles = [
    "SQA Engineer",
    "Test Automation Architect",
    "Quality Champion",
    "DevOps QA Specialist",
    "Performance Testing Expert",
  ];
  const typedRole = useTypewriter(roles);
  const [activeFilter, setActiveFilter] = useState("All");
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#0f0f1a]">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <Section
        id="hero"
        className="min-h-screen flex items-center justify-center pt-20"
      >
        <ParticleBackground />
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#7b2fff]/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-[#00f5ff]/5 blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00f5ff]/30 bg-[#00f5ff]/5 text-[#00f5ff] text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-[#00f5ff] animate-pulse" />
                Available for new opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={fadeInUp}
              className="font-orbitron text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight"
            >
              <span className="text-white">{BRAND.name.split(" ").slice(0, 2).join(" ")}</span>
              <br />
              <span
                className="bg-gradient-to-r from-[#00f5ff] via-[#7b2fff] to-[#ff2d78] bg-clip-text text-transparent"
              >
                {BRAND.name.split(" ").slice(2).join(" ")}
              </span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div variants={fadeInUp} className="h-10 flex items-center justify-center">
              <span className="font-orbitron text-xl sm:text-2xl text-[#00f5ff]">
                {typedRole}
                <span className="animate-pulse">|</span>
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={fadeInUp}
              className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
            >
              {BRAND.tagline}. I build bulletproof test frameworks, automate
              quality gates, and ensure software ships with confidence.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Link
                href={primaryCTA.href}
                className="group relative px-8 py-4 rounded-xl font-semibold text-[#0f0f1a] bg-gradient-to-r from-[#00f5ff] to-[#7b2fff] hover:shadow-lg hover:shadow-[#00f5ff]/30 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {primaryCTA.label}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <a
                href={`mailto:${BRAND.email}`}
                className="px-8 py-4 rounded-xl font-semibold text-white border border-white/20 hover:border-[#00f5ff]/50 hover:bg-[#00f5ff]/5 transition-all duration-300 flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Get in Touch
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-12 max-w-3xl mx-auto"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={scaleIn}
                  className="p-4 rounded-xl border border-white/5 bg-white/3 backdrop-blur-sm text-center"
                >
                  <stat.icon className="w-5 h-5 text-[#00f5ff] mx-auto mb-2" />
                  <div className="font-orbitron text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{ delay: 2, duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-600"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>
      </Section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <Section id="about" className="bg-[#1a1a2e]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-6"
            >
              <span className="inline-block font-orbitron text-xs tracking-[0.3em] text-[#00f5ff] uppercase px-4 py-1.5 rounded-full border border-[#00f5ff]/30 bg-[#00f5ff]/5">
                About Me
              </span>
              <h2 className="font-orbitron text-3xl sm:text-4xl font-bold text-white">
                Passionate About{" "}
                <span className="text-[#00f5ff]">Quality</span>
              </h2>
              <p className="text-gray-400 leading-relaxed">
                With over 6 years in Software Quality Assurance, I've built
                test automation frameworks from scratch, led QA teams, and
                championed quality-first engineering cultures at startups and
                enterprises alike.
              </p>
              <p className="text-gray-400 leading-relaxed">
                My expertise spans the full testing spectrum — from unit and
                integration tests to end-to-end automation, performance
                benchmarking, and security scanning. I believe quality is
                everyone's responsibility, and I work to embed it into every
                stage of the SDLC.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: MapPin, text: BRAND.location },
                  { icon: Clock, text: "6+ Years Experience" },
                  { icon: Award, text: "4 Certifications" },
                ].map(({ icon: Icon, text }) => (
                  <span
                    key={text}
                    className="flex items-center gap-1.5 text-sm text-gray-400 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#00f5ff]" />
                    {text}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right — 3D floating card */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 p-8 rounded-2xl border border-[#00f5ff]/20 bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] backdrop-blur-xl shadow-2xl shadow-[#00f5ff]/10"
              >
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Test Automation", value: "Expert", color: "#00f5ff" },
                    { label: "API Testing", value: "Expert", color: "#7b2fff" },
                    { label: "Performance", value: "Advanced", color: "#ff2d78" },
                    { label: "Security QA", value: "Advanced", color: "#00f5ff" },
                    { label: "CI/CD", value: "Expert", color: "#7b2fff" },
                    { label: "Mobile Testing", value: "Advanced", color: "#ff2d78" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="p-3 rounded-xl bg-white/3 border border-white/5"
                    >
                      <div
                        className="text-xs font-orbitron font-bold mb-1"
                        style={{ color: item.color }}
                      >
                        {item.value}
                      </div>
                      <div className="text-xs text-gray-400">{item.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <div className="font-orbitron font-bold text-white">{BRAND.name}</div>
                    <div className="text-xs text-[#00f5ff]">{BRAND.title}</div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00f5ff] to-[#7b2fff] flex items-center justify-center font-orbitron font-bold text-[#0f0f1a] text-sm">
                    SQA
                  </div>
                </div>
              </motion.div>
              {/* Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00f5ff]/10 to-[#7b2fff]/10 blur-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ── SKILLS ───────────────────────────────────────────────────────── */}
      <Section id="skills">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Technical Arsenal"
            title="Skills & Tools"
            subtitle="A comprehensive toolkit built over 6+ years of hands-on QA engineering."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {skills.map((skill) => (
              <SkillBar key={skill.name} skill={skill} />
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
      <Section id="projects" className="bg-[#1a1a2e]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Featured Work"
            title="Projects"
            subtitle="Real-world QA challenges solved with automation, performance engineering, and security testing."
          />

          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === cat
                    ? "bg-gradient-to-r from-[#00f5ff] to-[#7b2fff] text-[#0f0f1a]"
                    : "border border-white/10 text-gray-400 hover:border-[#00f5ff]/40 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── EXPERIENCE ───────────────────────────────────────────────────── */}
      <Section id="experience">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Career Journey"
            title="Experience"
            subtitle="Building quality-first engineering cultures across startups and enterprises."
          />
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#00f5ff]/50 via-[#7b2fff]/50 to-transparent" />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-10"
            >
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.company}
                  variants={slideInLeft}
                  className="relative pl-16"
                >
                  {/* Dot */}
                  <div
                    className="absolute left-4 top-5 w-4 h-4 rounded-full border-2 border-[#00f5ff] bg-[#0f0f1a]"
                    style={{
                      boxShadow: "0 0 12px #00f5ff",
                    }}
                  />
                  <div className="p-6 rounded-2xl border border-white/5 bg-[#1a1a2e]/50 hover:border-[#00f5ff]/20 transition-all duration-300">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-orbitron font-bold text-white text-lg">
                          {exp.role}
                        </h3>
                        <p className="text-[#00f5ff] text-sm">{exp.company}</p>
                      </div>
                      <span className="text-xs font-orbitron text-gray-500 px-3 py-1 rounded-full border border-white/10">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">{exp.description}</p>
                    <ul className="space-y-1.5">
                      {exp.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm text-gray-400">
                          <Check className="w-3.5 h-3.5 text-[#00f5ff] mt-0.5 shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ── CERTIFICATIONS ───────────────────────────────────────────────── */}
      <Section id="certifications" className="bg-[#1a1a2e]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Credentials"
            title="Certifications"
            subtitle="Industry-recognised certifications validating expertise across testing disciplines."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {certifications.map((cert) => (
              <motion.div
                key={cert.name}
                variants={scaleIn}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="p-6 rounded-2xl border bg-[#1a1a2e] text-center group cursor-default"
                style={{ borderColor: `${cert.color}30` }}
              >
                <div
                  className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl"
                  style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}40` }}
                >
                  <Award className="w-7 h-7" style={{ color: cert.color }} />
                </div>
                <h3 className="font-orbitron font-bold text-white text-sm mb-1">
                  {cert.name}
                </h3>
                <p className="text-xs text-gray-500 mb-2">{cert.org}</p>
                <span
                  className="text-xs font-orbitron px-2 py-0.5 rounded-full"
                  style={{
                    color: cert.color,
                    background: `${cert.color}15`,
                    border: `1px solid ${cert.color}30`,
                  }}
                >
                  {cert.year}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <Section>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative p-12 rounded-3xl border border-[#00f5ff]/20 bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00f5ff]/5 to-[#7b2fff]/5" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-[#00f5ff]/60 to-transparent" />
            <motion.h2
              variants={fadeInUp}
              className="font-orbitron text-3xl sm:text-4xl font-bold text-white mb-4 relative z-10"
            >
              Let&apos;s Build{" "}
              <span className="text-[#00f5ff]">Quality</span> Together
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-gray-400 text-lg mb-8 max-w-xl mx-auto relative z-10"
            >
              Looking for a passionate SQA engineer to elevate your product
              quality? Let&apos;s connect.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10"
            >
              <a
                href={`mailto:${BRAND.email}`}
                className="group px-8 py-4 rounded-xl font-semibold text-[#0f0f1a] bg-gradient-to-r from-[#00f5ff] to-[#7b2fff] hover:shadow-lg hover:shadow-[#00f5ff]/30 transition-all duration-300 flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                {BRAND.email}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={BRAND.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl font-semibold text-white border border-white/20 hover:border-[#7b2fff]/50 hover:bg-[#7b2fff]/5 transition-all duration-300 flex items-center gap-2"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </motion.div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
