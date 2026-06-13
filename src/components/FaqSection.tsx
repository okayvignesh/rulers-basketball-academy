"use client";

import { useState } from "react";
import ScrollReveal from "./ui/ScrollReveal";

export const faqItems = [
  {
    question:
      "Where is Rulers Basketball Academy located in Hyderabad?",
    answer:
      "Rulers Basketball Academy conducts professional basketball training across well-established communities in Hyderabad, including Madhapur, Gachibowli, Kondapur, Hitech City, Kukatpally and nearby areas. Call us at +91 98854 75372 to find the venue closest to you.",
  },
  {
    question:
      "What age groups can join the basketball coaching?",
    answer:
      "We welcome players of all ages and skill levels — from young kids just starting out to teenagers and adults aiming to compete. Our coaches tailor training to each player's age and ability.",
  },
  {
    question:
      "Do beginners with no basketball experience need to bring anything?",
    answer:
      "No prior basketball experience is required. Just bring comfortable sportswear, non-marking sports shoes and a water bottle. We provide the basketballs and equipment during training.",
  },
  {
    question:
      "What are the basketball training timings?",
    answer:
      "Weekday classes (Monday to Friday) run in three batches: 5:30–6:30 PM, 6:30–7:30 PM and 7:30–8:30 PM. Saturday compensated classes are held 5:00–6:00 PM and 6:00–7:00 PM.",
  },
  {
    question:
      "How much does basketball coaching at Rulers Basketball Academy cost?",
    answer:
      "We offer flexible monthly and quarterly subscription plans. Detailed pricing is shown during registration. Submit the registration form and our team will call you within 24 hours with the latest fee structure.",
  },
  {
    question:
      "How do I register my child for basketball classes in Hyderabad?",
    answer:
      "You can register online through our website by filling out the registration form, or call us directly at +91 98854 75372. Our team will confirm your enrollment and share the next steps.",
  },
  {
    question:
      "Does the academy offer tournament exposure?",
    answer:
      "Yes. We regularly participate in local and state-level basketball tournaments across Telangana, giving players real match experience to sharpen their skills and game IQ.",
  },
  {
    question:
      "Is Saturday training the same as the weekday classes?",
    answer:
      "Saturday sessions are compensated classes for players who miss a weekday batch. They cover the same drills and fundamentals so no one falls behind.",
  },
];

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
