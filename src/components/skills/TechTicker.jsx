import React from "react";
import {
  FaReact,
  FaNode,
  FaPython,
  FaDatabase,
  FaGitAlt,
  FaDocker,
} from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiPostgresql } from "react-icons/si";

const TechTicker = () => {
  const techs = [
    { Icon: FaReact, name: "React", color: "#61DAFB" },
    { Icon: SiNextdotjs, name: "Next.js", color: "#FFFFFF" },
    { Icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
    { Icon: FaNode, name: "Node.js", color: "#68A063" },
    { Icon: SiPostgresql, name: "PostgreSQL", color: "#336791" },
    { Icon: FaPython, name: "Python", color: "#3776AB" },
    { Icon: FaDatabase, name: "Supabase", color: "#3ECF8E" },
    { Icon: FaGitAlt, name: "Git", color: "#F1502F" },
    { Icon: FaDocker, name: "Docker", color: "#2496ED" },
  ];

  return (
    <div className="w-full py-10 md:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Grid of tech icons */}
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-6 md:gap-8 items-center justify-center">
          {techs.map((tech, idx) => (
            <div
              key={`tech-${idx}`}
              className="flex flex-col items-center gap-3 group"
            >
              <div className="p-3 rounded-lg bg-white/5 group-hover:bg-white/10 transition-all duration-300">
                <tech.Icon
                  className="w-6 h-6 md:w-8 md:h-8 opacity-75 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: tech.color }}
                  aria-hidden="true"
                />
              </div>
              <span className="text-xs text-white/60 font-light text-center">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechTicker;
