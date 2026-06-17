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
    metrics: "14 → 0 critical CVEs · Sprint-level remediation",
    category: "Security",
  },
  {
    title: "Accessibility Compliance Suite",
    description:
      "Built an axe-core + Pa11y automated accessibility audit pipeline for a government portal, achieving WCAG 2.1 AA compliance across 300+ pages.",
    tags: ["axe-core", "Pa11y", "WCAG 2.1", "Node.js"],
    image: "https://lh6.googleusercontent.com/YU9NBC_PWUcqk5n-mAtXsyxjAlBsDeuWLNVQwT5j1WJPQ7wEveNVVbFkxG9THbNfT-PebEUccAM4ART_9bKVT-xzHLA2ZbIlLjsmCACrht1Zl-daJnbVnahh3tnKiHifKmCnMe9rVwyi3vIsCNGbnbD0NAdGCbgj4dX2xgKQ-KrCMhQeEDymicmi",
    metrics: "WCAG 2.1 AA · 300+ pages audited",
    category: "Accessibility",
  },
];

const experiences = [
  {
    role: "Senior SQA Engineer",
    company: "Stripe",
    period: "2022 – Present",
    description:
      "Lead quality engineering for Stripe's Payments and Billing APIs, owning the automation strategy across 4 squads.",
    highlights: [
      "Architected a Playwright-based E2E suite with 2,400+ tests running in parallel on GitHub Actions",
      "Reduced production defect escape rate by 73% through shift-left testing practices",
      "Mentored 3 junior QA engineers and established team-wide coding standards",
      "Drove adoption of contract testing (Pact) across 12 microservices",
    ],
    color: "#00f5ff",
  },
  {
    role: "QA Automation Engineer",
    company: "Airbnb",
    period: "2020 – 2022",
    description:
      "Owned test automation for the Search and Discovery platform, ensuring reliability for 150M+ monthly active users.",
    highlights: [
      "Built a Cypress component-testing library adopted by 8 frontend teams",
      "Implemented visual regression testing with Percy, catching 40+ UI regressions pre-release",
      "Designed API contract tests that prevented 3 major service outages",
      "Achieved 91% automation coverage on critical user journeys",
    ],
    color: "#7b2fff",
  },
  {
    role: "QA Engineer",
    company: "Salesforce",
    period: "2018 – 2020",
    description:
      "Contributed to quality assurance for Salesforce CRM's Lightning Experience, focusing on cross-browser and accessibility testing.",
    highlights: [
      "Migrated 600+ manual test cases to Selenium WebDriver automation",
      "Introduced BDD with Cucumber, improving collaboration between QA and Product",
      "Led accessibility audit initiative achieving WCAG 2.0 AA compliance",
      "Reduced regression cycle time from 5 days to 8 hours",
    ],
    color: "#ff6b6b",
  },
];

const certifications = [
  {
    name: "ISTQB Certified Tester – Advanced Level",
    issuer: "ISTQB",
    year: "2023",
    icon: "🏆",
    color: "#00f5ff",
  },
  {
    name: "AWS Certified DevOps Engineer – Professional",
    issuer: "Amazon Web Services",
    year: "2022",
    icon: "☁️",
    color: "#ff9900",
  },
  {
    name: "Certified Agile Tester (CAT)",
    issuer: "iSQI",
    year: "2021",
    icon: "🔄",
    color: "#7b2fff",
  },
  {
    name: "Selenium WebDriver with Java – Expert",
    issuer: "Udemy / Verified",
    year: "2020",
    icon: "⚙️",
    color: "#43b89c",
  },
  {
    name: "API Testing with Postman – Advanced",
    issuer: "Postman Academy",
    year: "2022",
    icon: "📡",
    color: "#ff6c37",
  },
  {
    name: "Certified Kubernetes Application Developer",
    issuer: "CNCF",
    year: "2023",
    icon: "🐳",
    color: "#326ce5",
  },
];

const testimonials = [
  {
    name: "Sarah Kim",
    role: "Engineering Manager, Stripe",
    avatar: "https://training.linuxfoundation.org/wp-content/uploads/2019/03/kubernetes-ckad-color.png",
    quote:
      "Alex transformed our QA culture from reactive bug-hunting to proactive quality engineering. The automation suite they built is the backbone of our CI pipeline.",
    stars: 5,
  },
  {
    name: "Marcus Rivera",
    role: "Staff Engineer, Airbnb",
    avatar: "http://tinabangel.com/wp-content/uploads/2015/04/MARCUS-RIVERA.png",
    quote:
      "Incredibly thorough and systematic. Alex's Cypress library saved our frontend teams hundreds of hours and caught regressions we never would have found manually.",
    stars: 5,
  },
  {
    name: "Priya Nair",
    role: "VP of Engineering, Salesforce",
    avatar: "https://media.licdn.com/dms/image/v2/D5622AQE3NpM1FP01Yg/feedshare-shrink_800/B56Zf4pvKcGUAg-/0/1752223383746?e=2147483647&v=beta&t=C11dC6M36dpAKpcbBRMtusPrnkgE-cNJfHc93ZNpFoQ",
    quote:
      "Alex has a rare ability to bridge the gap between technical depth and business impact. Their accessibility work directly contributed to winning a major enterprise contract.",
    stars: 5,
  },
];

const stats = [
  { value: "6+", label: "Years Experience", icon: Clock },
  { value: "50+", label: "Projects Delivered", icon: CheckCircle },
  { value: "2,400+", label: "Automated Tests Written", icon: Terminal },
  { value: "73%", label: "Avg. Defect Reduction", icon: Bug },
];

const services = [
  {
    icon: Shield,
    title: "Test Strategy & Planning",
    description:
      "Comprehensive QA strategies aligned with your SDLC — from risk-based test planning to coverage matrices that stakeholders actually understand.",
    color: "#00f5ff",
  },
  {
    icon: Zap,
    title: "Automation Framework Design",
    description:
      "Scalable, maintainable automation architectures using Playwright, Cypress, or Selenium — built to grow with your team, not against it.",
    color: "#7b2fff",
  },
  {
    icon: Activity,
    title: "Performance & Load Testing",
    description:
      "Identify bottlenecks before your users do. k6, JMeter, and Gatling pipelines with real-time Grafana dashboards and actionable reports.",
    color: "#ff6b6b",
  },
  {
    icon: Search,
    title: "API & Contract Testing",
    description:
      "REST, GraphQL, and gRPC test coverage with Pact contract testing to prevent microservice integration failures at the source.",
    color: "#43b89c",
  },
  {
    icon: AlertCircle,
    title: "Security & Accessibility QA",
    description:
      "OWASP-aligned security regression pipelines and WCAG 2.1 AA accessibility audits baked into your CI/CD — not bolted on at the end.",
    color: "#ff9900",
  },
  {
    icon: Settings,
    title: "CI/CD Quality Gates",
    description:
      "Integrate quality checkpoints into GitHub Actions, GitLab CI, or Jenkins so broken builds never reach production again.",
    color: "#326ce5",
  },
];

// ─── Sub-components (inline) ──────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f5ff]/30 bg-[#00f5ff]/5 mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-[#00f5ff] animate-pulse" />
      <span className="text-[#00f5ff] text-xs font-semibold tracking-widest uppercase font-orbitron">
        {children}
      </span>
    </div>
  );
}

function SkillBar({ skill, index }: { skill: (typeof skills)[0]; index: number }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="group p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-[#00f5ff]/30 hover:bg-[#00f5ff]/5 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{skill.icon}</span>
          <span className="text-sm font-medium text-white">{skill.name}</span>
        </div>
        <span className="text-xs text-[#00f5ff] font-orbitron font-bold">{skill.level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.05, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-[#00f5ff] to-[#7b2fff]"
        />
      </div>
      <span className="text-xs text-gray-500 mt-1 block">{skill.category}</span>
    </motion.div>
  );
}

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-2xl border border-white/10 bg-[#13131f] overflow-hidden hover:border-[#00f5ff]/40 hover:shadow-xl hover:shadow-[#00f5ff]/10 transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect fill='%231a1a2e' width='400' height='200'/%3E%3Ctext fill='%2300f5ff' font-size='14' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3EProject Preview%3C/text%3E%3C/svg%3E";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#13131f] via-transparent to-transparent" />
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#00f5ff]/20 text-[#00f5ff] border border-[#00f5ff]/30 backdrop-blur-sm">
            {project.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00f5ff] transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-xs bg-[#7b2fff]/15 text-[#a78bfa] border border-[#7b2fff]/20"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 pt-3 border-t border-white/5">
          <Activity className="w-3.5 h-3.5 text-[#00f5ff]" />
          <span className="text-xs text-[#00f5ff] font-medium">{project.metrics}</span>
        </div>
      </div>
    </motion.div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 gap-4"
      >
        <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center">
          <Check className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-xl font-bold text-white">Message Sent!</h3>
        <p className="text-gray-400 text-center max-w-xs">
          Thanks for reaching out. I'll get back to you within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Your full name"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#00f5ff]/50 focus:bg-[#00f5ff]/5 transition-all text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="you@company.com"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#00f5ff]/50 focus:bg-[#00f5ff]/5 transition-all text-sm"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">
          Subject
        </label>
        <select
          name="subject"
          value={form.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-xl bg-[#13131f] border border-white/10 text-white focus:outline-none focus:border-[#00f5ff]/50 transition-all text-sm appearance-none"
        >
          <option value="" disabled>Select a topic…</option>
          <option value="automation">Automation Framework</option>
          <option value="performance">Performance Testing</option>
          <option value="consulting">QA Consulting</option>
          <option value="fulltime">Full-time Opportunity</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">
          Message
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Tell me about your project or opportunity…"
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#00f5ff]/50 focus:bg-[#00f5ff]/5 transition-all text-sm resize-none"
        />
      </div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00f5ff] to-[#7b2fff] text-[#0f0f1a] font-bold text-sm tracking-wide hover:shadow-lg hover:shadow-[#00f5ff]/30 transition-shadow"
      >
        Send Message →
      </motion.button>
    </form>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();

  const motionProps = (variants: Variants) =>
    shouldReduceMotion
      ? {}
      : { variants, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } };

  return (
    <main className="bg-[#0f0f1a] text-white overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#00f5ff 1px, transparent 1px), linear-gradient(90deg, #00f5ff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#7b2fff]/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#00f5ff]/8 blur-[100px] pointer-events-none" />

        {/* Floating 3D orbs */}
        <motion.div
          variants={floatAnimation}
          initial="hidden"
          animate="visible"
          className="absolute top-24 right-16 w-20 h-20 rounded-full bg-gradient-to-br from-[#00f5ff]/30 to-[#7b2fff]/30 blur-sm border border-[#00f5ff]/20"
        />
        <motion.div
          variants={floatAnimation}
          initial="hidden"
          animate="visible"
          style={{ animationDelay: "1s" }}
          className="absolute bottom-32 left-12 w-14 h-14 rounded-full bg-gradient-to-br from-[#7b2fff]/30 to-[#ff6b6b]/30 blur-sm border border-[#7b2fff]/20"
        />
        <motion.div
          variants={glowPulse}
          initial="hidden"
          animate="visible"
          className="absolute top-1/3 left-8 w-3 h-3 rounded-full bg-[#00f5ff]"
        />
        <motion.div
          variants={glowPulse}
          initial="hidden"
          animate="visible"
          className="absolute bottom-1/3 right-12 w-2 h-2 rounded-full bg-[#7b2fff]"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00f5ff]/30 bg-[#00f5ff]/5 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-sm font-medium">Available for new opportunities</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-8xl font-black font-orbitron leading-none tracking-tight mb-6"
          >
            <span className="block text-white">Quality</span>
            <span className="block bg-gradient-to-r from-[#00f5ff] via-[#7b2fff] to-[#ff6b6b] bg-clip-text text-transparent">
              Engineered.
            </span>
            <span className="block text-white/60 text-3xl sm:text-4xl lg:text-5xl mt-2 font-bold">
              Bugs Eliminated.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Hi, I'm{" "}
            <span className="text-[#00f5ff] font-semibold">{BRAND.name}</span> — a Senior SQA
            Engineer with 6+ years building automation frameworks, performance pipelines, and
            quality cultures at{" "}
            <span className="text-white font-medium">Stripe, Airbnb & Salesforce</span>.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link href={primaryCTA.href}>
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#00f5ff] to-[#7b2fff] text-[#0f0f1a] font-bold text-sm tracking-wide hover:shadow-xl hover:shadow-[#00f5ff]/30 transition-shadow cursor-pointer"
              >
                {primaryCTA.label}
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
            <Link href="#contact">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white font-semibold text-sm hover:border-[#00f5ff]/50 hover:bg-[#00f5ff]/5 transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                Get In Touch
              </motion.span>
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className="p-4 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm text-center"
              >
                <stat.icon className="w-5 h-5 text-[#00f5ff] mx-auto mb-2" />
                <div className="text-2xl font-black font-orbitron text-white">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-6 h-6 text-gray-600" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 lg:py-32 relative">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#7b2fff]/8 blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: image + decoration */}
            <motion.div
              {...motionProps(slideInLeft)}
              className="relative flex justify-center"
            >
              <div className="relative w-72 h-72 sm:w-80 sm:h-80">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#00f5ff]/20 animate-spin" style={{ animationDuration: "20s" }} />
                {/* Inner glow */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#00f5ff]/20 to-[#7b2fff]/20 blur-xl" />
                {/* Avatar */}
                <div className="absolute inset-6 rounded-full overflow-hidden border-2 border-[#00f5ff]/40">
                  <img
                    src="https://images.squarespace-cdn.com/content/v1/576bdeb69de4bb52676104fe/1559064103456-VFXVMWTHM0ZXED5RW7IO/software-engineer-headshots-2.jpg"
                    alt={BRAND.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a]">
                    <span className="text-6xl font-black font-orbitron bg-gradient-to-br from-[#00f5ff] to-[#7b2fff] bg-clip-text text-transparent">
                      AC
                    </span>
                  </div>
                </div>
                {/* Floating badges */}
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 px-3 py-1.5 rounded-full bg-[#00f5ff]/20 border border-[#00f5ff]/40 text-[#00f5ff] text-xs font-bold backdrop-blur-sm"
                >
                  6+ Years
                </motion.div>
                <motion.div
                  animate={{ y: [4, -4, 4] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-4 -left-4 px-3 py-1.5 rounded-full bg-[#7b2fff]/20 border border-[#7b2fff]/40 text-[#a78bfa] text-xs font-bold backdrop-blur-sm"
                >
                  ISTQB Certified
                </motion.div>
              </div>
            </motion.div>

            {/* Right: copy */}
            <motion.div {...motionProps(slideInRight)} className="space-y-6">
              <SectionLabel>About Me</SectionLabel>
              <h2 className="text-4xl lg:text-5xl font-black font-orbitron leading-tight">
                I Build Quality Into{" "}
                <span className="bg-gradient-to-r from-[#00f5ff] to-[#7b2fff] bg-clip-text text-transparent">
                  Every Layer
                </span>
              </h2>
              <p className="text-gray-400 leading-relaxed">
                I'm a Senior SQA Engineer based in{" "}
                <span className="text-white font-medium">{BRAND.location}</span>, specializing in
                building robust automation ecosystems that let engineering teams ship with
                confidence. My approach is simple: quality isn't a phase — it's a discipline
                woven into every commit, every PR, and every deployment.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Over 6+ years at companies like Stripe, Airbnb, and Salesforce, I've learned that
                the best QA engineers don't just find bugs — they architect systems that prevent
                them. I specialize in Playwright, Cypress, k6, and building CI/CD quality gates
                that teams actually trust.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { label: "Location", value: BRAND.location, icon: MapPin },
                  { label: "Status", value: "Open to Opportunities", icon: CheckCircle },
                  { label: "Focus", value: "Automation & Performance", icon: Zap },
                  { label: "Certified", value: "ISTQB Advanced", icon: Award },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-2">
                    <item.icon className="w-4 h-4 text-[#00f5ff] mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs text-gray-500">{item.label}</div>
                      <div className="text-sm text-white font-medium">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 pt-2">
                <Link href={BRAND.github} target="_blank" rel="noopener noreferrer">
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/30 text-sm transition-all cursor-pointer"
                  >
                    <Github className="w-4 h-4" /> GitHub
                  </motion.span>
                </Link>
                <Link href={BRAND.linkedin} target="_blank" rel="noopener noreferrer">
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/30 text-sm transition-all cursor-pointer"
                  >
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 relative">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-[#00f5ff]/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...motionProps(fadeInUp)}
            className="text-center mb-16"
          >
            <SectionLabel>What I Do</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-black font-orbitron leading-tight">
              Quality Engineering{" "}
              <span className="bg-gradient-to-r from-[#00f5ff] to-[#7b2fff] bg-clip-text text-transparent">
                Services
              </span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">
              From strategy to execution — I cover the full spectrum of modern software quality
              assurance.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={scaleIn}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="group p-6 rounded-2xl border border-white/10 bg-[#13131f] hover:border-[#00f5ff]/30 hover:shadow-lg hover:shadow-[#00f5ff]/5 transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${service.color}15`, border: `1px solid ${service.color}30` }}
                >
                  <service.icon className="w-6 h-6" style={{ color: service.color }} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00f5ff] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────────────────── */}
      <section id="skills" className="py-24 lg:py-32 relative bg-[#0d0d18]">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #00f5ff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div {...motionProps(fadeInUp)} className="text-center mb-16">
            <SectionLabel>Technical Arsenal</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-black font-orbitron leading-tight">
              Skills &{" "}
              <span className="bg-gradient-to-r from-[#00f5ff] to-[#7b2fff] bg-clip-text text-transparent">
                Expertise
              </span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">
              A decade of hands-on experience across the full QA toolchain — from unit tests to
              production observability.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {skills.map((skill, i) => (
              <SkillBar key={skill.name} skill={skill} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
      <section id="projects" className="py-24 lg:py-32 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#00f5ff]/5 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...motionProps(fadeInUp)} className="text-center mb-16">
            <SectionLabel>Portfolio</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-black font-orbitron leading-tight">
              Featured{" "}
              <span className="bg-gradient-to-r from-[#00f5ff] to-[#7b2fff] bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">
              Real-world quality engineering work — each project measured by outcomes, not just
              coverage numbers.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── EXPERIENCE ───────────────────────────────────────────────────── */}
      <section id="experience" className="py-24 lg:py-32 relative bg-[#0d0d18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...motionProps(fadeInUp)} className="text-center mb-16">
            <SectionLabel>Career</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-black font-orbitron leading-tight">
              Work{" "}
              <span className="bg-gradient-to-r from-[#00f5ff] to-[#7b2fff] bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00f5ff]/40 via-[#7b2fff]/40 to-transparent" />

            <div className="space-y-12">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.company}
                  variants={i % 2 === 0 ? slideInLeft : slideInRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  className={`relative flex flex-col lg:flex-row gap-8 ${
                    i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-6 lg:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10"
                    style={{ borderColor: exp.color, backgroundColor: "#0d0d18", boxShadow: `0 0 12px ${exp.color}60` }}
                  />

                  {/* Card */}
                  <div className={`ml-16 lg:ml-0 lg:w-[calc(50%-2rem)] ${i % 2 === 0 ? "lg:pr-8" : "lg:pl-8"}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className="p-6 rounded-2xl border border-white/10 bg-[#13131f] hover:border-white/20 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                          <span
                            className="text-sm font-semibold"
                            style={{ color: exp.color }}
                          >
                            {exp.company}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/10 whitespace-nowrap">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-4">{exp.description}</p>
                      <ul className="space-y-2">
                        {exp.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2 text-sm text-gray-300">
                            <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: exp.color }} />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ───────────────────────────────────────────────── */}
      <section id="certifications" className="py-24 lg:py-32 relative">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#7b2fff]/8 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...motionProps(fadeInUp)} className="text-center mb-16">
            <SectionLabel>Credentials</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-black font-orbitron leading-tight">
              Certifications &{" "}
              <span className="bg-gradient-to-r from-[#00f5ff] to-[#7b2fff] bg-clip-text text-transparent">
                Awards
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {certifications.map((cert) => (
              <motion.div
                key={cert.name}
                variants={scaleIn}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.25 }}
                className="group p-5 rounded-2xl border border-white/10 bg-[#13131f] hover:border-white/20 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ backgroundColor: `${cert.color}15`, border: `1px solid ${cert.color}30` }}
                  >
                    {cert.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-snug mb-1">{cert.name}</h3>
                    <p className="text-xs text-gray-500">{cert.issuer}</p>
                    <span
                      className="inline-block mt-2 text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: `${cert.color}15`, color: cert.color }}
                    >
                      {cert.year}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 relative bg-[#0d0d18]">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #7b2fff 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div {...motionProps(fadeInUp)} className="text-center mb-16">
            <SectionLabel>Social Proof</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-black font-orbitron leading-tight">
              What Teams{" "}
              <span className="bg-gradient-to-r from-[#00f5ff] to-[#7b2fff] bg-clip-text text-transparent">
                Say
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="p-6 rounded-2xl border border-white/10 bg-[#13131f] hover:border-[#00f5ff]/20 transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#00f5ff] text-[#00f5ff]" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 bg-gradient-to-br from-[#00f5ff]/20 to-[#7b2fff]/20 flex items-center justify-center">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <span className="text-xs font-bold text-[#00f5ff]">
                      {(t.name ?? "").charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 lg:py-32 relative">
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00f5ff]/5 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div {...motionProps(fadeInUp)} className="text-center mb-16">
            <SectionLabel>Let's Connect</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-black font-orbitron leading-tight">
              Start a{" "}
              <span className="bg-gradient-to-r from-[#00f5ff] to-[#7b2fff] bg-clip-text text-transparent">
                Conversation
              </span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">
              Whether you're looking for a QA lead, an automation consultant, or just want to
              talk shop — my inbox is always open.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: info */}
            <motion.div {...motionProps(slideInLeft)} className="space-y-8">
              <div className="space-y-5">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: BRAND.email,
                    href: `mailto:${BRAND.email}`,
                    color: "#00f5ff",
                  },
                  {
                    icon: Github,
                    label: "GitHub",
                    value: "github.com/alexchen-sqa",
                    href: BRAND.github,
                    color: "#7b2fff",
                  },
                  {
                    icon: Linkedin,
                    label: "LinkedIn",
                    value: "linkedin.com/in/alexchen-sqa",
                    href: BRAND.linkedin,
                    color: "#0077b5",
                  },
                  {
                    icon: Twitter,
                    label: "Twitter",
                    value: "@alexchen_sqa",
                    href: BRAND.twitter,
                    color: "#1da1f2",
                  },
                ].map((contact) => (
                  <Link
                    key={contact.label}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.div
                      whileHover={{ x: 6 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-[#13131f] hover:border-white/20 transition-all cursor-pointer"
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${contact.color}15`, border: `1px solid ${contact.color}30` }}
                      >
                        <contact.icon className="w-5 h-5" style={{ color: contact.color }} />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">{contact.label}</div>
                        <div className="text-sm text-white font-medium">{contact.value}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-600 ml-auto" />
                    </motion.div>
                  </Link>
                ))}
              </div>

              {/* Availability card */}
              <div className="p-5 rounded-2xl border border-green-500/20 bg-green-500/5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 font-semibold text-sm">Currently Available</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Open to senior SQA, QA Lead, and Quality Engineering Manager roles. Also
                  available for short-term automation consulting engagements.
                </p>
              </div>
            </motion.div>

            {/* Right: form */}
            <motion.div
              {...motionProps(slideInRight)}
              className="p-8 rounded-2xl border border-white/10 bg-[#13131f]"
            >
              <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00f5ff]/10 via-[#7b2fff]/10 to-[#ff6b6b]/10" />
        <div className="absolute inset-0 border-y border-white/5" />
        <motion.div
          {...motionProps(scaleIn)}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-orbitron mb-4">
            Ready to Ship with{" "}
            <span className="bg-gradient-to-r from-[#00f5ff] to-[#7b2fff] bg-clip-text text-transparent">
              Confidence?
            </span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            Let's build a quality engineering practice that scales with your team and catches
            bugs before your users do.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#contact">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#00f5ff] to-[#7b2fff] text-[#0f0f1a] font-bold text-sm tracking-wide hover:shadow-xl hover:shadow-[#00f5ff]/30 transition-shadow cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                Hire Me
              </motion.span>
            </Link>
            <Link href="#projects">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white font-semibold text-sm hover:border-[#00f5ff]/50 hover:bg-[#00f5ff]/5 transition-all cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                View Projects
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}