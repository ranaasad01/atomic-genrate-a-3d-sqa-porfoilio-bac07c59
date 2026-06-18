"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Clock, Shield, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { BRAND } from "@/lib/data";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

const personalDetails = [
  {
    icon: MapPin,
    label: "Location",
    value: BRAND.location,
    color: "#00f5ff",
  },
  {
    icon: Mail,
    label: "Email",
    value: BRAND.email,
    color: "#7b2fff",
  },
  {
    icon: Clock,
    label: "Availability",
    value: BRAND.available ? "Open to Opportunities" : "Not Available",
    color: "#ff2d78",
  },
];

const philosophies = [
  {
    icon: Shield,
    title: "Quality First",
    description:
      "Quality is not an afterthought — it's the foundation. Every line of code, every feature, every release must meet the highest standards before it reaches users.",
    color: "#00f5ff",
    glow: "shadow-[0_0_24px_#00f5ff55]",
    border: "border-[#00f5ff]/30",
  },
  {
    icon: ArrowRight,
    title: "Shift-Left Mindset",
    description:
      "Catching defects early saves time, money, and reputation. By embedding QA from day one of the SDLC, we prevent bugs instead of just finding them.",
    color: "#7b2fff",
    glow: "shadow-[0_0_24px_#7b2fff55]",
    border: "border-[#7b2fff]/30",
  },
  {
    icon: RefreshCw,
    title: "Continuous Improvement",
    description:
      "The best QA processes are never finished. Retrospectives, metrics, and automation feedback loops drive constant refinement and ever-higher quality bars.",
    color: "#ff2d78",
    glow: "shadow-[0_0_24px_#ff2d7855]",
    border: "border-[#ff2d78]/30",
  },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-[#0f0f1a] overflow-hidden">
      {/* ── Animated background glows ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#00f5ff]/5 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-[420px] h-[420px] rounded-full bg-[#7b2fff]/8 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 w-[360px] h-[360px] rounded-full bg-[#ff2d78]/5 blur-[100px]" />
        {/* Floating particles */}
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: i % 3 === 0 ? "#00f5ff" : i % 3 === 1 ? "#7b2fff" : "#ff2d78",
              left: `${(i * 17 + 5) % 95}%`,
              top: `${(i * 23 + 10) % 90}%`,
              opacity: 0.3 + (i % 4) * 0.1,
            }}
            animate={{
              y: [0, -18, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.25,
              ease: "easeInOut",
            }}
          />
        ))}
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

      {/* ── Page content ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">

        {/* ── Hero Section ── */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center mb-20"
        >
          <motion.div variants={fadeInUp} className="mb-4">
            <span className="inline-block font-orbitron text-xs tracking-[0.3em] text-[#00f5ff] uppercase border border-[#00f5ff]/30 rounded-full px-4 py-1.5 bg-[#00f5ff]/5">
              Get to Know Me
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="font-orbitron text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="text-white">About </span>
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, #00f5ff 0%, #7b2fff 100%)",
              }}
            >
              Me
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="max-w-2xl mx-auto text-gray-400 text-lg leading-relaxed"
          >
            I&apos;m{" "}
            <span className="text-[#00f5ff] font-semibold">{BRAND.name}</span>, a Senior
            SQA Engineer passionate about quality-driven development. With years of
            hands-on experience in test automation, performance engineering, and
            DevSecOps, I build robust quality frameworks that ship confidence — not
            just code.
          </motion.p>
        </motion.section>

        {/* ── Personal Details Card ── */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-20"
        >
          <motion.div
            variants={scaleIn}
            className="relative rounded-2xl border border-[#00f5ff]/15 bg-[#1a1a2e]/60 backdrop-blur-xl p-8 sm:p-10 overflow-hidden"
          >
            {/* Card inner glow */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f5ff]/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7b2fff]/30 to-transparent" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              {/* Left: Bio */}
              <motion.div variants={fadeInUp} className="space-y-5">
                <h2 className="font-orbitron text-2xl font-bold text-white">
                  Senior{" "}
                  <span className="text-[#00f5ff]">SQA Engineer</span>
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  With a deep commitment to software excellence, I specialize in
                  designing end-to-end test strategies that span unit, integration,
                  API, performance, and security testing. I thrive at the intersection
                  of engineering and quality — turning complex systems into reliable,
                  user-trusted products.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  My approach is collaborative and data-driven: I work closely with
                  developers, product managers, and stakeholders to embed quality
                  throughout the entire SDLC — not just at the end.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-sm font-medium">
                    Currently open to new opportunities
                  </span>
                </div>
              </motion.div>

              {/* Right: Details */}
              <motion.div variants={staggerContainer} className="space-y-4">
                {personalDetails.map((detail) => (
                  <motion.div
                    key={detail.label}
                    variants={fadeInUp}
                    className="flex items-center gap-4 p-4 rounded-xl border bg-[#0f0f1a]/50"
                    style={{ borderColor: `${detail.color}25` }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `${detail.color}15`,
                        border: `1px solid ${detail.color}30`,
                        boxShadow: `0 0 12px ${detail.color}20`,
                      }}
                    >
                      <detail.icon
                        size={18}
                        style={{ color: detail.color }}
                      />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                        {detail.label}
                      </p>
                      <p className="text-white text-sm font-medium mt-0.5">
                        {detail.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        {/* ── My Philosophy Section ── */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <span className="inline-block font-orbitron text-xs tracking-[0.3em] text-[#7b2fff] uppercase border border-[#7b2fff]/30 rounded-full px-4 py-1.5 bg-[#7b2fff]/5 mb-4">
              Core Values
            </span>
            <h2 className="font-orbitron text-3xl sm:text-4xl font-bold text-white">
              My{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: "linear-gradient(135deg, #7b2fff 0%, #ff2d78 100%)",
                }}
              >
                Philosophy
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {philosophies.map((item) => (
              <motion.div
                key={item.title}
                variants={scaleIn}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className={`relative rounded-2xl border bg-[#1a1a2e]/60 backdrop-blur-xl p-7 overflow-hidden group cursor-default ${item.border} ${item.glow}`}
              >
                {/* Top glow line */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${item.color}80, transparent)`,
                  }}
                />

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: `${item.color}12`,
                    border: `1px solid ${item.color}35`,
                    boxShadow: `0 0 20px ${item.color}25`,
                  }}
                >
                  <item.icon
                    size={26}
                    style={{ color: item.color }}
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <h3
                  className="font-orbitron text-lg font-bold mb-3"
                  style={{ color: item.color }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Corner accent */}
                <div
                  className="absolute bottom-0 right-0 w-16 h-16 opacity-10"
                  style={{
                    background: `radial-gradient(circle at bottom right, ${item.color}, transparent)`,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Stats Row ── */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "6+", label: "Years Experience", color: "#00f5ff" },
              { value: "50+", label: "Projects Delivered", color: "#7b2fff" },
              { value: "98%", label: "Avg. Pass Rate", color: "#ff2d78" },
              { value: "0", label: "Prod Incidents", color: "#00f5ff" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="relative rounded-xl border border-white/5 bg-[#1a1a2e]/50 backdrop-blur-md p-6 text-center overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    background: `radial-gradient(circle at center, ${stat.color}, transparent 70%)`,
                  }}
                />
                <p
                  className="font-orbitron text-3xl font-bold mb-1"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </p>
                <p className="text-gray-500 text-xs uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
