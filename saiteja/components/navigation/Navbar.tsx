"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "ARCHIVE",     href: "#archive" },
  { label: "SPECS",       href: "#telemetry" },
  { label: "BUILD LOG",   href: "#experience" },
  { label: "DEPLOYMENTS", href: "#bio" },
  { label: "MANIFEST",    href: "#manifest" },
  { label: "CONTACT",     href: "#contact" },
];

function HexWebLogo() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ color: "var(--color-primary-fixed)" }}
    >
      {/* Radial spokes from center to outer hex vertices */}
      <line x1="15" y1="15" x2="27" y2="15"    stroke="currentColor" strokeWidth="0.8" opacity="0.9" />
      <line x1="15" y1="15" x2="21" y2="25.39" stroke="currentColor" strokeWidth="0.8" opacity="0.9" />
      <line x1="15" y1="15" x2="9"  y2="25.39" stroke="currentColor" strokeWidth="0.8" opacity="0.9" />
      <line x1="15" y1="15" x2="3"  y2="15"    stroke="currentColor" strokeWidth="0.8" opacity="0.9" />
      <line x1="15" y1="15" x2="9"  y2="4.61"  stroke="currentColor" strokeWidth="0.8" opacity="0.9" />
      <line x1="15" y1="15" x2="21" y2="4.61"  stroke="currentColor" strokeWidth="0.8" opacity="0.9" />
      {/* Small inner hexagon (r=4) */}
      <polygon points="19,15 17,18.46 13,18.46 11,15 13,11.54 17,11.54" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.55" />
      {/* Medium hexagon (r=8) */}
      <polygon points="23,15 19,21.93 11,21.93 7,15 11,8.07 19,8.07" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.75" />
      {/* Outer hexagon (r=12) */}
      <polygon points="27,15 21,25.39 9,25.39 3,15 9,4.61 21,4.61" stroke="currentColor" strokeWidth="0.9" fill="none" opacity="1" />
      {/* Center dot */}
      <circle cx="15" cy="15" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function Navbar() {
  const [activeSection, setActiveSection] = useState("archive");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = ["bio", "deployments", "experience", "telemetry", "archive", "contact"];
    const sectionIds = ["bio", "contact", "experience", "telemetry", "archive"];

    const handleScroll = () => {
      // Iterate bottom-to-top: first section whose top <= 120px wins
      const orderedIds = ["contact", "manifest", "bio", "experience", "telemetry", "archive"];
      let current = "archive";
      for (const id of orderedIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          current = id;
          break;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className="bg-surface fixed top-0 w-full flex justify-between items-center px-10 py-6 z-[100]">
        {/* Logo — clicks back to top / archive */}
        <a href="#archive" aria-label="Home" className="flex items-center group">
          <HexWebLogo />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-10 items-center">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`font-label text-xs tracking-widest transition-colors duration-150 pb-1 ${
                  isActive
                    ? "text-primary-fixed border-b-2 border-primary-fixed"
                    : "text-secondary hover:text-primary-fixed"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex gap-6 items-center">
          <a
            href="https://github.com/dstejagit09"
            target="_blank"
            rel="noopener noreferrer"
            className="font-label text-xs tracking-widest text-secondary hover:text-primary-fixed transition-colors uppercase"
          >
            GITHUB
          </a>
          <a
            href="https://www.linkedin.com/in/sdasar38/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-label text-xs tracking-widest text-secondary hover:text-primary-fixed transition-colors uppercase"
          >
            LINKEDIN
          </a>
          <button
            className="md:hidden text-secondary hover:text-primary-fixed"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">
              {menuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {/* Separator */}
      <div className="bg-surface-container-lowest h-[1px] w-full fixed top-[84px] z-[99]" />

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-[85px] left-0 w-full bg-surface border-b border-outline-variant/20 z-[98] px-10 py-6 flex flex-col gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`font-label text-sm tracking-widest ${
                activeSection === link.href.slice(1) ? "text-primary-fixed" : "text-secondary"
              }`}
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-6 pt-2 border-t border-outline-variant/10">
            <a href="https://github.com/dstejagit09" target="_blank" rel="noopener noreferrer" className="font-label text-xs text-secondary tracking-widest uppercase">GITHUB</a>
            <a href="https://www.linkedin.com/in/sdasar38/" target="_blank" rel="noopener noreferrer" className="font-label text-xs text-secondary tracking-widest uppercase">LINKEDIN</a>
          </div>
        </div>
      )}
    </>
  );
}
