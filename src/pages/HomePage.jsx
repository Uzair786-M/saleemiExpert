import { Link } from "react-router-dom";
import { HeroSection } from "../components/HeroSection";
import { SectionHeader } from "../components/SectionHeader";
import { ServicesGrid } from "../components/ServicesGrid";
import { PortfolioCard } from "../components/PortfolioGrid";
import { TestimonialsGrid } from "../components/TestimonialsGrid";
import { ContactForm } from "../components/ContactForm";
import { useFetch } from "../hooks/useData";
import { fetchServices, fetchPortfolioItems, fetchTestimonials } from "../services/api";

const S = {
  section: (bg) => ({ padding: "6rem 1.5rem", backgroundColor: bg || "#050816" }),
  inner: { maxWidth: "1280px", margin: "0 auto" },
  ctaBtn: {
    display: "inline-block", marginTop: "3rem",
    padding: "16px 32px", fontWeight: 600, borderRadius: "0.75rem",
    border: "1px solid rgba(255,255,255,0.2)", color: "#ffffff",
    textDecoration: "none", transition: "border-color 0.2s, color 0.2s",
    backgroundColor: "transparent",
  },
};

const Skeleton = ({ count = 4 }) => (
  <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} style={{ height: "12rem", borderRadius: "1.5rem", backgroundColor: "rgba(255,255,255,0.05)", animation: "pulse 2s infinite" }} />
    ))}
  </div>
);

export const HomePage = () => {
  const { data: services, loading: svcLoading } = useFetch(fetchServices);
  const { data: portfolio, loading: pfLoading } = useFetch(fetchPortfolioItems);
  const { data: testimonials, loading: tmLoading } = useFetch(fetchTestimonials);

  return (
    <>
      <HeroSection />

      {/* Services */}
      <section style={S.section()}>
        <div style={S.inner}>
          <SectionHeader eyebrow="Services" title="What I Offer" />
          {svcLoading ? <Skeleton count={4} /> : <ServicesGrid services={services ?? []} showLink />}
          <div style={{ textAlign: "center" }}>
            <Link to="/services" style={S.ctaBtn}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#22d3ee"; e.currentTarget.style.color = "#22d3ee"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#ffffff"; }}>
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section style={S.section("#070b1d")}>
        <div style={S.inner}>
          <SectionHeader eyebrow="Portfolio" title="Recent Projects" />
          {pfLoading ? <Skeleton count={4} /> : (
            <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              {(portfolio ?? []).slice(0, 4).map(item => (
                <PortfolioCard key={item.id} item={item} />
              ))}
            </div>
          )}
          <div style={{ textAlign: "center" }}>
            <Link to="/portfolio" style={S.ctaBtn}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#22d3ee"; e.currentTarget.style.color = "#22d3ee"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#ffffff"; }}>
              View All Projects →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={S.section()}>
        <div style={S.inner}>
          <SectionHeader eyebrow="Testimonials" title="Client Reviews" />
          {tmLoading ? <Skeleton count={3} /> : (
            <TestimonialsGrid testimonials={(testimonials ?? []).slice(0, 3)} />
          )}
        </div>
      </section>

      {/* Contact */}
      <section style={S.section("#070b1d")}>
        <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p style={{ color: "#22d3ee", textTransform: "uppercase", letterSpacing: "3px", fontSize: "0.875rem", marginBottom: "0.75rem" }}>Contact</p>
            <h2 style={{ color: "#ffffff", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 900, marginBottom: "1rem" }}>Let's Work Together</h2>
            <p style={{ color: "#9ca3af", maxWidth: "42rem", margin: "0 auto" }}>
              Need a modern website, digital solution or professional online presence? Send your project details.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
};
