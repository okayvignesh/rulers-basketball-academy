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
    "Professional basketball training academy in Hyderabad offering expert coaching for all ages and skill levels.",
  url: "https://rulersbasketballacademy.com",
  telephone: "+919885475372",
  email: "sitabavanikoti@gmail.com",
  foundingDate: "2025-12-01",
  image:
    "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&h=630&fit=crop",
  openingHoursSpecification: [
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
          name: "Weekday Training",
          description: "Monday to Friday basketball training in 3 batches: 5:30-6:30 PM, 6:30-7:30 PM, 7:30-8:30 PM.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Saturday Compensated Class",
          description: "Saturday compensated basketball sessions in 2 batches: 5:00-6:00 PM, 6:00-7:00 PM.",
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
  description: "Professional basketball training academy in Hyderabad.",
  url: "https://rulersbasketballacademy.com",
  telephone: "+919885475372",
  email: "sitabavanikoti@gmail.com",
  image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&h=630&fit=crop",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, UPI, Bank Transfer",
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
