"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import type { Project } from "@/lib/projects";

function ProjectVisualFrame({ src, alt }: { src: string; alt: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const update = () => {
      if (wrapRef.current) setScale(wrapRef.current.offsetWidth / 1080);
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

function VideoSection({ videoFile, title }: { videoFile: string; title: string }) {
  return (
    <div className="border border-outline-variant/20 bg-surface-container-lowest">
      {/* Section header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/15">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary-fixed text-base">
            videocam
          </span>
          <span className="font-label text-xs uppercase tracking-widest text-outline">
            Project Demo
          </span>
        </div>
        <span className="font-label text-[9px] uppercase tracking-widest text-outline/50">
          VIDEO
        </span>
      </div>

      {/* Video player */}
      <div className="relative w-full bg-[#080808] aspect-video flex items-center justify-center group">
        <video
          key={videoFile}
          controls
          preload="metadata"
          className="w-full h-full object-contain"
          onError={(e) => {
            (e.currentTarget as HTMLVideoElement).style.display = "none";
            const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
            if (placeholder) placeholder.style.display = "flex";
          }}
        >
          <source src={videoFile} type="video/mp4" />
        </video>

        {/* Placeholder — shown when video file is absent */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none"
          style={{ display: "none" }}
        >
          <div className="w-16 h-16 rounded-2xl border border-outline-variant/20 bg-surface-container flex items-center justify-center">
            <span className="material-symbols-outlined text-outline text-3xl">
              play_circle
            </span>
          </div>
          <div className="text-center">
            <p className="font-label text-xs text-outline uppercase tracking-widest mb-1">
              Video not yet uploaded
            </p>
            <p className="font-label text-[10px] text-outline/40 uppercase tracking-widest">
              Drop{" "}
              <span className="text-primary-fixed">{videoFile.split("/").pop()}</span>{" "}
              into <span className="text-primary-fixed">public/videos/</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectDetailClient({ project }: { project: Project }) {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      {/* ── Minimal top bar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-outline-variant/15 bg-surface/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
          <Link
            href="/#bio"
            className="flex items-center gap-2 font-label text-xs uppercase tracking-widest text-outline hover:text-primary-fixed transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Deployments
          </Link>

          <div className="flex items-center gap-4">
            <span className="font-label text-[9px] uppercase tracking-widest text-outline/40">
              {project.index}
            </span>
            <span className="font-label text-xs text-on-surface truncate max-w-[200px] md:max-w-none">
              {project.title}
            </span>
          </div>

          <span
            className="font-label text-[9px] uppercase tracking-widest px-2 py-1 border"
            style={{
              color: project.status === "ACTIVE" ? "#4ade80" : "var(--color-outline)",
              borderColor:
                project.status === "ACTIVE"
                  ? "rgba(74,222,128,0.25)"
                  : "var(--color-outline-variant)",
            }}
          >
            {project.status}
          </span>
        </div>
      </nav>

      {/* ── Hero ── */}
      <header className="pt-32 pb-20 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <span className="w-2 h-2 bg-primary-fixed" />
          <span className="font-label text-xs uppercase tracking-[0.3em] text-outline">
            [ PROJECT:{" "}
            <span className="text-primary-fixed">{project.index}</span> ] [ MODE:{" "}
            <span className="text-primary-fixed">DETAIL_VIEW</span> ]
          </span>
        </div>

        <h1 className="font-headline text-6xl md:text-8xl italic leading-tight text-on-surface mb-6">
          {project.title}
        </h1>

        <p className="font-label text-secondary text-sm uppercase tracking-widest mb-10">
          {project.period}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-label text-[9px] uppercase tracking-widest px-3 py-1.5 border border-outline-variant/30 text-outline"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="px-6 md:px-10 max-w-7xl mx-auto pb-32 space-y-2">

        {/* Metrics bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-outline-variant/15 border border-outline-variant/20">
          {project.metrics.map(({ label, value }) => (
            <div key={label} className="bg-surface p-8">
              <p className="font-label text-[9px] text-outline uppercase tracking-widest mb-2">
                {label}
              </p>
              <p className="font-label text-4xl text-primary-fixed leading-none">
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Visual */}
        <div className="border border-outline-variant/20 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/15 bg-surface-container-lowest">
            <span className="font-label text-xs uppercase tracking-widest text-outline">
              System Architecture
            </span>
            <span className="font-label text-[9px] uppercase tracking-widest text-outline/50">
              INTERACTIVE_DIAGRAM
            </span>
          </div>
          <ProjectVisualFrame src={project.visual} alt={project.visualAlt} />
        </div>

        {/* Overview */}
        <div className="border border-outline-variant/20 bg-surface-container-lowest p-8 md:p-12">
          <p className="font-label text-[9px] text-outline uppercase tracking-widest mb-6">
            Overview
          </p>
          <p className="font-body text-on-surface-variant leading-relaxed text-base max-w-3xl">
            {project.overview}
          </p>
        </div>

        {/* Sections — two column on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-outline-variant/15 border border-outline-variant/20">
          {project.sections.map(({ heading, body }) => (
            <div key={heading} className="bg-surface p-8 md:p-10">
              <div className="flex items-start gap-3 mb-5">
                <span className="w-1 h-full min-h-[1.5rem] bg-primary-fixed/40 mt-1 flex-shrink-0" />
                <h2 className="font-headline text-xl italic text-on-surface leading-snug">
                  {heading}
                </h2>
              </div>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed pl-4">
                {body}
              </p>
            </div>
          ))}
        </div>

        {/* Code snippet */}
        <div className="border border-outline-variant/20 bg-surface-container-lowest">
          <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/15">
            <span className="font-label text-xs uppercase tracking-widest text-outline">
              {project.codeFile}
            </span>
            <span className="material-symbols-outlined text-outline text-sm">
              {project.codeIcon}
            </span>
          </div>
          <div className="p-8">
            <pre className="font-label text-sm leading-relaxed text-secondary-fixed-dim whitespace-pre-wrap">
              {project.code}
            </pre>
          </div>
        </div>

        {/* Video */}
        <VideoSection videoFile={project.videoFile} title={project.title} />

        {/* Tools & Outcomes — side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-outline-variant/15 border border-outline-variant/20">
          {/* Tools */}
          <div className="bg-surface p-8 md:p-10">
            <p className="font-label text-[9px] text-outline uppercase tracking-widest mb-6">
              Tools & Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="font-label text-[9px] uppercase tracking-widest px-2.5 py-1.5 border border-outline-variant/30 text-primary-fixed"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Outcomes */}
          <div className="bg-surface-container-lowest p-8 md:p-10">
            <p className="font-label text-[9px] text-outline uppercase tracking-widest mb-6">
              Key Outcomes
            </p>
            <ul className="space-y-4">
              {project.outcomes.map((outcome, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-primary-fixed mt-1.5 flex-shrink-0" />
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                    {outcome}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom navigation */}
        <div className="pt-12 flex items-center justify-between border-t border-outline-variant/15">
          <Link
            href="/#bio"
            className="font-label text-xs uppercase tracking-widest text-outline hover:text-primary-fixed transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            All Deployments
          </Link>
          <Link
            href="/#contact"
            className="font-label text-xs uppercase tracking-widest px-5 py-2.5 border border-primary-fixed/40 text-primary-fixed hover:bg-primary-fixed/5 transition-colors"
          >
            Contact
          </Link>
        </div>
      </main>
    </div>
  );
}
