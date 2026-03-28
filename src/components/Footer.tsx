"use client";

import Link from "next/link";
import Image from "next/image";
import { useLogo } from "@/context/LogoContext";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Gallery", href: "#gallery" },
  { label: "Registration", href: "#registration" },
  { label: "Contact", href: "#contact" },
];

const programLinks = [
  "Weekday Training",
  "Saturday Compensated Class",
];

export default function Footer() {
  const { logo, logoSrc } = useLogo();

  return (
    <footer className="bg-dark text-white/70 pt-20">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] gap-12 pb-12 border-b border-white/[0.08]">
          {/* About */}
          <div>
            <Link
              href="#home"
              className="flex items-center gap-2 font-[family-name:var(--font-bebas-neue)] text-[1.1rem] sm:text-[1.3rem] text-white tracking-[1.5px] mb-4"
            >
              <Image
                src={logoSrc}
                alt="Rulers Basketball Academy Logo"
                width={logo === "alternate" ? 54 : 44}
                height={logo === "alternate" ? 54 : 44}
                className={logo === "alternate" ? "" : "rounded-full"}
              />
              <span>
                RULERS <span className="text-primary">BASKETBALL</span> ACADEMY
              </span>
            </Link>
            <p className="text-[0.9rem] leading-relaxed mb-5">
              Professional basketball training academy. Building
              champions on and off the court since 2025.
            </p>
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
        </div>
      </div>
    </footer>
  );
}
