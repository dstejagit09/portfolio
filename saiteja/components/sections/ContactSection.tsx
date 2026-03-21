"use client";

import { useState } from "react";

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.open(`mailto:totobotplus@gmail.com?subject=${subject}&body=${body}`);
    setSent(true);
  };

  return (
    <section id="contact" className="px-6 md:px-10 pt-28 pb-40 max-w-7xl mx-auto">
      {/* Status Bar */}
      <div className="mb-10 flex items-center gap-4 text-[10px] font-label text-secondary tracking-[0.2em]">
        <span className="text-primary-fixed">[ SYSTEM: READY ]</span>
        <span>[ MODE: CONTACT ]</span>
        <div className="h-[1px] flex-grow bg-outline-variant/20" />
        <span>OPEN FOR OPPORTUNITIES</span>
      </div>

      {/* Section Title */}
      <div className="mb-20">
        <h1 className="text-6xl md:text-8xl font-headline font-light leading-tight italic">
          Initialize{" "}
          <span className="text-primary-fixed italic font-black">Contact</span>
        </h1>
        <p className="font-label text-secondary mt-4 tracking-wider uppercase text-sm">
          Available for full-time roles, internship roles, collaboration, and research roles
        </p>
      </div>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-surface-container-lowest border border-outline-variant/20">
        {/* Form */}
        <div className="lg:col-span-7 bg-surface p-10">
          {sent ? (
            <div className="flex flex-col items-start gap-6 py-16">
              <span className="w-3 h-3 bg-primary-fixed shadow-[0_0_8px_var(--color-primary-fixed)]" />
              <h2 className="font-headline text-4xl italic text-on-surface">
                Message Queued
              </h2>
              <p className="font-label text-sm text-secondary tracking-wider">
                Your email client has been opened. Signal received.
              </p>
              <button
                onClick={() => setSent(false)}
                className="font-label text-xs text-primary-fixed uppercase tracking-widest hover:opacity-70 transition-opacity"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="space-y-2">
                <label className="block font-label text-[10px] text-outline uppercase tracking-widest">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-transparent border-b border-outline-variant/40 focus:border-primary-fixed text-on-surface font-label text-sm py-3 outline-none transition-colors placeholder:text-on-surface-variant/40"
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-label text-[10px] text-outline uppercase tracking-widest">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-transparent border-b border-outline-variant/40 focus:border-primary-fixed text-on-surface font-label text-sm py-3 outline-none transition-colors placeholder:text-on-surface-variant/40"
                  placeholder="your@email.com"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-label text-[10px] text-outline uppercase tracking-widest">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-transparent border-b border-outline-variant/40 focus:border-primary-fixed text-on-surface font-label text-sm py-3 outline-none transition-colors resize-none placeholder:text-on-surface-variant/40"
                  placeholder="Describe your project or opportunity..."
                />
              </div>

              <button
                type="submit"
                className="bg-primary-fixed text-on-primary-fixed px-10 py-4 font-label text-sm uppercase tracking-widest font-bold hover:bg-primary-fixed-dim transition-all active:scale-95"
              >
                SEND_MESSAGE
              </button>
            </form>
          )}
        </div>

        {/* Info Panel */}
        <div className="lg:col-span-5 bg-surface-container-low p-10 flex flex-col justify-between">
          <div className="space-y-10">
            {/* Email */}
            <div>
              <span className="font-label text-[10px] text-outline uppercase tracking-widest block mb-3">
                Direct Signal
              </span>
              <a
                href="mailto:totobotplus@gmail.com"
                className="font-label text-lg text-primary-fixed hover:opacity-70 transition-opacity"
              >
                totobotplus@gmail.com
              </a>
            </div>

            {/* Resume Download */}
            <div>
              <span className="font-label text-[10px] text-outline uppercase tracking-widest block mb-3">
                Resume
              </span>
              <a
                href="/resume.pdf"
                download="Saiteja_Dasari_Resume.pdf"
                className="inline-flex items-center gap-3 bg-surface-container-high border border-primary-fixed/30 px-5 py-3 hover:border-primary-fixed hover:bg-surface-container-highest transition-all group"
              >
                <span className="material-symbols-outlined text-primary-fixed text-base">
                  download
                </span>
                <span className="font-label text-xs text-primary-fixed uppercase tracking-widest group-hover:opacity-80">
                  Download CV
                </span>
              </a>
            </div>

            {/* Social links */}
            <div className="pt-6 border-t border-outline-variant/10 space-y-4">
              <a
                href="https://www.linkedin.com/in/sdasar38/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <span className="material-symbols-outlined text-outline group-hover:text-primary-fixed transition-colors text-sm">
                  person
                </span>
                <span className="font-label text-xs uppercase tracking-widest text-secondary group-hover:text-primary-fixed transition-colors">
                  LINKEDIN PROFILE
                </span>
              </a>
              <a
                href="https://github.com/dstejagit09"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <span className="material-symbols-outlined text-outline group-hover:text-primary-fixed transition-colors text-sm">
                  terminal
                </span>
                <span className="font-label text-xs uppercase tracking-widest text-secondary group-hover:text-primary-fixed transition-colors">
                  GITHUB REPOS
                </span>
              </a>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-outline-variant/10">
            <p className="font-label text-[10px] text-outline uppercase tracking-widest mb-2">
              Current Status
            </p>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primary-fixed shadow-[0_0_6px_var(--color-primary-fixed)]" />
              <span className="font-label text-sm text-on-surface">
                Open for Opportunities
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
