import type { Metadata } from "next";

const SITE_URL = "https://rulersbasketballacademy.com";

export const metadata: Metadata = {
  title: "Register for Basketball Coaching in Hyderabad",
  description:
    "Register your child for professional basketball coaching at Rulers Basketball Academy, Hyderabad. Quick form, expert coaches, flexible batches.",
  alternates: {
    canonical: `${SITE_URL}/register`,
  },
  openGraph: {
    title: "Register for Basketball Coaching in Hyderabad | Rulers Basketball Academy",
    description:
      "Sign up for basketball training at Rulers Basketball Academy, Hyderabad. Programs for all ages and skill levels — beginners to advanced.",
    url: `${SITE_URL}/register`,
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Register | Rulers Basketball Academy Hyderabad",
    description:
      "Sign up for basketball coaching at Rulers Basketball Academy, Hyderabad.",
  },
  robots: { index: true, follow: true },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
