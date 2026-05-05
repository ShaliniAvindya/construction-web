import { useState, useEffect, useCallback } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { trpc } from "@/providers/trpc";

const fallbackTestimonials = [
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

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const { data: apiTestimonials } = trpc.testimonial.list.useQuery();
  const testimonials = apiTestimonials?.length
    ? apiTestimonials
    : fallbackTestimonials;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, [testimonials.length]);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <section className="bg-[#18181B] py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-[#C9A87C] mb-4">
            Client Voices
          </p>
          <h2 className="font-[var(--font-display)] text-4xl lg:text-5xl text-white">
            What Our Clients Say
          </h2>
        </div>

        <div className="max-w-3xl mx-auto relative">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className={`text-center transition-all duration-600 ${
                i === current
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 absolute inset-0 translate-x-8"
              }`}
            >
              <blockquote className="font-[var(--font-display)] italic text-2xl lg:text-3xl text-[#D4D4D8] leading-relaxed mb-10">
                "{t.quote}"
              </blockquote>
              <div className="text-sm uppercase tracking-[0.1em] text-[#C9A87C]">
                {t.authorName}
              </div>
              <div className="text-base text-[#A1A1AA] mt-2">
                {t.authorTitle}
                {t.authorCompany && `, ${t.authorCompany}`}
              </div>
            </div>
          ))}

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-12">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-[#3F3F46] text-[#A1A1AA] hover:border-[#C9A87C] hover:text-[#C9A87C] flex items-center justify-center transition-colors duration-300"
              aria-label="Previous testimonial"
            >
              <FiChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-[#3F3F46] text-[#A1A1AA] hover:border-[#C9A87C] hover:text-[#C9A87C] flex items-center justify-center transition-colors duration-300"
              aria-label="Next testimonial"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
