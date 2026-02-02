"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight, ChevronDown } from "lucide-react";

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main
      id="home"
      className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#050505]"
    >
      {/* Gradient Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      </div>

      {/* Robot Silhouette Image */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-80">
        <div className="relative h-[80vh] md:h-[90vh] w-full max-w-[800px]">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBR_mz87Ku8CPbqldlqJbhlStbgkp6KNpDwcf1qR7kzoKlp7fwkFWlX6dmsLZQtSVODf4BmyNAjoP84No_hOQeBq2gURvT5wzHHaTatRQcvanvOgqJlT3jy_gUsqGwy7oNsLBZu0bsHJlJn76ENy_FrQAmUf1ZV_IZVr20AzFn2iPwvV6l2pYZPigIGYy5DyVKJMoTMi5wUwwSe22lTrSUCq0CSPijAN_Dx1SGNFtjvGA8WGpAlcB9sxkuqQyv8Uhmd9wyAmtYXhQ"
            alt="Abstract silhouette of a futuristic humanoid robot"
            fill
            priority
            className={`object-contain object-center filter grayscale contrast-125 brightness-90 drop-shadow-2xl transition-all duration-1000 ${
              isLoaded ? "opacity-80" : "opacity-0"
            }`}
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl px-6 md:px-12 flex flex-col justify-between h-screen py-32 md:py-12">
        <div className="flex-grow hidden md:block" />

        <div className="flex flex-col md:flex-row md:items-end justify-between w-full mt-auto mb-12 md:mb-24 gap-8">
          {/* Left Side: Headline */}
          <div
            className={`max-w-2xl transition-all duration-1000 delay-200 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <h2 className="text-xs md:text-sm font-mono text-gray-400 mb-4 tracking-[0.2em] uppercase">
              {SITE_CONFIG.title}
            </h2>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-display font-medium tracking-tight leading-[1.1] text-white mix-blend-difference">
              {SITE_CONFIG.tagline.split(" ").slice(0, 2).join(" ")}
              <br />
              <span className="text-gray-500">
                {SITE_CONFIG.tagline.split(" ").slice(2).join(" ")}
              </span>
            </h1>
          </div>

          {/* Right Side: Description & CTA */}
          <div
            className={`flex flex-col items-start md:items-end gap-6 transition-all duration-1000 delay-300 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <p className="max-w-xs text-sm md:text-base text-gray-400 leading-relaxed md:text-right">
              {SITE_CONFIG.description}
            </p>
            <a href="#projects">
              <Button
                variant="outline"
                className="group relative overflow-hidden"
              >
                <span className="absolute inset-0 w-0 bg-white transition-all duration-[250ms] ease-out group-hover:w-full" />
                <span className="relative z-10 text-white group-hover:text-black transition-colors">
                  Explore Projects
                </span>
                <ArrowUpRight className="relative z-10 w-4 h-4 text-white group-hover:text-black group-hover:translate-x-1 transition-all" />
              </Button>
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center gap-2 transition-all duration-1000 delay-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="text-[10px] uppercase tracking-widest text-gray-400">
            Scroll
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-gray-400 to-transparent opacity-50" />
          <ChevronDown className="w-4 h-4 text-gray-400 animate-bounce" />
        </div>
      </div>
    </main>
  );
}
