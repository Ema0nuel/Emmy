/* eslint-disable no-unused-vars */
import React from "react";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { motion } from "framer-motion";
import styles from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: FaGithub,
      href: "https://github.com/Ema0nuel",
      label: "GitHub",
      color: "#E0E0E0",
      hoverColor: "#FFFFFF",
    },
    {
      icon: FaInstagram,
      href: "https://instagram.com/emsunday092",
      label: "Instagram",
      color: "#E0E0E0",
      hoverColor: "#E1306C",
    },
    {
      icon: FaLinkedinIn,
      href: "https://linkedin.com/in/ema0nuel",
      label: "LinkedIn",
      color: "#E0E0E0",
      hoverColor: "#0A66C2",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const iconVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.15, rotate: 5 },
  };

  return (
    <footer className={styles.footer}>
      <motion.div
        className={styles.container}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Social Links */}
        <div className={styles.socialWrapper}>
          <nav aria-label="Social media links" className={styles.socialLinks}>
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${social.label}`}
                  className={styles.socialLink}
                  variants={iconVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap={{ scale: 0.9 }}
                  title={social.label}
                >
                  <Icon
                    className={styles.icon}
                    style={{ color: social.color }}
                  />
                </motion.a>
              );
            })}
          </nav>
        </div>

        {/* Copyright Text */}
        <div className={styles.copyright}>
          <p>&copy; {currentYear} Emmanuel Sunday. All rights reserved.</p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
