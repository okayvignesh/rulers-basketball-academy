"use client";

import Link from "next/link";
import ScrollReveal from "./ui/ScrollReveal";

const weekdayBatches = [
  { batch: "First Batch", time: "5:30 PM to 6:30 PM", icon: "fas fa-sun" },
  { batch: "Second Batch", time: "6:30 PM to 7:30 PM", icon: "fas fa-cloud-sun" },
  { batch: "Third Batch", time: "7:30 PM to 8:30 PM", icon: "fas fa-moon" },
];

const saturdayBatches = [
  { batch: "First Batch", time: "5:00 PM to 6:00 PM", icon: "fas fa-sun" },
  { batch: "Second Batch", time: "6:00 PM to 7:00 PM", icon: "fas fa-cloud-sun" },
];

export default function ProgramsSection() {
  return (
    <section id="programs" className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-5 py-1.5 bg-primary/10 text-primary font-[family-name:var(--font-oswald)] text-[0.9rem] font-medium tracking-[1px] uppercase rounded-full mb-4">
            <i className="fas fa-basketball-ball" /> Class Schedule
          </span>
          <h2 className="font-[family-name:var(--font-bebas-neue)] text-[clamp(2.2rem,5vw,3.2rem)] text-white tracking-[2px] leading-tight mb-3">
            Training <span className="text-primary">Schedule</span>
          </h2>
          <p className="text-[1.05rem] text-white/50 max-w-[600px] mx-auto">
            Parents kindly note the following class timings
          </p>
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Weekday Schedule */}
          <ScrollReveal>
            <div className="relative bg-dark-2 rounded-2xl overflow-hidden border border-primary shadow-[0_0_30px_rgba(249,115,22,0.15)]">
              {/* Card Header */}
              <div className="px-6 pt-8 pb-6 bg-gradient-to-br from-primary/30 to-primary/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 flex items-center justify-center bg-primary/20 rounded-xl">
                    <i className="fas fa-calendar-week text-primary text-[1.3rem]" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-oswald)] text-[1.3rem] text-white">
                      Monday to Friday
                    </h3>
                    <p className="text-[0.85rem] text-white/50 uppercase tracking-[1px]">
                      Weekday Classes
                    </p>
                  </div>
                </div>
              </div>

              {/* Batches */}
              <div className="p-6 flex flex-col gap-4">
                {weekdayBatches.map((b, i) => (
                  <div
                    key={b.batch}
                    className="flex items-center gap-4 bg-white/[0.04] p-4 rounded-xl border border-white/[0.06] transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.06]"
                  >
                    <div className="w-10 h-10 flex items-center justify-center bg-primary/15 rounded-lg text-primary">
                      <i className={b.icon} />
                    </div>
                    <div className="flex-1">
                      <p className="font-[family-name:var(--font-oswald)] text-[0.95rem] text-white uppercase tracking-[1px]">
                        {b.batch}
                      </p>
                      <p className="text-[0.9rem] text-primary font-medium">
                        {b.time}
                      </p>
                    </div>
                    <div className="w-8 h-8 flex items-center justify-center bg-primary/10 rounded-full text-primary text-[0.85rem] font-[family-name:var(--font-bebas-neue)]">
                      {i + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Saturday Schedule */}
          <ScrollReveal delay={100}>
            <div className="relative bg-dark-2 rounded-2xl overflow-hidden border border-white/[0.06] transition-all duration-300 hover:border-primary/30">
              {/* Card Header */}
              <div className="px-6 pt-8 pb-6 bg-gradient-to-br from-blue-500/20 to-blue-500/5">
                <div className="absolute top-4 right-4 bg-blue-500 text-white px-3.5 py-1 rounded-full font-[family-name:var(--font-oswald)] text-[0.75rem] uppercase tracking-[1px]">
                  Compensated Class
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 flex items-center justify-center bg-blue-500/20 rounded-xl">
                    <i className="fas fa-calendar-day text-blue-400 text-[1.3rem]" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-oswald)] text-[1.3rem] text-white">
                      Every Saturday
                    </h3>
                    <p className="text-[0.85rem] text-white/50 uppercase tracking-[1px]">
                      Compensated Class
                    </p>
                  </div>
                </div>
              </div>

              {/* Batches */}
              <div className="p-6 flex flex-col gap-4">
                {saturdayBatches.map((b, i) => (
                  <div
                    key={b.batch}
                    className="flex items-center gap-4 bg-white/[0.04] p-4 rounded-xl border border-white/[0.06] transition-all duration-300 hover:border-blue-500/30 hover:bg-white/[0.06]"
                  >
                    <div className="w-10 h-10 flex items-center justify-center bg-blue-500/15 rounded-lg text-blue-400">
                      <i className={b.icon} />
                    </div>
                    <div className="flex-1">
                      <p className="font-[family-name:var(--font-oswald)] text-[0.95rem] text-white uppercase tracking-[1px]">
                        {b.batch}
                      </p>
                      <p className="text-[0.9rem] text-blue-400 font-medium">
                        {b.time}
                      </p>
                    </div>
                    <div className="w-8 h-8 flex items-center justify-center bg-blue-500/10 rounded-full text-blue-400 text-[0.85rem] font-[family-name:var(--font-bebas-neue)]">
                      {i + 1}
                    </div>
                  </div>
                ))}

                {/* Extra space to balance with weekday card */}
                <div className="mt-2 p-4 bg-white/[0.02] rounded-xl border border-dashed border-white/[0.08] text-center">
                  <p className="text-[0.85rem] text-white/40">
                    <i className="fas fa-info-circle mr-2" />
                    Saturday classes are compensated sessions for missed weekday classes
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="#register-form"
            className="inline-flex items-center gap-2 px-9 py-4 bg-primary text-white font-[family-name:var(--font-oswald)] text-[1.05rem] font-medium tracking-[1px] uppercase rounded-lg border-2 border-primary transition-all duration-300 hover:bg-primary-dark hover:border-primary-dark hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(249,115,22,0.35)]"
          >
            <i className="fas fa-clipboard-list" /> Enroll Now
          </Link>
        </div>
      </div>
    </section>
  );
}
