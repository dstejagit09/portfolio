"use client";

import { useState } from "react";

const PRESETS = [
  { name: "Chartreuse", hex: "#EAE95A", dim: "#CDCC40", onColor: "#1d1d00" },
  { name: "Phosphor",   hex: "#00FFB2", dim: "#00CC8E", onColor: "#002B20" },
  { name: "Signal",     hex: "#FF5C39", dim: "#CC4A2E", onColor: "#ffffff" },
  { name: "Cobalt",     hex: "#3A82FF", dim: "#2866CC", onColor: "#ffffff" },
  { name: "Amber",      hex: "#FFBF00", dim: "#CC9900", onColor: "#1A0A00" },
  { name: "Ultraviolet",hex: "#A788FA", dim: "#886FDB", onColor: "#1a0033" },
];

export function ColorPalette() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  const applyColor = (idx: number) => {
    const c = PRESETS[idx];
    const root = document.documentElement;
    root.style.setProperty("--color-primary-fixed", c.hex);
    root.style.setProperty("--color-primary-fixed-dim", c.dim);
    root.style.setProperty("--color-on-primary-fixed", c.onColor);
    root.style.setProperty("--color-primary-container", c.hex);
    setActive(idx);
  };

  return (
    <div className="fixed bottom-[52px] left-4 z-[150] flex flex-col items-start gap-2">
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-8 h-8 border border-outline-variant/40 bg-surface-container-high flex items-center justify-center hover:bg-surface-container-highest transition-colors"
        aria-label="Color palette"
        style={{ borderLeft: `3px solid ${PRESETS[active].hex}` }}
      >
        <span className="material-symbols-outlined text-on-surface-variant text-sm">
          palette
        </span>
      </button>

      {/* Swatches */}
      {open && (
        <div className="bg-surface-container-high border border-outline-variant/20 p-3 flex flex-col gap-2">
          <p className="font-label text-[9px] text-outline uppercase tracking-widest mb-1">
            Accent
          </p>
          {PRESETS.map((c, i) => (
            <button
              key={c.name}
              onClick={() => applyColor(i)}
              className="flex items-center gap-3 group w-full text-left"
              aria-label={c.name}
            >
              <span
                className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110"
                style={{
                  backgroundColor: c.hex,
                  outline: i === active ? `2px solid ${c.hex}` : "none",
                  outlineOffset: "2px",
                }}
              />
              <span className="font-label text-[9px] text-outline uppercase tracking-widest group-hover:text-on-surface transition-colors">
                {c.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
