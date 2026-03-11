"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

// Pre-computed particle values to avoid hydration mismatch from Math.random()
const PARTICLES = [
  { w: 34, h: 52, bc: 0.08, top: 12, left: 8, dur: 14, del: 1.2 },
  { w: 48, h: 28, bc: 0.06, top: 45, left: 72, dur: 18, del: 3.5 },
  { w: 26, h: 44, bc: 0.1, top: 78, left: 35, dur: 11, del: 0.8 },
  { w: 56, h: 36, bc: 0.07, top: 25, left: 55, dur: 16, del: 2.1 },
  { w: 30, h: 50, bc: 0.09, top: 65, left: 18, dur: 13, del: 4.0 },
  { w: 42, h: 32, bc: 0.12, top: 90, left: 82, dur: 19, del: 0.5 },
];

function StatCounter({
  target,
  label,
  showPlus = true,
}: {
  target: number;
  label: string;
  showPlus?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const el = ref.current;
          if (!el) return;
          const duration = 2000;
          const increment = target / (duration / 16);
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              el.textContent = String(target);
              clearInterval(timer);
            } else {
              el.textContent = String(Math.floor(current));
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div className="text-center">
      <div className="flex items-baseline justify-center">
        <span
          ref={ref}
          className="font-[family-name:var(--font-bebas-neue)] text-[2.8rem] text-primary leading-none"
        >
          0
        </span>
        {showPlus && (
          <span className="font-[family-name:var(--font-bebas-neue)] text-[2rem] text-primary">
            +
          </span>
        )}
      </div>
      <span className="block text-[0.85rem] text-white/50 uppercase tracking-[1px] mt-1">
        {label}
      </span>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      role="banner"
      aria-label="Rulers Basketball Academy - Hero Banner"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1920&h=1080&fit=crop')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f1a]/92 via-[#1a1a2e]/88 to-primary/15" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(249,115,22,0.08)_0%,transparent_50%)]" />

      {/* Floating particles — uses pre-computed values to avoid hydration mismatch */}
      <div className="absolute inset-0 pointer-events-none">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full border-2 animate-float"
            style={{
              width: `${p.w}px`,
              height: `${p.h}px`,
              borderColor: `rgba(249, 115, 22, ${p.bc})`,
              top: `${p.top}%`,
              left: `${p.left}%`,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.del}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-5 pt-[120px] pb-[80px] max-w-7xl mx-auto w-full">
        {/* Badge */}
        <div className="animate-fade-in-down inline-flex items-center gap-2 px-6 py-2 bg-primary/15 border border-primary/30 rounded-full text-primary-light font-[family-name:var(--font-oswald)] text-[0.85rem] tracking-[2px] uppercase mb-6">
          <i className="fas fa-trophy" />
          MSME Registered Academy
        </div>

        {/* Title */}
        <h1 className="font-[family-name:var(--font-bebas-neue)] text-white leading-none mb-4">
          <span className="block text-[clamp(3rem,10vw,6.5rem)] tracking-[6px] animate-fade-in-up delay-100">
            RULERS
          </span>
          <span className="block text-[clamp(3.5rem,12vw,8rem)] tracking-[6px] text-primary animate-fade-in-up delay-300 drop-shadow-[0_0_60px_rgba(249,115,22,0.3)]">
            BASKETBALL
          </span>
          <span className="block text-[clamp(3rem,10vw,6.5rem)] tracking-[6px] animate-fade-in-up delay-500">
            ACADEMY
          </span>
        </h1>

        {/* Subtitle */}
        <p className="font-[family-name:var(--font-oswald)] text-[clamp(1.2rem,3vw,1.6rem)] text-white/70 tracking-[6px] uppercase mb-4 animate-fade-in-up delay-700">
          Train Like a Champion
        </p>

        {/* Description */}
        <p className="text-[1.05rem] text-white/55 max-w-[560px] mx-auto mb-9 animate-fade-in-up delay-900">
          Professional basketball training for all ages and skill levels in
          Hyderabad. Build your skills, strength, and game IQ with expert
          coaching.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center flex-wrap mb-[60px] animate-fade-in-up delay-1100">
          <Link
            href="#register-form"
            className="inline-flex items-center gap-2 px-9 py-4 bg-primary text-white font-[family-name:var(--font-oswald)] text-[1.05rem] font-medium tracking-[1px] uppercase rounded-lg border-2 border-primary transition-all duration-300 hover:bg-primary-dark hover:border-primary-dark hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(249,115,22,0.35)]"
          >
            <i className="fas fa-clipboard-list" /> Register Now
          </Link>
          <Link
            href="#programs"
            className="inline-flex items-center gap-2 px-9 py-4 bg-transparent text-white font-[family-name:var(--font-oswald)] text-[1.05rem] font-medium tracking-[1px] uppercase rounded-lg border-2 border-white transition-all duration-300 hover:bg-white hover:text-secondary hover:-translate-y-0.5"
          >
            <i className="fas fa-play-circle" /> View Programs
          </Link>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-12 flex-wrap animate-fade-in-up delay-1300">
          <StatCounter target={200} label="Active Players" />
          <StatCounter target={5} label="Expert Coaches" />
          <StatCounter target={10} label="Tournaments" />
          <StatCounter target={4} label="Training Batches" showPlus={false} />
        </div>
      </div>

      {/* Scroll indicator */}
      <Link
        href="#about"
        className="absolute bottom-[30px] left-1/2 -translate-x-1/2 z-10 animate-bounce-slow"
        aria-label="Scroll down"
      >
        <div className="w-[26px] h-[42px] border-2 border-white/30 rounded-[20px] relative">
          <div className="w-1 h-2 bg-primary rounded-full absolute top-2 left-1/2 -translate-x-1/2 animate-scroll-wheel" />
        </div>
      </Link>
    </section>
  );
}
