"use client";

import { useState } from "react";
import ScrollReveal from "./ui/ScrollReveal";
import { faqItems } from "@/lib/faq-data";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-5 py-1.5 bg-primary/10 text-primary font-[family-name:var(--font-oswald)] text-[0.9rem] font-medium tracking-[1px] uppercase rounded-full mb-4">
            <i className="fas fa-question-circle" /> FAQ
          </span>
          <h2 className="font-[family-name:var(--font-bebas-neue)] text-[clamp(2.2rem,5vw,3.2rem)] text-secondary tracking-[2px] leading-tight mb-3">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-[1.05rem] text-gray-500 max-w-[600px] mx-auto">
            Common questions parents and players ask about basketball coaching at
            Rulers Basketball Academy, Hyderabad
          </p>
        </div>

        {/* Items */}
        <div className="flex flex-col gap-3">
          {faqItems.map((item, i) => {
            const open = openIndex === i;
            return (
              <ScrollReveal key={item.question} delay={i * 50}>
                <div
                  className={`bg-gray-50 rounded-xl border transition-all duration-300 ${
                    open
                      ? "border-primary shadow-[0_0_0_4px_rgba(249,115,22,0.08)]"
                      : "border-gray-200 hover:border-primary/30"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : i)}
                    aria-expanded={open}
                    className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 cursor-pointer"
                  >
                    <span className="font-[family-name:var(--font-oswald)] text-[1rem] sm:text-[1.05rem] text-secondary tracking-[0.3px]">
                      {item.question}
                    </span>
                    <i
                      className={`fas fa-chevron-down text-primary text-sm transition-transform duration-300 ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {open && (
                    <div className="px-5 pb-5 -mt-1 text-gray-600 text-[0.95rem] leading-relaxed">
                      {item.answer}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
