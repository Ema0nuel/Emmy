import React from "react";
import { motion } from "framer-motion";
import useGitHub from "../../hooks/githubData";
import { Github, GitBranch, Star } from "lucide-react";

const ProjectsGitHubActivity = () => {
  const { repos, totalStars, recentCommits, loading } = useGitHub();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  if (loading) {
    return (
      <section className="w-full py-16 px-6">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          Loading GitHub data...
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-16 px-6 bg-gradient-to-b from-transparent via-white/10 to-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center justify-center gap-2 mb-2">
              <Github size={28} className="text-blue-600" /> GitHub Activity
            </h2>
            <p className="text-white/60">
              Real-time contribution stats and recent commits
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-6"
          >
            {/* Repos Card */}
            <motion.div
              variants={itemVariants}
              className="glass-stat-card hover:glass-stat-card-hover rounded-2xl p-8 text-center transition border border-white/30"
              style={{ "--delay": "0ms" }}
            >
              <div className="flex justify-center mb-3">
                <div className="glass-icon-bg hover:glass-icon-bg-hover w-12 h-12 rounded-lg flex items-center justify-center transition">
                  <GitBranch size={24} className="text-blue-600" />
                </div>
              </div>
              <div className="text-4xl font-bold text-white mb-2">{repos}</div>
              <p className="text-white/60 font-medium">Public Repositories</p>
            </motion.div>

            {/* Stars Card */}
            <motion.div
              variants={itemVariants}
              className="glass-stat-card hover:glass-stat-card-hover rounded-2xl p-8 text-center transition border border-white/30"
              style={{ "--delay": "100ms" }}
            >
              <div className="flex justify-center mb-3">
                <div className="glass-icon-bg hover:glass-icon-bg-hover w-12 h-12 rounded-lg flex items-center justify-center transition">
                  <Star size={24} className="text-yellow-500" />
                </div>
              </div>
              <div className="text-4xl font-bold text-white mb-2">
                {totalStars}
              </div>
              <p className="text-white/60 font-medium">Total Stars</p>
            </motion.div>

            {/* Latest Card */}
            <motion.div
              variants={itemVariants}
              className="glass-stat-card hover:glass-stat-card-hover rounded-2xl p-8 text-center transition border border-white/30"
              style={{ "--delay": "200ms" }}
            >
              <div className="flex justify-center mb-3">
                <div className="glass-icon-bg hover:glass-icon-bg-hover w-12 h-12 rounded-lg flex items-center justify-center transition">
                  <Github size={24} className="text-green-600" />
                </div>
              </div>
              <div className="text-4xl font-bold text-white mb-2">
                {recentCommits.length}
              </div>
              <p className="text-white/60 font-medium">Recent Commits</p>
            </motion.div>
          </motion.div>

          {/* Recent Commits */}
          {recentCommits.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="glass-repo-full hover:glass-repo-full-hover rounded-2xl p-8 transition border border-white/30"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <GitBranch size={20} /> Recent Commits
              </h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {recentCommits.map((commit, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="flex items-start gap-4 pb-4 border-b border-white/20 last:border-0 glass-commit-card p-4 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white truncate">
                        {commit.message}
                      </p>
                      <p className="text-sm text-white/60 mt-1">
                        {commit.repo} ·{" "}
                        <code className="bg-gray-200/30 px-2 py-1 rounded text-xs">
                          {commit.sha}
                        </code>
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsGitHubActivity;
