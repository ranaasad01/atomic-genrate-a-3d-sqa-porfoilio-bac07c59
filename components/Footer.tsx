"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, Mail, ArrowUp } from 'lucide-react';
import { navLinks, pageLinks, BRAND } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const socialLinks = [
  { icon: Github, href: BRAND.github, label: "GitHub" },
  { icon: Linkedin, href: BRAND.linkedin, label: "LinkedIn" },
  { icon: Twitter, href: BRAND.twitter, label: "Twitter" },
  { icon: Mail, href: `mailto:${BRAND.email}`, label: "Email" },
];

export default function Footer() {
  const pathname = usePathname();

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : `/${href}`;
    }
    return href;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#0f0f1a] border-t border-[#00f5ff]/10 overflow-hidden">
      {/* Glow accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-[#00f5ff]/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-8 bg-[#00f5ff]/5 blur-xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12"
        >
          {/* Brand column */}
          <motion.div variants={fadeInUp} className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#00f5ff] to-[#7b2fff] opacity-70 blur-sm group-hover:opacity-100 transition-opacity" />
                <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-[#00f5ff] to-[#7b2fff] flex items-center justify-center text-[#0f0f1a] font-bold text-xs font-orbitron">
                  SQA
                </div>
              </div>
              <span className="font-orbitron font-bold text-lg tracking-wider">
                <span className="text-white">{BRAND.name.split(" ")[0]}</span>
                <span className="text-[#00f5ff]">.</span>
                <span className="text-[#7b2fff]">dev</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              {BRAND.tagline}. Passionate about building quality into every
              layer of the software development lifecycle.
            </p>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-xs font-medium">
                Available for opportunities
              </span>
            </div>
          </motion.div>

          {/* Main nav links */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="font-orbitron text-sm font-semibold text-[#00f5ff] tracking-widest uppercase">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={getLinkHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Pages links */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="font-orbitron text-sm font-semibold text-[#7b2fff] tracking-widest uppercase">
              Pages
            </h3>
            <ul className="space-y-2">
              {pageLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social links */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="font-orbitron text-sm font-semibold text-[#00f5ff] tracking-widest uppercase">
              Connect
            </h3>
            <ul className="space-y-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-400 hover:text-white text-sm transition-all duration-200 group"
                  >
                    <span className="w-8 h-8 rounded-lg bg-[#1a1a2e] border border-[#00f5ff]/10 flex items-center justify-center group-hover:border-[#00f5ff]/40 group-hover:bg-[#00f5ff]/10 transition-all duration-200">
                      <Icon size={14} />
                    </span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-[#00f5ff]/10 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()}{" "}
            <span className="text-[#00f5ff]">{BRAND.name}</span>. All rights
            reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-gray-500 hover:text-[#00f5ff] text-sm transition-colors duration-200 group"
          >
            Back to top
            <span className="w-7 h-7 rounded-full border border-[#00f5ff]/20 flex items-center justify-center group-hover:border-[#00f5ff]/60 group-hover:bg-[#00f5ff]/10 transition-all duration-200">
              <ArrowUp size={12} />
            </span>
          </button>
        </motion.div>
      </div>
    </footer>
  );
}
