import { useEffect, useRef } from "react";
import { Link } from "react-router";
import {
  FiHome,
  FiLayers,
  FiSun,
  FiAnchor,
  FiClipboard,
  FiGlobe,
  FiArrowRight,
} from "react-icons/fi";

const services = [
  {
    icon: FiHome,
    title: "Interior Design",
    description:
      "Bespoke interiors that harmonize aesthetics, comfort, and functionality for refined living.",
  },
  {
    icon: FiLayers,
    title: "Exterior Design",
    description:
      "Striking facades and architectural exteriors that command attention and withstand time.",
  },
  {
    icon: FiSun,
    title: "Landscape Architecture",
    description:
      "Curated outdoor environments that extend your living space into nature.",
  },
  {
    icon: FiAnchor,
    title: "Construction",
    description:
      "Precision-built structures with uncompromising quality and transparent processes.",
  },
  {
    icon: FiClipboard,
    title: "Project Management",
    description:
      "End-to-end oversight ensuring on-time, on-budget delivery of complex builds.",
  },
  {
    icon: FiGlobe,
    title: "Travel Consultation",
    description:
      "Exclusive property sourcing and relocation advisory for global clientele.",
  },
];

export default function ServicesPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".service-card");
            cards.forEach((card, i) => {
              setTimeout(() => {
                card.classList.add("animate-in");
              }, i * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#18181B] py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-[#C9A87C] mb-4">
            What We Do
          </p>
          <h2 className="font-[var(--font-display)] text-4xl lg:text-5xl text-white mb-6">
            Comprehensive Design & Build Excellence
          </h2>
          <p className="text-lg text-[#A1A1AA] max-w-2xl leading-relaxed">
            From concept to completion, we deliver turnkey solutions for the most
            discerning clients.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="service-card bg-[#080808] border border-[#3F3F46] border-t-2 border-t-[#C9A87C] p-10 opacity-0 translate-y-[60px] transition-all duration-800 hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(0,0,0,0.4)] hover:border-[rgba(201,168,124,0.3)] group"
            >
              <service.icon
                size={48}
                strokeWidth={1}
                className="text-[#C9A87C] mb-6"
              />
              <h3 className="font-[var(--font-display)] text-2xl text-white mb-3">
                {service.title}
              </h3>
              <p className="text-[#A1A1AA] leading-relaxed mb-8">
                {service.description}
              </p>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.1em] text-[#C9A87C] group-hover:gap-3 transition-all duration-300"
              >
                Learn More <FiArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>

        <style>{`
          .service-card.animate-in {
            opacity: 1;
            transform: translateY(0);
          }
        `}</style>
      </div>
    </section>
  );
}
