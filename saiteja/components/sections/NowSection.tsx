const NOW_FEED = [
  "Validating MuJoCo to hardware sim-to-real on Crazyflie 2.1",
  "Extending SkySpeak AI for live demo and seed-grant review",
  "Interviewing for full-time robotics, controls, and UAV roles",
  "Graduating from ASU in May 2026",
];

export function NowSection() {
  return (
    <section
      id="now"
      className="px-6 md:px-10 pt-12 md:pt-20 pb-12 md:pb-20 max-w-7xl mx-auto"
    >
      {/* Status Bar */}
      <div className="mb-8 flex flex-wrap items-center gap-3 md:gap-4 text-[10px] font-label text-secondary tracking-[0.2em]">
        <span className="text-primary-fixed">[ FEED: LIVE ]</span>
        <span>[ MODE: NOW ]</span>
        <div className="hidden md:block h-[1px] flex-grow bg-outline-variant/20" />
        <span>SYS_TIME: APR 2026</span>
      </div>

      {/* Container */}
      <div className="max-w-3xl border border-outline-variant/20 bg-surface-container-lowest">
        {/* Header strip */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-outline-variant/15">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse shadow-[0_0_6px_var(--color-primary-fixed)]" />
            <span className="font-label text-xs uppercase tracking-[0.3em] text-primary-fixed">
              [ NOW: APR 2026 ]
            </span>
          </div>
          <span className="font-label text-[9px] uppercase tracking-widest text-outline/50">
            current_focus
          </span>
        </div>

        {/* Feed lines */}
        <ul className="divide-y divide-outline-variant/10">
          {NOW_FEED.map((line, i) => (
            <li
              key={i}
              className="flex items-start gap-3 px-5 py-3 font-label text-base text-on-surface-variant"
            >
              <span className="text-primary-fixed shrink-0 select-none">{">"}</span>
              <span className="leading-relaxed">{line}</span>
            </li>
          ))}
        </ul>

        {/* Footer cursor */}
        <div className="flex items-center gap-3 px-5 py-3 border-t border-outline-variant/15">
          <span className="text-primary-fixed/70 font-label text-sm">{">"}</span>
          <span className="w-2 h-4 bg-primary-fixed animate-pulse" />
        </div>
      </div>
    </section>
  );
}
