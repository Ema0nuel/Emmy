/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [titleNumber, setTitleNumber] = useState(0);

  const titles = useMemo(
    () => [
      "Emmanuel Sunday",
      "Software Developer",
      "FullStack Engineer",
      "Web App Engineer",
      "Backend Developer",
      "React Engineer",
      "Node.js Architect",
      "Digital Product",
      "Systems Designer",
    ],
    [],
  );

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <section className="hero-section" id="hero">
      {/* Glass Card Container - Full Screen Height */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative h-screen w-full flex flex-col items-center justify-center px-6 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 md:py-16 lg:py-20 rounded-3xl md:rounded-4xl backdrop-blur-xl bg-white/12 border border-white/25 shadow-2xl mx-auto overflow-hidden"
      >
        {/* Rotating Title with Highlight Effect */}
        <motion.div className="relative h-40 sm:h-48 md:h-56 lg:h-64 flex items-center justify-center overflow-hidden w-full px-4 sm:px-6 md:px-8">
          {titles.map((title, index) => (
            <motion.span
              key={index}
              className="absolute text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 drop-shadow-xl whitespace-nowrap text-center leading-none line-clamp-1"
              initial={{ opacity: 0, y: 40 }}
              animate={
                titleNumber === index
                  ? {
                      opacity: 1,
                      y: 0,
                      textShadow: [
                        "0 0 20px rgba(34, 211, 238, 0.5)",
                        "0 0 40px rgba(59, 130, 246, 0.8)",
                        "0 0 60px rgba(147, 51, 234, 0.6)",
                        "0 0 40px rgba(59, 130, 246, 0.8)",
                        "0 0 20px rgba(34, 211, 238, 0.5)",
                      ],
                    }
                  : {
                      opacity: 0,
                      y: titleNumber > index ? -40 : 40,
                    }
              }
              transition={{
                type: "spring",
                stiffness: 50,
                damping: 15,
              }}
            >
              {title}
            </motion.span>
          ))}
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-sm sm:text-base md:text-lg lg:text-2xl xl:text-3xl text-white/75 mt-8 sm:mt-10 md:mt-12 lg:mt-14 text-center px-6 sm:px-8 md:px-10 lg:px-12 max-w-2xl font-medium tracking-wide"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Creative Developer & Problem Solver
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Hero;
