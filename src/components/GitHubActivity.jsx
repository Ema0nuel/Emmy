/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import {
  SiGithub,
  SiReact,
  SiNodedotjs,
  SiPython,
  SiTypescript,
  SiJavascript,
  SiRuby,
  SiGo,
  SiSvelte,
} from "react-icons/si";
import { AiFillStar, AiFillGithub } from "react-icons/ai";
import { BiGitBranch, BiCodeBlock } from "react-icons/bi";
import {
  useGitHubUser,
  useGitHubCommits,
  useGitHubRepos,
  useGitHubContributions,
} from "../hooks/useGitHub";

const GitHubActivity = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const { user, loading: userLoading, error: userError } = useGitHubUser();
  const {
    commits,
    loading: commitsLoading,
    error: commitsError,
  } = useGitHubCommits();
  const { repos, loading: reposLoading, error: reposError } = useGitHubRepos();
  const { stats, loading: statsLoading } = useGitHubContributions();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 },
    );

    const element = document.querySelector(".github-activity-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const getLanguageIcon = (language) => {
    const iconProps = { className: "w-4 h-4" };
    const languageLower = language?.toLowerCase();

    const iconMap = {
      typescript: <SiTypescript {...iconProps} style={{ color: "#3178C6" }} />,
      javascript: <SiJavascript {...iconProps} style={{ color: "#F7DF1E" }} />,
      python: <SiPython {...iconProps} style={{ color: "#3776AB" }} />,
      react: <SiReact {...iconProps} style={{ color: "#61DAFB" }} />,
      "node.js": <SiNodedotjs {...iconProps} style={{ color: "#68A063" }} />,
      ruby: <SiRuby {...iconProps} style={{ color: "#CC342D" }} />,
      go: <SiGo {...iconProps} style={{ color: "#00ADD8" }} />,
      svelte: <SiSvelte {...iconProps} style={{ color: "#CC342D" }} />,
    };

    return (
      iconMap[languageLower] || (
        <BiCodeBlock {...iconProps} style={{ color: "#E0E0E0" }} />
      )
    );
  };

  const isLoading =
    userLoading || commitsLoading || reposLoading || statsLoading;
  const hasError = userError || commitsError || reposError;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: isVisible ? 0 : 0,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, x: -20 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  return (
    <section
      className="github-activity-section relative w-full py-24 px-4 md:px-6 lg:px-8 overflow-hidden"
      id="github-activity"
    >
      {/* Background gradient accents */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/4 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-20"
          animate={{
            y: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-20"
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="flex items-center gap-4 mb-4">
            <AiFillGithub className="w-10 h-10 text-white" />
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white">
              GitHub Activity
            </h2>
          </div>
          <p className="text-lg text-white/60 max-w-2xl">
            Real-time contributions, recent commits, and open-source projects.
            Updated every hour.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full mt-6" />
        </motion.div>

        {/* Error State */}
        {hasError && (
          <motion.div
            className="mb-8 p-6 bg-red-500/10 border border-red-500/30 rounded-2xl"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-red-300">
              Unable to load GitHub data. Please check your API token
              configuration.
            </p>
          </motion.div>
        )}

        {/* Tabs */}
        <motion.div
          className="mb-8 flex gap-4 border-b border-white/10 overflow-x-auto"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {["overview", "commits", "repositories"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium text-sm transition-all duration-300 capitalize border-b-2 whitespace-nowrap ${
                activeTab === tab
                  ? "border-cyan-400 text-cyan-300"
                  : "border-transparent text-white/60 hover:text-white/80"
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Loading State */}
        {isLoading ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="inline-block"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-8 h-8 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full" />
            </motion.div>
            <p className="text-white/60 mt-4">Loading GitHub data...</p>
          </motion.div>
        ) : (
          <>
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <motion.div
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={containerVariants}
              >
                {/* Stats Cards */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12"
                  variants={containerVariants}
                >
                  {[
                    {
                      label: "Public Repos",
                      value: stats.totalRepos,
                      icon: BiGitBranch,
                      color: "#3B82F6",
                      delay: 0.1,
                    },
                    {
                      label: "Followers",
                      value: stats.totalFollowers,
                      icon: AiFillStar,
                      color: "#06B6D4",
                      delay: 0.2,
                    },
                    {
                      label: "GitHub Profile",
                      value: user?.login || "View",
                      icon: SiGithub,
                      color: "#10B981",
                      delay: 0.3,
                      isLink: true,
                    },
                    {
                      label: "Bio",
                      value: user?.bio?.substring(0, 20) || "Developer",
                      icon: BiCodeBlock,
                      color: "#A78BFA",
                      delay: 0.4,
                    },
                  ].map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div key={idx} variants={itemVariants}>
                        <a
                          href={
                            stat.isLink
                              ? `https://github.com/${user?.login}`
                              : undefined
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative p-6 rounded-2xl glass-stat-card hover:glass-stat-card-hover transition-all duration-500 block h-full"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <motion.div
                              className="p-3 rounded-xl transition-all duration-500"
                              style={{
                                background: `${stat.color}15`,
                                border: `1px solid ${stat.color}40`,
                              }}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Icon
                                className="w-6 h-6"
                                style={{ color: stat.color }}
                              />
                            </motion.div>
                          </div>
                          <div>
                            <p className="text-white/60 text-sm font-medium mb-1">
                              {stat.label}
                            </p>
                            <p className="text-2xl font-bold text-white">
                              {stat.value}
                            </p>
                          </div>
                          {stat.isLink && (
                            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-blue-400 via-cyan-300 to-transparent blur-xl" />
                          )}
                        </a>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Recent Activity Preview */}
                <motion.div
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                  variants={containerVariants}
                >
                  {/* Recent Commits */}
                  <motion.div variants={itemVariants}>
                    <h3 className="text-xl font-semibold text-white mb-6">
                      Recent Commits
                    </h3>
                    <motion.div
                      className="space-y-3 max-h-72 overflow-y-auto"
                      variants={containerVariants}
                    >
                      {commits.slice(0, 5).map((commit, idx) => (
                        <motion.a
                          key={commit.id}
                          href={commit.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group p-4 rounded-xl glass-commit-card hover:bg-white/10 transition-all duration-300 block"
                          variants={itemVariants}
                          whileHover={{ x: 4 }}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-cyan-300 mb-1 truncate">
                                {commit.repo.split("/").pop()}
                              </p>
                              <p className="text-sm text-white/70 truncate group-hover:text-white/90 transition-colors">
                                {commit.message.substring(0, 60)}...
                              </p>
                            </div>
                            <span className="text-xs text-white/50 whitespace-nowrap">
                              {formatDistanceToNow(new Date(commit.timestamp), {
                                addSuffix: true,
                              })}
                            </span>
                          </div>
                        </motion.a>
                      ))}
                    </motion.div>
                  </motion.div>

                  {/* Top Repos Preview */}
                  <motion.div variants={itemVariants}>
                    <h3 className="text-xl font-semibold text-white mb-6">
                      Top Repositories
                    </h3>
                    <motion.div
                      className="space-y-3 max-h-72 overflow-y-auto"
                      variants={containerVariants}
                    >
                      {repos.slice(0, 5).map((repo) => (
                        <motion.a
                          key={repo.id}
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group p-4 rounded-xl glass-repo-card hover:bg-white/10 transition-all duration-300"
                          variants={itemVariants}
                          whileHover={{ x: 4 }}
                        >
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <p className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                              {repo.name}
                            </p>
                            <div className="flex items-center gap-1 text-yellow-400">
                              <AiFillStar className="w-4 h-4" />
                              <span className="text-xs font-bold">
                                {repo.stars}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-white/60 mb-2 line-clamp-1">
                            {repo.description || "No description"}
                          </p>
                          <div className="flex items-center gap-2">
                            {repo.language && (
                              <>
                                {getLanguageIcon(repo.language)}
                                <span className="text-xs text-white/50">
                                  {repo.language}
                                </span>
                              </>
                            )}
                            {repo.forks > 0 && (
                              <span className="text-xs text-white/50 ml-auto flex items-center gap-1">
                                <BiGitBranch className="w-3 h-3" />
                                {repo.forks}
                              </span>
                            )}
                          </div>
                        </motion.a>
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {/* COMMITS TAB */}
            {activeTab === "commits" && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <motion.div className="space-y-3">
                  {commits.length > 0 ? (
                    commits.map((commit, idx) => (
                      <motion.a
                        key={commit.id}
                        href={commit.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-5 rounded-xl glass-commit-card hover:bg-white/10 transition-all duration-300 block"
                        variants={itemVariants}
                        whileHover={{
                          x: 6,
                          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                        }}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-blue-500/15 text-cyan-300 text-xs font-semibold">
                                <BiGitBranch className="w-3 h-3" />
                                {commit.repo.split("/").pop()}
                              </span>
                            </div>
                            <p className="text-base text-white font-medium group-hover:text-cyan-300 transition-colors mb-2">
                              {commit.message}
                            </p>
                            <p className="text-sm text-white/60">
                              {commit.count} commit{commit.count > 1 ? "s" : ""}
                            </p>
                          </div>
                          <span className="text-sm text-white/50 whitespace-nowrap">
                            {formatDistanceToNow(new Date(commit.timestamp), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                      </motion.a>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-white/60">No recent commits found</p>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}

            {/* REPOSITORIES TAB */}
            {activeTab === "repositories" && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {repos.length > 0 ? (
                    repos.map((repo, idx) => (
                      <motion.a
                        key={repo.id}
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative p-6 rounded-2xl glass-repo-full hover:glass-repo-full-hover transition-all duration-500 flex flex-col h-full"
                        variants={itemVariants}
                        whileHover={{
                          y: -8,
                          boxShadow:
                            "0 20px 40px rgba(6, 182, 212, 0.15), 0 0 60px rgba(59, 130, 246, 0.1)",
                        }}
                      >
                        {/* Glow effect */}
                        <div
                          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-blue-400 via-cyan-300 to-transparent blur-xl"
                          aria-hidden="true"
                        />

                        {/* Content */}
                        <div className="relative z-10 flex-1">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors flex-1 break-words line-clamp-2">
                              {repo.name}
                            </h3>
                            <motion.div
                              className="flex items-center gap-1 text-yellow-400 flex-shrink-0 ml-2"
                              whileHover={{ scale: 1.15 }}
                            >
                              <AiFillStar className="w-5 h-5" />
                              <span className="text-xs font-bold whitespace-nowrap">
                                {repo.stars}
                              </span>
                            </motion.div>
                          </div>

                          {/* Description */}
                          <p className="text-sm text-white/70 mb-4 line-clamp-2 flex-grow">
                            {repo.description || "No description provided"}
                          </p>

                          {/* Language & Stats Section */}
                          <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/10 mb-4">
                            {repo.language && (
                              <motion.div
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5"
                                whileHover={{ bg: "rgba(255,255,255,0.1)" }}
                              >
                                {getLanguageIcon(repo.language)}
                                <span className="text-xs font-medium text-white/80">
                                  {repo.language}
                                </span>
                              </motion.div>
                            )}

                            {repo.forks > 0 && (
                              <motion.div
                                className="flex items-center gap-1 text-white/60 px-2"
                                whileHover={{ color: "rgba(255,255,255,0.8)" }}
                              >
                                <BiGitBranch className="w-4 h-4" />
                                <span className="text-xs font-medium">
                                  {repo.forks}
                                </span>
                              </motion.div>
                            )}
                          </div>

                          {/* Topics Pills */}
                          {repo.topics?.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {repo.topics.slice(0, 3).map((topic) => (
                                <motion.span
                                  key={topic}
                                  className="px-2.5 py-1 text-xs rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-medium"
                                  whileHover={{
                                    background: "rgba(34, 211, 238, 0.25)",
                                  }}
                                >
                                  #{topic}
                                </motion.span>
                              ))}
                              {repo.topics.length > 3 && (
                                <span className="px-2.5 py-1 text-xs rounded-full bg-white/5 text-white/60">
                                  +{repo.topics.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Bottom CTA Arrow */}
                        <motion.div
                          className="mt-4 flex items-center text-cyan-300 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                          initial={{ x: 0 }}
                          whileHover={{ x: 4 }}
                        >
                          View on GitHub
                          <svg
                            className="w-3 h-3 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </motion.div>
                      </motion.a>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <p className="text-white/60">
                        No public repositories found
                      </p>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </>
        )}

        {/* CTA Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
            Explore more of my open-source contributions and projects on GitHub.
          </p>
          <motion.a
            href={`https://github.com/${import.meta.env.VITE_GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-button px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 group hover:shadow-xl transition-all duration-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <AiFillGithub className="w-5 h-5" />
            View Full Profile
            <motion.svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: [0, 4, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </motion.svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubActivity;
