import React from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

const FeaturedCaseStudy = ({ project }) => {
  if (!project) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="w-full py-20 px-6 bg-gradient-to-b from-white/10 via-transparent to-white/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-12 items-stretch"
        >
          {/* Image Side */}
          <motion.div
            variants={itemVariants}
            className="relative h-96 md:h-full rounded-2xl overflow-hidden glass-card-pillar border border-white/30"
          >
            <motion.img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-center space-y-8"
          >
            <div>
              <motion.span
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-2 glass-element rounded-full text-sm font-semibold text-white/60 mb-4 border border-white/30"
              >
                <TrendingUp size={16} />
                Featured Case Study
              </motion.span>
              <motion.h2
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold text-white mb-2"
              >
                {project.name}
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-lg text-white/60"
              >
                {project.role}
              </motion.p>
            </div>

            <motion.div variants={itemVariants} className="space-y-6">
              <div className="glass-card-pillar p-4 rounded-xl border border-white/30">
                <h3 className="text-lg font-bold text-white mb-2">
                  The Problem
                </h3>
                <p className="text-white/60 leading-relaxed text-sm">
                  {project.problem}
                </p>
              </div>

              <div className="glass-card-pillar p-4 rounded-xl border border-white/30">
                <h3 className="text-lg font-bold text-white mb-2">
                  The Solution
                </h3>
                <p className="text-white/60 leading-relaxed text-sm">
                  {project.solution}
                </p>
              </div>

              <div className="glass-card-pillar p-4 rounded-xl border border-white/30">
                <h3 className="text-lg font-bold text-white mb-2">
                  Architecture
                </h3>
                <p className="text-white/60 leading-relaxed text-sm">
                  {project.architecture}
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-3 pt-4">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 glass-card-pillar glass-card-pillar-hover rounded-lg font-medium border border-white/30 text-white/60 transition"
                >
                  View Live →
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 glass-card-pillar glass-card-pillar-hover rounded-lg font-medium border border-white/30 text-white/60 transition"
                >
                  View Code →
                </a>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCaseStudy;
