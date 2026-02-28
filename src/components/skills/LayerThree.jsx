import React from "react";
import { FaPalette, FaWandMagicSparkles } from "react-icons/fa6";
import { SiMaterialdesignicons } from "react-icons/si";
import { GrSystem } from "react-icons/gr";
import { FaCloud, FaSquareFull } from "react-icons/fa";
import SkillLayer from "./SkillLayer";
import SkillCard from "./SkillCard";

const LayerThree = () => {
  const skills = [
    { title: "UI System Design", proficiency: 85, Icon: FaPalette },
    {
      title: "Animation Architecture",
      proficiency: 88,
      Icon: FaWandMagicSparkles,
    },
    { title: "Glassmorphism", proficiency: 90, Icon: FaSquareFull },
    {
      title: "Responsive Systems",
      proficiency: 92,
      Icon: SiMaterialdesignicons,
    },
    { title: "Design Architecture", proficiency: 84, Icon: GrSystem },
    { title: "Cloud Management", proficiency: 76, Icon: FaCloud },
  ];

  return (
    <SkillLayer
      title="Design & Motion"
      description="Expertise in crafting intuitive UI components, implementing sophisticated animations, and designing scalable design systems with modern aesthetics."
      index={2}
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

export default LayerThree;
