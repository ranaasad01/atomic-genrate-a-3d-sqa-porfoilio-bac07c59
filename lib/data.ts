export type NavLink = {
  label: string;
  href: string;
};

export type Skill = {
  name: string;
  level: number;
  category: string;
  icon: string;
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  metrics: string;
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
};

// ─── Brand Constants ────────────────────────────────────────────────────────
export const BRAND = {
  name: "Rao Muhammad Ali",
  title: "SQA Engineer",
  tagline: "Crafting Quality at Every Layer of the Stack",
  email: "rao.muhammadali@sqaengineer.dev",
  github: "https://github.com/raomuhammadali-sqa",
  linkedin: "https://linkedin.com/in/raomuhammadali-sqa",
  twitter: "https://twitter.com/raomuhammadali_sqa",
  location: "San Francisco, CA",
  available: true,
} as const;

// ─── Navigation (single source of truth) ────────────────────────────────────
// Main site links (on-page anchors for homepage sections)
export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
];

// Separate pages navigation (distinct routes)
export const pageLinks: NavLink[] = [
  { label: "Publications", href: "/publications" },
  { label: "Blog", href: "/blog" },
];

// ─── Primary CTA ─────────────────────────────────────────────────────────────
export const primaryCTA = {
  label: "View My Work",
  href: "#projects",
} as const;
