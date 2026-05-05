import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { FiArrowRight } from "react-icons/fi";
import { trpc } from "@/providers/trpc";

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
];

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { data: apiProjects } = trpc.project.list.useQuery({ limit: 4 });
  const projects = apiProjects?.length ? apiProjects : fallbackProjects;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".project-card");
            cards.forEach((card, i) => {
              setTimeout(() => {
                (card as HTMLElement).style.clipPath = "inset(0% 0 0 0)";
                (card as HTMLElement).style.opacity = "1";
              }, i * 150);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [projects]);

  return (
    <section ref={sectionRef} className="bg-[#080808] py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#C9A87C] mb-4">
              Portfolio
            </p>
            <h2 className="font-[var(--font-display)] text-4xl lg:text-5xl text-white">
              Selected Works
            </h2>
          </div>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.1em] text-[#C9A87C] hover:gap-3 transition-all duration-300"
          >
            View All Projects <FiArrowRight size={14} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/portfolio/${project.slug}`}
              className="project-card group block opacity-0"
              style={{
                clipPath: "inset(100% 0 0 0)",
                transition: "clip-path 1s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease-out",
              }}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.featuredImage}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,8,8,0.8)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-sm uppercase tracking-[0.1em] text-[#C9A87C] flex items-center gap-2">
                    View Project <FiArrowRight size={14} />
                  </span>
                </div>
              </div>
              <div className="pt-6">
                <h3 className="font-[var(--font-display)] text-2xl text-white mb-2 group-hover:text-[#C9A87C] transition-colors">
                  {project.name}
                </h3>
                <p className="text-sm uppercase tracking-[0.1em] text-[#A1A1AA] mb-1">
                  {project.location}
                </p>
                <span className="text-xs uppercase tracking-[0.1em] text-[#C9A87C]">
                  {project.category}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
