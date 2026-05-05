export type Project = {
  id: number;
  slug: string;
  name: string;
  location: string;
  category: string;
  featuredImage: string;
  description?: string;
  year?: string;
  area?: string;
  duration?: string;
  budget?: string;
  images?: string[];
};

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  category: string;
  author: string;
  readTime: string;
  publishedAt: Date;
  content: string;
};

export type Testimonial = {
  id: number;
  quote: string;
  authorName: string;
  authorTitle: string;
  authorCompany?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    slug: "horizon-residence",
    name: "The Horizon Residence",
    location: "Malibu, California",
    category: "residential",
    featuredImage: "/images/project-horizon.jpg",
    description:
      "A sweeping coastal home with seamless indoor-outdoor living, custom material finishes, and a polished, modern aesthetic.",
    year: "2025",
    area: "8,500 sq ft",
    duration: "18 months",
    budget: "$7.8M",
    images: [
      "/images/project-horizon-1.jpg",
      "/images/project-horizon-2.jpg",
      "/images/project-horizon-3.jpg",
    ],
  },
  {
    id: 2,
    slug: "meridian-tower",
    name: "Meridian Corporate Tower",
    location: "Dubai, UAE",
    category: "commercial",
    featuredImage: "/images/project-meridian.jpg",
    description:
      "A landmark office tower with sculptural form, luminous interiors, and sustainable infrastructure designed for global brands.",
    year: "2024",
    area: "120,000 sq ft",
    duration: "22 months",
    budget: "$21M",
    images: [
      "/images/project-meridian-1.jpg",
      "/images/project-meridian-2.jpg",
    ],
  },
  {
    id: 3,
    slug: "villa-serenata",
    name: "Villa Serenata",
    location: "Tuscany, Italy",
    category: "residential",
    featuredImage: "/images/project-serenata.jpg",
    description:
      "A tranquil estate retreat with handcrafted stonework, expansive terraces, and immersive views across the countryside.",
    year: "2025",
    area: "15,200 sq ft",
    duration: "24 months",
    budget: "$12.5M",
    images: [
      "/images/project-serenata-1.jpg",
      "/images/project-serenata-2.jpg",
      "/images/project-serenata-3.jpg",
    ],
  },
  {
    id: 4,
    slug: "green-sanctuary",
    name: "The Green Sanctuary",
    location: "Singapore",
    category: "landscape",
    featuredImage: "/images/project-sanctuary.jpg",
    description:
      "A biodiverse landscape sanctuary woven through a private residence, bringing lush geometry and calmness to every outdoor room.",
    year: "2025",
    area: "32,000 sq ft",
    duration: "14 months",
    budget: "$9.4M",
    images: [
      "/images/project-sanctuary-1.jpg",
      "/images/project-sanctuary-2.jpg",
    ],
  },
  {
    id: 5,
    slug: "urban-loft-collection",
    name: "Urban Loft Collection",
    location: "New York, NY",
    category: "interior",
    featuredImage: "/images/service-interior.jpg",
    description:
      "A series of refined loft renovations blending industrial heritage with intimate hospitality-inspired interiors.",
    year: "2025",
    area: "9,200 sq ft",
    duration: "12 months",
    budget: "$6.1M",
    images: [
      "/images/project-loft-1.jpg",
      "/images/project-loft-2.jpg",
    ],
  },
  {
    id: 6,
    slug: "coastal-pavilion",
    name: "Coastal Pavilion",
    location: "Miami, Florida",
    category: "exterior",
    featuredImage: "/images/service-exterior.jpg",
    description:
      "A light-filled pavilion that frames ocean views, sculpted terraces, and elegant outdoor living areas.",
    year: "2024",
    area: "7,300 sq ft",
    duration: "10 months",
    budget: "$5.2M",
    images: [
      "/images/project-pavilion-1.jpg",
      "/images/project-pavilion-2.jpg",
    ],
  },
];

export const featuredProjects = projects.slice(0, 4);

export const blogPosts: BlogPost[] = [
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
    content: `The construction industry accounts for nearly 40% of global carbon emissions. But a materials revolution is underway, offering luxury builders alternatives that don't compromise on quality or aesthetics.

Cross-Laminated Timber (CLT)

Once considered suitable only for low-rise construction, engineered timber products like CLT are now enabling skyscrapers. The Mjostarnet tower in Norway proved timber could reach 18 stories.

Recycled Glass Bricks

Glass bricks crafted from 100% recycled materials offer stunning visual properties while diverting waste from landfills. Their light-transmitting qualities create ethereal interior spaces.

Self-Healing Concrete

Bio-concrete infused with limestone-producing bacteria can autonomously repair cracks, extending building lifespans by decades while reducing maintenance costs.`,
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
    content: `The WELL Building Standard has transformed how architects approach health in design. Beyond aesthetics, the spaces we inhabit can be powerful tools for wellness.

Circadian Lighting Systems

Dynamic lighting that mimics natural daylight patterns helps regulate sleep cycles, improve mood, and boost productivity. The latest systems adjust color temperature throughout the day automatically.

Biophilic Air Quality

Advanced HVAC systems now incorporate plant-based air purification, humidity optimization, and real-time air quality monitoring—creating indoor environments cleaner than mountain air.

Acoustic Architecture

Sound design is becoming as important as visual design. Strategic acoustic treatments, sound masking, and material choices create spaces that reduce stress and improve cognitive function.`,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "Apex Construct transformed our vision into a home that exceeds every expectation. Their attention to detail is unparalleled.",
    authorName: "Alexandra Chen",
    authorTitle: "CEO",
    authorCompany: "Horizon Ventures",
  },
  {
    id: 2,
    quote:
      "The level of craftsmanship and professionalism throughout our commercial build was extraordinary. A true partner in every sense.",
    authorName: "Marcus Whitfield",
    authorTitle: "Director",
    authorCompany: "Meridian Group",
  },
  {
    id: 3,
    quote:
      "From the initial consultation to the final walkthrough, every interaction was marked by expertise and genuine care.",
    authorName: "Isabella Romano",
    authorTitle: "Private Client",
    authorCompany: "Tuscany",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function searchData(query: string) {
  const normalized = query.toLowerCase();

  return {
    projects: projects.filter(
      (project) =>
        project.name.toLowerCase().includes(normalized) ||
        project.location.toLowerCase().includes(normalized) ||
        project.category.toLowerCase().includes(normalized),
    ),
    blogPosts: blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(normalized) ||
        post.excerpt.toLowerCase().includes(normalized) ||
        post.category.toLowerCase().includes(normalized),
    ),
  };
}
