"use client";

import { useState, useCallback, useEffect } from "react";
import ScrollReveal from "./ui/ScrollReveal";

type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  type: "image" | "video";
  large?: boolean;
  tall?: boolean;
};

const staticGalleryItems: GalleryItem[] = [
  {
    src: "https://images.unsplash.com/photo-1515523110800-9415d13b84a8?w=600&h=400&fit=crop",
    alt: "Basketball game action",
    caption: "Game Day",
    type: "image",
  },
  {
    src: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=600&h=400&fit=crop",
    alt: "Shooting practice",
    caption: "Shooting Practice",
    type: "image",
  },
  {
    src: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=600&h=400&fit=crop",
    alt: "Team huddle",
    caption: "Team Spirit",
    type: "image",
  },
  {
    src: "/images/WhatsApp Image 2026-03-24 at 08.17.49.jpeg",
    alt: "Basketball slam dunk silhouette",
    caption: "Slam Dunk",
    type: "image",
  },
  {
    src: "/images/WhatsApp Image 2026-03-24 at 08.17.50.jpeg",
    alt: "Basketball team unity",
    caption: "Team Unity",
    type: "image",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?w=600&h=400&fit=crop",
    alt: "Fitness conditioning",
    caption: "Conditioning",
    type: "image",
  },
  {
    src: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?w=600&h=400&fit=crop",
    alt: "Basketball close-up",
    caption: "The Game We Love",
    type: "image",
  },
  {
    src: "/images/WhatsApp Image 2026-03-11 at 15.04.37.jpeg",
    alt: "Rulers Basketball Academy",
    caption: "Academy Moments",
    type: "image",
  },
  {
    src: "/images/WhatsApp Image 2026-03-11 at 15.04.38.jpeg",
    alt: "Rulers Basketball Academy",
    caption: "Academy Life",
    type: "image",
  },
  {
    src: "/images/Gemini_Generated_Image_e81br6e81br6e81b.png",
    alt: "Rulers Basketball Academy group photo",
    caption: "Our Academy Family",
    type: "image",
    large: true,
  },
];

type ApiItem = {
  src: string;
  alt: string;
  caption: string;
  type: "image" | "video";
};

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [uploadedItems, setUploadedItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/gallery")
      .then((res) => (res.ok ? res.json() : { items: [] }))
      .then((data: { items?: ApiItem[] }) => {
        if (cancelled || !Array.isArray(data.items)) return;
        setUploadedItems(
          data.items.map((i) => ({
            src: i.src,
            alt: i.alt,
            caption: i.caption,
            type: i.type,
          }))
        );
      })
      .catch(() => {
        /* gallery falls back to static items */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const galleryItems: GalleryItem[] = [...uploadedItems, ...staticGalleryItems];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.classList.add("lightbox-active");
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.classList.remove("lightbox-active");
  }, []);

  const navigate = useCallback(
    (direction: number) => {
      setLightboxIndex((current) => {
        if (current === null) return current;
        return (
          (current + direction + galleryItems.length) % galleryItems.length
        );
      });
    },
    [galleryItems.length]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, closeLightbox, navigate]);

  return (
    <section id="gallery" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-5 py-1.5 bg-primary/10 text-primary font-[family-name:var(--font-oswald)] text-[0.9rem] font-medium tracking-[1px] uppercase rounded-full mb-4">
            <i className="fas fa-images" /> Gallery
          </span>
          <h2 className="font-[family-name:var(--font-bebas-neue)] text-[clamp(2.2rem,5vw,3.2rem)] text-secondary tracking-[2px] leading-tight mb-3">
            Life at <span className="text-primary">the Academy</span>
          </h2>
          <p className="text-[1.05rem] text-gray-500 max-w-[600px] mx-auto">
            Glimpses of our training sessions, tournaments, and academy life
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[250px] gap-4">
          {galleryItems.map((item, i) => (
            <ScrollReveal
              key={`${item.src}-${i}`}
              delay={i * 80}
              className={`${item.large ? "sm:col-span-2" : ""} ${item.tall ? "sm:row-span-2" : ""}`}
            >
              <div
                className="relative rounded-xl overflow-hidden cursor-pointer group h-full bg-gray-200"
                onClick={() => openLightbox(i)}
              >
                {item.type === "image" ? (
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                    loading="lazy"
                  />
                ) : (
                  <>
                    <video
                      src={item.src}
                      muted
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                    />
                    <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 pointer-events-none">
                      <i className="fas fa-play" /> Video
                    </div>
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a]/85 via-[#0f0f1a]/20 to-transparent flex flex-col items-center justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <i className={`fas ${item.type === "video" ? "fa-play" : "fa-expand"} text-primary text-[1.5rem] mb-2`} />
                  <span className="text-white font-[family-name:var(--font-oswald)] text-[1rem] tracking-[1px] uppercase text-center">
                    {item.caption}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-[10000] flex items-center justify-center p-10"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          <button
            className="absolute top-5 right-8 bg-transparent border-none text-white text-[2.5rem] cursor-pointer hover:text-primary transition-colors z-[10001]"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            &times;
          </button>
          <button
            className="absolute left-5 top-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full bg-primary/20 border border-primary/30 text-white flex items-center justify-center cursor-pointer text-[1.2rem] transition-all duration-300 hover:bg-primary z-[10001]"
            onClick={() => navigate(-1)}
            aria-label="Previous item"
          >
            <i className="fas fa-chevron-left" />
          </button>
          <button
            className="absolute right-5 top-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full bg-primary/20 border border-primary/30 text-white flex items-center justify-center cursor-pointer text-[1.2rem] transition-all duration-300 hover:bg-primary z-[10001]"
            onClick={() => navigate(1)}
            aria-label="Next item"
          >
            <i className="fas fa-chevron-right" />
          </button>
          {galleryItems[lightboxIndex].type === "image" ? (
            <img
              src={galleryItems[lightboxIndex].src}
              alt={galleryItems[lightboxIndex].alt}
              className="max-w-[90%] max-h-[85vh] object-contain rounded-xl"
            />
          ) : (
            <video
              key={galleryItems[lightboxIndex].src}
              src={galleryItems[lightboxIndex].src}
              controls
              autoPlay
              playsInline
              className="max-w-[90%] max-h-[85vh] rounded-xl"
            />
          )}
          <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white font-[family-name:var(--font-oswald)] text-[1.1rem] tracking-[1px] uppercase">
            {galleryItems[lightboxIndex].caption}
          </p>
        </div>
      )}
    </section>
  );
}
