import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github } from "lucide-react";

const ProjectModal = ({ project, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div className="w-full max-w-3xl glass-card-pillar rounded-3xl overflow-hidden border border-white/40 relative">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-12 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 z-10 p-2 glass-element rounded-full transition hover:glass-card-pillar-hover"
              >
                <X size={24} className="text-gray-700" />
              </button>

              {/* Content */}
              <div className="max-h-[90vh] overflow-y-auto">
                {/* Hero Image */}
                <div className="relative h-96 bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                <div className="p-8 md:p-12 space-y-8">
                  {/* Title Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 text-sm font-semibold glass-element rounded-full border border-white/30 text-white/60">
                        {project.category}
                      </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                      {project.name}
                    </h1>
                    <p className="text-lg text-white/60">{project.role}</p>
                  </motion.div>

                  {/* Quick Links */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap gap-3"
                  >
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-3 glass-card-pillar glass-card-pillar-hover rounded-lg font-medium border border-white/40 text-white/60 transition"
                      >
                        <ExternalLink size={18} /> View Live
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-3 glass-card-pillar glass-card-pillar-hover rounded-lg font-medium border border-white/40 text-white/60 transition"
                      >
                        <Github size={18} /> View Code
                      </a>
                    )}
                  </motion.div>

                  {/* Overview */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-3"
                  >
                    <h2 className="text-2xl font-bold text-white">Overview</h2>
                    <p className="text-white/60 leading-relaxed">
                      {project.description}
                    </p>
                  </motion.div>

                  {/* Problem & Solution */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="grid md:grid-cols-2 gap-6"
                  >
                    <div className="glass-card-pillar p-6 rounded-2xl border border-white/30">
                      <h3 className="text-xl font-bold text-white mb-3">
                        The Problem
                      </h3>
                      <p className="text-white/60">{project.problem}</p>
                    </div>
                    <div className="glass-card-pillar p-6 rounded-2xl border border-white/30">
                      <h3 className="text-xl font-bold text-white mb-3">
                        The Solution
                      </h3>
                      <p className="text-white/60">{project.solution}</p>
                    </div>
                  </motion.div>

                  {/* Architecture */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="glass-card-pillar p-6 rounded-2xl border border-white/30"
                  >
                    <h3 className="text-xl font-bold text-white mb-3">
                      Architecture
                    </h3>
                    <p className="text-white/60">{project.architecture}</p>
                  </motion.div>

                  {/* Features */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-4">
                      Key Features
                    </h3>
                    <ul className="grid md:grid-cols-2 gap-3">
                      {project.features?.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="mt-1 w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          <span className="text-white/60">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Tech Stack */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-4">
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 glass-card-pillar rounded-lg font-medium text-sm border border-white/30 text-white/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Technical Decisions */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="glass-card-pillar p-6 rounded-2xl border border-white/30"
                  >
                    <h3 className="text-xl font-bold text-white mb-3">
                      Technical Decisions
                    </h3>
                    <p className="text-white/60">
                      {project.technicalDecisions}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
