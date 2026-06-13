import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProgramsSection from "@/components/ProgramsSection";
import GallerySection from "@/components/GallerySection";
import RegistrationSection from "@/components/RegistrationSection";
import RegistrationForm from "@/components/RegistrationForm";
import FaqSection from "@/components/FaqSection";
import { faqItems } from "@/lib/faq-data";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const SITE_URL = "https://rulersbasketballacademy.com";
const PHONE = "+919885475372";
const EMAIL = "sitabavanikoti@gmail.com";

const SERVED_AREAS = [
  "Hyderabad",
  "Secunderabad",
  "Madhapur",
  "Gachibowli",
  "Kondapur",
  "Hitech City",
  "Kukatpally",
  "Miyapur",
  "Nizampet",
  "Jubilee Hills",
  "Banjara Hills",
  "Manikonda",
  "Begumpet",
  "Ameerpet",
  "Nallagandla",
];

const openingHoursSpecification = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "17:30",
    closes: "20:30",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Saturday"],
    opens: "17:00",
    closes: "19:00",
  },
];

const sportsClubSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["SportsActivityLocation", "SportsClub", "LocalBusiness"],
      "@id": `${SITE_URL}/#academy`,
      name: "Rulers Basketball Academy",
      alternateName: "Rulers Basketball Academy Hyderabad",
      description:
        "Professional basketball training academy in Hyderabad. Expert coaching for kids, teens, and adults across Madhapur, Gachibowli, Kondapur, Kukatpally, Hitech City and nearby areas of Hyderabad.",
      url: SITE_URL,
      logo: `${SITE_URL}/images/Asset 1.png`,
      image: [
        `${SITE_URL}/images/Gemini_Generated_Image_e81br6e81br6e81b.png`,
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&h=630&fit=crop",
      ],
      telephone: PHONE,
      email: EMAIL,
      foundingDate: "2025-12-01",
      slogan: "Train Like a Champion",
      sport: "Basketball",
      priceRange: "₹₹",
      currenciesAccepted: "INR",
      paymentAccepted: "Cash, UPI, Bank Transfer",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hyderabad",
        addressRegion: "Telangana",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 17.385044,
        longitude: 78.486671,
      },
      areaServed: SERVED_AREAS.map((name) => ({
        "@type": "City",
        name,
      })),
      openingHoursSpecification,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Basketball Training Programs",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Weekday Basketball Training",
              description:
                "Monday to Friday basketball training in 3 batches: 5:30-6:30 PM, 6:30-7:30 PM, 7:30-8:30 PM.",
              areaServed: "Hyderabad",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Saturday Compensated Class",
              description:
                "Saturday compensated basketball sessions in 2 batches: 5:00-6:00 PM, 6:00-7:00 PM.",
              areaServed: "Hyderabad",
            },
          },
        ],
      },
      knowsAbout: [
        "Basketball coaching",
        "Basketball training",
        "Youth basketball",
        "Basketball fitness",
        "Basketball fundamentals",
      ],
      potentialAction: {
        "@type": "RegisterAction",
        target: `${SITE_URL}/register`,
        name: "Register for basketball coaching",
      },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Rulers Basketball Academy",
      url: SITE_URL,
      logo: `${SITE_URL}/images/Asset 1.png`,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: PHONE,
        contactType: "customer service",
        email: EMAIL,
        areaServed: "IN",
        availableLanguage: ["English", "Telugu", "Hindi"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Rulers Basketball Academy",
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
      ],
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((q) => ({
    "@type": "Question",
    name: q.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: q.answer,
    },
  })),
};

export default function Home() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(sportsClubSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProgramsSection />
        <GallerySection />
        <RegistrationSection />
        <RegistrationForm />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
