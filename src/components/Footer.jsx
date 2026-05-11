import { Link } from "react-router-dom";

const footerLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Contact", to: "/contact" },
];

export const Footer = () => (
  <footer style={{
    padding: "2.5rem 1.5rem",
    borderTop: "1px solid rgba(255,255,255,0.1)",
    backgroundColor: "#050816",
  }}>
    <div style={{
      maxWidth: "1280px",
      margin: "0 auto",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "1.5rem",
    }}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "#ffffff" }}>
          Saleemi<span style={{ color: "#22d3ee" }}>Expert</span>
        </span>
      </Link>

      <ul style={{ display: "flex", gap: "1.5rem", listStyle: "none", flexWrap: "wrap" }}>
        {footerLinks.map(({ label, to }) => (
          <li key={to}>
            <Link
              to={to}
              style={{ color: "#9ca3af", textDecoration: "none", fontSize: "0.875rem", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#22d3ee"}
              onMouseLeave={e => e.currentTarget.style.color = "#9ca3af"}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <p style={{ color: "#9ca3af", fontSize: "0.875rem" }}>
        © {new Date().getFullYear()} SaleemiExpert. All rights reserved.
      </p>
    </div>
  </footer>
);
