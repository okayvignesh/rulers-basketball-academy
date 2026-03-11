"use client";

import Link from "next/link";
import ScrollReveal from "./ui/ScrollReveal";

const programs = [
  {
    level: "Beginner",
    title: "Beginner Training",
    icon: "fas fa-seedling",
    colorClass: "from-green-500/20 to-green-500/5",
    iconColor: "text-green-500",
    description:
      "Perfect for newcomers! Learn basketball fundamentals including dribbling, passing, shooting, and basic game rules in a fun, supportive environment.",
    details: [
      { icon: "fas fa-user-friends", text: "Ages 6-12" },
      { icon: "fas fa-calendar-alt", text: "Mon, Wed, Fri" },
      { icon: "fas fa-clock", text: "6:00 AM - 7:30 AM" },
      { icon: "fas fa-layer-group", text: "Fundamentals Focus" },
    ],
  },
  {
    level: "Intermediate",
    title: "Intermediate Training",
    icon: "fas fa-fire",
    colorClass: "from-primary/30 to-primary/10",
    iconColor: "text-primary",
    featured: true,
    description:
      "Take your game to the next level. Advanced drills, team strategies, positional play, and competitive scrimmages to sharpen your skills.",
    details: [
      { icon: "fas fa-user-friends", text: "Ages 12-16" },
      { icon: "fas fa-calendar-alt", text: "Mon - Sat" },
      { icon: "fas fa-clock", text: "6:00 AM - 8:00 AM" },
      { icon: "fas fa-layer-group", text: "Skill Development" },
    ],
  },
  {
    level: "Advanced",
    title: "Advanced Competitive",
    icon: "fas fa-bolt",
    colorClass: "from-red-500/20 to-red-500/5",
    iconColor: "text-red-500",
    description:
      "Elite training for serious players. Intensive drills, game film analysis, strength conditioning, and preparation for tournaments and tryouts.",
    details: [
      { icon: "fas fa-user-friends", text: "Ages 16+" },
      { icon: "fas fa-calendar-alt", text: "Mon - Sat" },
      { icon: "fas fa-clock", text: "5:30 AM - 8:00 AM" },
      { icon: "fas fa-layer-group", text: "Competition Ready" },
    ],
  },
  {
    level: "Weekend",
    title: "Weekend Camps",
    icon: "fas fa-campground",
    colorClass: "from-blue-500/20 to-blue-500/5",
    iconColor: "text-blue-500",
    description:
      "Intensive weekend sessions covering all aspects of basketball. Perfect for students who can't attend weekday sessions. Fun games and team-building activities.",
    details: [
      { icon: "fas fa-user-friends", text: "All Ages" },
      { icon: "fas fa-calendar-alt", text: "Sat & Sun" },
      { icon: "fas fa-clock", text: "7:00 AM - 10:00 AM" },
      { icon: "fas fa-layer-group", text: "All Levels Welcome" },
    ],
  },
];

export default function ProgramsSection() {
  return (
    <section id="programs" className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-5 py-1.5 bg-primary/10 text-primary font-[family-name:var(--font-oswald)] text-[0.9rem] font-medium tracking-[1px] uppercase rounded-full mb-4">
            <i className="fas fa-basketball-ball" /> Training Programs
          </span>
          <h2 className="font-[family-name:var(--font-bebas-neue)] text-[clamp(2.2rem,5vw,3.2rem)] text-white tracking-[2px] leading-tight mb-3">
            Choose Your <span className="text-primary">Program</span>
          </h2>
          <p className="text-[1.05rem] text-white/50 max-w-[600px] mx-auto">
            Structured training programs designed for every skill level
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {programs.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 100}>
              <div
                className={`relative bg-dark-2 rounded-2xl overflow-hidden transition-all duration-300 border hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:border-primary/30 ${
                  p.featured
                    ? "border-primary shadow-[0_0_30px_rgba(249,115,22,0.15)]"
                    : "border-white/[0.06]"
                }`}
              >
                {p.featured && (
                  <div className="absolute top-4 right-4 bg-primary text-white px-3.5 py-1 rounded-full font-[family-name:var(--font-oswald)] text-[0.75rem] uppercase tracking-[1px] z-10">
                    Most Popular
                  </div>
                )}

                {/* Card Header */}
                <div
                  className={`px-6 pt-10 pb-7 flex items-center justify-between bg-gradient-to-br ${p.colorClass}`}
                >
                  <div className="font-[family-name:var(--font-oswald)] text-[0.85rem] uppercase tracking-[2px] text-white/60">
                    {p.level}
                  </div>
                  <div className={`text-[2rem] opacity-30 ${p.iconColor}`}>
                    <i className={p.icon} />
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <h3 className="font-[family-name:var(--font-oswald)] text-[1.3rem] text-white mb-3">
                    {p.title}
                  </h3>
                  <p className="text-[0.88rem] text-white/50 mb-6 leading-relaxed">
                    {p.description}
                  </p>

                  <div className="flex flex-col gap-3 mb-6">
                    {p.details.map((d) => (
                      <div
                        key={d.text}
                        className="flex items-center gap-3 text-[0.88rem] text-white/70"
                      >
                        <i
                          className={`${d.icon} text-primary text-[0.85rem] w-4 text-center`}
                        />
                        <span>{d.text}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="#register-form"
                    className="block w-full text-center px-7 py-3 bg-primary text-white font-[family-name:var(--font-oswald)] text-[1rem] font-medium tracking-[1px] uppercase rounded-lg border-2 border-primary transition-all duration-300 hover:bg-primary-dark hover:border-primary-dark hover:shadow-[0_8px_25px_rgba(249,115,22,0.35)]"
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
