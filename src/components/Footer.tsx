import { Link } from "react-router";
import { FiInstagram, FiLinkedin, FiTwitter } from "react-icons/fi";
import { useState } from "react";
import { trpc } from "@/providers/trpc";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const subscribe = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => {
      setSubscribed(true);
      setEmail("");
    },
  });

  return (
    <footer className="bg-[#080808] border-t border-[#3F3F46]/30 pt-20 pb-10">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Top Row */}
        <div className="mb-16">
          <Link
            to="/"
            className="font-[var(--font-display)] text-2xl tracking-[0.08em] text-white inline-block mb-4"
          >
            APEX CONSTRUCT
          </Link>
          <p className="font-[var(--font-display)] italic text-xl text-[#C9A87C] max-w-lg">
            Crafting spaces that transcend the ordinary
          </p>
        </div>

        {/* Middle Row - 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] text-[#C9A87C] mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", path: "/" },
                { label: "About", path: "/about" },
                { label: "Services", path: "/services" },
                { label: "Portfolio", path: "/portfolio" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-[#A1A1AA] hover:text-[#C9A87C] hover:translate-x-1 inline-block transition-all duration-250"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] text-[#C9A87C] mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {[
                "Interior Design",
                "Exterior Design",
                "Landscape Architecture",
                "Construction",
                "Project Management",
                "Travel Consultation",
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-sm text-[#A1A1AA] hover:text-[#C9A87C] hover:translate-x-1 inline-block transition-all duration-250"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] text-[#C9A87C] mb-6">
              Contact
            </h4>
            <div className="space-y-3 text-sm text-[#A1A1AA]">
              <p>100 Architecture Lane</p>
              <p>New York, NY 10001</p>
              <p className="pt-2">+1 (212) 555-0199</p>
              <p>hello@apexconstruct.com</p>
            </div>
            <div className="flex gap-4 mt-6">
              {[FiInstagram, FiLinkedin, FiTwitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-[#3F3F46] hover:text-[#C9A87C] transition-colors"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] text-[#C9A87C] mb-6">
              Newsletter
            </h4>
            <p className="text-sm text-[#A1A1AA] mb-4">
              Stay updated with our latest projects and insights.
            </p>
            {subscribed ? (
              <p className="text-sm text-[#C9A87C]">Thank you for subscribing!</p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email) subscribe.mutate({ email });
                }}
                className="flex flex-col gap-3"
              >
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#18181B] border border-[#3F3F46] text-white px-4 py-3 text-sm outline-none focus:border-[#C9A87C] transition-colors"
                />
                <button
                  type="submit"
                  disabled={subscribe.isPending}
                  className="bg-[#C9A87C] text-[#080808] text-sm uppercase tracking-[0.12em] px-4 py-3 hover:bg-white transition-colors disabled:opacity-50"
                >
                  {subscribe.isPending ? "..." : "Subscribe"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="border-t border-[#3F3F46]/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#3F3F46]">
            2026 Apex Construct. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-[#3F3F46]">
            <a href="#" className="hover:text-[#C9A87C] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#C9A87C] transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
