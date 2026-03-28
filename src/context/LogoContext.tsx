"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type LogoVariant = "original" | "alternate";

const LogoContext = createContext<{
  logo: LogoVariant;
  toggleLogo: () => void;
  logoSrc: string;
}>({
  logo: "original",
  toggleLogo: () => {},
  logoSrc: "/images/Asset 1.png",
});

const LOGO_SOURCES: Record<LogoVariant, string> = {
  original: "/images/Asset 1.png",
  alternate: "/images/logo-2.png",
};

export function LogoProvider({ children }: { children: ReactNode }) {
  const [logo, setLogo] = useState<LogoVariant>("original");

  const toggleLogo = () =>
    setLogo((prev) => (prev === "original" ? "alternate" : "original"));

  return (
    <LogoContext.Provider value={{ logo, toggleLogo, logoSrc: LOGO_SOURCES[logo] }}>
      {children}
    </LogoContext.Provider>
  );
}

export const useLogo = () => useContext(LogoContext);
