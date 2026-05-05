import { useParams, Link } from "react-router";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { trpc } from "@/providers/trpc";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: project, isLoading } = trpc.project.getBySlug.useQuery(
    { slug: slug || "" },
    { enabled: !!slug }
  );

  if (isLoading) {
    return (
      <main className="bg-[#080808] min-h-screen flex items-center justify-center">
        <p className="text-[#A1A1AA]">Loading...</p>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="bg-[#080808] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-[var(--font-display)] text-4xl text-white mb-4">
            Project Not Found
          </h1>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-[#C9A87C] hover:gap-3 transition-all"
          >
            <FiArrowLeft size={16} /> Back to Portfolio
          </Link>
        </div>
      </main>
    );
  }

  const images = Array.isArray(project.images)
    ? project.images
    : JSON.parse((project.images as string) || "[]");

  return (
    <main>
      {/* Hero Image */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src={project.featuredImage}
          alt={project.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[rgba(8,8,8,0.3)] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
          <div className="max-w-[1280px] mx-auto">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-[#C9A87C] transition-colors mb-4"
            >
              <FiArrowLeft size={14} /> Back to Portfolio
            </Link>
            <h1 className="font-[var(--font-display)] text-4xl lg:text-6xl text-white">
              {project.name}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-[#080808] py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          {/* Meta */}
          <div className="flex flex-wrap gap-4 mb-12">
            <span className="text-xs uppercase tracking-[0.1em] text-[#C9A87C] border border-[#C9A87C] px-4 py-1.5">
              {project.category}
            </span>
            <span className="text-xs uppercase tracking-[0.1em] text-[#A1A1AA] border border-[#3F3F46] px-4 py-1.5">
              {project.location}
            </span>
            {project.year && (
              <span className="text-xs uppercase tracking-[0.1em] text-[#A1A1AA] border border-[#3F3F46] px-4 py-1.5">
                {project.year}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-2">
              <p className="text-lg text-[#D4D4D8] leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            </div>
            <div className="bg-[#18181B] p-8">
              <h3 className="text-xs uppercase tracking-[0.15em] text-[#C9A87C] mb-6">
                Project Details
              </h3>
              <div className="space-y-4">
                {project.area && (
                  <div>
                    <div className="text-xs uppercase tracking-[0.1em] text-[#3F3F46]">
                      Area
                    </div>
                    <div className="text-white">{project.area}</div>
                  </div>
                )}
                {project.duration && (
                  <div>
                    <div className="text-xs uppercase tracking-[0.1em] text-[#3F3F46]">
                      Duration
                    </div>
                    <div className="text-white">{project.duration}</div>
                  </div>
                )}
                {project.budget && (
                  <div>
                    <div className="text-xs uppercase tracking-[0.1em] text-[#3F3F46]">
                      Budget
                    </div>
                    <div className="text-white">{project.budget}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          {images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {images.map((img: string, i: number) => (
                <div key={i} className="aspect-video overflow-hidden">
                  <img
                    src={img}
                    alt={`${project.name} gallery ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-600"
                  />
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#C9A87C] text-[#080808] px-10 py-4 text-sm uppercase tracking-[0.12em] font-medium hover:bg-white transition-colors"
            >
              Start a Similar Project <FiArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
