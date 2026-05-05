import { Link } from "react-router";

export default function CTABanner() {
  return (
    <section className="bg-[#080808] py-24 lg:py-32 relative overflow-hidden">
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 text-center relative z-10">
        <h2 className="font-[var(--font-display)] text-4xl lg:text-5xl text-white mb-6">
          Ready to Build Your Legacy?
        </h2>
        <p className="text-lg text-[#A1A1AA] max-w-xl mx-auto mb-10">
          Let's discuss how we can bring your architectural vision to life.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center bg-[#C9A87C] text-[#080808] px-12 py-4 text-sm uppercase tracking-[0.12em] font-medium hover:bg-white transition-colors duration-350"
        >
          Schedule a Consultation
        </Link>
      </div>
    </section>
  );
}
