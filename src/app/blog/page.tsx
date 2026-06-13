import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { getAllPosts } from "@/lib/blog";

const SITE_URL = "https://rulersbasketballacademy.com";

export const metadata: Metadata = {
  title: "Basketball Blog | Tips, Drills & Coaching Insights",
  description:
    "Expert basketball articles, drills, parent guides and coaching tips from Rulers Basketball Academy, Hyderabad. Practical insights for players and parents.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "Basketball Blog | Rulers Basketball Academy Hyderabad",
    description:
      "Expert basketball articles, drills, parent guides and coaching tips from Rulers Basketball Academy, Hyderabad.",
    url: `${SITE_URL}/blog`,
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Basketball Blog | Rulers Basketball Academy Hyderabad",
    description:
      "Expert basketball articles, drills and parent guides from Rulers Basketball Academy, Hyderabad.",
  },
  robots: { index: true, follow: true },
};

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/blog#blog`,
    name: "Rulers Basketball Academy Blog",
    description:
      "Basketball coaching tips, drills and parent guides from Rulers Basketball Academy, Hyderabad.",
    url: `${SITE_URL}/blog`,
    inLanguage: "en-IN",
    publisher: {
      "@type": "Organization",
      name: "Rulers Basketball Academy",
      url: SITE_URL,
      logo: `${SITE_URL}/images/Asset 1.png`,
    },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.date,
      image: p.coverImage,
      author: { "@type": "Organization", name: p.author },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <Navbar />
      <main className="bg-white min-h-screen">
        {/* Header */}
        <section className="bg-gradient-to-br from-secondary to-dark pt-32 pb-16 px-5">
          <div className="max-w-5xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-5 py-1.5 bg-primary/15 text-primary-light font-[family-name:var(--font-oswald)] text-[0.85rem] tracking-[1.5px] uppercase rounded-full mb-5 border border-primary/30">
              <i className="fas fa-newspaper" /> Blog
            </span>
            <h1 className="font-[family-name:var(--font-bebas-neue)] text-[clamp(2.4rem,6vw,4rem)] text-white tracking-[2px] leading-tight mb-4">
              Basketball Insights from{" "}
              <span className="text-primary">Hyderabad</span>
            </h1>
            <p className="text-white/60 text-[1.05rem] max-w-[640px] mx-auto">
              Coaching tips, training drills, parent guides, and lessons from
              the court — straight from the Rulers Basketball Academy coaching
              team.
            </p>
          </div>
        </section>

        {/* Posts */}
        <section className="py-20 px-5">
          <div className="max-w-6xl mx-auto">
            {posts.length === 0 ? (
              <p className="text-center text-gray-500">
                No posts yet. Check back soon.
              </p>
            ) : (
              <>
                {/* Featured */}
                {featured && (
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="block mb-14 group"
                  >
                    <article className="grid md:grid-cols-[1.2fr_1fr] gap-8 items-center bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 hover:border-primary transition-all duration-300">
                      <div className="aspect-[16/10] md:aspect-auto md:h-full overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={featured.coverImage}
                          alt={featured.coverAlt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                          loading="eager"
                        />
                      </div>
                      <div className="p-8 md:pr-10">
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-[0.75rem] font-[family-name:var(--font-oswald)] tracking-[1px] uppercase rounded mb-4">
                          Featured · {featured.category}
                        </span>
                        <h2 className="font-[family-name:var(--font-bebas-neue)] text-[clamp(1.8rem,3.5vw,2.6rem)] text-secondary tracking-[1.5px] leading-tight mb-3 group-hover:text-primary transition-colors">
                          {featured.title}
                        </h2>
                        <p className="text-gray-600 text-[1rem] leading-relaxed mb-5">
                          {featured.description}
                        </p>
                        <div className="flex items-center gap-4 text-[0.85rem] text-gray-500">
                          <span>
                            <i className="far fa-calendar mr-1.5" />
                            {formatDate(featured.date)}
                          </span>
                          <span>
                            <i className="far fa-clock mr-1.5" />
                            {featured.readingTime} min read
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                )}

                {/* Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {rest.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="block group"
                    >
                      <article className="flex flex-col h-full">
                        <div className="aspect-[16/10] overflow-hidden rounded-xl mb-4 bg-gray-100">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={post.coverImage}
                            alt={post.coverAlt}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                            loading="lazy"
                          />
                        </div>
                        <span className="text-primary text-[0.72rem] font-[family-name:var(--font-oswald)] tracking-[1px] uppercase mb-2">
                          {post.category}
                        </span>
                        <h3 className="font-[family-name:var(--font-oswald)] text-[1.15rem] text-secondary leading-snug mb-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-500 text-[0.92rem] leading-relaxed mb-4 line-clamp-3">
                          {post.description}
                        </p>
                        <div className="mt-auto flex items-center gap-3 text-[0.8rem] text-gray-400">
                          <span>{formatDate(post.date)}</span>
                          <span>·</span>
                          <span>{post.readingTime} min read</span>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
