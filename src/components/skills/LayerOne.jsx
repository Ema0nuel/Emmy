import React from "react";
import { FaReact, FaDatabase } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiTailwindcss } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io5";
import SkillLayer from "./SkillLayer";
import SkillCard from "./SkillCard";

const LayerOne = () => {
  const skills = [
    { title: "TypeScript", proficiency: 90, Icon: SiTypescript },
    { title: "JavaScript", proficiency: 95, Icon: IoLogoJavascript },
    { title: "React", proficiency: 92, Icon: FaReact },
    { title: "Next.js", proficiency: 88, Icon: SiNextdotjs },
    { title: "Tailwind CSS", proficiency: 90, Icon: SiTailwindcss },
    { title: "PostgreSQL", proficiency: 85, Icon: FaDatabase },
  ];

  return (
    <SkillLayer
      title="Core Expertise"
      description="My strongest areas where I've built production systems and shipped numerous projects. Deep proficiency across modern frontend frameworks and databases."
      index={0}
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

export default LayerOne;
