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
          className="text-2xl font-display font-bold tracking-widest uppercase cursor-pointer glitch-hover mix-blend-difference text-white"
        >
          {SITE_CONFIG.name}
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
