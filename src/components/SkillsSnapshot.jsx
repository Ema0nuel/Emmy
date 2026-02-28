import React, { useEffect, useState } from "react";
import {
  SiReact,
  SiNodedotjs,
  SiSupabase,
  SiTailwindcss,
} from "react-icons/si";
import { HiOutlineLightBulb } from "react-icons/hi";
import { Link } from "react-router";

const SkillsSnapshot = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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

    const element = document.querySelector(".skills-snapshot-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const skills = [
    {
      id: 1,
      name: "React",
      icon: SiReact,
      color: "#61DAFB",
      bgColor: "from-blue-500/20 to-cyan-500/20",
      proficiency: 95,
      description:
        "Advanced component architecture, hooks, performance optimization",
      delay: 0.1,
    },
    {
      id: 2,
      name: "Node.js",
      icon: SiNodedotjs,
      color: "#68A063",
      bgColor: "from-green-500/20 to-emerald-500/20",
      proficiency: 90,
      description: "Express, RESTful APIs, async patterns, middleware design",
      delay: 0.2,
    },
    {
      id: 3,
      name: "Supabase",
      icon: SiSupabase,
      color: "#3ECF8E",
      bgColor: "from-emerald-500/20 to-green-500/20",
      proficiency: 88,
      description:
        "PostgreSQL, real-time subscriptions, auth flows, edge functions",
      delay: 0.3,
    },
    {
      id: 4,
      name: "Tailwind",
      icon: SiTailwindcss,
      color: "#06B6D4",
      bgColor: "from-cyan-500/20 to-blue-500/20",
      proficiency: 92,
      description: "Responsive design, custom theming, animation utilities",
      delay: 0.4,
    },
    {
      id: 5,
      name: "AI Engineer",
      icon: HiOutlineLightBulb,
      color: "#A78BFA",
      bgColor: "from-purple-500/20 to-pink-500/20",
      proficiency: 85,
      description:
        "LLM integration, prompt engineering, RAG systems, vector search",
      delay: 0.5,
    },
  ];

  // Determine if skill card should show expanded state
  const isSkillExpanded = (id) => {
    if (isMobile) return true; // Always expanded on mobile
    return hoveredSkill === id; // Hover-based on desktop
  };

  return (
    <section
      className="skills-snapshot-section relative w-full py-24 px-4 md:px-6 lg:px-8 overflow-hidden"
      id="skills-snapshot"
    >
      {/* Background gradient accent */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          className={`mb-16 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-4">
            Core Competencies
          </h2>
          <p className="text-lg text-white/60 max-w-2xl">
            Specialized in full-stack development with deep expertise in modern
            web technologies and AI integration.
            {!isMobile && (
              <span>
                {" "}
                Hover to reveal proficiency levels and detailed capabilities.
              </span>
            )}
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mt-6" />
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          {skills.map((skill) => {
            const Icon = skill.icon;
            const isExpanded = isSkillExpanded(skill.id);

            return (
              <div
                key={skill.id}
                className={`transition-all duration-700 ease-out ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: isVisible ? `${skill.delay}s` : "0s",
                }}
              >
                <div
                  className="relative group cursor-pointer h-full"
                  onMouseEnter={() => !isMobile && setHoveredSkill(skill.id)}
                  onMouseLeave={() => !isMobile && setHoveredSkill(null)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${skill.name} skill card with ${skill.proficiency}% proficiency`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setHoveredSkill(
                        hoveredSkill === skill.id ? null : skill.id,
                      );
                    }
                  }}
                >
                  {/* Glow Ring Effect */}
                  <div
                    className={`absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none ${
                      isExpanded ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      boxShadow: `0 0 20px ${skill.color}40, inset 0 0 20px ${skill.color}20`,
                    }}
                    aria-hidden="true"
                  />

                  {/* Glass Card Container */}
                  <div
                    className={`relative p-6 md:p-8 rounded-2xl backdrop-blur-sm transition-all duration-500 h-full flex flex-col ${
                      isExpanded
                        ? "bg-white/10 border-white/25 shadow-xl"
                        : "bg-white/06 border-white/12 shadow-lg"
                    }`}
                    style={{
                      border: `1px solid ${
                        isExpanded
                          ? "rgba(255,255,255,0.25)"
                          : "rgba(255,255,255,0.12)"
                      }`,
                      background: isExpanded
                        ? `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05)), linear-gradient(${skill.bgColor})`
                        : `linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))`,
                    }}
                  >
                    {/* Icon Container with Glow */}
                    <div className="mb-6 relative">
                      <div
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-xl transition-all duration-500 ${
                          isExpanded ? "scale-110" : "scale-100"
                        }`}
                        style={{
                          background: isExpanded
                            ? `linear-gradient(135deg, ${skill.color}25, ${skill.color}10)`
                            : `linear-gradient(135deg, ${skill.color}15, ${skill.color}05)`,
                          border: `1.5px solid ${skill.color}40`,
                          boxShadow: isExpanded
                            ? `0 0 20px ${skill.color}60, inset 0 0 10px ${skill.color}30`
                            : `0 0 8px ${skill.color}30`,
                        }}
                      >
                        <Icon
                          className={`w-8 h-8 transition-all duration-500 ${
                            isExpanded ? "scale-110" : "scale-100"
                          }`}
                          style={{
                            color: skill.color,
                            filter: isExpanded
                              ? `drop-shadow(0 0 8px ${skill.color})`
                              : "none",
                          }}
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    {/* Skill Name & Proficiency */}
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-white/95 transition-colors duration-500">
                        {skill.name}
                      </h3>

                      {/* Proficiency Indicator - Mobile: Always visible, Desktop: Hover reveal */}
                      <div
                        className={`mb-4 transition-all duration-500 overflow-hidden ${
                          isExpanded
                            ? "opacity-100 max-h-20"
                            : "opacity-0 max-h-0"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-white/70">
                            Proficiency
                          </span>
                          <span
                            className="text-xs font-bold"
                            style={{ color: skill.color }}
                          >
                            {skill.proficiency}%
                          </span>
                        </div>

                        {/* Animated Progress Bar */}
                        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden border border-white/15">
                          <div
                            className="h-full rounded-full transition-all duration-700 ease-out"
                            style={{
                              width: isExpanded
                                ? `${skill.proficiency}%`
                                : "0%",
                              background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
                              boxShadow: `0 0 8px ${skill.color}`,
                            }}
                            role="progressbar"
                            aria-valuenow={isExpanded ? skill.proficiency : 0}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label={`${skill.name} proficiency`}
                          />
                        </div>
                      </div>

                      {/* Description - Mobile: Always visible, Desktop: Hover reveal */}
                      <p
                        className={`text-sm leading-relaxed transition-all duration-500 overflow-hidden ${
                          isExpanded
                            ? "opacity-100 max-h-24"
                            : "opacity-0 max-h-0"
                        }`}
                        style={{ color: "rgba(255,255,255,0.7)" }}
                      >
                        {skill.description}
                      </p>
                    </div>

                    {/* Bottom Accent Line on Hover/Expand */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl transition-all duration-500 ${
                        isExpanded ? "opacity-100" : "opacity-0"
                      }`}
                      style={{
                        background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)`,
                      }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div
          className={`mt-20 text-center transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: isVisible ? "0.6s" : "0s" }}
        >
          <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
            3+ years of combined experience across frontend, backend, and
            emerging AI technologies. Always learning, always building.
          </p>
          <Link
            to={"skills"}
            className="glass-button px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 group hover:shadow-xl transition-all duration-500"
          >
            View Detailed Skills
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SkillsSnapshot;
