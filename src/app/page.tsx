import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProgramsSection from "@/components/ProgramsSection";
import GallerySection from "@/components/GallerySection";
import RegistrationSection from "@/components/RegistrationSection";
import RegistrationForm from "@/components/RegistrationForm";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

/* JSON-LD Structured Data for SEO */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "Rulers Basketball Academy",
  description:
    "Professional basketball training academy in Miyapur, Hyderabad offering expert coaching for all ages and skill levels.",
  url: "https://rulersbasketballacademy.com",
  telephone: "+919885475372",
  email: "sitabavanikoti@gmail.com",
  foundingDate: "2025-12-01",
  address: {
    "@type": "PostalAddress",
    streetAddress: "H.No 20-16/6, Kendirya Vihar, Flat No-6, 2nd Floor, Block-16, Mayuri Nagar",
    addressLocality: "Miyapur, Serilingampally",
    addressRegion: "Telangana",
    postalCode: "500049",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 17.4969,
    longitude: 78.3575,
  },
  image:
    "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&h=630&fit=crop",
  priceRange: "₹1,500 - ₹3,000",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "05:30",
      closes: "08:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "17:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "07:00",
      closes: "10:00",
    },
  ],
  sport: "Basketball",
  areaServed: {
    "@type": "City",
    name: "Hyderabad",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Basketball Training Programs",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Beginner Training",
          description: "Basketball fundamentals for ages 6-12. Dribbling, passing, shooting, and game rules.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Intermediate Training",
          description: "Advanced drills and team strategies for ages 12-16.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Advanced Competitive Training",
          description: "Elite training for ages 16+ with tournament preparation and strength conditioning.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Weekend Camps",
          description: "Intensive weekend basketball sessions for all ages and skill levels.",
        },
      },
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://rulersbasketballacademy.com",
    },
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://rulersbasketballacademy.com/#business",
  name: "Rulers Basketball Academy",
  description: "MSME registered professional basketball training academy in Hyderabad.",
  url: "https://rulersbasketballacademy.com",
  telephone: "+919885475372",
  email: "sitabavanikoti@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "H.No 20-16/6, Kendirya Vihar, Mayuri Nagar, Miyapur",
    addressLocality: "Serilingampally, Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500049",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 17.4969,
    longitude: 78.3575,
  },
  image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&h=630&fit=crop",
  priceRange: "₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, UPI, Bank Transfer",
  identifier: {
    "@type": "PropertyValue",
    name: "UDYAM Registration Number",
    value: "UDYAM-TS-09-0205178",
  },
};

export default function Home() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
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
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
