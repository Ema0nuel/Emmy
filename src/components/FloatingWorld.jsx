/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/purity */
import React from "react";
import { motion } from "framer-motion";

const FloatingWorld = () => {
  // Generate random bubbles with consistent seed
  const bubbles = Array.from({ length: 16 }, (_, i) => {
    const seed = i;
    const rng = (s) => {
      const x = Math.sin(s) * 10000;
      return x - Math.floor(x);
    };

    return {
      id: i,
      cx: `${20 + rng(seed) * 60}%`,
      cy: `${20 + rng(seed + 1) * 60}%`,
      r: `${15 + rng(seed + 2) * 35}`,
      color: ["#06B6D4", "#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B", "#10B981"][
        Math.floor(rng(seed + 3) * 6)
      ],
      opacity: 0.1 + rng(seed + 4) * 0.3,
      delay: rng(seed + 5) * 0.8,
    };
  });

  return (
    <svg
      viewBox="0 0 500 500"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Animated floating world with bubbles and plane"
    >
      <defs>
        <radialGradient id="worldGradient">
          <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
        </radialGradient>

        <linearGradient id="planeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#FB923C" />
        </linearGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="softGlow">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      {/* Animated Bubbles */}
      {bubbles.map((bubble) => (
        <motion.circle
          key={bubble.id}
          cx={bubble.cx}
          cy={bubble.cy}
          r={bubble.r}
          fill={bubble.color}
          opacity={bubble.opacity}
          filter="url(#glow)"
          animate={{
            cy: [bubble.cy, `calc(${bubble.cy} - 40px)`, bubble.cy],
            opacity: [
              bubble.opacity * 0.5,
              bubble.opacity * 1.5,
              bubble.opacity,
            ],
            r: [bubble.r, `calc(${bubble.r} + 8)`, bubble.r],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: bubble.delay,
          }}
        />
      ))}

      {/* Central World Circle */}
      <motion.circle
        cx="250"
        cy="250"
        r="75"
        fill="url(#worldGradient)"
        stroke="#06B6D4"
        strokeWidth="2.5"
        opacity="0.7"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      {/* Ring 1 */}
      <motion.circle
        cx="250"
        cy="250"
        r="110"
        fill="none"
        stroke="#3B82F6"
        strokeWidth="1.5"
        opacity="0.25"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      />

      {/* Ring 2 - Reverse */}
      <motion.circle
        cx="250"
        cy="250"
        r="140"
        fill="none"
        stroke="#8B5CF6"
        strokeWidth="1"
        opacity="0.15"
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      />

      {/* Animated Plane */}
      <motion.g
        animate={{ offsetDistance: ["0%", "100%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{ offsetPath: "circle(145px at 250px 250px)" }}
      >
        {/* Plane body */}
        <rect
          x="220"
          y="240"
          width="60"
          height="20"
          rx="10"
          fill="url(#planeGradient)"
        />

        {/* Wings */}
        <polygon
          points="235,240 265,240 260,235 240,235"
          fill="#FB923C"
          opacity="0.9"
        />
        <polygon
          points="235,260 265,260 260,265 240,265"
          fill="#FB923C"
          opacity="0.7"
        />

        {/* Cockpit window */}
        <circle cx="245" cy="250" r="4" fill="#FFE4B5" opacity="0.9" />

        {/* Tail fin */}
        <polygon points="220,250 205,245 205,255" fill="#F97316" opacity="1" />

        {/* Trail glow */}
        <circle
          cx="250"
          cy="250"
          r="40"
          fill="#F97316"
          opacity="0.08"
          filter="url(#softGlow)"
        />
      </motion.g>

      {/* Decorative dots - Network points */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 8;
        const x = 250 + 130 * Math.cos(angle);
        const y = 250 + 130 * Math.sin(angle);

        return (
          <motion.circle
            key={`dot-${i}`}
            cx={x}
            cy={y}
            r="3.5"
            fill="#06B6D4"
            opacity="0.4"
            animate={{ opacity: [0.2, 0.7, 0.2] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.15,
            }}
          />
        );
      })}

      {/* Connecting network lines */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle1 = (i * Math.PI * 2) / 8;
        const angle2 = ((i + 1) * Math.PI * 2) / 8;
        const x1 = 250 + 130 * Math.cos(angle1);
        const y1 = 250 + 130 * Math.sin(angle1);
        const x2 = 250 + 130 * Math.cos(angle2);
        const y2 = 250 + 130 * Math.sin(angle2);

        return (
          <motion.line
            key={`line-${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#3B82F6"
            strokeWidth="0.8"
            opacity="0.1"
            animate={{ opacity: [0.05, 0.25, 0.05] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        );
      })}

      {/* Central pulse point */}
      <motion.circle
        cx="250"
        cy="250"
        r="5"
        fill="#06B6D4"
        animate={{ r: [5, 8, 5], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
};

export default FloatingWorld;
