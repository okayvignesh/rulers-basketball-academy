import type { Metadata } from "next";
import { Inter, Bebas_Neue, Oswald } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rulers Basketball Academy | Train Like a Champion",
  description:
    "Professional basketball training academy in Miyapur, Hyderabad. Expert coaching for all ages and skill levels. MSME registered (UDYAM-TS-09-0205178). Join us and train like a champion!",
  keywords: [
    "basketball academy",
    "basketball training",
    "Hyderabad",
    "Miyapur",
    "sports academy",
    "basketball coaching",
    "youth basketball",
    "Rulers Basketball Academy",
    "Telangana sports",
  ],
  authors: [{ name: "Rulers Basketball Academy" }],
  openGraph: {
    title: "Rulers Basketball Academy | Train Like a Champion",
    description:
      "Professional basketball training for all ages in Hyderabad. Build your skills with expert coaching.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body
        className={`${inter.variable} ${bebasNeue.variable} ${oswald.variable} antialiased bg-white text-gray-800`}
      >
        {children}
      </body>
    </html>
  );
}
