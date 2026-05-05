import { Link } from "react-router";
import { FiCheck } from "react-icons/fi";

const services = [
  {
    number: "01",
    title: "Interior Design",
    description:
      "Our interior design service creates bespoke living and working environments that reflect your unique personality and aspirations. From initial concept development to final installation, we manage every detail with precision and artistry.",
    features: [
      "Space planning & 3D visualization",
      "Custom furniture & fixture selection",
      "Material & finish curation",
      "Lighting design & smart home integration",
      "Art procurement & styling",
    ],
    image: "/images/service-interior.jpg",
    imageLeft: true,
  },
  {
    number: "02",
    title: "Exterior Design",
    description:
      "The exterior of a building is its first statement to the world. We design facades that are both visually striking and structurally resilient, using premium materials that age gracefully while protecting what lies within.",
    features: [
      "Facade design & material selection",
      "Structural consulting",
      "Cladding & envelope systems",
      "Sustainable exterior solutions",
      "Facade lighting design",
    ],
    image: "/images/service-exterior.jpg",
    imageLeft: false,
  },
  {
    number: "03",
    title: "Landscape Architecture",
    description:
      "We design outdoor environments that extend your living space into nature. From intimate courtyard gardens to expansive estate grounds, our landscape designs harmonize horticulture, hardscape, and ecology.",
    features: [
      "Garden design & planting plans",
      "Hardscape & water features",
      "Outdoor living spaces",
      "Irrigation & lighting systems",
      "Sustainable landscape practices",
    ],
    image: "/images/service-landscape.jpg",
    imageLeft: true,
  },
  {
    number: "04",
    title: "Construction",
    description:
      "Our construction division delivers precision-built structures with uncompromising quality. We combine time-honored craftsmanship with modern building techniques to create structures that endure for generations.",
    features: [
      "Full-scale construction management",
      "Structural engineering coordination",
      "Quality assurance & inspections",
      "Sustainable building practices",
      "Post-construction support",
    ],
    image: "/images/service-construction.jpg",
    imageLeft: false,
  },
  {
    number: "05",
    title: "Project Management",
    description:
      "Complex builds require expert oversight. Our project management team ensures every phase of your project proceeds on schedule, within budget, and to the highest standards of quality.",
    features: [
      "Timeline & milestone planning",
      "Budget management & reporting",
      "Contractor coordination",
      "Risk assessment & mitigation",
      "Regulatory compliance",
    ],
    image: "/images/service-management.jpg",
    imageLeft: true,
  },
  {
    number: "06",
    title: "Travel Consultation",
    description:
      "For our global clientele, we offer exclusive property sourcing and relocation advisory services. Whether you seek a vacation home, investment property, or permanent residence abroad, we guide you to the perfect location.",
    features: [
      "Global property sourcing",
      "Investment advisory",
      "Relocation planning",
      "Legal & tax consultation referral",
      "Property management setup",
    ],
    image: "/images/service-travel.jpg",
    imageLeft: false,
  },
];

const processSteps = [
  { number: "01", title: "Consultation", description: "Deep dive into your vision" },
  { number: "02", title: "Design", description: "Concept to detailed plans" },
  { number: "03", title: "Build", description: "Precision execution" },
  { number: "04", title: "Deliver", description: "Your dream realized" },
];

export default function Services() {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-[#080808]">
        <div className="text-center px-6">
          <h1 className="font-[var(--font-display)] text-5xl lg:text-6xl text-white mb-6">
            Our Services
          </h1>
          <p className="text-lg text-[#A1A1AA] max-w-xl mx-auto">
            Comprehensive solutions for every phase of your project
          </p>
        </div>
      </section>

      {/* Service Detail Cards */}
      <section className="bg-[#080808]">
        {services.map((service, index) => (
          <div
            key={service.title}
            className={`grid grid-cols-1 lg:grid-cols-2 ${
              index !== services.length - 1 ? "border-b border-[#3F3F46]/30" : ""
            }`}
          >
            {/* Image */}
            <div
              className={`relative aspect-video lg:aspect-auto lg:min-h-[500px] overflow-hidden ${
                service.imageLeft ? "lg:order-1" : "lg:order-2"
              }`}
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div
              className={`bg-[#18181B] p-10 lg:p-16 flex flex-col justify-center ${
                service.imageLeft ? "lg:order-2" : "lg:order-1"
              }`}
            >
              <div className="font-[var(--font-display)] text-7xl text-[rgba(201,168,124,0.2)] mb-4">
                {service.number}
              </div>
              <h2 className="font-[var(--font-display)] text-3xl lg:text-4xl text-white mb-6">
                {service.title}
              </h2>
              <p className="text-[#A1A1AA] leading-relaxed mb-8">
                {service.description}
              </p>
              <ul className="space-y-3 mb-10">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-[#D4D4D8]"
                  >
                    <FiCheck size={18} className="text-[#C9A87C] flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center self-start border border-[#C9A87C] text-[#C9A87C] px-8 py-3 text-sm uppercase tracking-[0.1em] hover:bg-[#C9A87C] hover:text-[#080808] transition-colors duration-300"
              >
                Inquire About This Service
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* Process */}
      <section className="bg-[#18181B] py-24 lg:py-32">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-[#C9A87C] mb-4">
              Our Process
            </p>
            <h2 className="font-[var(--font-display)] text-4xl lg:text-5xl text-white">
              How We Work
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <div key={step.number} className="relative text-center">
                <div className="w-16 h-16 rounded-full border-2 border-[#C9A87C] flex items-center justify-center mx-auto mb-6">
                  <span className="font-[var(--font-display)] text-xl text-[#C9A87C]">
                    {step.number}
                  </span>
                </div>
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px bg-[#3F3F46]" />
                )}
                <h3 className="font-[var(--font-display)] text-xl text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[#A1A1AA]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
