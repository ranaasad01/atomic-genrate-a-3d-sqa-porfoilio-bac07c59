"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from "@/lib/motion";

const experiences = [
  {
    id: 1,
    role: "Senior SQA Engineer",
    company: "TechCorp Solutions",
    period: "2022 – Present",
    description:
      "Leading the automation strategy across multiple product lines, architecting scalable test infrastructure that supports rapid feature delivery without compromising quality.",
    highlights: [
      "Built a Playwright + TypeScript framework from the ground up, covering 1,200+ end-to-end scenarios",
      "Reduced release cycle time by 40% through parallelised CI pipelines on GitHub Actions",
      "Mentored a team of 4 junior QA engineers in automation best practices and BDD workflows",
      "Introduced shift-left testing, cutting defect escape rate to under 2% in production",
    ],
  },
  {
    id: 2,
    role: "QA Engineer II",
    company: "FinTech Innovations",
    period: "2020 – 2022",
    description:
      "Owned the quality strategy for a core banking platform serving 500k+ users, with a focus on API contract testing and regulatory compliance validation.",
    highlights: [
      "Designed a REST Assured + Pact contract-testing layer for a microservices banking platform",
      "Caught 23 breaking API regressions before they reached production across 6 sprints",
      "Achieved zero production incidents over 18 months through rigorous regression suites",
      "Collaborated with security team to integrate OWASP ZAP scans into the DevSecOps pipeline",
    ],
  },
  {
    id: 3,
    role: "QA Engineer",
    company: "StartupXYZ",
    period: "2018 – 2020",
    description:
      "Joined as the first dedicated QA hire and built the entire quality assurance function from scratch, establishing processes, tooling, and culture around testing.",
    highlights: [
      "Built a Selenium + Jenkins CI pipeline that automated 70% of regression testing within 3 months",
      "Defined QA processes, test plans, and documentation standards adopted company-wide",
      "Implemented exploratory testing charters that uncovered 40+ critical UX defects pre-launch",
      "Integrated Allure Reports for real-time test visibility across engineering and product teams",
    ],
  },
  {
    id: 4,
    role: "Junior QA Analyst",
    company: "Digital Agency Co",
    period: "2016 – 2018",
    description:
      "Started my QA career performing manual and exploratory testing across a portfolio of client web and mobile applications, developing a strong foundation in quality principles.",
    highlights: [
      "Executed manual and exploratory testing across 15+ client projects in web and mobile",
      "Managed bug lifecycle and test case repositories in JIRA and TestRail",
      "Collaborated with developers and designers to reproduce and triage defects efficiently",
      "Contributed to UAT sessions with clients, ensuring acceptance criteria were fully met",
    ],
  },
];

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-[#0f0f1a] text-white overflow-x-hidden">
      {/* ── Background glows ── */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00f5ff]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#7b2fff]/5 rounded-full blur-3xl" />
        <div className="absolute top-2/3 left-1/2 w-64 h-64 bg-[#ff2d78]/4 rounded-full blur-3xl" />
      </div>

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <motion.p
            variants={fadeInUp}
            className="font-orbitron text-xs tracking-[0.3em] text-[#7b2fff] uppercase mb-4"
          >
            Career Journey
          </motion.p>

          <motion.h1
            variants={fadeInUp}
            className="font-orbitron text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="text-white">My </span>
            <span
              className="text-[#00f5ff]"
              style={{ textShadow: "0 0 30px #00f5ff80, 0 0 60px #00f5ff40" }}
            >
              Experience
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Over 8 years of building quality into software — from manual testing
            roots to leading enterprise-scale automation strategies.
          </motion.p>

          {/* Decorative line */}
          <motion.div
            variants={fadeInUp}
            className="mt-8 flex items-center justify-center gap-4"
          >
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#00f5ff]/60" />
            <div
              className="w-2 h-2 rounded-full bg-[#00f5ff]"
              style={{ boxShadow: "0 0 8px #00f5ff" }}
            />
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#00f5ff]/60" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Timeline ── */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-32">
        <div className="max-w-5xl mx-auto">
          {/* Center vertical line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{
              background: "linear-gradient(to bottom, transparent, #00f5ff80 10%, #00f5ff80 90%, transparent)",
              boxShadow: "0 0 8px #00f5ff60",
            }}
          />

          {/* Mobile left line */}
          <div
            className="lg:hidden absolute left-6 top-0 bottom-0 w-px"
            style={{
              background: "linear-gradient(to bottom, transparent, #00f5ff80 10%, #00f5ff80 90%, transparent)",
              boxShadow: "0 0 8px #00f5ff60",
            }}
          />

          <div className="space-y-16 lg:space-y-20">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;
              const cardVariant = isLeft ? slideInLeft : slideInRight;

              return (
                <motion.div
                  key={exp.id}
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  className={`relative flex flex-col lg:flex-row ${
                    isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                  } items-start lg:items-center gap-8`}
                >
                  {/* ── Timeline dot (desktop) ── */}
                  <div
                    className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 border-[#00f5ff] bg-[#0f0f1a] z-10 items-center justify-center"
                    style={{ boxShadow: "0 0 12px #00f5ff, 0 0 24px #00f5ff60" }}
                  >
                    <div className="w-2 h-2 rounded-full bg-[#00f5ff]" />
                  </div>

                  {/* ── Timeline dot (mobile) ── */}
                  <div
                    className="lg:hidden absolute left-6 -translate-x-1/2 top-6 w-4 h-4 rounded-full border-2 border-[#00f5ff] bg-[#0f0f1a] z-10 flex items-center justify-center"
                    style={{ boxShadow: "0 0 10px #00f5ff" }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00f5ff]" />
                  </div>

                  {/* ── Spacer (desktop, opposite side) ── */}
                  <div className="hidden lg:block lg:w-1/2" />

                  {/* ── Card ── */}
                  <motion.div
                    variants={cardVariant}
                    className="w-full lg:w-1/2 pl-12 lg:pl-0"
                  >
                    <div
                      className="relative rounded-2xl p-6 sm:p-8 border border-[#00f5ff]/20 bg-[#1a1a2e]/60 backdrop-blur-xl overflow-hidden group hover:border-[#00f5ff]/50 transition-all duration-300"
                      style={{
                        boxShadow:
                          "0 0 30px rgba(0,245,255,0.05), inset 0 1px 0 rgba(0,245,255,0.1)",
                      }}
                    >
                      {/* Card glow on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#00f5ff]/5 via-transparent to-[#7b2fff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                      {/* Corner accent */}
                      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                        <div className="absolute top-0 right-0 w-px h-8 bg-gradient-to-b from-[#00f5ff]/60 to-transparent" />
                        <div className="absolute top-0 right-0 w-8 h-px bg-gradient-to-l from-[#00f5ff]/60 to-transparent" />
                      </div>

                      {/* Period badge */}
                      <div className="inline-flex items-center gap-2 mb-4">
                        <span
                          className="font-orbitron text-xs font-semibold px-3 py-1 rounded-full border"
                          style={{
                            color: "#7b2fff",
                            borderColor: "#7b2fff60",
                            background: "rgba(123,47,255,0.1)",
                            textShadow: "0 0 8px #7b2fff80",
                          }}
                        >
                          {exp.period}
                        </span>
                      </div>

                      {/* Role */}
                      <h3
                        className="font-orbitron text-xl sm:text-2xl font-bold mb-1"
                        style={{
                          color: "#00f5ff",
                          textShadow: "0 0 16px #00f5ff60",
                        }}
                      >
                        {exp.role}
                      </h3>

                      {/* Company */}
                      <p className="text-white font-semibold text-base mb-4 tracking-wide">
                        {exp.company}
                      </p>

                      {/* Description */}
                      <p className="text-gray-400 text-sm leading-relaxed mb-5">
                        {exp.description}
                      </p>

                      {/* Highlights */}
                      <ul className="space-y-2">
                        {exp.highlights.map((point, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                            <span
                              className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{
                                background: "#00f5ff",
                                boxShadow: "0 0 6px #00f5ff",
                              }}
                            />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-4xl mx-auto"
        >
          <div
            className="rounded-2xl border border-[#00f5ff]/20 bg-[#1a1a2e]/60 backdrop-blur-xl p-8 grid grid-cols-2 sm:grid-cols-4 gap-8"
            style={{
              boxShadow: "0 0 40px rgba(0,245,255,0.06), inset 0 1px 0 rgba(0,245,255,0.1)",
            }}
          >
            {[
              { value: "8+", label: "Years Experience" },
              { value: "40%", label: "Faster Releases" },
              { value: "23", label: "Regressions Caught" },
              { value: "0", label: "Prod Incidents" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="text-center"
              >
                <p
                  className="font-orbitron text-3xl sm:text-4xl font-bold mb-1"
                  style={{
                    color: "#00f5ff",
                    textShadow: "0 0 20px #00f5ff80",
                  }}
                >
                  {stat.value}
                </p>
                <p className="text-gray-400 text-xs tracking-widest uppercase">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
