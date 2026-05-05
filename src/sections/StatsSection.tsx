import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 250, suffix: "+", label: "Projects Completed" },
  { value: 18, suffix: "", label: "Years of Excellence" },
  { value: 40, suffix: "+", label: "Design Awards" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            setStarted(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounts(stats.map((s) => Math.round(s.value * eased)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [started]);

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-[#18181B] to-[#080808] py-20"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center">
              <div className="font-[var(--font-display)] text-5xl lg:text-6xl text-[#C9A87C] mb-3">
                {counts[i]}
                {stat.suffix}
              </div>
              <div className="text-sm uppercase tracking-[0.15em] text-[#A1A1AA]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
