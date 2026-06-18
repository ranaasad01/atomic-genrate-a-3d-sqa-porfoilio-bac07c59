"use client";

import { motion } from "framer-motion";
import { BRAND } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
} from "@/lib/motion";

// ─── Certifications Data ──────────────────────────────────────────────────────
const certifications = [
  {
    id: 1,
    icon: "🏆",
    name: "ISTQB Certified Tester Foundation Level",
    organization: "ISTQB",
    year: "2018",
    color: "#00f5ff",
  },
  {
    id: 2,
    icon: "🤖",
    name: "ISTQB Advanced Test Automation Engineer",
    organization: "ISTQB",
    year: "2020",
    color: "#7b2fff",
  },
  {
    id: 3,
    icon: "☁️",
    name: "AWS Certified Developer Associate",
    organization: "Amazon Web Services",
    year: "2021",
    color: "#ff9900",
  },
  {
    id: 4,
    icon: "⚡",
    name: "Certified Agile Tester",
    organization: "iSQI",
    year: "2019",
    color: "#ff2d78",
  },
  {
    id: 5,
    icon: "⚙️",
    name: "Selenium WebDriver with Java",
    organization: "Udemy / Applitools",
    year: "2020",
    color: "#00f5ff",
  },
  {
    id: 6,
    icon: "🌲",
    name: "Cypress.io Certified",
    organization: "Cypress",
    year: "2022",
    color: "#7b2fff",
  },
  {
    id: 7,
    icon: "🐳",
    name: "Google Professional Cloud DevOps Engineer",
    organization: "Google",
    year: "2023",
    color: "#4285f4",
  },
  {
    id: 8,
    icon: "🔒",
    name: "OWASP Security Testing",
    organization: "OWASP Foundation",
    year: "2022",
    color: "#ff2d78",
  },
];

export default function CertificationsPage() {
  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white relative overflow-hidden">
      {/* ── Floating glow background ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#7b2fff]/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#00f5ff]/10 blur-[120px] animate-pulse" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#ff2d78]/5 blur-[140px]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#00f5ff 1px, transparent 1px), linear-gradient(90deg, #00f5ff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        {/* ── Hero Heading ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center mb-20"
        >
          <motion.div variants={fadeIn} className="mb-4">
            <span className="inline-block px-4 py-1.5 rounded-full border border-[#00f5ff]/30 bg-[#00f5ff]/10 text-[#00f5ff] text-xs font-orbitron tracking-widest uppercase">
              Credentials &amp; Achievements
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="font-orbitron text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="text-white">My </span>
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, #00f5ff, #7b2fff)",
              }}
            >
              Certifications
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Industry-recognized certifications validating expertise in software
            quality assurance, test automation, cloud, and security engineering.
          </motion.p>

          {/* Decorative line */}
          <motion.div
            variants={fadeIn}
            className="mt-8 flex items-center justify-center gap-4"
          >
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#00f5ff]/60" />
            <div className="w-2 h-2 rounded-full bg-[#00f5ff] shadow-[0_0_8px_#00f5ff]" />
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#00f5ff]/60" />
          </motion.div>
        </motion.div>

        {/* ── Certifications Grid ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              variants={scaleIn}
              whileHover={{
                scale: 1.05,
                rotateY: 4,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="group relative rounded-2xl p-6 flex flex-col items-center text-center gap-4
                bg-[#1a1a2e]/60 backdrop-blur-md
                border border-[#7b2fff]/30
                hover:border-[#00f5ff]/60
                transition-colors duration-300
                cursor-default"
              style={{ perspective: "800px" }}
            >
              {/* Card inner glow on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${cert.color}18 0%, transparent 70%)`,
                }}
              />

              {/* Badge icon */}
              <div
                className="relative w-20 h-20 rounded-2xl flex items-center justify-center text-4xl
                  bg-[#0f0f1a]/80 border border-white/10
                  group-hover:shadow-[0_0_24px_var(--glow)] transition-shadow duration-300"
                style={{ "--glow": cert.color + "80" } as React.CSSProperties}
              >
                {cert.icon}
                {/* Glow ring */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    boxShadow: `0 0 20px ${cert.color}60`,
                  }}
                />
              </div>

              {/* Cert name */}
              <h3 className="font-orbitron text-sm font-bold text-white leading-snug">
                {cert.name}
              </h3>

              {/* Organization */}
              <p
                className="text-xs font-medium"
                style={{ color: cert.color }}
              >
                {cert.organization}
              </p>

              {/* Year */}
              <p className="text-gray-500 text-xs">{cert.year}</p>

              {/* Verified badge */}
              <div className="mt-auto flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-xs font-semibold tracking-wide">
                  Verified
                </span>
              </div>

              {/* Corner accent */}
              <div
                className="absolute top-3 right-3 w-2 h-2 rounded-full opacity-60"
                style={{ backgroundColor: cert.color }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* ── Stats row ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Certifications", value: "8+", color: "#00f5ff" },
            { label: "Years of QA", value: "7+", color: "#7b2fff" },
            { label: "Issuing Bodies", value: "6", color: "#ff2d78" },
            { label: "Domains Covered", value: "5", color: "#00f5ff" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={scaleIn}
              className="rounded-2xl p-6 text-center
                bg-[#1a1a2e]/60 backdrop-blur-md
                border border-[#7b2fff]/20
                hover:border-[#00f5ff]/40 transition-colors duration-300"
            >
              <p
                className="font-orbitron text-3xl font-bold mb-1"
                style={{ color: stat.color, textShadow: `0 0 16px ${stat.color}80` }}
              >
                {stat.value}
              </p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
