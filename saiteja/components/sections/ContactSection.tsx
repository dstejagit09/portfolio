"use client";

import { useState, FormEvent } from "react";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";
import { Container } from "@/components/layout/Container";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus("success");
      setIsSubmitting(false);
      setFormData({ name: "", email: "" });
    }, 1000);
  };

  return (
    <footer
      id="contact"
      className="bg-[#050505] pt-24 pb-12 px-6 md:px-12 border-t border-white/5"
    >
      <Container>
        <div className="flex flex-col justify-between min-h-[50vh]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: CTA */}
            <div>
              <h2 className="text-5xl md:text-7xl font-display font-medium text-white tracking-tight mb-8">
                LET'S BUILD
                <br />
                THE FUTURE.
              </h2>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="inline-block text-xl text-gray-400 hover:text-white transition-colors border-b border-gray-700 pb-1 hover:border-white"
              >
                {SITE_CONFIG.email}
              </a>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:pl-24">
              <form onSubmit={handleSubmit} className="space-y-8">
                <Input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="text-white"
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="text-white"
                />
                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    variant="secondary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </div>
                {submitStatus === "success" && (
                  <p className="text-green-400 text-sm">Message sent successfully!</p>
                )}
              </form>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-end mt-24 pt-8 border-t border-white/5">
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 mb-6 md:mb-0">
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 uppercase tracking-wider mb-2">Socials</span>
                <div className="flex gap-4">
                  {SOCIAL_LINKS.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      className="text-white hover:opacity-70 transition-opacity"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 uppercase tracking-wider mb-2">Location</span>
                <span className="text-white">{SITE_CONFIG.location}</span>
              </div>
            </div>
            <div className="text-xs text-gray-400 uppercase tracking-widest">
              © 2024 {SITE_CONFIG.name}. All Rights Reserved.
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
