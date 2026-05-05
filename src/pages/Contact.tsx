import { useState } from "react";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";
import { trpc } from "@/providers/trpc";

const projectTypes = [
  { value: "interior", label: "Interior Design" },
  { value: "exterior", label: "Exterior Design" },
  { value: "landscape", label: "Landscape Architecture" },
  { value: "construction", label: "Construction" },
  { value: "project_management", label: "Project Management" },
  { value: "travel", label: "Travel Consultation" },
  { value: "other", label: "Other" },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "other",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const submit = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", projectType: "other", message: "" });
    },
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email address";
    if (!form.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      submit.mutate(form as any);
    }
  };

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-[#080808]">
        <div className="text-center px-6">
          <h1 className="font-[var(--font-display)] text-5xl lg:text-6xl text-white mb-6">
            Let's Create Together
          </h1>
          <p className="text-lg text-[#A1A1AA] max-w-xl mx-auto">
            Reach out to begin your project journey
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="bg-[#080808] py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="bg-[#18181B] border border-[#C9A87C]/30 p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#C9A87C] flex items-center justify-center mx-auto mb-6">
                    <FiMail size={24} className="text-[#080808]" />
                  </div>
                  <h2 className="font-[var(--font-display)] text-2xl text-white mb-4">
                    Message Sent
                  </h2>
                  <p className="text-[#A1A1AA]">
                    Thank you for reaching out. We'll get back to you within 24
                    hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.1em] text-[#A1A1AA] mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className="w-full bg-[#18181B] border border-[#3F3F46] text-white px-4 py-3 outline-none focus:border-[#C9A87C] transition-colors"
                      />
                      {errors.name && (
                        <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-[0.1em] text-[#A1A1AA] mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        className="w-full bg-[#18181B] border border-[#3F3F46] text-white px-4 py-3 outline-none focus:border-[#C9A87C] transition-colors"
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.1em] text-[#A1A1AA] mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        className="w-full bg-[#18181B] border border-[#3F3F46] text-white px-4 py-3 outline-none focus:border-[#C9A87C] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-[0.1em] text-[#A1A1AA] mb-2">
                        Project Type
                      </label>
                      <select
                        value={form.projectType}
                        onChange={(e) =>
                          setForm({ ...form, projectType: e.target.value })
                        }
                        className="w-full bg-[#18181B] border border-[#3F3F46] text-white px-4 py-3 outline-none focus:border-[#C9A87C] transition-colors appearance-none"
                      >
                        {projectTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-[0.1em] text-[#A1A1AA] mb-2">
                      Message
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      rows={6}
                      className="w-full bg-[#18181B] border border-[#3F3F46] text-white px-4 py-3 outline-none focus:border-[#C9A87C] transition-colors resize-none"
                    />
                    {errors.message && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submit.isPending}
                    className="w-full bg-[#C9A87C] text-[#080808] py-4 text-sm uppercase tracking-[0.12em] font-medium hover:bg-white transition-colors disabled:opacity-50"
                  >
                    {submit.isPending ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="text-xs uppercase tracking-[0.15em] text-[#C9A87C] mb-6">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <FiMapPin size={20} className="text-[#C9A87C] mt-1" />
                    <div>
                      <div className="text-white text-sm">100 Architecture Lane</div>
                      <div className="text-[#A1A1AA] text-sm">
                        New York, NY 10001
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <FiPhone size={20} className="text-[#C9A87C] mt-1" />
                    <div>
                      <div className="text-white text-sm">+1 (212) 555-0199</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <FiMail size={20} className="text-[#C9A87C] mt-1" />
                    <div>
                      <div className="text-white text-sm">
                        hello@apexconstruct.com
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <FiClock size={20} className="text-[#C9A87C] mt-1" />
                    <div>
                      <div className="text-white text-sm">Mon - Fri: 9AM - 6PM</div>
                      <div className="text-[#A1A1AA] text-sm">Sat: By appointment</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="aspect-video bg-[#18181B] overflow-hidden">
                <img
                  src="/images/map-bg.jpg"
                  alt="Location map"
                  className="w-full h-full object-cover opacity-50"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
