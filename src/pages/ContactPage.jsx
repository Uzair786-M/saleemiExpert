import { ContactForm } from "../components/ContactForm";
import { TestimonialsGrid } from "../components/TestimonialsGrid";
import { SectionHeader } from "../components/SectionHeader";
import { useFetch } from "../hooks/useData";
import { fetchTestimonials } from "../services/api";
import { CONTACT_INFO } from "../data/constants";

const faqs = [
  { q: "How long does a typical project take?", a: "It depends on the scope. A simple website can be done in 3–5 days, while complex e-commerce or automation projects may take 1–3 weeks." },
  { q: "Do you offer revisions?", a: "Yes! I offer revisions based on the agreed scope and work closely with clients to ensure the final result meets expectations." },
  { q: "What platforms do you work with?", a: "I specialize in Shopify, WooCommerce, WordPress, and custom web applications built with modern frameworks like React." },
  { q: "Can you handle large product catalogs?", a: "Absolutely. I've successfully managed and uploaded 5,000+ product listings with complex variants, images, and metadata." },
  { q: "Do you provide ongoing support?", a: "Yes, I offer 24/7 support for ongoing maintenance, updates, and troubleshooting after project delivery." },
];

export const ContactPage = () => {
  const { data: testimonials, loading } = useFetch(fetchTestimonials);

  return (
    <div style={{ paddingTop: "6rem" }}>
      {/* Header */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "#070b1d" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#22d3ee", textTransform: "uppercase", letterSpacing: "4px", fontSize: "0.875rem", marginBottom: "1rem" }}>Get in Touch</p>
          <h1 style={{ color: "#ffffff", fontSize: "clamp(2.5rem,6vw,3.75rem)", fontWeight: 900, marginBottom: "1.5rem" }}>
            Let's Work <span style={{ color: "#22d3ee" }}>Together</span>
          </h1>
          <p style={{ color: "#9ca3af", maxWidth: "42rem", margin: "0 auto", fontSize: "1.125rem", lineHeight: 1.7 }}>
            Send your project details and let's make it happen.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section style={{ padding: "6rem 1.5rem", backgroundColor: "#050816" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gap: "4rem", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", alignItems: "start" }}>
          {/* Info */}
          <div>
            <h2 style={{ color: "#ffffff", fontSize: "1.875rem", fontWeight: 900, marginBottom: "1rem" }}>
              Send a <span style={{ color: "#22d3ee" }}>Message</span>
            </h2>
            <p style={{ color: "#9ca3af", lineHeight: 1.7, marginBottom: "2.5rem" }}>
              Fill out the form and I'll get back to you within 24 hours.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2.5rem" }}>
              {CONTACT_INFO.map(({ icon, label, value, href }) => (
                <div key={label} style={{
                  display: "flex", alignItems: "center", gap: "1.25rem",
                  padding: "1.25rem", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "1rem", backgroundColor: "rgba(255,255,255,0.05)",
                }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "0.75rem", backgroundColor: "rgba(6,182,212,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", flexShrink: 0 }}>{icon}</div>
                  <div>
                    <p style={{ color: "#9ca3af", fontSize: "0.875rem" }}>{label}</p>
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer"
                        style={{ color: "#ffffff", fontWeight: 600, textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.color = "#22d3ee"}
                        onMouseLeave={e => e.currentTarget.style.color = "#ffffff"}
                      >{value}</a>
                    ) : (
                      <p style={{ color: "#ffffff", fontWeight: 600 }}>{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "12px 20px", borderRadius: "9999px", border: "1px solid rgba(34,211,238,0.3)", backgroundColor: "rgba(34,211,238,0.05)" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "9999px", backgroundColor: "#4ade80" }} />
              <span style={{ color: "#d1d5db", fontSize: "0.875rem" }}>
                Usually responds within <span style={{ color: "#22d3ee", fontWeight: 600 }}>24 hours</span>
              </span>
            </div>
          </div>

          {/* Form */}
          <div style={{ padding: "2rem", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1.5rem", backgroundColor: "rgba(255,255,255,0.05)" }}>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "6rem 1.5rem", backgroundColor: "#070b1d" }}>
        <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
          <SectionHeader eyebrow="FAQ" title="Frequently Asked Questions" subtitle="Answers to the most common questions about working with me." />
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {faqs.map(({ q, a }) => (
              <details key={q} style={{ padding: "1.5rem", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1rem", backgroundColor: "rgba(255,255,255,0.05)", cursor: "pointer" }}>
                <summary style={{ fontWeight: 700, fontSize: "1.05rem", color: "#ffffff", display: "flex", justifyContent: "space-between", alignItems: "center", listStyle: "none" }}>
                  {q} <span style={{ color: "#22d3ee", fontSize: "1.25rem" }}>+</span>
                </summary>
                <p style={{ marginTop: "1rem", color: "#9ca3af", lineHeight: 1.7 }}>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "6rem 1.5rem", backgroundColor: "#050816" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <SectionHeader eyebrow="Testimonials" title="Client Reviews" />
          {loading ? (
            <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
              {[1,2,3].map(i => <div key={i} style={{ height: "12rem", borderRadius: "1.5rem", backgroundColor: "rgba(255,255,255,0.05)" }} />)}
            </div>
          ) : <TestimonialsGrid testimonials={testimonials ?? []} />}
        </div>
      </section>
    </div>
  );
};
