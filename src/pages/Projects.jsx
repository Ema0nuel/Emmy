/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from "react";
import { useSEO } from "../hooks/useSEO";
import ProjectsHero from "../components/projects/ProjectsHero";
import ProjectGrid from "../components/projects/ProjectGrid";
import FeaturedCaseStudy from "../components/projects/FeaturedCaseStudy";
import ProjectsGitHubActivity from "../components/projects/ProjectsGitHubActivity";
import ProjectModal from "../components/projects/ProjectModal";
import projectsData from "../store/projectsData.json";

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Featured");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useSEO({
    title: "Projects - Emmanuel Sunday | Full Stack Developer",
    description:
      "Showcase of production-ready projects including full-stack applications, real-time systems, and backend architectures.",
    keywords:
      "Projects, Portfolio, React, Node.js, Full Stack, Web Development",
    canonicalUrl: "https://codewithnuel.com/projects",
    openGraph: {
      title: "Projects - Emmanuel Sunday",
      description:
        "Production-ready systems built with performance, scale, and real-time architecture in mind.",
      url: "https://codewithnuel.com/projects",
      type: "website",
      image: "https://codewithnuel.com/og-projects.jpg",
    },
  });

  const filteredProjects = useMemo(() => {
    let filtered = projectsData;

    if (activeCategory !== "All") {
      filtered = filtered.filter((p) => p.category === activeCategory);
    }

    if (sortBy === "Featured") {
      filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    } else if (sortBy === "Most Recent") {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return filtered;
  }, [activeCategory, sortBy]);

  const featuredProject = projectsData.find((p) => p.featured);

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  };

  return (
    <main className="w-full">
      <ProjectsHero />
      <ProjectGrid projects={filteredProjects} onCardClick={handleCardClick} />
      {featuredProject && <FeaturedCaseStudy project={featuredProject} />}
      <ProjectsGitHubActivity />

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
};

export default Projects;
