"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center transition-all duration-300",
          isScrolled ? "backdrop-blur-sm bg-black/10" : "bg-transparent"
        )}
      >
        {/* Logo */}
        <Link
          href="#home"
          className="flex items-center gap-3 cursor-pointer mix-blend-difference text-white"
        >
          {/* Inline SVG logo */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none" className="w-8 h-8">
            <polygon points="60,8 104,30 104,74 60,96 16,74 16,30" stroke="currentColor" strokeWidth="3" fill="none"/>
            <polygon points="60,28 82,40 82,64 60,76 38,64 38,40" stroke="currentColor" strokeWidth="2" fill="none"/>
            <circle cx="60" cy="52" r="6" fill="currentColor"/>
            <line x1="60" y1="46" x2="60" y2="28" stroke="currentColor" strokeWidth="2"/>
            <line x1="65" y1="55" x2="82" y2="64" stroke="currentColor" strokeWidth="2"/>
            <line x1="55" y1="55" x2="38" y2="64" stroke="currentColor" strokeWidth="2"/>
            <circle cx="60" cy="8" r="4" fill="currentColor"/>
            <circle cx="104" cy="30" r="4" fill="currentColor"/>
            <circle cx="104" cy="74" r="4" fill="currentColor"/>
            <circle cx="60" cy="96" r="4" fill="currentColor"/>
            <circle cx="16" cy="74" r="4" fill="currentColor"/>
            <circle cx="16" cy="30" r="4" fill="currentColor"/>
          </svg>
          <span className="text-xl font-display font-bold tracking-widest uppercase">
            {SITE_CONFIG.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-12 text-sm tracking-widest font-medium uppercase mix-blend-difference text-white">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="hover:opacity-70 transition-opacity"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Contact Button */}
        <a
          href="#contact"
          className="hidden md:block border border-white/30 px-6 py-2 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 mix-blend-difference text-white"
        >
          Contact
        </a>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden mix-blend-difference text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={handleLinkClick}
                className="text-3xl font-display font-bold text-white uppercase tracking-widest hover:opacity-70 transition-opacity"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="border border-white px-8 py-3 rounded-full text-sm uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </>
  );
}
