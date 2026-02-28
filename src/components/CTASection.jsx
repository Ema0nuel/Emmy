import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  SiReact,
  SiNodedotjs,
  SiPython,
  SiTypescript,
  SiSvelte,
} from "react-icons/si";
import { FaCloud, FaCog, FaBolt } from "react-icons/fa";
import { GiJetpack } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import { BiLogoWhatsapp } from "react-icons/bi";
import FloatingWorld from "./FloatingWorld";
import styles from "./cta.module.css";

const CTASection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    const section = document.querySelector(`.${styles.ctaSection}`);
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left - rect.width / 2) * 0.05,
      y: (e.clientY - rect.top - rect.height / 2) * 0.05,
    });
  };

  const floatingIcons = [
    {
      Icon: FaCloud,
      color: "#06B6D4",
      duration: 5,
      delay: 0,
      top: "8%",
      left: "5%",
    },
    {
      Icon: FaCog,
      color: "#8B5CF6",
      duration: 6,
      delay: 0.2,
      top: "12%",
      right: "8%",
    },
    {
      Icon: FaBolt,
      color: "#F59E0B",
      duration: 7,
      delay: 0.4,
      bottom: "18%",
      left: "8%",
    },
    {
      Icon: SiReact,
      color: "#61DAFB",
      duration: 5.5,
      delay: 0.1,
      top: "55%",
      right: "6%",
    },
    {
      Icon: SiNodedotjs,
      color: "#68A063",
      duration: 6.5,
      delay: 0.3,
      bottom: "12%",
      right: "10%",
    },
    {
      Icon: SiTypescript,
      color: "#3178C6",
      duration: 7.5,
      delay: 0.5,
      top: "20%",
      left: "12%",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 12 },
    },
  };

  const phoneNumber =
    import.meta.env.VITE_CONTACT_PHONE?.replace(/^0/, "234") || "2349014773195";
  const email = import.meta.env.VITE_CONTACT_EMAIL || "emas08177@gmail.com";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=Hi%20Emmanuel%2C%20I%20want%20to%20discuss%20a%20project`;
  const emailUrl = `mailto:${email}?subject=Let's%20Build%20Something%20Amazing`;

  return (
    <section
      className={styles.ctaSection}
      onMouseMove={handleMouseMove}
      id="cta-section"
    >
      {/* Animated gradient background */}
      <div className={styles.bgGradients}>
        <motion.div
          className={styles.gradientOrb1}
          animate={{ y: [0, 40, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={styles.gradientOrb2}
          animate={{ y: [0, -40, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={styles.gradientOrb3}
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating World SVG */}
      <motion.div
        className={styles.worldContainer}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          isVisible ? { opacity: 0.12, scale: 1 } : { opacity: 0, scale: 0.8 }
        }
        transition={{ duration: 1 }}
        style={{
          transform: `translate(calc(-50% + ${mousePos.x}px), ${mousePos.y}px)`,
        }}
      >
        <FloatingWorld />
      </motion.div>

      {/* Floating Icons */}
      {floatingIcons.map((item, idx) => {
        const { Icon, color, duration, delay, ...position } = item;
        return (
          <motion.div
            key={idx}
            className={styles.floatingIcon}
            style={position}
            animate={{ y: [0, -25, 0], rotate: [0, 360] }}
            transition={{
              y: { duration, repeat: Infinity, ease: "easeInOut", delay },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            }}
          >
            <motion.div whileHover={{ scale: 1.2 }}>
              <div className={styles.iconGlow} style={{ background: color }} />
              <Icon className={styles.icon} style={{ color }} />
            </motion.div>
          </motion.div>
        );
      })}

      {/* Content */}
      <motion.div
        className={styles.content}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Headline */}
        <motion.div className={styles.headline} variants={itemVariants}>
          <h2 className={styles.mainHeading}>Let's Build Something Solid</h2>
        </motion.div>

        {/* Description */}
        <motion.p className={styles.description} variants={itemVariants}>
          From concept to reality. Let's create digital solutions that matter,
          innovate boldly, and deliver excellence together. Ready to get
          started?
        </motion.p>

        {/* CTA Buttons */}
        <motion.div className={styles.buttonGroup} variants={itemVariants}>
          {/* WhatsApp Button */}
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
            data-type="whatsapp"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className={styles.buttonWave}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 2] }}
              transition={{ duration: 0.6 }}
            />
            <BiLogoWhatsapp className={styles.buttonIcon} />
            <span>WhatsApp Me</span>
          </motion.a>

          {/* Email Button */}
          <motion.a
            href={emailUrl}
            className={styles.button}
            data-type="email"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className={styles.buttonWave}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 2] }}
              transition={{ duration: 0.6, delay: 0.1 }}
            />
            <MdEmail className={styles.buttonIcon} />
            <span>Send Email</span>
          </motion.a>
        </motion.div>

        {/* Availability Status */}
        <motion.div className={styles.availability} variants={itemVariants}>
          <motion.div
            className={styles.statusDot}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span>Available for new projects</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTASection;
