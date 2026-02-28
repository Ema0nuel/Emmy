import React from "react";
import useScrollReveal from "../../hooks/useScrollReveal";

const SkillLayer = ({ title, description, children, index }) => {
  const ref = useScrollReveal(0.15);

  return (
    <div
      ref={ref}
      className={`w-full py-12 md:py-16 px-4 reveal-item`}
      style={{ "--reveal-delay": `${index * 100}ms` }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Layer title and description */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-3 text-white">
            {title}
          </h2>
          <p className="text-sm md:text-base text-white/60 max-w-2xl">
            {description}
          </p>
        </div>

        {/* Grid of skill cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SkillLayer;
