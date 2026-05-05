import { getDb } from "../api/queries/connection";
import {
  projects,
  blogPosts,
  testimonials,
} from "./schema";

async function seed() {
  const db = getDb();

  // Seed projects
  const projectData = [
    {
      slug: "horizon-residence",
      name: "The Horizon Residence",
      location: "Malibu, California",
      category: "residential" as const,
      description:
        "An extraordinary cliffside residence featuring cantilevered architecture, floor-to-ceiling glass walls, and an infinity pool that merges with the Pacific Ocean. This 12,000 sq ft home represents the pinnacle of coastal luxury living, with smart home integration and sustainable design elements throughout.",
      area: "12,000 sq ft",
      duration: "24 months",
      year: 2024,
      budget: "$18M",
      featuredImage: "/images/project-horizon.jpg",
      images: JSON.stringify([
        "/images/project-horizon.jpg",
        "/images/service-interior.jpg",
        "/images/service-exterior.jpg",
      ]),
      featured: true,
    },
    {
      slug: "meridian-tower",
      name: "Meridian Corporate Tower",
      location: "Dubai, UAE",
      category: "commercial" as const,
      description:
        "A 45-story commercial landmark featuring angular glass facades with warm LED accent lighting. The tower houses premium office spaces, a rooftop observation deck, and a biophilic atrium that brings nature into the workplace. LEED Platinum certified.",
      area: "850,000 sq ft",
      duration: "36 months",
      year: 2023,
      budget: "$120M",
      featuredImage: "/images/project-meridian.jpg",
      images: JSON.stringify([
        "/images/project-meridian.jpg",
        "/images/service-management.jpg",
      ]),
      featured: true,
    },
    {
      slug: "villa-serenata",
      name: "Villa Serenata",
      location: "Tuscany, Italy",
      category: "residential" as const,
      description:
        "A masterful restoration of a 16th-century Tuscan villa with a contemporary glass extension. Ancient stone walls meet modern minimalism across 8,500 sq ft of living space, surrounded by cypress-lined gardens and lavender fields.",
      area: "8,500 sq ft",
      duration: "30 months",
      year: 2023,
      budget: "12M EUR",
      featuredImage: "/images/project-serenata.jpg",
      images: JSON.stringify([
        "/images/project-serenata.jpg",
        "/images/service-landscape.jpg",
      ]),
      featured: true,
    },
    {
      slug: "green-sanctuary",
      name: "The Green Sanctuary",
      location: "Singapore",
      category: "landscape" as const,
      description:
        "A revolutionary biophilic office complex featuring 40,000 sq ft of living walls, a glass atrium with dappled natural light, and natural wood walkways. This project redefines the intersection of architecture and ecology in urban environments.",
      area: "40,000 sq ft",
      duration: "18 months",
      year: 2024,
      budget: "$45M",
      featuredImage: "/images/project-sanctuary.jpg",
      images: JSON.stringify([
        "/images/project-sanctuary.jpg",
        "/images/service-construction.jpg",
      ]),
      featured: true,
    },
    {
      slug: "urban-loft-collection",
      name: "Urban Loft Collection",
      location: "New York, NY",
      category: "interior" as const,
      description:
        "A boutique residential development in SoHo featuring 24 bespoke loft apartments. Each unit showcases curated interiors with artisanal materials, brass fixtures, and floor-to-ceiling warehouse windows restored to their industrial glory.",
      area: "48,000 sq ft",
      duration: "22 months",
      year: 2022,
      budget: "$32M",
      featuredImage: "/images/service-interior.jpg",
      images: JSON.stringify([
        "/images/service-interior.jpg",
        "/images/blog-1.jpg",
      ]),
      featured: false,
    },
    {
      slug: "coastal-pavilion",
      name: "Coastal Pavilion",
      location: "Miami, Florida",
      category: "exterior" as const,
      description:
        "A dramatic oceanfront residence featuring sculptural concrete forms and expansive glass walls. The exterior design incorporates hurricane-resistant engineering with artful precision, creating a home that is both fortress and sanctuary.",
      area: "15,000 sq ft",
      duration: "28 months",
      year: 2024,
      budget: "$22M",
      featuredImage: "/images/service-exterior.jpg",
      images: JSON.stringify([
        "/images/service-exterior.jpg",
        "/images/project-horizon.jpg",
      ]),
      featured: false,
    },
  ];

  for (const p of projectData) {
    await db.insert(projects).values(p).onDuplicateKeyUpdate({
      set: { name: p.name },
    });
  }

  // Seed blog posts
  const blogData = [
    {
      slug: "future-of-luxury-interiors",
      title: "The Future of Luxury Interiors: Trends Shaping 2026",
      excerpt:
        "From biophilic design to smart home integration, discover the emerging trends that are redefining luxury interior spaces for the discerning homeowner.",
      content: `
Luxury interior design is undergoing a profound transformation. As we move into 2026, several key trends are emerging that blend technology, sustainability, and timeless elegance.

## Biophilic Design Takes Center Stage

The integration of nature into interior spaces has evolved from a trend to a fundamental design philosophy. Living walls, natural water features, and organic materials are no longer accents—they are central to the design narrative.

## Smart Home Integration, Invisibly

The most sophisticated luxury homes now feature technology that is completely invisible. Climate, lighting, and security systems are managed through intuitive interfaces that disappear into the architecture itself.

## Artisanal Craftsmanship Returns

In an age of mass production, bespoke artisanal pieces are becoming the ultimate luxury. Hand-forged metalwork, custom ceramics, and commissioned art pieces tell stories that factory-made items cannot.

## Sustainable Luxury

Environmental consciousness is no longer at odds with luxury. The finest materials are now the most sustainable—reclaimed hardwoods, recycled stone, and low-impact textiles that age beautifully over decades.
      `,
      featuredImage: "/images/blog-1.jpg",
      category: "design" as const,
      author: "Elena Vasquez",
      readTime: "8 min read",
    },
    {
      slug: "sustainable-construction-materials",
      title: "Sustainable Materials Revolutionizing Construction",
      excerpt:
        "Cross-laminated timber, recycled glass bricks, and green concrete are changing how we build. Explore the materials making luxury construction more sustainable.",
      content: `
The construction industry accounts for nearly 40% of global carbon emissions. But a materials revolution is underway, offering luxury builders alternatives that don't compromise on quality or aesthetics.

## Cross-Laminated Timber (CLT)

Once considered suitable only for low-rise construction, engineered timber products like CLT are now enabling skyscrapers. The Mjostarnet tower in Norway proved timber could reach 18 stories—and new projects are pushing even higher.

## Recycled Glass Bricks

Glass bricks crafted from 100% recycled materials offer stunning visual properties while diverting waste from landfills. Their light-transmitting qualities create ethereal interior spaces.

## Self-Healing Concrete

Bio-concrete infused with limestone-producing bacteria can autonomously repair cracks, extending building lifespans by decades while reducing maintenance costs.
      `,
      featuredImage: "/images/blog-2.jpg",
      category: "sustainability" as const,
      author: "James Whitfield",
      readTime: "6 min read",
    },
    {
      slug: "designing-for-wellness",
      title: "Designing for Wellness: Architecture That Heals",
      excerpt:
        "How intentional design choices in lighting, air quality, and spatial flow can create environments that actively promote physical and mental wellbeing.",
      content: `
The WELL Building Standard has transformed how architects approach health in design. Beyond aesthetics, the spaces we inhabit can be powerful tools for wellness.

## Circadian Lighting Systems

Dynamic lighting that mimics natural daylight patterns helps regulate sleep cycles, improve mood, and boost productivity. The latest systems adjust color temperature throughout the day automatically.

## Biophilic Air Quality

Advanced HVAC systems now incorporate plant-based air purification, humidity optimization, and real-time air quality monitoring—creating indoor environments cleaner than mountain air.

## Acoustic Architecture

Sound design is becoming as important as visual design. Strategic acoustic treatments, sound masking, and material choices create spaces that reduce stress and improve cognitive function.
      `,
      featuredImage: "/images/blog-3.jpg",
      category: "design" as const,
      author: "Dr. Sarah Chen",
      readTime: "10 min read",
    },
  ];

  for (const b of blogData) {
    await db.insert(blogPosts).values(b).onDuplicateKeyUpdate({
      set: { title: b.title },
    });
  }

  // Seed testimonials
  const testimonialData = [
    {
      quote:
        "Apex Construct transformed our vision into a home that exceeds every expectation. Their attention to detail is unparalleled.",
      authorName: "Alexandra Chen",
      authorTitle: "CEO",
      authorCompany: "Horizon Ventures",
      avatar: null,
      order: 1,
    },
    {
      quote:
        "The level of craftsmanship and professionalism throughout our commercial build was extraordinary. A true partner in every sense.",
      authorName: "Marcus Whitfield",
      authorTitle: "Director",
      authorCompany: "Meridian Group",
      avatar: null,
      order: 2,
    },
    {
      quote:
        "From the initial consultation to the final walkthrough, every interaction was marked by expertise and genuine care.",
      authorName: "Isabella Romano",
      authorTitle: "Private Client",
      authorCompany: "Tuscany",
      avatar: null,
      order: 3,
    },
    {
      quote:
        "They delivered our project on time and under budget without compromising an ounce of quality. Truly world-class execution.",
      authorName: "Robert Tanaka",
      authorTitle: "Development Director",
      authorCompany: "Pacific Heights Properties",
      avatar: null,
      order: 4,
    },
  ];

  for (const t of testimonialData) {
    await db.insert(testimonials).values(t).onDuplicateKeyUpdate({
      set: { quote: t.quote },
    });
  }

  console.log("Seed complete!");
}

seed().catch(console.error);
