import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { FiArrowRight } from "react-icons/fi";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX / window.innerWidth;
      targetRef.current.y = 1.0 - e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let raf: number;
    const animate = () => {
      mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * 0.08;
      if (heroRef.current) {
        const x = (mouseRef.current.x - 0.5) * 20;
        const y = (mouseRef.current.y - 0.5) * 20;
        heroRef.current.style.setProperty("--mx", `${x}px`);
        heroRef.current.style.setProperty("--my", `${y}px`);
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with subtle parallax */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          transform: "translate(var(--mx, 0px), var(--my, 0px)) scale(1.1)",
          transition: "transform 0.1s linear",
        }}
      >
        <img
          src="/images/hero-bg.jpg"
          alt="Luxury architecture"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(8,8,8,0.3)] via-[rgba(8,8,8,0.5)] to-[rgba(8,8,8,0.95)] z-[2]" />

      {/* Content */}
      <div className="relative z-[3] text-center px-6 max-w-4xl mx-auto pt-20">
        <p className="text-xs uppercase tracking-[0.2em] text-[#C9A87C] mb-6 animate-fade-in">
          Luxury Construction & Design
        </p>
        <h1 className="font-[var(--font-display)] text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-[-0.02em] mb-6 animate-fade-in-up">
          Where Vision Meets Craftsmanship
        </h1>
        <p className="text-lg text-[#D4D4D8] max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up delay-200">
          Transforming ambitious concepts into architectural masterpieces across
          residential, commercial, and landscape domains.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
          <Link
            to="/portfolio"
            className="inline-flex items-center justify-center gap-2 bg-[#C9A87C] text-[#080808] px-10 py-4 text-sm uppercase tracking-[0.12em] font-medium hover:bg-white transition-colors duration-350"
          >
            Explore Our Portfolio
            <FiArrowRight size={16} />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 bg-transparent border border-white text-white px-10 py-4 text-sm uppercase tracking-[0.12em] font-medium hover:bg-white hover:text-[#080808] transition-colors duration-350"
          >
            Start Your Project
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#A1A1AA]">
          Scroll
        </span>
        <div className="w-px h-10 bg-[#3F3F46] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full bg-[#C9A87C] animate-scroll-line" />
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scroll-line {
          0% { height: 0; top: 0; opacity: 1; }
          50% { height: 100%; top: 0; opacity: 1; }
          100% { height: 100%; top: 100%; opacity: 0; }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .animate-scroll-line {
          animation: scroll-line 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
