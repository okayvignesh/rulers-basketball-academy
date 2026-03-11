"use client";

import ScrollReveal from "./ui/ScrollReveal";

const registrationInfo = [
  {
    icon: "fas fa-user-check",
    title: "Who Can Register",
    items: [
      { icon: "fas fa-check", text: "Children aged 6 and above" },
      { icon: "fas fa-check", text: "Teens & young adults" },
      { icon: "fas fa-check", text: "Both boys and girls welcome" },
      { icon: "fas fa-check", text: "No prior experience required" },
      {
        icon: "fas fa-check",
        text: "Must have parent/guardian consent (under 18)",
      },
    ],
  },
  {
    icon: "fas fa-layer-group",
    title: "Age Groups",
    items: [
      { icon: "fas fa-basketball-ball", text: "Mini Ballers: Ages 6-9" },
      { icon: "fas fa-basketball-ball", text: "Junior Squad: Ages 10-13" },
      { icon: "fas fa-basketball-ball", text: "Rising Stars: Ages 14-17" },
      { icon: "fas fa-basketball-ball", text: "Elite Division: Ages 18+" },
    ],
  },
  {
    icon: "fas fa-clock",
    title: "Training Batches",
    items: [
      { icon: "fas fa-sun", text: "Early Morning: 5:30 AM - 7:00 AM" },
      { icon: "fas fa-cloud-sun", text: "Morning: 6:00 AM - 8:00 AM" },
      { icon: "fas fa-cloud-moon", text: "Evening: 5:00 PM - 7:00 PM" },
      { icon: "fas fa-star", text: "Weekend Special: 7:00 AM - 10:00 AM" },
    ],
  },
  {
    icon: "fas fa-rupee-sign",
    title: "Fee Details",
    items: [
      { icon: "fas fa-tag", text: "Registration Fee: ₹500 (one-time)" },
      { icon: "fas fa-tag", text: "Monthly Fee: ₹1,500 - ₹3,000" },
      { icon: "fas fa-tag", text: "Weekend Camp: ₹2,000/month" },
      { icon: "fas fa-tag", text: "Quarterly discount available" },
      { icon: "fas fa-tag", text: "Sibling discount: 10% off" },
    ],
  },
  {
    icon: "fas fa-calendar-week",
    title: "Training Days",
    items: [
      { icon: "fas fa-check-circle", text: "Beginners: Mon, Wed, Fri" },
      { icon: "fas fa-check-circle", text: "Intermediate: Mon - Sat" },
      { icon: "fas fa-check-circle", text: "Advanced: Mon - Sat" },
      { icon: "fas fa-check-circle", text: "Weekend Camp: Sat & Sun" },
    ],
  },
  {
    icon: "fas fa-map-marker-alt",
    title: "Training Location",
    items: [
      { icon: "fas fa-building", text: "Kendirya Vihar" },
      { icon: "fas fa-road", text: "Mayuri Nagar, Miyapur" },
      { icon: "fas fa-city", text: "Serilingampally, Hyderabad" },
      { icon: "fas fa-map", text: "Ranga Reddi, Telangana - 500049" },
    ],
  },
];

export default function RegistrationSection() {
  return (
    <section id="registration" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-5 py-1.5 bg-primary/10 text-primary font-[family-name:var(--font-oswald)] text-[0.9rem] font-medium tracking-[1px] uppercase rounded-full mb-4">
            <i className="fas fa-clipboard-check" /> Registration
          </span>
          <h2 className="font-[family-name:var(--font-bebas-neue)] text-[clamp(2.2rem,5vw,3.2rem)] text-secondary tracking-[2px] leading-tight mb-3">
            Join the <span className="text-primary">Academy</span>
          </h2>
          <p className="text-[1.05rem] text-gray-500 max-w-[600px] mx-auto">
            Everything you need to know about enrollment
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {registrationInfo.map((card, i) => (
            <ScrollReveal key={card.title} delay={i * 100}>
              <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary h-full">
                <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-primary to-primary-light text-white rounded-xl text-[1.3rem] mb-5">
                  <i className={card.icon} />
                </div>
                <h3 className="font-[family-name:var(--font-oswald)] text-[1.2rem] text-secondary mb-4">
                  {card.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {card.items.map((item) => (
                    <li
                      key={item.text}
                      className="flex items-start gap-2.5 text-[0.9rem] text-gray-600"
                    >
                      <i
                        className={`${item.icon} text-primary mt-[3px] text-[0.8rem] min-w-[16px]`}
                      />
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
