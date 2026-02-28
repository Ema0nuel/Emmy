import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const ProjectCard = ({ project, onCardClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / 25;
    const y = (e.clientX - rect.left - rect.width / 2) / -25;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{
        rotateX: tilt.x,
        rotateY: tilt.y,
      }}
      whileHover={{ y: -8 }}
      onClick={() => onCardClick(project)}
      className="group relative h-full cursor-pointer reveal-item"
    >
      <div
        className={`relative h-full rounded-2xl overflow-hidden transition-all duration-300 ${
          isHovered
            ? "glass-card-pillar glass-card-pillar-hover border-white/40"
            : "glass-card-pillar border-white/30"
        }`}
      >
        {/* Image Container */}
        <div className="relative h-56 md:h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
          <motion.img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4 }}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Header */}
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              {project.category}
            </span>
            <h3 className="text-xl font-bold text-white mt-2 mb-1">
              {project.name}
            </h3>
            <p className="text-sm text-white/60 font-light">{project.role}</p>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tech.slice(0, 3).map((t, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 4 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="px-2.5 py-1 text-xs font-medium glass-element rounded-full border border-white/30 text-white/60"
              >
                {t}
              </motion.span>
            ))}
            {project.tech.length > 3 && (
              <span className="px-2.5 py-1 text-xs font-medium glass-element rounded-full border border-white/30 text-white/60">
                +{project.tech.length - 3}
              </span>
            )}
          </div>

          {/* Impact Statement */}
          <p className="text-sm text-white/60 line-clamp-2 leading-relaxed font-light">
            {project.impact}
          </p>

          {/* Buttons */}
          <motion.div
            className="flex gap-2 pt-4"
            initial={{ y: 8, opacity: 0 }}
            animate={isHovered ? { y: 0, opacity: 1 } : { y: 8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => onCardClick(project)}
              className="flex-1 px-3 py-2 glass-card-pillar glass-card-pillar-hover rounded-lg font-medium text-sm text-white/60 transition border border-white/30 hover:border-white/50"
            >
              View Details
            </button>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-3 py-2 glass-element rounded-lg border border-white/30 hover:glass-card-pillar-hover transition"
                title="View live project"
              >
                <ExternalLink size={16} />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-3 py-2 glass-element rounded-lg border border-white/30 hover:glass-card-pillar-hover transition"
                title="View source code"
              >
                <Github size={16} />
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
