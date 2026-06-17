"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from 'lucide-react';
import { navLinks, BRAND, primaryCTA } from "@/lib/data";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("/");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

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
      setMobileOpen(false);
    }
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : `/${href}`;
    }
    return href;
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return activeSection === href;
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0f0f1a]/90 backdrop-blur-xl border-b border-[#00f5ff]/10 shadow-lg shadow-[#00f5ff]/5"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2"
              >
                <div className="relative w-9 h-9">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#00f5ff] to-[#7b2fff] opacity-80 blur-sm group-hover:opacity-100 transition-opacity" />
                  <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-[#00f5ff] to-[#7b2fff] flex items-center justify-center text-[#0f0f1a] font-bold text-sm font-orbitron">
                    SQA
                  </div>
                </div>
                <span className="font-orbitron font-bold text-lg tracking-wider hidden sm:block">
                  <span className="text-white">{BRAND.name.split(" ")[0]}</span>
                  <span className="text-[#00f5ff]">.</span>
                  <span className="text-[#7b2fff]">dev</span>
                </span>
              </motion.div>
            </Link>

            {/* Desktop Nav */}
            <ul className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={getLinkHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group ${
                      isActive(link.href)
                        ? "text-[#00f5ff]"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <span className="relative z-10">{link.label}</span>
                    <motion.span
                      layoutId="nav-indicator"
                      className={`absolute inset-0 rounded-lg bg-[#00f5ff]/10 border border-[#00f5ff]/20 ${
                        isActive(link.href) ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                      }`}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Link
                href={getLinkHref(primaryCTA.href)}
                onClick={(e) => handleAnchorClick(e, primaryCTA.href)}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-[#00f5ff] to-[#7b2fff] text-[#0f0f1a] hover:opacity-90 transition-opacity shadow-lg shadow-[#00f5ff]/20"
              >
                <motion.span
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {primaryCTA.label}
                </motion.span>
              </Link>

              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#0f0f1a]/95 backdrop-blur-xl border-b border-[#00f5ff]/10 lg:hidden"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={getLinkHref(link.href)}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-[#00f5ff] hover:bg-[#00f5ff]/5 transition-all duration-200 font-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00f5ff]/50" />
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05, duration: 0.3 }}
                  className="pt-2"
                >
                  <Link
                    href={getLinkHref(primaryCTA.href)}
                    onClick={(e) => handleAnchorClick(e, primaryCTA.href)}
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold bg-gradient-to-r from-[#00f5ff] to-[#7b2fff] text-[#0f0f1a] w-full"
                  >
                    {primaryCTA.label}
                  </Link>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}