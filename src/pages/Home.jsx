import React, { useEffect } from "react";
import { useSEO } from "../hooks/useSEO";
import Hero from "../components/Hero";
import ValueProposition from "../components/ValueProposition";
import SkillsSnapshot from "../components/SkillsSnapshot";
import GitHubActivity from "../components/GitHubActivity";
import CTASection from "../components/CTASection";

const Home = () => {
  // SEO Configuration
  useSEO({
    title: "Emmanuel Sunday | Full Stack Developer & Creative Engineer",
    description:
      "3+ years of web development experience. Specializing in React, TypeScript, Node.js, and full-stack applications.",
    keywords:
      "Frontend Developer, Backend Developer, React, TypeScript, Node.js, Web Development, Full Stack",
    canonicalUrl: "https://codenuel.vercel.app",
    openGraph: {
      title: "Emmanuel Sunday | Full Stack Developer & Creative Engineer",
      description:
        "Explore my portfolio showcasing full-stack web development, creative engineering, and innovative digital solutions.",
      url: "https://codenuel.vercel.app",
      type: "website",
      image: "https://codenuel.vercel.app/og-image.jpg",
      image_alt: "Emmanuel Sunday Portfolio",
      site_name: "Emmanuel Sunday Portfolio",
    },
    twitter: {
      card: "summary_large_image",
      title: "Emmanuel Sunday | Full Stack Developer & Creative Engineer",
      description:
        "3+ years of web development experience. Specializing in React, TypeScript, Node.js, and full-stack applications.",
      image: "https://codenuel.vercel.app/og-image.jpg",
      creator: "@codewithnuel",
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Emmanuel Sunday",
      url: "https://codenuel.vercel.app",
      jobTitle: "Full Stack Developer",
      description:
        "3+ years of web development experience. Specializing in React, TypeScript, Node.js, and full-stack applications.",
      image: "https://codenuel.vercel.app/profile.jpg",
      sameAs: [
        "https://github.com/Ema0nuel",
        "https://www.linkedin.com/in/ema0nuel",
        "https://instagram.com/emsunday092",
      ],
    },
  });

  // Prevent body overflow on mount
  useEffect(() => {
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <main className="w-full">
      <Hero />
      <ValueProposition />
      <SkillsSnapshot />
      <GitHubActivity />
      <CTASection />
    </main>
  );
};

export default Home;
