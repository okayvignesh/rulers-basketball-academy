"use client";

import ScrollReveal from "./ui/ScrollReveal";

const contactCards = [
  {
    icon: "fas fa-map-marker-alt",
    title: "Academy Address",
    content: (
      <p className="text-[0.88rem] text-gray-500 leading-relaxed">
        H.No 20-16/6, Kendirya Vihar
        <br />
        Flat No-6, 2nd Floor, Block-16
        <br />
        Mayuri Nagar, Miyapur
        <br />
        Serilingampally, Hyderabad
        <br />
        Telangana - 500049
      </p>
    ),
  },
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
    icon: "fas fa-share-alt",
    title: "Follow Us",
    content: (
      <div className="flex gap-2.5 mt-1">
        {[
          { icon: "fab fa-facebook-f", label: "Facebook" },
          { icon: "fab fa-instagram", label: "Instagram" },
          { icon: "fab fa-youtube", label: "YouTube" },
          { icon: "fab fa-x-twitter", label: "Twitter" },
        ].map((s) => (
          <a
            key={s.label}
            href="#"
            aria-label={s.label}
            className="w-10 h-10 flex items-center justify-center bg-white text-gray-600 rounded-lg border border-gray-200 transition-all duration-300 hover:bg-primary hover:text-white hover:border-primary hover:-translate-y-[3px]"
          >
            <i className={s.icon} />
          </a>
        ))}
      </div>
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

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Contact Cards */}
          <div className="grid sm:grid-cols-2 gap-5">
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

          {/* Map */}
          <ScrollReveal>
            <div className="h-full min-h-[400px] rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.2!2d78.3575!3d17.4969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMiyapur%2C+Hyderabad!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "16px", minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Rulers Basketball Academy Location"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
