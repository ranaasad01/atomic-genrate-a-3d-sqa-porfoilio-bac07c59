"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from 'lucide-react';
import { navLinks, pageLinks, BRAND, primaryCTA } from "@/lib/data";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);

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
    setPagesOpen(false);
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
    if (!href.startsWith("#")) return pathname === href;
    return false;
  };

  const isPageActive = pageLinks.some((p) => pathname === p.href);

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
                    {isActive(link.href) && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-lg bg-[#00f5ff]/10 border border-[#00f5ff]/20"
                      />
                    )}
                  </Link>
                </li>
              ))}

              {/* Pages dropdown */}
              <li className="relative">
                <button
                  onClick={() => setPagesOpen((v) => !v)}
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isPageActive
                      ? "text-[#00f5ff]"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Pages
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      pagesOpen ? "rotate-180" : ""
                    }`}
                  />
                  {isPageActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-lg bg-[#00f5ff]/10 border border-[#00f5ff]/20"
                    />
                  )}
                </button>

                <AnimatePresence>
                  {pagesOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full right-0 mt-2 w-44 bg-[#1a1a2e]/95 backdrop-blur-xl border border-[#00f5ff]/20 rounded-xl overflow-hidden shadow-xl shadow-black/40"
                    >
                      {pageLinks.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={() => setPagesOpen(false)}
                            className={`block px-4 py-3 text-sm font-medium transition-all duration-200 ${
                              pathname === link.href
                                ? "text-[#00f5ff] bg-[#00f5ff]/10"
                                : "text-gray-400 hover:text-white hover:bg-[#00f5ff]/5"
                            }`}
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            </ul>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
              <Link
                href={primaryCTA.href}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#00f5ff] to-[#7b2fff] text-[#0f0f1a] font-semibold text-sm font-orbitron tracking-wide hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all duration-300"
              >
                {primaryCTA.label}
              </Link>

              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#00f5ff]/10 transition-all duration-200"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
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
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-16 z-40 bg-[#0f0f1a]/95 backdrop-blur-xl border-b border-[#00f5ff]/10 lg:hidden"
          >
            <nav className="max-w-7xl mx-auto px-4 py-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={getLinkHref(link.href)}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? "text-[#00f5ff] bg-[#00f5ff]/10"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Pages section in mobile */}
              <div className="pt-2 border-t border-[#00f5ff]/10">
                <p className="px-4 py-2 text-xs font-orbitron text-[#00f5ff]/60 tracking-widest uppercase">
                  Pages
                </p>
                {pageLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      pathname === link.href
                        ? "text-[#00f5ff] bg-[#00f5ff]/10"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href={primaryCTA.href}
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center px-5 py-3 rounded-lg bg-gradient-to-r from-[#00f5ff] to-[#7b2fff] text-[#0f0f1a] font-semibold text-sm font-orbitron"
                >
                  {primaryCTA.label}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
