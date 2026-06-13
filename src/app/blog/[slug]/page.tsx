import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { getAllSlugs, getPost, getRelatedPosts } from "@/lib/blog";

const SITE_URL = "https://rulersbasketballacademy.com";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) {
    return { title: "Post not found" };
  }
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      locale: "en_IN",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.coverAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.coverImage],
    },
    robots: { index: true, follow: true },
  };
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post, 3);
  const url = `${SITE_URL}/blog/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: [post.coverImage],
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Rulers Basketball Academy",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/Asset 1.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    keywords: post.tags.join(", "),
    inLanguage: "en-IN",
    wordCount: post.wordCount,
    articleSection: post.category,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />
      <main className="bg-white">
        {/* Cover */}
        <div className="pt-24 pb-6 px-5">
          <div className="max-w-3xl mx-auto">
            <nav
              aria-label="Breadcrumb"
              className="text-[0.8rem] text-gray-400 mb-6 flex items-center gap-2"
            >
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link
                href="/blog"
                className="hover:text-primary transition-colors"
              >
                Blog
              </Link>
              <span>/</span>
              <span className="text-gray-500 truncate">{post.category}</span>
            </nav>

            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-[0.72rem] font-[family-name:var(--font-oswald)] tracking-[1px] uppercase rounded mb-5">
              {post.category}
            </span>

            <h1 className="font-[family-name:var(--font-bebas-neue)] text-[clamp(2rem,5vw,3.4rem)] text-secondary tracking-[1.5px] leading-[1.1] mb-5">
              {post.title}
            </h1>
            <p className="text-gray-600 text-[1.15rem] leading-relaxed mb-7">
              {post.description}
            </p>

            <div className="flex items-center gap-4 text-[0.9rem] text-gray-500 pb-7 border-b border-gray-200">
              <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <i className="fas fa-basketball-ball" />
              </div>
              <div>
                <p className="text-secondary font-medium">{post.author}</p>
                <p className="text-[0.82rem] text-gray-400">
                  {formatDate(post.date)} · {post.readingTime} min read
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cover image */}
        {post.coverImage && (
          <div className="px-5 mb-10">
            <div className="max-w-4xl mx-auto aspect-[16/9] overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.coverImage}
                alt={post.coverAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Body */}
        <article className="px-5 pb-20">
          <div
            className="max-w-3xl mx-auto prose prose-lg prose-headings:font-[family-name:var(--font-oswald)] prose-headings:text-secondary prose-headings:tracking-[0.3px] prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-[1.7rem] prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-[1.3rem] prose-p:text-gray-700 prose-p:leading-[1.85] prose-p:text-[1.08rem] prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-secondary prose-li:text-gray-700 prose-li:leading-[1.7] prose-img:rounded-xl prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-1 prose-blockquote:px-5 prose-blockquote:rounded-r-lg prose-blockquote:text-gray-700 prose-blockquote:not-italic"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-gray-200">
              <p className="text-[0.78rem] text-gray-400 uppercase tracking-[1px] mb-3 font-[family-name:var(--font-oswald)]">
                Tagged
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 bg-gray-100 text-gray-600 text-[0.82rem] rounded-full"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="max-w-3xl mx-auto mt-12">
            <div className="bg-gradient-to-br from-secondary to-dark text-white rounded-2xl p-8 sm:p-10 text-center">
              <h3 className="font-[family-name:var(--font-bebas-neue)] text-[1.8rem] tracking-[2px] mb-3">
                Train With <span className="text-primary">Rulers Basketball Academy</span>
              </h3>
              <p className="text-white/65 mb-6 max-w-[520px] mx-auto">
                Join our basketball coaching programs in Hyderabad. Expert
                coaches, structured drills, and a path from beginner to
                competitive player.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-7 py-3 bg-primary text-white font-[family-name:var(--font-oswald)] text-[0.95rem] font-medium tracking-[1px] uppercase rounded-lg transition-all duration-300 hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(249,115,22,0.35)]"
              >
                <i className="fas fa-clipboard-list" /> Register Now
              </Link>
            </div>
          </div>
        </article>

        {/* Related */}
        {related.length > 0 && (
          <section className="bg-gray-50 py-16 px-5">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-[family-name:var(--font-bebas-neue)] text-[1.8rem] text-secondary tracking-[1.5px] mb-8">
                Keep <span className="text-primary">Reading</span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="block group"
                  >
                    <div className="aspect-[16/10] overflow-hidden rounded-xl mb-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.coverImage}
                        alt={p.coverAlt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="font-[family-name:var(--font-oswald)] text-[1.05rem] text-secondary leading-snug group-hover:text-primary transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-[0.8rem] text-gray-400 mt-2">
                      {p.readingTime} min read
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
