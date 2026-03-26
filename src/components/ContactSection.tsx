"use client";

import ScrollReveal from "./ui/ScrollReveal";

const contactCards = [
  {
    icon: "fas fa-phone-alt",
    title: "Phone Number",
    content: (
      <>
        <p>
          <a
            href="tel:+919885475372"
            className="text-primary hover:underline text-[0.88rem]"
          >
            +91 98854 75372
          </a>
        </p>
        <p className="text-[0.8rem] text-gray-400 mt-1">Mon-Sat: 8AM - 8PM</p>
      </>
    ),
  },
  {
    icon: "fas fa-envelope",
    title: "Email Address",
    content: (
      <>
        <p>
          <a
            href="mailto:sitabavanikoti@gmail.com"
            className="text-primary hover:underline text-[0.88rem]"
          >
            sitabavanikoti@gmail.com
          </a>
        </p>
        <p className="text-[0.8rem] text-gray-400 mt-1">
          We reply within 24 hours
        </p>
      </>
    ),
  },
  {
    icon: "fas fa-home",
    title: "Training Venue",
    content: (
      <p className="text-[0.88rem] text-gray-500 leading-relaxed">
        We give training in well established communities with safe and spacious environments.
      </p>
    ),
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-5 py-1.5 bg-primary/10 text-primary font-[family-name:var(--font-oswald)] text-[0.9rem] font-medium tracking-[1px] uppercase rounded-full mb-4">
            <i className="fas fa-headset" /> Contact
          </span>
          <h2 className="font-[family-name:var(--font-bebas-neue)] text-[clamp(2.2rem,5vw,3.2rem)] text-secondary tracking-[2px] leading-tight mb-3">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <p className="text-[1.05rem] text-gray-500 max-w-[600px] mx-auto">
            Have questions? We&apos;d love to hear from you
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {contactCards.map((card, i) => (
            <ScrollReveal key={card.title} delay={i * 100}>
              <div className="bg-gray-50 p-7 rounded-xl border border-gray-200 transition-all duration-300 hover:border-primary hover:-translate-y-1 hover:shadow-lg h-full">
                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-primary to-primary-light text-white rounded-lg text-[1.1rem] mb-4">
                  <i className={card.icon} />
                </div>
                <h4 className="font-[family-name:var(--font-oswald)] text-[1.05rem] text-secondary mb-2">
                  {card.title}
                </h4>
                {card.content}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
