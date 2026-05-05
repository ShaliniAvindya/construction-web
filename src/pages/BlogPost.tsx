import { useParams, Link } from "react-router";
import { FiArrowLeft } from "react-icons/fi";
import { getBlogPostBySlug } from "@/data";

const fallbackPosts: Record<string, {
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  author: string;
  readTime: string;
}> = {
  "future-of-luxury-interiors": {
    title: "The Future of Luxury Interiors: Trends Shaping 2026",
    excerpt: "From biophilic design to smart home integration, discover the emerging trends...",
    featuredImage: "/images/blog-1.jpg",
    category: "design",
    author: "Elena Vasquez",
    readTime: "8 min read",
    content: `Luxury interior design is undergoing a profound transformation. As we move into 2026, several key trends are emerging that blend technology, sustainability, and timeless elegance.

Biophilic Design Takes Center Stage

The integration of nature into interior spaces has evolved from a trend to a fundamental design philosophy. Living walls, natural water features, and organic materials are no longer accents—they are central to the design narrative.

Smart Home Integration, Invisibly

The most sophisticated luxury homes now feature technology that is completely invisible. Climate, lighting, and security systems are managed through intuitive interfaces that disappear into the architecture itself.

Artisanal Craftsmanship Returns

In an age of mass production, bespoke artisanal pieces are becoming the ultimate luxury. Hand-forged metalwork, custom ceramics, and commissioned art pieces tell stories that factory-made items cannot.

Sustainable Luxury

Environmental consciousness is no longer at odds with luxury. The finest materials are now the most sustainable—reclaimed hardwoods, recycled stone, and low-impact textiles that age beautifully over decades.`,
  },
  "sustainable-construction-materials": {
    title: "Sustainable Materials Revolutionizing Construction",
    excerpt: "Cross-laminated timber, recycled glass bricks, and green concrete...",
    featuredImage: "/images/blog-2.jpg",
    category: "sustainability",
    author: "James Whitfield",
    readTime: "6 min read",
    content: `The construction industry accounts for nearly 40% of global carbon emissions. But a materials revolution is underway, offering luxury builders alternatives that don't compromise on quality or aesthetics.

Cross-Laminated Timber (CLT)

Once considered suitable only for low-rise construction, engineered timber products like CLT are now enabling skyscrapers. The Mjostarnet tower in Norway proved timber could reach 18 stories.

Recycled Glass Bricks

Glass bricks crafted from 100% recycled materials offer stunning visual properties while diverting waste from landfills. Their light-transmitting qualities create ethereal interior spaces.

Self-Healing Concrete

Bio-concrete infused with limestone-producing bacteria can autonomously repair cracks, extending building lifespans by decades while reducing maintenance costs.`,
  },
  "designing-for-wellness": {
    title: "Designing for Wellness: Architecture That Heals",
    excerpt: "How intentional design choices in lighting, air quality, and spatial flow...",
    featuredImage: "/images/blog-3.jpg",
    category: "design",
    author: "Dr. Sarah Chen",
    readTime: "10 min read",
    content: `The WELL Building Standard has transformed how architects approach health in design. Beyond aesthetics, the spaces we inhabit can be powerful tools for wellness.

Circadian Lighting Systems

Dynamic lighting that mimics natural daylight patterns helps regulate sleep cycles, improve mood, and boost productivity. The latest systems adjust color temperature throughout the day automatically.

Biophilic Air Quality

Advanced HVAC systems now incorporate plant-based air purification, humidity optimization, and real-time air quality monitoring—creating indoor environments cleaner than mountain air.

Acoustic Architecture

Sound design is becoming as important as visual design. Strategic acoustic treatments, sound masking, and material choices create spaces that reduce stress and improve cognitive function.`,
  },
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPostBySlug(slug || "") || (slug ? fallbackPosts[slug] : null);

  if (!post) {
    return (
      <main className="bg-[#080808] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-[var(--font-display)] text-4xl text-white mb-4">
            Article Not Found
          </h1>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[#C9A87C]"
          >
            <FiArrowLeft size={16} /> Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  const paragraphs = post.content.split("\n\n").filter(Boolean);

  return (
    <main>
      {/* Hero Image */}
      <section className="relative h-[50vh] overflow-hidden">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[rgba(8,8,8,0.4)] to-transparent" />
      </section>

      {/* Content */}
      <section className="bg-[#080808] py-16 lg:py-24">
        <div className="max-w-[800px] mx-auto px-6 lg:px-12">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-[#C9A87C] transition-colors mb-8"
          >
            <FiArrowLeft size={14} /> Back to Blog
          </Link>

          <span className="text-xs uppercase tracking-[0.15em] text-[#C9A87C]">
            {post.category}
          </span>
          <h1 className="font-[var(--font-display)] text-3xl lg:text-4xl text-white mt-3 mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-[#3F3F46] mb-12 pb-8 border-b border-[#3F3F46]/30">
            <span>{post.author}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>

          <div className="prose prose-invert max-w-none">
            {paragraphs.map((para, i) => {
              if (para.includes("\n") && para.length < 100) {
                return (
                  <h2 key={i} className="font-[var(--font-display)] text-2xl text-white mt-12 mb-6">
                    {para}
                  </h2>
                );
              }
              return (
                <p key={i} className="text-lg text-[#D4D4D8] leading-relaxed mb-6">
                  {para}
                </p>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
