import React, { useEffect, useState } from "react";
import { Code, Zap, Lock } from "lucide-react";
import { Link } from "react-router";

const ValueProposition = () => {
  const [isVisible, setIsVisible] = useState(false);

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

    const element = document.querySelector(".value-prop-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const pillars = [
    {
      id: 1,
      title: "Full Stack Web Applications",
      description:
        "End-to-end solutions built with React, TypeScript, Node.js, and modern databases. From responsive frontends to scalable backends, I deliver seamless user experiences and robust architecture.",
      icon: Code,
      delay: 0.1,
    },
    {
      id: 2,
      title: "Real-Time Systems",
      description:
        "High-performance applications with WebSocket integration, live data synchronization, and state management. Built for responsiveness and instant user feedback across distributed systems.",
      icon: Zap,
      delay: 0.2,
    },
    {
      id: 3,
      title: "Secure & Optimized",
      description:
        "Production-grade security practices including authentication, encryption, and API protection. Optimized for Core Web Vitals, accessibility, and performance across all devices.",
      icon: Lock,
      delay: 0.3,
    },
  ];

  return (
    <section
      className="value-prop-section relative w-full py-20 px-4 md:px-6 lg:px-8"
      id="value"
    >
      {/* Background gradient element */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-slate-900/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Headline Section */}
        <div
          className={`mb-16 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="value-prop-headline text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-6 leading-tight">
            Building production-ready web systems with performance and
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-300">
              precision
            </span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full" />
        </div>

        {/* Pillars Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className={`value-prop-pillar transition-all duration-700 ease-out ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: isVisible ? `${pillar.delay}s` : "0s",
                }}
              >
                {/* Glass Card Container */}
                <div className="group relative h-full p-6 md:p-8 rounded-2xl glass-card-pillar hover:glass-card-pillar-hover transition-all duration-500 cursor-default">
                  {/* Icon Container */}
                  <div className="mb-6 relative">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl glass-icon-bg group-hover:glass-icon-bg-hover transition-all duration-500">
                      <Icon className="w-7 h-7 text-cyan-300 group-hover:text-blue-200 transition-colors duration-500" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 leading-snug group-hover:text-blue-100 transition-colors duration-500">
                      {pillar.title}
                    </h3>
                    <p className="text-base text-white/70 leading-relaxed group-hover:text-white/85 transition-colors duration-500">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-blue-400/0 via-cyan-300/40 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-blue-400 via-cyan-300 to-transparent blur-xl" />
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div
          className={`mt-16 text-center transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: isVisible ? "0.4s" : "0s" }}
        >
          <p className="text-white/60 text-lg mb-6">
            Transform your vision into a scalable, production-grade digital
            product.
          </p>
          <Link
            to={"projects"}
            className="glass-button px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 group hover:shadow-xl transition-all duration-500"
          >
            Explore My Work
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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

export default ValueProposition;
