import React, { useState, useEffect, useRef } from "react";

const SkillCard = ({ title, proficiency = 85, icon: Icon }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const cardRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateProgress();
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const animateProgress = () => {
    let current = 0;
    const increment = proficiency / 30;
    const timer = setInterval(() => {
      current += increment;
      if (current >= proficiency) {
        setDisplayValue(proficiency);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, 16);
  };

  return (
    <div
      ref={cardRef}
      className="glass-card-pillar p-4 rounded-lg hover:glass-card-pillar-hover transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-3">
        {Icon && (
          <div className="glass-icon-bg p-2 rounded-md">
            <Icon className="w-5 h-5 text-blue-300" />
          </div>
        )}
        <h3 className="text-sm font-light text-white">{title}</h3>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-white/60">{displayValue}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full transition-all duration-500"
            style={{ width: `${displayValue}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
