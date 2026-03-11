"use client";

import { useState, useEffect } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className={`fixed bottom-8 right-8 w-12 h-12 bg-primary text-white border-none rounded-lg flex items-center justify-center text-[1.1rem] cursor-pointer transition-all duration-300 z-[999] shadow-[0_4px_20px_rgba(249,115,22,0.4)] hover:bg-primary-dark hover:-translate-y-1 ${
        visible
          ? "opacity-100 visible translate-y-0"
          : "opacity-0 invisible translate-y-5"
      }`}
    >
      <i className="fas fa-arrow-up" />
    </button>
  );
}
