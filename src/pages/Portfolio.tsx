import { useState } from "react";
import { Link } from "react-router";
import { FiSearch, FiArrowRight } from "react-icons/fi";
import { trpc } from "@/providers/trpc";

const categories = [
  { label: "All", value: undefined },
  { label: "Residential", value: "residential" },
  { label: "Commercial", value: "commercial" },
  { label: "Landscape", value: "landscape" },
  { label: "Interior", value: "interior" },
  { label: "Exterior", value: "exterior" },
] as const;

const fallbackProjects = [
  {
    id: 1,
    slug: "horizon-residence",
    name: "The Horizon Residence",
    location: "Malibu, California",
    category: "residential",
    featuredImage: "/images/project-horizon.jpg",
  },
  {
    id: 2,
    slug: "meridian-tower",
    name: "Meridian Corporate Tower",
    location: "Dubai, UAE",
    category: "commercial",
    featuredImage: "/images/project-meridian.jpg",
  },
  {
    id: 3,
    slug: "villa-serenata",
    name: "Villa Serenata",
    location: "Tuscany, Italy",
    category: "residential",
    featuredImage: "/images/project-serenata.jpg",
  },
  {
    id: 4,
    slug: "green-sanctuary",
    name: "The Green Sanctuary",
    location: "Singapore",
    category: "landscape",
    featuredImage: "/images/project-sanctuary.jpg",
  },
  {
    id: 5,
    slug: "urban-loft-collection",
    name: "Urban Loft Collection",
    location: "New York, NY",
    category: "interior",
    featuredImage: "/images/service-interior.jpg",
  },
  {
    id: 6,
    slug: "coastal-pavilion",
    name: "Coastal Pavilion",
    location: "Miami, Florida",
    category: "exterior",
    featuredImage: "/images/service-exterior.jpg",
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: apiProjects } = trpc.project.list.useQuery({
    category: activeCategory as any,
    search: searchQuery || undefined,
    limit: 20,
  });

  const projects = apiProjects?.length ? apiProjects : fallbackProjects;

  const filtered = activeCategory
    ? projects.filter((p) => p.category === activeCategory)
    : projects;

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-[#080808]">
        <div className="text-center px-6">
          <h1 className="font-[var(--font-display)] text-5xl lg:text-6xl text-white mb-6">
            Our Portfolio
          </h1>
          <p className="text-lg text-[#A1A1AA] max-w-xl mx-auto">
            A curated selection of our finest work
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="sticky top-20 z-30 bg-[#18181B] border-b border-[#3F3F46]/50">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-2">
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
          <div className="relative hidden sm:block">
            <FiSearch
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3F3F46]"
            />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#080808] border border-[#3F3F46] text-white text-sm pl-9 pr-4 py-2 w-56 outline-none focus:border-[#C9A87C] transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="bg-[#080808] py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          {filtered.length === 0 ? (
            <p className="text-center text-[#A1A1AA] py-20">
              No projects found matching your criteria.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project) => (
                <Link
                  key={project.id}
                  to={`/portfolio/${project.slug}`}
                  className="group block"
                >
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={project.featuredImage}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,8,8,0.8)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="text-xs uppercase tracking-[0.1em] text-[#C9A87C] mb-2">
                        {project.category}
                      </span>
                      <span className="text-sm text-white flex items-center gap-2">
                        View <FiArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                  <div className="pt-4">
                    <h3 className="font-[var(--font-display)] text-xl text-white group-hover:text-[#C9A87C] transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-[#A1A1AA] mt-1">
                      {project.location}
                    </p>
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
