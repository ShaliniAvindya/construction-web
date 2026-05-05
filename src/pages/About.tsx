import { useEffect, useRef } from "react";

const team = [
  {
    name: "Jonathan Mercer",
    role: "Founder & CEO",
    image: "/images/team-1.jpg",
  },
  {
    name: "Elena Vasquez",
    role: "Design Director",
    image: "/images/team-2.jpg",
  },
  {
    name: "Richard Blackwell",
    role: "Construction Director",
    image: "/images/team-3.jpg",
  },
  {
    name: "Sophia Nakamura",
    role: "Landscape Architect",
    image: "/images/team-4.jpg",
  },
];

const values = [
  {
    title: "Excellence",
    description:
      "We pursue perfection in every detail, from the grandest facade to the smallest interior finish.",
  },
  {
    title: "Integrity",
    description:
      "Transparent processes, honest communication, and unwavering ethical standards define our work.",
  },
  {
    title: "Innovation",
    description:
      "We embrace cutting-edge technology and sustainable practices to create tomorrow's landmarks today.",
  },
];

export default function About() {
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal-item").forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).classList.add("revealed");
              }, i * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (revealRef.current) observer.observe(revealRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/about-story.jpg"
            alt="About Apex Construct"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,8,8,0.95)] via-[rgba(8,8,8,0.6)] to-[rgba(8,8,8,0.3)]" />
        </div>
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12 w-full">
          <p className="text-xs uppercase tracking-[0.2em] text-[#C9A87C] mb-4">
            Our Story
          </p>
          <h1 className="font-[var(--font-display)] text-5xl lg:text-6xl text-white max-w-3xl">
            Two Decades of Architectural Excellence
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="bg-[#080808] py-24 lg:py-32">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-[var(--font-display)] text-4xl text-white mb-8">
                Built on Passion, Driven by Precision
              </h2>
              <div className="space-y-6 text-[#A1A1AA] leading-relaxed">
                <p>
                  Founded in 2006, Apex Construct began with a singular vision:
                  to create spaces that transcend the ordinary. What started as a
                  small architectural studio in New York has grown into an
                  internationally recognized firm with projects spanning six
                  continents.
                </p>
                <p>
                  Our multidisciplinary team of architects, designers,
                  engineers, and craftspeople brings together diverse expertise
                  unified by a shared commitment to excellence. We believe that
                  exceptional architecture emerges from the intersection of
                  artistic vision and technical mastery.
                </p>
                <p>
                  Every project we undertake is a partnership with our clients.
                  We listen deeply, design thoughtfully, and build with
                  unwavering dedication to quality. The result is a portfolio of
                  spaces that not only meet functional requirements but inspire
                  and endure.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/about-story.jpg"
                alt="Architectural detail"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#C9A87C] text-[#080808] p-6">
                <div className="font-[var(--font-display)] text-4xl">18+</div>
                <div className="text-sm uppercase tracking-[0.1em]">
                  Years of Excellence
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section ref={revealRef} className="bg-[#18181B] py-24 lg:py-32">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-[#C9A87C] mb-4">
              Our Team
            </p>
            <h2 className="font-[var(--font-display)] text-4xl lg:text-5xl text-white">
              The People Behind the Vision
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="reveal-item group opacity-0 translate-y-10 transition-all duration-700"
              >
                <div className="relative overflow-hidden mb-6 aspect-[3/4]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:-translate-y-1"
                  />
                </div>
                <h3 className="font-[var(--font-display)] text-xl text-white">
                  {member.name}
                </h3>
                <p className="text-xs uppercase tracking-[0.15em] text-[#C9A87C] mt-1">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#080808] py-24 lg:py-32">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-[#C9A87C] mb-4">
              Our Values
            </p>
            <h2 className="font-[var(--font-display)] text-4xl lg:text-5xl text-white">
              Principles That Guide Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="w-16 h-16 rounded-full bg-[rgba(201,168,124,0.1)] flex items-center justify-center mx-auto mb-6">
                  <div className="w-3 h-3 rounded-full bg-[#C9A87C]" />
                </div>
                <h3 className="font-[var(--font-display)] text-2xl text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-[#A1A1AA] leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .reveal-item.revealed {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </main>
  );
}
