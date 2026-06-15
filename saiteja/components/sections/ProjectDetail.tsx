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

function VideoPlayer({
  src,
  caption,
}: {
  src: string;
  caption?: string;
}) {
  return (
    <div className="relative">
      <div className="relative w-full bg-[#080808] aspect-video flex items-center justify-center group">
        <video
          key={src}
          controls
          preload="metadata"
          playsInline
          className="w-full h-full object-contain"
          onError={(e) => {
            (e.currentTarget as HTMLVideoElement).style.display = "none";
            const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
            if (placeholder) placeholder.style.display = "flex";
          }}
        >
          <source src={src} type="video/mp4" />
        </video>

        {/* Placeholder when file is absent */}
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
              <span className="text-primary-fixed">{src.split("/").pop()}</span>{" "}
              into <span className="text-primary-fixed">public/videos/</span>
            </p>
          </div>
        </div>
      </div>
      {caption && (
        <div className="px-5 py-3 border-t border-outline-variant/15 bg-surface-container-lowest">
          <span className="font-label text-xs uppercase tracking-widest text-outline">
            {caption}
          </span>
        </div>
      )}
    </div>
  );
}

function ProjectDemoSection({
  videoFile,
  videoLabel,
  additionalVideos,
}: {
  videoFile: string;
  videoLabel?: string;
  additionalVideos?: { src: string; label: string }[];
}) {
  const hasMore = additionalVideos && additionalVideos.length > 0;
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
          {hasMore ? `${1 + additionalVideos!.length} CLIPS` : "VIDEO"}
        </span>
      </div>

      {/* Main video */}
      <VideoPlayer src={videoFile} caption={videoLabel} />

      {/* Additional clips, stacked */}
      {hasMore &&
        additionalVideos!.map((v) => (
          <div key={v.src} className="border-t border-outline-variant/15">
            <VideoPlayer src={v.src} caption={v.label} />
          </div>
        ))}
    </div>
  );
}

function FuturePrototypesSection({
  prototypes,
}: {
  prototypes: { demoUrl: string; demoLabel: string; videos: { src: string; label: string }[] };
}) {
  return (
    <div className="border border-outline-variant/20 bg-surface-container-lowest">
      {/* Section header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-outline-variant/15">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary-fixed text-base">
            rocket_launch
          </span>
          <span className="font-label text-xs uppercase tracking-widest text-outline">
            Future Prototypes
          </span>
        </div>
        <a
          href={prototypes.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-label text-xs uppercase tracking-widest px-3 py-1.5 border border-primary-fixed/40 text-primary-fixed hover:bg-primary-fixed/5 transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">bolt</span>
          {prototypes.demoLabel}
          <span className="material-symbols-outlined text-sm">open_in_new</span>
        </a>
      </div>

      {/* 2-column grid on lg, single col on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-outline-variant/15">
        {prototypes.videos.map((v) => (
          <div key={v.src} className="bg-surface-container-lowest">
            <VideoPlayer src={v.src} caption={v.label} />
          </div>
        ))}
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
            href="/#deployments"
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

        <h1 className="font-headline text-4xl sm:text-6xl md:text-8xl italic leading-tight text-on-surface mb-6">
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
              className="font-label text-xs uppercase tracking-widest px-3.5 py-2 border border-outline-variant/30 text-outline"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action row — Live demo + GitHub */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-label text-xs uppercase tracking-widest px-4 py-2.5 bg-primary-fixed text-on-primary-fixed hover:bg-primary-fixed-dim transition-colors flex items-center gap-2 font-bold"
            >
              <span className="material-symbols-outlined text-sm">bolt</span>
              Live Demo
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </a>
          )}
          {project.github?.url && (
            <a
              href={project.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-label text-xs uppercase tracking-widest px-4 py-2.5 border border-primary-fixed/40 text-primary-fixed hover:bg-primary-fixed/5 transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">terminal</span>
              View Source on GitHub
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </a>
          )}
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="px-6 md:px-10 max-w-7xl mx-auto pb-32 space-y-2">

        {/* Metrics bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-outline-variant/15 border border-outline-variant/20">
          {project.metrics.map(({ label, value }) => (
            <div key={label} className="bg-surface p-8">
              <p className="font-label text-xs text-outline uppercase tracking-widest mb-2">
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

        {/* Description */}
        <div className="border border-outline-variant/20 bg-surface-container-lowest p-8 md:p-12">
          <p className="font-label text-[9px] text-outline uppercase tracking-widest mb-6">
            Summary
          </p>
          <p className="font-body text-on-surface-variant leading-relaxed text-justify hyphens-auto text-lg">
            {project.description}
          </p>
        </div>

        {/* Key Equations (highlighted) — only when present */}
        {project.keyEquations && (
          <div className="border border-primary-fixed/30 border-l-2 border-l-primary-fixed bg-surface-container-lowest">
            <div className="flex flex-wrap items-center justify-between gap-2 px-6 py-4 border-b border-outline-variant/15">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary-fixed text-base">functions</span>
                <span className="font-label text-xs uppercase tracking-widest text-outline">
                  Control Allocation
                </span>
              </div>
              <span className="font-label text-[9px] uppercase tracking-widest text-outline/50">
                {project.keyEquations.caption}
              </span>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              {project.keyEquations.blocks.map((b) => (
                <div key={b.heading}>
                  <p className="font-label text-[10px] text-primary-fixed uppercase tracking-widest mb-2">
                    {b.heading}
                  </p>
                  <pre className="font-label text-xs md:text-sm leading-relaxed text-secondary-fixed-dim whitespace-pre overflow-x-auto">
{b.body}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}

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
          <div className="p-6 md:p-8 overflow-x-auto">
            <pre className="font-label text-xs md:text-sm leading-relaxed text-secondary-fixed-dim whitespace-pre">
              {project.code}
            </pre>
          </div>
        </div>

        {/* Project Demo (main video + any additional clips) */}
        <ProjectDemoSection
          videoFile={project.videoFile}
          videoLabel={project.videoLabel}
          additionalVideos={project.additionalVideos}
        />

        {/* Future Prototypes (separate section, only when present) */}
        {project.futurePrototypes && (
          <FuturePrototypesSection prototypes={project.futurePrototypes} />
        )}

        {/* Bottom navigation */}
        <div className="pt-12 flex items-center justify-between border-t border-outline-variant/15">
          <Link
            href="/#deployments"
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
