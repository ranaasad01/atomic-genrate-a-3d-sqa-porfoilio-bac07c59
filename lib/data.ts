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
  name: "Alex Chen",
  title: "SQA Engineer",
  tagline: "Crafting Quality at Every Layer of the Stack",
  email: "alex.chen@sqaengineer.dev",
  github: "https://github.com/alexchen-sqa",
  linkedin: "https://linkedin.com/in/alexchen-sqa",
  twitter: "https://twitter.com/alexchen_sqa",
  location: "San Francisco, CA",
  available: true,
} as const;

// ─── Navigation (single source of truth) ────────────────────────────────────
// All non-home entries are on-page section anchors (#) so they work
// from the homepage without requiring separate route pages.
export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Publications", href: "/publications" },
  { label: "Contact", href: "#contact" },
];

// ─── Primary CTA ─────────────────────────────────────────────────────────────
export const primaryCTA = {
  label: "View My Work",
  href: "#projects",
} as const;
