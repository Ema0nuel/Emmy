import React from "react";
import { FaNode, FaPython, FaDatabase } from "react-icons/fa";
import { SiExpress, SiSqlite, SiAmazonelasticache } from "react-icons/si";
import { GoGraph } from "react-icons/go";
import SkillLayer from "./SkillLayer";
import SkillCard from "./SkillCard";

const LayerTwo = () => {
  const skills = [
    { title: "Node.js", proficiency: 85, Icon: FaNode },
    { title: "Express", proficiency: 82, Icon: SiExpress },
    { title: "Python", proficiency: 78, Icon: FaPython },
    { title: "SQL", proficiency: 80, Icon: SiSqlite },
    { title: "REST APIs", proficiency: 88, Icon: GoGraph },
    {
      title: "Caching & Optimization",
      proficiency: 75,
      Icon: SiAmazonelasticache,
    },
  ];

  return (
    <SkillLayer
      title="Backend & Data"
      description="Emerging expertise in backend engineering and API design. Specializing in building scalable server-side applications with efficient data management."
      index={1}
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

export default LayerTwo;
