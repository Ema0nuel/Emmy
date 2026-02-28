import React from "react";
import { FaRocket, FaCloud, FaServer } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import { SiTypescript } from "react-icons/si";
import { SiOpenai } from "react-icons/si";
import SkillLayer from "./SkillLayer";
import SkillCard from "./SkillCard";

const LayerFour = () => {
  const skills = [
    { title: "Advanced TypeScript", proficiency: 80, Icon: SiTypescript },
    { title: "Server-Side Rendering", proficiency: 82, Icon: FaServer },
    { title: "AI Engineering", proficiency: 72, Icon: SiOpenai },
    { title: "Cloud Computing", proficiency: 75, Icon: FaCloud },
    { title: "Next.js Architecture", proficiency: 84, Icon: RiNextjsFill },
    { title: "VPS Management", proficiency: 70, Icon: FaRocket },
  ];

  return (
    <SkillLayer
      title="Emerging Focus"
      description="Currently diving deep into backend development, cloud infrastructure, advanced TypeScript patterns, and AI-powered application development to expand my skillset."
      index={3}
    >
      {skills.map((skill) => (
        <SkillCard
          key={skill.title}
          title={skill.title}
          proficiency={skill.proficiency}
          icon={skill.Icon}
        />
      ))}
    </SkillLayer>
  );
};

export default LayerFour;
