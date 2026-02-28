import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const ProjectGrid = ({ projects, onCardClick }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="w-full py-16 px-6 bg-gradient-to-b from-transparent via-white/20 to-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              style={{ "--reveal-delay": `${idx * 100}ms` }}
            >
              <ProjectCard project={project} onCardClick={onCardClick} />
            </motion.div>
          ))}
        </motion.div>

        {projects.length === 0 && (
          <motion.div variants={itemVariants} className="text-center py-16">
            <p className="text-lg text-gray-500">
              No projects found. Try a different filter.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectGrid;
