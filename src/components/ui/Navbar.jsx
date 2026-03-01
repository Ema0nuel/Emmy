/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, User, Code, Zap, Mail, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.WebkitOverflowScrolling = "touch";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { label: "Home", path: "/", Icon: Home },
    { label: "About", path: "/about", Icon: User },
    { label: "Projects", path: "/projects", Icon: Code },
    { label: "Skills", path: "/skills", Icon: Zap },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Fixed Navbar - Transparent Background */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo - Glass Container */}
            <Link
              to="/"
              className="flex items-center gap-2 md:gap-3 group relative z-10 flex-shrink-0"
              aria-label="Emmanuel Sunday - Home"
            >
              <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg glass-element">
                {/* Glass Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/25 to-white/5 backdrop-blur-md border border-white/30"></div>

                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Code className="w-6 h-6 md:w-7 md:h-7 text-black/90 group-hover:text-black group-hover:rotate-12 transition-all duration-300" />
                </div>
              </div>

              {/* Logo Text */}
              <div className="hidden sm:flex flex-col gap-0.5">
                <span className="text-sm font-bold text-cyan-300/30 leading-none drop-shadow-lg">
                  Emmanuel
                </span>
                <span className="text-xs text-black/75 leading-none font-medium drop-shadow-md">
                  Developer
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Individual Glass Links */}
            <div className="hidden md:flex items-center gap-2 lg:gap-3">
              {navLinks.map(({ label, path, Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`group relative px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center gap-2 min-w-fit glass-element desktop-nav-link ${
                    isActive(path)
                      ? "bg-gradient-to-r from-white/25 to-white/15 text-white shadow-lg border border-white/50 backdrop-blur-md"
                      : "text-white/90 hover:text-black bg-white/0 hover:bg-gradient-to-r hover:from-white/20 hover:to-white/10 border border-transparent hover:border-white/30 backdrop-blur-sm"
                  }`}
                  aria-current={isActive(path) ? "page" : undefined}
                >
                  <Icon className="w-4 h-4 md:w-5 md:h-5 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6" />
                  <span className="hidden lg:inline">{label}</span>
                </Link>
              ))}
            </div>

            {/* CTA Button - Desktop */}
            <a
              href="mailto:emas08177@gmail.com"
              className="hidden md:flex items-center gap-2 px-5 md:px-6 py-2.5 rounded-lg bg-gradient-to-r from-white/25 to-white/15 hover:from-white/35 hover:to-white/25 border border-white/40 hover:border-white/60 text-white hover:text-black font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 group flex-shrink-0 backdrop-blur-md glass-element desktop-cta"
              aria-label="Send email to contact"
            >
              <Mail className="w-4 h-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
              <span>Get Touch</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative p-2 rounded-lg hover:bg-white/10 active:bg-white/20 transition-all duration-300 z-50"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={
                isOpen ? "Close navigation menu" : "Open navigation menu"
              }
            >
              {isOpen ? (
                <X className="w-6 h-6 text-white/90" strokeWidth={2.5} />
              ) : (
                <Menu className="w-6 h-6 text-white/90" strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Dark Background */}
      {isOpen && (
        <div
          className="fixed inset-0 top-16 z-30 md:hidden bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* Mobile Menu - Glass Cards */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="fixed top-16 left-0 right-0 z-40 md:hidden animate-in slide-in-from-top-2 duration-300 max-h-[calc(100vh-64px)] overflow-y-auto"
        >
          <div className="px-4 py-6 space-y-2">
            {/* Navigation Links - Glass Elements */}
            {navLinks.map(({ label, path, Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-lg font-medium text-base transition-all duration-300 glass-element ${
                  isActive(path)
                    ? "bg-gradient-to-r from-white/25 to-white/15 text-white border border-white/50 shadow-md backdrop-blur-md"
                    : "text-white/85 hover:text-white bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 backdrop-blur-sm"
                }`}
                aria-current={isActive(path) ? "page" : undefined}
              >
                <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                <span>{label}</span>
              </Link>
            ))}

            {/* Divider */}
            <div className="my-2 h-px bg-gradient-to-r from-white/0 via-white/20 to-white/0"></div>

            {/* CTA Button - Mobile Glass */}
            <a
              href="mailto:emas08177@gmail.com"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 border border-white/40 hover:border-white/60 text-white font-semibold text-base text-center transition-all duration-300 mt-3 glass-element backdrop-blur-md"
            >
              <Mail className="w-5 h-5" />
              Get in Touch
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
