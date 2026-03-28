"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLogo } from "@/context/LogoContext";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Gallery", href: "#gallery" },
  { label: "Registration", href: "#registration" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { logo, toggleLogo, logoSrc } = useLogo();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section
      const sections = document.querySelectorAll("section[id]");
      const scrollY = window.scrollY + 120;
      sections.forEach((section) => {
        const el = section as HTMLElement;
        const top = el.offsetTop;
        const height = el.offsetHeight;
        const id = el.getAttribute("id") || "";
        if (scrollY >= top && scrollY < top + height) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobile = () => {
    setMobileOpen(false);
    document.body.style.overflow = "";
  };

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
    document.body.style.overflow = !mobileOpen ? "hidden" : "";
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0f0f1a]/95 backdrop-blur-xl py-2.5 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="#home"
          className="flex items-center gap-2 font-[family-name:var(--font-bebas-neue)] text-[1.1rem] sm:text-[1.3rem] text-white tracking-[1.5px]"
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

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`px-4 py-2 font-[family-name:var(--font-oswald)] text-[0.9rem] font-normal tracking-[1px] uppercase rounded-lg transition-all duration-300 ${
                  activeSection === item.href.slice(1)
                    ? "text-primary bg-primary/15"
                    : "text-white/80 hover:text-white hover:bg-primary/15"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          {/* Logo Toggle */}
          <button
            onClick={toggleLogo}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer"
            aria-label="Switch logo version"
          >
            <span className={`text-[0.7rem] font-[family-name:var(--font-oswald)] tracking-[1px] uppercase ${logo === "original" ? "text-primary" : "text-white/40"}`}>
              Logo 1
            </span>
            <div className="relative w-9 h-5 rounded-full bg-white/15">
              <div
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-primary shadow transition-all duration-300 ${
                  logo === "alternate" ? "left-[18px]" : "left-0.5"
                }`}
              />
            </div>
            <span className={`text-[0.7rem] font-[family-name:var(--font-oswald)] tracking-[1px] uppercase ${logo === "alternate" ? "text-primary" : "text-white/40"}`}>
              Logo 2
            </span>
          </button>

          {/* CTA Button */}
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-[family-name:var(--font-oswald)] text-[0.85rem] font-medium tracking-[1px] uppercase rounded-lg border-2 border-primary transition-all duration-300 hover:bg-primary-dark hover:border-primary-dark hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(249,115,22,0.35)]"
          >
            Register Now
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="lg:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1 z-[1001]"
          onClick={toggleMobile}
          aria-label="Toggle navigation menu"
        >
          <span
            className={`block w-7 h-0.5 bg-white rounded transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block w-7 h-0.5 bg-white rounded transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-7 h-0.5 bg-white rounded transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-[280px] h-screen bg-dark flex flex-col pt-24 px-8 pb-8 gap-1 transition-transform duration-300 shadow-[-10px_0_30px_rgba(0,0,0,0.3)] lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={closeMobile}
            className={`w-full px-4 py-3 font-[family-name:var(--font-oswald)] text-[0.9rem] tracking-[1px] uppercase rounded-lg transition-all duration-300 ${
              activeSection === item.href.slice(1)
                ? "text-primary bg-primary/15"
                : "text-white/80 hover:text-white hover:bg-primary/15"
            }`}
          >
            {item.label}
          </Link>
        ))}
        {/* Mobile Logo Toggle */}
        <button
          onClick={toggleLogo}
          className="mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-white/20 bg-white/5 cursor-pointer"
          aria-label="Switch logo version"
        >
          <span className={`text-[0.8rem] font-[family-name:var(--font-oswald)] tracking-[1px] uppercase ${logo === "original" ? "text-primary" : "text-white/40"}`}>
            Logo 1
          </span>
          <div className="relative w-9 h-5 rounded-full bg-white/15">
            <div
              className={`absolute top-0.5 w-4 h-4 rounded-full bg-primary shadow transition-all duration-300 ${
                logo === "alternate" ? "left-[18px]" : "left-0.5"
              }`}
            />
          </div>
          <span className={`text-[0.8rem] font-[family-name:var(--font-oswald)] tracking-[1px] uppercase ${logo === "alternate" ? "text-primary" : "text-white/40"}`}>
            Logo 2
          </span>
        </button>

        <Link
          href="/register"
          onClick={closeMobile}
          className="mt-2 w-full text-center px-5 py-3 bg-primary text-white font-[family-name:var(--font-oswald)] text-[0.9rem] font-medium tracking-[1px] uppercase rounded-lg transition-all duration-300 hover:bg-primary-dark"
        >
          Register Now
        </Link>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-[-1]"
          onClick={closeMobile}
        />
      )}
    </nav>
  );
}
