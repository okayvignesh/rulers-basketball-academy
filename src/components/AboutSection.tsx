"use client";

import ScrollReveal from "./ui/ScrollReveal";

const benefits = [
  {
    icon: "fas fa-dumbbell",
    title: "Professional Coaching",
    desc: "Learn from experienced coaches who have played at competitive levels",
  },
  {
    icon: "fas fa-users",
    title: "Small Batch Sizes",
    desc: "Personalized attention with small group training for maximum development",
  },
  {
    icon: "fas fa-trophy",
    title: "Tournament Exposure",
    desc: "Regular participation in local and state-level tournaments",
  },
  {
    icon: "fas fa-heartbeat",
    title: "Fitness & Conditioning",
    desc: "Comprehensive fitness programs alongside basketball skill training",
  },
];

const features = [
  {
    icon: "fas fa-bullseye",
    title: "Our Mission",
    desc: "To make professional basketball training accessible to every aspiring player and create future champions.",
  },
  {
    icon: "fas fa-eye",
    title: "Our Vision",
    desc: "To be the premier basketball academy in Telangana, producing athletes who compete at national and international levels.",
  },
  {
    icon: "fas fa-star",
    title: "Why Choose Us",
    desc: "Expert coaches, modern facilities, structured programs, and a proven training system that delivers results.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-5 py-1.5 bg-primary/10 text-primary font-[family-name:var(--font-oswald)] text-[0.9rem] font-medium tracking-[1px] uppercase rounded-full mb-4">
            <i className="fas fa-info-circle" /> About Us
          </span>
          <h2 className="font-[family-name:var(--font-bebas-neue)] text-[clamp(2.2rem,5vw,3.2rem)] text-secondary tracking-[2px] leading-tight mb-3">
            More Than Just <span className="text-primary">Basketball</span>
          </h2>
          <p className="text-[1.05rem] text-gray-500 max-w-[600px] mx-auto">
            We&apos;re building champions on and off the court since 2025
          </p>
        </div>

        {/* About Grid */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-center mb-20">
          {/* Image */}
          <ScrollReveal>
            <div className="relative rounded-2xl overflow-hidden shadow-xl group">
              <img
                src="https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=700&fit=crop"
                alt="Basketball training session at Rulers Academy"
                className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute bottom-5 right-5 bg-primary text-white px-6 py-4 rounded-xl text-center shadow-lg">
                <span className="block font-[family-name:var(--font-oswald)] text-[0.9rem] uppercase tracking-[2px] opacity-90">
                  Est.
                </span>
                <span className="block font-[family-name:var(--font-bebas-neue)] text-[2.2rem] leading-none">
                  2025
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Content */}
          <div>
            <h3 className="font-[family-name:var(--font-oswald)] text-[1.6rem] text-secondary mb-4">
              Welcome to Rulers Basketball Academy
            </h3>
            <p className="text-gray-500 mb-4 text-[0.95rem]">
              Founded in December 2025, Rulers Basketball Academy is a
              MSME-registered sports organization (UDYAM-TS-09-0205178)
              dedicated to nurturing basketball talent in Hyderabad. Located in
              the heart of Miyapur, Serilingampally, we provide world-class
              training facilities and expert coaching for aspiring basketball
              players of all ages and skill levels.
            </p>
            <p className="text-gray-500 mb-8 text-[0.95rem]">
              Our academy is committed to developing well-rounded athletes who
              excel both on and off the court. We combine modern training
              methodologies with personalized coaching to unlock every
              player&apos;s potential.
            </p>

            <div className="flex flex-col gap-5">
              {features.map((f) => (
                <ScrollReveal key={f.title}>
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 min-w-[48px] flex items-center justify-center bg-primary/10 text-primary rounded-lg text-[1.1rem]">
                      <i className={f.icon} />
                    </div>
                    <div>
                      <h4 className="font-[family-name:var(--font-oswald)] text-[1.05rem] text-secondary mb-1">
                        {f.title}
                      </h4>
                      <p className="text-[0.9rem] text-gray-500">{f.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <ScrollReveal key={b.title} delay={i * 100}>
              <div className="bg-white p-9 rounded-xl text-center shadow-sm border border-gray-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-primary group">
                <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-primary to-primary-light text-white rounded-xl text-[1.5rem] mx-auto mb-5">
                  <i className={b.icon} />
                </div>
                <h4 className="font-[family-name:var(--font-oswald)] text-[1.1rem] text-secondary mb-2">
                  {b.title}
                </h4>
                <p className="text-[0.88rem] text-gray-500">{b.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
