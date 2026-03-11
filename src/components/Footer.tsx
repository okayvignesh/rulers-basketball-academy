import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Gallery", href: "#gallery" },
  { label: "Registration", href: "#registration" },
  { label: "Contact", href: "#contact" },
];

const programLinks = [
  "Beginner Training",
  "Intermediate Training",
  "Advanced Competitive",
  "Weekend Camps",
];

const socialLinks = [
  { icon: "fab fa-facebook-f", label: "Facebook" },
  { icon: "fab fa-instagram", label: "Instagram" },
  { icon: "fab fa-youtube", label: "YouTube" },
  { icon: "fab fa-x-twitter", label: "Twitter" },
  { icon: "fab fa-whatsapp", label: "WhatsApp" },
];

export default function Footer() {
  return (
    <footer className="bg-dark text-white/70 pt-20">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] gap-12 pb-12 border-b border-white/[0.08]">
          {/* About */}
          <div>
            <Link
              href="#home"
              className="flex items-center gap-2.5 font-[family-name:var(--font-bebas-neue)] text-[1.8rem] text-white tracking-[3px] mb-4"
            >
              <i className="fas fa-basketball-ball text-primary" />
              <span>
                RULERS<span className="text-primary">BA</span>
              </span>
            </Link>
            <p className="text-[0.9rem] leading-relaxed mb-2">
              Professional basketball training academy in Hyderabad. Building
              champions on and off the court since 2025.
            </p>
            <p className="text-[0.8rem] text-white/40 mb-5">
              UDYAM Reg: UDYAM-TS-09-0205178
            </p>
            <div className="flex gap-2.5">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-10 h-10 flex items-center justify-center bg-white/[0.06] border border-white/10 rounded-lg text-white/60 transition-all duration-300 hover:bg-primary hover:border-primary hover:text-white hover:-translate-y-[3px]"
                >
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-[family-name:var(--font-oswald)] text-[1.1rem] text-white tracking-[1px] uppercase mb-6">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-[0.9rem] text-white/55 transition-all duration-300 hover:text-primary hover:pl-1"
                  >
                    <i className="fas fa-chevron-right text-[0.7rem] text-primary opacity-50" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-[family-name:var(--font-oswald)] text-[1.1rem] text-white tracking-[1px] uppercase mb-6">
              Programs
            </h4>
            <ul className="flex flex-col gap-3">
              {programLinks.map((label) => (
                <li key={label}>
                  <Link
                    href="#programs"
                    className="flex items-center gap-2 text-[0.9rem] text-white/55 transition-all duration-300 hover:text-primary hover:pl-1"
                  >
                    <i className="fas fa-chevron-right text-[0.7rem] text-primary opacity-50" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-[family-name:var(--font-oswald)] text-[1.1rem] text-white tracking-[1px] uppercase mb-6">
              Contact Info
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex gap-3 text-[0.9rem]">
                <i className="fas fa-map-marker-alt text-primary mt-[3px] w-4 text-center" />
                <span>
                  Mayuri Nagar, Miyapur,
                  <br />
                  Hyderabad - 500049
                </span>
              </li>
              <li className="flex gap-3 text-[0.9rem]">
                <i className="fas fa-phone-alt text-primary mt-[3px] w-4 text-center" />
                <a
                  href="tel:+919885475372"
                  className="text-white/55 hover:text-primary transition-colors"
                >
                  +91 98854 75372
                </a>
              </li>
              <li className="flex gap-3 text-[0.9rem]">
                <i className="fas fa-envelope text-primary mt-[3px] w-4 text-center" />
                <a
                  href="mailto:sitabavanikoti@gmail.com"
                  className="text-white/55 hover:text-primary transition-colors"
                >
                  sitabavanikoti@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between py-6 gap-2 text-[0.85rem] text-white/35">
          <p>&copy; 2025 Rulers Basketball Academy. All rights reserved.</p>
          <p>MSME Registered | UDYAM-TS-09-0205178</p>
        </div>
      </div>
    </footer>
  );
}
