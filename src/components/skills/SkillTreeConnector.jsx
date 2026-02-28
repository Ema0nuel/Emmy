import React, { useRef, useEffect } from "react";
import useScrollReveal from "../../hooks/useScrollReveal";

const SkillTreeConnector = () => {
  const connectorRef = useRef(null);
  const ref = useScrollReveal(0.3);

  useEffect(() => {
    const element = connectorRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("connector-active");
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, []);

  return (
    <div
      ref={ref}
      className="flex justify-center py-8 md:py-12 relative reveal-item"
    >
      <svg
        ref={connectorRef}
        width="280"
        height="120"
        viewBox="0 0 280 120"
        className="connector-line w-full max-w-md"
      >
        {/* Left branch - animates from left */}
        <g className="tree-left">
          {/* Left vertical stem */}
          <line
            x1="40"
            y1="0"
            x2="40"
            y2="50"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="2"
          />
          {/* Left diagonal to center */}
          <line
            x1="40"
            y1="50"
            x2="140"
            y2="60"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="2"
          />
          {/* Left animated glow */}
          <line
            x1="40"
            y1="50"
            x2="140"
            y2="60"
            stroke="rgba(59, 130, 246, 0.8)"
            strokeWidth="2"
            className="connector-glow-left"
            strokeDasharray="110"
            strokeDashoffset="110"
          />
        </g>

        {/* Center node */}
        <circle
          cx="140"
          cy="60"
          r="4"
          fill="rgba(59, 130, 246, 0.6)"
          className="connector-node"
        />

        {/* Right branch - animates from right */}
        <g className="tree-right">
          {/* Right vertical stem */}
          <line
            x1="240"
            y1="0"
            x2="240"
            y2="50"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="2"
          />
          {/* Right diagonal to center */}
          <line
            x1="240"
            y1="50"
            x2="140"
            y2="60"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="2"
          />
          {/* Right animated glow */}
          <line
            x1="240"
            y1="50"
            x2="140"
            y2="60"
            stroke="rgba(59, 130, 246, 0.8)"
            strokeWidth="2"
            className="connector-glow-right"
            strokeDasharray="110"
            strokeDashoffset="110"
          />
        </g>

        {/* Bottom connection */}
        <line
          x1="140"
          y1="60"
          x2="140"
          y2="120"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

export default SkillTreeConnector;
