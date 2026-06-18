import type { Metadata } from "next";
import { Space_Grotesk, Orbitron } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rao Muhammad Ali | SQA Engineer Portfolio",
  description:
    "Senior Software Quality Assurance Engineer Rao Muhammad Ali specializing in test automation, performance testing, and quality-driven development. Explore my projects, skills, and experience.",
  keywords: [
    "SQA Engineer",
    "Software Quality Assurance",
    "Test Automation",
    "QA Portfolio",
    "Selenium",
    "Cypress",
    "Performance Testing",
  ],
  authors: [{ name: "Rao Muhammad Ali" }],
  openGraph: {
    title: "Rao Muhammad Ali | SQA Engineer Portfolio",
    description:
      "Rao Muhammad Ali — Senior SQA Engineer specializing in test automation, performance testing, and quality-driven development.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${orbitron.variable}`}>
      <body className="bg-[#0f0f1a] text-white font-sans antialiased overflow-x-hidden">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
