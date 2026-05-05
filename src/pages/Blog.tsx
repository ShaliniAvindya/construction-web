import { useState } from "react";
import { Link } from "react-router";
import { trpc } from "@/providers/trpc";

const categories = [
  { label: "All", value: undefined },
  { label: "Design", value: "design" },
  { label: "Construction", value: "construction" },
  { label: "Industry", value: "industry" },
  { label: "Company", value: "company" },
  { label: "Sustainability", value: "sustainability" },
] as const;

const fallbackPosts = [
  {
    id: 1,
    slug: "future-of-luxury-interiors",
    title: "The Future of Luxury Interiors: Trends Shaping 2026",
    excerpt:
      "From biophilic design to smart home integration, discover the emerging trends that are redefining luxury interior spaces for the discerning homeowner.",
    featuredImage: "/images/blog-1.jpg",
    category: "design",
    author: "Elena Vasquez",
    readTime: "8 min read",
    publishedAt: new Date("2026-01-15"),
  },
  {
    id: 2,
    slug: "sustainable-construction-materials",
    title: "Sustainable Materials Revolutionizing Construction",
    excerpt:
      "Cross-laminated timber, recycled glass bricks, and green concrete are changing how we build. Explore the materials making luxury construction more sustainable.",
    featuredImage: "/images/blog-2.jpg",
    category: "sustainability",
    author: "James Whitfield",
    readTime: "6 min read",
    publishedAt: new Date("2026-02-20"),
  },
  {
    id: 3,
    slug: "designing-for-wellness",
    title: "Designing for Wellness: Architecture That Heals",
    excerpt:
      "How intentional design choices in lighting, air quality, and spatial flow can create environments that actively promote physical and mental wellbeing.",
    featuredImage: "/images/blog-3.jpg",
    category: "design",
    author: "Dr. Sarah Chen",
    readTime: "10 min read",
    publishedAt: new Date("2026-03-10"),
  },
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);

  const { data: apiPosts } = trpc.blog.list.useQuery({
    category: activeCategory as any,
    limit: 20,
  });

  const posts = apiPosts?.length ? apiPosts : fallbackPosts;

  const filtered = activeCategory
    ? posts.filter((p) => p.category === activeCategory)
    : posts;

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-[#080808]">
        <div className="text-center px-6">
          <h1 className="font-[var(--font-display)] text-5xl lg:text-6xl text-white mb-6">
            Insights & Perspectives
          </h1>
          <p className="text-lg text-[#A1A1AA] max-w-xl mx-auto">
            Industry trends, design thinking, and company news
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="sticky top-20 z-30 bg-[#18181B] border-b border-[#3F3F46]/50">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 h-16 flex items-center gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-1.5 text-xs uppercase tracking-[0.1em] whitespace-nowrap transition-colors ${
                activeCategory === cat.value
                  ? "bg-[#C9A87C] text-[#080808]"
                  : "bg-transparent border border-[#3F3F46] text-[#A1A1AA] hover:border-[#C9A87C] hover:text-[#C9A87C]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="bg-[#080808] py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          {filtered.length === 0 ? (
            <p className="text-center text-[#A1A1AA] py-20">
              No articles found in this category.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group block bg-[#18181B]"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs uppercase tracking-[0.1em] text-[#C9A87C]">
                      {post.category}
                    </span>
                    <h3 className="font-[var(--font-display)] text-xl text-white mt-2 mb-3 line-clamp-2 group-hover:text-[#C9A87C] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[#A1A1AA] line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="text-xs text-[#3F3F46]">
                      {post.author} · {post.readTime}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
