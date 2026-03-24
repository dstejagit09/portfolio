"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { PROJECTS } from "@/lib/projects";

function ProjectVisual({ src, alt }: { src: string; alt: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const update = () => {
      if (wrapRef.current) {
        setScale(wrapRef.current.offsetWidth / 1080);
      }
    };
    update();
    const ro = new ResizeObserver(update);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  const scaledHeight = Math.round(760 * scale);

  return (
    <div
      ref={wrapRef}
      className="w-full overflow-hidden bg-[#0a0a0a]"
      style={{ height: `${scaledHeight}px` }}
      aria-label={alt}
    >
      <iframe
        src={src}
        title={alt}
        style={{
          width: "1080px",
          height: "760px",
          border: "none",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          pointerEvents: "none",
          filter: "brightness(1.35) contrast(1.05)",
        }}
      />
    </div>
  );
}

export function ProjectsShowcase() {
  return (
    <section id="bio" className="px-6 md:px-10 pt-28 pb-32 max-w-7xl mx-auto">
      {/* Section Header */}
      <header className="mb-24">
        <div className="flex items-center space-x-4 mb-4">
          <span className="w-3 h-3 bg-primary-fixed" />
          <span className="font-label text-sm uppercase tracking-[0.3em] text-outline">
            [ SYSTEM: READY ] [ MODE: DEPLOYMENTS ]
          </span>
        </div>
        <h1 className="font-headline text-7xl md:text-8xl italic leading-tight text-on-surface">
          Deployments
        </h1>
        <p className="font-label text-secondary mt-4 tracking-wider uppercase">
          Project Archive: 2024 to 2026
        </p>
      </header>

      {/* Projects — 3/12 | 6/12 | 3/12 layout */}
      <div className="space-y-24">
        {PROJECTS.map(({ index, slug, title, period, metrics, visual, visualAlt, codeFile, codeIcon, code, description, reversed }) => (
          <article
            key={index}
            className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-outline-variant/15 border border-outline-variant/20"
          >
            {/* Metrics column — 3 cols */}
            <div className={`lg:col-span-3 bg-surface p-8 flex flex-col ${reversed ? "order-1 lg:order-3" : "order-1"}`}>
              <div className="space-y-1 mb-8">
                <span className="font-label text-primary-fixed text-xs tracking-widest uppercase">
                  {index}
                </span>
                <Link href={`/projects/${slug}`}>
                  <h2 className="font-headline text-2xl italic text-on-surface leading-tight hover:text-primary-fixed transition-colors cursor-pointer">
                    {title}
                  </h2>
                </Link>
                <p className="font-label text-[10px] text-outline uppercase tracking-widest">
                  {period}
                </p>
              </div>

              <div className="border-l-2 border-primary-fixed/30 pl-6 space-y-6 flex-1">
                {metrics.map(({ label, value }) => (
                  <div key={label}>
                    <p className="font-label text-[9px] text-outline uppercase tracking-widest mb-1">
                      {label}
                    </p>
                    <p className="font-label text-xl text-primary-fixed leading-none">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              {/* View detail link */}
              <div className="mt-8 pt-6 border-t border-outline-variant/15">
                <Link
                  href={`/projects/${slug}`}
                  className="font-label text-[9px] uppercase tracking-widest text-outline hover:text-primary-fixed transition-colors flex items-center gap-2"
                >
                  <span>View Full Detail</span>
                  <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Visual column — 6 cols (center) — clickable */}
            <Link href={`/projects/${slug}`} className="lg:col-span-6 bg-surface-container-low overflow-hidden order-2 block group relative">
              <ProjectVisual src={visual} alt={visualAlt} />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary-fixed/0 group-hover:bg-primary-fixed/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="font-label text-[9px] uppercase tracking-widest text-primary-fixed bg-surface/90 px-3 py-1.5 border border-primary-fixed/30">
                  Open Detail View
                </span>
              </div>
            </Link>

            {/* Code column — 3 cols */}
            <div className={`lg:col-span-3 bg-surface-container-lowest p-8 flex flex-col ${reversed ? "order-3 lg:order-1 border-r border-outline-variant/10" : "order-3 border-l border-outline-variant/10"}`}>
              <div className="flex justify-between items-center mb-5">
                <span className="font-label text-[9px] text-outline uppercase tracking-widest truncate pr-2">{codeFile}</span>
                <span className="material-symbols-outlined text-outline text-sm shrink-0">{codeIcon}</span>
              </div>
              <pre className="text-[10px] leading-relaxed text-secondary-fixed-dim whitespace-pre-wrap font-label flex-1" style={{ letterSpacing: "-0.01em" }}>
                {code}
              </pre>
              <div className="mt-6 pt-6 border-t border-outline-variant/15">
                <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
