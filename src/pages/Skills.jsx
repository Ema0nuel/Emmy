import React, { useEffect } from "react";
import { useSEO } from "../hooks/useSEO";
import SkillsHero from "../components/skills/SkillsHero";
import LayerOne from "../components/skills/LayerOne";
import LayerTwo from "../components/skills/LayerTwo";
import SkillTreeConnector from "../components/skills/SkillTreeConnector";
import TechTicker from "../components/skills/TechTicker";
import LayerThree from "../components/skills/LayerThree";
import LayerFour from "../components/skills/LayerFour";

const Skills = () => {
  // SEO Configuration
  useSEO({
    title: "Skills - Emmanuel Sunday | Full Stack Developer",
    description:
      "Check out my technical skills in React, TypeScript, Node.js, Python, design systems, and emerging technologies.",
    keywords:
      "Skills, React, TypeScript, Node.js, Backend, Frontend, Web Development, Full Stack",
    canonicalUrl: "https://codenuel.vercel.app/skills",
    openGraph: {
      title: "Skills - Emmanuel Sunday",
      description:
        "My technical expertise across frontend, backend, and design.",
      url: "https://codenuel.vercel.app/skills",
      type: "website",
    },
  });

  useEffect(() => {
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <main className="w-full">
      <SkillsHero />
      <LayerOne />
      <SkillTreeConnector />
      <LayerTwo />
      <TechTicker />
      <LayerThree />
      <SkillTreeConnector />
      <LayerFour />
    </main>
  );
};

export default Skills;
