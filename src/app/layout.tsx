import type { Metadata, Viewport } from "next";
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

const SITE_URL = "https://rulersbasketballacademy.com";
const SITE_NAME = "Rulers Basketball Academy";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f97316",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rulers Basketball Academy | Professional Basketball Training in Hyderabad",
    template: "%s | Rulers Basketball Academy",
  },
  description:
    "Rulers Basketball Academy offers professional basketball training in Miyapur, Hyderabad for all ages. Expert coaching, structured programs for beginners to advanced players. MSME registered. Join now!",
  keywords: [
    "basketball academy Hyderabad",
    "basketball training Miyapur",
    "basketball coaching Hyderabad",
    "youth basketball training",
    "kids basketball academy",
    "sports academy Hyderabad",
    "basketball classes near me",
    "Rulers Basketball Academy",
    "basketball camp Hyderabad",
    "professional basketball training",
    "basketball academy Telangana",
    "Serilingampally sports",
    "Miyapur sports academy",
    "weekend basketball camp",
    "basketball for kids Hyderabad",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Rulers Basketball Academy | Train Like a Champion",
    description:
      "Professional basketball training for all ages in Miyapur, Hyderabad. Expert coaches, structured programs, tournament exposure. Enroll today!",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Rulers Basketball Academy - Professional Basketball Training",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rulers Basketball Academy | Train Like a Champion",
    description:
      "Professional basketball training for all ages in Hyderabad. Expert coaching, structured programs. Join now!",
    images: [
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&h=630&fit=crop",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "sports",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" dir="ltr">
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
