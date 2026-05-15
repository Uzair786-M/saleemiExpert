import { Link } from "react-router-dom";
import { SOCIAL_LINKS, SOCIAL_META, SITE_OWNER } from "../data/constants";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Pricing", to: "/pricing" },
  { label: "Contact", to: "/contact" },
];

export const Footer = () => (
  <footer
    style={{
      width: "100%",
      backgroundColor: "#070b1d",
      borderTop: "1px solid rgba(255,255,255,0.08)",
    }}
  >
    <div
      style={{ width: "100%", padding: "4rem clamp(1.5rem, 5vw, 6rem) 2rem" }}
    >
      {/* Top grid */}
      <div
        style={{
          display: "grid",
          gap: "3rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          marginBottom: "3rem",
        }}
      >
        {/* Brand */}
        <div>
          <Link to="/" style={{ textDecoration: "none" }}>
            <span
              style={{
                fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              Saleemi<span style={{ color: "#22d3ee" }}>Expert</span>
            </span>
          </Link>
          <p
            style={{
              color: "#6b7280",
              fontSize: "clamp(0.8rem, 1vw, 0.95rem)",
              lineHeight: 1.7,
              marginTop: "0.75rem",
              maxWidth: "220px",
            }}
          >
            {SITE_OWNER.tagline}
          </p>

          {/* Social icons */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              marginTop: "1.25rem",
              flexWrap: "wrap",
            }}
          >
            {Object.entries(SOCIAL_LINKS).map(([platform, url]) => {
              const meta = SOCIAL_META[platform];
              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={meta?.label}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#9ca3af",
                    textDecoration: "none",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${meta?.color}22`;
                    e.currentTarget.style.borderColor =
                      meta?.color || "#22d3ee";
                    e.currentTarget.style.color = meta?.color || "#22d3ee";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(255,255,255,0.06)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.color = "#9ca3af";
                  }}
                >
                  {meta?.icon}
                </a>
              );
            })}
          </div>

          {/* Availability */}
          {SITE_OWNER.available && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "5px 12px",
                borderRadius: "9999px",
                backgroundColor: "rgba(16,185,129,0.1)",
                border: "1px solid rgba(16,185,129,0.25)",
                marginTop: "1rem",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "9999px",
                  backgroundColor: "#10b981",
                }}
              />
              <span
                style={{
                  color: "#10b981",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                }}
              >
                Available for Work
              </span>
            </div>
          )}
        </div>

        {/* Quick links */}
        <div>
          <h4
            style={{
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "clamp(0.8rem, 1vw, 1rem)",
              marginBottom: "1.25rem",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Quick Links
          </h4>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {navLinks.map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  style={{
                    color: "#6b7280",
                    textDecoration: "none",
                    fontSize: "clamp(0.8rem, 1vw, 0.95rem)",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#22d3ee")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#6b7280")
                  }
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4
            style={{
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "clamp(0.8rem, 1vw, 1rem)",
              marginBottom: "1.25rem",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Services
          </h4>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {[
              "Shopify Product Upload",
              "WooCommerce CSV Import",
              "Bulk Automation",
              "Web Development",
              "Variant Mapping",
              "Custom Pricing Packages",
            ].map((s) => (
              <li key={s}>
                <Link
                  to="/services"
                  style={{
                    color: "#6b7280",
                    textDecoration: "none",
                    fontSize: "clamp(0.8rem, 1vw, 0.95rem)",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#22d3ee")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#6b7280")
                  }
                >
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4
            style={{
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "clamp(0.8rem, 1vw, 1rem)",
              marginBottom: "1.25rem",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Get In Touch
          </h4>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <a
              href={`mailto:${SITE_OWNER.email}`}
              style={{
                color: "#6b7280",
                textDecoration: "none",
                fontSize: "clamp(0.8rem, 1vw, 0.95rem)",
                transition: "color 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#22d3ee")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
            >
              📧 {SITE_OWNER.email}
            </a>

            <a
              href={`https://wa.me/${SITE_OWNER.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#6b7280",
                textDecoration: "none",
                fontSize: "clamp(0.8rem, 1vw, 0.95rem)",
                transition: "color 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#25d366")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
            >
              💬 WhatsApp ({SITE_OWNER.whatsapp})
            </a>

            <p
              style={{
                color: "#6b7280",
                fontSize: "clamp(0.8rem, 1vw, 0.95rem)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              📍 {SITE_OWNER.location}
            </p>

            {/* Platform badges */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
                marginTop: "4px",
              }}
            >
              {Object.entries(SOCIAL_LINKS).map(([platform, url]) => {
                const meta = SOCIAL_META[platform];
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: "4px 12px",
                      borderRadius: "9999px",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      textDecoration: "none",
                      backgroundColor: `${meta?.color}18`,
                      color: meta?.color,
                      border: `1px solid ${meta?.color}40`,
                      transition: "all 0.2s",
                      textTransform: "capitalize",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${meta?.color}30`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = `${meta?.color}18`;
                    }}
                  >
                    {meta?.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "1.5rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <p
          style={{
            color: "#374151",
            fontSize: "clamp(0.75rem, 0.9vw, 0.875rem)",
          }}
        >
          © {new Date().getFullYear()} SaleemiExpert. All rights reserved.
        </p>

        <p
          style={{
            color: "#374151",
            fontSize: "clamp(0.75rem, 0.9vw, 0.875rem)",
          }}
        >
          🇵🇰 Based in Pakistan · Serving clients worldwide
        </p>

        {/* Hidden admin link — only visible on hover, blends into background */}
        <Link
          to="/admin"
          title="Admin"
          style={{
            color: "#374151", // same color as background text — invisible by default
            textDecoration: "none",
            fontSize: "0.7rem",
            fontWeight: 500,
            padding: "4px 8px",
            borderRadius: "6px",
            transition: "all 0.3s",
            userSelect: "none",
            letterSpacing: "0.5px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#22d3ee";
            e.currentTarget.style.backgroundColor = "rgba(34,211,238,0.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#374151";
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          ⚙ Admin
        </Link>
      </div>
    </div>
  </footer>
);
